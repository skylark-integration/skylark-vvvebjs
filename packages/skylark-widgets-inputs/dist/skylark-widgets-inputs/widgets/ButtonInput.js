/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(n,t,e,u,i){var r=u.inherit({events:[["click","onChange","button"]],setValue:function(n){t("button",this.element).val(n)},init:function(n){return this.render("button",n)}});return e.ButtonInput=r});
//# sourceMappingURL=../sourcemaps/widgets/ButtonInput.js.map
