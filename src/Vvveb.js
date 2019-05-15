define([
	"skylark-langx/skylark"
],function(skylark){

 var Vvveb = {};

var delay = Vvveb.delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

var getStyle = Vvveb.getStyle = function (el,styleProp) {
	value = "";
	//var el = document.getElementById(el);
	if (el.style && el.style.length > 0 && el.style[styleProp])//check inline
		var value = el.style[styleProp];
	else
	if (el.currentStyle)	//check defined css
		var value = el.currentStyle[styleProp];
	else if (window.getComputedStyle)
	{
		var value = document.defaultView.getDefaultComputedStyle ? 
						document.defaultView.getDefaultComputedStyle(el,null).getPropertyValue(styleProp) : 
						window.getComputedStyle(el,null).getPropertyValue(styleProp);
	}
	
	return value;
} ;

var isElement = Vvveb.isElement	=  function (obj){
   return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object")/* && obj.tagName != "BODY"*/;
};


var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;


Vvveb.defaultComponent = "_base";
Vvveb.preservePropertySections = true;
Vvveb.dragIcon = 'icon';//icon = use component icon when dragging | html = use component html to create draggable element

Vvveb.baseUrl =  document.currentScript?document.currentScript.src.replace(/[^\/]*?\.js$/,''):'';



	// Toggle fullscreen
	function launchFullScreen(document) {
	  if(document.documentElement.requestFullScreen) {
	    
			if (document.FullScreenElement)
				document.exitFullScreen();
			else
				document.documentElement.requestFullScreen();
	//mozilla		
	  } else if(document.documentElement.mozRequestFullScreen) {

			if (document.mozFullScreenElement)
				document.mozCancelFullScreen();
			else
				document.documentElement.mozRequestFullScreen();
	//webkit	  
	  } else if(document.documentElement.webkitRequestFullScreen) {

			if (document.webkitFullscreenElement)
				document.webkitExitFullscreen();
			else
				document.documentElement.webkitRequestFullScreen();
	//ie	  
	  } else if(document.documentElement.msRequestFullscreen) {

			if (document.msFullScreenElement)
				document.msExitFullscreen();
			else
				document.documentElement.msRequestFullscreen();
	  }
	}

	return skylark.attach("itg.Vvveb",Vvveb);
});