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
})({13:[function(require,module,exports) {
/**
 * @license
 * TweenJS
 * Visit https://createjs.com for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
!function(t){"use strict";var e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},s=function(){function t(i){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];e(this,t),this.type=i,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=n,this.cancelable=r,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}return t.prototype.preventDefault=function(){return this.defaultPrevented=this.cancelable,this},t.prototype.stopPropagation=function(){return this.propagationStopped=!0,this},t.prototype.stopImmediatePropagation=function(){return this.immediatePropagationStopped=this.propagationStopped=!0,this},t.prototype.remove=function(){return this.removed=!0,this},t.prototype.clone=function(){var e=new t(this.type,this.bubbles,this.cancelable);for(var i in this)this.hasOwnProperty(i)&&(e[i]=this[i]);return e},t.prototype.set=function(t){for(var e in t)this[e]=t[e];return this},t.prototype.toString=function(){return"["+this.constructor.name+" (type="+this.type+")]"},t}(),a=function(){function t(){e(this,t),this._listeners=null,this._captureListeners=null}return t.initialize=function(e){var i=t.prototype;e.addEventListener=i.addEventListener,e.on=i.on,e.removeEventListener=e.off=i.removeEventListener,e.removeAllEventListeners=i.removeAllEventListeners,e.hasEventListener=i.hasEventListener,e.dispatchEvent=i.dispatchEvent,e._dispatchEvent=i._dispatchEvent,e.willTrigger=i.willTrigger},t.prototype.addEventListener=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=void 0,r=(n=i?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{})[t];return r&&(this.removeEventListener(t,e,i),r=n[t]),r?r.push(e):n[t]=[e],e},t.prototype.on=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];return e.handleEvent&&(i=i||e,e=e.handleEvent),i=i||this,this.addEventListener(t,function(t){e.call(i,t,r),n&&t.remove()},o)},t.prototype.removeEventListener=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2]?this._captureListeners:this._listeners;if(i){var n=i[t];if(n)for(var r=n.length,o=0;o<r;o++)if(n[o]===e){1===r?delete i[t]:n.splice(o,1);break}}},t.prototype.off=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.removeEventListener(t,e,i)},t.prototype.removeAllEventListeners=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t?(this._listeners&&delete this._listeners[t],this._captureListeners&&delete this._captureListeners[t]):this._listeners=this._captureListeners=null},t.prototype.dispatchEvent=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if("string"==typeof t){var n=this._listeners;if(!(e||n&&n[t]))return!0;t=new s(t,e,i)}else t.target&&t.clone&&(t=t.clone());try{t.target=this}catch(t){}if(t.bubbles&&this.parent){for(var r=this,o=[r];r.parent;)o.push(r=r.parent);var a=o.length,u=void 0;for(u=a-1;u>=0&&!t.propagationStopped;u--)o[u]._dispatchEvent(t,1+(0==u));for(u=1;u<a&&!t.propagationStopped;u++)o[u]._dispatchEvent(t,3)}else this._dispatchEvent(t,2);return!t.defaultPrevented},t.prototype.hasEventListener=function(t){var e=this._listeners,i=this._captureListeners;return!!(e&&e[t]||i&&i[t])},t.prototype.willTrigger=function(t){for(var e=this;e;){if(e.hasEventListener(t))return!0;e=e.parent}return!1},t.prototype.toString=function(){return"["+(this.constructor.name+this.name?" "+this.name:"")+"]"},t.prototype._dispatchEvent=function(t,e){var i=1===e?this._captureListeners:this._listeners;if(t&&i){var n=i[t.type],r=void 0;if(!n||0===(r=n.length))return;try{t.currentTarget=this}catch(t){}try{t.eventPhase=e}catch(t){}t.removed=!1,n=n.slice();for(var o=0;o<r&&!t.immediatePropagationStopped;o++){var s=n[o];s.handleEvent?s.handleEvent(t):s(t),t.removed&&(this.off(t.type,s,1===e),t.removed=!1)}}},t}(),u=function(t){function s(i){e(this,s);var n=o(this,t.call(this));return n.ignoreGlobalPause=!1,n.loop=0,n.useTicks=!1,n.reversed=!1,n.bounce=!1,n.timeScale=1,n.duration=0,n.position=0,n.rawPosition=-1,n._paused=!0,n._next=null,n._prev=null,n._parent=null,n._labels=null,n._labelList=null,i&&(n.useTicks=!!i.useTicks,n.ignoreGlobalPause=!!i.ignoreGlobalPause,n.loop=!0===i.loop?-1:i.loop||0,n.reversed=!!i.reversed,n.bounce=!!i.bounce,n.timeScale=i.timeScale||1,i.onChange&&n.addEventListener("change",i.onChange),i.onComplete&&n.addEventListener("complete",i.onComplete)),n}return r(s,t),s.prototype.advance=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.setPosition(this.rawPosition+t*this.timeScale,e)},s.prototype.setPosition=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments[3],r=this.duration,o=this.loop,s=this.rawPosition,a=0,u=0,h=!1;if(t<0&&(t=0),0===r){if(h=!0,-1!==s)return h}else{if(u=t-(a=t/r|0)*r,(h=-1!==o&&t>=o*r+r)&&(t=(u=r)*(a=o)+r),t===s)return h;!this.reversed!=!(this.bounce&&a%2)&&(u=r-u)}this.position=u,this.rawPosition=t,this._updatePosition(i,h),h&&(this.paused=!0),n&&n(this),e||this._runActions(s,t,i,!i&&-1===s),this.dispatchEvent("change"),h&&this.dispatchEvent("complete")},s.prototype.calculatePosition=function(t){var e=this.duration,i=this.loop,n=0,r=0;return 0===e?0:(-1!==i&&t>=i*e+e?(r=e,n=i):r=t<0?0:t-(n=t/e|0)*e,!this.reversed!=!(this.bounce&&n%2)?e-r:r)},s.prototype.addLabel=function(t,e){this._labels||(this._labels={}),this._labels[t]=e;var n=this._labelList;if(n){for(var r=0,o=n.length;r<o&&!(e<n[r].position);r++);n.splice(i,0,{label:t,position:e})}},s.prototype.gotoAndPlay=function(t){this.paused=!1,this._goto(t)},s.prototype.gotoAndStop=function(t){this.paused=!0,this._goto(t)},s.prototype.resolve=function(t){var e=Number(t);return isNaN(e)?this._labels&&this._labels[t]:e},s.prototype.toString=function(){return"["+this.constructor.name+(this.name?" (name="+this.name+")":"")+"]"},s.prototype.clone=function(){throw"AbstractTween cannot be cloned."},s.prototype._init=function(t){t&&t.paused||(this.paused=!1),t&&null!=t.position&&this.setPosition(t.position)},s.prototype._goto=function(t){var e=this.resolve(t);null!=e&&this.setPosition(e,!1,!0)},s.prototype._runActions=function(t,e,i,n){if(this._actionHead||this.tweens){var r=this.duration,o=this.loop,s=this.reversed,a=this.bounce,u=void 0,h=void 0,p=void 0,l=void 0;if(0===r?(u=h=p=l=0,s=a=!1):(p=t-(u=t/r|0)*r,l=e-(h=e/r|0)*r),-1!==o&&(h>o&&(l=r,h=o),u>o&&(p=r,u=o)),i)return this._runActionsRange(l,l,i,n);if(u!==h||p!==l||i||n){-1===u&&(u=p=0);var c=t<=e,d=u;do{var f=d===u?p:c?0:r,v=d===h?l:c?r:0;if(!s!=!(a&&d%2)&&(f=r-f,v=r-v),a&&d!==u&&f===v);else if(this._runActionsRange(f,v,i,n||d!==u&&!a))return!0;n=!1}while(c&&++d<=h||!c&&--d>=h)}}},s.prototype._runActionsRange=function(t,e,i,n){throw"_runActionsRange is abstract and must be overridden by a subclass."},s.prototype._updatePosition=function(t,e){throw"_updatePosition is abstract and must be overridden by a subclass."},n(s,[{key:"labels",get:function(){var t=this._labelList;if(!t){t=this._labelList=[];var e=this._labels;for(var i in e)t.push({label:i,position:e[i]});t.sort(function(t,e){return t.position-e.position})}return t},set:function(t){this._labels=t,this._labelList=null}},{key:"currentLabel",get:function(){for(var t=this.labels,e=this.position,n=0,r=t.length;n<r&&!(e<t[n].position);n++);return 0===i?null:t[i-1].label}},{key:"paused",get:function(){return this._paused},set:function(t){G._register(this,t),this._paused=t}}]),s}(a);function h(t){return t}function p(t){return function(e){return Math.pow(e,t)}}function l(t){return function(e){return 1-Math.pow(1-e,t)}}function c(t){return function(e){return(e*=2)<1?.5*Math.pow(e,t):1-.5*Math.abs(Math.pow(2-e,t))}}function d(t){return function(e){return e*e*((t+1)*e-t)}}function f(t){return function(e){return--e*e*((t+1)*e+t)+1}}function v(t){return t*=1.525,function(e){return(e*=2)<1?e*e*((t+1)*e-t)*.5:.5*((e-=2)*e*((t+1)*e+t)+2)}}function _(t,e){var i=2*Math.PI;return function(n){if(0===n||1===n)return n;var r=e/i*Math.asin(1/t);return-t*Math.pow(2,10*(n-=1))*Math.sin((n-r)*i/e)}}function g(t,e){var i=2*Math.PI;return function(n){if(0===n||1===n)return n;var r=e/i*Math.asin(1/t);return t*Math.pow(2,-10*n)*Math.sin((n-r)*i/e)+1}}function m(t,e){var i=2*Math.PI;return function(n){var r=e/i*Math.asin(1/t);return(n*=2)<1?t*Math.pow(2,10*(n-=1))*Math.sin((n-r)*i/e)*-.5:t*Math.pow(2,-10*(n-=1))*Math.sin((n-r)*i/e)*.5+1}}var y=h,w=p(2),T=l(2),b=c(2),E=p(3),k=l(3),P=c(3),I=p(4),L=l(4),A=c(4),M=p(5),O=l(5),S=c(5),x=d(1.7),j=f(1.7),R=v(1.7),F=_(1,.3),q=g(1,.3),D=m(1,.3*1.5),H=Object.freeze({linear:h,get:function(t){return t<-1?t=-1:t>1&&(t=1),function(e){return 0==t?e:t<0?e*(e*-t+1+t):e*((2-e)*t+(1-t))}},getPowIn:p,getPowOut:l,getPowInOut:c,sineIn:function(t){return 1-Math.cos(t*Math.PI/2)},sineOut:function(t){return Math.sin(t*Math.PI/2)},sineInOut:function(t){return-.5*(Math.cos(Math.PI*t)-1)},getBackIn:d,getBackOut:f,getBackInOut:v,circIn:function(t){return-(Math.sqrt(1-t*t)-1)},circOut:function(t){return Math.sqrt(1- --t*t)},circInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},bounceIn:function(t){return 1-Ease.bounceOut(1-t)},bounceOut:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bounceInOut:function(t){return t<.5?.5*Ease.bounceIn(2*t):.5*Ease.bounceOut(2*t-1)+.5},getElasticIn:_,getElasticOut:g,getElasticInOut:m,none:y,quadIn:w,quadOut:T,quadInOut:b,cubicIn:E,cubicOut:k,cubicInOut:P,quartIn:I,quartOut:L,quartInOut:A,quintIn:M,quintOut:O,quintInOut:S,backIn:x,backOut:j,backInOut:R,elasticIn:F,elasticOut:q,elasticInOut:D}),C=function(t){function i(n){e(this,i);var r=o(this,t.call(this));return r.name=n,r.timingMode=i.TIMEOUT,r.maxDelta=0,r.paused=!1,r._inited=!1,r._startTime=0,r._pausedTime=0,r._ticks=0,r._pausedTicks=0,r._interval=50,r._lastTime=0,r._times=null,r._tickTimes=null,r._timerId=null,r._raf=!0,r}return r(i,t),n(i,null,[{key:"RAF_SYNCHED",get:function(){return"synched"}},{key:"RAF",get:function(){return"raf"}},{key:"TIMEOUT",get:function(){return"timeout"}}]),i.prototype.init=function(){this._inited||(this._inited=!0,this._times=[],this._tickTimes=[],this._startTime=this._getTime(),this._times.push(this._lastTime=0),this._setupTick())},i.prototype.reset=function(){if(this._raf){var t=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;t&&t(this._timerId)}else clearTimeout(this._timerId);this.removeAllEventListeners("tick"),this._timerId=this._times=this._tickTimes=null,this._startTime=this._lastTime=this._ticks=0,this._inited=!1},i.prototype.addEventListener=function(e,i,n){return!this._inited&&this.init(),t.prototype.addEventListener.call(this,e,i,n)},i.prototype.getMeasuredTickTime=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this._tickTimes;return!e||e.length<1?-1:(t=Math.min(e.length,t||0|this.framerate),e.reduce(function(t,e){return t+e},0)/t)},i.prototype.getMeasuredFPS=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this._times;return!e||e.length<2?-1:(t=Math.min(e.length-1,t||0|this.framerate),1e3/((e[0]-e[t])/t))},i.prototype.getTime=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this._startTime?this._getTime()-(t?this._pausedTime:0):-1},i.prototype.getEventTime=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this._startTime?(this._lastTime||this._startTime)-(t?this._pausedTime:0):-1},i.prototype.getTicks=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this._ticks-(t?this._pausedTicks:0)},i.prototype._handleSynch=function(){this._timerId=null,this._setupTick(),this._getTime()-this._lastTime>=.97*(this._interval-1)&&this._tick()},i.prototype._handleRAF=function(){this._timerId=null,this._setupTick(),this._tick()},i.prototype._handleTimeout=function(){this._timerId=null,this._setupTick(),this._tick()},i.prototype._setupTick=function(){if(null==this._timerId){var t=this.timingMode||this._raf&&i.RAF;if(t===i.RAF_SYNCHED||t===i.RAF){var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(e)return this._timerId=e(t===i.RAF?this._handleRAF.bind(this):this._handleSynch.bind(this)),void(this._raf=!0)}this._raf=!1,this._timerId=setTimeout(this._handleTimeout.bind(this),this._interval)}},i.prototype._tick=function(){var t=this.paused,e=this._getTime(),i=e-this._lastTime;if(this._lastTime=e,this._ticks++,t&&(this._pausedTicks++,this._pausedTime+=i),this.hasEventListener("tick")){var n=new s("tick"),r=this.maxDelta;n.delta=r&&i>r?r:i,n.paused=t,n.time=e,n.runTime=e-this._pausedTime,this.dispatchEvent(n)}for(this._tickTimes.unshift(this._getTime()-e);this._tickTimes.length>100;)this._tickTimes.pop();for(this._times.unshift(e);this._times.length>100;)this._times.pop()},i.prototype._getTime=function(){var t=window.performance&&window.performance.now;return(t&&t.call(performance)||(new Date).getTime())-this._startTime},i.on=function(t,e,i,n,r,o){return N.on(t,e,i,n,r,o)},i.removeEventListener=function(t,e,i){N.removeEventListener(t,e,i)},i.off=function(t,e,i){N.off(t,e,i)},i.removeAllEventListeners=function(t){N.removeAllEventListeners(t)},i.dispatchEvent=function(t,e,i){return N.dispatchEvent(t,e,i)},i.hasEventListener=function(t){return N.hasEventListener(t)},i.willTrigger=function(t){return N.willTrigger(t)},i.toString=function(){return N.toString()},i.init=function(){N.init()},i.reset=function(){N.reset()},i.addEventListener=function(t,e,i){N.addEventListener(t,e,i)},i.getMeasuredTickTime=function(t){return N.getMeasuredTickTime(t)},i.getMeasuredFPS=function(t){return N.getMeasuredFPS(t)},i.getTime=function(t){return N.getTime(t)},i.getEventTime=function(t){return N.getEventTime(t)},i.getTicks=function(t){return N.getTicks(t)},n(i,[{key:"interval",get:function(){return this._interval},set:function(t){this._interval=t,this._inited&&this._setupTick()}},{key:"framerate",get:function(){return 1e3/this._interval},set:function(t){this.interval=1e3/t}}],[{key:"interval",get:function(){return N.interval},set:function(t){N.interval=t}},{key:"framerate",get:function(){return N.framerate},set:function(t){N.framerate=t}},{key:"name",get:function(){return N.name},set:function(t){N.name=t}},{key:"timingMode",get:function(){return N.timingMode},set:function(t){N.timingMode=t}},{key:"maxDelta",get:function(){return N.maxDelta},set:function(t){N.maxDelta=t}},{key:"paused",get:function(){return N.paused},set:function(t){N.paused=t}}]),i}(a),N=new C("createjs.global"),G=function(t){function n(i,r){e(this,n);var s=o(this,t.call(this,r));return s.pluginData=null,s.target=i,s.passive=!1,s._stepHead=new B(null,0,0,{},null,!0),s._stepTail=s._stepHead,s._stepPosition=0,s._actionHead=null,s._actionTail=null,s._plugins=null,s._pluginIds=null,s._injected=null,r&&(s.pluginData=r.pluginData,r.override&&n.removeTweens(i)),s.pluginData||(s.pluginData={}),s._init(r),s}return r(n,t),n.get=function(t,e){return new n(t,e)},n.tick=function(t,e){for(var i=n._tweenHead;i;){var r=i._next;e&&!i.ignoreGlobalPause||i._paused||i.advance(i.useTicks?1:t),i=r}},n.handleEvent=function(t){"tick"===t.type&&this.tick(t.delta,t.paused)},n.removeTweens=function(t){if(t.tweenjs_count){for(var e=n._tweenHead;e;){var i=e._next;e.target===t&&(e.paused=!0),e=i}t.tweenjs_count=0}},n.removeAllTweens=function(){for(var t=n._tweenHead;t;){var e=t._next;t._paused=!0,t.target&&(t.target.tweenjs_count=0),t._next=t._prev=null,t=e}n._tweenHead=n._tweenTail=null},n.hasActiveTweens=function(t){return t?!!t.tweenjs_count:!!n._tweenHead},n.installPlugin=function(t,e){t.install(e);for(var r=t.priority=t.priority||0,o=n._plugins=n._plugins||[],s=0,a=o.length;s<a&&!(r<o[s].priority);s++);o.splice(i,0,t)},n._register=function(t,e){var i=t.target;if(!e&&t._paused){i&&(i.tweenjs_count=i.tweenjs_count?i.tweenjs_count+1:1);var r=n._tweenTail;r?(n._tweenTail=r._next=t,t._prev=r):n._tweenHead=n._tweenTail=t,n._inited||(C.addEventListener("tick",n),n._inited=!0)}else if(e&&!t._paused){i&&i.tweenjs_count--;var o=t._next,s=t._prev;o?o._prev=s:n._tweenTail=s,s?s._next=o:n._tweenHead=o,t._next=t._prev=null}},n.prototype.wait=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t>0&&this._addStep(+t,this._stepTail.props,null,e),this},n.prototype.to=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h;e<0&&(e=0);var n=this._addStep(+e,null,i);return this._appendProps(t,n),this},n.prototype.label=function(t){return this.addLabel(t,this.duration),this},n.prototype.call=function(t,e,i){return this._addAction(i||this.target,t,e||[this])},n.prototype.set=function(t,e){return this._addAction(e||this.target,this._set,[t])},n.prototype.play=function(t){return this._addAction(t||this,this._set,[{paused:!1}])},n.prototype.pause=function(t){return this._addAction(t||this,this._set,[{paused:!1}])},n.prototype.clone=function(){throw"Tween can not be cloned."},n.prototype._addPlugin=function(t){var e=this._pluginIds||(this._pluginIds={}),i=t.id;if(i&&!e[i]){e[i]=!0;for(var n=this._plugins||(this._plugins=[]),r=t.priority||0,o=0,s=n.length;o<s;o++)if(r<n[o].priority)return void n.splice(o,0,t);n.push(t)}},n.prototype._updatePosition=function(t,e){var i=this._stepHead.next,n=this.position,r=this.duration;if(this.target&&i){for(var o=i.next;o&&o.t<=n;)o=(i=i.next).next;var s=e?0===r?1:n/r:(n-i.t)/i.d;this._updateTargetProps(i,s,e)}this._stepPosition=i?n-i.t:0},n.prototype._updateTargetProps=function(t,e,i){if(!(this.passive=!!t.passive)){var r=void 0,o=void 0,s=void 0,a=void 0,u=t.prev.props,h=t.props;(a=t.ease)&&(e=a(e,0,1,1));var p=this._plugins;t:for(var l in u){if(r=(o=u[l])!==(s=h[l])&&"number"==typeof o?o+(s-o)*e:e>=1?s:o,p)for(var c=0,d=p.length;c<d;c++){var f=p[c].change(this,t,l,r,e,i);if(f===n.IGNORE)continue t;void 0!==f&&(r=f)}this.target[l]=r}}},n.prototype._runActionsRange=function(t,e,i,n){var r=t>e,o=r?this._actionTail:this._actionHead,s=e,a=t;r&&(s=t,a=e);for(var u=this.position;o;){var h=o.t;if((h===e||h>a&&h<s||n&&h===t)&&(o.funct.apply(o.scope,o.params),u!==this.position))return!0;o=r?o.prev:o.next}},n.prototype._appendProps=function(t,e,i){var r,o=this._stepHead.props,s=this.target,a=n._plugins,u=void 0,h=void 0,p=void 0,l=void 0,c=e.prev,d=c.props,f=e.props||(e.props=this._cloneProps(d)),v={};for(u in t)if(t.hasOwnProperty(u)&&(v[u]=f[u]=t[u],void 0===o[u])){if(l=void 0,a)for(h=a.length-1;h>=0;h--)if(void 0!==(p=a[h].init(this,u,l))&&(l=p),l===n.IGNORE){(ignored=ignored||{})[u]=!0,delete f[u],delete v[u];break}l!==n.IGNORE&&(void 0===l&&(l=s[u]),d[u]=void 0===l?null:l)}for(u in v){p=t[u];for(var _=void 0,g=c;(_=g)&&(g=_.prev);)if(g.props!==_.props){if(void 0!==g.props[u])break;g.props[u]=d[u]}}if(i&&(a=this._plugins))for(h=a.length-1;h>=0;h--)a[h].step(this,e,v);(r=this._injected)&&(this._injected=null,this._appendProps(r,e,!1))},n.prototype._injectProp=function(t,e){(this._injected||(this._injected={}))[t]=e},n.prototype._addStep=function(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=new B(this._stepTail,this.duration,t,e,i,n);return this.duration+=t,this._stepTail=this._stepTail.next=r},n.prototype._addAction=function(t,e,i){var n=new U(this._actionTail,this.duration,t,e,i);return this._actionTail?this._actionTail.next=n:this._actionHead=n,this._actionTail=n,this},n.prototype._set=function(t){for(var e in t)this[e]=t[e]},n.prototype._cloneProps=function(t){var e={};for(var i in t)e[i]=t[i];return e},n}(u),z=G.prototype;z.w=z.wait,z.t=z.to,z.c=z.call,z.s=z.set,G.IGNORE={},G._tweens=[],G._plugins=null,G._tweenHead=null,G._tweenTail=null;var B=function t(i,n,r,o,s,a){e(this,t),this.next=null,this.prev=i,this.t=n,this.d=r,this.props=o,this.ease=s,this.passive=a,this.index=i?i.index+1:0},U=function t(i,n,r,o,s){e(this,t),this.next=null,this.d=0,this.prev=i,this.t=n,this.scope=r,this.funct=o,this.params=s},Y=function(t){function i(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e(this,i);var r=o(this,t.call(this,n));return r.tweens=[],n.tweens&&r.addTween.apply(r,n.tweens),n.labels&&(r.labels=n.labels),r._init(n),r}return r(i,t),i.prototype.addTween=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=e.length;if(1===n){var r=e[0];this.tweens.push(r),r._parent=this,r.paused=!0;var o=r.duration;return r.loop>0&&(o*=r.loop+1),o>this.duration&&(this.duration=o),this.rawPosition>=0&&r.setPosition(this.rawPosition),r}if(n>1){for(var s=0;s<n;s++)this.addTween(e[s]);return e[n-1]}return null},i.prototype.removeTween=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];var n=e.length;if(1===n){for(var r=this.tweens,o=e[0],s=r.length;s--;)if(r[s]===o)return r.splice(s,1),o._parent=null,o.duration>=this.duration&&this.updateDuration(),!0;return!1}if(n>1){for(var a=!0,u=0;u<n;u++)a=a&&this.removeTween(e[u]);return a}return!0},i.prototype.updateDuration=function(){this.duration=0;for(var t=0,e=this.tweens.length;t<e;t++){var i=this.tweens[t],n=i.duration;i.loop>0&&(n*=i.loop+1),n>this.duration&&(this.duration=n)}},i.prototype.clone=function(){throw"Timeline can not be cloned."},i.prototype._updatePosition=function(t,e){for(var i=this.position,n=0,r=this.tweens.length;n<r;n++)this.tweens[n].setPosition(i,!0,t)},i.prototype._runActionsRange=function(t,e,i,n){for(var r=this.position,o=0,s=this.tweens.length;o<s;o++)if(this.tweens[o]._runActions(t,e,i,n),r!==this.position)return!0},i}(u);t.Ease=H,t.Tween=G,t.AbstractTween=u,t.Timeline=Y,t.Event=s,t.EventDispatcher=a,t.Ticker=C,(t.versions=t.versions||{}).tweenjs="2.0.0"}(this.createjs=this.createjs||{});
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
},{}]},{},[20,13], null)
//# sourceMappingURL=/tweenjs.min.6005caa9.map