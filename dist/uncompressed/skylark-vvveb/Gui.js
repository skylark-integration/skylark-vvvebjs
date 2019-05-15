define([
	"skylark-utils-dom/query",
	"./Vvveb",
	"./Builder",
	"./WysiwygEditor",
	"skylark-bootstrap4/modal"
],function($,Vvveb){
	var Gui = {
		
		init: function() {
			$("[data-vvveb-action]").each(function () {
				on = "click";
				if (this.dataset.vvvebOn) on = this.dataset.vvvebOn;
				
				$(this).on(on, Vvveb.Gui[this.dataset.vvvebAction]);
				if (this.dataset.vvvebShortcut)
				{
					$(document).on('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
					$(window.FrameDocument, window.FrameWindow).on('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
				}
			});
		},
		
		undo : function () {
			if (Vvveb.WysiwygEditor.isActive) 
			{
				Vvveb.WysiwygEditor.undo();
			} else
			{
				Vvveb.Undo.undo();
			}
			Vvveb.Builder.selectNode();
		},
		
		redo : function () {
			if (Vvveb.WysiwygEditor.isActive) 
			{
				Vvveb.WysiwygEditor.redo();
			} else
			{
				Vvveb.Undo.redo();
			}
			Vvveb.Builder.selectNode();
		},
		
		//show modal with html content
		save : function () {
			$('#textarea-modal textarea').val(Vvveb.Builder.getHtml());
			$('#textarea-modal').modal();
		},
		
		//post html content through ajax to save to filesystem/db
		saveAjax : function () {
			
			var url = Vvveb.FileManager.getCurrentUrl();
			
			return Vvveb.Builder.saveAjax(url, null, function (data) {
				$('#message-modal').modal().find(".modal-body").html("File saved at: " + data);
			});		
		},
		
		download : function () {
			filename = /[^\/]+$/.exec(Vvveb.Builder.iframe.src)[0];
			uriContent = "data:application/octet-stream,"  + encodeURIComponent(Vvveb.Builder.getHtml());

			var link = document.createElement('a');
			if ('download' in link)
			{
				link.download = filename;
				link.href = uriContent;
				link.target = "_blank";
				
				document.body.appendChild(link);
				result = link.click();
				document.body.removeChild(link);
				link.remove();
				
			} else
			{
				location.href = uriContent;
			}
		},
		
		viewport : function () {
			$("#canvas").attr("class", this.dataset.view);
		},
		
		toggleEditor : function () {
			$("#vvveb-builder").toggleClass("bottom-panel-expand");
			$("#toggleEditorJsExecute").toggle();
			Vvveb.CodeEditor.toggle();
		},
		
		toggleEditorJsExecute : function () {
			Vvveb.Builder.runJsOnSetHtml = this.checked;
		},
		
		preview : function () {
			(Vvveb.Builder.isPreview == true)?Vvveb.Builder.isPreview = false:Vvveb.Builder.isPreview = true;
			$("#iframe-layer").toggle();
			$("#vvveb-builder").toggleClass("preview");
		},
		
		fullscreen : function () {
			Vvveb.launchFullScreen(document); // the whole page
		},
		
		componentSearch : function () {
			searchText = this.value;
			
			$("#left-panel .components-list li ol li").each(function () {
				$this = $(this);
				
				$this.hide();
				if ($this.data("search").indexOf(searchText) > -1) $this.show();
			});
		},
		
		clearComponentSearch : function () {
			$(".component-search").val("").keyup();
		},
		
		blockSearch : function () {
			searchText = this.value;
			
			$("#left-panel .blocks-list li ol li").each(function () {
				$this = $(this);
				
				$this.hide();
				if ($this.data("search").indexOf(searchText) > -1) $this.show();
			});
		},
		
		clearBlockSearch : function () {
			$(".block-search").val("").keyup();
		},
		
		addBoxComponentSearch : function () {
			searchText = this.value;
			
			$("#add-section-box .components-list li ol li").each(function () {
				$this = $(this);
				
				$this.hide();
				if ($this.data("search").indexOf(searchText) > -1) $this.show();
			});
		},
		
		
		addBoxBlockSearch : function () {
			searchText = this.value;
			
			$("#add-section-box .blocks-list li ol li").each(function () {
				$this = $(this);
				
				$this.hide();
				if ($this.data("search").indexOf(searchText) > -1) $this.show();
			});
		},

	
		newPage : function () { //Pages, file/components tree 
			
			var newPageModal = $('#new-page-modal');
			
			newPageModal.modal("show").find("form").off("submit").submit(function( event ) {

				var title = $("input[name=title]", newPageModal).val();
				var startTemplateUrl = $("select[name=startTemplateUrl]", newPageModal).val();
				var fileName = $("input[name=fileName]", newPageModal).val();
				
				//replace nonalphanumeric with dashes and lowercase for name
				var name = title.replace(/\W+/g, '-').toLowerCase();
					//allow only alphanumeric, dot char for extension (eg .html) and / to allow typing full path including folders
					fileName = fileName.replace(/[^A-Za-z0-9\.\/]+/g, '-').toLowerCase();
				
				//add your server url/prefix/path if needed
				var url = "" + fileName;
				

				Vvveb.FileManager.addPage(name, title, url);
				event.preventDefault();

				return Vvveb.Builder.saveAjax(url, startTemplateUrl, function (data) {
						Vvveb.FileManager.loadPage(name);
						Vvveb.FileManager.scrollBottom();
						newPageModal.modal("hide");
				});
			});
			
		},
		
		deletePage : function () {
			
		},

		setDesignerMode : function () {
			//aria-pressed attribute is updated after action is called and we check for false instead of true
			var designerMode = this.attributes["aria-pressed"].value != "true";
			Vvveb.Builder.setDesignerMode(designerMode);
		}
		
	}

	return Vvveb.Gui = Gui;
});


