/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
!function(r,n){var t=n.define,e=n.require,i="function"==typeof t&&t.amd,s=!i&&"undefined"!=typeof exports;if(!i&&!t){var o={};t=n.define=function(r,n,t){"function"==typeof t?(o[r]={factory:t,deps:n.map(function(n){return function(r,n){if("."!==r[0])return r;var t=n.split("/"),e=r.split("/");t.pop();for(var i=0;i<e.length;i++)"."!=e[i]&&(".."==e[i]?t.pop():t.push(e[i]));return t.join("/")}(n,r)}),resolved:!1,exports:null},e(r)):o[r]={factory:null,resolved:!0,exports:t}},e=n.require=function(r){if(!o.hasOwnProperty(r))throw new Error("Module "+r+" has not been defined");var t=o[r];if(!t.resolved){var i=[];t.deps.forEach(function(r){i.push(e(r))}),t.exports=t.factory.apply(n,i)||null,t.resolved=!0}return t.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(r,n){r("skylark-widgets-inputs/inputs",["skylark-langx/skylark"],function(r){return r.attach("widgets.inputs",{})}),r("skylark-widgets-inputs/main",["./inputs"],function(){return inputs}),r("skylark-widgets-inputs",["skylark-widgets-inputs/main"],function(r){return r})}(t),!i){var u=e("skylark-langx/skylark");s?module.exports=u:n.skylarkjs=u}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-widgets-inputs.js.map
