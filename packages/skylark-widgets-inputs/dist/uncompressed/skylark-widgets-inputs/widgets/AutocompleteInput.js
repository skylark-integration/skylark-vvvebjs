define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {
	var AutocompleteInput = Input.inherit({

	    events: [
	        ["autocomplete.change", "onAutocompleteChange", "input"],
		 ],

		onAutocompleteChange: function(event, value, text) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [value, this]);
			}
		},

		init: function(data) {
			
			this.element = this.render("textinput", data);
			
			$('input', this.element).autocomplete(data.url);//using default parameters
			
			return this.element;
		}
	});

	return inputs.AutocompleteInput = AutocompleteInput;
});