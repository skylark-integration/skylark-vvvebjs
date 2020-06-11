/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(n,e,t,i,a){var r=i.inherit({onChange:function(n,e){n.data&&n.data.element&&n.data.element.trigger("propertyChange",[this.checked,this])},events:[["change","onChange","input"]],init:function(n){return this.render("checkboxinput",n)}});return t.CheckboxInput=r});
//# sourceMappingURL=../sourcemaps/widgets/CheckboxInput.js.map
