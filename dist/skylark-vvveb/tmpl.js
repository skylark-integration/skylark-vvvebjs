/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["./Vvveb"],function(n){var t={};return n.tmpl=function n(e,p){var r=/^[-a-zA-Z0-9]+$/.test(e)?t[e]=t[e]||n(document.getElementById(e).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("{%").join("\t").replace(/((^|%})[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%}/g,"',$1,'").split("\t").join("');").split("%}").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");return p?r(p):r}});
//# sourceMappingURL=sourcemaps/tmpl.js.map
