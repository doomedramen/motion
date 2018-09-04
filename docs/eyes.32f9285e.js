// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({8:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Eyes = function () {
    function Eyes() {
        _classCallCheck(this, Eyes);

        var self = this;

        var container = $('#content')[0];

        Two.Resolution = 24;

        var eye1 = new Two({
            width: 400,
            height: 400
        }).appendTo(container);
        var eye2 = new Two({
            width: 400,
            height: 400
        }).appendTo(container);

        // const test = new Two({
        //     width: 400,
        //     height: 400,
        // }).appendTo(container);

        var fixedEyeColor = self.getRandomColor();
        self.eyes = [makeEye(eye1, fixedEyeColor), makeEye(eye2, fixedEyeColor)];

        self.eyes[0].domElement = eye1.renderer.domElement;
        self.eyes[1].domElement = eye2.renderer.domElement;

        var releaseEyes = _.debounce(function () {
            _.each(self.eyes, function (eye) {
                eye.parts.ball.destination.clear();
            });
        }, 1000);

        var $window = $(window).bind('mousemove', mousemove).bind('touchmove', function (e) {
            var touch = e.originalEvent.changedTouches[0];
            mousemove({
                clientX: touch.pageX,
                clientY: touch.pageY
            });
            return false;
        });

        eye1.bind('update', function () {
            var eye = self.eyes[0];
            eye.parts.ball.translation.x += (eye.parts.ball.destination.x - eye.parts.ball.translation.x) * 0.0625;
            eye.parts.ball.translation.y += (eye.parts.ball.destination.y - eye.parts.ball.translation.y) * 0.0625;
        }).play();
        eye2.bind('update', function () {
            var eye = self.eyes[1];
            eye.parts.ball.translation.x += (eye.parts.ball.destination.x - eye.parts.ball.translation.x) * 0.0625;
            eye.parts.ball.translation.y += (eye.parts.ball.destination.y - eye.parts.ball.translation.y) * 0.0625;
        }).play();

        function mousemove(e) {

            var mouse = new Two.Vector(e.clientX, e.clientY);
            _.each(self.eyes, function (eye) {
                var rect = eye.domElement.getBoundingClientRect();
                var center = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
                var theta = Math.atan2(mouse.y - center.y, mouse.x - center.x);
                var distance = mouse.distanceTo(center);
                var pct = distance / $window.width();
                var radius = 75 * pct;
                eye.parts.ball.destination.set(radius * Math.cos(theta), radius * Math.sin(theta));
            });

            releaseEyes();
        }

        function makeEye(two, color) {

            var self = this;

            var background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
            background.noStroke();
            // background.fill = 'rgb(255, 255, 175)';
            background.name = 'background';

            var eyeMask = two.makeGroup(background);

            var ball = two.makeGroup();
            var eye = two.makeGroup();

            var retina = two.makeCircle(0, 0, two.height / 4);
            retina.fill = color || self.getRandomColor();
            retina.noStroke();

            var pupil = two.makeCircle(0, 0, two.height / 6);
            pupil.fill = '#333';
            pupil.linewidth = 10;
            pupil.noStroke();
            var reflection = two.makeCircle(two.height / 12, -two.height / 12, two.height / 12);
            reflection.fill = 'rgba(255, 255, 255, 0.9)';
            reflection.noStroke();

            var lid = two.makeEllipse(0, 0, two.height / 3, two.height / 4);
            lid.stroke = '#333';
            lid.linewidth = 15;
            lid.noFill();

            ball.add(retina, pupil, reflection);
            ball.destination = new Two.Vector();

            eye.add(ball, lid);
            eye.translation.set(two.width / 2, two.height / 2);

            var mask = two.makeEllipse(two.width / 2, two.height / 2, two.height / 3, two.height / 4);
            eye.parts = {
                mask: mask,
                ball: ball,
                lid: lid,
                pupil: pupil,
                retina: retina
            };

            eyeMask.add(eye);

            eyeMask.mask = mask;
            return eye;
        }
    }

    _createClass(Eyes, [{
        key: 'getRandomColor',
        value: function getRandomColor() {
            return 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + 0.66 + ')';
        }
    }, {
        key: 'blink',
        value: function blink() {

            this.eyes.map(function (eye) {

                var startHeight = eye.parts.lid.height;
                var speed = 100;

                createjs.Tween.get(eye.parts.lid).to({ height: 0 }, speed).to({ height: startHeight }, speed);

                createjs.Tween.get(eye.parts.mask).to({ height: 0 }, speed).to({ height: startHeight }, speed);
            });
        }

        /**
         * Change eye colors
         * @param color1
         * @param color2 (optional)
         */

    }, {
        key: 'changeColors',
        value: function changeColors(color1, color2) {

            this.eyes[0].parts.retina.fill = color1;
            this.eyes[1].parts.retina.fill = color2 || color1;
        }
    }]);

    return Eyes;
}();

window.Eyes = Eyes;
},{}],20:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '56675' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[20,8], null)
//# sourceMappingURL=/eyes.32f9285e.map