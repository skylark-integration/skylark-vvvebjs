/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(n,t,e,i,l){var s=i.inherit({events:[["change","onChange","select"]],setValue:function(n){t("select",this.element).val(n)},init:function(n){return this.render("listinput",n)}});return e.ListInput=s});
//# sourceMappingURL=../sourcemaps/widgets/ListInput.js.map
