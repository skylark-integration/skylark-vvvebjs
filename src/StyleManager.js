define([
	"skylark-jquery",
	"./Vvveb"
],function($,Vvveb){
	return Vvveb.StyleManager = {
		setStyle: function(element, styleProp, value) {
			return element.css(styleProp, value);
		},
		
		
		_getCssStyle: function(element, styleProp){
			var value = "";
			var el = element.get(0);
			
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
		},
		
		getStyle: function(element,styleProp){
			return this._getCssStyle(element, styleProp);
		}
	}	
});