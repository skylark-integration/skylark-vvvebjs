/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(n,t,e,u,i){var r=u.inherit({events:[["blur","onChange","input"],["click","onChange","button"]],init:function(n){return this.render("textvalue",n)}});return e.TextValueInput=r});
//# sourceMappingURL=../sourcemaps/widgets/TextValueInput.js.map
