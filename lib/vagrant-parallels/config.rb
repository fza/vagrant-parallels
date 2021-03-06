module VagrantPlugins
  module Parallels
    class Config < Vagrant.plugin("2", :config)
      attr_accessor :check_guest_tools
      attr_reader   :customizations
      attr_accessor :destroy_unused_network_interfaces
      attr_accessor :functional_psf
      attr_accessor :optimize_power_consumption
      attr_accessor :name
      attr_reader   :network_adapters


      # Compatibility with virtualbox provider's syntax
      alias :check_guest_additions= :check_guest_tools=

      def initialize
        @check_guest_tools = UNSET_VALUE
        @customizations    = []
        @destroy_unused_network_interfaces = UNSET_VALUE
        @functional_psf = UNSET_VALUE
        @network_adapters  = {}
        @name              = UNSET_VALUE
        @optimize_power_consumption = UNSET_VALUE

        network_adapter(0, :shared)
      end

      def customize(*command)
        event   = command.first.is_a?(String) ? command.shift : "pre-boot"
        command = command[0]
        @customizations << [event, command]
      end

      def network_adapter(slot, type, **opts)
        @network_adapters[slot] = [type, opts]
      end

      # @param size [Integer, String] the memory size in MB
      def memory=(size)
        customize("pre-boot", ["set", :id, "--memsize", size.to_s])
      end

      def cpus=(count)
        customize("pre-boot", ["set", :id, "--cpus", count.to_i])
      end

      def merge(other)
        super.tap do |result|
          c = customizations.dup
          c += other.customizations
          result.instance_variable_set(:@customizations, c)
        end
      end

      def finalize!
        if @check_guest_tools == UNSET_VALUE
          @check_guest_tools = true
        end

        if @destroy_unused_network_interfaces == UNSET_VALUE
          @destroy_unused_network_interfaces = true
        end

        if @functional_psf == UNSET_VALUE
          @functional_psf = true
        end

        if @optimize_power_consumption == UNSET_VALUE
          @optimize_power_consumption = true
        end

        @name = nil if @name == UNSET_VALUE
      end

      def validate(machine)
        errors = _detected_errors
        valid_events = ["pre-import", "pre-boot", "post-boot"]
        @customizations.each do |event, _|
          if !valid_events.include?(event)
            errors << I18n.t("vagrant_parallels.config.invalid_event",
                             event: event.to_s,
                             valid_events: valid_events.join(", "))
          end
        end
        @customizations.each do |event, command|
          if event == "pre-import" && command.index(:id)
            errors << I18n.t("vagrant_parallels.config.id_in_pre_import")
          end
        end

        { "Parallels Provider" => errors }

      end

    end
  end
end
