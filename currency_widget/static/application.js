/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(162);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	__webpack_require__(3);

/***/ },

/***/ 2:
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Describes how touch slider works
	 */
	var Swiper = function () {
	  /**
	   * [constructor is initial method]
	   * @param  {[Object]} node [parent node]
	   */
	  function Swiper(node) {
	    _classCallCheck(this, Swiper);
	
	    this.area = node.querySelector('.js-series-items');
	    this.items = node.querySelectorAll('.js-series-item');
	    this.control = node.querySelectorAll('.js-series-control');
	
	    if (this.items.length > 0) {
	      this.size = this.items[0].clientWidth;
	      this.space;
	
	      this.direction;
	
	      this.prevX = 0;
	      this.max = {};
	      this.count = { startX: 0, startY: 0, x: 0, y: 0 };
	      this.distance;
	      this.diff;
	    }
	    this.winWidth = window.innerWidth;
	    this.setEvents();
	  }
	  /**
	   * [checkHorizontalResize method that check if window resized only horizontal]
	   * @return {[Boolean]} [is a answer of checking]
	   */
	
	
	  _createClass(Swiper, [{
	    key: 'checkHorizontalResize',
	    value: function checkHorizontalResize() {
	      if (window.innerWidth !== this.winWidth) {
	        this.winWidth = window.innerWidth;
	        return true;
	      }
	      return false;
	    }
	    /**
	     * [setAnimate method that toogle transition class on swiper area]
	     */
	
	  }, {
	    key: 'setAnimate',
	    value: function setAnimate(state) {
	      state ? this.area.classList.add('is-animate') : this.area.classList.remove('is-animate');
	    }
	    /**
	     * [slide method that runs on slide button click event]
	     * @param  {[Object]} node [is a node of button]
	     */
	
	  }, {
	    key: 'slide',
	    value: function slide(node) {
	      if (node.classList.contains('is-disabled')) return;
	
	      this.setAnimate(true);
	      this.direction = node.getAttribute('data-direction') === 'right' ? -1 : 1;
	
	      this.area.style.left = this.currentLeft() + this.direction * this.size + 'px';
	      this.setControls();
	    }
	    /**
	     * [currentLeft method that find left position of area]
	     * @return {[Number]} [left positon of swiper area]
	     */
	
	  }, {
	    key: 'currentLeft',
	    value: function currentLeft() {
	      var left = this.area.style.left !== '' ? parseFloat(this.area.style.left.replace('%', '').replace('px', ''), 10) : 0;
	
	      return this.area.style.left.indexOf('%') >= 0 ? left / 100 * window.innerWidth : left;
	    }
	    /**
	     * [setControls method that toogle disable class on slide buttons]
	     */
	
	  }, {
	    key: 'setControls',
	    value: function setControls() {
	      var currLeft = this.currentLeft();
	      for (var i = 0; i < this.control.length; i++) {
	        this.control[i].classList.remove('is-disabled');
	      }
	      currLeft <= this.max.px && this.control[1].classList.add('is-disabled');
	      currLeft >= this.space && this.control[0].classList.add('is-disabled');
	    }
	    /**
	     * [touchStart method that run after thouchstart event handled]
	     * @param  {[Object]} e [is event]
	     */
	
	  }, {
	    key: 'touchStart',
	    value: function touchStart(e) {
	      this.setAnimate(false);
	      this.prevX = e.touches[0].screenX;
	      this.count.startX = e.touches[0].screenX;
	      this.count.startY = e.touches[0].screenY;
	    }
	    /**
	     * [touchMove method that run after thouchmove event handled]
	     * @param  {[Object]} e [is event]
	     */
	
	  }, {
	    key: 'touchMove',
	    value: function touchMove(e) {
	      var left = void 0;
	      var currLeft = this.currentLeft();
	
	      this.diff = e.touches[0].screenX - this.prevX;
	      this.prevX = e.touches[0].screenX;
	
	      this.count.x = Math.abs(this.count.startX - e.touches[0].screenX);
	      this.count.y = Math.abs(this.count.startY - e.touches[0].screenY);
	
	      left = currLeft + this.diff;
	
	      if (this.count.y > this.count.x || this.diff === 0) return;
	
	      if (currLeft >= this.space && this.diff > 0 || currLeft <= this.max.px && this.diff < 0) {
	        this.area.style.left = this.diff > 0 ? this.space + 'px' : this.max.px + 'px';
	        this.setControls();
	        return;
	      }
	
	      e.preventDefault();
	      this.area.style.left = left + 'px';
	    }
	    /**
	     * [touchEnd method that run after thouchend event handled]
	     */
	
	  }, {
	    key: 'touchEnd',
	    value: function touchEnd() {
	      var left = void 0;
	      var coefficient = void 0;
	      var balance = void 0;
	      var currLeft = this.currentLeft();
	
	      this.direction = this.diff > 0 ? 1 : -1;
	      this.distance = Math.abs((currLeft - this.space) / this.size);
	      this.setAnimate(true);
	
	      if (this.distance === 0) return;
	
	      balance = this.distance - Math.floor(this.distance);
	
	      coefficient = this.diff < 0 && balance > 0.25 || this.diff > 0 && balance > 0.75 ? 1 : 0;
	
	      left = (Math.floor(this.distance) + coefficient) * -this.size + this.space;
	
	      left >= this.space && (left = this.space);
	      left <= this.max.px && (left = this.max.px);
	
	      this.area.style.left = left + 'px';
	      this.setControls();
	    }
	    /**
	     * [setInitial method that centerialize swiper area]
	     */
	
	  }, {
	    key: 'setInitial',
	    value: function setInitial() {
	      var middle = (this.area.clientWidth - window.innerWidth) / -2;
	      this.space = (window.innerWidth - this.size) / 2;
	      this.area.style.left = this.items.length % 2 === 0 ? middle + this.size / 2 + 'px' : middle + 'px';
	    }
	    /**
	     * [setMax method that set max breakpoints for swiper area]
	     */
	
	  }, {
	    key: 'setMax',
	    value: function setMax() {
	      this.max = {
	        px: ((this.items.length - 1) * this.size - this.space) * -1,
	        perc: (this.items.length - 1) * -100
	      };
	    }
	    /**
	     * [setEvents method that set event handlers on component nodes]
	     */
	
	  }, {
	    key: 'setEvents',
	    value: function setEvents() {
	      var _this = this;
	
	      for (var i = 0; i < this.control.length; i++) {
	        this.control[i].addEventListener('click', function (e) {
	          _this.slide(e.currentTarget);
	          e.stopPropagation();
	        });
	      }
	
	      this.setInitial();
	      this.setMax();
	      this.setControls();
	
	      this.area.addEventListener('touchstart', function (event) {
	        _this.touchStart(event);
	      });
	      this.area.addEventListener('touchmove', function (event) {
	        _this.touchMove(event);
	      });
	      this.area.addEventListener('touchend', function (event) {
	        _this.touchEnd(event);
	      });
	
	      window.addEventListener('resize', function () {
	        if (_this.checkHorizontalResize()) {
	          _this.setInitial();
	          _this.setMax();
	        }
	      });
	
	      if (this.items.length <= 1) {
	        for (var _i = 0; _i < this.control.length; _i++) {
	          this.control[_i].remove();
	        }
	      }
	    }
	  }]);
	
	  return Swiper;
	}();
	
	var swiper = document.querySelectorAll('.js-series');
	if (swiper.length > 0) {
	  for (var i = 0; i < swiper.length; i++) {
	    new Swiper(swiper[i]);
	  }
	}

/***/ },

/***/ 3:
/***/ function(module, exports) {

	// import React, {Component} from 'react'
	// import ReactDOM from 'react-dom'
	
	// class Widget extends Component {
	//   render() {
	//     return(
	//     )
	//   }
	// }
	
	// 'uk.finance.yahoo.com/currencies/converter/#from=GBP;to=EUR;amt=1'
	// http://api.fixer.io/latest?base=USD
	
	// ReactDOM.render(<Widget/>, document.body.querySelector('.js-widget'));
	"use strict";

/***/ },

/***/ 162:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });
//# sourceMappingURL=application.js.map