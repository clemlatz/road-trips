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
/***/ (function(module, exports, __webpack_require__) {

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
	
	      google.maps.event.addListener(this.map, 'click', function (event) {
	        console.log(event.latLng.lat(), event.latLng.lng());
	      });
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
	      fetch('data/entries.json').then(function (response) {
	        return response.json();
	      }).then(function (entries) {
	        var delay = 0;
	        entries.forEach(function (entry) {
	          (function (delay) {
	            window.setTimeout(function () {
	              new Pin(entry, map);
	            }, delay);
	          })(delay);
	          delay += 100;
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
	        window.page.render(_this.entry.id, _this.entry.title, _this.entry.date, _this.entry.content);
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
	    this.date = element.querySelector('.date');
	    this.content = element.querySelector('.content');
	    this.close = element.querySelector('.close');
	    this.photos = element.querySelector('.photos');
	
	    this.close.addEventListener('click', function () {
	      _this2.hide();
	    });
	  }
	
	  _createClass(Page, [{
	    key: 'render',
	    value: function render(id, title, date, content) {
	      this.id.textContent = id;
	      this.title.textContent = title;
	      this.date.textContent = date;
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
	      image.src = 'data/thumbs/' + this.id + '.jpg';
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
	      this.image.style.backgroundImage = 'url(data/thumbs/' + photo.id + '.jpg)';
	      this.element.appendChild(this.image);
	
	      this.imageRatio = photo.ratio;
	      this.overlay.style.display = 'block';
	      this.resize();
	      this.overlay.style.opacity = 1;
	
	      // Load high-res image
	      this.image.src = 'data/photos/' + photo.id + '.jpg';
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
	
	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]
	
	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }
	
	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
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
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }
	
	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)
	
	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }
	
	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
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
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }
	
	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }
	
	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
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
	
	    if (typeof input === 'string') {
	      this.url = input
	    } else {
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
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
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
	    return new Request(this, { body: this._bodyInit })
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
	
	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split('\r\n').forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
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
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTRjNjdmNzgwNTE2Y2JjMTQ2ODAiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL34vd2hhdHdnLWZldGNoL2ZldGNoLmpzIl0sIm5hbWVzIjpbIk1hcCIsImVsZW1lbnQiLCJidWlsZE1hcCIsImdldEVudHJpZXMiLCJtYXAiLCJnb29nbGUiLCJtYXBzIiwiY2VudGVyIiwibGF0IiwibG5nIiwiem9vbSIsImdldFpvb21Gb3JXaWR0aCIsInpvb21Db250cm9sIiwic2NhbGVDb250cm9sIiwiZGlzYWJsZURlZmF1bHRVSSIsImV2ZW50IiwiYWRkTGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwibGF0TG5nIiwid2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImJvZHkiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJlbnRyaWVzIiwiZGVsYXkiLCJmb3JFYWNoIiwiZW50cnkiLCJzZXRUaW1lb3V0IiwiUGluIiwiYWRkTWFya2VyIiwibWFya2VyIiwiTWFya2VyIiwicG9zaXRpb24iLCJjb29yZHMiLCJhbmltYXRpb24iLCJBbmltYXRpb24iLCJEUk9QIiwibGFiZWwiLCJpZCIsInRpdGxlIiwicGFnZSIsInJlbmRlciIsImRhdGUiLCJjb250ZW50IiwicmVuZGVyUGhvdG9zIiwicGhvdG9zIiwic2hvdyIsIlBhZ2UiLCJxdWVyeVNlbGVjdG9yIiwiY2xvc2UiLCJhZGRFdmVudExpc3RlbmVyIiwiaGlkZSIsInRleHRDb250ZW50IiwiaW5uZXJIVE1MIiwiZGF0YSIsInBob3RvIiwiUGhvdG8iLCJjYXB0aW9uIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImRpc3BsYXkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW1hZ2UiLCJzcmMiLCJhbHQiLCJyYXRpbyIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJsaWdodGJveCIsInRleHQiLCJMaWdodGJveCIsIm92ZXJsYXkiLCJwYXJlbnROb2RlIiwiYmluZCIsInJlc2l6ZSIsInciLCJkIiwiZSIsImciLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJ0YXJnZXRIZWlnaHQiLCJ0YXJnZXRXaWR0aCIsImltYWdlUmF0aW8iLCJ0YXJnZXRUb3AiLCJ0YXJnZXRMZWZ0IiwidG9wIiwibGVmdCIsImhlaWdodCIsImRpbWVuc2lvbnMiLCJnZXREaW1lbnNpb25zIiwiYmFja2dyb3VuZEltYWdlIiwib3BhY2l0eSIsImFkZERvbUxpc3RlbmVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBOztBQUVBOzs7O0FBRUE7Ozs7QUFFQTs7S0FFTUEsRztBQUVKLGdCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFVBQUtBLE9BQUwsR0FBZUEsT0FBZjs7QUFFQSxVQUFLQyxRQUFMO0FBQ0EsVUFBS0MsVUFBTDtBQUNEOztBQUVEOzs7Ozs7O2dDQUdXO0FBQ1QsWUFBS0MsR0FBTCxHQUFXLElBQUlDLE9BQU9DLElBQVAsQ0FBWU4sR0FBaEIsQ0FBb0IsS0FBS0MsT0FBekIsRUFBa0M7QUFDM0NNLGlCQUFRLEVBQUVDLEtBQUssT0FBUCxFQUFnQkMsS0FBSyxDQUFDLE9BQXRCLEVBRG1DO0FBRTNDQyxlQUFNLEtBQUtDLGVBQUwsRUFGcUM7QUFHM0NDLHNCQUFhLElBSDhCO0FBSTNDQyx1QkFBYyxJQUo2QjtBQUszQ0MsMkJBQWtCO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBOEIsdUJBQXVCO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0Esd0NBQXVDLDBCQUEwQjtBQUNqRTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLDBCQUEwQixlQUFlO0FBQ3hFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTRjNjdmNzgwNTE2Y2JjMTQ2ODAiLCIvKiBnbG9iYWwgZ29vZ2xlICovXG4vKiBleHBvcnRlZCBpbml0TWFwICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuXG4vLyBNQVBcblxuY2xhc3MgTWFwIHtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIHRoaXMuYnVpbGRNYXAoKTtcbiAgICB0aGlzLmdldEVudHJpZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgR29vZ2xlIG1hcFxuICAgKi9cbiAgYnVpbGRNYXAoKSB7XG4gICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKHRoaXMuZWxlbWVudCwge1xuICAgICAgY2VudGVyOiB7IGxhdDogNjQuOTMxMywgbG5nOiAtMTkuMDIxMiB9LFxuICAgICAgem9vbTogdGhpcy5nZXRab29tRm9yV2lkdGgoKSxcbiAgICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxuICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXAsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBjb25zb2xlLmxvZyhldmVudC5sYXRMbmcubGF0KCksIGV2ZW50LmxhdExuZy5sbmcoKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB6b29tIGxldmVsIGZvciB3aW5kb3cgd2lkdGhcbiAgICovXG4gIGdldFpvb21Gb3JXaWR0aCgpIHtcbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICAgIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gICAgaWYgKHdpZHRoIDwgNzY4KSB7XG4gICAgICByZXR1cm4gNTtcbiAgICB9XG4gICAgcmV0dXJuIDc7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggZW50cmllcyBmcm9tIHNlcnZlciBhbmQgY3JlYXRlIFBpbnNcbiAgICovXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXA7XG4gICAgZmV0Y2goJ2RhdGEvZW50cmllcy5qc29uJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKGVudHJpZXMpIHtcbiAgICAgICAgbGV0IGRlbGF5ID0gMDtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgKGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIG5ldyBQaW4oZW50cnksIG1hcCk7XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgfSkoZGVsYXkpO1xuICAgICAgICAgIGRlbGF5ICs9IDEwMDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG4vLyBQSU5cblxuY2xhc3MgUGluIHtcblxuICBjb25zdHJ1Y3RvcihlbnRyeSwgbWFwKSB7XG4gICAgdGhpcy5lbnRyeSA9IGVudHJ5O1xuICAgIHRoaXMubWFwID0gbWFwO1xuXG4gICAgdGhpcy5hZGRNYXJrZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbWFya2VyIHRvIHRoZSBtYXBcbiAgICovXG4gIGFkZE1hcmtlcigpIHtcbiAgICB0aGlzLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IHsgbGF0OiB0aGlzLmVudHJ5LmNvb3Jkc1swXSwgbG5nOiB0aGlzLmVudHJ5LmNvb3Jkc1sxXSB9LFxuICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXG4gICAgICBsYWJlbDogdGhpcy5lbnRyeS5pZCxcbiAgICAgIHRpdGxlOiB0aGlzLmVudHJ5LnRpdGxlXG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB3aW5kb3cucGFnZS5yZW5kZXIodGhpcy5lbnRyeS5pZCwgdGhpcy5lbnRyeS50aXRsZSwgdGhpcy5lbnRyeS5kYXRlLCB0aGlzLmVudHJ5LmNvbnRlbnQpO1xuICAgICAgd2luZG93LnBhZ2UucmVuZGVyUGhvdG9zKHRoaXMuZW50cnkucGhvdG9zKTtcbiAgICAgIHdpbmRvdy5wYWdlLnNob3coKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBQQUdFXG5cbmNsYXNzIFBhZ2Uge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaWQgICAgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlkJyk7XG4gICAgdGhpcy50aXRsZSAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcbiAgICB0aGlzLmRhdGUgICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRlJyk7XG4gICAgdGhpcy5jb250ZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICAgIHRoaXMuY2xvc2UgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJyk7XG4gICAgdGhpcy5waG90b3MgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGhvdG9zJyk7XG5cbiAgICB0aGlzLmNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoaWQsIHRpdGxlLCBkYXRlLCBjb250ZW50KSB7XG4gICAgdGhpcy5pZC50ZXh0Q29udGVudCA9IGlkO1xuICAgIHRoaXMudGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICB0aGlzLmRhdGUudGV4dENvbnRlbnQgPSBkYXRlO1xuICAgIHRoaXMuY29udGVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gIH1cblxuICByZW5kZXJQaG90b3MocGhvdG9zKSB7XG4gICAgdGhpcy5waG90b3MuaW5uZXJIVE1MID0gJyc7XG4gICAgcGhvdG9zLmZvckVhY2goKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IHBob3RvID0gbmV3IFBob3RvKGRhdGEuaWQsIGRhdGEuY2FwdGlvbik7XG4gICAgICB0aGlzLnBob3Rvcy5hcHBlbmRDaGlsZChwaG90by5lbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuXG4vLyBQSE9UT1xuXG5jbGFzcyBQaG90byB7XG5cbiAgY29uc3RydWN0b3IoaWQsIGNhcHRpb24pIHtcbiAgICB0aGlzLmlkICAgICAgPSBpZDtcbiAgICB0aGlzLmNhcHRpb24gPSBjYXB0aW9uO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGhvdG8nKTtcblxuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgndGh1bWJuYWlsJyk7XG4gICAgaW1hZ2Uuc3JjID0gYGRhdGEvdGh1bWJzLyR7dGhpcy5pZH0uanBnYDtcbiAgICBpbWFnZS5hbHQgPSB0aGlzLmNhcHRpb247XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGltYWdlKTtcblxuICAgIC8vIFdoZW4gaW1hZ2UgaXMgbG9hZGVkXG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIHRoaXMucmF0aW8gPSBpbWFnZS5uYXR1cmFsV2lkdGggLyBpbWFnZS5uYXR1cmFsSGVpZ2h0O1xuXG4gICAgICAvLyBEaXNwbGF5IGxpZ2h0Ym94IHdoZW4gcGhvdG8gaXMgY2xpY2tlZFxuICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5saWdodGJveC5zaG93KHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRleHQuY2xhc3NMaXN0LmFkZCgnY2FwdGlvbicpO1xuICAgIHRleHQudGV4dENvbnRlbnQgPSB0aGlzLmNhcHRpb247XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRleHQpO1xuXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgfVxufVxuXG4vLyBMSUdIVEJPWFxuXG5jbGFzcyBMaWdodGJveCB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vdmVybGF5ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG4gICAgdGhpcy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlLmJpbmQodGhpcykpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXREaW1lbnNpb25zKCkge1xuICAgIGNvbnN0IHcgPSB3aW5kb3csIGQgPSBkb2N1bWVudCwgZSA9IGQuZG9jdW1lbnRFbGVtZW50LCBnID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLFxuICAgICAgd2luZG93V2lkdGggPSB3LmlubmVyV2lkdGggfHwgZS5jbGllbnRXaWR0aCB8fCBnLmNsaWVudFdpZHRoLFxuICAgICAgd2luZG93SGVpZ2h0ID0gdy5pbm5lckhlaWdodHx8IGUuY2xpZW50SGVpZ2h0fHwgZy5jbGllbnRIZWlnaHQ7XG5cbiAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gd2luZG93SGVpZ2h0ICogMC45NSxcbiAgICAgIHRhcmdldFdpZHRoID0gdGFyZ2V0SGVpZ2h0ICogdGhpcy5pbWFnZVJhdGlvLFxuICAgICAgdGFyZ2V0VG9wID0gd2luZG93SGVpZ2h0ICogMC4wMjUsXG4gICAgICB0YXJnZXRMZWZ0ID0gd2luZG93V2lkdGggLyAyIC0gdGFyZ2V0V2lkdGggLyAyO1xuXG4gICAgaWYgKHRhcmdldFdpZHRoID4gd2luZG93V2lkdGggKiAwLjk1KSB7XG4gICAgICB0YXJnZXRXaWR0aCA9IHdpbmRvd1dpZHRoICogMC45NTtcbiAgICAgIHRhcmdldEhlaWdodCA9IHRhcmdldFdpZHRoIC8gdGhpcy5pbWFnZVJhdGlvO1xuICAgICAgdGFyZ2V0TGVmdCA9IHdpbmRvd1dpZHRoICogMC4wMjU7XG4gICAgICB0YXJnZXRUb3AgPSB3aW5kb3dIZWlnaHQgLyAyIC0gdGFyZ2V0SGVpZ2h0IC8gMjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiB0YXJnZXRUb3AsXG4gICAgICBsZWZ0OiB0YXJnZXRMZWZ0LFxuICAgICAgd2lkdGg6IHRhcmdldFdpZHRoLFxuICAgICAgaGVpZ2h0OiB0YXJnZXRIZWlnaHRcbiAgICB9O1xuICB9XG5cbiAgcmVzaXplKCkge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSB0aGlzLmdldERpbWVuc2lvbnMoKTtcblxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGggKyAncHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodCArICdweCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IGRpbWVuc2lvbnMudG9wICsgJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGRpbWVuc2lvbnMubGVmdCArICdweCc7XG4gIH1cblxuICBzaG93KHBob3RvKSB7XG5cbiAgICAvLyBEaXNwbGF5IGltYWdlIHdpdGggbG93LXJlcyBpbWFnZSBmb3IgZmFzdCBsb2FkaW5nXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRoaXMuaW1hZ2Uuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChkYXRhL3RodW1icy8ke3Bob3RvLmlkfS5qcGcpYDtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICB0aGlzLmltYWdlUmF0aW8gPSBwaG90by5yYXRpbztcbiAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9IDE7XG5cbiAgICAvLyBMb2FkIGhpZ2gtcmVzIGltYWdlXG4gICAgdGhpcy5pbWFnZS5zcmMgPSBgZGF0YS9waG90b3MvJHtwaG90by5pZH0uanBnYDtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZScpO1xuICBpZiAocGFnZSkge1xuICAgIHdpbmRvdy5wYWdlID0gbmV3IFBhZ2UocGFnZSk7XG4gIH1cbiAgY29uc3QgbGlnaHRib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGlnaHRib3gnKTtcbiAgaWYgKGxpZ2h0Ym94KSB7XG4gICAgd2luZG93LmxpZ2h0Ym94ID0gbmV3IExpZ2h0Ym94KGxpZ2h0Ym94KTtcbiAgfVxufSk7XG5cbi8qKlxuICogQ2FsbGVkIGJ5IEdvb2dsZSBNYXBzIEFQSSBKUyB3aGVuIGxvYWRlZFxuICovXG5nb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXAnKTtcbiAgaWYgKG1hcCkge1xuICAgIG5ldyBNYXAobWFwKTtcbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiLCIoZnVuY3Rpb24oc2VsZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfVxuXG4gIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gICAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gICAgXVxuXG4gICAgdmFyIGlzRGF0YVZpZXcgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICAgIH1cblxuICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyLmlzVmlldyB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG5cbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgICB2YXIgbGlzdCA9IHRoaXMubWFwW25hbWVdXG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICBsaXN0ID0gW11cbiAgICAgIHRoaXMubWFwW25hbWVdID0gbGlzdFxuICAgIH1cbiAgICBsaXN0LnB1c2godmFsdWUpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gICAgcmV0dXJuIHZhbHVlcyA/IHZhbHVlc1swXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gfHwgW11cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBbbm9ybWFsaXplVmFsdWUodmFsdWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tYXApLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5tYXBbbmFtZV0uZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKVxuICAgICAgfSwgdGhpcylcbiAgICB9LCB0aGlzKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gICAgfVxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxuICAgICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcbiAgICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKVxuICAgICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgQm9keUluaXQgdHlwZScpXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIChtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSkgPyB1cGNhc2VkIDogbWV0aG9kXG4gIH1cblxuICBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudXJsID0gaW5wdXRcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpXG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7IGJvZHk6IHRoaXMuX2JvZHlJbml0IH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LnRyaW0oKS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gICAgcmF3SGVhZGVycy5zcGxpdCgnXFxyXFxuJykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaGVhZGVyc1xuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9ICdzdGF0dXMnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1cyA6IDIwMFxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd2hhdHdnLWZldGNoL2ZldGNoLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=