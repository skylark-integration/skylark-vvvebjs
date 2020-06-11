/**
 * skylark-widgets-inputs - The skylark input widget library
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-inputs/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-langx-ns/_attach',[],function(){
    return  function attach(obj1,path,obj2) {
        if (typeof path == "string") {
            path = path.split(".");//[path]
        };
        var length = path.length,
            ns=obj1,
            i=0,
            name = path[i++];

        while (i < length) {
            ns = ns[name] = ns[name] || {};
            name = path[i++];
        }

        return ns[name] = obj2;
    }
});
define('skylark-langx-ns/ns',[
    "./_attach"
], function(_attach) {
    var skylark = {
    	attach : function(path,obj) {
    		return _attach(skylark,path,obj);
    	}
    };
    return skylark;
});

define('skylark-langx-ns/main',[
	"./ns"
],function(skylark){
	return skylark;
});
define('skylark-langx-ns', ['skylark-langx-ns/main'], function (main) { return main; });

define('skylark-langx/skylark',[
    "skylark-langx-ns"
], function(ns) {
	return ns;
});

define('skylark-widgets-inputs/inputs',[
	"skylark-langx/skylark"
],function(skylark) {
	var inputs = {};

	return skylark.attach("widgets.inputs",inputs);

});


define('skylark-widgets-inputs/main',[
	"./inputs"
],function(){
	return inputs;
});
define('skylark-widgets-inputs', ['skylark-widgets-inputs/main'], function (main) { return main; });


},this);