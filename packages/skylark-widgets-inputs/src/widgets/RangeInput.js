define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {
	var RangeInput = Input.inherit({


	    events: [
	        ["change", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("rangeinput", data);
		}

	});

	return inputs.RangeInput = RangeInput;
});