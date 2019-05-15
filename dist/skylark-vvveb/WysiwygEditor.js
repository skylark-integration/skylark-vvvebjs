/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-utils-dom/query","./Vvveb","./Undo"],function(e,n){return n.WysiwygEditor={isActive:!1,oldValue:"",doc:!1,init:function(n){this.doc=n,e("#bold-btn").on("click",function(e){return n.execCommand("bold",!1,null),e.preventDefault(),!1}),e("#italic-btn").on("click",function(e){return n.execCommand("italic",!1,null),e.preventDefault(),!1}),e("#underline-btn").on("click",function(e){return n.execCommand("underline",!1,null),e.preventDefault(),!1}),e("#strike-btn").on("click",function(e){return n.execCommand("strikeThrough",!1,null),e.preventDefault(),!1}),e("#link-btn").on("click",function(e){return n.execCommand("createLink",!1,"#"),e.preventDefault(),!1})},undo:function(e){this.doc.execCommand("undo",!1,null)},redo:function(e){this.doc.execCommand("redo",!1,null)},edit:function(n){n.attr({contenteditable:!0,spellcheckker:!1}),e("#wysiwyg-editor").show(),this.element=n,this.isActive=!0,this.oldValue=n.html()},destroy:function(t){t.removeAttr("contenteditable spellcheckker"),e("#wysiwyg-editor").hide(),this.isActive=!1,node=this.element.get(0),n.Undo.addMutation({type:"characterData",target:node,oldValue:this.oldValue,newValue:node.innerHTML})}}});
//# sourceMappingURL=sourcemaps/WysiwygEditor.js.map
