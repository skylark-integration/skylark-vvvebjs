define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {

	var RadioInput = Input.inherit({

		onChange: function(event, node) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [this.value, this]);
			}
		},

	    events: [
	        ["change", "onChange", "input"],
		 ],

		setValue: function(value) {
			$('input', this.element).removeAttr('checked');
			if (value)
			$("input[value=" + value + "]", this.element).attr("checked", "true").prop('checked', true);
		},
		
		init: function(data) {
			return this.render("radioinput", data);
		}	

	});

	return inputs.RadioInput = RadioInput;
});