define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./TextInput",
	"./tmpl"
],function(langx, $,inputs,TextInput,tmpl) {

	var ToggleInput = TextInput.inherit({

		onChange: function(event, node) {
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [this.checked?this.getAttribute("data-value-on"):this.getAttribute("data-value-off"), this]);
			}
		},

	    events: [
	        ["change", "onChange", "input"],
		 ],

		init: function(data) {
			return this.render("toggle", data);
		}
	});

	return inputs.ToggleInput = ToggleInput;
});