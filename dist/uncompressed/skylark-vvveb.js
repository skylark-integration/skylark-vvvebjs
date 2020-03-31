/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-vvveb/Vvveb',[
	"skylark-langx/skylark",
	"skylark-bootstrap3"

],function(skylark){

 var Vvveb = {};

var delay = Vvveb.delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

var getStyle = Vvveb.getStyle = function (el,styleProp) {
	value = "";
	//var el = document.getElementById(el);
	if (el.style && el.style.length > 0 && el.style[styleProp])//check inline
		var value = el.style[styleProp];
	else
	if (el.currentStyle)	//check defined css
		var value = el.currentStyle[styleProp];
	else if (window.getComputedStyle)
	{
		var value = document.defaultView.getDefaultComputedStyle ? 
						document.defaultView.getDefaultComputedStyle(el,null).getPropertyValue(styleProp) : 
						window.getComputedStyle(el,null).getPropertyValue(styleProp);
	}
	
	return value;
} ;

var isElement = Vvveb.isElement	=  function (obj){
   return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object")/* && obj.tagName != "BODY"*/;
};


var isIE11 = Vvveb.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;


Vvveb.defaultComponent = "_base";
Vvveb.preservePropertySections = true;
Vvveb.dragIcon = 'icon';//icon = use component icon when dragging | html = use component html to create draggable element

Vvveb.baseUrl =  document.currentScript?document.currentScript.src.replace(/[^\/]*?\.js$/,''):'';



	// Toggle fullscreen
    Vvveb.launchFullScreen	=	function launchFullScreen(document) {
	  if(document.documentElement.requestFullScreen) {
	    
			if (document.FullScreenElement)
				document.exitFullScreen();
			else
				document.documentElement.requestFullScreen();
	//mozilla		
	  } else if(document.documentElement.mozRequestFullScreen) {

			if (document.mozFullScreenElement)
				document.mozCancelFullScreen();
			else
				document.documentElement.mozRequestFullScreen();
	//webkit	  
	  } else if(document.documentElement.webkitRequestFullScreen) {

			if (document.webkitFullscreenElement)
				document.webkitExitFullscreen();
			else
				document.documentElement.webkitRequestFullScreen();
	//ie	  
	  } else if(document.documentElement.msRequestFullscreen) {

			if (document.msFullScreenElement)
				document.msExitFullscreen();
			else
				document.documentElement.msRequestFullscreen();
	  }
	};

	return skylark.attach("intg.Vvveb",Vvveb);
});
define('skylark-vvveb/BlocksGroup',[
	"./Vvveb"
],function(Vvveb){

	return Vvveb.BlocksGroup = {};

});
define('skylark-vvveb/Blocks',[
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
define('skylark-vvveb/Builder',[
	"skylark-jquery",
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
		
	/* controls */    	
		loadControlGroups : function() {	

			var componentsList = $(".components-list");
			componentsList.empty();
			var item = {}, component = {};
			var count = 0;
			
			componentsList.each(function ()
			{
				var list = $(this);
				var type = this.dataset.type;
				count ++;
				
				for (group in Vvveb.ComponentsGroup)	
				{
					list.append('<li class="header clearfix" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_comphead_' + group + count + '">' + group + '  <div class="header-arrow"></div>\
										   </label><input class="header_check" type="checkbox" checked="true" id="' + type + '_comphead_' + group + count + '">  <ol></ol></li>');

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
									backgroundImage: "url(" + 'libs/builder/' + component.image + ")",
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
			var self = this;
			jQuery("#select-box").hide();
			
			self.initCallback = callback;
			if (Vvveb.Builder.iframe.src != url) Vvveb.Builder.iframe.src = url;
		},
		
	/* iframe */
		_loadIframe : function(url) {	

			var self = this;
			self.iframe = this.documentFrame.get(0);
			self.iframe.src = url;

		    return this.documentFrame.on("load", function() 
	        {
					window.FrameWindow = self.iframe.contentWindow;
					window.FrameDocument = self.iframe.contentWindow.document;
					var addSectionBox = jQuery("#add-section-box"); 
					var highlightBox = jQuery("#highlight-box").hide(); 
					

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
								
								highlightBox.css(
									{"top": offset.top - self.frameDoc.scrollTop() , 
									 "left": offset.left - self.frameDoc.scrollLeft() , 
									 "width" : self.highlightEl.outerWidth(), 
									 "height": self.highlightEl.outerHeight(),
									 //"display": "block"
									 });		
									 
								
								addSectionBox.hide();
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
			
			$(window).triggerHandler("vvveb.iframe.loaded", self.frameDoc);
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

	/* iframe highlight */    
	    _initHighlight: function() {
			
			var self = Vvveb.Builder;
			
			self.frameHtml.on("mousemove touchmove", function(event) {
				
				if (event.target && isElement(event.target) && event.originalEvent)
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

						if (height < 50) 
						{
							jQuery("#section-actions").addClass("outside");	 
						} else
						{
							jQuery("#section-actions").removeClass("outside");	
						}
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

					if (self.dragMoveMutation === false)
					{				
						if (self.component.dragHtml) //if dragHtml is set for dragging then set real component html
						{
							newElement = $(self.component.html);
							self.dragElement.replaceWith(newElement);
							self.dragElement = newElement;
						}
						if (self.component.afterDrop) self.dragElement = self.component.afterDrop(self.dragElement);
					}
					
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

				var offset = jQuery(addSectionElement).offset();			
				var top = (offset.top - self.frameDoc.scrollTop()) + addSectionElement.outerHeight();
				var left = (offset.left - self.frameDoc.scrollLeft()) + (addSectionElement.outerWidth() / 2) - (addSectionBox.outerWidth() / 2);
				var outerHeight = $(window.FrameWindow).height() + self.frameDoc.scrollTop();

				//check if box is out of viewport and move inside
				if (left < 0) left = 0;
				if (top < 0) top = 0;
				if ((left + addSectionBox.outerWidth()) > self.frameDoc.outerWidth()) left = self.frameDoc.outerWidth() - addSectionBox.outerWidth();
				if (((top + addSectionBox.outerHeight()) + self.frameDoc.scrollTop()) > outerHeight) top = top - addSectionBox.outerHeight();
				
				
				addSectionBox.css(
					{"top": top, 
					 "left": left, 
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

	/* drag and drop */
		_initDragdrop : function() {

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
			
			$(window).triggerHandler("vvveb.getHtml.before", doc);
			
			if (hasDoctpe) html =
			"<!DOCTYPE "
	         + doc.doctype.name
	         + (doc.doctype.publicId ? ' PUBLIC "' + doc.doctype.publicId + '"' : '')
	         + (!doc.doctype.publicId && doc.doctype.systemId ? ' SYSTEM' : '') 
	         + (doc.doctype.systemId ? ' "' + doc.doctype.systemId + '"' : '')
	         + ">\n";
	          
	         html +=  doc.documentElement.innerHTML + "\n</html>";
	         
	         html = this.removeHelpers(html, keepHelperAttributes);
	         
	         var filter = $(window).triggerHandler("vvveb.getHtml.after", html);
	         if (filter) return filter;
	         
	         return html;
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



define('skylark-vvveb/CodeEditor',[
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



define('skylark-vvveb/ComponentsGroup',[
	"./Vvveb"
],function(Vvveb){

	return Vvveb.ComponentsGroup = {};

});
define('skylark-vvveb/tmpl',[
	"./Vvveb"
],function(Vvveb){
	
// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
  var cache = {};
  
  function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
	var fn = /^[-a-zA-Z0-9]+$/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
              
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
         
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
         
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("{%").join("\t")
          .replace(/((^|%})[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%}/g, "',$1,'")
          .split("\t").join("');")
          .split("%}").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };

  return Vvveb.tmpl = tmpl;

});
define('skylark-vvveb/inputs',[
	"skylark-langx/langx",
	"skylark-jquery",
	"./Vvveb",
	"./tmpl",
	"skylark-bootstrap3/button",
],function(langx, $,Vvveb,tmpl) {
	var Input = {
		
		init: function(name) {
		},


		onChange: function(event, node) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [this.value, this]);
			}
		},

		renderTemplate: function(name, data) {
			return tmpl("vvveb-input-" + name, data);
		},

		setValue: function(value) {
			$('input', this.element).val(value);
		},
		
		render: function(name, data) {
			this.element = $(this.renderTemplate(name, data));
			
			//bind events
			if (this.events)
			for (var i in this.events)
			{
				ev = this.events[i][0];
				fun = this[ this.events[i][1] ];
				el = this.events[i][2];
			
				this.element.on(ev, el, {element: this.element, input:this}, fun);
			}

			return this.element;
		}
	};

	var TextInput = langx.extend({}, Input, {

	    events: [
	        ["blur", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("textinput", data);
		},
	  }
	);

	var CheckboxInput = langx.extend({}, Input, {

		onChange: function(event, node) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [this.checked, this]);
			}
		},

	    events: [
	        ["change", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("checkboxinput", data);
		},
	  }
	);

	var SelectInput = langx.extend({}, Input, {
		
	    events: [
	        ["change", "onChange", "select"],
		 ],
		

		setValue: function(value) {
			$('select', this.element).val(value);
		},
		
		init: function(data) {
			return this.render("select", data);
		},
		
	  }
	);


	var LinkInput = langx.extend({}, TextInput, {

	    events: [
	        ["change", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("textinput", data);
		},
	  }
	);

	var RangeInput = langx.extend({}, Input, {

	    events: [
	        ["change", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("rangeinput", data);
		},
	  }
	);

	var NumberInput = langx.extend({}, Input, {

	    events: [
	        ["change", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("numberinput", data);
		},
	  }
	);

	var CssUnitInput = langx.extend({}, Input, {

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
		},
	  }
	);

	var ColorInput = langx.extend({}, Input, {

		 //html5 color input only supports setting values as hex colors even if the picker returns only rgb
		 rgb2hex: function(rgb) {
			 
			 if (rgb)
			 {
			 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
			 
			 return (rgb && rgb.length === 4) ? "#" +
			  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
			  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
			  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : rgb;
			 }
		},

	    events: [
	        ["change", "onChange", "input"],
		 ],

		setValue: function(value) {
			$('input', this.element).val(this.rgb2hex(value));
		},
		
		init: function(data) {
			return this.render("colorinput", data);
		},
	  }
	);

	var ImageInput = langx.extend({}, Input, {

	    events: [
	        ["blur", "onChange", "input[type=text]"],
	        ["change", "onUpload", "input[type=file]"],
		 ],

		setValue: function(value) {

			//don't set blob value to avoid slowing down the page		
			if (value.indexOf("data:image") == -1)
			{
					$('input[type="text"]', this.element).val(value);
			}
		},

		onUpload: function(event, node) {

			if (this.files && this.files[0]) {
	            var reader = new FileReader();
	            reader.onload = imageIsLoaded;
	            reader.readAsDataURL(this.files[0]);
	            //reader.readAsBinaryString(this.files[0]);
	            file = this.files[0];
	        }

			function imageIsLoaded(e) {
					
					image = e.target.result;
					
					event.data.element.trigger('propertyChange', [image, this]);
					
					//return;//remove this line to enable php upload

					var formData = new FormData();
					formData.append("file", file);
	    
					$.ajax({
						type: "POST",
						url: 'upload.php',//set your server side upload script url
						data: formData,
						processData: false,
						contentType: false,
						success: function (data) {
							console.log("File uploaded at: ", data);
							
							//if image is succesfully uploaded set image url
							event.data.element.trigger('propertyChange', [data, this]);
							
							//update src input
							$('input[type="text"]', event.data.element).val(data);
						},
						error: function (data) {
							alert(data.responseText);
						}
					});		
			}
		},

		init: function(data) {
			return this.render("imageinput", data);
		},
	  }
	);

	var FileUploadInput = langx.extend({}, TextInput, {

	    events: [
	        ["blur", "onChange", "input"],
		 ],

		init: function(data) {
			return this.render("textinput", data);
		},
	  }
	);


	var RadioInput = langx.extend({}, Input, {

		onChange: function(event, node) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [this.value, this]);
			}
		},

	    events: [
	        ["change", "onChange", "input"],
		 ],

		setValue: function(value) {
			$('input', this.element).removeAttr('checked');
			if (value)
			$("input[value=" + value + "]", this.element).attr("checked", "true").prop('checked', true);
		},
		
		init: function(data) {
			return this.render("radioinput", data);
		},
	  }
	);

	var RadioButtonInput = langx.extend({}, RadioInput, {

		setValue: function(value) {
			$('input', this.element).removeAttr('checked');
			$('btn', this.element).removeClass('active');
			if (value && value != "")
			{
				$("input[value=" + value + "]", this.element).attr("checked", "true").prop('checked', true).parent().button("toggle");
			}
		},

		init: function(data) {
			return this.render("radiobuttoninput", data);
		},
	  }
	);

	var ToggleInput = langx.extend({}, TextInput, {

		onChange: function(event, node) {
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [this.checked?this.getAttribute("data-value-on"):this.getAttribute("data-value-off"), this]);
			}
		},

	    events: [
	        ["change", "onChange", "input"],
		 ],

		init: function(data) {
			return this.render("toggle", data);
		},
	  }
	);

	var ValueTextInput = langx.extend({}, TextInput, {

	    events: [
	        ["blur", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("textinput", data);
		},
	  }
	);

	var GridLayoutInput = langx.extend({}, TextInput, {

	    events: [
	        ["blur", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("textinput", data);
		},
	  }
	);

	var ProductsInput = langx.extend({}, TextInput, {

	    events: [
	        ["blur", "onChange", "input"],
		 ],
		
		init: function(data) {
			return this.render("textinput", data);
		},
	  }
	);


	var GridInput = langx.extend({}, Input, {
		

	    events: [
	        ["change", "onChange", "select" /*'select'*/],
	        ["click", "onChange", "button" /*'select'*/],
		 ],
		

		setValue: function(value) {
			$('select', this.element).val(value);
		},
		
		init: function(data) {
			return this.render("grid", data);
		},
		
	  }
	);

	var TextValueInput = langx.extend({}, Input, {
		

	    events: [
	        ["blur", "onChange", "input"],
		    ["click", "onChange", "button" /*'select'*/],
		 ],
		
		init: function(data) {
			return this.render("textvalue", data);
		},
		
	  }
	);

	var ButtonInput = langx.extend({}, Input, {

	    events: [
	        ["click", "onChange", "button" /*'select'*/],
		 ],
		

		setValue: function(value) {
			$('button', this.element).val(value);
		},
		
		init: function(data) {
			return this.render("button", data);
		},
		
	  }
	);

	var SectionInput = langx.extend({}, Input, {

	    events: [
	        ["click", "onChange", "button" /*'select'*/],
		 ],
		

		setValue: function(value) {
			return false;
		},
		
		init: function(data) {
			return this.render("sectioninput", data);
		},
		
	  }
	);

	var ListInput = langx.extend({}, Input, {
		
	    events: [
	        ["change", "onChange", "select"],
		 ],
		

		setValue: function(value) {
			$('select', this.element).val(value);
		},
		
		init: function(data) {
			return this.render("listinput", data);
		},
		
	  }
	);



	var AutocompleteInput = langx.extend({}, Input, {

	    events: [
	        ["autocomplete.change", "onAutocompleteChange", "input"],
		 ],

		onAutocompleteChange: function(event, value, text) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [value, this]);
			}
		},

		init: function(data) {
			
			this.element = this.render("textinput", data);
			
			$('input', this.element).autocomplete(data.url);//using default parameters
			
			return this.element;
		}
	  }
	);

	var AutocompleteList = langx.extend({}, Input, {

	    events: [
	        ["autocompletelist.change", "onAutocompleteChange", "input"],
		 ],

		onAutocompleteChange: function(event, value, text) {
			
			if (event.data && event.data.element)
			{
				event.data.element.trigger('propertyChange', [value, this]);
			}
		},

		setValue: function(value) {
			$('input', this.element).data("autocompleteList").setValue(value);
		},

		init: function(data) {
			
			this.element = this.render("textinput", data);
			
			$('input', this.element).autocompleteList(data);//using default parameters
			
			return this.element;
		}
	  }
	);

	return Vvveb.inputs = {
		Input,
		TextInput,
		CheckboxInput,
		SelectInput,
		LinkInput,
		RangeInput,
		NumberInput,
		CssUnitInput,
		ColorInput,
		ImageInput,
		FileUploadInput,
		RadioInput,
		RadioButtonInput,
		ToggleInput,
		ValueTextInput,
		GridLayoutInput,
		ProductsInput,
		GridInput,
		TextValueInput,
		ButtonInput,
		SectionInput,
		ListInput,
		AutocompleteInput,
		AutocompleteList
	};

});


define('skylark-vvveb/Components',[
	"skylark-langx/langx",
	"skylark-jquery",
	"./Vvveb",
	"./tmpl",
	"./inputs"
],function(langx,$,Vvveb,tmpl,inputs){
	var jQuery = $;

	
	return Vvveb.Components = {
    	base_sort : 100,//start sorting for base component from 100 to allow extended properties to be first
		
		_components: {},
		
		_nodesLookup: {},
		
		_attributesLookup: {},

		_classesLookup: {},
		
		_classesRegexLookup: {},
		
		componentPropertiesElement: "#right-panel .component-properties",

		componentPropertiesDefaultSection: "content",

		get: function(type) {
			return this._components[type];
		},

		add: function(type, data) {
			data.type = type;
			
			this._components[type] = data;
			
			if (data.nodes) 
			{
				for (var i in data.nodes)
				{	
					this._nodesLookup[ data.nodes[i] ] = data;
				}
			}
			
			if (data.attributes) 
			{
				if (data.attributes.constructor === Array)
				{
					for (var i in data.attributes)
					{	
						this._attributesLookup[ data.attributes[i] ] = data;
					}
				} else
				{
					for (var i in data.attributes)
					{	
						if (typeof this._attributesLookup[i] === 'undefined')
						{
							this._attributesLookup[i] = {};
						}

						if (typeof this._attributesLookup[i][ data.attributes[i] ] === 'undefined')
						{
							this._attributesLookup[i][ data.attributes[i] ] = {};
						}

						this._attributesLookup[i][ data.attributes[i] ] = data;
					}
				}
			}
			
			if (data.classes) 
			{
				for (var i in data.classes)
				{	
					this._classesLookup[ data.classes[i] ] = data;
				}
			}
			
			if (data.classesRegex) 
			{
				for (var i in data.classesRegex)
				{	
					this._classesRegexLookup[ data.classesRegex[i] ] = data;
				}
			}
		},
		
		extend: function(inheritType, type, data) {
			 
			 var newData = data;
			 
			 if (inheritData = this._components[inheritType])
			 {
				newData = $.extend(true,{}, inheritData, data);
				newData.properties = $.merge( $.merge([], inheritData.properties?inheritData.properties:[]), data.properties?data.properties:[]);
			 }
			 
			 //sort by order
			 newData.properties.sort(function (a,b) 
				{
					if (typeof a.sort  === "undefined") a.sort = 0;
					if (typeof b.sort  === "undefined") b.sort = 0;

					if (a.sort < b.sort)
						return -1;
					if (a.sort > b.sort)
						return 1;
					return 0;
				});
	/*		 
			var output = array.reduce(function(o, cur) {

			  // Get the index of the key-value pair.
			  var occurs = o.reduce(function(n, item, i) {
				return (item.key === cur.key) ? i : n;
			  }, -1);

			  // If the name is found,
			  if (occurs >= 0) {

				// append the current value to its list of values.
				o[occurs].value = o[occurs].value.concat(cur.value);

			  // Otherwise,
			  } else {

				// add the current item to o (but make sure the value is an array).
				var obj = {name: cur.key, value: [cur.value]};
				o = o.concat([obj]);
			  }

			  return o;
			}, newData.properties);		 
	*/
			
			this.add(type, newData);
		},
		
		
		matchNode: function(node) {
			var component = {};
			
			if (!node || !node.tagName) return false;
			
			if (node.attributes && node.attributes.length)
			{
				//search for attributes
				for (var i in node.attributes)
				{
					if (node.attributes[i])
					{
					attr = node.attributes[i].name;
					value = node.attributes[i].value;

					if (attr in this._attributesLookup) 
					{
						component = this._attributesLookup[ attr ];
						
						//currently we check that is not a component by looking at name attribute
						//if we have a collection of objects it means that attribute value must be checked
						if (typeof component["name"] === "undefined")
						{
							if (value in component)
							{
								return component[value];
							}
						} else 
						return component;
					}
				}
				}
					
				for (var i in node.attributes)
				{
					attr = node.attributes[i].name;
					value = node.attributes[i].value;
					
					//check for node classes
					if (attr == "class")
					{
						classes = value.split(" ");
						
						for (j in classes) 
						{
							if (classes[j] in this._classesLookup)
							return this._classesLookup[ classes[j] ];	
						}
						
						for (regex in this._classesRegexLookup) 
						{
							regexObj = new RegExp(regex);
							if (regexObj.exec(value)) 
							{
								return this._classesRegexLookup[ regex ];	
							}
						}
					}
				}
			}

			tagName = node.tagName.toLowerCase();
			if (tagName in this._nodesLookup) return this._nodesLookup[ tagName ];
		
			return false;
			//return false;
		},
		
		render: function(type) {

			var component = this._components[type];

			var componentsPanel = jQuery(this.componentPropertiesElement);
			var defaultSection = this.componentPropertiesDefaultSection;
			var componentsPanelSections = {};

			jQuery(this.componentPropertiesElement + " .tab-pane").each(function ()
			{
				var sectionName = this.dataset.section;
				componentsPanelSections[sectionName] = $(this);
				
			});
			
			var section = componentsPanelSections[defaultSection].find('.section[data-section="default"]');
			
			if (!(Vvveb.preservePropertySections && section.length))
			{
				componentsPanelSections[defaultSection].html('').append(tmpl("vvveb-input-sectioninput", {key:"default", header:component.name}));
				section = componentsPanelSections[defaultSection].find(".section");
			}

			componentsPanelSections[defaultSection].find('[data-header="default"] span').html(component.name);
			section.html("")	
		
			if (component.beforeInit) component.beforeInit(Vvveb.Builder.selectedEl.get(0));
			
			var element;
			
			var fn = function(component, property) {
				return property.input.on('propertyChange', function (event, value, input) {
						
						var element = Vvveb.Builder.selectedEl;
						
						if (property.child) element = element.find(property.child);
						if (property.parent) element = element.parent(property.parent);
						
						if (property.onChange)
						{
							element = property.onChange(element, value, input, component);
						}/* else */
						if (property.htmlAttr)
						{
							oldValue = element.attr(property.htmlAttr);
							
							if (property.htmlAttr == "class" && property.validValues) 
							{
								element.removeClass(property.validValues.join(" "));
								element = element.addClass(value);
							}
							else if (property.htmlAttr == "style") 
							{
								element = Vvveb.StyleManager.setStyle(element, property.key, value);
							}
							else if (property.htmlAttr == "innerHTML") 
							{
								element = Vvveb.ContentManager.setHtml(element, value);
							}
							else
							{
								element = element.attr(property.htmlAttr, value);
							}
							
							Vvveb.Undo.addMutation({type: 'attributes', 
													target: element.get(0), 
													attributeName: property.htmlAttr, 
													oldValue: oldValue, 
													newValue: element.attr(property.htmlAttr)});
						}

						if (component.onChange) 
						{
							element = component.onChange(element, property, value, input);
						}
						
						if (!property.child && !property.parent) Vvveb.Builder.selectNode(element);
						
						return element;
				});				
			};			
		
			var nodeElement = Vvveb.Builder.selectedEl;

			for (var i in component.properties)
			{
				var property = component.properties[i];
				var element = nodeElement;
				
				if (property.beforeInit) property.beforeInit(element.get(0)) 
				
				if (property.child) element = element.find(property.child);
				
				if (property.data) {
					property.data["key"] = property.key;
				} else
				{
					property.data = {"key" : property.key};
				}

				if (typeof property.group  === 'undefined') property.group = null;

				property.input = property.inputtype.init(property.data);
				
				if (property.init)
				{
					property.inputtype.setValue(property.init(element.get(0)));
				} else if (property.htmlAttr)
				{
					if (property.htmlAttr == "style")
					{
						//value = element.css(property.key);//jquery css returns computed style
						var value = Vvveb.StyleManager.getStyle(element, property.key);//getStyle returns declared style
					} else
					if (property.htmlAttr == "innerHTML")
					{
						var value = Vvveb.ContentManager.getHtml(element);
					} else
					{
						var value = element.attr(property.htmlAttr);
					}

					//if attribute is class check if one of valid values is included as class to set the select
					if (value && property.htmlAttr == "class" && property.validValues)
					{
						value = value.split(" ").filter(function(el) {
							return property.validValues.indexOf(el) != -1
						});
					} 

					property.inputtype.setValue(value);
				}
				
				fn(component, property);
				
				var propertySection = defaultSection;
				if (property.section)
				{
					propertySection = property.section;
				}
				

				if (property.inputtype == SectionInput)
				{
					section = componentsPanelSections[propertySection].find('.section[data-section="' + property.key + '"]');
					
					if (Vvveb.preservePropertySections && section.length)
					{
						section.html("");
					} else 
					{
						componentsPanelSections[propertySection].append(property.input);
						section = componentsPanelSections[propertySection].find('.section[data-section="' + property.key + '"]');
					}
				}
				else
				{
					var row = $(tmpl('vvveb-property', property)); 
					row.find('.input').append(property.input);
					section.append(row);
				}
				
				if (property.inputtype.afterInit)
				{
					property.inputtype.afterInit(property.input);
				}

			}
			
			if (component.init) component.init(Vvveb.Builder.selectedEl.get(0));
		}
	};	
});
define('skylark-vvveb/ContentManager',[
	"skylark-jquery",
	"./Vvveb"
],function($,Vvveb){
	return Vvveb.ContentManager = {
		getAttr: function(element, attrName) {
			return element.attr(attrName);
		},
		
		setAttr: function(element, attrName, value) {
			return element.attr(attrName, value);
		},
		
		setHtml: function(element, html) {
			return element.html(html);
		},
		
		getHtml: function(element) {
			return element.html();
		}
	}

});
define('skylark-vvveb/FileManager',[
	"skylark-jquery",
	"./Vvveb",
	"./tmpl"
],function($,Vvveb,tmpl){
	return Vvveb.FileManager = {
		tree:false,
		pages:{},
		currentPage: false,
		
		init: function() {
			this.tree = $("#filemanager .tree > ol").html("");
			
			$(this.tree).on("click", "a", function (e) {
				e.preventDefault();
				return false;
			});
			
			$(this.tree).on("click", "li[data-page] label", function (e) {
				var page = $(this.parentNode).data("page");
				
				if (page) Vvveb.FileManager.loadPage(page);
				return false;			
			})
			
			$(this.tree).on("click", "li[data-component] label ", function (e) {
				node = $(e.currentTarget.parentNode).data("node");
				
				Vvveb.Builder.frameHtml.animate({
					scrollTop: $(node).offset().top
				}, 1000);

				Vvveb.Builder.selectNode(node);
				Vvveb.Builder.loadNodeComponent(node);
				
				//e.preventDefault();
				//return false;
			}).on("mouseenter", "li[data-component] label", function (e) {

				node = $(e.currentTarget).data("node");
				$(node).trigger("mousemove");
				
			});
		},
		
		addPage: function(name, data) {
			
			this.pages[name] = data;
			data['name'] = name;
			
			this.tree.append(
				tmpl("vvveb-filemanager-page", data));
		},
		
		addPages: function(pages) {
			for (page in pages)
			{
				this.addPage(pages[page]['name'], pages[page]);
			}
		},
		
		addComponent: function(name, url, title, page) {
			$("[data-page='" + page + "'] > ol", this.tree).append(
				tmpl("vvveb-filemanager-component", {name:name, url:url, title:title}));
		},
		
		getComponents: function(allowedComponents = {}) {

				var tree = [];
				function getNodeTree (node, parent) {
					if (node.hasChildNodes()) {
						for (var j = 0; j < node.childNodes.length; j++) {
							child = node.childNodes[j];
							
							if (child && child["attributes"] != undefined && 
								(matchChild = Vvveb.Components.matchNode(child))) 
							{
								if (Array.isArray(allowedComponents)
									&& allowedComponents.indexOf(matchChild.type) == -1)
								continue;
							
								element = {
									name: matchChild.name,
									image: matchChild.image,
									type: matchChild.type,
									node: child,
									children: []
								};
								element.children = [];
								parent.push(element);
								element = getNodeTree(child, element.children);
							} else
							{
								element = getNodeTree(child, parent);	
							}
						}
					}

					return false;
				}
			
			getNodeTree(window.FrameDocument.body, tree);
			
			return tree;
		},
		
		loadComponents: function(allowedComponents = {}) {

			var tree = this.getComponents(allowedComponents);
			var html = drawComponentsTree(tree);
			var j = 0;

			function drawComponentsTree(tree)
			{
				var html = $("<ol></ol>");
				j++;
				for (i in tree)
				{
					var node = tree[i];
					
					if (tree[i].children.length > 0) 
					{
						var li = $('<li data-component="' + node.name + '">\
						<label for="id' + j + '" style="background-image:url(libs/builder/' + node.image + ')"><span>' + node.name + '</span></label>\
						<input type="checkbox" id="id' + j + '">\
						</li>');		
						li.data("node", node.node);
						li.append(drawComponentsTree(node.children));
						html.append(li);
					}
					else 
					{
						var li =$('<li data-component="' + node.name + '" class="file">\
								<label for="id' + j + '" style="background-image:url(libs/builder/' + node.image + ')"><span>' + node.name + '</span></label>\
								<input type="checkbox" id="id' + j + '"></li>');
						li.data("node", node.node);							
						html.append(li);
					}
				}
				
				return html;
			}
			
			$("[data-page='" + this.currentPage + "'] > ol", this.tree).replaceWith(html);
		},
		
		getCurrentUrl: function() {
			if (this.currentPage)
			return this.pages[this.currentPage]['url'];
		},
		
		reloadCurrentPage: function() {
			if (this.currentPage)
			return this.loadPage(this.currentPage);
		},
		
		loadPage: function(name, allowedComponents = false, disableCache = true) {
			$("[data-page]", this.tree).removeClass("active");
			$("[data-page='" + name + "']", this.tree).addClass("active");
			
			this.currentPage = name;
			var url = this.pages[name]['url'];
			
			Vvveb.Builder.loadUrl(url + (disableCache ? (url.indexOf('?') > -1?'&':'?') + Math.random():''), 
				function () { 
					Vvveb.FileManager.loadComponents(allowedComponents); 
				});
		},

		scrollBottom: function() {
			var scroll = this.tree.parent();	
			scroll.scrollTop(scroll.prop("scrollHeight"));	
		},
	}
});

define('skylark-vvveb/StyleManager',[
	"skylark-jquery",
	"./Vvveb"
],function($,Vvveb){
	return Vvveb.StyleManager = {
		setStyle: function(element, styleProp, value) {
			return element.css(styleProp, value);
		},
		
		
		_getCssStyle: function(element, styleProp){
			var value = "";
			var el = element.get(0);
			
			if (el.style && el.style.length > 0 && el.style[styleProp])//check inline
				var value = el.style[styleProp];
			else
			if (el.currentStyle)	//check defined css
				var value = el.currentStyle[styleProp];
			else if (window.getComputedStyle)
			{
				var value = document.defaultView.getDefaultComputedStyle ? 
								document.defaultView.getDefaultComputedStyle(el,null).getPropertyValue(styleProp) : 
								window.getComputedStyle(el,null).getPropertyValue(styleProp);
			}
			
			return value;
		},
		
		getStyle: function(element,styleProp){
			return this._getCssStyle(element, styleProp);
		}
	}	
});
define('skylark-vvveb/Undo',[
	"./Vvveb"
],function(Vvveb){

	return Vvveb.Undo = {
		
		undos: [],
		mutations: [],
		undoIndex: -1,
		enabled:true,
		/*		
		init: function() {
		},
		*/	
		addMutation : function(mutation) {	
			/*
				this.mutations.push(mutation);
				this.undoIndex++;
			*/
			Vvveb.Builder.frameBody.trigger("vvveb.undo.add");
			this.mutations.splice(++this.undoIndex, 0, mutation);
		 },

		restore : function(mutation, undo) {	
			
			switch (mutation.type) {
				case 'childList':
				
					if (undo == true)
					{
						addedNodes = mutation.removedNodes;
						removedNodes = mutation.addedNodes;
					} else //redo
					{
						addedNodes = mutation.addedNodes;
						removedNodes = mutation.removedNodes;
					}
					
					if (addedNodes) for(i in addedNodes)
					{
						node = addedNodes[i];
						if (mutation.nextSibling)
						{ 
							mutation.nextSibling.parentNode.insertBefore(node, mutation.nextSibling);
						} else
						{
							mutation.target.append(node);
						}
					}

					if (removedNodes) for(i in removedNodes)
					{
						node = removedNodes[i];
						node.parentNode.removeChild(node);
					}
				break;					
				case 'move':
					if (undo == true)
					{
						parent = mutation.oldParent;
						sibling = mutation.oldNextSibling;
					} else //redo
					{
						parent = mutation.newParent;
						sibling = mutation.newNextSibling;
					}
				  
					if (sibling)
					{
						sibling.parentNode.insertBefore(mutation.target, sibling);
					} else
					{
						parent.append(node);
					}
				break;
				case 'characterData':
				  mutation.target.innerHTML = undo ? mutation.oldValue : mutation.newValue;
				  break;
				case 'attributes':
				  value = undo ? mutation.oldValue : mutation.newValue;

				  if (value || value === false || value === 0)
					mutation.target.setAttribute(mutation.attributeName, value);
				  else
					mutation.target.removeAttribute(mutation.attributeName);

				break;
			}
			
			Vvveb.Builder.frameBody.trigger("vvveb.undo.restore");
		 },
		 
		undo : function() {	
			if (this.undoIndex >= 0) {
			  this.restore(this.mutations[this.undoIndex--], true);
			}
		 },

		redo : function() {	
			if (this.undoIndex < this.mutations.length - 1) {
			  this.restore(this.mutations[++this.undoIndex], false);
			}
		},

		hasChanges : function() {	
			return this.mutations.length;
		},
	};

});

define('skylark-vvveb/WysiwygEditor',[
	"skylark-jquery",
	"./Vvveb",
	"./Undo"
],function($,Vvveb){
	return Vvveb.WysiwygEditor = {
	
		isActive: false,
		oldValue: '',
		doc:false,
		
		init: function(doc) {
			this.doc = doc;
			
			$("#bold-btn").on("click", function (e) {
					doc.execCommand('bold',false,null);
					e.preventDefault();
					return false;
			});

			$("#italic-btn").on("click", function (e) {
					doc.execCommand('italic',false,null);
					e.preventDefault();
					return false;
			});

			$("#underline-btn").on("click", function (e) {
					doc.execCommand('underline',false,null);
					e.preventDefault();
					return false;
			});
			
			$("#strike-btn").on("click", function (e) {
					doc.execCommand('strikeThrough',false,null);
					e.preventDefault();
					return false;
			});

			$("#link-btn").on("click", function (e) {
					doc.execCommand('createLink',false,"#");
					e.preventDefault();
					return false;
			});
		},
		
		undo: function(element) {
			this.doc.execCommand('undo',false,null);
		},

		redo: function(element) {
			this.doc.execCommand('redo',false,null);
		},
		
		edit: function(element) {
			element.attr({'contenteditable':true, 'spellcheckker':false});
			$("#wysiwyg-editor").show();

			this.element = element;
			this.isActive = true;
			this.oldValue = element.html();
		},

		destroy: function(element) {
			element.removeAttr('contenteditable spellcheckker');
			$("#wysiwyg-editor").hide();
			this.isActive = false;

		
			node = this.element.get(0);
			Vvveb.Undo.addMutation({type:'characterData', 
									target: node, 
									oldValue: this.oldValue, 
									newValue: node.innerHTML});
		}
	};

});
	
define('skylark-vvveb/Gui',[
	"skylark-jquery",
	"./Vvveb",
	"./Builder",
	"./WysiwygEditor",
	"skylark-bootstrap3/modal"
],function($,Vvveb){
	var Gui = {
		
		init: function() {
			$("[data-vvveb-action]").each(function () {
				on = "click";
				if (this.dataset.vvvebOn) on = this.dataset.vvvebOn;
				
				$(this).on(on, Vvveb.Gui[this.dataset.vvvebAction]);
				if (this.dataset.vvvebShortcut)
				{
					$(document).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
					$(window.FrameDocument, window.FrameWindow).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
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
				link.dataset.download = filename;
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
			launchFullScreen(document); // the whole page
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

	//Pages, file/components tree 
		newPage : function () {
			
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
		},
	//layout
		togglePanel: function (panel, cssVar) {
			var panel = $(panel);
			var body = $("body");
			var prevValue = body.css(cssVar);
			if (prevValue !== "0px") 
			{
				panel.data("layout-toggle", prevValue);
				body.css(cssVar, "0px");
				panel.hide();
			} else
			{
				prevValue= panel.data("layout-toggle");
				body.css(cssVar, '');
				panel.show();
				
			}
		},

		toggleFileManager: function () {
			Vvveb.Gui.togglePanel("#filemanager", "--builder-filemanager-height");
		},
		
		toggleLeftColumn: function () {
			Vvveb.Gui.togglePanel("#left-panel", "--builder-left-panel-width");
		},
		
		toggleRightColumn: function () {
			Vvveb.Gui.togglePanel("#right-panel", "--builder-right-panel-width");
			var rightColumnEnabled = this.attributes["aria-pressed"].value == "true";

			$("#vvveb-builder").toggleClass("no-right-panel");
			$(".component-properties-tab").toggle();
			
			Vvveb.Components.componentPropertiesElement = (rightColumnEnabled ? "#right-panel" :"#left-panel") +" .component-properties";
			if ($("#properties").is(":visible")) $('.component-tab a').show().tab('show'); 

		},
		
	}

	return Vvveb.Gui = Gui;
});



define('skylark-vvveb/blocks/bootstrap4',[
    "../Vvveb",
    "../BlocksGroup",
    "../Blocks"
],function(Vvveb,BlocksGroup,Blocks){

  
  BlocksGroup['Bootstrap 4 Snippets'] =
  ["bootstrap4/signin-split", "bootstrap4/slider-header", "bootstrap4/image-gallery", "bootstrap4/video-header", "bootstrap4/about-team", "bootstrap4/portfolio-one-column", "bootstrap4/portfolio-two-column", "bootstrap4/portfolio-three-column", "bootstrap4/portfolio-four-column"];


  Blocks.add("bootstrap4/signin-split", {
      name: "Modern Sign In Page with Split Screen Format",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/product.png">',    
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/sign-in-split.jpg",
      html: `
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
      <div class="col-md-8 col-lg-6">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-lg-8 mx-auto">
                <h3 class="login-heading mb-4">Welcome back!</h3>
                <form>
                  <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                    <label for="inputPassword">Password</label>
                  </div>

                  <div class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                    <label class="custom-control-label" for="customCheck1">Remember password</label>
                  </div>
                  <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                  <div class="text-center">
                    <a class="small" href="#">Forgot password?</a></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <style>
  .login,
  .image {
    min-height: 100vh;
  }

  .bg-image {
    background-image: url('https://source.unsplash.com/WEQbe2jBg40/600x1200');
    background-size: cover;
    background-position: center;
  }

  .login-heading {
    font-weight: 300;
  }

  .btn-login {
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    padding: 0.75rem 1rem;
    border-radius: 2rem;
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .form-label-group>input,
  .form-label-group>label {
    padding: var(--input-padding-y) var(--input-padding-x);
    height: auto;
    border-radius: 2rem;
  }

  .form-label-group>label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 1.5;
    color: #495057;
    cursor: text;
    /* Match the input under the label */
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
  }

  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }

  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-moz-placeholder {
    color: transparent;
  }

  .form-label-group input::placeholder {
    color: transparent;
  }

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
    padding-bottom: calc(var(--input-padding-y) / 3);
  }

  .form-label-group input:not(:placeholder-shown)~label {
    padding-top: calc(var(--input-padding-y) / 3);
    padding-bottom: calc(var(--input-padding-y) / 3);
    font-size: 12px;
    color: #777;
  }
  </style>  
  </div>
  `,
  });    

  Blocks.add("bootstrap4/image-gallery", {
      name: "Image gallery",
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/thumbnail-gallery.jpg",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/product.png">',    
      html: `
  <div class="container">

    <h1 class="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>

    <hr class="mt-2 mb-5">

    <div class="row text-center text-lg-left">

      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/pWkk7iiCoDM/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/aob0ukAYfuI/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/EUfxH-pze7s/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/M185_qYH8vg/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/sesveuG_rNo/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/AvhMzHwiE_0/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/2gYsZUmockw/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/EMSDtjVHdQ8/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/8mUEy0ABdNE/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/G9Rfc1qccH4/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/aJeH0KcFkuc/400x300" alt="">
            </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/p2TQ-3Bh3Oo/400x300" alt="">
            </a>
      </div>
    </div>

  </div>
  `,
  });    

  Blocks.add("bootstrap4/slider-header", {
      name: "Image Slider Header",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/product.png">',        
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/full-slider.jpg",
      html:`
  <header class="slider">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <!-- Slide One - Set the background image for this slide in the line below -->
        <div class="carousel-item active" style="background-image: url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')">
          <div class="carousel-caption d-none d-md-block">
            <h2 class="display-4">First Slide</h2>
            <p class="lead">This is a description for the first slide.</p>
          </div>
        </div>
        <!-- Slide Two - Set the background image for this slide in the line below -->
        <div class="carousel-item" style="background-image: url('https://source.unsplash.com/bF2vsubyHcQ/1920x1080')">
          <div class="carousel-caption d-none d-md-block">
            <h2 class="display-4">Second Slide</h2>
            <p class="lead">This is a description for the second slide.</p>
          </div>
        </div>
        <!-- Slide Three - Set the background image for this slide in the line below -->
        <div class="carousel-item" style="background-image: url('https://source.unsplash.com/szFUQoyvrxM/1920x1080')">
          <div class="carousel-caption d-none d-md-block">
            <h2 class="display-4">Third Slide</h2>
            <p class="lead">This is a description for the third slide.</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
    </div>
      
  <style>
  .carousel-item {
    height: 100vh;
    min-height: 350px;
    background: no-repeat center center scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  </style>  
  </header>
  `,
  });


  Blocks.add("bootstrap4/video-header", {
      name: "Video Header",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/image.svg">',        
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/video-header.jpg",
      html:`
  <header class="video">
    <div class="overlay"></div>
    <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4">
    </video>
    <div class="container h-100">
      <div class="d-flex h-100 text-center align-items-center">
        <div class="w-100 text-white">
          <h1 class="display-3">Video Header</h1>
          <p class="lead mb-0">With HTML5 Video and Bootstrap 4</p>
        </div>
      </div>
    </div>
  </header>

  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <p>The HTML5 video element uses an mp4 video as a source. Change the source video to add in your own background! The header text is vertically centered using flex utilities that are build into Bootstrap 4.</p>
        </div>
      </div>
    </div>
  </section>
  <style>
  header.video {
    position: relative;
    background-color: black;
    height: 75vh;
    min-height: 25rem;
    width: 100%;
    overflow: hidden;
  }

  header.video video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
    -ms-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }

  header.video .container {
    position: relative;
    z-index: 2;
  }

  header.video .overlay {
    /*position: absolute;*/
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: black;
    opacity: 0.5;
    z-index: 1;
  }

  @media (pointer: coarse) and (hover: none) {
    header {
      background: url('https://source.unsplash.com/XT5OInaElMw/1600x900') black no-repeat center center scroll;
    }
    header video {
      display: none;
    }
  }
  </style>
  `,
  });



  Blocks.add("bootstrap4/about-team", {
      name: "About and Team Section",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/image.svg">',        
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/about-team.jpg",
      html:`
  <header class="bg-primary text-center py-5 mb-4">
    <div class="container">
      <h1 class="font-weight-light text-white">Meet the Team</h1>
    </div>
  </header>

  <div class="container">
    <div class="row">
      <!-- Team Member 1 -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-0 shadow">
          <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="...">
          <div class="card-body text-center">
            <h5 class="card-title mb-0">Team Member</h5>
            <div class="card-text text-black-50">Web Developer</div>
          </div>
        </div>
      </div>
      <!-- Team Member 2 -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-0 shadow">
          <img src="https://source.unsplash.com/9UVmlIb0wJU/500x350" class="card-img-top" alt="...">
          <div class="card-body text-center">
            <h5 class="card-title mb-0">Team Member</h5>
            <div class="card-text text-black-50">Web Developer</div>
          </div>
        </div>
      </div>
      <!-- Team Member 3 -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-0 shadow">
          <img src="https://source.unsplash.com/sNut2MqSmds/500x350" class="card-img-top" alt="...">
          <div class="card-body text-center">
            <h5 class="card-title mb-0">Team Member</h5>
            <div class="card-text text-black-50">Web Developer</div>
          </div>
        </div>
      </div>
      <!-- Team Member 4 -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-0 shadow">
          <img src="https://source.unsplash.com/ZI6p3i9SbVU/500x350" class="card-img-top" alt="...">
          <div class="card-body text-center">
            <h5 class="card-title mb-0">Team Member</h5>
            <div class="card-text text-black-50">Web Developer</div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

  </div>
  `,
  });



  Blocks.add("bootstrap4/portfolio-one-column", {
      name: "One Column Portfolio Layout",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/image.svg">',        
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/portfolio-one-column.jpg",
      html:`
      <div class="container">

        <!-- Page Heading -->
        <h1 class="my-4">Page Heading
          <small>Secondary Text</small>
        </h1>

        <!-- Project One -->
        <div class="row">
          <div class="col-md-7">
            <a href="#">
              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
            </a>
          </div>
          <div class="col-md-5">
            <h3>Project One</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
            <a class="btn btn-primary" href="#">View Project</a>
          </div>
        </div>
        <!-- /.row -->

        <hr>

        <!-- Project Two -->
        <div class="row">
          <div class="col-md-7">
            <a href="#">
              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
            </a>
          </div>
          <div class="col-md-5">
            <h3>Project Two</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit velit cumque vero doloremque repellendus distinctio maiores rem expedita a nam vitae modi quidem similique ducimus! Velit, esse totam tempore.</p>
            <a class="btn btn-primary" href="#">View Project</a>
          </div>
        </div>
        <!-- /.row -->

        <hr>

        <!-- Project Three -->
        <div class="row">
          <div class="col-md-7">
            <a href="#">
              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
            </a>
          </div>
          <div class="col-md-5">
            <h3>Project Three</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, temporibus, dolores, at, praesentium ut unde repudiandae voluptatum sit ab debitis suscipit fugiat natus velit excepturi amet commodi deleniti alias possimus!</p>
            <a class="btn btn-primary" href="#">View Project</a>
          </div>
        </div>
        <!-- /.row -->

        <hr>

        <!-- Project Four -->
        <div class="row">

          <div class="col-md-7">
            <a href="#">
              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
            </a>
          </div>
          <div class="col-md-5">
            <h3>Project Four</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, quidem, consectetur, officia rem officiis illum aliquam perspiciatis aspernatur quod modi hic nemo qui soluta aut eius fugit quam in suscipit?</p>
            <a class="btn btn-primary" href="#">View Project</a>
          </div>
        </div>
        <!-- /.row -->

        <hr>

        <!-- Pagination -->
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>

      </div>
  `,
  });



  Blocks.add("bootstrap4/portfolio-two-column", {
      name: "Two Column Portfolio Layout",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/image.svg">',        
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/portfolio-one-column.jpg",
      html:`
  <div class="container">

    <!-- Page Heading -->
    <h1 class="my-4">Page Heading
      <small>Secondary Text</small>
    </h1>

    <div class="row">
      <div class="col-lg-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project One</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Two</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Three</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Four</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Five</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Six</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Pagination -->
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
      </li>
    </ul>

  </div>
  `,
  });

  Blocks.add("bootstrap4/portfolio-three-column", {
      name: "Three Column Portfolio Layout",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/image.svg">',        
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/portfolio-three-column.jpg",
      html:`
  <div class="container">

    <!-- Page Heading -->
    <h1 class="my-4">Page Heading
      <small>Secondary Text</small>
    </h1>

    <div class="row">
      <div class="col-lg-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project One</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Two</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Three</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Four</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Five</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Six</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Pagination -->
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
      </li>
    </ul>

  </div>
  `,
  });


  Blocks.add("bootstrap4/portfolio-four-column", {
      name: "Four Column Portfolio Layout",
  	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/image.svg">',        
      image: "https://startbootstrap.com/assets/img/screenshots/snippets/portfolio-four-column.jpg",
      html:`
  <div class="container">

    <!-- Page Heading -->
    <h1 class="my-4">Page Heading
      <small>Secondary Text</small>
    </h1>

    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project One</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Two</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Three</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Four</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Five</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Six</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Seven</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">Project Eight</a>
            </h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius adipisci dicta dignissimos neque animi ea, veritatis, provident hic consequatur ut esse! Commodi ea consequatur accusantium, beatae qui deserunt tenetur ipsa.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Pagination -->
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
      </li>
    </ul>

  </div>
  `,
  });


});
define('skylark-vvveb/components/bootstrap4',[
    "skylark-jquery",
    "../Vvveb",
    "../ComponentsGroup",
    "../Components",
    "../inputs"
],function($,Vvveb,ComponentsGroup,Components,inputs){

    var bgcolorClasses = [
        "bg-primary", 
        "bg-secondary", 
        "bg-success", 
        "bg-danger", 
        "bg-warning", 
        "bg-info", 
        "bg-light", 
        "bg-dark", 
        "bg-white"
    ],

    bgcolorSelectOptions = [{
	   value: "Default",
	   text: ""
    }, {
    	value: "bg-primary",
    	text: "Primary"
    }, {
    	value: "bg-secondary",
    	text: "Secondary"
    }, {
    	value: "bg-success",
    	text: "Success"
    }, {
    	value: "bg-danger",
    	text: "Danger"
    }, {
    	value: "bg-warning",
    	text: "Warning"
    }, {
    	value: "bg-info",
    	text: "Info"
    }, {
    	value: "bg-light",
    	text: "Light"
    }, {
    	value: "bg-dark",
    	text: "Dark"
    }, {
    	value: "bg-white",
    	text: "White"
    }];

    function changeNodeName(node, newNodeName)
    {
    	var newNode;
    	newNode = document.createElement(newNodeName);
    	attributes = node.get(0).attributes;
    	
    	for (i = 0, len = attributes.length; i < len; i++) {
    		newNode.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
    	}

    	$(newNode).append($(node).contents());
    	$(node).replaceWith(newNode);
    	
    	return newNode;
    }

    ComponentsGroup['Bootstrap 4'] = [
        "html/container", 
        "html/gridrow", 
        "html/button", 
        "html/buttongroup", 
        "html/buttontoolbar", 
        "html/heading", 
        "html/image", 
        "html/jumbotron", 
        "html/alert", 
        "html/card", 
        "html/listgroup", 
        "html/hr", 
        "html/taglabel", 
        "html/badge", 
        "html/progress", 
        "html/navbar", 
        "html/breadcrumbs", 
        "html/pagination", 
        "html/form", 
        "html/textinput", 
        "html/textareainput", 
        "html/selectinput", 
        "html/fileinput", 
        "html/checkbox", 
        "html/radiobutton", 
        "html/table", 
        "html/paragraph"
    ];

    Components.add("_base", {
        name: "Element",
    	properties: [{
            key: "element_header",
            inputtype: inputs.SectionInput,
            name:false,
            sort:Components.base_sort++,
            data: {header:"General"},
        }, {
            name: "Id",
            key: "id",
            htmlAttr: "id",
            sort: Components.base_sort++,
            inline:true,
            col:6,
            inputtype: inputs.TextInput
        }, {
            name: "Class",
            key: "class",
            htmlAttr: "class",
            sort: Components.base_sort++,
            inline:true,
            col:6,
            inputtype: inputs.TextInput
        }
       ]
    });    

    //display
    Components.extend("_base", "_base", {
    	 properties: [{
            key: "display_header",
            inputtype: inputs.SectionInput,
            name:false,
            sort: Components.base_sort++,
            data: {header:"Display"},
        }, {
            key: "display",
            name: "Display",
            htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.SelectInput,
            validValues: ["block", "inline", "inline-block", "none"],
            data: {
                options: [{
                    value: "block",
                    text: "Block"
                }, {
                    value: "inline",
                    text: "Inline"
                }, {
                    value: "inline-block",
                    text: "Inline Block"
                }, {
                    value: "none",
                    text: "none"
                }]
            }
        }, {
            key: "position",
            name: "Position",
            htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.SelectInput,
            validValues: ["static", "fixed", "relative", "absolute"],
            data: {
                options: [{
                    value: "static",
                    text: "Static"
                }, {
                    value: "fixed",
                    text: "Fixed"
                }, {
                    value: "relative",
                    text: "Relative"
                }, {
                    value: "absolute",
                    text: "Absolute"
                }]
            }
        }, {
            key: "top",
            name: "Top",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            parent:"",
            inputtype: inputs.CssUnitInput
    	}, {
            key: "left",
            name: "Left",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            parent:"",
            inputtype: inputs.CssUnitInput
        }, {
            name: "Bottom",
            key: "bottom",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            parent:"",
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Right",
            key: "right",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            parent:"",
            inputtype: inputs.CssUnitInput
        },{
            name: "Float",
            key: "float",
            htmlAttr: "style",
            sort: Components.base_sort++,
            col:12,
            inline:true,
            inputtype: inputs.RadioButtonInput,
            data: {
    			extraclass:"btn-group-sm btn-group-fullwidth",
                options: [{
                    value: "none",
                    icon:"la la-close",
                    //text: "None",
                    title: "None",
                    checked:true,
                }, {
                    value: "left",
                    //text: "Left",
                    title: "Left",
                    icon:"la la-align-left",
                    checked:false,
                }, {
                    value: "right",
                    //text: "Right",
                    title: "Right",
                    icon:"la la-align-right",
                    checked:false,
                }],
             }
    	}, {
            name: "Opacity",
            key: "opacity",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:12,
    		inline:true,
            parent:"",
            inputtype: inputs.RangeInput,
            data:{
    			max: 1, //max zoom level
    			min:0,
    			step:0.1
           },
    	}, {
            name: "Background Color",
            key: "background-color",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
    		htmlAttr: "style",
            inputtype: inputs.ColorInput,
    	}, {
            name: "Text Color",
            key: "color",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
    		htmlAttr: "style",
            inputtype: inputs.ColorInput,
      	}]
    });    

    //Typography
    Components.extend("_base", "_base", {
    	 properties: [
         {
    		key: "typography_header",
    		inputtype: inputs.SectionInput,
    		name:false,
    		sort: Components.base_sort++,
    		data: {header:"Typography"},
        }, {
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
    				text: "Default"
    			}, {
    				value: "Arial, Helvetica, sans-serif",
    				text: "Arial"
    			}, {
    				value: 'Lucida Sans Unicode", "Lucida Grande", sans-serif',
    				text: 'Lucida Grande'
    			}, {
    				value: 'Palatino Linotype", "Book Antiqua", Palatino, serif',
    				text: 'Palatino Linotype'
    			}, {
    				value: '"Times New Roman", Times, serif',
    				text: 'Times New Roman'
    			}, {
    				value: "Georgia, serif",
    				text: "Georgia, serif"
    			}, {
    				value: "Tahoma, Geneva, sans-serif",
    				text: "Tahoma"
    			}, {
    				value: 'Comic Sans MS, cursive, sans-serif',
    				text: 'Comic Sans'
    			}, {
    				value: 'Verdana, Geneva, sans-serif',
    				text: 'Verdana'
    			}, {
    				value: 'Impact, Charcoal, sans-serif',
    				text: 'Impact'
    			}, {
    				value: 'Arial Black, Gadget, sans-serif',
    				text: 'Arial Black'
    			}, {
    				value: 'Trebuchet MS, Helvetica, sans-serif',
    				text: 'Trebuchet'
    			}, {
    				value: 'Courier New", Courier, monospace',
    				text: 'Courier New", Courier, monospace'
    			}, {
    				value: 'Brush Script MT, sans-serif',
    				text: 'Brush Script'
    			}]
    		}
    	}, {
            name: "Font weight",
            key: "font-weight",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.SelectInput,
            data: {
    			options: [{
    				value: "",
    				text: "Default"
    			}, {	
    				value: "100",
    				text: "Thin"
    			}, {
    				value: "200",
    				text: "Extra-Light"
    			}, {
    				value: "300",
    				text: "Light"
    			}, {
    				value: "400",
    				text: "Normal"
    			}, {
    				value: "500",
    				text: "Medium"
    			}, {
    				value: "600",
    				text: "Semi-Bold"
    			}, {
    				value: "700",
    				text: "Bold"
    			}, {
    				value: "800",
    				text: "Extra-Bold"
    			}, {
    				value: "900",
    				text: "Ultra-Bold"
    			}],
    		}
    	}, {
            name: "Text align",
            key: "text-align",
            htmlAttr: "style",
            sort: Components.base_sort++,
            col:12,
            inline:true,
            inputtype: inputs.RadioButtonInput,
            data: {
    			extraclass:"btn-group-sm btn-group-fullwidth",
                options: [{
                    value: "none",
                    icon:"la la-close",
                    //text: "None",
                    title: "None",
                    checked:true,
                }, {
                    value: "left",
                    //text: "Left",
                    title: "Left",
                    icon:"la la-align-left",
                    checked:false,
                }, {
                    value: "center",
                    //text: "Center",
                    title: "Center",
                    icon:"la la-align-center",
                    checked:false,
                }, {
                    value: "right",
                    //text: "Right",
                    title: "Right",
                    icon:"la la-align-right",
                    checked:false,
                }, {
                    value: "justify",
                    //text: "justify",
                    title: "Justify",
                    icon:"la la-align-justify",
                    checked:false,
                }],
            },
    	}, {
            name: "Line height",
            key: "line-height",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Letter spacing",
            key: "letter-spacing",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Text decoration",
            key: "text-decoration-line",
            htmlAttr: "style",
            sort: Components.base_sort++,
            col:12,
            inline:true,
            inputtype: inputs.RadioButtonInput,
            data: {
    			extraclass:"btn-group-sm btn-group-fullwidth",
                options: [{
                    value: "none",
                    icon:"la la-close",
                    //text: "None",
                    title: "None",
                    checked:true,
                }, {
                    value: "underline",
                    //text: "Left",
                    title: "underline",
                    icon:"la la-long-arrow-down",
                    checked:false,
                }, {
                    value: "overline",
                    //text: "Right",
                    title: "overline",
                    icon:"la la-long-arrow-up",
                    checked:false,
                }, {
                    value: "line-through",
                    //text: "Right",
                    title: "Line Through",
                    icon:"la la-strikethrough",
                    checked:false,
                }, {
                    value: "underline overline",
                    //text: "justify",
                    title: "Underline Overline",
                    icon:"la la-arrows-v",
                    checked:false,
                }],
            },
    	}, {
            name: "Decoration Color",
            key: "text-decoration-color",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
    		htmlAttr: "style",
            inputtype: inputs.ColorInput,
    	}, {
            name: "Decoration style",
            key: "text-decoration-style",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.SelectInput,
            data: {
    			options: [{
    				value: "",
    				text: "Default"
    			}, {	
    				value: "solid",
    				text: "Solid"
    			}, {
    				value: "wavy",
    				text: "Wavy"
    			}, {
    				value: "dotted",
    				text: "Dotted"
    			}, {
    				value: "dashed",
    				text: "Dashed"
    			}, {
    				value: "double",
    				text: "Double"
    			}],
    		}
      }]
    })
        
    //Size
    Components.extend("_base", "_base", {
    	 properties: [{
    		key: "size_header",
    		inputtype: inputs.SectionInput,
    		name:false,
    		sort: Components.base_sort++,
    		data: {header:"Size", expanded:false},
    	}, {
            name: "Width",
            key: "width",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Height",
            key: "height",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Min Width",
            key: "min-width",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Min Height",
            key: "min-height",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Max Width",
            key: "max-width",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Max Height",
            key: "max-height",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
        }]
    });

    //Margin
    Components.extend("_base", "_base", {
    	 properties: [{
    		key: "margins_header",
    		inputtype: inputs.SectionInput,
    		name:false,
    		sort: Components.base_sort++,
    		data: {header:"Margin", expanded:false},
    	}, {
            name: "Top",
            key: "margin-top",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Right",
            key: "margin-right",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
        }, {
            name: "Bottom",
            key: "margin-bottom",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
        }, {
            name: "Left",
            key: "margin-left",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
        }]
    });

    //Padding
    Components.extend("_base", "_base", {
    	 properties: [{
    		key: "paddings_header",
    		inputtype: inputs.SectionInput,
    		name:false,
    		sort: Components.base_sort++,
    		data: {header:"Padding", expanded:false},
    	}, {
            name: "Top",
            key: "padding-top",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
    	}, {
            name: "Right",
            key: "padding-right",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
        }, {
            name: "Bottom",
            key: "padding-bottom",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
        }, {
            name: "Left",
            key: "padding-left",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
        }]
    });


    //Border
    Components.extend("_base", "_base", {
    	 properties: [{
    		key: "border_header",
    		inputtype: inputs.SectionInput,
    		name:false,
    		sort: Components.base_sort++,
    		data: {header:"Border", expanded:false},
    	 }, {        
            name: "Style",
            key: "border-style",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:12,
    		inline:true,
            inputtype: inputs.SelectInput,
            data: {
    			options: [{
    				value: "",
    				text: "Default"
    			}, {	
    				value: "solid",
    				text: "Solid"
    			}, {
    				value: "dotted",
    				text: "Dotted"
    			}, {
    				value: "dashed",
    				text: "Dashed"
    			}],
    		}
    	}, {
            name: "Width",
            key: "border-width",
    		htmlAttr: "style",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
            inputtype: inputs.CssUnitInput
       	}, {
            name: "Color",
            key: "border-color",
            sort: Components.base_sort++,
            col:6,
    		inline:true,
    		htmlAttr: "style",
            inputtype: inputs.ColorInput,
        }]
    });    

    //Background image
    Components.extend("_base", "_base", {
    	 properties: [{
    		key: "background_image_header",
    		inputtype: inputs.SectionInput,
    		name:false,
    		sort: Components.base_sort++,
    		data: {header:"Background Image", expanded:false},
    	 },{
            name: "Image",
            key: "Image",
            sort: Components.base_sort++,
    		//htmlAttr: "style",
            inputtype: inputs.ImageInput,
            
            init: function(node) {
    			var image = $(node).css("background-image").replace(/^url\(['"]?(.+)['"]?\)/, '$1');
    			return image;
            },

    		onChange: function(node, value) {
    			
    			$(node).css('background-image', 'url(' + value + ')');
    			
    			return node;
    		}        

       	}, {
            name: "Repeat",
            key: "background-repeat",
            sort: Components.base_sort++,
    		htmlAttr: "style",
            inputtype: inputs.SelectInput,
            data: {
    			options: [{
    				value: "",
    				text: "Default"
    			}, {	
    				value: "repeat-x",
    				text: "repeat-x"
    			}, {
    				value: "repeat-y",
    				text: "repeat-y"
    			}, {
    				value: "no-repeat",
    				text: "no-repeat"
    			}],
    		}
       	}, {
            name: "Size",
            key: "background-size",
            sort: Components.base_sort++,
    		htmlAttr: "style",
            inputtype: inputs.SelectInput,
            data: {
    			options: [{
    				value: "",
    				text: "Default"
    			}, {	
    				value: "contain",
    				text: "contain"
    			}, {
    				value: "cover",
    				text: "cover"
    			}],
    		}
       	}, {
            name: "Position x",
            key: "background-position-x",
            sort: Components.base_sort++,
    		htmlAttr: "style",
            col:6,
    		inline:true,
    		inputtype: inputs.SelectInput,
            data: {
    			options: [{
    				value: "",
    				text: "Default"
    			}, {	
    				value: "center",
    				text: "center"
    			}, {	
    				value: "right",
    				text: "right"
    			}, {
    				value: "left",
    				text: "left"
    			}],
    		}
       	}, {
            name: "Position y",
            key: "background-position-y",
            sort: Components.base_sort++,
    		htmlAttr: "style",
            col:6,
    		inline:true,
    		inputtype: inputs.SelectInput,
            data: {
    			options: [{
    				value: "",
    				text: "Default"
    			}, {	
    				value: "center",
    				text: "center"
    			}, {	
    				value: "top",
    				text: "top"
    			}, {
    				value: "bottom",
    				text: "bottom"
    			}],
    		}
        }]
    });    

    Components.extend("_base", "html/container", {
        classes: ["container", "container-fluid"],
        image: "icons/container.svg",
        html: '<div class="container" style="min-height:150px;"><div class="m-5">Container</div></div>',
        name: "Container",
        properties: [
         {
            name: "Type",
            key: "type",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["container", "container-fluid"],
            data: {
                options: [{
                    value: "container",
                    text: "Default"
                }, {
                    value: "container-fluid",
                    text: "Fluid"
                }]
            }
        },
    	{
            name: "Background",
            key: "background",
    		htmlAttr: "class",
            validValues: bgcolorClasses,
            inputtype: inputs.SelectInput,
            data: {
                options: bgcolorSelectOptions
            }
        },
    	{
            name: "Background Color",
            key: "background-color",
    		htmlAttr: "style",
            inputtype: inputs.ColorInput,
        },
    	{
            name: "Text Color",
            key: "color",
    		htmlAttr: "style",
            inputtype: inputs.ColorInput,
        }],
    });

    Components.extend("_base", "html/heading", {
        image: "icons/heading.svg",
        name: "Heading",
        nodes: ["h1", "h2","h3", "h4","h5","h6"],
        html: "<h1>Heading</h1>",
        
    	properties: [
    	{
            name: "Size",
            key: "size",
            inputtype: inputs.SelectInput,
            
            onChange: function(node, value) {
    			
    			return changeNodeName(node, "h" + value);
    		},	
    			
            init: function(node) {
                var regex;
                regex = /H(\d)/.exec(node.nodeName);
                if (regex && regex[1]) {
                    return regex[1]
                }
                return 1
            },
            
            data:{
    			options: [{
                    value: "1",
                    text: "1"
                }, {
                    value: "2",
                    text: "2"
                }, {
                    value: "3",
                    text: "3"
                }, {
                    value: "4",
                    text: "4"
                }, {
                    value: "5",
                    text: "5"
                }, {
                    value: "6",
                    text: "6"
                }]
           },
        }]
    });    
    Components.extend("_base", "html/link", {
        nodes: ["a"],
        name: "Link",
    	image: "icons/link.svg",
        properties: [{
            name: "Url",
            key: "href",
            htmlAttr: "href",
            inputtype: inputs.LinkInput
        }, {
            name: "Target",
            key: "target",
            htmlAttr: "target",
            inputtype: inputs.TextInput
        }]
    });
    Components.extend("_base", "html/image", {
        nodes: ["img"],
        name: "Image",
        html: '<img src="' +  Vvveb.baseUrl + 'icons/image.svg" height="128" width="128">',
        /*
        afterDrop: function (node)
    	{
    		node.attr("src", '');
    		return node;
    	},*/
        image: "icons/image.svg",
        properties: [{
            name: "Image",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.ImageInput
        }, {
            name: "Width",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "Height",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }, {
            name: "Alt",
            key: "alt",
            htmlAttr: "alt",
            inputtype: inputs.TextInput
        }]
    });
    Components.add("html/hr", {
        image: "icons/hr.svg",
        nodes: ["hr"],
        name: "Horizontal Rule",
        html: "<hr>"
    });
    Components.extend("_base", "html/label", {
        name: "Label",
        nodes: ["label"],
        html: '<label for="">Label</label>',
        properties: [{
            name: "For id",
            htmlAttr: "for",
            key: "for",
            inputtype: inputs.TextInput
        }]
    });
    Components.extend("_base", "html/button", {
        classes: ["btn", "btn-link"],
        name: "Button",
        image: "icons/button.svg",
        html: '<button type="button" class="btn btn-primary">Primary</button>',
        properties: [{
            name: "Link To",
            key: "href",
            htmlAttr: "href",
            inputtype: inputs.LinkInput
        }, {
            name: "Type",
            key: "type",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: [
                "btn-default", 
                "btn-primary", 
                "btn-info", 
                "btn-success", 
                "btn-warning", 
                "btn-info", 
                "btn-light", 
                "btn-dark", 
                "btn-outline-primary", 
                "btn-outline-info", 
                "btn-outline-success", 
                "btn-outline-warning", 
                "btn-outline-info", 
                "btn-outline-light", 
                "btn-outline-dark", 
                "btn-link"
            ],
            data: {
                options: [{
                    value: "btn-default",
                    text: "Default"
                }, {
                    value: "btn-primary",
                    text: "Primary"
                }, {
                    value: "btn btn-info",
                    text: "Info"
                }, {
                    value: "btn-success",
                    text: "Success"
                }, {
                    value: "btn-warning",
                    text: "Warning"
                }, {
                    value: "btn-info",
                    text: "Info"
                }, {
                    value: "btn-light",
                    text: "Light"
                }, {
                    value: "btn-dark",
                    text: "Dark"
                }, {
                    value: "btn-outline-primary",
                    text: "Primary outline"
                }, {
                    value: "btn btn-outline-info",
                    text: "Info outline"
                }, {
                    value: "btn-outline-success",
                    text: "Success outline"
                }, {
                    value: "btn-outline-warning",
                    text: "Warning outline"
                }, {
                    value: "btn-outline-info",
                    text: "Info outline"
                }, {
                    value: "btn-outline-light",
                    text: "Light outline"
                }, {
                    value: "btn-outline-dark",
                    text: "Dark outline"
                }, {
                    value: "btn-link",
                    text: "Link"
                }]
            }
        }, {
            name: "Size",
            key: "size",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["btn-lg", "btn-sm"],
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "btn-lg",
                    text: "Large"
                }, {
                    value: "btn-sm",
                    text: "Small"
                }]
            }
        }, {
            name: "Target",
            key: "target",
            htmlAttr: "target",
            inputtype: inputs.TextInput
        }, {
            name: "Disabled",
            key: "disabled",
            htmlAttr: "class",
            inputtype: inputs.ToggleInput,
            validValues: ["disabled"],
            data: {
                on: "disabled",
                off: ""
            }
        }]
    });
    Components.extend("_base", "html/buttongroup", {
        classes: ["btn-group"],
        name: "Button Group",
        image: "icons/button_group.svg",
        html: '<div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-secondary">Left</button><button type="button" class="btn btn-secondary">Middle</button> <button type="button" class="btn btn-secondary">Right</button></div>',
    	properties: [{
    	    name: "Size",
            key: "size",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["btn-group-lg", "btn-group-sm"],
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "btn-group-lg",
                    text: "Large"
                }, {
                    value: "btn-group-sm",
                    text: "Small"
                }]
            }
        }, {
    	    name: "Alignment",
            key: "alignment",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["btn-group", "btn-group-vertical"],
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "btn-group",
                    text: "Horizontal"
                }, {
                    value: "btn-group-vertical",
                    text: "Vertical"
                }]
            }
        }]
    });
    Components.extend("_base", "html/buttontoolbar", {
        classes: ["btn-toolbar"],
        name: "Button Toolbar",
        image: "icons/button_toolbar.svg",
        html: '<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
    		  <div class="btn-group mr-2" role="group" aria-label="First group">\
    			<button type="button" class="btn btn-secondary">1</button>\
    			<button type="button" class="btn btn-secondary">2</button>\
    			<button type="button" class="btn btn-secondary">3</button>\
    			<button type="button" class="btn btn-secondary">4</button>\
    		  </div>\
    		  <div class="btn-group mr-2" role="group" aria-label="Second group">\
    			<button type="button" class="btn btn-secondary">5</button>\
    			<button type="button" class="btn btn-secondary">6</button>\
    			<button type="button" class="btn btn-secondary">7</button>\
    		  </div>\
    		  <div class="btn-group" role="group" aria-label="Third group">\
    			<button type="button" class="btn btn-secondary">8</button>\
    		  </div>\
    		</div>'
    });
    Components.extend("_base","html/alert", {
        classes: ["alert"],
        name: "Alert",
        image: "icons/alert.svg",
        html: '<div class="alert alert-warning alert-dismissible fade show" role="alert">\
    		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
    			<span aria-hidden="true">&times;</span>\
    		  </button>\
    		  <strong>Holy guacamole!</strong> You should check in on some of those fields below.\
    		</div>',
        properties: [{
            name: "Type",
            key: "type",
            htmlAttr: "class",
            validValues: ["alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-light", "alert-dark"],
            inputtype: inputs.SelectInput,
            data: {
                options: [{
                    value: "alert-primary",
                    text: "Default"
                }, {
                    value: "alert-secondary",
                    text: "Secondary"
                }, {
                    value: "alert-success",
                    text: "Success"
                }, {
                    value: "alert-danger",
                    text: "Danger"
                }, {
                    value: "alert-warning",
                    text: "Warning"
                }, {
                    value: "alert-info",
                    text: "Info"
                }, {
                    value: "alert-light",
                    text: "Light"
                }, {
                    value: "alert-dark",
                    text: "Dark"
                }]
            }
        }]
    });
    Components.extend("_base", "html/badge", {
        classes: ["badge"],
        image: "icons/badge.svg",
        name: "Badge",
        html: '<span class="badge badge-primary">Primary badge</span>',
        properties: [{
            name: "Color",
            key: "color",
            htmlAttr: "class",
            validValues:["badge-primary", "badge-secondary", "badge-success", "badge-danger", "badge-warning", "badge-info", "badge-light", "badge-dark"],
            inputtype: inputs.SelectInput,
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "badge-primary",
                    text: "Primary"
                }, {
                    value: "badge-secondary",
                    text: "Secondary"
                }, {
                    value: "badge-success",
                    text: "Success"
                }, {
                    value: "badge-warning",
                    text: "Warning"
                }, {
                    value: "badge-danger",
                    text: "Danger"
                }, {
                    value: "badge-info",
                    text: "Info"
                }, {
                    value: "badge-light",
                    text: "Light"
                }, {
                    value: "badge-dark",
                    text: "Dark"
                }]
            }
         }]
    });
    Components.extend("_base", "html/card", {
        classes: ["card"],
        image: "icons/panel.svg",
        name: "Card",
        html: '<div class="card">\
    		  <img class="card-img-top" src="../libs/builder/icons/image.svg" alt="Card image cap" width="128" height="128">\
    		  <div class="card-body">\
    			<h4 class="card-title">Card title</h4>\
    			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\
    			<a href="#" class="btn btn-primary">Go somewhere</a>\
    		  </div>\
    		</div>'
    });
    Components.extend("_base", "html/listgroup", {
        name: "List Group",
        image: "icons/list_group.svg",
        classes: ["list-group"],
        html: '<ul class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'
    });
    Components.extend("_base", "html/listitem", {
        name: "List Item",
        classes: ["list-group-item"],
        html: '<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'
    });
    Components.extend("_base", "html/breadcrumbs", {
        classes: ["breadcrumb"],
        name: "Breadcrumbs",
        image: "icons/breadcrumbs.svg",
        html: '<ol class="breadcrumb">\
    		  <li class="breadcrumb-item active"><a href="#">Home</a></li>\
    		  <li class="breadcrumb-item active"><a href="#">Library</a></li>\
    		  <li class="breadcrumb-item active">Data 3</li>\
    		</ol>'
    });
    Components.extend("_base", "html/breadcrumbitem", {
    	classes: ["breadcrumb-item"],
        name: "Breadcrumb Item",
        html: '<li class="breadcrumb-item"><a href="#">Library</a></li>',
        properties: [{
            name: "Active",
            key: "active",
            htmlAttr: "class",
            validValues: ["", "active"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "active",
                off: ""
            }
        }]
    });
    Components.extend("_base", "html/pagination", {
        classes: ["pagination"],
        name: "Pagination",
        image: "icons/pagination.svg",
        html: '<nav aria-label="Page navigation example">\
    	  <ul class="pagination">\
    		<li class="page-item"><a class="page-link" href="#">Previous</a></li>\
    		<li class="page-item"><a class="page-link" href="#">1</a></li>\
    		<li class="page-item"><a class="page-link" href="#">2</a></li>\
    		<li class="page-item"><a class="page-link" href="#">3</a></li>\
    		<li class="page-item"><a class="page-link" href="#">Next</a></li>\
    	  </ul>\
    	</nav>',

        properties: [{
            name: "Size",
            key: "size",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["btn-lg", "btn-sm"],
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "btn-lg",
                    text: "Large"
                }, {
                    value: "btn-sm",
                    text: "Small"
                }]
            }
        },{
            name: "Alignment",
            key: "alignment",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["justify-content-center", "justify-content-end"],
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "justify-content-center",
                    text: "Center"
                }, {
                    value: "justify-content-end",
                    text: "Right"
                }]
            }
        }]	
    });
    Components.extend("_base", "html/pageitem", {
    	classes: ["page-item"],
        html: '<li class="page-item"><a class="page-link" href="#">1</a></li>',
        name: "Pagination Item",
        properties: [{
            name: "Link To",
            key: "href",
            htmlAttr: "href",
            child:".page-link",
            inputtype: inputs.TextInput
        }, {
            name: "Disabled",
            key: "disabled",
            htmlAttr: "class",
            validValues: ["disabled"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "disabled",
                off: ""
            }
       }]
    });
    Components.extend("_base", "html/progress", {
        classes: ["progress"],
        name: "Progress Bar",
        image: "icons/progressbar.svg",
        html: '<div class="progress"><div class="progress-bar w-25"></div></div>',
        properties: [{
            name: "Background",
            key: "background",
    		htmlAttr: "class",
            validValues: bgcolorClasses,
            inputtype: inputs.SelectInput,
            data: {
                options: bgcolorSelectOptions
            }
        },
        {
            name: "Progress",
            key: "background",
            child:".progress-bar",
    		htmlAttr: "class",
            validValues: ["", "w-25", "w-50", "w-75", "w-100"],
            inputtype: inputs.SelectInput,
            data: {
                options: [{
                    value: "",
                    text: "None"
                }, {
                    value: "w-25",
                    text: "25%"
                }, {
                    value: "w-50",
                    text: "50%"
                }, {
                    value: "w-75",
                    text: "75%"
                }, {
                    value: "w-100",
                    text: "100%"
                }]
            }
        }, 
        {
            name: "Progress background",
            key: "background",
            child:".progress-bar",
    		htmlAttr: "class",
            validValues: bgcolorClasses,
            inputtype: inputs.SelectInput,
            data: {
                options: bgcolorSelectOptions
            }
        }, {
            name: "Striped",
            key: "striped",
            child:".progress-bar",
            htmlAttr: "class",
            validValues: ["", "progress-bar-striped"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "progress-bar-striped",
                off: "",
            }
        }, {
            name: "Animated",
            key: "animated",
            child:".progress-bar",
            htmlAttr: "class",
            validValues: ["", "progress-bar-animated"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "progress-bar-animated",
                off: "",
            }
        }]
    });
    Components.extend("_base", "html/jumbotron", {
        classes: ["jumbotron"],
        image: "icons/jumbotron.svg",
        name: "Jumbotron",
        html: '<div class="jumbotron">\
    		  <h1 class="display-3">Hello, world!</h1>\
    		  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\
    		  <hr class="my-4">\
    		  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>\
    		  <p class="lead">\
    			<a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\
    		  </p>\
    		</div>'
    });
    Components.extend("_base", "html/navbar", {
        classes: ["navbar"],
        image: "icons/navbar.svg",
        name: "Nav Bar",
        html: '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
    		  <a class="navbar-brand" href="#">Navbar</a>\
    		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
    			<span class="navbar-toggler-icon"></span>\
    		  </button>\
    		\
    		  <div class="collapse navbar-collapse" id="navbarSupportedContent">\
    			<ul class="navbar-nav mr-auto">\
    			  <li class="nav-item active">\
    				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>\
    			  </li>\
    			  <li class="nav-item">\
    				<a class="nav-link" href="#">Link</a>\
    			  </li>\
    			  <li class="nav-item">\
    				<a class="nav-link disabled" href="#">Disabled</a>\
    			  </li>\
    			</ul>\
    			<form class="form-inline my-2 my-lg-0">\
    			  <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">\
    			  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
    			</form>\
    		  </div>\
    		</nav>',
        
        properties: [{
            name: "Color theme",
            key: "color",
            htmlAttr: "class",
            validValues: ["navbar-light", "navbar-dark"],
            inputtype: inputs.SelectInput,
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "navbar-light",
                    text: "Light"
                }, {
                    value: "navbar-dark",
                    text: "Dark"
                }]
            }
        },{
            name: "Background color",
            key: "background",
            htmlAttr: "class",
            validValues: bgcolorClasses,
            inputtype: inputs.SelectInput,
            data: {
                options: bgcolorSelectOptions
            }
        }, {
            name: "Placement",
            key: "placement",
            htmlAttr: "class",
            validValues: ["fixed-top", "fixed-bottom", "sticky-top"],
            inputtype: inputs.SelectInput,
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "fixed-top",
                    text: "Fixed Top"
                }, {
                    value: "fixed-bottom",
                    text: "Fixed Bottom"
                }, {
                    value: "sticky-top",
                    text: "Sticky top"
                }]
            }
        }]
    });

    Components.extend("_base", "html/form", {
        nodes: ["form"],
        image: "icons/form.svg",
        name: "Form",
        html: '<form><div class="form-group"><label>Text</label><input type="text" class="form-control"></div></div></form>',
        properties: [{
            name: "Style",
            key: "style",
            htmlAttr: "class",
            validValues: ["", "form-search", "form-inline", "form-horizontal"],
            inputtype: inputs.SelectInput,
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "form-search",
                    text: "Search"
                }, {
                    value: "form-inline",
                    text: "Inline"
                }, {
                    value: "form-horizontal",
                    text: "Horizontal"
                }]
            }
        }, {
            name: "Action",
            key: "action",
            htmlAttr: "action",
            inputtype: inputs.TextInput
        }, {
            name: "Method",
            key: "method",
            htmlAttr: "method",
            inputtype: inputs.TextInput
        }]
    });

    Components.extend("_base", "html/textinput", {
        name: "Text Input",
    	attributes: {"type":"text"},
        image: "icons/text_input.svg",
        html: '<div class="form-group"><label>Text</label><input type="text" class="form-control"></div></div>',
        properties: [{
            name: "Value",
            key: "value",
            htmlAttr: "value",
            inputtype: inputs.TextInput
        }, {
            name: "Placeholder",
            key: "placeholder",
            htmlAttr: "placeholder",
            inputtype: inputs.TextInput
        }]
    });

    Components.extend("_base", "html/selectinput", {
    	nodes: ["select"],
        name: "Select Input",
        image: "icons/select_input.svg",
        html: '<div class="form-group"><label>Choose an option </label><select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select></div>',

    	beforeInit: function (node)
    	{
    		properties = [];
    		var i = 0;
    		
    		$(node).find('option').each(function() {

    			data = {"value": this.value, "text": this.text};
    			
    			i++;
    			properties.push({
    				name: "Option " + i,
    				key: "option" + i,
    				//index: i - 1,
    				optionNode: this,
    				inputtype: inputs.TextValueInput,
    				data: data,
    				onChange: function(node, value, input) {
    					
    					option = $(this.optionNode);
    					
    					//if remove button is clicked remove option and render row properties
    					if (input.nodeName == 'BUTTON')
    					{
    						option.remove();
    						Components.render("html/selectinput");
    						return node;
    					}

    					if (input.name == "value") option.attr("value", value); 
    					else if (input.name == "text") option.text(value);
    					
    					return node;
    				},	
    			});
    		});
    		
    		//remove all option properties
    		this.properties = this.properties.filter(function(item) {
    			return item.key.indexOf("option") === -1;
    		});
    		
    		//add remaining properties to generated column properties
    		properties.push(this.properties[0]);
    		
    		this.properties = properties;
    		return node;
    	},
        
        properties: [{
            name: "Option",
            key: "option1",
            inputtype: inputs.TextValueInput
    	}, {
            name: "Option",
            key: "option2",
            inputtype: inputs.TextValueInput
    	}, {
            name: "",
            key: "addChild",
            inputtype: inputs.ButtonInput,
            data: {text:"Add option", icon:"la-plus"},
            onChange: function(node)
            {
    			 $(node).append('<option value="value">Text</option>');
    			 
    			 //render component properties again to include the new column inputs
    			 Components.render("html/selectinput");
    			 
    			 return node;
    		}
    	}]
    });
    Components.extend("_base", "html/textareainput", {
        name: "Text Area",
        image: "icons/text_area.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>'
    });
    Components.extend("_base", "html/radiobutton", {
        name: "Radio Button",
    	attributes: {"type":"radio"},
        image: "icons/radio.svg",
        html: '<label class="radio"><input type="radio"> Radio</label>',
        properties: [{
            name: "Name",
            key: "name",
            htmlAttr: "name",
            inputtype: inputs.TextInput
        }]
    });
    Components.extend("_base", "html/checkbox", {
        name: "Checkbox",
        attributes: {"type":"checkbox"},
        image: "icons/checkbox.svg",
        html: '<label class="checkbox"><input type="checkbox"> Checkbox</label>',
        properties: [{
            name: "Name",
            key: "name",
            htmlAttr: "name",
            inputtype: inputs.TextInput
        }]
    });
    Components.extend("_base", "html/fileinput", {
        name: "Input group",
    	attributes: {"type":"file"},
        image: "icons/text_input.svg",
        html: '<div class="form-group">\
    			  <input type="file" class="form-control">\
    			</div>'
    });
    Components.extend("_base", "html/table", {
        nodes: ["table"],
        classes: ["table"],
        image: "icons/table.svg",
        name: "Table",
        html: '<table class="table">\
    		  <thead>\
    			<tr>\
    			  <th>#</th>\
    			  <th>First Name</th>\
    			  <th>Last Name</th>\
    			  <th>Username</th>\
    			</tr>\
    		  </thead>\
    		  <tbody>\
    			<tr>\
    			  <th scope="row">1</th>\
    			  <td>Mark</td>\
    			  <td>Otto</td>\
    			  <td>@mdo</td>\
    			</tr>\
    			<tr>\
    			  <th scope="row">2</th>\
    			  <td>Jacob</td>\
    			  <td>Thornton</td>\
    			  <td>@fat</td>\
    			</tr>\
    			<tr>\
    			  <th scope="row">3</th>\
    			  <td>Larry</td>\
    			  <td>the Bird</td>\
    			  <td>@twitter</td>\
    			</tr>\
    		  </tbody>\
    		</table>',
        properties: [
    	{
            name: "Type",
            key: "type",
    		htmlAttr: "class",
            validValues: ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark", "table-white"],
            inputtype: inputs.SelectInput,
            data: {
                options: [{
    				value: "Default",
    				text: ""
    			}, {
    				value: "table-primary",
    				text: "Primary"
    			}, {
    				value: "table-secondary",
    				text: "Secondary"
    			}, {
    				value: "table-success",
    				text: "Success"
    			}, {
    				value: "table-danger",
    				text: "Danger"
    			}, {
    				value: "table-warning",
    				text: "Warning"
    			}, {
    				value: "table-info",
    				text: "Info"
    			}, {
    				value: "table-light",
    				text: "Light"
    			}, {
    				value: "table-dark",
    				text: "Dark"
    			}, {
    				value: "table-white",
    				text: "White"
    			}]
            }
        },
    	{
            name: "Responsive",
            key: "responsive",
            htmlAttr: "class",
            validValues: ["table-responsive"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "table-responsive",
                off: ""
            }
        },   
    	{
            name: "Small",
            key: "small",
            htmlAttr: "class",
            validValues: ["table-sm"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "table-sm",
                off: ""
            }
        },   
    	{
            name: "Hover",
            key: "hover",
            htmlAttr: "class",
            validValues: ["table-hover"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "table-hover",
                off: ""
            }
        },   
    	{
            name: "Bordered",
            key: "bordered",
            htmlAttr: "class",
            validValues: ["table-bordered"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "table-bordered",
                off: ""
            }
        },   
    	{
            name: "Striped",
            key: "striped",
            htmlAttr: "class",
            validValues: ["table-striped"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "table-striped",
                off: ""
            }
        },   
    	{
            name: "Inverse",
            key: "inverse",
            htmlAttr: "class",
            validValues: ["table-inverse"],
            inputtype: inputs.ToggleInput,
            data: {
                on: "table-inverse",
                off: ""
            }
        },   
        {
            name: "Head options",
            key: "head",
            htmlAttr: "class",
            child:"thead",
            inputtype: inputs.SelectInput,
            validValues: ["", "thead-inverse", "thead-default"],
            data: {
                options: [{
                    value: "",
                    text: "None"
                }, {
                    value: "thead-default",
                    text: "Default"
                }, {
                    value: "thead-inverse",
                    text: "Inverse"
                }]
            }
        }]
    });
    Components.extend("_base", "html/tablerow", {
        nodes: ["tr"],
        name: "Table Row",
        html: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
        properties: [{
            name: "Type",
            key: "type",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["", "success", "danger", "warning", "active"],
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "success",
                    text: "Success"
                }, {
                    value: "error",
                    text: "Error"
                }, {
                    value: "warning",
                    text: "Warning"
                }, {
                    value: "active",
                    text: "Active"
                }]
            }
        }]
    });
    Components.extend("_base", "html/tablecell", {
        nodes: ["td"],
        name: "Table Cell",
        html: "<td>Cell</td>"
    });
    Components.extend("_base", "html/tableheadercell", {
        nodes: ["th"],
        name: "Table Header Cell",
        html: "<th>Head</th>"
    });
    Components.extend("_base", "html/tablehead", {
        nodes: ["thead"],
        name: "Table Head",
        html: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
        properties: [{
            name: "Type",
            key: "type",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["", "success", "danger", "warning", "info"],
            data: {
                options: [{
                    value: "",
                    text: "Default"
                }, {
                    value: "success",
                    text: "Success"
                }, {
                    value: "anger",
                    text: "Error"
                }, {
                    value: "warning",
                    text: "Warning"
                }, {
                    value: "info",
                    text: "Info"
                }]
            }
        }]
    });
    Components.extend("_base", "html/tablebody", {
        nodes: ["tbody"],
        name: "Table Body",
        html: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
    });

    Components.add("html/gridcolumn", {
        name: "Grid Column",
        image: "icons/grid_row.svg",
        classesRegex: ["col-"],
        html: '<div class="col-sm-4"><h3>col-sm-4</h3></div>',
        properties: [{
            name: "Column",
            key: "column",
            inputtype: inputs.GridInput,
            data: {hide_remove:true},
    		
    		beforeInit: function(node) {
    			_class = $(node).attr("class");
    			
    			var reg = /col-([^-\$ ]*)?-?(\d+)/g; 
    			var match;

    			while ((match = reg.exec(_class)) != null) {
    				this.data["col" + ((match[1] != undefined)?"_" + match[1]:"")] = match[2];
    			}
    		},
    		
    		onChange: function(node, value, input) {
    			var _class = node.attr("class");
    			
    			//remove previous breakpoint column size
    			_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
    			//add new column size
    			if (value) _class +=  ' ' + input.name + '-' + value;
    			node.attr("class", _class);
    			
    			return node;
    		},				
    	}]
    });
    Components.add("html/gridrow", {
        name: "Grid Row",
        image: "icons/grid_row.svg",
        classes: ["row"],
        html: '<div class="row"><div class="col-sm-4"><h3>col-sm-4</h3></div><div class="col-sm-4 col-5"><h3>col-sm-4</h3></div><div class="col-sm-4"><h3>col-sm-4</h3></div></div>',
        
    	beforeInit: function (node)
    	{
    		properties = [];
    		var i = 0;
    		var j = 0;
    		
    		$(node).find('[class*="col-"]').each(function() {
    			_class = $(this).attr("class");
    			
    			var reg = /col-([^-\$ ]*)?-?(\d+)/g; 
    			var match;
    			var data = {};

    			while ((match = reg.exec(_class)) != null) {
    				data["col" + ((match[1] != undefined)?"_" + match[1]:"")] = match[2];
    			}
    			
    			i++;
    			properties.push({
    				name: "Column " + i,
    				key: "column" + i,
    				//index: i - 1,
    				columnNode: this,
    				col:12,
    				inline:true,
    				inputtype: inputs.GridInput,
    				data: data,
    				onChange: function(node, value, input) {

    					//column = $('[class*="col-"]:eq(' + this.index + ')', node);
    					var column = $(this.columnNode);
    					
    					//if remove button is clicked remove column and render row properties
    					if (input.nodeName == 'BUTTON')
    					{
    						column.remove();
    						Components.render("html/gridrow");
    						return node;
    					}

    					//if select input then change column class
    					_class = column.attr("class");
    					
    					//remove previous breakpoint column size
    					_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
    					//add new column size
    					if (value) _class +=  ' ' + input.name + '-' + value;
    					column.attr("class", _class);
    					
    					//console.log(this, node, value, input, input.name);
    					
    					return node;
    				},	
    			});
    		});
    		
    		//remove all column properties
    		this.properties = this.properties.filter(function(item) {
    			return item.key.indexOf("column") === -1;
    		});
    		
    		//add remaining properties to generated column properties
    		properties.push(this.properties[0]);
    		
    		this.properties = properties;
    		return node;
    	},
        
        properties: [{
            name: "Column",
            key: "column1",
            inputtype: inputs.GridInput
    	}, {
            name: "Column",
            key: "column1",
            inline:true,
            col:12,
            inputtype: inputs.GridInput
    	}, {
            name: "",
            key: "addChild",
            inputtype: inputs.ButtonInput,
            data: {text:"Add column", icon:"la la-plus"},
            onChange: function(node)
            {
    			 $(node).append('<div class="col-3">Col-3</div>');
    			 
    			 //render component properties again to include the new column inputs
    			 Components.render("html/gridrow");
    			 
    			 return node;
    		}
    	}]
    });


    Components.extend("_base", "html/paragraph", {
        nodes: ["p"],
        name: "Paragraph",
    	image: "icons/paragraph.svg",
    	html: '<p>Lorem ipsum</p>',
        properties: [{
            name: "Text align",
            key: "text-align",
            htmlAttr: "class",
            inputtype: inputs.SelectInput,
            validValues: ["", "text-left", "text-center", "text-right"],
            inputtype: inputs.RadioButtonInput,
            data: {
    			extraclass:"btn-group-sm btn-group-fullwidth",
                options: [{
                    value: "",
                    icon:"la la-close",
                    //text: "None",
                    title: "None",
                    checked:true,
                }, {
                    value: "left",
                    //text: "Left",
                    title: "text-left",
                    icon:"la la-align-left",
                    checked:false,
                }, {
                    value: "text-center",
                    //text: "Center",
                    title: "Center",
                    icon:"la la-align-center",
                    checked:false,
                }, {
                    value: "text-right",
                    //text: "Right",
                    title: "Right",
                    icon:"la la-align-right",
                    checked:false,
                }],
            },
    	}]
    });

});
define('skylark-vvveb/components/server',[
    "skylark-jquery",
    "../Vvveb",
    "../ComponentsGroup",
    "../Components",
    "../inputs"
],function($,Vvveb,ComponentsGroup,Components,inputs){


    ComponentsGroup['Server Components'] = ["components/products", "components/product", "components/categories", "components/manufacturers", "components/search", "components/user", "components/product_gallery", "components/cart", "components/checkout", "components/filters", "components/product", "components/slider"];


    Components.add("components/product", {
        name: "Product",
        attributes: ["data-component-product"],

        image: "icons/map.svg",
        html: '<iframe frameborder="0" src="https://maps.google.com/maps?&z=1&t=q&output=embed"></iframe>',
        
    	properties: [
    	{
            name: "Id",
            key: "id",
            htmlAttr: "id",
            inputtype: inputs.TextInput
        },
    	{
            name: "Select",
            key: "id",
            htmlAttr: "id",
            inputtype: inputs.SelectInput,
            data:{
    			options: [{
                    value: "",
                    text: "None"
                }, {
                    value: "pull-left",
                    text: "Left"
                }, {
                    value: "pull-right",
                    text: "Right"
                }]
           },
        },
    	{
            name: "Select 2",
            key: "id",
            htmlAttr: "id",
            inputtype: inputs.SelectInput,
            data:{
    			options: [{
                    value: "",
                    text: "nimic"
                }, {
                    value: "pull-left",
                    text: "gigi"
                }, {
                    value: "pull-right",
                    text: "vasile"
                }, {
                    value: "pull-right",
                    text: "sad34"
                }]
           },
        }]
    });    


    Components.add("components/products", {
        name: "Products",
        attributes: ["data-component-products"],

        image: "icons/products.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',

        init: function (node)
    	{
    		$('.form-group[data-group]').hide();
    		if (node.dataset.type != undefined)
    		{
    			$('.form-group[data-group="'+ node.dataset.type + '"]').show();
    		} else
    		{		
    			$('.form-group[data-group]:first').show();
    		}
    	},
        properties: [{
            name: false,
            key: "type",
            inputtype: inputs.RadioButtonInput,
    		htmlAttr:"data-type",
            data: {
                inline: true,
                extraclass:"btn-group-fullwidth",
                options: [{
                    value: "autocomplete",
                    text: "Autocomplete",
                    title: "Autocomplete",
                    icon:"la la-search",
                    checked:true,
                }, {
                    value: "automatic",
                    icon:"la la-cog",
                    text: "Configuration",
                    title: "Configuration",
                }],
            },
    		onChange : function(element, value, input) {
    			
    			$('.form-group[data-group]').hide();
    			$('.form-group[data-group="'+ input.value + '"]').show();

    			return element;
    		}, 
    		init: function(node) {
    			return node.dataset.type;
    		},            
        },{
            name: "Products",
            key: "products",
            group:"autocomplete",
            htmlAttr:"data-products",
            inline:true,
            col:12,
            inputtype: inputs.AutocompleteList,
            data: {
                url: "/admin/?module=editor&action=productsAutocomplete",
            },
        },{
            name: "Number of products",
            group:"automatic",
            key: "limit",
    		htmlAttr:"data-limit",
            inputtype: inputs.NumberInput,
            data: {
                value: "8",//default
                min: "1",
                max: "1024",
                step: "1"
            },        
            getFromNode: function(node) {
                return 10
            },
        },{
            name: "Start from page",
            group:"automatic",
            key: "page",
    		htmlAttr:"data-page",
            data: {
                value: "1",//default
                min: "1",
                max: "1024",
                step: "1"
            },        
            inputtype: inputs.NumberInput,
            getFromNode: function(node) {
                return 0
            },
        },{
            name: "Order by",
            group:"automatic",
            key: "order",
    		htmlAttr:"data-order",
            inputtype: inputs.SelectInput,
            data: {
                options: [{
    				value: "price_asc",
                    text: "Price Ascending"
                }, {
                    value: "price_desc",
                    text: "Price Descending"
                }, {
                    value: "date_asc",
                    text: "Date Ascending"
                }, {
                    value: "date_desc",
                    text: "Date Descending"
                }, {
                    value: "sales_asc",
                    text: "Sales Ascending"
                }, {
                    value: "sales_desc",
                    text: "Sales Descending"
                }]
    		}
    	},{
            name: "Category",
            group:"automatic",
            key: "category",
    		htmlAttr:"data-category",
            inline:true,
            col:12,
            inputtype: inputs.AutocompleteList,
            data: {
                url: "/admin/?module=editor&action=productsAutocomplete",
            },

    	},{
            name: "Manufacturer",
            group:"automatic",
            key: "manufacturer",
    		htmlAttr:"data-manufacturer",
            inline:true,
            col:12,
            inputtype: inputs.AutocompleteList,
            data: {
                url: "/admin/?module=editor&action=productsAutocomplete",
    		}
    	},{
            name: "Manufacturer 2",
            group:"automatic",
            key: "manufacturer 2",
    		htmlAttr:"data-manufacturer2",
            inline:true,
            col:12,
            inputtype: inputs.AutocompleteList,
            data: {
                url: "/admin/?module=editor&action=productsAutocomplete",
            },
        }]
    });

    Components.add("components/manufacturers", {
        name: "Manufacturers",
        classes: ["component_manufacturers"],
        image: "icons/categories.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            nolabel:false,
            inputtype: inputs.TextInput,
            data: {text:"Fields"}
    	},{
            name: "Name",
            key: "category",
            inputtype: inputs.TextInput
    	},{
            name: "Image",
            key: "category",
            inputtype: inputs.TextInput
    	}
        ]
    });

    Components.add("components/categories", {
        name: "Categories",
        classes: ["component_categories"],
        image: "icons/categories.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "Name",
            key: "name",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }]
    });
    Components.add("components/search", {
        name: "Search",
        classes: ["component_search"],
        image: "icons/search.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "asdasdad",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }, {
            name: "34234234",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "d32d23",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }]
    });
    Components.add("components/user", {
        name: "User",
        classes: ["component_user"],
        image: "icons/user.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "asdasdad",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }, {
            name: "34234234",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "d32d23",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }]
    });
    Components.add("components/product_gallery", {
        name: "Product gallery",
        classes: ["component_product_gallery"],
        image: "icons/product_gallery.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "asdasdad",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }, {
            name: "34234234",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "d32d23",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }]
    });
    Components.add("components/cart", {
        name: "Cart",
        classes: ["component_cart"],
        image: "icons/cart.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "asdasdad",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }, {
            name: "34234234",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "d32d23",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }]
    });
    Components.add("components/checkout", {
        name: "Checkout",
        classes: ["component_checkout"],
        image: "icons/checkout.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "asdasdad",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }, {
            name: "34234234",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "d32d23",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }]
    });
    Components.add("components/filters", {
        name: "Filters",
        classes: ["component_filters"],
        image: "icons/filters.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "asdasdad",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }, {
            name: "34234234",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "d32d23",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }]
    });
    Components.add("components/product", {
        name: "Product",
        classes: ["component_product"],
        image: "icons/product.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "asdasdad",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }, {
            name: "34234234",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "d32d23",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }]
    });
    Components.add("components/slider", {
        name: "Slider",
        classes: ["component_slider"],
        image: "icons/slider.svg",
        html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
        properties: [{
            name: "asdasdad",
            key: "src",
            htmlAttr: "src",
            inputtype: inputs.FileUploadInput
        }, {
            name: "34234234",
            key: "width",
            htmlAttr: "width",
            inputtype: inputs.TextInput
        }, {
            name: "d32d23",
            key: "height",
            htmlAttr: "height",
            inputtype: inputs.TextInput
        }]
    });
});
define('skylark-vvveb/components/widgets',[
    "skylark-jquery",
    "../Vvveb",
    "../ComponentsGroup",
    "../Components",
    "../inputs"
],function($,Vvveb,ComponentsGroup,Components,inputs){
    var jQuery = $;


    ComponentsGroup['Widgets'] = [
        "widgets/googlemaps", 
        "widgets/video", 
        "widgets/chartjs", 
        "widgets/facebookpage", 
        "widgets/paypal", 
        "widgets/instagram", 
        "widgets/twitter"/*, "widgets/facebookcomments"*/];

    Components.extend("_base", "widgets/googlemaps", {
        name: "Google Maps",
        attributes: ["data-component-maps"],
        image: "icons/map.svg",
        dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/maps.png">',
        html: '<div data-component-maps style="min-height:240px;min-width:240px;position:relative"><iframe frameborder="0" src="https://maps.google.com/maps?&z=1&t=q&output=embed" width="100" height="100" style="width:100%;height:100%;position:absolute;left:0px;pointer-events:none"></iframe></div>',
        
        
        //url parameters
        z:3, //zoom
        q:'Paris',//location
        t: 'q', //map type q = roadmap, w = satellite
        
        onChange: function (node, property, value)
        {
    		map_iframe = jQuery('iframe', node);
    		
    		this[property.key] = value;
    		
    		mapurl = 'https://maps.google.com/maps?&q=' + this.q + '&z=' + this.z + '&t=' + this.t + '&output=embed';
    		
    		map_iframe.attr("src",mapurl);
    		
    		return node;
    	},

        properties: [{
            name: "Address",
            key: "q",
            inputtype: inputs.TextInput
        }, 
    	{
            name: "Map type",
            key: "t",
            inputtype: inputs.SelectInput,
            data:{
    			options: [{
                    value: "q",
                    text: "Roadmap"
                }, {
                    value: "w",
                    text: "Satellite"
                }]
           },
        },
        {
            name: "Zoom",
            key: "z",
            inputtype: inputs.RangeInput,
            data:{
    			max: 20, //max zoom level
    			min:1,
    			step:1
           },
    	}]
    });

    Components.extend("_base", "widgets/video", {
        name: "Video",
        attributes: ["data-component-video"],
        image: "icons/video.svg",
        dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/video.svg" width="100" height="100">', //use image for drag and swap with iframe on drop for drag performance
        html: '<div data-component-video style="min-height:240px;min-width:240px;position:relative"><iframe frameborder="0" src="https://www.youtube.com/embed/-stFvGmg1A8" style="width:100%;height:100%;position:absolute;left:0px;pointer-events:none"></iframe></div>',
        
        
        //url parameters set with onChange
        t:'y',//video type
        video_id:'',//video id
        url: '', //html5 video src
        autoplay: false,
        controls: true,
        loop: false,

    	init: function (node) {
    		iframe = jQuery('iframe', node);
    		video = jQuery('video', node);
    		
    		$("#right-panel [data-key=url]").hide();
    		
    		//check if html5
    		if (video.length) {
    			this.url = video.src;
    		} else if (iframe.length) //vimeo or youtube
    		{
    			src = iframe.attr("src");

    			if (src && src.indexOf("youtube"))//youtube
    			{
    				this.video_id = src.match(/youtube.com\/embed\/([^$\?]*)/)[1];
    			} else if (src && src.indexOf("vimeo"))//youtube
    			{
    				this.video_id = src.match(/vimeo.com\/video\/([^$\?]*)/)[1];
    			}
    		}
    		
    		$("#right-panel input[name=video_id]").val(this.video_id);
    		$("#right-panel input[name=url]").val(this.url);
    	},
    	
    	onChange: function (node, property, value)	{
    		this[property.key] = value;

    		//if (property.key == "t")
    		{
    			switch (this.t)
    			{
    				case 'y':
    				$("#right-panel [data-key=video_id]").show();
    				$("#right-panel [data-key=url]").hide();
    				newnode = $('<div data-component-video><iframe src="https://www.youtube.com/embed/' + this.video_id + '?&amp;autoplay=' + this.autoplay + '&amp;controls=' + this.controls + '&amp;loop=' + this.loop + '" allowfullscreen="true" style="height: 100%; width: 100%;" frameborder="0"></iframe></div>');
    				break;
    				case 'v':
    				$("#right-panel [data-key=video_id]").show();
    				$("#right-panel [data-key=url]").hide();
    				newnode = $('<div data-component-video><iframe src="https://player.vimeo.com/video/' + this.video_id + '?&amp;autoplay=' + this.autoplay + '&amp;controls=' + this.controls + '&amp;loop=' + this.loop + '" allowfullscreen="true" style="height: 100%; width: 100%;" frameborder="0"></iframe></div>');
    				break;
    				case 'h':
    				$("#right-panel [data-key=video_id]").hide();
    				$("#right-panel [data-key=url]").show();
    				newnode = $('<div data-component-video><video src="' + this.url + '" ' + (this.controls?' controls ':'') + (this.loop?' loop ':'') + ' style="height: 100%; width: 100%;"></video></div>');
    				break;
    			}
    			
    			node.replaceWith(newnode);
    			return newnode;
    		}
    		return node;
    	},	
    	
        properties: [{
            name: "Provider",
            key: "t",
            inputtype: inputs.SelectInput,
            data:{
    			options: [{
                    text: "Youtube",
                    value: "y"
                }, {
                    text: "Vimeo",
                    value: "v"
                },{
                    text: "HTML5",
                    value: "h"
                }]
           },
    	 },	       
         {
            name: "Video id",
            key: "video_id",
            inputtype: inputs.TextInput,
        },{
            name: "Url",
            key: "url",
            inputtype: inputs.TextInput
        },{
            name: "Autoplay",
            key: "autoplay",
            inputtype: inputs.CheckboxInput
        },{
            name: "Controls",
            key: "controls",
            inputtype: inputs.CheckboxInput
        },{
            name: "Loop",
            key: "loop",
            inputtype: inputs.CheckboxInput
        }]
    });



    Components.extend("_base", "widgets/facebookcomments", {
        name: "Facebook Comments",
        attributes: ["data-component-facebookcomments"],
        image: "icons/facebook.svg",
        dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/facebook.svg">',
        html: '<div  data-component-facebookcomments><script>(function(d, s, id) {\
    			  var js, fjs = d.getElementsByTagName(s)[0];\
    			  if (d.getElementById(id)) return;\
    			  js = d.createElement(s); js.id = id;\
    			  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=";\
    			  fjs.parentNode.insertBefore(js, fjs);\
    			}(document, \'script\', \'facebook-jssdk\'));</script>\
    			<div class="fb-comments" \
    			data-href="' + window.location.href + '" \
    			data-numposts="5" \
    			data-colorscheme="light" \
    			data-mobile="" \
    			data-order-by="social" \
    			data-width="100%" \
    			></div></div>',
        properties: [{
            name: "Href",
            key: "business",
            htmlAttr: "data-href",
            child:".fb-comments",
            inputtype: inputs.TextInput
        },{		
            name: "Item name",
            key: "item_name",
            htmlAttr: "data-numposts",
            child:".fb-comments",
            inputtype: inputs.TextInput
        },{		
            name: "Color scheme",
            key: "colorscheme",
            htmlAttr: "data-colorscheme",
            child:".fb-comments",
            inputtype: inputs.TextInput
        },{		
            name: "Order by",
            key: "order-by",
            htmlAttr: "data-order-by",
            child:".fb-comments",
            inputtype: inputs.TextInput
        },{		
            name: "Currency code",
            key: "width",
            htmlAttr: "data-width",
            child:".fb-comments",
            inputtype: inputs.TextInput
    	}]
    });

    Components.extend("_base", "widgets/instagram", {
        name: "Instagram",
        attributes: ["data-component-instagram"],
        image: "icons/instagram.svg",
        drophtml: '<img src="' + Vvveb.baseUrl + 'icons/instagram.png">',
        html: '<div align=center data-component-instagram>\
    			<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/tsxp1hhQTG/" data-instgrm-version="8" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/tsxp1hhQTG/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Text</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/instagram/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> Instagram</a> (@instagram) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="-">-</time></p></div></blockquote>\
    			<script async defer src="//www.instagram.com/embed.js"></script>\
    		</div>',
        properties: [{
            name: "Widget id",
            key: "instgrm-permalink",
            htmlAttr: "data-instgrm-permalink",
            child: ".instagram-media",
            inputtype: inputs.TextInput
        }],
    });

    Components.extend("_base", "widgets/twitter", {
        name: "Twitter",
        attributes: ["data-component-twitter"],
        image: "icons/twitter.svg",
        dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/twitter.svg">',
        html: '<div data-component-twitter><a class="twitter-timeline" data-dnt="true" data-chrome="nofooter noborders noscrollbar noheader transparent" href="https://twitter.com/twitterapi" href="https://twitter.com/twitterapi" data-widget-id="243046062967885824" ></a>\
    			<script>window.twttr = (function(d, s, id) {\
    			  var js, fjs = d.getElementsByTagName(s)[0],\
    				t = window.twttr || {};\
    			  if (d.getElementById(id)) return t;\
    			  js = d.createElement(s);\
    			  js.id = id;\
    			  js.src = "https://platform.twitter.com/widgets.js";\
    			  fjs.parentNode.insertBefore(js, fjs);\
    			  t._e = [];\
    			  t.ready = function(f) {\
    				t._e.push(f);\
    			  };\
    			  return t;\
    			}(document, "script", "twitter-wjs"));</script></div>',
        properties: [{
            name: "Widget id",
            key: "widget-id",
            htmlAttr: "data-widget-id",
            child: " > a, > iframe",
            inputtype: inputs.TextInput
        }],
    });

    Components.extend("_base", "widgets/paypal", {
        name: "Paypal",
        attributes: ["data-component-paypal"],
        image: "icons/paypal.svg",
        html: '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" data-component-paypal>\
    \
    				<!-- Identify your business so that you can collect the payments. -->\
    				<input type="hidden" name="business"\
    					value="givanz@yahoo.com">\
    \
    				<!-- Specify a Donate button. -->\
    				<input type="hidden" name="cmd" value="_donations">\
    \
    				<!-- Specify details about the contribution -->\
    				<input type="hidden" name="item_name" value="VvvebJs">\
    				<input type="hidden" name="item_number" value="Support">\
    				<input type="hidden" name="currency_code" value="USD">\
    \
    				<!-- Display the payment button. -->\
    				<input type="image" name="submit"\
    				src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"\
    				alt="Donate">\
    				<img alt="" width="1" height="1"\
    				src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" >\
    \
    			</form>',
        properties: [{
            name: "Email",
            key: "business",
            htmlAttr: "value",
            child:"input[name='business']",
            inputtype: inputs.TextInput
        },{		
            name: "Item name",
            key: "item_name",
            htmlAttr: "value",
            child:"input[name='item_name']",
            inputtype: inputs.TextInput
        },{		
            name: "Item number",
            key: "item_number",
            htmlAttr: "value",
            child:"input[name='item_number']",
            inputtype: inputs.TextInput
        },{		
            name: "Currency code",
            key: "currency_code",
            htmlAttr: "value",
            child:"input[name='currency_code']",
            inputtype: inputs.TextInput
    	}],
    });
        
    Components.extend("_base", "widgets/facebookpage", {
        name: "Facebook Page Plugin",
        attributes: ["data-component-facebookpage"],
        image: "icons/facebook.svg",
        dropHtml: '<img src="' + Vvveb.baseUrl + 'icons/facebook.png">',
    	html: '<div data-component-facebookpage><div class="fb-page" data-href="https://www.facebook.com/facebook" data-appId="100526183620976" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>\
    			<div id="fb-root"></div>\
    			<script>(function(d, s, id) {\
    			  var appId = document.getElementsByClassName("fb-page")[0].dataset.appid;\
    			  var js, fjs = d.getElementsByTagName(s)[0];\
    			  js = d.createElement(s); js.id = id;\
    			  js.src = \'https://connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v3.0&appId=" + appId + "&autoLogAppEvents=1\';\
    			  fjs.parentNode.insertBefore(js, fjs);\
    			}(document, \'script\', \'facebook-jssdk\'));</script></div>',

        properties: [{
            name: "Small header",
            key: "small-header",
            htmlAttr: "data-small-header",
            child:".fb-page",
            inputtype: inputs.TextInput
        },{		
            name: "Adapt container width",
            key: "adapt-container-width",
            htmlAttr: "data-adapt-container-width",
            child:".fb-page",
            inputtype: inputs.TextInput
        },{		
            name: "Hide cover",
            key: "hide-cover",
            htmlAttr: "data-hide-cover",
            child:".fb-page",
            inputtype: inputs.TextInput
        },{		
            name: "Show facepile",
            key: "show-facepile",
            htmlAttr: "data-show-facepile",
            child:".fb-page",
            inputtype: inputs.TextInput
        },{		
            name: "App Id",
            key: "appid",
            htmlAttr: "data-appId",
            child:".fb-page",
            inputtype: inputs.TextInput
    	}],
       onChange: function(node, input, value, component) {
    	   //console.log(component.html);
    	   //console.log(this.html);
    	   
    	   var newElement = $(this.html);
    	   newElement.find(".fb-page").attr(input.htmlAttr, value);
    	   
    	   console.log(node.parent());
    	   console.log(node.parent().html());
    	   node.parent().html(newElement.html());

    	   console.log(newElement);


    	   console.log(newElement.html());

    	   return newElement;
    	}	
    });
        
    Components.extend("_base", "widgets/chartjs", {
        name: "Chart.js",
        attributes: ["data-component-chartjs"],
        image: "icons/chart.svg",
    	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/chart.svg">',
        html: '<div data-component-chartjs class="chartjs" data-chart=\'{\
    			"type": "line",\
    			"data": {\
    				"labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],\
    				"datasets": [{\
    					"data": [12, 19, 3, 5, 2, 3],\
    					"fill": false,\
    					"borderColor":"rgba(255, 99, 132, 0.2)"\
    				}, {\
    					"fill": false,\
    					"data": [3, 15, 7, 4, 19, 12],\
    					"borderColor": "rgba(54, 162, 235, 0.2)"\
    				}]\
    			}}\' style="min-height:240px;min-width:240px;width:100%;height:100%;position:relative">\
    			  <canvas></canvas>\
    			</div>',
    	chartjs: null,
    	ctx: null,
    	node: null,

    	config: {/*
    			type: 'line',
    			data: {
    				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    				datasets: [{
    					data: [12, 19, 3, 5, 2, 3],
    					fill: false,
    					borderColor:'rgba(255, 99, 132, 0.2)',
    				}, {
    					fill: false,
    					data: [3, 15, 7, 4, 19, 12],
    					borderColor: 'rgba(54, 162, 235, 0.2)',
    				}]
    			},*/
    	},		

    	dragStart: function (node)
    	{
    		//check if chartjs is included and if not add it when drag starts to allow the script to load
    		body = Vvveb.Builder.frameBody;
    		
    		if ($("#chartjs-script", body).length == 0)
    		{
    			$(body).append('<script id="chartjs-script" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>');
    			$(body).append('<script>\
    				$(document).ready(function() {\
    					$(".chartjs").each(function () {\
    						ctx = $("canvas", this).get(0).getContext("2d");\
    						config = JSON.parse(this.dataset.chart);\
    						chartjs = new Chart(ctx, config);\
    					});\
    				\});\
    			  </script>');
    		}
    		
    		return node;
    	},
    	

    	drawChart: function ()
    	{
    		if (this.chartjs != null) this.chartjs.destroy();
    		this.node.dataset.chart = JSON.stringify(this.config);
    		
    		config = Object.assign({}, this.config);//avoid passing by reference to avoid chartjs to fill the object
    		this.chartjs = new Chart(this.ctx, config);
    	},
    	
    	init: function (node)
    	{
    		this.node = node;
    		this.ctx = $("canvas", node).get(0).getContext("2d");
    		this.config = JSON.parse(node.dataset.chart);
    		this.drawChart();

    		return node;
    	},
      
      
    	beforeInit: function (node)
    	{
    		
    		return node;
    	},
        
        properties: [
    	{
            name: "Type",
            key: "type",
            inputtype: inputs.SelectInput,
            data:{
    			options: [{
                    text: "Line",
                    value: "line"
                }, {
                    text: "Bar",
                    value: "bar"
                }, {
                    text: "Pie",
                    value: "pie"
                }, {
                    text: "Doughnut",
                    value: "doughnut"
                }, {
                    text: "Polar Area",
                    value: "polarArea"
                }, {
                    text: "Bubble",
                    value: "bubble"
                }, {
                    text: "Scatter",
                    value: "scatter"
                },{
                    text: "Radar",
                    value: "radar"
                }]
           },
    		init: function(node) {
    			return JSON.parse(node.dataset.chart).type;
    		},
           onChange: function(node, value, input, component) {
    		   component.config.type = value;
    		   component.drawChart();
    		   
    		   return node;
    		}
    	 }]
    });
});
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

