/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-utils-dom/query","./Vvveb","./tmpl"],function(e,t,a){return t.FileManager={tree:!1,pages:{},currentPage:!1,init:function(){this.tree=e("#filemanager .tree > ol").html(""),e(this.tree).on("click","a",function(e){return e.preventDefault(),!1}),e(this.tree).on("click","li[data-page] label",function(a){var n=e(this.parentNode).data("page");return n&&t.FileManager.loadPage(n),!1}),e(this.tree).on("click","li[data-component] label ",function(a){node=e(a.currentTarget.parentNode).data("node"),t.Builder.frameHtml.animate({scrollTop:e(node).offset().top},1e3),t.Builder.selectNode(node),t.Builder.loadNodeComponent(node)}).on("mouseenter","li[data-component] label",function(t){node=e(t.currentTarget).data("node"),e(node).trigger("mousemove")})},addPage:function(e,t,n){this.pages[e]={title:t,url:n},this.tree.append(a("vvveb-filemanager-page",{name:e,title:t,url:n}))},addPages:function(e){for(page in e)this.addPage(e[page].name,e[page].title,e[page].url)},addComponent:function(t,n,i,r){e("[data-page='"+r+"'] > ol",this.tree).append(a("vvveb-filemanager-component",{name:t,url:n,title:i}))},getComponents:function(){var e=[];return function e(a,n){if(a.hasChildNodes())for(var i=0;i<a.childNodes.length;i++)child=a.childNodes[i],child&&void 0!=child.attributes&&(matchChild=t.Components.matchNode(child))?(element={name:matchChild.name,image:matchChild.image,type:matchChild.type,node:child,children:[]},element.children=[],n.push(element),element=e(child,element.children)):element=e(child,n);return!1}(window.FrameDocument.body,e),e},loadComponents:function(){tree=this.getComponents(),html=function t(a){var n=e("<ol></ol>");j++;for(i in a){var r=a[i];if(a[i].children.length>0){var l=e('<li data-component="'+r.name+'">\t\t\t\t\t\t<label for="id'+j+'" style="background-image:url(libs/builder/'+r.image+')"><span>'+r.name+'</span></label>\t\t\t\t\t\t<input type="checkbox" id="id'+j+'">\t\t\t\t\t\t</li>');l.data("node",r.node),l.append(t(r.children)),n.append(l)}else{var l=e('<li data-component="'+r.name+'" class="file">\t\t\t\t\t\t\t\t<label for="id'+j+'" style="background-image:url(libs/builder/'+r.image+')"><span>'+r.name+'</span></label>\t\t\t\t\t\t\t\t<input type="checkbox" id="id'+j+'"></li>');l.data("node",r.node),n.append(l)}}return n}(tree),e("[data-page='"+this.currentPage+"'] > ol",this.tree).replaceWith(html)},getCurrentUrl:function(){if(this.currentPage)return this.pages[this.currentPage].url},reloadCurrentPage:function(){if(this.currentPage)return this.loadPage(this.currentPage)},loadPage:function(a,n=!0){e("[data-page]",this.tree).removeClass("active"),e("[data-page='"+a+"']",this.tree).addClass("active"),this.currentPage=a;var i=this.pages[a].url;t.Builder.loadUrl(i+(n?(i.indexOf("?")>-1?"&":"?")+Math.random():""),function(){t.FileManager.loadComponents()})},scrollBottom:function(){var e=this.tree.parent();e.scrollTop(e.prop("scrollHeight"))}}});
//# sourceMappingURL=sourcemaps/FileManager.js.map
