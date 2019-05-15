/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["../Vvveb","skylark-codemirror/CodeMirror","skylark-codemirror/mode/xml/xml"],function(e,i){return e.CodeEditor={isActive:!1,oldValue:"",doc:!1,codemirror:!1,init:function(t){return 0==this.codemirror&&(this.codemirror=i.fromTextArea(document.querySelector("#vvveb-code-editor textarea"),{mode:"text/html",lineNumbers:!0,autofocus:!0,lineWrapping:!0,theme:"material"}),this.isActive=!0,this.codemirror.getDoc().on("change",function(i,t){"setValue"!=t.origin&&delay(e.Builder.setHtml(i.getValue()),1e3)})),e.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore",function(i){e.CodeEditor.setValue(i)}),e.Builder.documentFrame.on("load",function(i){e.CodeEditor.setValue()}),this.isActive=!0,this.setValue(),this.codemirror},setValue:function(i){if(1==this.isActive){var t=this.codemirror.getScrollInfo();this.codemirror.setValue(e.Builder.getHtml()),this.codemirror.scrollTo(t.left,t.top)}},destroy:function(e){this.isActive=!1},toggle:function(){if(1!=this.isActive)return this.isActive=!0,this.init();this.isActive=!1,this.destroy()}}});
//# sourceMappingURL=../sourcemaps/plugins/codemirror.js.map
