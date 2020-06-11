/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./RadioInput","./tmpl"],function(t,e,n,i,r){var u=i.inherit({setValue:function(t){e("input",this.element).removeAttr("checked"),e("btn",this.element).removeClass("active"),t&&""!=t&&e("input[value="+t+"]",this.element).attr("checked","true").prop("checked",!0).parent().button("toggle")},init:function(t){return this.render("radiobuttoninput",t)}});return n.RadioButtonInput=u});
//# sourceMappingURL=../sourcemaps/widgets/RadioButtonInput.js.map
