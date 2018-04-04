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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTRjNjdmNzgwNTE2Y2JjMTQ2ODAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9+L3doYXR3Zy1mZXRjaC9mZXRjaC5qcyJdLCJuYW1lcyI6WyJNYXAiLCJlbGVtZW50IiwiYnVpbGRNYXAiLCJnZXRFbnRyaWVzIiwibWFwIiwiZ29vZ2xlIiwibWFwcyIsImNlbnRlciIsImxhdCIsImxuZyIsInpvb20iLCJnZXRab29tRm9yV2lkdGgiLCJ6b29tQ29udHJvbCIsInNjYWxlQ29udHJvbCIsImRpc2FibGVEZWZhdWx0VUkiLCJldmVudCIsImFkZExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsImxhdExuZyIsIndpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJib2R5IiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZW50cmllcyIsImRlbGF5IiwiZm9yRWFjaCIsImVudHJ5Iiwic2V0VGltZW91dCIsIlBpbiIsImFkZE1hcmtlciIsIm1hcmtlciIsIk1hcmtlciIsInBvc2l0aW9uIiwiY29vcmRzIiwiYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwiRFJPUCIsImxhYmVsIiwiaWQiLCJ0aXRsZSIsInBhZ2UiLCJyZW5kZXIiLCJkYXRlIiwiY29udGVudCIsInJlbmRlclBob3RvcyIsInBob3RvcyIsInNob3ciLCJQYWdlIiwicXVlcnlTZWxlY3RvciIsImNsb3NlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhpZGUiLCJ0ZXh0Q29udGVudCIsImlubmVySFRNTCIsImRhdGEiLCJwaG90byIsIlBob3RvIiwiY2FwdGlvbiIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJkaXNwbGF5IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImltYWdlIiwic3JjIiwiYWx0IiwicmF0aW8iLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwibGlnaHRib3giLCJ0ZXh0IiwiTGlnaHRib3giLCJvdmVybGF5IiwicGFyZW50Tm9kZSIsImJpbmQiLCJyZXNpemUiLCJ3IiwiZCIsImUiLCJnIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwidGFyZ2V0SGVpZ2h0IiwidGFyZ2V0V2lkdGgiLCJpbWFnZVJhdGlvIiwidGFyZ2V0VG9wIiwidGFyZ2V0TGVmdCIsInRvcCIsImxlZnQiLCJoZWlnaHQiLCJkaW1lbnNpb25zIiwiZ2V0RGltZW5zaW9ucyIsImJhY2tncm91bmRJbWFnZSIsIm9wYWNpdHkiLCJhZGREb21MaXN0ZW5lciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTs7QUFFQTs7OztBQUVBOzs7O0FBRUE7O0tBRU1BLEc7QUFFSixnQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixVQUFLQSxPQUFMLEdBQWVBLE9BQWY7O0FBRUEsVUFBS0MsUUFBTDtBQUNBLFVBQUtDLFVBQUw7QUFDRDs7QUFFRDs7Ozs7OztnQ0FHVztBQUNULFlBQUtDLEdBQUwsR0FBVyxJQUFJQyxPQUFPQyxJQUFQLENBQVlOLEdBQWhCLENBQW9CLEtBQUtDLE9BQXpCLEVBQWtDO0FBQzNDTSxpQkFBUSxFQUFFQyxLQUFLLE9BQVAsRUFBZ0JDLEtBQUssQ0FBQyxPQUF0QixFQURtQztBQUUzQ0MsZUFBTSxLQUFLQyxlQUFMLEVBRnFDO0FBRzNDQyxzQkFBYSxJQUg4QjtBQUkzQ0MsdUJBQWMsSUFKNkI7QUFLM0NDLDJCQUFr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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQThCLHVCQUF1QjtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBLHdDQUF1QywwQkFBMEI7QUFDakU7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUErQiwwQkFBMEIsZUFBZTtBQUN4RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU0YzY3Zjc4MDUxNmNiYzE0NjgwIiwiLyogZ2xvYmFsIGdvb2dsZSAqL1xuLyogZXhwb3J0ZWQgaW5pdE1hcCAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnd2hhdHdnLWZldGNoJztcblxuLy8gTUFQXG5cbmNsYXNzIE1hcCB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmJ1aWxkTWFwKCk7XG4gICAgdGhpcy5nZXRFbnRyaWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IEdvb2dsZSBtYXBcbiAgICovXG4gIGJ1aWxkTWFwKCkge1xuICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLmVsZW1lbnQsIHtcbiAgICAgIGNlbnRlcjogeyBsYXQ6IDY0LjkzMTMsIGxuZzogLTE5LjAyMTIgfSxcbiAgICAgIHpvb206IHRoaXMuZ2V0Wm9vbUZvcldpZHRoKCksXG4gICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgIHNjYWxlQ29udHJvbDogdHJ1ZSxcbiAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWVcbiAgICB9KTtcblxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgY29uc29sZS5sb2coZXZlbnQubGF0TG5nLmxhdCgpLCBldmVudC5sYXRMbmcubG5nKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgem9vbSBsZXZlbCBmb3Igd2luZG93IHdpZHRoXG4gICAqL1xuICBnZXRab29tRm9yV2lkdGgoKSB7XG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgICB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgIGlmICh3aWR0aCA8IDc2OCkge1xuICAgICAgcmV0dXJuIDU7XG4gICAgfVxuICAgIHJldHVybiA3O1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGVudHJpZXMgZnJvbSBzZXJ2ZXIgYW5kIGNyZWF0ZSBQaW5zXG4gICAqL1xuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwO1xuICAgIGZldGNoKCdkYXRhL2VudHJpZXMuanNvbicpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbihlbnRyaWVzKSB7XG4gICAgICAgIGxldCBkZWxheSA9IDA7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgIChmdW5jdGlvbihkZWxheSkge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBuZXcgUGluKGVudHJ5LCBtYXApO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgIH0pKGRlbGF5KTtcbiAgICAgICAgICBkZWxheSArPSAxMDA7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cbn1cblxuLy8gUElOXG5cbmNsYXNzIFBpbiB7XG5cbiAgY29uc3RydWN0b3IoZW50cnksIG1hcCkge1xuICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICB0aGlzLm1hcCA9IG1hcDtcblxuICAgIHRoaXMuYWRkTWFya2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG1hcmtlciB0byB0aGUgbWFwXG4gICAqL1xuICBhZGRNYXJrZXIoKSB7XG4gICAgdGhpcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIHBvc2l0aW9uOiB7IGxhdDogdGhpcy5lbnRyeS5jb29yZHNbMF0sIGxuZzogdGhpcy5lbnRyeS5jb29yZHNbMV0gfSxcbiAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5EUk9QLFxuICAgICAgbGFiZWw6IHRoaXMuZW50cnkuaWQsXG4gICAgICB0aXRsZTogdGhpcy5lbnRyeS50aXRsZVxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXJrZXIuYWRkTGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgd2luZG93LnBhZ2UucmVuZGVyKHRoaXMuZW50cnkuaWQsIHRoaXMuZW50cnkudGl0bGUsIHRoaXMuZW50cnkuZGF0ZSwgdGhpcy5lbnRyeS5jb250ZW50KTtcbiAgICAgIHdpbmRvdy5wYWdlLnJlbmRlclBob3Rvcyh0aGlzLmVudHJ5LnBob3Rvcyk7XG4gICAgICB3aW5kb3cucGFnZS5zaG93KCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gUEFHRVxuXG5jbGFzcyBQYWdlIHtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmlkICAgICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pZCcpO1xuICAgIHRoaXMudGl0bGUgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgdGhpcy5kYXRlICAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZScpO1xuICAgIHRoaXMuY29udGVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgICB0aGlzLmNsb3NlICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpO1xuICAgIHRoaXMucGhvdG9zICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnBob3RvcycpO1xuXG4gICAgdGhpcy5jbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKGlkLCB0aXRsZSwgZGF0ZSwgY29udGVudCkge1xuICAgIHRoaXMuaWQudGV4dENvbnRlbnQgPSBpZDtcbiAgICB0aGlzLnRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgdGhpcy5kYXRlLnRleHRDb250ZW50ID0gZGF0ZTtcbiAgICB0aGlzLmNvbnRlbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICB9XG5cbiAgcmVuZGVyUGhvdG9zKHBob3Rvcykge1xuICAgIHRoaXMucGhvdG9zLmlubmVySFRNTCA9ICcnO1xuICAgIHBob3Rvcy5mb3JFYWNoKChkYXRhKSA9PiB7XG4gICAgICBjb25zdCBwaG90byA9IG5ldyBQaG90byhkYXRhLmlkLCBkYXRhLmNhcHRpb24pO1xuICAgICAgdGhpcy5waG90b3MuYXBwZW5kQ2hpbGQocGhvdG8uZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cblxuLy8gUEhPVE9cblxuY2xhc3MgUGhvdG8ge1xuXG4gIGNvbnN0cnVjdG9yKGlkLCBjYXB0aW9uKSB7XG4gICAgdGhpcy5pZCAgICAgID0gaWQ7XG4gICAgdGhpcy5jYXB0aW9uID0gY2FwdGlvbjtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Bob3RvJyk7XG5cbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ3RodW1ibmFpbCcpO1xuICAgIGltYWdlLnNyYyA9IGBkYXRhL3RodW1icy8ke3RoaXMuaWR9LmpwZ2A7XG4gICAgaW1hZ2UuYWx0ID0gdGhpcy5jYXB0aW9uO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XG5cbiAgICAvLyBXaGVuIGltYWdlIGlzIGxvYWRlZFxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnJhdGlvID0gaW1hZ2UubmF0dXJhbFdpZHRoIC8gaW1hZ2UubmF0dXJhbEhlaWdodDtcblxuICAgICAgLy8gRGlzcGxheSBsaWdodGJveCB3aGVuIHBob3RvIGlzIGNsaWNrZWRcbiAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB3aW5kb3cubGlnaHRib3guc2hvdyh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ2NhcHRpb24nKTtcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gdGhpcy5jYXB0aW9uO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH1cbn1cblxuLy8gTElHSFRCT1hcblxuY2xhc3MgTGlnaHRib3gge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3ZlcmxheSA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgIHRoaXMub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGltZW5zaW9ucygpIHtcbiAgICBjb25zdCB3ID0gd2luZG93LCBkID0gZG9jdW1lbnQsIGUgPSBkLmRvY3VtZW50RWxlbWVudCwgZyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSxcbiAgICAgIHdpbmRvd1dpZHRoID0gdy5pbm5lcldpZHRoIHx8IGUuY2xpZW50V2lkdGggfHwgZy5jbGllbnRXaWR0aCxcbiAgICAgIHdpbmRvd0hlaWdodCA9IHcuaW5uZXJIZWlnaHR8fCBlLmNsaWVudEhlaWdodHx8IGcuY2xpZW50SGVpZ2h0O1xuXG4gICAgbGV0IHRhcmdldEhlaWdodCA9IHdpbmRvd0hlaWdodCAqIDAuOTUsXG4gICAgICB0YXJnZXRXaWR0aCA9IHRhcmdldEhlaWdodCAqIHRoaXMuaW1hZ2VSYXRpbyxcbiAgICAgIHRhcmdldFRvcCA9IHdpbmRvd0hlaWdodCAqIDAuMDI1LFxuICAgICAgdGFyZ2V0TGVmdCA9IHdpbmRvd1dpZHRoIC8gMiAtIHRhcmdldFdpZHRoIC8gMjtcblxuICAgIGlmICh0YXJnZXRXaWR0aCA+IHdpbmRvd1dpZHRoICogMC45NSkge1xuICAgICAgdGFyZ2V0V2lkdGggPSB3aW5kb3dXaWR0aCAqIDAuOTU7XG4gICAgICB0YXJnZXRIZWlnaHQgPSB0YXJnZXRXaWR0aCAvIHRoaXMuaW1hZ2VSYXRpbztcbiAgICAgIHRhcmdldExlZnQgPSB3aW5kb3dXaWR0aCAqIDAuMDI1O1xuICAgICAgdGFyZ2V0VG9wID0gd2luZG93SGVpZ2h0IC8gMiAtIHRhcmdldEhlaWdodCAvIDI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogdGFyZ2V0VG9wLFxuICAgICAgbGVmdDogdGFyZ2V0TGVmdCxcbiAgICAgIHdpZHRoOiB0YXJnZXRXaWR0aCxcbiAgICAgIGhlaWdodDogdGFyZ2V0SGVpZ2h0XG4gICAgfTtcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5nZXREaW1lbnNpb25zKCk7XG5cbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSBkaW1lbnNpb25zLndpZHRoICsgJ3B4JztcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQgKyAncHgnO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSBkaW1lbnNpb25zLnRvcCArICdweCc7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBkaW1lbnNpb25zLmxlZnQgKyAncHgnO1xuICB9XG5cbiAgc2hvdyhwaG90bykge1xuXG4gICAgLy8gRGlzcGxheSBpbWFnZSB3aXRoIGxvdy1yZXMgaW1hZ2UgZm9yIGZhc3QgbG9hZGluZ1xuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB0aGlzLmltYWdlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoZGF0YS90aHVtYnMvJHtwaG90by5pZH0uanBnKWA7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaW1hZ2UpO1xuXG4gICAgdGhpcy5pbWFnZVJhdGlvID0gcGhvdG8ucmF0aW87XG4gICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMucmVzaXplKCk7XG4gICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAxO1xuXG4gICAgLy8gTG9hZCBoaWdoLXJlcyBpbWFnZVxuICAgIHRoaXMuaW1hZ2Uuc3JjID0gYGRhdGEvcGhvdG9zLyR7cGhvdG8uaWR9LmpwZ2A7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UnKTtcbiAgaWYgKHBhZ2UpIHtcbiAgICB3aW5kb3cucGFnZSA9IG5ldyBQYWdlKHBhZ2UpO1xuICB9XG4gIGNvbnN0IGxpZ2h0Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpZ2h0Ym94Jyk7XG4gIGlmIChsaWdodGJveCkge1xuICAgIHdpbmRvdy5saWdodGJveCA9IG5ldyBMaWdodGJveChsaWdodGJveCk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIENhbGxlZCBieSBHb29nbGUgTWFwcyBBUEkgSlMgd2hlbiBsb2FkZWRcbiAqL1xuZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBtYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFwJyk7XG4gIGlmIChtYXApIHtcbiAgICBuZXcgTWFwKG1hcCk7XG4gIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC5qcyIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcblxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBsaXN0ID0gdGhpcy5tYXBbbmFtZV1cbiAgICBpZiAoIWxpc3QpIHtcbiAgICAgIGxpc3QgPSBbXVxuICAgICAgdGhpcy5tYXBbbmFtZV0gPSBsaXN0XG4gICAgfVxuICAgIGxpc3QucHVzaCh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgICByZXR1cm4gdmFsdWVzID8gdmFsdWVzWzBdIDogbnVsbFxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSB8fCBbXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IFtub3JtYWxpemVWYWx1ZSh2YWx1ZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1hcCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aGlzLm1hcFtuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHRoaXMpXG4gICAgICB9LCB0aGlzKVxuICAgIH0sIHRoaXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChuYW1lKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IGl0ZW1zLnB1c2godmFsdWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICAgIH1cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG4gIH1cblxuICBmdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgICByZXR1cm4gYnVmLnNsaWNlKDApXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpXG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKVxuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICAgIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG5cbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy51cmwgPSBpbnB1dFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICByYXdIZWFkZXJzLnNwbGl0KCdcXHJcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKClcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBoZWFkZXJzXG4gIH1cblxuICBCb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpXG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgIH1cblxuICAgIHRoaXMudHlwZSA9ICdkZWZhdWx0J1xuICAgIHRoaXMuc3RhdHVzID0gJ3N0YXR1cycgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzIDogMjAwXG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICAgIHRoaXMuc3RhdHVzVGV4dCA9ICdzdGF0dXNUZXh0JyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXNUZXh0IDogJ09LJ1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnXG4gICAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG4gIH1cblxuICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKVxuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH1cblxuICBSZXNwb25zZS5lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcidcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIHZhciByZWRpcmVjdFN0YXR1c2VzID0gWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XVxuXG4gIFJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcbiAgICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG4gIH1cblxuICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzXG4gIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3RcbiAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlXG5cbiAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdClcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJylcbiAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKVxuXG4gICAgICBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYidcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpXG4gICAgICB9KVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KVxuICAgIH0pXG4gIH1cbiAgc2VsZi5mZXRjaC5wb2x5ZmlsbCA9IHRydWVcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi93aGF0d2ctZmV0Y2gvZmV0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==