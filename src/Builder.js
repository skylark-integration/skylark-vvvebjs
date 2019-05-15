define([
	"skylark-utils-dom/query",
	"./Vvveb"
],function($,Vvveb){
	var jQuery = $;
	
	return Vvveb.Builder = {

		component : {},
		dragMoveMutation : false,
		isPreview : false,
		runJsOnSetHtml : false,
		designerMode : false,
		
		init: function(url, callback) {

			var self = this;
			
			self.loadControlGroups();
			self.loadBlockGroups();
			
			self.selectedEl = null;
			self.highlightEl = null;
			self.initCallback = callback;
			
	        self.documentFrame = $("#iframe-wrapper > iframe");
	        self.canvas = $("#canvas");

			self._loadIframe(url);
			
			self._initDragdrop();
			
			self._initBox();

			self.dragElement = null;
		},
		
		loadControlGroups : function() {	

			var componentsList = $(".components-list");
			componentsList.empty();
			var item = {}, component = {};
			
			componentsList.each(function ()
			{
				var list = $(this);
				var type = this.dataset.type;
				
				for (group in Vvveb.ComponentsGroup)	
				{
					list.append('<li class="header clearfix" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_comphead_' + group + '">' + group + '  <div class="header-arrow"></div>\
										   </label><input class="header_check" type="checkbox" checked="true" id="' + type + '_comphead_' + group + '">  <ol></ol></li>');

					var componentsSubList = list.find('li[data-section="' + group + '"]  ol');
					
					components = Vvveb.ComponentsGroup[ group ];
					
					for (i in components)
					{
						componentType = components[i];
						component = Vvveb.Components.get(componentType);
						
						if (component)
						{
							item = $('<li data-section="' + group + '" data-drag-type=component data-type="' + componentType + '" data-search="' + component.name.toLowerCase() + '"><a href="#">' + component.name + "</a></li>");

							if (component.image) {

								item.css({
									backgroundImage: "url(" + component.image + ")", //backgroundImage: "url(" + 'libs/builder/' + component.image + ")",
									backgroundRepeat: "no-repeat"
								})
							}
							
							componentsSubList.append(item)
						}
					}
				}
			});
		 },
		 
		loadBlockGroups : function() {	

			var blocksList = $(".blocks-list");
			blocksList.empty();
			var item = {};

			blocksList.each(function ()
			{

				var list = $(this);
				var type = this.dataset.type;

				for (group in Vvveb.BlocksGroup)	
				{
					list.append('<li class="header" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_blockhead_' + group + '">' + group + '  <div class="header-arrow"></div>\
										   </label><input class="header_check" type="checkbox" checked="true" id="' + type + '_blockhead_' + group + '">  <ol></ol></li>');

					var blocksSubList = list.find('li[data-section="' + group + '"]  ol');
					blocks = Vvveb.BlocksGroup[ group ];

					for (i in blocks)
					{
						blockType = blocks[i];
						block = Vvveb.Blocks.get(blockType);
						
						if (block)
						{
							item = $('<li data-section="' + group + '" data-drag-type=block data-type="' + blockType + '" data-search="' + block.name.toLowerCase() + '"><a href="#">' + block.name + "</a></li>");

							if (block.image) {

								item.css({
									backgroundImage: "url(" + ((block.image.indexOf('//') == -1) ? 'libs/builder/':'') + block.image + ")",
									backgroundRepeat: "no-repeat"
								})
							}
							
							blocksSubList.append(item)
						}
					}
				}
			});
		 },
		
		loadUrl : function(url, callback) {	
			jQuery("#select-box").hide();
			
			self.initCallback = callback;
			if (Vvveb.Builder.iframe.src != url) Vvveb.Builder.iframe.src = url;
		},		
		_loadIframe : function(url) {	// iframe 

			var self = this;
			self.iframe = this.documentFrame.get(0);
			self.iframe.src = url;

		    return this.documentFrame.on("load", function() 
	        {
					window.FrameWindow = self.iframe.contentWindow;
					window.FrameDocument = self.iframe.contentWindow.document;

					$(window.FrameWindow).on( "beforeunload", function(event) {
						if (Vvveb.Undo.undoIndex <= 0)
						{
							var dialogText = "You have unsaved changes";
							event.returnValue = dialogText;
							return dialogText;
						}
					});
					
					jQuery(window.FrameWindow).on("scroll resize", function(event) {
					
							if (self.selectedEl)
							{
								var offset = self.selectedEl.offset();
								
								jQuery("#select-box").css(
									{"top": offset.top - self.frameDoc.scrollTop() , 
									 "left": offset.left - self.frameDoc.scrollLeft() , 
									 "width" : self.selectedEl.outerWidth(), 
									 "height": self.selectedEl.outerHeight(),
									 //"display": "block"
									 });			
									 
							}
							
							if (self.highlightEl)
							{
								var offset = self.highlightEl.offset();
								
								jQuery("#highlight-box").css(
									{"top": offset.top - self.frameDoc.scrollTop() , 
									 "left": offset.left - self.frameDoc.scrollLeft() , 
									 "width" : self.highlightEl.outerWidth(), 
									 "height": self.highlightEl.outerHeight(),
									 //"display": "block"
									 });			
							}
					});
				
					Vvveb.WysiwygEditor.init(window.FrameDocument);
					if (self.initCallback) self.initCallback();

	                return self._frameLoaded();
	        });		
	        
		},	
	    
	    _frameLoaded : function() {
			
			var self = Vvveb.Builder;
			
			self.frameDoc = $(window.FrameDocument);
			self.frameHtml = $(window.FrameDocument).find("html");
			self.frameBody = $(window.FrameDocument).find("body");
			self.frameHead = $(window.FrameDocument).find("head");
			
			//insert editor helpers like non editable areas
			self.frameHead.append('<link data-vvveb-helpers href="' + Vvveb.baseUrl + '../../css/vvvebjs-editor-helpers.css" rel="stylesheet">');

			self._initHighlight();
	    },	
	    
	    _getElementType: function(el) {
			
			//search for component attribute
			componentName = '';  
			   
			if (el.attributes)
			for (var j = 0; j < el.attributes.length; j++){
				
			  if (el.attributes[j].nodeName.indexOf('data-component') > -1)	
			  {
				componentName = el.attributes[j].nodeName.replace('data-component-', '');	
			  }
			}
			
			if (componentName != '') return componentName;

			return el.tagName;
		},
		
		loadNodeComponent:  function(node) {
			data = Vvveb.Components.matchNode(node);
			var component;
			
			if (data) 
				component = data.type;
			else 
				component = Vvveb.defaultComponent;
				
			Vvveb.Components.render(component);

		},
		
		selectNode:  function(node) {
			var self = this;
			
			if (!node)
			{
				jQuery("#select-box").hide();
				return;
			}
			
			if (self.texteditEl && self.selectedEl.get(0) != node) 
			{
				Vvveb.WysiwygEditor.destroy(self.texteditEl);
				jQuery("#select-box").removeClass("text-edit").find("#select-actions").show();
				self.texteditEl = null;
			}

			var target = jQuery(node);
			
			if (target)
			{
				self.selectedEl = target;

				try {
					var offset = target.offset();
						
					jQuery("#select-box").css(
						{"top": offset.top - self.frameDoc.scrollTop() , 
						 "left": offset.left - self.frameDoc.scrollLeft() , 
						 "width" : target.outerWidth(), 
						 "height": target.outerHeight(),
						 "display": "block",
						 });
				} catch(err) {
					console.log(err);
					return false;
				}
			}
				 
			jQuery("#highlight-name").html(this._getElementType(node));
			
		},

	 
	    _initHighlight: function() { // iframe highlight
			
			var self = Vvveb.Builder;
			
			self.frameHtml.on("mousemove touchmove", function(event) {
				
				if (event.target && Vvveb.isElement(event.target) && event.originalEvent)
				{
					self.highlightEl = target = jQuery(event.target);
					var offset = target.offset();
					var height = target.outerHeight();
					var halfHeight = Math.max(height / 2, 50);
					var width = target.outerWidth();
					var halfWidth = Math.max(width / 2, 50);
					
					var x = (event.clientX || event.originalEvent.clientX);
					var y = (event.clientY || event.originalEvent.clientY);
					
					if (self.isDragging)
					{
						var parent = self.highlightEl;

						try {
							if (event.originalEvent)
							{
								if ((offset.top  < (y - halfHeight)) || (offset.left  < (x - halfWidth)))
								{
									 if (isIE11) 
										self.highlightEl.append(self.dragElement); 
									 else 
										self.dragElement.appendTo(parent);
								} else
								{
									if (isIE11) 
									 self.highlightEl.prepend(self.dragElement); 
									else 
										self.dragElement.prependTo(parent);
								};
								
								if (self.designerMode)
								{
									var parentOffset = self.dragElement.offsetParent().offset();

									self.dragElement.css({
										"position": "absolute",
										'left': x - (parentOffset.left - self.frameDoc.scrollLeft()), 
										'top': y - (parentOffset.top - self.frameDoc.scrollTop()),
										});
								}
							}
							
						} catch(err) {
							console.log(err);
							return false;
						}
						
						if (!self.designerMode && self.iconDrag) self.iconDrag.css({'left': x + 275/*left panel width*/, 'top':y - 30 });					
					}// else //uncomment else to disable parent highlighting when dragging
					{
						
						jQuery("#highlight-box").css(
							{"top": offset.top - self.frameDoc.scrollTop() , 
							 "left": offset.left - self.frameDoc.scrollLeft() , 
							 "width" : width, 
							 "height": height,
							  "display" : event.target.hasAttribute('contenteditable')?"none":"block",
							  "border":self.isDragging?"1px dashed aqua":"",//when dragging highlight parent with green
							 });
							 
						jQuery("#highlight-name").html(self._getElementType(event.target));
						if (self.isDragging) jQuery("#highlight-name").hide(); else jQuery("#highlight-name").show();//hide tag name when dragging
					}
				}	
				
			});
			
			self.frameHtml.on("mouseup touchend", function(event) {
				if (self.isDragging)
				{
					self.isDragging = false;
					if (self.iconDrag) self.iconDrag.remove();
					$("#component-clone").remove();
					
					if (self.component.dragHtml) //if dragHtml is set for dragging then set real component html
					{
						newElement = $(self.component.html);
						self.dragElement.replaceWith(newElement);
						self.dragElement = newElement;
					}
					if (self.component.afterDrop) self.dragElement = self.component.afterDrop(self.dragElement);
					
					self.dragElement.css("border", "");
					
					node = self.dragElement.get(0);
					self.selectNode(node);
					self.loadNodeComponent(node);

					if (self.dragMoveMutation === false)
					{
						Vvveb.Undo.addMutation({type: 'childList', 
												target: node.parentNode, 
												addedNodes: [node], 
												nextSibling: node.nextSibling});
					} else
					{
						self.dragMoveMutation.newParent = node.parentNode;
						self.dragMoveMutation.newNextSibling = node.nextSibling;
						
						Vvveb.Undo.addMutation(self.dragMoveMutation);
						self.dragMoveMutation = false;
					}
				}
			});

			self.frameHtml.on("dblclick", function(event) {
				
				if (Vvveb.Builder.isPreview == false)
				{
					self.texteditEl = target = jQuery(event.target);

					Vvveb.WysiwygEditor.edit(self.texteditEl);
					
					self.texteditEl.attr({'contenteditable':true, 'spellcheckker':false});
					
					self.texteditEl.on("blur keyup paste input", function(event) {

						jQuery("#select-box").css({
								"width" : self.texteditEl.outerWidth(), 
								"height": self.texteditEl.outerHeight()
							 });
					});		
					
					jQuery("#select-box").addClass("text-edit").find("#select-actions").hide();
					jQuery("#highlight-box").hide();
				}
			});
			
			
			self.frameHtml.on("click", function(event) {
				
				if (Vvveb.Builder.isPreview == false)
				{
					if (event.target)
					{
						//if component properties is loaded in left panel tab instead of right panel show tab
						if ($(".component-properties-tab").is(":visible"))//if properites tab is enabled/visible 
							$('.component-properties-tab a').show().tab('show'); 
						
						self.selectNode(event.target);
						self.loadNodeComponent(event.target);
					}
					
					event.preventDefault();
					return false;
				}	
				
			});
			
		},
		
		_initBox: function() {
			var self = this;
			
			$("#drag-btn").on("mousedown", function(event) {
				jQuery("#select-box").hide();
				self.dragElement = self.selectedEl.css("position","");
				self.isDragging = true;
				
				node = self.dragElement.get(0);

				self.dragMoveMutation = {type: 'move', 
									target: node,
									oldParent: node.parentNode,
									oldNextSibling: node.nextSibling};
					
				//self.selectNode(false);
				event.preventDefault();
				return false;
			});
			
			$("#down-btn").on("click", function(event) {
				jQuery("#select-box").hide();

				node = self.selectedEl.get(0);
				oldParent = node.parentNode;
				oldNextSibling = node.nextSibling;

				next = self.selectedEl.next();
				
				if (next.length > 0)
				{
					next.after(self.selectedEl);
				} else
				{
					self.selectedEl.parent().after(self.selectedEl);
				}
				
				newParent = node.parentNode;
				newNextSibling = node.nextSibling;
				
				Vvveb.Undo.addMutation({type: 'move', 
										target: node,
										oldParent: oldParent,
										newParent: newParent,
										oldNextSibling: oldNextSibling,
										newNextSibling: newNextSibling});

				event.preventDefault();
				return false;
			});
			
			$("#up-btn").on("click", function(event) {
				jQuery("#select-box").hide();

				node = self.selectedEl.get(0);
				oldParent = node.parentNode;
				oldNextSibling = node.nextSibling;

				next = self.selectedEl.prev();
				
				if (next.length > 0)
				{
					next.before(self.selectedEl);
				} else
				{
					self.selectedEl.parent().before(self.selectedEl);
				}

				newParent = node.parentNode;
				newNextSibling = node.nextSibling;
				
				Vvveb.Undo.addMutation({type: 'move', 
										target: node,
										oldParent: oldParent,
										newParent: newParent,
										oldNextSibling: oldNextSibling,
										newNextSibling: newNextSibling});

				event.preventDefault();
				return false;
			});
			
			$("#clone-btn").on("click", function(event) {
				
				clone = self.selectedEl.clone();
				
				self.selectedEl.after(clone);
				
				self.selectedEl = clone.click();
				
				node = clone.get(0);
				Vvveb.Undo.addMutation({type: 'childList', 
										target: node.parentNode, 
										addedNodes: [node],
										nextSibling: node.nextSibling});
				
				event.preventDefault();
				return false;
			});
			
			$("#parent-btn").on("click", function(event) {
				
				node = self.selectedEl.parent().get(0);
				
				self.selectNode(node);
				self.loadNodeComponent(node);
				
				event.preventDefault();
				return false;
			});

			$("#delete-btn").on("click", function(event) {
				jQuery("#select-box").hide();
				
				node = self.selectedEl.get(0);
			
				Vvveb.Undo.addMutation({type: 'childList', 
										target: node.parentNode, 
										removedNodes: [node],
										nextSibling: node.nextSibling});

				self.selectedEl.remove();

				event.preventDefault();
				return false;
			});

			var addSectionBox = jQuery("#add-section-box");
			var addSectionElement = {};
			
			$("#add-section-btn").on("click", function(event) {
				
				addSectionElement = self.highlightEl; 

				var offset = jQuery(this).offset();			
				
				addSectionBox.css(
					{"top": offset.top - self.frameDoc.scrollTop() - $(this).outerHeight(), 
					 "left": offset.left - (addSectionBox.outerWidth() / 2) - (275) - self.frameDoc.scrollLeft(), 
					 "display": "block",
					 });
				
				event.preventDefault();
				return false;
			});
			
			$("#close-section-btn").on("click", function(event) {
				addSectionBox.hide();
			});
			
			function addSectionComponent(html, after = true) 
			{
				var node = $(html);
				
				if (after)
				{
					addSectionElement.after(node);
				} else
				{
					addSectionElement.append(node);
				}
				
				node = node.get(0);
				
				Vvveb.Undo.addMutation({type: 'childList', 
										target: node.parentNode, 
										addedNodes: [node], 
										nextSibling: node.nextSibling});
			}
			
			$(".components-list li ol li", addSectionBox).on("click", function(event) {
				var html = Vvveb.Components.get(this.dataset.type).html;

				addSectionComponent(html, (jQuery("[name='add-section-insert-mode']:checked").val() == "after"));

				addSectionBox.hide();
			});

			$(".blocks-list li ol li", addSectionBox).on("click", function(event) {
				var html = Vvveb.Blocks.get(this.dataset.type).html;

				addSectionComponent(html, (jQuery("[name='add-section-insert-mode']:checked").val() == "after"));

				addSectionBox.hide();
			});
			
		},	

	
		_initDragdrop : function() {//drag and drop

			var self = this;
			self.isDragging = false;	
			
			$('.drag-elements-sidepane ul > li > ol > li').on("mousedown touchstart", function(event) {
				
				$this = jQuery(this);
				
				$("#component-clone").remove();
				
				if ($this.data("drag-type") == "component")
					self.component = Vvveb.Components.get($this.data("type"));
				else
					self.component = Vvveb.Blocks.get($this.data("type"));
				
				if (self.component.dragHtml)
				{
					html = self.component.dragHtml;
				} else
				{
					html = self.component.html;
				}
				
				self.dragElement = $(html);
				self.dragElement.css("border", "1px dashed #4285f4");
				
				if (self.component.dragStart) self.dragElement = self.component.dragStart(self.dragElement);

				self.isDragging = true;
				if (Vvveb.dragIcon == 'html')
				{
					self.iconDrag = $(html).attr("id", "dragElement-clone").css('position', 'absolute');
				}
				else if (self.designerMode == false)
				{
					self.iconDrag = $('<img src=""/>').attr({"id": "dragElement-clone", 'src': $this.css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1')}).
					css({'z-index':100, 'position':'absolute', 'width':'64px', 'height':'64px', 'top': event.originalEvent.y, 'left': event.originalEvent.x});
				}
					
				$('body').append(self.iconDrag);
				
				event.preventDefault();
				return false;
			});
			
			$('body').on('mouseup touchend', function(event) {
				if (self.iconDrag && self.isDragging == true)
				{
					self.isDragging = false;
					$("#component-clone").remove();
					self.iconDrag.remove();
					if(self.dragElement){
						self.dragElement.remove();
					}
				}
			});
			
			$('body').on('mousemove touchmove', function(event) {
				if (self.iconDrag && self.isDragging == true)
				{
					var x = (event.clientX || event.originalEvent.clientX);
					var y = (event.clientY || event.originalEvent.clientY);

					self.iconDrag.css({'left': x - 60, 'top': y - 30});

					elementMouseIsOver = document.elementFromPoint(x - 60, y - 40);
					
					//if drag elements hovers over iframe switch to iframe mouseover handler	
					if (elementMouseIsOver && elementMouseIsOver.tagName == 'IFRAME')
					{
						self.frameBody.trigger("mousemove", event);
						event.stopPropagation();
						self.selectNode(false);
					}
				}
			});
			
			$('.drag-elements-sidepane ul > ol > li > li').on("mouseup touchend", function(event) {
				self.isDragging = false;
				$("#component-clone").remove();
			});
				
		},
		
		removeHelpers: function (html, keepHelperAttributes = false)
		{
			//tags like stylesheets or scripts 
			html = html.replace(/<.*?data-vvveb-helpers.*?>/gi, "");
			//attributes
			if (!keepHelperAttributes)
			{
				html = html.replace(/\s*data-vvveb-\w+(=["'].*?["'])?\s*/gi, "");
			}
			
			return html;
		},

		getHtml: function(keepHelperAttributes = true) 
		{
			var doc = window.FrameDocument;
			var hasDoctpe = (doc.doctype !== null);
			var html = "";
			
			if (hasDoctpe) html =
			"<!DOCTYPE "
	         + doc.doctype.name
	         + (doc.doctype.publicId ? ' PUBLIC "' + doc.doctype.publicId + '"' : '')
	         + (!doc.doctype.publicId && doc.doctype.systemId ? ' SYSTEM' : '') 
	         + (doc.doctype.systemId ? ' "' + doc.doctype.systemId + '"' : '')
	         + ">\n";
	          
	         html +=  doc.documentElement.innerHTML + "\n</html>";
	         
	         return this.removeHelpers(html, keepHelperAttributes);
		},
		
		setHtml: function(html) 
		{
			//update only body to avoid breaking iframe css/js relative paths
			start = html.indexOf("<body");
	        end = html.indexOf("</body");		

	        if (start >= 0 && end >= 0) {
	            body = html.slice(html.indexOf(">", start) + 1, end);
	        } else {
	            body = html
	        }
	        
	        if (this.runJsOnSetHtml)
				self.frameBody.html(body);
			else
				window.FrameDocument.body.innerHTML = body;
	        
			
			//below methods brake document relative css and js paths
			//return self.iframe.outerHTML = html;
			//return self.documentFrame.html(html);
			//return self.documentFrame.attr("srcdoc", html);
		},
		
		saveAjax: function(fileName, startTemplateUrl, callback)
		{
			var data = {};
			data["fileName"] = (fileName && fileName != "") ? fileName : Vvveb.FileManager.getCurrentUrl();
			data["startTemplateUrl"] = startTemplateUrl;
			if (!startTemplateUrl || startTemplateUrl == null)
			{
				data["html"] = this.getHtml();
			}

			$.ajax({
				type: "POST",
				url: 'save.php',//set your server side save script url
				data: data,
				cache: false,
				success: function (data) {
					
					if (callback) callback(data);
					
				},
				error: function (data) {
					alert(data.responseText);
				}
			});					
		},
		
		setDesignerMode: function(designerMode = false)
		{
			this.designerMode = designerMode;
		}

	};

});


