define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./RadioInput",
	"./tmpl"
],function(langx, $,inputs,RadioInput,tmpl) {
	var RadioButtonInput = RadioInput.inherit({

		setValue: function(value) {
			$('input', this.element).removeAttr('checked');
			$('btn', this.element).removeClass('active');
			if (value && value != "")
			{
				$("input[value=" + value + "]", this.element).attr("checked", "true").prop('checked', true).parent().button("toggle");
			}
		},

		init: function(data) {
			return this.render("radiobuttoninput", data);
		}	

	});

	return inputs.RadioButtonInput = RadioButtonInput;
});