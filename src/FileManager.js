define([
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
