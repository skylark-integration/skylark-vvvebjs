define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {
	var SelectInput = Input.inherit({

	    events: [
	        ["change", "onChange", "select"],
		 ],
		

		setValue: function(value) {
			$('select', this.element).val(value);
		},
		
		init: function(data) {
			return this.render("select", data);
		}

	});

	return inputs.SelectInput = SelectInput;
});