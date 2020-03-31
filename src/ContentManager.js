define([
	"skylark-jquery",
	"./Vvveb"
],function($,Vvveb){
	return Vvveb.ContentManager = {
		getAttr: function(element, attrName) {
			return element.attr(attrName);
		},
		
		setAttr: function(element, attrName, value) {
			return element.attr(attrName, value);
		},
		
		setHtml: function(element, html) {
			return element.html(html);
		},
		
		getHtml: function(element) {
			return element.html();
		}
	}

});