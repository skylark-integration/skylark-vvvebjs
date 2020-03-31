/**
 * skylark-vvveb - A version of Vvveb.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-vvveb/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-bootstrap3"],function(e){var t,l={};l.delay=(t=0,function(e,l){clearTimeout(t),t=setTimeout(e,l)}),l.getStyle=function(e,t){if(l="",e.style&&e.style.length>0&&e.style[t])var l=e.style[t];else if(e.currentStyle)l=e.currentStyle[t];else if(window.getComputedStyle)l=document.defaultView.getDefaultComputedStyle?document.defaultView.getDefaultComputedStyle(e,null).getPropertyValue(t):window.getComputedStyle(e,null).getPropertyValue(t);return l},l.isElement=function(e){return"object"==typeof e&&1===e.nodeType&&"object"==typeof e.style&&"object"==typeof e.ownerDocument},l.isIE11=!!window.MSInputMethodContext&&!!document.documentMode;return l.defaultComponent="_base",l.preservePropertySections=!0,l.dragIcon="icon",l.baseUrl=document.currentScript?document.currentScript.src.replace(/[^\/]*?\.js$/,""):"",l.launchFullScreen=function(e){e.documentElement.requestFullScreen?e.FullScreenElement?e.exitFullScreen():e.documentElement.requestFullScreen():e.documentElement.mozRequestFullScreen?e.mozFullScreenElement?e.mozCancelFullScreen():e.documentElement.mozRequestFullScreen():e.documentElement.webkitRequestFullScreen?e.webkitFullscreenElement?e.webkitExitFullscreen():e.documentElement.webkitRequestFullScreen():e.documentElement.msRequestFullscreen&&(e.msFullScreenElement?e.msExitFullscreen():e.documentElement.msRequestFullscreen())},e.attach("intg.Vvveb",l)});
//# sourceMappingURL=sourcemaps/Vvveb.js.map
