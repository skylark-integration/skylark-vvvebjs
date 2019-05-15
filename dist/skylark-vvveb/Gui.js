/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-utils-dom/query","./Vvveb","./Builder","./WysiwygEditor"],function(e,t){var i={init:function(){e("[data-vvveb-action]").each(function(){on="click",this.dataset.vvvebOn&&(on=this.dataset.vvvebOn),e(this).on(on,t.Gui[this.dataset.vvvebAction]),this.dataset.vvvebShortcut&&(e(document).bind("keydown",this.dataset.vvvebShortcut,t.Gui[this.dataset.vvvebAction]),e(window.FrameDocument,window.FrameWindow).bind("keydown",this.dataset.vvvebShortcut,t.Gui[this.dataset.vvvebAction]))})},undo:function(){t.WysiwygEditor.isActive?t.WysiwygEditor.undo():t.Undo.undo(),t.Builder.selectNode()},redo:function(){t.WysiwygEditor.isActive?t.WysiwygEditor.redo():t.Undo.redo(),t.Builder.selectNode()},save:function(){e("#textarea-modal textarea").val(t.Builder.getHtml()),e("#textarea-modal").modal()},saveAjax:function(){var i=t.FileManager.getCurrentUrl();return t.Builder.saveAjax(i,null,function(t){e("#message-modal").modal().find(".modal-body").html("File saved at: "+t)})},download:function(){filename=/[^\/]+$/.exec(t.Builder.iframe.src)[0],uriContent="data:application/octet-stream,"+encodeURIComponent(t.Builder.getHtml());var e=document.createElement("a");"download"in e?(e.download=filename,e.href=uriContent,e.target="_blank",document.body.appendChild(e),result=e.click(),document.body.removeChild(e),e.remove()):location.href=uriContent},viewport:function(){e("#canvas").attr("class",this.dataset.view)},toggleEditor:function(){e("#vvveb-builder").toggleClass("bottom-panel-expand"),e("#toggleEditorJsExecute").toggle(),t.CodeEditor.toggle()},toggleEditorJsExecute:function(){t.Builder.runJsOnSetHtml=this.checked},preview:function(){1==t.Builder.isPreview?t.Builder.isPreview=!1:t.Builder.isPreview=!0,e("#iframe-layer").toggle(),e("#vvveb-builder").toggleClass("preview")},fullscreen:function(){launchFullScreen(document)},componentSearch:function(){searchText=this.value,e("#left-panel .components-list li ol li").each(function(){$this=e(this),$this.hide(),$this.data("search").indexOf(searchText)>-1&&$this.show()})},clearComponentSearch:function(){e(".component-search").val("").keyup()},blockSearch:function(){searchText=this.value,e("#left-panel .blocks-list li ol li").each(function(){$this=e(this),$this.hide(),$this.data("search").indexOf(searchText)>-1&&$this.show()})},clearBlockSearch:function(){e(".block-search").val("").keyup()},addBoxComponentSearch:function(){searchText=this.value,e("#add-section-box .components-list li ol li").each(function(){$this=e(this),$this.hide(),$this.data("search").indexOf(searchText)>-1&&$this.show()})},addBoxBlockSearch:function(){searchText=this.value,e("#add-section-box .blocks-list li ol li").each(function(){$this=e(this),$this.hide(),$this.data("search").indexOf(searchText)>-1&&$this.show()})},newPage:function(){var i=e("#new-page-modal");i.modal("show").find("form").off("submit").submit(function(a){var o=e("input[name=title]",i).val(),n=e("select[name=startTemplateUrl]",i).val(),l=e("input[name=fileName]",i).val(),s=o.replace(/\W+/g,"-").toLowerCase(),r=""+(l=l.replace(/[^A-Za-z0-9\.\/]+/g,"-").toLowerCase());return t.FileManager.addPage(s,o,r),a.preventDefault(),t.Builder.saveAjax(r,n,function(e){t.FileManager.loadPage(s),t.FileManager.scrollBottom(),i.modal("hide")})})},deletePage:function(){},setDesignerMode:function(){var e="true"!=this.attributes["aria-pressed"].value;t.Builder.setDesignerMode(e)}};return t.Gui=i});
//# sourceMappingURL=sourcemaps/Gui.js.map
