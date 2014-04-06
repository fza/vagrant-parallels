/*
* Heads-Up Grid
* Simple HTML + CSS grid overlay for web design and development.
*
* Files: hugrid.css, hugrid.js, example.html
*
* Example and documentation at: http://bohemianalps.com/tools/grid
*
* Shurane, thanks for your help! https://github.com/shurane
*
* Copyright (c) 2011 Jason Simanek
*
* Version: 1.5 (09/03/2011)
* Requires: jQuery v1.6+
*
* Licensed under the GPL license:
*   http://www.gnu.org/licenses/gpl.html
*/
(function(e){function t(){e("#hugrid").remove(),e("#hugridRows").remove(),e("#hugridUX").remove()}window.hugrid={toggleState:function(){window.hugrid.state=="on"?window.hugrid.state="off":window.hugrid.state=="off"&&(window.hugrid.state="on")}},makehugrid=function(){t();var n=document.createElement("div");n.id="hugrid",leftDiv=document.createElement("div"),leftDiv.className="mline mlineL",n.appendChild(leftDiv);for(var r=0;r<columns-1;r++)colDiv=document.createElement("div"),colDiv.className="hugcol",n.appendChild(colDiv),lineLDiv=document.createElement("div"),lineLDiv.className="lineL",colDiv.appendChild(lineLDiv),lineRDiv=document.createElement("div"),lineRDiv.className="lineR",colDiv.appendChild(lineRDiv);rightDiv=document.createElement("div"),rightDiv.className="mline mlineR",n.appendChild(rightDiv),document.body.appendChild(n);if(rowheight!==0){pageheight=e(document.body).height();var i=document.createElement("div");i.id="hugridRows";for(var r=0;r<pageheight/rowheight;r++)rowDiv=document.createElement("div"),rowDiv.className="hugrow",i.appendChild(rowDiv),lineB=document.createElement("div"),lineB.className="lineB",rowDiv.appendChild(lineB);document.body.appendChild(i)}e("#hugrid").css("width",pagewidth+pageUnits),typeof window.pageleftmargin=="number"?(e("#hugrid").css("left",pageleftmargin+pageUnits),e("#hugrid").css("margin","0")):typeof window.pagerightmargin=="number"?(e("#hugrid").css("right",pagerightmargin+pageUnits),e("#hugrid").css("left","auto"),e("#hugrid").css("margin","0")):pageUnits==="%"?(e("#hugrid").css("left",(100-pagewidth)/2+pageUnits),e("#hugrid").css("margin-left","auto")):e("#hugrid").css("margin-left","-"+pagewidth/2+pageUnits),e("#hugrid div.hugcol").css("margin-left",columnwidth+colUnits),e("#hugrid div.hugcol").css("width",gutterwidth+colUnits),e("#hugridRows").css("margin-top",pagetopmargin+"px"),e("#hugridRows div.hugrow").css("margin-top",rowheight-1+"px");var s=document.createElement("div");s.id="hugridUX",document.body.appendChild(s),e("#hugridUX").append('<div id="hugridButtonBkgd"></div><button id="hugridButton"></button>'),e("#hugridButton").append('<span id="hugbuttonON">ON</span>'),e("#hugridButton").append('<span id="hugbuttonOFF" style="display:none;">OFF</span>'),e("#hugridButton").click(function(){e("#hugridButton").toggleClass("buttonisoff"),e("#hugrid").toggle(),e("#hugridRows").toggle(),e("#hugridButton span").toggle(),window.hugrid.toggleState()})},setgridonload=function(){gridonload==="off"?(e("#hugridButton").toggleClass("buttonisoff"),e("#hugrid").toggle(),e("#hugridRows").toggle(),e("#hugridButton span").toggle(),window.hugrid.state="off"):window.hugrid.state="on"},setgridonresize=function(){window.hugrid.state==="off"&&(e("#hugridButton").toggleClass("buttonisoff"),e("#hugrid").toggle(),e("#hugridRows").toggle(),e("#hugridButton span").toggle())}})(jQuery);