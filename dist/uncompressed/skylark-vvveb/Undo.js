define([
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
