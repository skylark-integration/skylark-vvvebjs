/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./tmpl"],function(e,t,n,i){var s=e.Evented.inherit({init:function(e){},onChange:function(e,t){e.data&&e.data.element&&e.data.element.trigger("propertyChange",[this.value,this])},renderTemplate:function(e,t){return i("visualizer-input-"+e,t)},setValue:function(e){t("input",this.element).val(e)},render:function(e,n){if(this.element=t(this.renderTemplate(e,n)),this.events)for(var i in this.events){var s=this.events[i][0],r=this[this.events[i][1]],a=this.events[i][2];this.element.on(s,a,{element:this.element,input:this},r)}return this.element}});return n.Input=s});
//# sourceMappingURL=../sourcemaps/widgets/Input.js.map
