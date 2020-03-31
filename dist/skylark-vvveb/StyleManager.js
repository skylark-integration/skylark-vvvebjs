/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-jquery","./Vvveb"],function(e,t){return t.StyleManager={setStyle:function(e,t,l){return e.css(t,l)},_getCssStyle:function(e,t){var l="",u=e.get(0);if(u.style&&u.style.length>0&&u.style[t])l=u.style[t];else if(u.currentStyle)l=u.currentStyle[t];else if(window.getComputedStyle)l=document.defaultView.getDefaultComputedStyle?document.defaultView.getDefaultComputedStyle(u,null).getPropertyValue(t):window.getComputedStyle(u,null).getPropertyValue(t);return l},getStyle:function(e,t){return this._getCssStyle(e,t)}}});
//# sourceMappingURL=sourcemaps/StyleManager.js.map
