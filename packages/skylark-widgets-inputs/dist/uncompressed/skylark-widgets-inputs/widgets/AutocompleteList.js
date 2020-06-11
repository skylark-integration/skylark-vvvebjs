define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {
	var AutocompleteList = Input.inherit({

	    events: [
	        ["autocompletelist.change", "onAutocompleteChange", "input"],
		 ],

		onAutocompleteChange: function(event, value, text) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [value, this]);
			}
		},

		setValue: function(value) {
			$('input', this.element).data("autocompleteList").setValue(value);
		},

		init: function(data) {
			
			this.element = this.render("textinput", data);
			
			$('input', this.element).autocompleteList(data);//using default parameters
			
			return this.element;
		}

	});

	return inputs.AutocompleteList = AutocompleteList;
});