define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {

	var SectionInput = Input.inherit({

	    events: [
	        ["click", "onChange", "button" /*'select'*/],
		 ],
		

		setValue: function(value) {
			return false;
		},
		
		init: function(data) {
			return this.render("sectioninput", data);
		}

	});

	return inputs.SectionInput = SectionInput;
});