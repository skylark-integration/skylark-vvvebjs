define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./tmpl"
],function(langx, $,inputs,tmpl) {
	var Input = langx.Evented.inherit({
		
		init: function(name) {
		},

		onChange: function(event, node) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [this.value, this]);
			}
		},

		renderTemplate: function(name, data) {
			return tmpl("visualizer-input-" + name, data);
		},

		setValue: function(value) {
			$('input', this.element).val(value);
		},
		
		render: function(name, data) {
			this.element = $(this.renderTemplate(name, data));
			
			//bind events
			if (this.events) {
				for (var i in this.events) {
					var ev = this.events[i][0],
						fun = this[ this.events[i][1] ],
						el = this.events[i][2];
				
					this.element.on(ev, el, {
						element: this.element, 
						input:this
					},fun);
				}
			}

			return this.element;
		}
	});

	return inputs.Input = Input;
});