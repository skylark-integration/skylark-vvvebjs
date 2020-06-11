/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(t,e,n,i,u){var a=i.inherit({events:[["autocomplete.change","onAutocompleteChange","input"]],onAutocompleteChange:function(t,e,n){t.data&&t.data.element&&t.data.element.trigger("propertyChange",[e,this])},init:function(t){return this.element=this.render("textinput",t),e("input",this.element).autocomplete(t.url),this.element}});return n.AutocompleteInput=a});
//# sourceMappingURL=../sourcemaps/widgets/AutocompleteInput.js.map
