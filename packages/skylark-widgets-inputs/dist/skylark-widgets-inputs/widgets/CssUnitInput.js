/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(t,n,e,i,u){var a=i.inherit({number:0,unit:"px",events:[["change","onChange","select"],["change keyup mouseup","onChange","input"]],onChange:function(t){if(t.data&&t.data.element){input=t.data.input,""!=this.value&&(input[this.name]=this.value),""==input.unit&&(input.unit="px");var e="";"auto"==input.unit?(n(t.data.element).addClass("auto"),e=input.unit):(n(t.data.element).removeClass("auto"),e=input.number+input.unit),t.data.element.trigger("propertyChange",[e,this])}},setValue:function(t){this.number=parseInt(t),this.unit=t.replace(this.number,""),"auto"==this.unit&&n(this.element).addClass("auto"),n("input",this.element).val(this.number),n("select",this.element).val(this.unit)},init:function(t){return this.render("cssunitinput",t)}});return e.CssUnitInput=a});
//# sourceMappingURL=../sourcemaps/widgets/CssUnitInput.js.map
