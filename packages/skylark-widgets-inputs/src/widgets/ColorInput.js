define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {

	var ColorInput = Input.inherit({

		 //html5 color input only supports setting values as hex colors even if the picker returns only rgb
		 rgb2hex: function(rgb) {
			 
			 if (rgb)
			 {
			 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
			 
			 return (rgb && rgb.length === 4) ? "#" +
			  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
			  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
			  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : rgb;
			 }
		},

	    events: [
	        ["change", "onChange", "input"],
		 ],

		setValue: function(value) {
			$('input', this.element).val(this.rgb2hex(value));
		},
		
		init: function(data) {
			return this.render("colorinput", data);
		}
	
	});

	return inputs.ColorInput = ColorInput;
});