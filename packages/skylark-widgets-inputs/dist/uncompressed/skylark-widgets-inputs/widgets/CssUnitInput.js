define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {
	var CssUnitInput = Input.inherit({

		number:0,
		unit:"px",

	    events: [
	        ["change", "onChange", "select"],
	        ["change keyup mouseup", "onChange", "input"],
		 ],
			
		onChange: function(event) {
			
			if (event.data && event.data.element)
			{
				input = event.data.input;
				if (this.value != "") input[this.name] = this.value;// this.name = unit or number	
				if (input['unit'] == "") input['unit'] = "px";//if unit is not set use default px
				
				var value = "";	
				if (input.unit == "auto")  
				{
					$(event.data.element).addClass("auto"); 
					value = input.unit;
				}
				else 
				{
					$(event.data.element).removeClass("auto"); 
					value = input.number + input.unit;
				}
				
				event.data.element.trigger('propertyChange', [value, this]);
			}
		},
		
		setValue: function(value) {
			this.number = parseInt(value);
			this.unit = value.replace(this.number, '');
			
			if (this.unit == "auto") $(this.element).addClass("auto");

			$('input', this.element).val(this.number);
			$('select', this.element).val(this.unit);
		},
		
		init: function(data) {
			return this.render("cssunitinput", data);
		}	

	});

	return inputs.CssUnitInput = CssUnitInput;
});