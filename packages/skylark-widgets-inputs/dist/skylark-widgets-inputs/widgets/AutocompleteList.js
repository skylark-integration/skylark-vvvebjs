/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(t,e,n,i,a){var u=i.inherit({events:[["autocompletelist.change","onAutocompleteChange","input"]],onAutocompleteChange:function(t,e,n){t.data&&t.data.element&&t.data.element.trigger("propertyChange",[e,this])},setValue:function(t){e("input",this.element).data("autocompleteList").setValue(t)},init:function(t){return this.element=this.render("textinput",t),e("input",this.element).autocompleteList(t),this.element}});return n.AutocompleteList=u});
//# sourceMappingURL=../sourcemaps/widgets/AutocompleteList.js.map
