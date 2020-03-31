define([
	"skylark-jquery",
	"./Vvveb"
],function($,Vvveb){
	return Vvveb.CodeEditor = {
		
		isActive: false,
		oldValue: '',
		doc:false,
		
		init: function(doc) {
			$("#vvveb-code-editor textarea").val(Vvveb.Builder.getHtml());

			$("#vvveb-code-editor textarea").keyup(function () 
			{
				delay(Vvveb.Builder.setHtml(this.value), 1000);
			});

			//load code on document changes
			Vvveb.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore", function (e) { Vvveb.CodeEditor.setValue();});
			//load code when a new url is loaded
			Vvveb.Builder.documentFrame.on("load", function (e) { Vvveb.CodeEditor.setValue();});

			this.isActive = true;
		},

		setValue: function(value) {
			if (this.isActive)
			{
				$("#vvveb-code-editor textarea").val(Vvveb.Builder.getHtml());
			}
		},

		destroy: function(element) {
			//this.isActive = false;
		},

		toggle: function() {
			if (this.isActive != true)
			{
				this.isActive = true;
				return this.init();
			}
			this.isActive = false;
			this.destroy();
		}

	}

});


