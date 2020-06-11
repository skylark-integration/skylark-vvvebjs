define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {
	var TextInput = Input.inherit({

	    events: [
	        ["blur", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("textinput", data);
		}		

	});

	return inputs.TextInput = TextInput;
});