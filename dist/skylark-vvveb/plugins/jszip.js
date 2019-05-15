/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-utils-dom/query","../Vvveb","../Gui"],function(t,e,n){return n.download=function(){function n(t){(function(t){return-1==t.indexOf("//")})(t)&&i.push(t)}var r=e.Builder.frameHtml,i=[];t("link[href$='.css']",r).each(function(t,e){n(e.getAttribute("href"))}),t("script[src$='.js']",r).each(function(t,e){n(e.getAttribute("src"))}),t("img[src]",r).each(function(t,e){n(e.getAttribute("src"))}),console.dir(i)}});
//# sourceMappingURL=../sourcemaps/plugins/jszip.js.map
