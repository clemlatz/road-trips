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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/* global google */
	/* exported initMap */
	
	'use strict';
	
	// MAP
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Map = function () {
	  function Map(element) {
	    _classCallCheck(this, Map);
	
	    this.element = element;
	
	    this.buildMap();
	    this.getEntries();
	  }
	
	  /**
	   * Insert Google map
	   */
	
	
	  _createClass(Map, [{
	    key: 'buildMap',
	    value: function buildMap() {
	      this.map = new google.maps.Map(this.element, {
	        center: { lat: 64.9313, lng: -19.0212 },
	        zoom: this.getZoomForWidth(),
	        zoomControl: true,
	        scaleControl: true,
	        disableDefaultUI: true
	      });
	
	      // google.maps.event.addListener(this.map, 'click', function(event) {
	      //   console.log(event.latLng.lat(), event.latLng.lng());
	      // });
	    }
	
	    /**
	     * Returns zoom level for window width
	     */
	
	  }, {
	    key: 'getZoomForWidth',
	    value: function getZoomForWidth() {
	      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	      if (width < 768) {
	        return 5;
	      }
	      return 7;
	    }
	
	    /**
	     * Fetch entries from server and create Pins
	     */
	
	  }, {
	    key: 'getEntries',
	    value: function getEntries() {
	      var map = this.map;
	      fetch('/data/entries.json').then(function (response) {
	        return response.json();
	      }).then(function (entries) {
	        entries.forEach(function (entry) {
	          new Pin(entry, map);
	        });
	      });
	    }
	  }]);
	
	  return Map;
	}();
	
	// PIN
	
	var Pin = function () {
	  function Pin(entry, map) {
	    _classCallCheck(this, Pin);
	
	    this.entry = entry;
	    this.map = map;
	
	    this.addMarker();
	  }
	
	  /**
	   * Add marker to the map
	   */
	
	
	  _createClass(Pin, [{
	    key: 'addMarker',
	    value: function addMarker() {
	      this.marker = new google.maps.Marker({
	        position: { lat: this.entry.coords[0], lng: this.entry.coords[1] },
	        map: this.map,
	        animation: google.maps.Animation.DROP,
	        label: this.entry.id,
	        title: this.entry.title
	      });
	
	      this.marker.addListener('click', function () {
	        window.page.render(this.entry.id, this.entry.title, this.entry.content);
	        window.page.renderPhotos(this.entry.photos);
	        window.page.show();
	      }.bind(this));
	    }
	  }]);
	
	  return Pin;
	}();
	
	// PAGE
	
	var Page = function () {
	  function Page(element) {
	    _classCallCheck(this, Page);
	
	    this.element = element;
	    this.id = element.querySelector('.id');
	    this.title = element.querySelector('.title');
	    this.content = element.querySelector('.content');
	    this.close = element.querySelector('.close');
	    this.photos = element.querySelector('.photos');
	
	    this.close.addEventListener('click', function () {
	      this.hide();
	    }.bind(this));
	  }
	
	  _createClass(Page, [{
	    key: 'render',
	    value: function render(id, title, content) {
	      this.id.textContent = id;
	      this.title.textContent = title;
	      this.content.textContent = content;
	    }
	  }, {
	    key: 'renderPhotos',
	    value: function renderPhotos(photos) {
	      this.photos.innerHTML = '';
	      photos.forEach(function (data) {
	        var photo = new Photo(data.id, data.caption);
	        this.photos.appendChild(photo.element);
	      }.bind(this));
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.element.style.display = 'block';
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.element.style.display = 'none';
	    }
	  }]);
	
	  return Page;
	}();
	
	// PHOTO
	
	var Photo = function () {
	  function Photo(id, caption) {
	    _classCallCheck(this, Photo);
	
	    this.id = id;
	    this.caption = caption;
	
	    this.render();
	  }
	
	  _createClass(Photo, [{
	    key: 'render',
	    value: function render() {
	      this.element = document.createElement('div');
	      this.element.classList.add('photo');
	
	      var image = document.createElement('img');
	      image.classList.add('thumbnail');
	      image.src = '/data/thumbs/' + this.id + '.jpg';
	      image.alt = this.caption;
	      this.element.appendChild(image);
	
	      var text = document.createElement('p');
	      text.classList.add('caption');
	      text.textContent = this.caption;
	      this.element.appendChild(text);
	
	      return this.element;
	    }
	  }]);
	
	  return Photo;
	}();
	
	document.addEventListener('DOMContentLoaded', function () {
	  var page = document.querySelector('#page');
	  if (page) {
	    window.page = new Page(page);
	  }
	});
	
	/**
	 * Called by Google Maps API JS when loaded
	 */
	google.maps.event.addDomListener(window, 'load', function () {
	  var map = document.querySelector('#map');
	  if (map) {
	    new Map(map);
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGE2YTA3MTcyZDA2ZWIzZDk4MTgiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDbkNBOzs7Ozs7OztLQUlNLEc7QUFFSixnQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFVBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEsVUFBSyxRQUFMO0FBQ0EsVUFBSyxVQUFMO0FBQ0Q7Ozs7Ozs7OztnQ0FLVTtBQUNULFlBQUssR0FBTCxHQUFXLElBQUksT0FBTyxJQUFQLENBQVksR0FBaEIsQ0FBb0IsS0FBSyxPQUF6QixFQUFrQztBQUMzQyxpQkFBUSxFQUFFLEtBQUssT0FBUCxFQUFnQixLQUFLLENBQUMsT0FBdEIsRUFEbUM7QUFFM0MsZUFBTSxLQUFLLGVBQUwsRUFGcUM7QUFHM0Msc0JBQWEsSUFIOEI7QUFJM0MsdUJBQWMsSUFKNkI7QUFLM0MsMkJBQWtCO0FBTHlCLFFBQWxDLENBQVg7Ozs7O0FBV0Q7Ozs7Ozs7O3VDQUtpQjtBQUNoQixXQUFJLFFBQVEsT0FBTyxVQUFQLElBQXFCLFNBQVMsZUFBVCxDQUF5QixXQUE5QyxJQUNQLFNBQVMsSUFBVCxDQUFjLFdBRG5CO0FBRUEsV0FBSSxRQUFRLEdBQVosRUFBaUI7QUFDZixnQkFBTyxDQUFQO0FBQ0Q7QUFDRCxjQUFPLENBQVA7QUFDRDs7Ozs7Ozs7a0NBS1k7QUFDWCxXQUFNLE1BQU0sS0FBSyxHQUFqQjtBQUNBLGFBQU0sb0JBQU4sRUFDRyxJQURILENBQ1EsVUFBUyxRQUFULEVBQW1CO0FBQ3ZCLGdCQUFPLFNB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QUNQLFNBQUksR0FBSixDQUFRLEdBQVI7QUFDRDtBQUNGLEVBTEQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDBhNmEwNzE3MmQwNmViM2Q5ODE4XG4gKiovIiwiLyogZ2xvYmFsIGdvb2dsZSAqL1xuLyogZXhwb3J0ZWQgaW5pdE1hcCAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIE1BUFxuXG5jbGFzcyBNYXAge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgdGhpcy5idWlsZE1hcCgpO1xuICAgIHRoaXMuZ2V0RW50cmllcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBHb29nbGUgbWFwXG4gICAqL1xuICBidWlsZE1hcCgpIHtcbiAgICB0aGlzLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAodGhpcy5lbGVtZW50LCB7XG4gICAgICBjZW50ZXI6IHsgbGF0OiA2NC45MzEzLCBsbmc6IC0xOS4wMjEyIH0sXG4gICAgICB6b29tOiB0aGlzLmdldFpvb21Gb3JXaWR0aCgpLFxuICAgICAgem9vbUNvbnRyb2w6IHRydWUsXG4gICAgICBzY2FsZUNvbnRyb2w6IHRydWUsXG4gICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlXG4gICAgfSk7XG5cbiAgICAvLyBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcCwgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKGV2ZW50LmxhdExuZy5sYXQoKSwgZXZlbnQubGF0TG5nLmxuZygpKTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHpvb20gbGV2ZWwgZm9yIHdpbmRvdyB3aWR0aFxuICAgKi9cbiAgZ2V0Wm9vbUZvcldpZHRoKCkge1xuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgICAgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbiAgICBpZiAod2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybiA1O1xuICAgIH1cbiAgICByZXR1cm4gNztcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCBlbnRyaWVzIGZyb20gc2VydmVyIGFuZCBjcmVhdGUgUGluc1xuICAgKi9cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcDtcbiAgICBmZXRjaCgnL2RhdGEvZW50cmllcy5qc29uJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKGVudHJpZXMpIHtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgbmV3IFBpbihlbnRyeSwgbWFwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG4vLyBQSU5cblxuY2xhc3MgUGluIHtcblxuICBjb25zdHJ1Y3RvcihlbnRyeSwgbWFwKSB7XG4gICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgIHRoaXMubWFwID0gbWFwO1xuXG4gICAgdGhpcy5hZGRNYXJrZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbWFya2VyIHRvIHRoZSBtYXBcbiAgICovXG4gIGFkZE1hcmtlcigpIHtcbiAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IHsgbGF0OiB0aGlzLmVudHJ5LmNvb3Jkc1swXSwgbG5nOiB0aGlzLmVudHJ5LmNvb3Jkc1sxXSB9LFxuICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXG4gICAgICBsYWJlbDogdGhpcy5lbnRyeS5pZCxcbiAgICAgIHRpdGxlOiB0aGlzLmVudHJ5LnRpdGxlXG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5wYWdlLnJlbmRlcih0aGlzLmVudHJ5LmlkLCB0aGlzLmVudHJ5LnRpdGxlLCB0aGlzLmVudHJ5LmNvbnRlbnQpO1xuICAgICAgd2luZG93LnBhZ2UucmVuZGVyUGhvdG9zKHRoaXMuZW50cnkucGhvdG9zKTtcbiAgICAgIHdpbmRvdy5wYWdlLnNob3coKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG59XG5cbi8vIFBBR0VcblxuY2xhc3MgUGFnZSB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pZCAgICAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaWQnKTtcbiAgICB0aGlzLnRpdGxlICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpO1xuICAgIHRoaXMuY29udGVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICB0aGlzLmNsb3NlICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpO1xuICAgIHRoaXMucGhvdG9zICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnBob3RvcycpO1xuXG4gICAgdGhpcy5jbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlbmRlcihpZCwgdGl0bGUsIGNvbnRlbnQpIHtcbiAgICB0aGlzLmlkLnRleHRDb250ZW50ID0gaWQ7XG4gICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHRoaXMuY29udGVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIH1cblxuICByZW5kZXJQaG90b3MocGhvdG9zKSB7XG4gICAgdGhpcy5waG90b3MuaW5uZXJIVE1MID0gJyc7XG4gICAgcGhvdG9zLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgY29uc3QgcGhvdG8gPSBuZXcgUGhvdG8oZGF0YS5pZCwgZGF0YS5jYXB0aW9uKTtcbiAgICAgIHRoaXMucGhvdG9zLmFwcGVuZENoaWxkKHBob3RvLmVsZW1lbnQpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cblxuLy8gUEhPVE9cblxuY2xhc3MgUGhvdG8ge1xuXG4gIGNvbnN0cnVjdG9yKGlkLCBjYXB0aW9uKSB7XG4gICAgdGhpcy5pZCAgICAgID0gaWQ7XG4gICAgdGhpcy5jYXB0aW9uID0gY2FwdGlvbjtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Bob3RvJyk7XG5cbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ3RodW1ibmFpbCcpO1xuICAgIGltYWdlLnNyYyA9IGAvZGF0YS90aHVtYnMvJHt0aGlzLmlkfS5qcGdgO1xuICAgIGltYWdlLmFsdCA9IHRoaXMuY2FwdGlvbjtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ2NhcHRpb24nKTtcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gdGhpcy5jYXB0aW9uO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH1cblxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZScpO1xuICBpZiAocGFnZSkge1xuICAgIHdpbmRvdy5wYWdlID0gbmV3IFBhZ2UocGFnZSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIENhbGxlZCBieSBHb29nbGUgTWFwcyBBUEkgSlMgd2hlbiBsb2FkZWRcbiAqL1xuZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBtYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFwJyk7XG4gIGlmIChtYXApIHtcbiAgICBuZXcgTWFwKG1hcCk7XG4gIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9