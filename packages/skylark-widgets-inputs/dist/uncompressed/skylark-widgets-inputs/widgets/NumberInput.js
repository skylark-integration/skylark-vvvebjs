define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {

	var NumberInput = Input.inherit({

	    events: [
	        ["change", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("numberinput", data);
		}
	});

	return inputs.NumberInput = NumberInput;
});