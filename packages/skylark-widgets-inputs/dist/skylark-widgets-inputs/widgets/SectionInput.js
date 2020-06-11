/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(n,t,e,i,u){var r=i.inherit({events:[["click","onChange","button"]],setValue:function(n){return!1},init:function(n){return this.render("sectioninput",n)}});return e.SectionInput=r});
//# sourceMappingURL=../sourcemaps/widgets/SectionInput.js.map
