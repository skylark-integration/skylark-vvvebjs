/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(e,t,n,i,a){var r=i.inherit({onChange:function(e,t){e.data&&e.data.element&&e.data.element.trigger("propertyChange",[this.value,this])},events:[["change","onChange","input"]],setValue:function(e){t("input",this.element).removeAttr("checked"),e&&t("input[value="+e+"]",this.element).attr("checked","true").prop("checked",!0)},init:function(e){return this.render("radioinput",e)}});return n.RadioInput=r});
//# sourceMappingURL=../sourcemaps/widgets/RadioInput.js.map
