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
/***/ function(module, exports, __webpack_require__) {

	/* global google */
	/* exported initMap */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// MAP
	
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
	      var _this = this;
	
	      this.marker = new google.maps.Marker({
	        position: { lat: this.entry.coords[0], lng: this.entry.coords[1] },
	        map: this.map,
	        animation: google.maps.Animation.DROP,
	        label: this.entry.id,
	        title: this.entry.title
	      });
	
	      this.marker.addListener('click', function () {
	        window.page.render(_this.entry.id, _this.entry.title, _this.entry.content);
	        window.page.renderPhotos(_this.entry.photos);
	        window.page.show();
	      });
	    }
	  }]);
	
	  return Pin;
	}();
	
	// PAGE
	
	var Page = function () {
	  function Page(element) {
	    var _this2 = this;
	
	    _classCallCheck(this, Page);
	
	    this.element = element;
	    this.id = element.querySelector('.id');
	    this.title = element.querySelector('.title');
	    this.content = element.querySelector('.content');
	    this.close = element.querySelector('.close');
	    this.photos = element.querySelector('.photos');
	
	    this.close.addEventListener('click', function () {
	      _this2.hide();
	    });
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
	      var _this3 = this;
	
	      this.photos.innerHTML = '';
	      photos.forEach(function (data) {
	        var photo = new Photo(data.id, data.caption);
	        _this3.photos.appendChild(photo.element);
	      });
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
	      var _this4 = this;
	
	      this.element = document.createElement('div');
	      this.element.classList.add('photo');
	
	      var image = document.createElement('img');
	      image.classList.add('thumbnail');
	      image.src = '/data/thumbs/' + this.id + '.jpg';
	      image.alt = this.caption;
	      this.element.appendChild(image);
	
	      // When image is loaded
	      image.addEventListener('load', function () {
	        _this4.ratio = image.naturalWidth / image.naturalHeight;
	
	        // Display lightbox when photo is clicked
	        image.addEventListener('click', function () {
	          window.lightbox.show(_this4);
	        });
	      });
	
	      var text = document.createElement('p');
	      text.classList.add('caption');
	      text.textContent = this.caption;
	      this.element.appendChild(text);
	
	      return this.element;
	    }
	  }]);
	
	  return Photo;
	}();
	
	// LIGHTBOX
	
	var Lightbox = function () {
	  function Lightbox(element) {
	    var _this5 = this;
	
	    _classCallCheck(this, Lightbox);
	
	    this.element = element;
	    this.overlay = element.parentNode;
	
	    this.overlay.addEventListener('click', this.hide.bind(this));
	
	    window.addEventListener('resize', function () {
	      _this5.resize();
	    });
	  }
	
	  _createClass(Lightbox, [{
	    key: 'getDimensions',
	    value: function getDimensions() {
	      var w = window,
	          d = document,
	          e = d.documentElement,
	          g = d.getElementsByTagName('body')[0],
	          windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
	          windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;
	
	      var targetHeight = windowHeight * 0.95,
	          targetWidth = targetHeight * this.imageRatio,
	          targetTop = windowHeight * 0.025,
	          targetLeft = windowWidth / 2 - targetWidth / 2;
	
	      if (targetWidth > windowWidth * 0.95) {
	        targetWidth = windowWidth * 0.95;
	        targetHeight = targetWidth / this.imageRatio;
	        targetLeft = windowWidth * 0.025;
	        targetTop = windowHeight / 2 - targetHeight / 2;
	      }
	
	      return {
	        top: targetTop,
	        left: targetLeft,
	        width: targetWidth,
	        height: targetHeight
	      };
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	      var dimensions = this.getDimensions();
	
	      this.element.style.width = dimensions.width + 'px';
	      this.element.style.height = dimensions.height + 'px';
	      this.element.style.top = dimensions.top + 'px';
	      this.element.style.left = dimensions.left + 'px';
	    }
	  }, {
	    key: 'show',
	    value: function show(photo) {
	
	      // Display image with low-res image for fast loading
	      this.image = document.createElement('img');
	      this.image.style.backgroundImage = 'url(/data/thumbs/' + photo.id + '.jpg)';
	      this.element.appendChild(this.image);
	
	      this.imageRatio = photo.ratio;
	      this.overlay.style.display = 'block';
	      this.resize();
	      this.overlay.style.opacity = 1;
	
	      // Load high-res image
	      this.image.src = '/data/photos/' + photo.id + '.jpg';
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.overlay.style.opacity = 0;
	      this.overlay.style.display = 'none';
	      this.element.innerHTML = '';
	    }
	  }]);
	
	  return Lightbox;
	}();
	
	document.addEventListener('DOMContentLoaded', function () {
	  var page = document.querySelector('#page');
	  if (page) {
	    window.page = new Page(page);
	  }
	  var lightbox = document.querySelector('#lightbox');
	  if (lightbox) {
	    window.lightbox = new Lightbox(lightbox);
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTU0YjExYzA3MTE5ODRmOTI2NTAiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL34vd2hhdHdnLWZldGNoL2ZldGNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDbkNBOzs7O0FBRUE7Ozs7OztLQUlNLEc7QUFFSixnQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFVBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEsVUFBSyxRQUFMO0FBQ0EsVUFBSyxVQUFMO0FBQ0Q7Ozs7Ozs7OztnQ0FLVTtBQUNULFlBQUssR0FBTCxHQUFXLElBQUksT0FBTyxJQUFQLENBQVksR0FBaEIsQ0FBb0IsS0FBSyxPQUF6QixFQUFrQztBQUMzQyxpQkFBUSxFQUFFLEtBQUssT0FBUCxFQUFnQixLQUFLLENBQUMsT0FBdEIsRUFEbUM7QUFFM0MsZUFBTSxLQUFLLGVBQUwsRUFGcUM7QUFHM0Msc0JBQWEsSUFIOEI7QUFJM0MsdUJBQWMsSUFKNkI7QUFLM0MsMkJBQWtCO0FBTHlCLFFBQWxDLENBQVg7Ozs7O0FBV0Q7Ozs7Ozs7O3VDQUtpQjtBQUNoQixXQUFJLFFBQVEsT0FBTyxVQUFQLElBQXFCLFNBQVMsZUFBVCxDQUF5QixXQUE5QyxJQUNQLFNBQVMsSUFBVCxDQUFjLFdBRG5CO0FBRUEsV0FBSSxRQUFRLEdBQVosRUFBaUI7QUFDZixnQkFBTyxDQUFQO0FBQ0Q7QUFDRCxjQUFPLENBQVA7QUFDRDs7Ozs7Ozs7a0NBS1k7QUFDWCxXQUFNLE1BQU0sS0FBSyxHQUFqQjtBQUNBLGFBQU0sb0JBQU4s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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXVEO0FBQ3ZELFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCwrRUFBOEU7QUFDOUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSx3Q0FBdUMsMEJBQTBCO0FBQ2pFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsMEJBQTBCLGVBQWU7QUFDeEU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDE1NGIxMWMwNzExOTg0ZjkyNjUwXG4gKiovIiwiLyogZ2xvYmFsIGdvb2dsZSAqL1xuLyogZXhwb3J0ZWQgaW5pdE1hcCAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnd2hhdHdnLWZldGNoJztcblxuLy8gTUFQXG5cbmNsYXNzIE1hcCB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmJ1aWxkTWFwKCk7XG4gICAgdGhpcy5nZXRFbnRyaWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IEdvb2dsZSBtYXBcbiAgICovXG4gIGJ1aWxkTWFwKCkge1xuICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLmVsZW1lbnQsIHtcbiAgICAgIGNlbnRlcjogeyBsYXQ6IDY0LjkzMTMsIGxuZzogLTE5LjAyMTIgfSxcbiAgICAgIHpvb206IHRoaXMuZ2V0Wm9vbUZvcldpZHRoKCksXG4gICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgIHNjYWxlQ29udHJvbDogdHJ1ZSxcbiAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWVcbiAgICB9KTtcblxuICAgIC8vIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIC8vICAgY29uc29sZS5sb2coZXZlbnQubGF0TG5nLmxhdCgpLCBldmVudC5sYXRMbmcubG5nKCkpO1xuICAgIC8vIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgem9vbSBsZXZlbCBmb3Igd2luZG93IHdpZHRoXG4gICAqL1xuICBnZXRab29tRm9yV2lkdGgoKSB7XG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgICB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIGlmICh3aWR0aCA8IDc2OCkge1xuICAgICAgcmV0dXJuIDU7XG4gICAgfVxuICAgIHJldHVybiA3O1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGVudHJpZXMgZnJvbSBzZXJ2ZXIgYW5kIGNyZWF0ZSBQaW5zXG4gICAqL1xuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwO1xuICAgIGZldGNoKCcvZGF0YS9lbnRyaWVzLmpzb24nKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZW50cmllcykge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICBuZXcgUGluKGVudHJ5LCBtYXApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG59XG5cbi8vIFBJTlxuXG5jbGFzcyBQaW4ge1xuXG4gIGNvbnN0cnVjdG9yKGVudHJ5LCBtYXApIHtcbiAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgdGhpcy5tYXAgPSBtYXA7XG5cbiAgICB0aGlzLmFkZE1hcmtlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBtYXJrZXIgdG8gdGhlIG1hcFxuICAgKi9cbiAgYWRkTWFya2VyKCkge1xuICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICBwb3NpdGlvbjogeyBsYXQ6IHRoaXMuZW50cnkuY29vcmRzWzBdLCBsbmc6IHRoaXMuZW50cnkuY29vcmRzWzFdIH0sXG4gICAgICBtYXA6IHRoaXMubWFwLFxuICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUCxcbiAgICAgIGxhYmVsOiB0aGlzLmVudHJ5LmlkLFxuICAgICAgdGl0bGU6IHRoaXMuZW50cnkudGl0bGVcbiAgICB9KTtcblxuICAgIHRoaXMubWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHdpbmRvdy5wYWdlLnJlbmRlcih0aGlzLmVudHJ5LmlkLCB0aGlzLmVudHJ5LnRpdGxlLCB0aGlzLmVudHJ5LmNvbnRlbnQpO1xuICAgICAgd2luZG93LnBhZ2UucmVuZGVyUGhvdG9zKHRoaXMuZW50cnkucGhvdG9zKTtcbiAgICAgIHdpbmRvdy5wYWdlLnNob3coKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBQQUdFXG5cbmNsYXNzIFBhZ2Uge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaWQgICAgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlkJyk7XG4gICAgdGhpcy50aXRsZSAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcbiAgICB0aGlzLmNvbnRlbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG4gICAgdGhpcy5jbG9zZSAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcbiAgICB0aGlzLnBob3RvcyAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waG90b3MnKTtcblxuICAgIHRoaXMuY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcihpZCwgdGl0bGUsIGNvbnRlbnQpIHtcbiAgICB0aGlzLmlkLnRleHRDb250ZW50ID0gaWQ7XG4gICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHRoaXMuY29udGVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIH1cblxuICByZW5kZXJQaG90b3MocGhvdG9zKSB7XG4gICAgdGhpcy5waG90b3MuaW5uZXJIVE1MID0gJyc7XG4gICAgcGhvdG9zLmZvckVhY2goKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IHBob3RvID0gbmV3IFBob3RvKGRhdGEuaWQsIGRhdGEuY2FwdGlvbik7XG4gICAgICB0aGlzLnBob3Rvcy5hcHBlbmRDaGlsZChwaG90by5lbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuXG4vLyBQSE9UT1xuXG5jbGFzcyBQaG90byB7XG5cbiAgY29uc3RydWN0b3IoaWQsIGNhcHRpb24pIHtcbiAgICB0aGlzLmlkICAgICAgPSBpZDtcbiAgICB0aGlzLmNhcHRpb24gPSBjYXB0aW9uO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGhvdG8nKTtcblxuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgndGh1bWJuYWlsJyk7XG4gICAgaW1hZ2Uuc3JjID0gYC9kYXRhL3RodW1icy8ke3RoaXMuaWR9LmpwZ2A7XG4gICAgaW1hZ2UuYWx0ID0gdGhpcy5jYXB0aW9uO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XG5cbiAgICAvLyBXaGVuIGltYWdlIGlzIGxvYWRlZFxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnJhdGlvID0gaW1hZ2UubmF0dXJhbFdpZHRoIC8gaW1hZ2UubmF0dXJhbEhlaWdodDtcblxuICAgICAgLy8gRGlzcGxheSBsaWdodGJveCB3aGVuIHBob3RvIGlzIGNsaWNrZWRcbiAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB3aW5kb3cubGlnaHRib3guc2hvdyh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ2NhcHRpb24nKTtcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gdGhpcy5jYXB0aW9uO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH1cbn1cblxuLy8gTElHSFRCT1hcblxuY2xhc3MgTGlnaHRib3gge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3ZlcmxheSA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0pXG4gIH1cblxuICBnZXREaW1lbnNpb25zKCkge1xuICAgIGNvbnN0IHcgPSB3aW5kb3csIGQgPSBkb2N1bWVudCwgZSA9IGQuZG9jdW1lbnRFbGVtZW50LCBnID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLFxuICAgICAgd2luZG93V2lkdGggPSB3LmlubmVyV2lkdGggfHwgZS5jbGllbnRXaWR0aCB8fCBnLmNsaWVudFdpZHRoLFxuICAgICAgd2luZG93SGVpZ2h0ID0gdy5pbm5lckhlaWdodHx8IGUuY2xpZW50SGVpZ2h0fHwgZy5jbGllbnRIZWlnaHQ7XG5cbiAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gd2luZG93SGVpZ2h0ICogMC45NSxcbiAgICAgIHRhcmdldFdpZHRoID0gdGFyZ2V0SGVpZ2h0ICogdGhpcy5pbWFnZVJhdGlvLFxuICAgICAgdGFyZ2V0VG9wID0gd2luZG93SGVpZ2h0ICogMC4wMjUsXG4gICAgICB0YXJnZXRMZWZ0ID0gd2luZG93V2lkdGggLyAyIC0gdGFyZ2V0V2lkdGggLyAyO1xuXG4gICAgaWYgKHRhcmdldFdpZHRoID4gd2luZG93V2lkdGggKiAwLjk1KSB7XG4gICAgICB0YXJnZXRXaWR0aCA9IHdpbmRvd1dpZHRoICogMC45NTtcbiAgICAgIHRhcmdldEhlaWdodCA9IHRhcmdldFdpZHRoIC8gdGhpcy5pbWFnZVJhdGlvO1xuICAgICAgdGFyZ2V0TGVmdCA9IHdpbmRvd1dpZHRoICogMC4wMjU7XG4gICAgICB0YXJnZXRUb3AgPSB3aW5kb3dIZWlnaHQgLyAyIC0gdGFyZ2V0SGVpZ2h0IC8gMjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiB0YXJnZXRUb3AsXG4gICAgICBsZWZ0OiB0YXJnZXRMZWZ0LFxuICAgICAgd2lkdGg6IHRhcmdldFdpZHRoLFxuICAgICAgaGVpZ2h0OiB0YXJnZXRIZWlnaHRcbiAgICB9O1xuICB9XG5cbiAgcmVzaXplKCkge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldERpbWVuc2lvbnMoKTtcblxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGggKyAncHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodCArICdweCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IGRpbWVuc2lvbnMudG9wICsgJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGRpbWVuc2lvbnMubGVmdCArICdweCc7XG4gIH1cblxuICBzaG93KHBob3RvKSB7XG5cbiAgICAvLyBEaXNwbGF5IGltYWdlIHdpdGggbG93LXJlcyBpbWFnZSBmb3IgZmFzdCBsb2FkaW5nXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRoaXMuaW1hZ2Uuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgvZGF0YS90aHVtYnMvJHtwaG90by5pZH0uanBnKWA7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaW1hZ2UpO1xuXG4gICAgdGhpcy5pbWFnZVJhdGlvID0gcGhvdG8ucmF0aW87XG4gICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMucmVzaXplKCk7XG4gICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAxO1xuXG4gICAgLy8gTG9hZCBoaWdoLXJlcyBpbWFnZVxuICAgIHRoaXMuaW1hZ2Uuc3JjID0gYC9kYXRhL3Bob3Rvcy8ke3Bob3RvLmlkfS5qcGdgO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlJyk7XG4gIGlmIChwYWdlKSB7XG4gICAgd2luZG93LnBhZ2UgPSBuZXcgUGFnZShwYWdlKTtcbiAgfVxuICBjb25zdCBsaWdodGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaWdodGJveCcpO1xuICBpZiAobGlnaHRib3gpIHtcbiAgICB3aW5kb3cubGlnaHRib3ggPSBuZXcgTGlnaHRib3gobGlnaHRib3gpO1xuICB9XG59KTtcblxuLyoqXG4gKiBDYWxsZWQgYnkgR29vZ2xlIE1hcHMgQVBJIEpTIHdoZW4gbG9hZGVkXG4gKi9cbmdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgY29uc3QgbWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcCcpO1xuICBpZiAobWFwKSB7XG4gICAgbmV3IE1hcChtYXApO1xuICB9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXBwLmpzXG4gKiovIiwiKGZ1bmN0aW9uKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjogJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiYgJ0Jsb2InIGluIHNlbGYgJiYgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIGxpc3QgPSB0aGlzLm1hcFtuYW1lXVxuICAgIGlmICghbGlzdCkge1xuICAgICAgbGlzdCA9IFtdXG4gICAgICB0aGlzLm1hcFtuYW1lXSA9IGxpc3RcbiAgICB9XG4gICAgbGlzdC5wdXNoKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICAgIHJldHVybiB2YWx1ZXMgPyB2YWx1ZXNbMF0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldIHx8IFtdXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gW25vcm1hbGl6ZVZhbHVlKHZhbHVlKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubWFwKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMubWFwW25hbWVdLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcylcbiAgICAgIH0sIHRoaXMpXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIC8vIE9ubHkgc3VwcG9ydCBBcnJheUJ1ZmZlcnMgZm9yIFBPU1QgbWV0aG9kLlxuICAgICAgICAvLyBSZWNlaXZpbmcgQXJyYXlCdWZmZXJzIGhhcHBlbnMgdmlhIEJsb2JzLCBpbnN0ZWFkLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkID8gcmVqZWN0ZWQgOiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG4gICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpKSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gaW5wdXRcbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gaGVhZGVycyh4aHIpIHtcbiAgICB2YXIgaGVhZCA9IG5ldyBIZWFkZXJzKClcbiAgICB2YXIgcGFpcnMgPSAoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKS50cmltKCkuc3BsaXQoJ1xcbicpXG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHZhciBzcGxpdCA9IGhlYWRlci50cmltKCkuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHNwbGl0LnNoaWZ0KCkudHJpbSgpXG4gICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc6JykudHJpbSgpXG4gICAgICBoZWFkLmFwcGVuZChrZXksIHZhbHVlKVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1c1xuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBvcHRpb25zLnN0YXR1c1RleHRcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzID8gb3B0aW9ucy5oZWFkZXJzIDogbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdFxuICAgICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpICYmICFpbml0KSB7XG4gICAgICAgIHJlcXVlc3QgPSBpbnB1dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgfVxuXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgZnVuY3Rpb24gcmVzcG9uc2VVUkwoKSB7XG4gICAgICAgIGlmICgncmVzcG9uc2VVUkwnIGluIHhocikge1xuICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF2b2lkIHNlY3VyaXR5IHdhcm5pbmdzIG9uIGdldFJlc3BvbnNlSGVhZGVyIHdoZW4gbm90IGFsbG93ZWQgYnkgQ09SU1xuICAgICAgICBpZiAoL15YLVJlcXVlc3QtVVJMOi9tLnRlc3QoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSkge1xuICAgICAgICAgIHJldHVybiB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMoeGhyKSxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVVJMKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd2hhdHdnLWZldGNoL2ZldGNoLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==