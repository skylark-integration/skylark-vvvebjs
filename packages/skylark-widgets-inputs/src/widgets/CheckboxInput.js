define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {

	var CheckboxInput = Input.inherit({


		onChange: function(event, node) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [this.checked, this]);
			}
		},

	    events: [
	        ["change", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("checkboxinput", data);
		}

	});

	return inputs.CheckboxInput = CheckboxInput;
});