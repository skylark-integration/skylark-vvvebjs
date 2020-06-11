/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","../inputs","./Input","./tmpl"],function(n,t,e,i,r){var s=i.inherit({rgb2hex:function(n){if(n)return(n=n.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===n.length?"#"+("0"+parseInt(n[1],10).toString(16)).slice(-2)+("0"+parseInt(n[2],10).toString(16)).slice(-2)+("0"+parseInt(n[3],10).toString(16)).slice(-2):n},events:[["change","onChange","input"]],setValue:function(n){t("input",this.element).val(this.rgb2hex(n))},init:function(n){return this.render("colorinput",n)}});return e.ColorInput=s});
//# sourceMappingURL=../sourcemaps/widgets/ColorInput.js.map
