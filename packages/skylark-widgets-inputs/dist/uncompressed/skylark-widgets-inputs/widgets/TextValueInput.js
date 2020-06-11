define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {

	var TextValueInput = Input.inherit({

	    events: [
	        ["blur", "onChange", "input"],
		    ["click", "onChange", "button" /*'select'*/],
		 ],
		
		init: function(data) {
			return this.render("textvalue", data);
		}	

	});

	return inputs.TextValueInput = TextValueInput;
});