define('skylark-codemirror/mode/xml/xml',["../../CodeMirror"], function(CodeMirror) {


var htmlConfig = {
  autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
                    'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
                    'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
                    'track': true, 'wbr': true, 'menuitem': true},
  implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
                     'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
                     'th': true, 'tr': true},
  contextGrabbers: {
    'dd': {'dd': true, 'dt': true},
    'dt': {'dd': true, 'dt': true},
    'li': {'li': true},
    'option': {'option': true, 'optgroup': true},
    'optgroup': {'optgroup': true},
    'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
          'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
          'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
          'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
          'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
    'rp': {'rp': true, 'rt': true},
    'rt': {'rp': true, 'rt': true},
    'tbody': {'tbody': true, 'tfoot': true},
    'td': {'td': true, 'th': true},
    'tfoot': {'tbody': true},
    'th': {'td': true, 'th': true},
    'thead': {'tbody': true, 'tfoot': true},
    'tr': {'tr': true}
  },
  doNotIndent: {"pre": true},
  allowUnquoted: true,
  allowMissing: true,
  caseFold: true
}

var xmlConfig = {
  autoSelfClosers: {},
  implicitlyClosed: {},
  contextGrabbers: {},
  doNotIndent: {},
  allowUnquoted: false,
  allowMissing: false,
  allowMissingTagName: false,
  caseFold: false
}

