/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-utils-dom/query","./Vvveb"],function(e,t){return t.CodeEditor={isActive:!1,oldValue:"",doc:!1,init:function(i){e("#vvveb-code-editor textarea").val(t.Builder.getHtml()),e("#vvveb-code-editor textarea").keyup(function(){t.delay(t.Builder.setHtml(this.value),1e3)}),t.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore",function(e){t.CodeEditor.setValue()}),t.Builder.documentFrame.on("load",function(e){t.CodeEditor.setValue()}),this.isActive=!0},setValue:function(i){this.isActive&&e("#vvveb-code-editor textarea").val(t.Builder.getHtml())},destroy:function(e){},toggle:function(){if(1!=this.isActive)return this.isActive=!0,this.init();this.isActive=!1,this.destroy()}}});
//# sourceMappingURL=sourcemaps/CodeEditor.js.map
