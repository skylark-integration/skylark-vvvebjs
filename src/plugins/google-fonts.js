define([
	"../Components",
	"../inputs"
],function(Components,inputs){
	Components.extend("_base", "_base", {
		 properties: [
		 {
	        name: "Font family",
	        key: "font-family",
			htmlAttr: "style",
	        sort: Components.base_sort++,
	        col:6,
			inline:true,
	        inputtype: inputs.SelectInput,
	        data: {
				options: [{
					value: "",
					text: "extended"
				}, {
					value: "Ggoogle ",
					text: "google"
				}]
			}
		}]
	});	
});