CodeMirror.defineMode("xml", function(editorConf, config_) {
  var indentUnit = editorConf.indentUnit
  var config = {}
  var defaults = config_.htmlMode ? htmlConfig : xmlConfig
  for (var prop in defaults) config[prop] = defaults[prop]
  for (var prop in config_) config[prop] = config_[prop]

  // Return variables for tokenizers
  var type, setStyle;

  function inText(stream, state) {
    function chain(parser) {
      state.tokenize = parser;
      return parser(stream, state);
    }

    var ch = stream.next();
    if (ch == "<") {
      if (stream.eat("!")) {
        if (stream.eat("[")) {
          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
          else return null;
        } else if (stream.match("--")) {
          return chain(inBlock("comment", "-->"));
        } else if (stream.match("DOCTYPE", true, true)) {
          stream.eatWhile(/[\w\._\-]/);
          return chain(doctype(1));
        } else {
          return null;
        }
      } else if (stream.eat("?")) {
        stream.eatWhile(/[\w\._\-]/);
        state.tokenize = inBlock("meta", "?>");
        return "meta";
      } else {
        type = stream.eat("/") ? "closeTag" : "openTag";
        state.tokenize = inTag;
        return "tag bracket";
      }
    } else if (ch == "&") {
      var ok;
      if (stream.eat("#")) {
        if (stream.eat("x")) {
          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
        } else {
          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
        }
      } else {
        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
      }
      return ok ? "atom" : "error";
    } else {
      stream.eatWhile(/[^&<]/);
      return null;
    }
  }
  inText.isInText = true;

  function inTag(stream, state) {
    var ch = stream.next();
    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
      state.tokenize = inText;
      type = ch == ">" ? "endTag" : "selfcloseTag";
      return "tag bracket";
    } else if (ch == "=") {
      type = "equals";
      return null;
    } else if (ch == "<") {
      state.tokenize = inText;
      state.state = baseState;
      state.tagName = state.tagStart = null;
      var next = state.tokenize(stream, state);
      return next ? next + " tag error" : "tag error";
    } else if (/[\'\"]/.test(ch)) {
      state.tokenize = inAttribute(ch);
      state.stringStartCol = stream.column();
      return state.tokenize(stream, state);
    } else {
      stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
      return "word";
    }
  }

  function inAttribute(quote) {
    var closure = function(stream, state) {
      while (!stream.eol()) {
        if (stream.next() == quote) {
          state.tokenize = inTag;
          break;
        }
      }
      return "string";
    };
    closure.isInAttribute = true;
    return closure;
  }

  function inBlock(style, terminator) {
    return function(stream, state) {
      while (!stream.eol()) {
        if (stream.match(terminator)) {
          state.tokenize = inText;
          break;
        }
        stream.next();
      }
      return style;
    }
  }

  function doctype(depth) {
    return function(stream, state) {
      var ch;
      while ((ch = stream.next()) != null) {
        if (ch == "<") {
          state.tokenize = doctype(depth + 1);
          return state.tokenize(stream, state);
        } else if (ch == ">") {
          if (depth == 1) {
            state.tokenize = inText;
            break;
          } else {
            state.tokenize = doctype(depth - 1);
            return state.tokenize(stream, state);
          }
        }
      }
      return "meta";
    };
  }

  function Context(state, tagName, startOfLine) {
    this.prev = state.context;
    this.tagName = tagName;
    this.indent = state.indented;
    this.startOfLine = startOfLine;
    if (config.doNotIndent.hasOwnProperty(tagName) || (state.context && state.context.noIndent))
      this.noIndent = true;
  }
  function popContext(state) {
    if (state.context) state.context = state.context.prev;
  }
  function maybePopContext(state, nextTagName) {
    var parentTagName;
    while (true) {
      if (!state.context) {
        return;
      }
      parentTagName = state.context.tagName;
      if (!config.contextGrabbers.hasOwnProperty(parentTagName) ||
          !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
        return;
      }
      popContext(state);
    }
  }

  function baseState(type, stream, state) {
    if (type == "openTag") {
      state.tagStart = stream.column();
      return tagNameState;
    } else if (type == "closeTag") {
      return closeTagNameState;
    } else {
      return baseState;
    }
  }
  function tagNameState(type, stream, state) {
    if (type == "word") {
      state.tagName = stream.current();
      setStyle = "tag";
      return attrState;
    } else if (config.allowMissingTagName && type == "endTag") {
      setStyle = "tag bracket";
      return attrState(type, stream, state);
    } else {
      setStyle = "error";
      return tagNameState;
    }
  }
  function closeTagNameState(type, stream, state) {
    if (type == "word") {
      var tagName = stream.current();
      if (state.context && state.context.tagName != tagName &&
          config.implicitlyClosed.hasOwnProperty(state.context.tagName))
        popContext(state);
      if ((state.context && state.context.tagName == tagName) || config.matchClosing === false) {
        setStyle = "tag";
        return closeState;
      } else {
        setStyle = "tag error";
        return closeStateErr;
      }
    } else if (config.allowMissingTagName && type == "endTag") {
      setStyle = "tag bracket";
      return closeState(type, stream, state);
    } else {
      setStyle = "error";
      return closeStateErr;
    }
  }

  function closeState(type, _stream, state) {
    if (type != "endTag") {
      setStyle = "error";
      return closeState;
    }
    popContext(state);
    return baseState;
  }
  function closeStateErr(type, stream, state) {
    setStyle = "error";
    return closeState(type, stream, state);
  }

  function attrState(type, _stream, state) {
    if (type == "word") {
      setStyle = "attribute";
      return attrEqState;
    } else if (type == "endTag" || type == "selfcloseTag") {
      var tagName = state.tagName, tagStart = state.tagStart;
      state.tagName = state.tagStart = null;
      if (type == "selfcloseTag" ||
          config.autoSelfClosers.hasOwnProperty(tagName)) {
        maybePopContext(state, tagName);
      } else {
        maybePopContext(state, tagName);
        state.context = new Context(state, tagName, tagStart == state.indented);
      }
      return baseState;
    }
    setStyle = "error";
    return attrState;
  }
  function attrEqState(type, stream, state) {
    if (type == "equals") return attrValueState;
    if (!config.allowMissing) setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrValueState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    if (type == "word" && config.allowUnquoted) {setStyle = "string"; return attrState;}
    setStyle = "error";
    return attrState(type, stream, state);
  }
  function attrContinuedState(type, stream, state) {
    if (type == "string") return attrContinuedState;
    return attrState(type, stream, state);
  }

  return {
    startState: function(baseIndent) {
      var state = {tokenize: inText,
                   state: baseState,
                   indented: baseIndent || 0,
                   tagName: null, tagStart: null,
                   context: null}
      if (baseIndent != null) state.baseIndent = baseIndent
      return state
    },

    token: function(stream, state) {
      if (!state.tagName && stream.sol())
        state.indented = stream.indentation();

      if (stream.eatSpace()) return null;
      type = null;
      var style = state.tokenize(stream, state);
      if ((style || type) && style != "comment") {
        setStyle = null;
        state.state = state.state(type || style, stream, state);
        if (setStyle)
          style = setStyle == "error" ? style + " error" : setStyle;
      }
      return style;
    },

    indent: function(state, textAfter, fullLine) {
      var context = state.context;
      // Indent multi-line strings (e.g. css).
      if (state.tokenize.isInAttribute) {
        if (state.tagStart == state.indented)
          return state.stringStartCol + 1;
        else
          return state.indented + indentUnit;
      }
      if (context && context.noIndent) return CodeMirror.Pass;
      if (state.tokenize != inTag && state.tokenize != inText)
        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
      // Indent the starts of attribute names.
      if (state.tagName) {
        if (config.multilineTagIndentPastTag !== false)
          return state.tagStart + state.tagName.length + 2;
        else
          return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
      }
      if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
      var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
      if (tagAfter && tagAfter[1]) { // Closing tag spotted
        while (context) {
          if (context.tagName == tagAfter[2]) {
            context = context.prev;
            break;
          } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
            context = context.prev;
          } else {
            break;
          }
        }
      } else if (tagAfter) { // Opening tag spotted
        while (context) {
          var grabbers = config.contextGrabbers[context.tagName];
          if (grabbers && grabbers.hasOwnProperty(tagAfter[2]))
            context = context.prev;
          else
            break;
        }
      }
      while (context && context.prev && !context.startOfLine)
        context = context.prev;
      if (context) return context.indent + indentUnit;
      else return state.baseIndent || 0;
    },

    electricInput: /<\/[\s\w:]+>$/,
    blockCommentStart: "<!--",
    blockCommentEnd: "-->",

    configuration: config.htmlMode ? "html" : "xml",
    helperType: config.htmlMode ? "html" : "xml",

    skipAttribute: function(state) {
      if (state.state == attrValueState)
        state.state = attrState
    }
  };
});

