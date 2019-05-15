define([
	"./Vvveb"
],function(Vvveb){
	return Vvveb.Blocks = {
		
		_blocks: {},

		get: function(type) {
			return this._blocks[type];
		},

		add: function(type, data) {
			data.type = type;
			this._blocks[type] = data;
		},
	};	
});