/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(n,e,t,i,r){var l=i.inherit({events:[["change","onChange","select"],["click","onChange","button"]],setValue:function(n){e("select",this.element).val(n)},init:function(n){return this.render("grid",n)}});return t.GridInput=l});
//# sourceMappingURL=../sourcemaps/widgets/GridInput.js.map
