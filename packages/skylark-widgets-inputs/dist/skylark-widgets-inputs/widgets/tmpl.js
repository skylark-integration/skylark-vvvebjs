/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
define([],function(){var n={};return function t(e,p){var r=/^[-a-zA-Z0-9]+$/.test(e)?n[e]=n[e]||t(document.getElementById(e).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("{%").join("\t").replace(/((^|%})[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%}/g,"',$1,'").split("\t").join("');").split("%}").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");return p?r(p):r}});
//# sourceMappingURL=../sourcemaps/widgets/tmpl.js.map
