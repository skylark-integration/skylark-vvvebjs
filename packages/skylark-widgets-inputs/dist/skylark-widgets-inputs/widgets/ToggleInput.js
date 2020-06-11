/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./TextInput","./tmpl"],function(t,e,n,a,i){var r=a.inherit({onChange:function(t,e){t.data&&t.data.element&&t.data.element.trigger("propertyChange",[this.checked?this.getAttribute("data-value-on"):this.getAttribute("data-value-off"),this])},events:[["change","onChange","input"]],init:function(t){return this.render("toggle",t)}});return n.ToggleInput=r});
//# sourceMappingURL=../sourcemaps/widgets/ToggleInput.js.map
