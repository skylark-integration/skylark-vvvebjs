define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./TextInput",
	"./tmpl"
],function(langx, $,inputs,TextInput,tmpl) {
	var LinkInput = TextInput.inherit({

	    events: [
	        ["change", "onChange", "input"],
		],
		
		init: function(data) {
			return this.render("textinput", data);
		}	

	});

	return inputs.LinkInput = LinkInput;
});