define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./TextInput",
	"./tmpl"
],function(langx, $,inputs,TextInput,tmpl) {

	var ValueTextInput = TextInput.inherit({

	    events: [
	        ["blur", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("textinput", data);
		}	

	});

	return inputs.ValueTextInput = ValueTextInput;
});