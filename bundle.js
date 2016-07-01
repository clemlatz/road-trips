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
	    _classCallCheck(this, Lightbox);
	
	    this.element = element;
	    this.overlay = element.parentNode;
	
	    this.overlay.addEventListener('click', this.hide.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjA2MGFkYWNkZWNiMjQ0NWQzYmQiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL34vd2hhdHdnLWZldGNoL2ZldGNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDbkNBOzs7O0FBRUE7Ozs7OztLQUlNLEc7QUFFSixnQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFVBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEsVUFBSyxRQUFMO0FBQ0EsVUFBSyxVQUFMO0FBQ0Q7Ozs7Ozs7OztnQ0FLVTtBQUNULFlBQUssR0FBTCxHQUFXLElBQUksT0FBTyxJQUFQLENBQVksR0FBaEIsQ0FBb0IsS0FBSyxPQUF6QixFQUFrQztBQUMzQyxpQkFBUSxFQUFFLEtBQUssT0FBUCxFQUFnQixLQUFLLENBQUMsT0FBdEIsRUFEbUM7QUFFM0MsZUFBTSxLQUFLLGVBQUwsRUFGcUM7QUFHM0Msc0JBQWEsSUFIOEI7QUFJM0MsdUJBQWMsSUFKNkI7QUFLM0MsMkJBQWtCO0FBTHlCLFFBQWxDLENBQVg7Ozs7O0FBV0Q7Ozs7Ozs7O3VDQUtpQjtBQUNoQixXQUFJLFFBQVEsT0FBTyxVQUFQLElBQXFCLFNBQVMsZUFBVCxDQUF5QixXQUE5QyxJQUNQLFNBQVMsSUFBVCxDQUFjLFdBRG5CO0FBRUEsV0FBSSxRQUFRLEdBQVosRUFBaUI7QUFDZixnQkFBTyxDQUFQO0FBQ0Q7QUFDRCxjQUFPLENBQVA7QUFDRDs7Ozs7Ozs7a0NBS1k7QUFDWCxXQUFNLE1BQU0sS0FBSyxHQUFqQjtBQUNBLGFBQU0sb0JBQU4s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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXVEO0FBQ3ZELFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCwrRUFBOEU7QUFDOUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSx3Q0FBdUMsMEJBQTBCO0FBQ2pFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsMEJBQTBCLGVBQWU7QUFDeEU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDYwNjBhZGFjZGVjYjI0NDVkM2JkXG4gKiovIiwiLyogZ2xvYmFsIGdvb2dsZSAqL1xuLyogZXhwb3J0ZWQgaW5pdE1hcCAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnd2hhdHdnLWZldGNoJztcblxuLy8gTUFQXG5cbmNsYXNzIE1hcCB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmJ1aWxkTWFwKCk7XG4gICAgdGhpcy5nZXRFbnRyaWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IEdvb2dsZSBtYXBcbiAgICovXG4gIGJ1aWxkTWFwKCkge1xuICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLmVsZW1lbnQsIHtcbiAgICAgIGNlbnRlcjogeyBsYXQ6IDY0LjkzMTMsIGxuZzogLTE5LjAyMTIgfSxcbiAgICAgIHpvb206IHRoaXMuZ2V0Wm9vbUZvcldpZHRoKCksXG4gICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgIHNjYWxlQ29udHJvbDogdHJ1ZSxcbiAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWVcbiAgICB9KTtcblxuICAgIC8vIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIC8vICAgY29uc29sZS5sb2coZXZlbnQubGF0TG5nLmxhdCgpLCBldmVudC5sYXRMbmcubG5nKCkpO1xuICAgIC8vIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgem9vbSBsZXZlbCBmb3Igd2luZG93IHdpZHRoXG4gICAqL1xuICBnZXRab29tRm9yV2lkdGgoKSB7XG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgICB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIGlmICh3aWR0aCA8IDc2OCkge1xuICAgICAgcmV0dXJuIDU7XG4gICAgfVxuICAgIHJldHVybiA3O1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGVudHJpZXMgZnJvbSBzZXJ2ZXIgYW5kIGNyZWF0ZSBQaW5zXG4gICAqL1xuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwO1xuICAgIGZldGNoKCcvZGF0YS9lbnRyaWVzLmpzb24nKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZW50cmllcykge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICBuZXcgUGluKGVudHJ5LCBtYXApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG59XG5cbi8vIFBJTlxuXG5jbGFzcyBQaW4ge1xuXG4gIGNvbnN0cnVjdG9yKGVudHJ5LCBtYXApIHtcbiAgICB0aGlzLmVudHJ5ID0gZW50cnk7XG4gICAgdGhpcy5tYXAgPSBtYXA7XG5cbiAgICB0aGlzLmFkZE1hcmtlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBtYXJrZXIgdG8gdGhlIG1hcFxuICAgKi9cbiAgYWRkTWFya2VyKCkge1xuICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICBwb3NpdGlvbjogeyBsYXQ6IHRoaXMuZW50cnkuY29vcmRzWzBdLCBsbmc6IHRoaXMuZW50cnkuY29vcmRzWzFdIH0sXG4gICAgICBtYXA6IHRoaXMubWFwLFxuICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUCxcbiAgICAgIGxhYmVsOiB0aGlzLmVudHJ5LmlkLFxuICAgICAgdGl0bGU6IHRoaXMuZW50cnkudGl0bGVcbiAgICB9KTtcblxuICAgIHRoaXMubWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHdpbmRvdy5wYWdlLnJlbmRlcih0aGlzLmVudHJ5LmlkLCB0aGlzLmVudHJ5LnRpdGxlLCB0aGlzLmVudHJ5LmNvbnRlbnQpO1xuICAgICAgd2luZG93LnBhZ2UucmVuZGVyUGhvdG9zKHRoaXMuZW50cnkucGhvdG9zKTtcbiAgICAgIHdpbmRvdy5wYWdlLnNob3coKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBQQUdFXG5cbmNsYXNzIFBhZ2Uge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaWQgICAgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlkJyk7XG4gICAgdGhpcy50aXRsZSAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcbiAgICB0aGlzLmNvbnRlbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG4gICAgdGhpcy5jbG9zZSAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcbiAgICB0aGlzLnBob3RvcyAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waG90b3MnKTtcblxuICAgIHRoaXMuY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcihpZCwgdGl0bGUsIGNvbnRlbnQpIHtcbiAgICB0aGlzLmlkLnRleHRDb250ZW50ID0gaWQ7XG4gICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHRoaXMuY29udGVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIH1cblxuICByZW5kZXJQaG90b3MocGhvdG9zKSB7XG4gICAgdGhpcy5waG90b3MuaW5uZXJIVE1MID0gJyc7XG4gICAgcGhvdG9zLmZvckVhY2goKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IHBob3RvID0gbmV3IFBob3RvKGRhdGEuaWQsIGRhdGEuY2FwdGlvbik7XG4gICAgICB0aGlzLnBob3Rvcy5hcHBlbmRDaGlsZChwaG90by5lbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuXG4vLyBQSE9UT1xuXG5jbGFzcyBQaG90byB7XG5cbiAgY29uc3RydWN0b3IoaWQsIGNhcHRpb24pIHtcbiAgICB0aGlzLmlkICAgICAgPSBpZDtcbiAgICB0aGlzLmNhcHRpb24gPSBjYXB0aW9uO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGhvdG8nKTtcblxuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgndGh1bWJuYWlsJyk7XG4gICAgaW1hZ2Uuc3JjID0gYC9kYXRhL3RodW1icy8ke3RoaXMuaWR9LmpwZ2A7XG4gICAgaW1hZ2UuYWx0ID0gdGhpcy5jYXB0aW9uO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XG5cbiAgICAvLyBXaGVuIGltYWdlIGlzIGxvYWRlZFxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnJhdGlvID0gaW1hZ2UubmF0dXJhbFdpZHRoIC8gaW1hZ2UubmF0dXJhbEhlaWdodDtcblxuICAgICAgLy8gRGlzcGxheSBsaWdodGJveCB3aGVuIHBob3RvIGlzIGNsaWNrZWRcbiAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB3aW5kb3cubGlnaHRib3guc2hvdyh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ2NhcHRpb24nKTtcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gdGhpcy5jYXB0aW9uO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH1cbn1cblxuLy8gTElHSFRCT1hcblxuY2xhc3MgTGlnaHRib3gge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3ZlcmxheSA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGdldERpbWVuc2lvbnMoKSB7XG4gICAgY29uc3QgdyA9IHdpbmRvdywgZCA9IGRvY3VtZW50LCBlID0gZC5kb2N1bWVudEVsZW1lbnQsIGcgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0sXG4gICAgICB3aW5kb3dXaWR0aCA9IHcuaW5uZXJXaWR0aCB8fCBlLmNsaWVudFdpZHRoIHx8IGcuY2xpZW50V2lkdGgsXG4gICAgICB3aW5kb3dIZWlnaHQgPSB3LmlubmVySGVpZ2h0fHwgZS5jbGllbnRIZWlnaHR8fCBnLmNsaWVudEhlaWdodDtcblxuICAgIGxldCB0YXJnZXRIZWlnaHQgPSB3aW5kb3dIZWlnaHQgKiAwLjk1LFxuICAgICAgdGFyZ2V0V2lkdGggPSB0YXJnZXRIZWlnaHQgKiB0aGlzLmltYWdlUmF0aW8sXG4gICAgICB0YXJnZXRUb3AgPSB3aW5kb3dIZWlnaHQgKiAwLjAyNSxcbiAgICAgIHRhcmdldExlZnQgPSB3aW5kb3dXaWR0aCAvIDIgLSB0YXJnZXRXaWR0aCAvIDI7XG5cbiAgICBpZiAodGFyZ2V0V2lkdGggPiB3aW5kb3dXaWR0aCAqIDAuOTUpIHtcbiAgICAgIHRhcmdldFdpZHRoID0gd2luZG93V2lkdGggKiAwLjk1O1xuICAgICAgdGFyZ2V0SGVpZ2h0ID0gdGFyZ2V0V2lkdGggLyB0aGlzLmltYWdlUmF0aW87XG4gICAgICB0YXJnZXRMZWZ0ID0gd2luZG93V2lkdGggKiAwLjAyNTtcbiAgICAgIHRhcmdldFRvcCA9IHdpbmRvd0hlaWdodCAvIDIgLSB0YXJnZXRIZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHRhcmdldFRvcCxcbiAgICAgIGxlZnQ6IHRhcmdldExlZnQsXG4gICAgICB3aWR0aDogdGFyZ2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IHRhcmdldEhlaWdodFxuICAgIH07XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuZ2V0RGltZW5zaW9ucygpO1xuXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gZGltZW5zaW9ucy53aWR0aCArICdweCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0ICsgJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gZGltZW5zaW9ucy50b3AgKyAncHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gZGltZW5zaW9ucy5sZWZ0ICsgJ3B4JztcbiAgfVxuXG4gIHNob3cocGhvdG8pIHtcblxuICAgIC8vIERpc3BsYXkgaW1hZ2Ugd2l0aCBsb3ctcmVzIGltYWdlIGZvciBmYXN0IGxvYWRpbmdcbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgdGhpcy5pbWFnZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC9kYXRhL3RodW1icy8ke3Bob3RvLmlkfS5qcGcpYDtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICB0aGlzLmltYWdlUmF0aW8gPSBwaG90by5yYXRpbztcbiAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9IDE7XG5cbiAgICAvLyBMb2FkIGhpZ2gtcmVzIGltYWdlXG4gICAgdGhpcy5pbWFnZS5zcmMgPSBgL2RhdGEvcGhvdG9zLyR7cGhvdG8uaWR9LmpwZ2A7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UnKTtcbiAgaWYgKHBhZ2UpIHtcbiAgICB3aW5kb3cucGFnZSA9IG5ldyBQYWdlKHBhZ2UpO1xuICB9XG4gIGNvbnN0IGxpZ2h0Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpZ2h0Ym94Jyk7XG4gIGlmIChsaWdodGJveCkge1xuICAgIHdpbmRvdy5saWdodGJveCA9IG5ldyBMaWdodGJveChsaWdodGJveCk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIENhbGxlZCBieSBHb29nbGUgTWFwcyBBUEkgSlMgd2hlbiBsb2FkZWRcbiAqL1xuZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBtYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFwJyk7XG4gIGlmIChtYXApIHtcbiAgICBuZXcgTWFwKG1hcCk7XG4gIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAuanNcbiAqKi8iLCIoZnVuY3Rpb24oc2VsZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG5cbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgICB2YXIgbGlzdCA9IHRoaXMubWFwW25hbWVdXG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICBsaXN0ID0gW11cbiAgICAgIHRoaXMubWFwW25hbWVdID0gbGlzdFxuICAgIH1cbiAgICBsaXN0LnB1c2godmFsdWUpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gICAgcmV0dXJuIHZhbHVlcyA/IHZhbHVlc1swXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gfHwgW11cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBbbm9ybWFsaXplVmFsdWUodmFsdWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tYXApLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5tYXBbbmFtZV0uZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKVxuICAgICAgfSwgdGhpcylcbiAgICB9LCB0aGlzKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gICAgfVxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gICAgcmV0dXJuIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICAgIHJldHVybiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICAgIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgLy8gT25seSBzdXBwb3J0IEFycmF5QnVmZmVycyBmb3IgUE9TVCBtZXRob2QuXG4gICAgICAgIC8vIFJlY2VpdmluZyBBcnJheUJ1ZmZlcnMgaGFwcGVucyB2aWEgQmxvYnMsIGluc3RlYWQuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgIH1cblxuICAgICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICByZXR1cm4gcmVqZWN0ZWQgPyByZWplY3RlZCA6IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcbiAgICBpZiAoUmVxdWVzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihpbnB1dCkpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBpbnB1dFxuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpXG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBoZWFkZXJzKHhocikge1xuICAgIHZhciBoZWFkID0gbmV3IEhlYWRlcnMoKVxuICAgIHZhciBwYWlycyA9ICh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpLnRyaW0oKS5zcGxpdCgnXFxuJylcbiAgICBwYWlycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgdmFyIHNwbGl0ID0gaGVhZGVyLnRyaW0oKS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gc3BsaXQuc2hpZnQoKS50cmltKClcbiAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJzonKS50cmltKClcbiAgICAgIGhlYWQuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgfSlcbiAgICByZXR1cm4gaGVhZFxuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzXG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICAgIHRoaXMuc3RhdHVzVGV4dCA9IG9wdGlvbnMuc3RhdHVzVGV4dFxuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMgPyBvcHRpb25zLmhlYWRlcnMgOiBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0XG4gICAgICBpZiAoUmVxdWVzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihpbnB1dCkgJiYgIWluaXQpIHtcbiAgICAgICAgcmVxdWVzdCA9IGlucHV0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICBmdW5jdGlvbiByZXNwb25zZVVSTCgpIHtcbiAgICAgICAgaWYgKCdyZXNwb25zZVVSTCcgaW4geGhyKSB7XG4gICAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVVSTFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXZvaWQgc2VjdXJpdHkgd2FybmluZ3Mgb24gZ2V0UmVzcG9uc2VIZWFkZXIgd2hlbiBub3QgYWxsb3dlZCBieSBDT1JTXG4gICAgICAgIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVycyh4aHIpLFxuICAgICAgICAgIHVybDogcmVzcG9uc2VVUkwoKVxuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi93aGF0d2ctZmV0Y2gvZmV0Y2guanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9