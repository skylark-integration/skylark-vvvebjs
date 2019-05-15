/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-utils-dom/query","../Gui"],function(t,e){return e.download=function(){function e(t){(function(t){return-1==t.indexOf("//")})(t)&&r.push(t)}var n=Vvveb.Builder.frameHtml,r=[];t("link[href$='.css']",n).each(function(t,n){e(n.getAttribute("href"))}),t("script[src$='.js']",n).each(function(t,n){e(n.getAttribute("src"))}),t("img[src]",n).each(function(t,n){e(n.getAttribute("src"))}),console.dir(r)}});
//# sourceMappingURL=../sourcemaps/plugins/jszip.js.map