CodeMirror.defineMIME("text/xml", "xml");
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});

});

define('skylark-vvveb/plugins/codemirror',[
	"../Vvveb",
	"skylark-codemirror/CodeMirror",
	"skylark-codemirror/mode/xml/xml"
],function(Vvveb,CodeMirror){
	return Vvveb.CodeEditor = {
		
		isActive: false,
		oldValue: '',
		doc:false,
		codemirror:false,
		
		init: function(doc) {

			if (this.codemirror == false)		
			{
				this.codemirror = CodeMirror.fromTextArea(document.querySelector("#vvveb-code-editor textarea"), {
					mode: 'text/html',
					lineNumbers: true,
					autofocus: true,
					lineWrapping: true,
					//viewportMargin:Infinity,
					theme: 'material'
				});
				
				this.isActive = true;
				this.codemirror.getDoc().on("change", function (e, v) { 
					if (v.origin != "setValue")
					Vvveb.delay(Vvveb.Builder.setHtml(e.getValue()), 1000);
				});
			}
			
			
			//_self = this;
			Vvveb.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore", function (e) { Vvveb.CodeEditor.setValue(e);});
			//load code when a new url is loaded
			Vvveb.Builder.documentFrame.on("load", function (e) { Vvveb.CodeEditor.setValue();});

			this.isActive = true;
			this.setValue();

			return this.codemirror;
		},

		setValue: function(value) {
			if (this.isActive == true)
			{
				var scrollInfo = this.codemirror.getScrollInfo();
				this.codemirror.setValue(Vvveb.Builder.getHtml());
				this.codemirror.scrollTo(scrollInfo.left, scrollInfo.top);
			}
		},

		destroy: function(element) {
			/*
			//save memory by destroying but lose scroll on editor toggle
			this.codemirror.toTextArea();
			this.codemirror = false;
			*/ 
			this.isActive = false;
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


define('skylark-vvveb/plugins/google-fonts',[
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

 define('skylark-vvveb/plugins/jszip',[
    "skylark-jquery",
    "../Vvveb",
    "../Gui"
],function($,Vvveb,Gui){
   return Gui.download = function () {

        function isLocalUrl(url)
        {
            return url.indexOf("//") == -1;
        }

        function addUrl(url)
        {
            if (isLocalUrl(url)) assets.push(url);
        }


        var html = Vvveb.Builder.frameHtml;
        var assets = [];

        //stylesheets
        $("link[href$='.css']", html).each(function(i, e) {
            addUrl(e.getAttribute("href"));
        });

        //javascript
        $("script[src$='.js']", html).each(function(i, e) {
            addUrl(e.getAttribute("src"));
        });
        
        //images
        $("img[src]", html).each(function(i, e) {
            addUrl(e.getAttribute("src"));
        });

        console.dir(assets);
        return;

        var zip = new JSZip();
        zip.file("Hello.txt", "Hello World\n");
        var img = zip.folder("images");
        img.file("smile.gif", imgData, {base64: true});
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "template.zip");
        });
    };
    /*

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


    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    var img = zip.folder("images");
    img.file("smile.gif", imgData, {base64: true});
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
    });
*/
});
define('skylark-vvveb/main',[
	"./Vvveb",
	"./BlocksGroup",
	"./Blocks",
	"./Builder",
	"./CodeEditor",
	"./ComponentsGroup",
	"./Components",
	"./ContentManager",
	"./FileManager",
	"./StyleManager",
	"./Gui",
	"./inputs",
	"./tmpl",
	"./Undo",
	"./WysiwygEditor",
	"./blocks/bootstrap4",
	"./components/bootstrap4",
	"./components/server",
	"./components/widgets",
	"./plugins/codemirror",
	"./plugins/google-fonts",
	"./plugins/jszip"
],function(Vvveb){
	return Vvveb;
});
define('skylark-vvveb', ['skylark-vvveb/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-vvveb.js.map
