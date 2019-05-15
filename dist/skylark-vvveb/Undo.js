/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["./Vvveb"],function(e){return e.Undo={undos:[],mutations:[],undoIndex:-1,enabled:!0,addMutation:function(d){e.Builder.frameBody.trigger("vvveb.undo.add"),this.mutations.splice(++this.undoIndex,0,d)},restore:function(d,t){switch(d.type){case"childList":if(1==t?(addedNodes=d.removedNodes,removedNodes=d.addedNodes):(addedNodes=d.addedNodes,removedNodes=d.removedNodes),addedNodes)for(i in addedNodes)node=addedNodes[i],d.nextSibling?d.nextSibling.parentNode.insertBefore(node,d.nextSibling):d.target.append(node);if(removedNodes)for(i in removedNodes)node=removedNodes[i],node.parentNode.removeChild(node);break;case"move":1==t?(parent=d.oldParent,sibling=d.oldNextSibling):(parent=d.newParent,sibling=d.newNextSibling),sibling?sibling.parentNode.insertBefore(d.target,sibling):parent.append(node);break;case"characterData":d.target.innerHTML=t?d.oldValue:d.newValue;break;case"attributes":value=t?d.oldValue:d.newValue,value||!1===value||0===value?d.target.setAttribute(d.attributeName,value):d.target.removeAttribute(d.attributeName)}e.Builder.frameBody.trigger("vvveb.undo.restore")},undo:function(){this.undoIndex>=0&&this.restore(this.mutations[this.undoIndex--],!0)},redo:function(){this.undoIndex<this.mutations.length-1&&this.restore(this.mutations[++this.undoIndex],!1)},hasChanges:function(){return this.mutations.length}}});
//# sourceMappingURL=sourcemaps/Undo.js.map
