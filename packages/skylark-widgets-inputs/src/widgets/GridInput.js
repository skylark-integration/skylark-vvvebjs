define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {
	var GridInput = Input.inherit({

	    events: [
	        ["change", "onChange", "select" /*'select'*/],
	        ["click", "onChange", "button" /*'select'*/],
		 ],
		

		setValue: function(value) {
			$('select', this.element).val(value);
		},
		
		init: function(data) {
			return this.render("grid", data);
		}	

	});

	return inputs.GridInput = GridInput;
});