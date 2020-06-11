/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(e,n,t,l,i){var r=l.inherit({events:[["change","onChange","select"]],setValue:function(e){n("select",this.element).val(e)},init:function(e){return this.render("select",e)}});return t.SelectInput=r});
//# sourceMappingURL=../sourcemaps/widgets/SelectInput.js.map
