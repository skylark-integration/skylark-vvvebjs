define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {

	var ButtonInput = Input.inherit({


	    events: [
	        ["click", "onChange", "button" /*'select'*/],
		 ],
		

		setValue: function(value) {
			$('button', this.element).val(value);
		},
		
		init: function(data) {
			return this.render("button", data);
		}
		
	});

	return inputs.ButtonInput = ButtonInput;
});