/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
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
    var skylarkjs = require("skylark-langx-ns");

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

        ns[name] = obj2 || {};
        return ns[name];
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

define('skylark-pdfjs-display/pdfjs',[
	"skylark-langx/skylark"
],function(skylark) {
	return skylark.attach("intg.pdfjs");
});
define('skylark-pdfjs-display/display',[
  "./pdfjs"
],function(pdfjs){
return pdfjs.display = /******/ (() => { // webpackBootstrap
/******/  "use strict";
/******/  var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {
  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  Object.defineProperty(exports, "addLinkAttributes", ({
    enumerable: true,
    get: function () {
      return _display_utils.addLinkAttributes;
    }
  }));
  Object.defineProperty(exports, "getFilenameFromUrl", ({
    enumerable: true,
    get: function () {
      return _display_utils.getFilenameFromUrl;
    }
  }));
  Object.defineProperty(exports, "LinkTarget", ({
    enumerable: true,
    get: function () {
      return _display_utils.LinkTarget;
    }
  }));
  Object.defineProperty(exports, "loadScript", ({
    enumerable: true,
    get: function () {
      return _display_utils.loadScript;
    }
  }));
  Object.defineProperty(exports, "PDFDateString", ({
    enumerable: true,
    get: function () {
      return _display_utils.PDFDateString;
    }
  }));
  Object.defineProperty(exports, "RenderingCancelledException", ({
    enumerable: true,
    get: function () {
      return _display_utils.RenderingCancelledException;
    }
  }));
  Object.defineProperty(exports, "build", ({
    enumerable: true,
    get: function () {
      return _api.build;
    }
  }));
  Object.defineProperty(exports, "getDocument", ({
    enumerable: true,
    get: function () {
      return _api.getDocument;
    }
  }));
  Object.defineProperty(exports, "LoopbackPort", ({
    enumerable: true,
    get: function () {
      return _api.LoopbackPort;
    }
  }));
  Object.defineProperty(exports, "PDFDataRangeTransport", ({
    enumerable: true,
    get: function () {
      return _api.PDFDataRangeTransport;
    }
  }));
  Object.defineProperty(exports, "PDFWorker", ({
    enumerable: true,
    get: function () {
      return _api.PDFWorker;
    }
  }));
  Object.defineProperty(exports, "version", ({
    enumerable: true,
    get: function () {
      return _api.version;
    }
  }));
  Object.defineProperty(exports, "CMapCompressionType", ({
    enumerable: true,
    get: function () {
      return _util.CMapCompressionType;
    }
  }));
  Object.defineProperty(exports, "createObjectURL", ({
    enumerable: true,
    get: function () {
      return _util.createObjectURL;
    }
  }));
  Object.defineProperty(exports, "createPromiseCapability", ({
    enumerable: true,
    get: function () {
      return _util.createPromiseCapability;
    }
  }));
  Object.defineProperty(exports, "createValidAbsoluteUrl", ({
    enumerable: true,
    get: function () {
      return _util.createValidAbsoluteUrl;
    }
  }));
  Object.defineProperty(exports, "InvalidPDFException", ({
    enumerable: true,
    get: function () {
      return _util.InvalidPDFException;
    }
  }));
  Object.defineProperty(exports, "MissingPDFException", ({
    enumerable: true,
    get: function () {
      return _util.MissingPDFException;
    }
  }));
  Object.defineProperty(exports, "OPS", ({
    enumerable: true,
    get: function () {
      return _util.OPS;
    }
  }));
  Object.defineProperty(exports, "PasswordResponses", ({
    enumerable: true,
    get: function () {
      return _util.PasswordResponses;
    }
  }));
  Object.defineProperty(exports, "PermissionFlag", ({
    enumerable: true,
    get: function () {
      return _util.PermissionFlag;
    }
  }));
  Object.defineProperty(exports, "removeNullCharacters", ({
    enumerable: true,
    get: function () {
      return _util.removeNullCharacters;
    }
  }));
  Object.defineProperty(exports, "shadow", ({
    enumerable: true,
    get: function () {
      return _util.shadow;
    }
  }));
  Object.defineProperty(exports, "UnexpectedResponseException", ({
    enumerable: true,
    get: function () {
      return _util.UnexpectedResponseException;
    }
  }));
  Object.defineProperty(exports, "UNSUPPORTED_FEATURES", ({
    enumerable: true,
    get: function () {
      return _util.UNSUPPORTED_FEATURES;
    }
  }));
  Object.defineProperty(exports, "Util", ({
    enumerable: true,
    get: function () {
      return _util.Util;
    }
  }));
  Object.defineProperty(exports, "VerbosityLevel", ({
    enumerable: true,
    get: function () {
      return _util.VerbosityLevel;
    }
  }));
  Object.defineProperty(exports, "AnnotationLayer", ({
    enumerable: true,
    get: function () {
      return _annotation_layer.AnnotationLayer;
    }
  }));
  Object.defineProperty(exports, "apiCompatibilityParams", ({
    enumerable: true,
    get: function () {
      return _api_compatibility.apiCompatibilityParams;
    }
  }));
  Object.defineProperty(exports, "GlobalWorkerOptions", ({
    enumerable: true,
    get: function () {
      return _worker_options.GlobalWorkerOptions;
    }
  }));
  Object.defineProperty(exports, "renderTextLayer", ({
    enumerable: true,
    get: function () {
      return _text_layer.renderTextLayer;
    }
  }));
  Object.defineProperty(exports, "SVGGraphics", ({
    enumerable: true,
    get: function () {
      return _svg.SVGGraphics;
    }
  }));

  var _display_utils = __w_pdfjs_require__(1);

  var _api = __w_pdfjs_require__(5);

  var _util = __w_pdfjs_require__(2);

  var _annotation_layer = __w_pdfjs_require__(19);

  var _api_compatibility = __w_pdfjs_require__(9);

  var _worker_options = __w_pdfjs_require__(12);

  var _text_layer = __w_pdfjs_require__(21);

  var _svg = __w_pdfjs_require__(22);

  const pdfjsVersion = '2.7.570';
  const pdfjsBuild = 'f2c7338b0';
  {
    const {
      isNodeJS
    } = __w_pdfjs_require__(4);

    if (isNodeJS) {
      const PDFNodeStream = __w_pdfjs_require__(23).PDFNodeStream;

      (0, _api.setPDFNetworkStreamFactory)(params => {
        return new PDFNodeStream(params);
      });
    } else {
      const PDFNetworkStream = __w_pdfjs_require__(26).PDFNetworkStream;

      let PDFFetchStream;

      if ((0, _display_utils.isFetchSupported)()) {
        PDFFetchStream = __w_pdfjs_require__(27).PDFFetchStream;
      }

      (0, _api.setPDFNetworkStreamFactory)(params => {
        if (PDFFetchStream && (0, _display_utils.isValidFetchUrl)(params.url)) {
          return new PDFFetchStream(params);
        }

        return new PDFNetworkStream(params);
      });
    }
  }

  /***/ }),
  /* 1 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.addLinkAttributes = addLinkAttributes;
  exports.deprecated = deprecated;
  exports.getFilenameFromUrl = getFilenameFromUrl;
  exports.isFetchSupported = isFetchSupported;
  exports.isValidFetchUrl = isValidFetchUrl;
  exports.loadScript = loadScript;
  exports.StatTimer = exports.RenderingCancelledException = exports.PDFDateString = exports.PageViewport = exports.LinkTarget = exports.DOMSVGFactory = exports.DOMCMapReaderFactory = exports.DOMCanvasFactory = exports.DEFAULT_LINK_REL = exports.BaseCMapReaderFactory = exports.BaseCanvasFactory = void 0;

  var _util = __w_pdfjs_require__(2);

  const DEFAULT_LINK_REL = "noopener noreferrer nofollow";
  exports.DEFAULT_LINK_REL = DEFAULT_LINK_REL;
  const SVG_NS = "http://www.w3.org/2000/svg";

  class BaseCanvasFactory {
    constructor() {
      if (this.constructor === BaseCanvasFactory) {
        (0, _util.unreachable)("Cannot initialize BaseCanvasFactory.");
      }
    }

    create(width, height) {
      (0, _util.unreachable)("Abstract method `create` called.");
    }

    reset(canvasAndContext, width, height) {
      if (!canvasAndContext.canvas) {
        throw new Error("Canvas is not specified");
      }

      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    }

    destroy(canvasAndContext) {
      if (!canvasAndContext.canvas) {
        throw new Error("Canvas is not specified");
      }

      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }

  }

  exports.BaseCanvasFactory = BaseCanvasFactory;

  class DOMCanvasFactory extends BaseCanvasFactory {
    constructor({
      ownerDocument = globalThis.document
    } = {}) {
      super();
      this._document = ownerDocument;
    }

    create(width, height) {
      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      const canvas = this._document.createElement("canvas");

      const context = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      return {
        canvas,
        context
      };
    }

  }

  exports.DOMCanvasFactory = DOMCanvasFactory;

  class BaseCMapReaderFactory {
    constructor({
      baseUrl = null,
      isCompressed = false
    }) {
      if (this.constructor === BaseCMapReaderFactory) {
        (0, _util.unreachable)("Cannot initialize BaseCMapReaderFactory.");
      }

      this.baseUrl = baseUrl;
      this.isCompressed = isCompressed;
    }

    async fetch({
      name
    }) {
      if (!this.baseUrl) {
        throw new Error('The CMap "baseUrl" parameter must be specified, ensure that ' + 'the "cMapUrl" and "cMapPacked" API parameters are provided.');
      }

      if (!name) {
        throw new Error("CMap name must be specified.");
      }

      const url = this.baseUrl + name + (this.isCompressed ? ".bcmap" : "");
      const compressionType = this.isCompressed ? _util.CMapCompressionType.BINARY : _util.CMapCompressionType.NONE;
      return this._fetchData(url, compressionType).catch(reason => {
        throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""}CMap at: ${url}`);
      });
    }

    _fetchData(url, compressionType) {
      (0, _util.unreachable)("Abstract method `_fetchData` called.");
    }

  }

  exports.BaseCMapReaderFactory = BaseCMapReaderFactory;

  class DOMCMapReaderFactory extends BaseCMapReaderFactory {
    _fetchData(url, compressionType) {
      if (isFetchSupported() && isValidFetchUrl(url, document.baseURI)) {
        return fetch(url).then(async response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }

          let cMapData;

          if (this.isCompressed) {
            cMapData = new Uint8Array(await response.arrayBuffer());
          } else {
            cMapData = (0, _util.stringToBytes)(await response.text());
          }

          return {
            cMapData,
            compressionType
          };
        });
      }

      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", url, true);

        if (this.isCompressed) {
          request.responseType = "arraybuffer";
        }

        request.onreadystatechange = () => {
          if (request.readyState !== XMLHttpRequest.DONE) {
            return;
          }

          if (request.status === 200 || request.status === 0) {
            let cMapData;

            if (this.isCompressed && request.response) {
              cMapData = new Uint8Array(request.response);
            } else if (!this.isCompressed && request.responseText) {
              cMapData = (0, _util.stringToBytes)(request.responseText);
            }

            if (cMapData) {
              resolve({
                cMapData,
                compressionType
              });
              return;
            }
          }

          reject(new Error(request.statusText));
        };

        request.send(null);
      });
    }

  }

  exports.DOMCMapReaderFactory = DOMCMapReaderFactory;

  class DOMSVGFactory {
    create(width, height) {
      (0, _util.assert)(width > 0 && height > 0, "Invalid SVG dimensions");
      const svg = document.createElementNS(SVG_NS, "svg:svg");
      svg.setAttribute("version", "1.1");
      svg.setAttribute("width", width + "px");
      svg.setAttribute("height", height + "px");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      return svg;
    }

    createElement(type) {
      (0, _util.assert)(typeof type === "string", "Invalid SVG element type");
      return document.createElementNS(SVG_NS, type);
    }

  }

  exports.DOMSVGFactory = DOMSVGFactory;

  class PageViewport {
    constructor({
      viewBox,
      scale,
      rotation,
      offsetX = 0,
      offsetY = 0,
      dontFlip = false
    }) {
      this.viewBox = viewBox;
      this.scale = scale;
      this.rotation = rotation;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      const centerX = (viewBox[2] + viewBox[0]) / 2;
      const centerY = (viewBox[3] + viewBox[1]) / 2;
      let rotateA, rotateB, rotateC, rotateD;
      rotation = rotation % 360;
      rotation = rotation < 0 ? rotation + 360 : rotation;

      switch (rotation) {
        case 180:
          rotateA = -1;
          rotateB = 0;
          rotateC = 0;
          rotateD = 1;
          break;

        case 90:
          rotateA = 0;
          rotateB = 1;
          rotateC = 1;
          rotateD = 0;
          break;

        case 270:
          rotateA = 0;
          rotateB = -1;
          rotateC = -1;
          rotateD = 0;
          break;

        case 0:
          rotateA = 1;
          rotateB = 0;
          rotateC = 0;
          rotateD = -1;
          break;

        default:
          throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
      }

      if (dontFlip) {
        rotateC = -rotateC;
        rotateD = -rotateD;
      }

      let offsetCanvasX, offsetCanvasY;
      let width, height;

      if (rotateA === 0) {
        offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
        offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
        width = Math.abs(viewBox[3] - viewBox[1]) * scale;
        height = Math.abs(viewBox[2] - viewBox[0]) * scale;
      } else {
        offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
        offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
        width = Math.abs(viewBox[2] - viewBox[0]) * scale;
        height = Math.abs(viewBox[3] - viewBox[1]) * scale;
      }

      this.transform = [rotateA * scale, rotateB * scale, rotateC * scale, rotateD * scale, offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY, offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY];
      this.width = width;
      this.height = height;
    }

    clone({
      scale = this.scale,
      rotation = this.rotation,
      offsetX = this.offsetX,
      offsetY = this.offsetY,
      dontFlip = false
    } = {}) {
      return new PageViewport({
        viewBox: this.viewBox.slice(),
        scale,
        rotation,
        offsetX,
        offsetY,
        dontFlip
      });
    }

    convertToViewportPoint(x, y) {
      return _util.Util.applyTransform([x, y], this.transform);
    }

    convertToViewportRectangle(rect) {
      const topLeft = _util.Util.applyTransform([rect[0], rect[1]], this.transform);

      const bottomRight = _util.Util.applyTransform([rect[2], rect[3]], this.transform);

      return [topLeft[0], topLeft[1], bottomRight[0], bottomRight[1]];
    }

    convertToPdfPoint(x, y) {
      return _util.Util.applyInverseTransform([x, y], this.transform);
    }

  }

  exports.PageViewport = PageViewport;

  class RenderingCancelledException extends _util.BaseException {
    constructor(msg, type) {
      super(msg);
      this.type = type;
    }

  }

  exports.RenderingCancelledException = RenderingCancelledException;
  const LinkTarget = {
    NONE: 0,
    SELF: 1,
    BLANK: 2,
    PARENT: 3,
    TOP: 4
  };
  exports.LinkTarget = LinkTarget;

  function addLinkAttributes(link, {
    url,
    target,
    rel,
    enabled = true
  } = {}) {
    (0, _util.assert)(url && typeof url === "string", 'addLinkAttributes: A valid "url" parameter must provided.');
    const urlNullRemoved = (0, _util.removeNullCharacters)(url);

    if (enabled) {
      link.href = link.title = urlNullRemoved;
    } else {
      link.href = "";
      link.title = `Disabled: ${urlNullRemoved}`;

      link.onclick = () => {
        return false;
      };
    }

    let targetStr = "";

    switch (target) {
      case LinkTarget.NONE:
        break;

      case LinkTarget.SELF:
        targetStr = "_self";
        break;

      case LinkTarget.BLANK:
        targetStr = "_blank";
        break;

      case LinkTarget.PARENT:
        targetStr = "_parent";
        break;

      case LinkTarget.TOP:
        targetStr = "_top";
        break;
    }

    link.target = targetStr;
    link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
  }

  function getFilenameFromUrl(url) {
    const anchor = url.indexOf("#");
    const query = url.indexOf("?");
    const end = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
    return url.substring(url.lastIndexOf("/", end) + 1, end);
  }

  class StatTimer {
    constructor() {
      this.started = Object.create(null);
      this.times = [];
    }

    time(name) {
      if (name in this.started) {
        (0, _util.warn)(`Timer is already running for ${name}`);
      }

      this.started[name] = Date.now();
    }

    timeEnd(name) {
      if (!(name in this.started)) {
        (0, _util.warn)(`Timer has not been started for ${name}`);
      }

      this.times.push({
        name,
        start: this.started[name],
        end: Date.now()
      });
      delete this.started[name];
    }

    toString() {
      const outBuf = [];
      let longest = 0;

      for (const time of this.times) {
        const name = time.name;

        if (name.length > longest) {
          longest = name.length;
        }
      }

      for (const time of this.times) {
        const duration = time.end - time.start;
        outBuf.push(`${time.name.padEnd(longest)} ${duration}ms\n`);
      }

      return outBuf.join("");
    }

  }

  exports.StatTimer = StatTimer;

  function isFetchSupported() {
    return typeof fetch !== "undefined" && typeof Response !== "undefined" && "body" in Response.prototype && typeof ReadableStream !== "undefined";
  }

  function isValidFetchUrl(url, baseUrl) {
    try {
      const {
        protocol
      } = baseUrl ? new URL(url, baseUrl) : new URL(url);
      return protocol === "http:" || protocol === "https:";
    } catch (ex) {
      return false;
    }
  }

  function loadScript(src, removeScriptElement = false) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = function (evt) {
        if (removeScriptElement) {
          script.remove();
        }

        resolve(evt);
      };

      script.onerror = function () {
        reject(new Error(`Cannot load script at: ${script.src}`));
      };

      (document.head || document.documentElement).appendChild(script);
    });
  }

  function deprecated(details) {
    console.log("Deprecated API usage: " + details);
  }

  let pdfDateStringRegex;

  class PDFDateString {
    static toDateObject(input) {
      if (!input || !(0, _util.isString)(input)) {
        return null;
      }

      if (!pdfDateStringRegex) {
        pdfDateStringRegex = new RegExp("^D:" + "(\\d{4})" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "(\\d{2})?" + "([Z|+|-])?" + "(\\d{2})?" + "'?" + "(\\d{2})?" + "'?");
      }

      const matches = pdfDateStringRegex.exec(input);

      if (!matches) {
        return null;
      }

      const year = parseInt(matches[1], 10);
      let month = parseInt(matches[2], 10);
      month = month >= 1 && month <= 12 ? month - 1 : 0;
      let day = parseInt(matches[3], 10);
      day = day >= 1 && day <= 31 ? day : 1;
      let hour = parseInt(matches[4], 10);
      hour = hour >= 0 && hour <= 23 ? hour : 0;
      let minute = parseInt(matches[5], 10);
      minute = minute >= 0 && minute <= 59 ? minute : 0;
      let second = parseInt(matches[6], 10);
      second = second >= 0 && second <= 59 ? second : 0;
      const universalTimeRelation = matches[7] || "Z";
      let offsetHour = parseInt(matches[8], 10);
      offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
      let offsetMinute = parseInt(matches[9], 10) || 0;
      offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;

      if (universalTimeRelation === "-") {
        hour += offsetHour;
        minute += offsetMinute;
      } else if (universalTimeRelation === "+") {
        hour -= offsetHour;
        minute -= offsetMinute;
      }

      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }

  }

  exports.PDFDateString = PDFDateString;

  /***/ }),
  /* 2 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.arrayByteLength = arrayByteLength;
  exports.arraysToBytes = arraysToBytes;
  exports.assert = assert;
  exports.bytesToString = bytesToString;
  exports.createPromiseCapability = createPromiseCapability;
  exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
  exports.encodeToXmlString = encodeToXmlString;
  exports.escapeString = escapeString;
  exports.getModificationDate = getModificationDate;
  exports.getVerbosityLevel = getVerbosityLevel;
  exports.info = info;
  exports.isArrayBuffer = isArrayBuffer;
  exports.isArrayEqual = isArrayEqual;
  exports.isAscii = isAscii;
  exports.isBool = isBool;
  exports.isNum = isNum;
  exports.isSameOrigin = isSameOrigin;
  exports.isString = isString;
  exports.objectFromEntries = objectFromEntries;
  exports.objectSize = objectSize;
  exports.removeNullCharacters = removeNullCharacters;
  exports.setVerbosityLevel = setVerbosityLevel;
  exports.shadow = shadow;
  exports.string32 = string32;
  exports.stringToBytes = stringToBytes;
  exports.stringToPDFString = stringToPDFString;
  exports.stringToUTF16BEString = stringToUTF16BEString;
  exports.stringToUTF8String = stringToUTF8String;
  exports.unreachable = unreachable;
  exports.utf8StringToString = utf8StringToString;
  exports.warn = warn;
  exports.VerbosityLevel = exports.Util = exports.UNSUPPORTED_FEATURES = exports.UnknownErrorException = exports.UnexpectedResponseException = exports.TextRenderingMode = exports.StreamType = exports.PermissionFlag = exports.PasswordResponses = exports.PasswordException = exports.PageActionEventType = exports.OPS = exports.MissingPDFException = exports.IsLittleEndianCached = exports.IsEvalSupportedCached = exports.InvalidPDFException = exports.ImageKind = exports.IDENTITY_MATRIX = exports.FormatError = exports.FontType = exports.FONT_IDENTITY_MATRIX = exports.DocumentActionEventType = exports.createObjectURL = exports.CMapCompressionType = exports.BaseException = exports.AnnotationType = exports.AnnotationStateModelType = exports.AnnotationReviewState = exports.AnnotationReplyType = exports.AnnotationMarkedState = exports.AnnotationFlag = exports.AnnotationFieldFlag = exports.AnnotationBorderStyleType = exports.AnnotationActionEventType = exports.AbortException = void 0;

  __w_pdfjs_require__(3);

  const IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
  exports.IDENTITY_MATRIX = IDENTITY_MATRIX;
  const FONT_IDENTITY_MATRIX = [0.001, 0, 0, 0.001, 0, 0];
  exports.FONT_IDENTITY_MATRIX = FONT_IDENTITY_MATRIX;
  const PermissionFlag = {
    PRINT: 0x04,
    MODIFY_CONTENTS: 0x08,
    COPY: 0x10,
    MODIFY_ANNOTATIONS: 0x20,
    FILL_INTERACTIVE_FORMS: 0x100,
    COPY_FOR_ACCESSIBILITY: 0x200,
    ASSEMBLE: 0x400,
    PRINT_HIGH_QUALITY: 0x800
  };
  exports.PermissionFlag = PermissionFlag;
  const TextRenderingMode = {
    FILL: 0,
    STROKE: 1,
    FILL_STROKE: 2,
    INVISIBLE: 3,
    FILL_ADD_TO_PATH: 4,
    STROKE_ADD_TO_PATH: 5,
    FILL_STROKE_ADD_TO_PATH: 6,
    ADD_TO_PATH: 7,
    FILL_STROKE_MASK: 3,
    ADD_TO_PATH_FLAG: 4
  };
  exports.TextRenderingMode = TextRenderingMode;
  const ImageKind = {
    GRAYSCALE_1BPP: 1,
    RGB_24BPP: 2,
    RGBA_32BPP: 3
  };
  exports.ImageKind = ImageKind;
  const AnnotationType = {
    TEXT: 1,
    LINK: 2,
    FREETEXT: 3,
    LINE: 4,
    SQUARE: 5,
    CIRCLE: 6,
    POLYGON: 7,
    POLYLINE: 8,
    HIGHLIGHT: 9,
    UNDERLINE: 10,
    SQUIGGLY: 11,
    STRIKEOUT: 12,
    STAMP: 13,
    CARET: 14,
    INK: 15,
    POPUP: 16,
    FILEATTACHMENT: 17,
    SOUND: 18,
    MOVIE: 19,
    WIDGET: 20,
    SCREEN: 21,
    PRINTERMARK: 22,
    TRAPNET: 23,
    WATERMARK: 24,
    THREED: 25,
    REDACT: 26
  };
  exports.AnnotationType = AnnotationType;
  const AnnotationStateModelType = {
    MARKED: "Marked",
    REVIEW: "Review"
  };
  exports.AnnotationStateModelType = AnnotationStateModelType;
  const AnnotationMarkedState = {
    MARKED: "Marked",
    UNMARKED: "Unmarked"
  };
  exports.AnnotationMarkedState = AnnotationMarkedState;
  const AnnotationReviewState = {
    ACCEPTED: "Accepted",
    REJECTED: "Rejected",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
    NONE: "None"
  };
  exports.AnnotationReviewState = AnnotationReviewState;
  const AnnotationReplyType = {
    GROUP: "Group",
    REPLY: "R"
  };
  exports.AnnotationReplyType = AnnotationReplyType;
  const AnnotationFlag = {
    INVISIBLE: 0x01,
    HIDDEN: 0x02,
    PRINT: 0x04,
    NOZOOM: 0x08,
    NOROTATE: 0x10,
    NOVIEW: 0x20,
    READONLY: 0x40,
    LOCKED: 0x80,
    TOGGLENOVIEW: 0x100,
    LOCKEDCONTENTS: 0x200
  };
  exports.AnnotationFlag = AnnotationFlag;
  const AnnotationFieldFlag = {
    READONLY: 0x0000001,
    REQUIRED: 0x0000002,
    NOEXPORT: 0x0000004,
    MULTILINE: 0x0001000,
    PASSWORD: 0x0002000,
    NOTOGGLETOOFF: 0x0004000,
    RADIO: 0x0008000,
    PUSHBUTTON: 0x0010000,
    COMBO: 0x0020000,
    EDIT: 0x0040000,
    SORT: 0x0080000,
    FILESELECT: 0x0100000,
    MULTISELECT: 0x0200000,
    DONOTSPELLCHECK: 0x0400000,
    DONOTSCROLL: 0x0800000,
    COMB: 0x1000000,
    RICHTEXT: 0x2000000,
    RADIOSINUNISON: 0x2000000,
    COMMITONSELCHANGE: 0x4000000
  };
  exports.AnnotationFieldFlag = AnnotationFieldFlag;
  const AnnotationBorderStyleType = {
    SOLID: 1,
    DASHED: 2,
    BEVELED: 3,
    INSET: 4,
    UNDERLINE: 5
  };
  exports.AnnotationBorderStyleType = AnnotationBorderStyleType;
  const AnnotationActionEventType = {
    E: "Mouse Enter",
    X: "Mouse Exit",
    D: "Mouse Down",
    U: "Mouse Up",
    Fo: "Focus",
    Bl: "Blur",
    PO: "PageOpen",
    PC: "PageClose",
    PV: "PageVisible",
    PI: "PageInvisible",
    K: "Keystroke",
    F: "Format",
    V: "Validate",
    C: "Calculate"
  };
  exports.AnnotationActionEventType = AnnotationActionEventType;
  const DocumentActionEventType = {
    WC: "WillClose",
    WS: "WillSave",
    DS: "DidSave",
    WP: "WillPrint",
    DP: "DidPrint"
  };
  exports.DocumentActionEventType = DocumentActionEventType;
  const PageActionEventType = {
    O: "PageOpen",
    C: "PageClose"
  };
  exports.PageActionEventType = PageActionEventType;
  const StreamType = {
    UNKNOWN: "UNKNOWN",
    FLATE: "FLATE",
    LZW: "LZW",
    DCT: "DCT",
    JPX: "JPX",
    JBIG: "JBIG",
    A85: "A85",
    AHX: "AHX",
    CCF: "CCF",
    RLX: "RLX"
  };
  exports.StreamType = StreamType;
  const FontType = {
    UNKNOWN: "UNKNOWN",
    TYPE1: "TYPE1",
    TYPE1C: "TYPE1C",
    CIDFONTTYPE0: "CIDFONTTYPE0",
    CIDFONTTYPE0C: "CIDFONTTYPE0C",
    TRUETYPE: "TRUETYPE",
    CIDFONTTYPE2: "CIDFONTTYPE2",
    TYPE3: "TYPE3",
    OPENTYPE: "OPENTYPE",
    TYPE0: "TYPE0",
    MMTYPE1: "MMTYPE1"
  };
  exports.FontType = FontType;
  const VerbosityLevel = {
    ERRORS: 0,
    WARNINGS: 1,
    INFOS: 5
  };
  exports.VerbosityLevel = VerbosityLevel;
  const CMapCompressionType = {
    NONE: 0,
    BINARY: 1,
    STREAM: 2
  };
  exports.CMapCompressionType = CMapCompressionType;
  const OPS = {
    dependency: 1,
    setLineWidth: 2,
    setLineCap: 3,
    setLineJoin: 4,
    setMiterLimit: 5,
    setDash: 6,
    setRenderingIntent: 7,
    setFlatness: 8,
    setGState: 9,
    save: 10,
    restore: 11,
    transform: 12,
    moveTo: 13,
    lineTo: 14,
    curveTo: 15,
    curveTo2: 16,
    curveTo3: 17,
    closePath: 18,
    rectangle: 19,
    stroke: 20,
    closeStroke: 21,
    fill: 22,
    eoFill: 23,
    fillStroke: 24,
    eoFillStroke: 25,
    closeFillStroke: 26,
    closeEOFillStroke: 27,
    endPath: 28,
    clip: 29,
    eoClip: 30,
    beginText: 31,
    endText: 32,
    setCharSpacing: 33,
    setWordSpacing: 34,
    setHScale: 35,
    setLeading: 36,
    setFont: 37,
    setTextRenderingMode: 38,
    setTextRise: 39,
    moveText: 40,
    setLeadingMoveText: 41,
    setTextMatrix: 42,
    nextLine: 43,
    showText: 44,
    showSpacedText: 45,
    nextLineShowText: 46,
    nextLineSetSpacingShowText: 47,
    setCharWidth: 48,
    setCharWidthAndBounds: 49,
    setStrokeColorSpace: 50,
    setFillColorSpace: 51,
    setStrokeColor: 52,
    setStrokeColorN: 53,
    setFillColor: 54,
    setFillColorN: 55,
    setStrokeGray: 56,
    setFillGray: 57,
    setStrokeRGBColor: 58,
    setFillRGBColor: 59,
    setStrokeCMYKColor: 60,
    setFillCMYKColor: 61,
    shadingFill: 62,
    beginInlineImage: 63,
    beginImageData: 64,
    endInlineImage: 65,
    paintXObject: 66,
    markPoint: 67,
    markPointProps: 68,
    beginMarkedContent: 69,
    beginMarkedContentProps: 70,
    endMarkedContent: 71,
    beginCompat: 72,
    endCompat: 73,
    paintFormXObjectBegin: 74,
    paintFormXObjectEnd: 75,
    beginGroup: 76,
    endGroup: 77,
    beginAnnotations: 78,
    endAnnotations: 79,
    beginAnnotation: 80,
    endAnnotation: 81,
    paintJpegXObject: 82,
    paintImageMaskXObject: 83,
    paintImageMaskXObjectGroup: 84,
    paintImageXObject: 85,
    paintInlineImageXObject: 86,
    paintInlineImageXObjectGroup: 87,
    paintImageXObjectRepeat: 88,
    paintImageMaskXObjectRepeat: 89,
    paintSolidColorImageMask: 90,
    constructPath: 91
  };
  exports.OPS = OPS;
  const UNSUPPORTED_FEATURES = {
    unknown: "unknown",
    forms: "forms",
    javaScript: "javaScript",
    smask: "smask",
    shadingPattern: "shadingPattern",
    font: "font",
    errorTilingPattern: "errorTilingPattern",
    errorExtGState: "errorExtGState",
    errorXObject: "errorXObject",
    errorFontLoadType3: "errorFontLoadType3",
    errorFontState: "errorFontState",
    errorFontMissing: "errorFontMissing",
    errorFontTranslate: "errorFontTranslate",
    errorColorSpace: "errorColorSpace",
    errorOperatorList: "errorOperatorList",
    errorFontToUnicode: "errorFontToUnicode",
    errorFontLoadNative: "errorFontLoadNative",
    errorFontGetPath: "errorFontGetPath",
    errorMarkedContent: "errorMarkedContent"
  };
  exports.UNSUPPORTED_FEATURES = UNSUPPORTED_FEATURES;
  const PasswordResponses = {
    NEED_PASSWORD: 1,
    INCORRECT_PASSWORD: 2
  };
  exports.PasswordResponses = PasswordResponses;
  let verbosity = VerbosityLevel.WARNINGS;

  function setVerbosityLevel(level) {
    if (Number.isInteger(level)) {
      verbosity = level;
    }
  }

  function getVerbosityLevel() {
    return verbosity;
  }

  function info(msg) {
    if (verbosity >= VerbosityLevel.INFOS) {
      console.log(`Info: ${msg}`);
    }
  }

  function warn(msg) {
    if (verbosity >= VerbosityLevel.WARNINGS) {
      console.log(`Warning: ${msg}`);
    }
  }

  function unreachable(msg) {
    throw new Error(msg);
  }

  function assert(cond, msg) {
    if (!cond) {
      unreachable(msg);
    }
  }

  function isSameOrigin(baseUrl, otherUrl) {
    let base;

    try {
      base = new URL(baseUrl);

      if (!base.origin || base.origin === "null") {
        return false;
      }
    } catch (e) {
      return false;
    }

    const other = new URL(otherUrl, base);
    return base.origin === other.origin;
  }

  function _isValidProtocol(url) {
    if (!url) {
      return false;
    }

    switch (url.protocol) {
      case "http:":
      case "https:":
      case "ftp:":
      case "mailto:":
      case "tel:":
        return true;

      default:
        return false;
    }
  }

  function createValidAbsoluteUrl(url, baseUrl) {
    if (!url) {
      return null;
    }

    try {
      const absoluteUrl = baseUrl ? new URL(url, baseUrl) : new URL(url);

      if (_isValidProtocol(absoluteUrl)) {
        return absoluteUrl;
      }
    } catch (ex) {}

    return null;
  }

  function shadow(obj, prop, value) {
    Object.defineProperty(obj, prop, {
      value,
      enumerable: true,
      configurable: true,
      writable: false
    });
    return value;
  }

  const BaseException = function BaseExceptionClosure() {
    function BaseException(message) {
      if (this.constructor === BaseException) {
        unreachable("Cannot initialize BaseException.");
      }

      this.message = message;
      this.name = this.constructor.name;
    }

    BaseException.prototype = new Error();
    BaseException.constructor = BaseException;
    return BaseException;
  }();

  exports.BaseException = BaseException;

  class PasswordException extends BaseException {
    constructor(msg, code) {
      super(msg);
      this.code = code;
    }

  }

  exports.PasswordException = PasswordException;

  class UnknownErrorException extends BaseException {
    constructor(msg, details) {
      super(msg);
      this.details = details;
    }

  }

  exports.UnknownErrorException = UnknownErrorException;

  class InvalidPDFException extends BaseException {}

  exports.InvalidPDFException = InvalidPDFException;

  class MissingPDFException extends BaseException {}

  exports.MissingPDFException = MissingPDFException;

  class UnexpectedResponseException extends BaseException {
    constructor(msg, status) {
      super(msg);
      this.status = status;
    }

  }

  exports.UnexpectedResponseException = UnexpectedResponseException;

  class FormatError extends BaseException {}

  exports.FormatError = FormatError;

  class AbortException extends BaseException {}

  exports.AbortException = AbortException;
  const NullCharactersRegExp = /\x00/g;

  function removeNullCharacters(str) {
    if (typeof str !== "string") {
      warn("The argument for removeNullCharacters must be a string.");
      return str;
    }

    return str.replace(NullCharactersRegExp, "");
  }

  function bytesToString(bytes) {
    assert(bytes !== null && typeof bytes === "object" && bytes.length !== undefined, "Invalid argument for bytesToString");
    const length = bytes.length;
    const MAX_ARGUMENT_COUNT = 8192;

    if (length < MAX_ARGUMENT_COUNT) {
      return String.fromCharCode.apply(null, bytes);
    }

    const strBuf = [];

    for (let i = 0; i < length; i += MAX_ARGUMENT_COUNT) {
      const chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);
      const chunk = bytes.subarray(i, chunkEnd);
      strBuf.push(String.fromCharCode.apply(null, chunk));
    }

    return strBuf.join("");
  }

  function stringToBytes(str) {
    assert(typeof str === "string", "Invalid argument for stringToBytes");
    const length = str.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; ++i) {
      bytes[i] = str.charCodeAt(i) & 0xff;
    }

    return bytes;
  }

  function arrayByteLength(arr) {
    if (arr.length !== undefined) {
      return arr.length;
    }

    assert(arr.byteLength !== undefined, "arrayByteLength - invalid argument.");
    return arr.byteLength;
  }

  function arraysToBytes(arr) {
    const length = arr.length;

    if (length === 1 && arr[0] instanceof Uint8Array) {
      return arr[0];
    }

    let resultLength = 0;

    for (let i = 0; i < length; i++) {
      resultLength += arrayByteLength(arr[i]);
    }

    let pos = 0;
    const data = new Uint8Array(resultLength);

    for (let i = 0; i < length; i++) {
      let item = arr[i];

      if (!(item instanceof Uint8Array)) {
        if (typeof item === "string") {
          item = stringToBytes(item);
        } else {
          item = new Uint8Array(item);
        }
      }

      const itemLength = item.byteLength;
      data.set(item, pos);
      pos += itemLength;
    }

    return data;
  }

  function string32(value) {
    return String.fromCharCode(value >> 24 & 0xff, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff);
  }

  function objectSize(obj) {
    return Object.keys(obj).length;
  }

  function objectFromEntries(iterable) {
    return Object.assign(Object.create(null), Object.fromEntries(iterable));
  }

  function isLittleEndian() {
    const buffer8 = new Uint8Array(4);
    buffer8[0] = 1;
    const view32 = new Uint32Array(buffer8.buffer, 0, 1);
    return view32[0] === 1;
  }

  const IsLittleEndianCached = {
    get value() {
      return shadow(this, "value", isLittleEndian());
    }

  };
  exports.IsLittleEndianCached = IsLittleEndianCached;

  function isEvalSupported() {
    try {
      new Function("");
      return true;
    } catch (e) {
      return false;
    }
  }

  const IsEvalSupportedCached = {
    get value() {
      return shadow(this, "value", isEvalSupported());
    }

  };
  exports.IsEvalSupportedCached = IsEvalSupportedCached;
  const hexNumbers = [...Array(256).keys()].map(n => n.toString(16).padStart(2, "0"));

  class Util {
    static makeHexColor(r, g, b) {
      return `#${hexNumbers[r]}${hexNumbers[g]}${hexNumbers[b]}`;
    }

    static transform(m1, m2) {
      return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
    }

    static applyTransform(p, m) {
      const xt = p[0] * m[0] + p[1] * m[2] + m[4];
      const yt = p[0] * m[1] + p[1] * m[3] + m[5];
      return [xt, yt];
    }

    static applyInverseTransform(p, m) {
      const d = m[0] * m[3] - m[1] * m[2];
      const xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
      const yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
      return [xt, yt];
    }

    static getAxialAlignedBoundingBox(r, m) {
      const p1 = Util.applyTransform(r, m);
      const p2 = Util.applyTransform(r.slice(2, 4), m);
      const p3 = Util.applyTransform([r[0], r[3]], m);
      const p4 = Util.applyTransform([r[2], r[1]], m);
      return [Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1])];
    }

    static inverseTransform(m) {
      const d = m[0] * m[3] - m[1] * m[2];
      return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
    }

    static apply3dTransform(m, v) {
      return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
    }

    static singularValueDecompose2dScale(m) {
      const transpose = [m[0], m[2], m[1], m[3]];
      const a = m[0] * transpose[0] + m[1] * transpose[2];
      const b = m[0] * transpose[1] + m[1] * transpose[3];
      const c = m[2] * transpose[0] + m[3] * transpose[2];
      const d = m[2] * transpose[1] + m[3] * transpose[3];
      const first = (a + d) / 2;
      const second = Math.sqrt((a + d) * (a + d) - 4 * (a * d - c * b)) / 2;
      const sx = first + second || 1;
      const sy = first - second || 1;
      return [Math.sqrt(sx), Math.sqrt(sy)];
    }

    static normalizeRect(rect) {
      const r = rect.slice(0);

      if (rect[0] > rect[2]) {
        r[0] = rect[2];
        r[2] = rect[0];
      }

      if (rect[1] > rect[3]) {
        r[1] = rect[3];
        r[3] = rect[1];
      }

      return r;
    }

    static intersect(rect1, rect2) {
      function compare(a, b) {
        return a - b;
      }

      const orderedX = [rect1[0], rect1[2], rect2[0], rect2[2]].sort(compare);
      const orderedY = [rect1[1], rect1[3], rect2[1], rect2[3]].sort(compare);
      const result = [];
      rect1 = Util.normalizeRect(rect1);
      rect2 = Util.normalizeRect(rect2);

      if (orderedX[0] === rect1[0] && orderedX[1] === rect2[0] || orderedX[0] === rect2[0] && orderedX[1] === rect1[0]) {
        result[0] = orderedX[1];
        result[2] = orderedX[2];
      } else {
        return null;
      }

      if (orderedY[0] === rect1[1] && orderedY[1] === rect2[1] || orderedY[0] === rect2[1] && orderedY[1] === rect1[1]) {
        result[1] = orderedY[1];
        result[3] = orderedY[2];
      } else {
        return null;
      }

      return result;
    }

  }

  exports.Util = Util;
  const PDFStringTranslateTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2D8, 0x2C7, 0x2C6, 0x2D9, 0x2DD, 0x2DB, 0x2DA, 0x2DC, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014, 0x2013, 0x192, 0x2044, 0x2039, 0x203A, 0x2212, 0x2030, 0x201E, 0x201C, 0x201D, 0x2018, 0x2019, 0x201A, 0x2122, 0xFB01, 0xFB02, 0x141, 0x152, 0x160, 0x178, 0x17D, 0x131, 0x142, 0x153, 0x161, 0x17E, 0, 0x20AC];

  function stringToPDFString(str) {
    const length = str.length,
          strBuf = [];

    if (str[0] === "\xFE" && str[1] === "\xFF") {
      for (let i = 2; i < length; i += 2) {
        strBuf.push(String.fromCharCode(str.charCodeAt(i) << 8 | str.charCodeAt(i + 1)));
      }
    } else if (str[0] === "\xFF" && str[1] === "\xFE") {
      for (let i = 2; i < length; i += 2) {
        strBuf.push(String.fromCharCode(str.charCodeAt(i + 1) << 8 | str.charCodeAt(i)));
      }
    } else {
      for (let i = 0; i < length; ++i) {
        const code = PDFStringTranslateTable[str.charCodeAt(i)];
        strBuf.push(code ? String.fromCharCode(code) : str.charAt(i));
      }
    }

    return strBuf.join("");
  }

  function escapeString(str) {
    return str.replace(/([()\\\n\r])/g, match => {
      if (match === "\n") {
        return "\\n";
      } else if (match === "\r") {
        return "\\r";
      }

      return `\\${match}`;
    });
  }

  function isAscii(str) {
    return /^[\x00-\x7F]*$/.test(str);
  }

  function stringToUTF16BEString(str) {
    const buf = ["\xFE\xFF"];

    for (let i = 0, ii = str.length; i < ii; i++) {
      const char = str.charCodeAt(i);
      buf.push(String.fromCharCode(char >> 8 & 0xff));
      buf.push(String.fromCharCode(char & 0xff));
    }

    return buf.join("");
  }

  function stringToUTF8String(str) {
    return decodeURIComponent(escape(str));
  }

  function utf8StringToString(str) {
    return unescape(encodeURIComponent(str));
  }

  function isBool(v) {
    return typeof v === "boolean";
  }

  function isNum(v) {
    return typeof v === "number";
  }

  function isString(v) {
    return typeof v === "string";
  }

  function isArrayBuffer(v) {
    return typeof v === "object" && v !== null && v.byteLength !== undefined;
  }

  function isArrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every(function (element, index) {
      return element === arr2[index];
    });
  }

  function getModificationDate(date = new Date()) {
    const buffer = [date.getUTCFullYear().toString(), (date.getUTCMonth() + 1).toString().padStart(2, "0"), date.getUTCDate().toString().padStart(2, "0"), date.getUTCHours().toString().padStart(2, "0"), date.getUTCMinutes().toString().padStart(2, "0"), date.getUTCSeconds().toString().padStart(2, "0")];
    return buffer.join("");
  }

  function createPromiseCapability() {
    const capability = Object.create(null);
    let isSettled = false;
    Object.defineProperty(capability, "settled", {
      get() {
        return isSettled;
      }

    });
    capability.promise = new Promise(function (resolve, reject) {
      capability.resolve = function (data) {
        isSettled = true;
        resolve(data);
      };

      capability.reject = function (reason) {
        isSettled = true;
        reject(reason);
      };
    });
    return capability;
  }

  const createObjectURL = function createObjectURLClosure() {
    const digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return function createObjectURL(data, contentType, forceDataSchema = false) {
      if (!forceDataSchema && URL.createObjectURL) {
        const blob = new Blob([data], {
          type: contentType
        });
        return URL.createObjectURL(blob);
      }

      let buffer = `data:${contentType};base64,`;

      for (let i = 0, ii = data.length; i < ii; i += 3) {
        const b1 = data[i] & 0xff;
        const b2 = data[i + 1] & 0xff;
        const b3 = data[i + 2] & 0xff;
        const d1 = b1 >> 2,
              d2 = (b1 & 3) << 4 | b2 >> 4;
        const d3 = i + 1 < ii ? (b2 & 0xf) << 2 | b3 >> 6 : 64;
        const d4 = i + 2 < ii ? b3 & 0x3f : 64;
        buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
      }

      return buffer;
    };
  }();

  exports.createObjectURL = createObjectURL;
  const XMLEntities = {
    0x3c: "&lt;",
    0x3e: "&gt;",
    0x26: "&amp;",
    0x22: "&quot;",
    0x27: "&apos;"
  };

  function encodeToXmlString(str) {
    const buffer = [];
    let start = 0;

    for (let i = 0, ii = str.length; i < ii; i++) {
      const char = str.codePointAt(i);

      if (0x20 <= char && char <= 0x7e) {
        const entity = XMLEntities[char];

        if (entity) {
          if (start < i) {
            buffer.push(str.substring(start, i));
          }

          buffer.push(entity);
          start = i + 1;
        }
      } else {
        if (start < i) {
          buffer.push(str.substring(start, i));
        }

        buffer.push(`&#x${char.toString(16).toUpperCase()};`);

        if (char > 0xd7ff && (char < 0xe000 || char > 0xfffd)) {
          i++;
        }

        start = i + 1;
      }
    }

    if (buffer.length === 0) {
      return str;
    }

    if (start < str.length) {
      buffer.push(str.substring(start, str.length));
    }

    return buffer.join("");
  }

  /***/ }),
  /* 3 */
  /***/ ((__unused_webpack_module, __unused_webpack_exports, __w_pdfjs_require__) => {



  var _is_node = __w_pdfjs_require__(4);

  ;

  /***/ }),
  /* 4 */
  /***/ ((__unused_webpack_module, exports) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.isNodeJS = void 0;
  const isNodeJS = typeof process === "object" && process + "" === "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser");
  exports.isNodeJS = isNodeJS;

  /***/ }),
  /* 5 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.getDocument = getDocument;
  exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory;
  exports.version = exports.PDFWorker = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFDataRangeTransport = exports.LoopbackPort = exports.DefaultCMapReaderFactory = exports.DefaultCanvasFactory = exports.build = void 0;

  var _util = __w_pdfjs_require__(2);

  var _display_utils = __w_pdfjs_require__(1);

  var _font_loader = __w_pdfjs_require__(6);

  var _node_utils = __w_pdfjs_require__(7);

  var _annotation_storage = __w_pdfjs_require__(8);

  var _api_compatibility = __w_pdfjs_require__(9);

  var _canvas = __w_pdfjs_require__(10);

  var _worker_options = __w_pdfjs_require__(12);

  var _is_node = __w_pdfjs_require__(4);

  var _message_handler = __w_pdfjs_require__(13);

  var _metadata = __w_pdfjs_require__(14);

  var _optional_content_config = __w_pdfjs_require__(16);

  var _transport_stream = __w_pdfjs_require__(17);

  var _webgl = __w_pdfjs_require__(18);

  const DEFAULT_RANGE_CHUNK_SIZE = 65536;
  const RENDERING_CANCELLED_TIMEOUT = 100;
  const DefaultCanvasFactory = _is_node.isNodeJS ? _node_utils.NodeCanvasFactory : _display_utils.DOMCanvasFactory;
  exports.DefaultCanvasFactory = DefaultCanvasFactory;
  const DefaultCMapReaderFactory = _is_node.isNodeJS ? _node_utils.NodeCMapReaderFactory : _display_utils.DOMCMapReaderFactory;
  exports.DefaultCMapReaderFactory = DefaultCMapReaderFactory;
  let createPDFNetworkStream;

  function setPDFNetworkStreamFactory(pdfNetworkStreamFactory) {
    createPDFNetworkStream = pdfNetworkStreamFactory;
  }

  function getDocument(src) {
    const task = new PDFDocumentLoadingTask();
    let source;

    if (typeof src === "string") {
      source = {
        url: src
      };
    } else if ((0, _util.isArrayBuffer)(src)) {
      source = {
        data: src
      };
    } else if (src instanceof PDFDataRangeTransport) {
      source = {
        range: src
      };
    } else {
      if (typeof src !== "object") {
        throw new Error("Invalid parameter in getDocument, " + "need either Uint8Array, string or a parameter object");
      }

      if (!src.url && !src.data && !src.range) {
        throw new Error("Invalid parameter object: need either .data, .range or .url");
      }

      source = src;
    }

    const params = Object.create(null);
    let rangeTransport = null,
        worker = null;

    for (const key in source) {
      if (key === "url" && typeof window !== "undefined") {
        params[key] = new URL(source[key], window.location).href;
        continue;
      } else if (key === "range") {
        rangeTransport = source[key];
        continue;
      } else if (key === "worker") {
        worker = source[key];
        continue;
      } else if (key === "data" && !(source[key] instanceof Uint8Array)) {
        const pdfBytes = source[key];

        if (typeof pdfBytes === "string") {
          params[key] = (0, _util.stringToBytes)(pdfBytes);
        } else if (typeof pdfBytes === "object" && pdfBytes !== null && !isNaN(pdfBytes.length)) {
          params[key] = new Uint8Array(pdfBytes);
        } else if ((0, _util.isArrayBuffer)(pdfBytes)) {
          params[key] = new Uint8Array(pdfBytes);
        } else {
          throw new Error("Invalid PDF binary data: either typed array, " + "string or array-like object is expected in the " + "data property.");
        }

        continue;
      }

      params[key] = source[key];
    }

    params.rangeChunkSize = params.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE;
    params.CMapReaderFactory = params.CMapReaderFactory || DefaultCMapReaderFactory;
    params.ignoreErrors = params.stopAtErrors !== true;
    params.fontExtraProperties = params.fontExtraProperties === true;
    params.pdfBug = params.pdfBug === true;

    if (!Number.isInteger(params.maxImageSize)) {
      params.maxImageSize = -1;
    }

    if (typeof params.isEvalSupported !== "boolean") {
      params.isEvalSupported = true;
    }

    if (typeof params.disableFontFace !== "boolean") {
      params.disableFontFace = _api_compatibility.apiCompatibilityParams.disableFontFace || false;
    }

    if (typeof params.ownerDocument === "undefined") {
      params.ownerDocument = globalThis.document;
    }

    if (typeof params.disableRange !== "boolean") {
      params.disableRange = false;
    }

    if (typeof params.disableStream !== "boolean") {
      params.disableStream = false;
    }

    if (typeof params.disableAutoFetch !== "boolean") {
      params.disableAutoFetch = false;
    }

    (0, _util.setVerbosityLevel)(params.verbosity);

    if (!worker) {
      const workerParams = {
        verbosity: params.verbosity,
        port: _worker_options.GlobalWorkerOptions.workerPort
      };
      worker = workerParams.port ? PDFWorker.fromPort(workerParams) : new PDFWorker(workerParams);
      task._worker = worker;
    }

    const docId = task.docId;
    worker.promise.then(function () {
      if (task.destroyed) {
        throw new Error("Loading aborted");
      }

      const workerIdPromise = _fetchDocument(worker, params, rangeTransport, docId);

      const networkStreamPromise = new Promise(function (resolve) {
        let networkStream;

        if (rangeTransport) {
          networkStream = new _transport_stream.PDFDataTransportStream({
            length: params.length,
            initialData: params.initialData,
            progressiveDone: params.progressiveDone,
            disableRange: params.disableRange,
            disableStream: params.disableStream
          }, rangeTransport);
        } else if (!params.data) {
          networkStream = createPDFNetworkStream({
            url: params.url,
            length: params.length,
            httpHeaders: params.httpHeaders,
            withCredentials: params.withCredentials,
            rangeChunkSize: params.rangeChunkSize,
            disableRange: params.disableRange,
            disableStream: params.disableStream
          });
        }

        resolve(networkStream);
      });
      return Promise.all([workerIdPromise, networkStreamPromise]).then(function ([workerId, networkStream]) {
        if (task.destroyed) {
          throw new Error("Loading aborted");
        }

        const messageHandler = new _message_handler.MessageHandler(docId, workerId, worker.port);
        messageHandler.postMessageTransfers = worker.postMessageTransfers;
        const transport = new WorkerTransport(messageHandler, task, networkStream, params);
        task._transport = transport;
        messageHandler.send("Ready", null);
      });
    }).catch(task._capability.reject);
    return task;
  }

  function _fetchDocument(worker, source, pdfDataRangeTransport, docId) {
    if (worker.destroyed) {
      return Promise.reject(new Error("Worker was destroyed"));
    }

    if (pdfDataRangeTransport) {
      source.length = pdfDataRangeTransport.length;
      source.initialData = pdfDataRangeTransport.initialData;
      source.progressiveDone = pdfDataRangeTransport.progressiveDone;
    }

    return worker.messageHandler.sendWithPromise("GetDocRequest", {
      docId,
      apiVersion: '2.7.570',
      source: {
        data: source.data,
        url: source.url,
        password: source.password,
        disableAutoFetch: source.disableAutoFetch,
        rangeChunkSize: source.rangeChunkSize,
        length: source.length
      },
      maxImageSize: source.maxImageSize,
      disableFontFace: source.disableFontFace,
      postMessageTransfers: worker.postMessageTransfers,
      docBaseUrl: source.docBaseUrl,
      ignoreErrors: source.ignoreErrors,
      isEvalSupported: source.isEvalSupported,
      fontExtraProperties: source.fontExtraProperties
    }).then(function (workerId) {
      if (worker.destroyed) {
        throw new Error("Worker was destroyed");
      }

      return workerId;
    });
  }

  const PDFDocumentLoadingTask = function PDFDocumentLoadingTaskClosure() {
    let nextDocumentId = 0;

    class PDFDocumentLoadingTask {
      constructor() {
        this._capability = (0, _util.createPromiseCapability)();
        this._transport = null;
        this._worker = null;
        this.docId = "d" + nextDocumentId++;
        this.destroyed = false;
        this.onPassword = null;
        this.onProgress = null;
        this.onUnsupportedFeature = null;
      }

      get promise() {
        return this._capability.promise;
      }

      destroy() {
        this.destroyed = true;
        const transportDestroyed = !this._transport ? Promise.resolve() : this._transport.destroy();
        return transportDestroyed.then(() => {
          this._transport = null;

          if (this._worker) {
            this._worker.destroy();

            this._worker = null;
          }
        });
      }

    }

    return PDFDocumentLoadingTask;
  }();

  class PDFDataRangeTransport {
    constructor(length, initialData, progressiveDone = false) {
      this.length = length;
      this.initialData = initialData;
      this.progressiveDone = progressiveDone;
      this._rangeListeners = [];
      this._progressListeners = [];
      this._progressiveReadListeners = [];
      this._progressiveDoneListeners = [];
      this._readyCapability = (0, _util.createPromiseCapability)();
    }

    addRangeListener(listener) {
      this._rangeListeners.push(listener);
    }

    addProgressListener(listener) {
      this._progressListeners.push(listener);
    }

    addProgressiveReadListener(listener) {
      this._progressiveReadListeners.push(listener);
    }

    addProgressiveDoneListener(listener) {
      this._progressiveDoneListeners.push(listener);
    }

    onDataRange(begin, chunk) {
      for (const listener of this._rangeListeners) {
        listener(begin, chunk);
      }
    }

    onDataProgress(loaded, total) {
      this._readyCapability.promise.then(() => {
        for (const listener of this._progressListeners) {
          listener(loaded, total);
        }
      });
    }

    onDataProgressiveRead(chunk) {
      this._readyCapability.promise.then(() => {
        for (const listener of this._progressiveReadListeners) {
          listener(chunk);
        }
      });
    }

    onDataProgressiveDone() {
      this._readyCapability.promise.then(() => {
        for (const listener of this._progressiveDoneListeners) {
          listener();
        }
      });
    }

    transportReady() {
      this._readyCapability.resolve();
    }

    requestDataRange(begin, end) {
      (0, _util.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
    }

    abort() {}

  }

  exports.PDFDataRangeTransport = PDFDataRangeTransport;

  class PDFDocumentProxy {
    constructor(pdfInfo, transport) {
      this._pdfInfo = pdfInfo;
      this._transport = transport;
    }

    get annotationStorage() {
      return (0, _util.shadow)(this, "annotationStorage", new _annotation_storage.AnnotationStorage());
    }

    get numPages() {
      return this._pdfInfo.numPages;
    }

    get fingerprint() {
      return this._pdfInfo.fingerprint;
    }

    getPage(pageNumber) {
      return this._transport.getPage(pageNumber);
    }

    getPageIndex(ref) {
      return this._transport.getPageIndex(ref);
    }

    getDestinations() {
      return this._transport.getDestinations();
    }

    getDestination(id) {
      return this._transport.getDestination(id);
    }

    getPageLabels() {
      return this._transport.getPageLabels();
    }

    getPageLayout() {
      return this._transport.getPageLayout();
    }

    getPageMode() {
      return this._transport.getPageMode();
    }

    getViewerPreferences() {
      return this._transport.getViewerPreferences();
    }

    getOpenAction() {
      return this._transport.getOpenAction();
    }

    getAttachments() {
      return this._transport.getAttachments();
    }

    getJavaScript() {
      return this._transport.getJavaScript();
    }

    getJSActions() {
      return this._transport.getDocJSActions();
    }

    getOutline() {
      return this._transport.getOutline();
    }

    getOptionalContentConfig() {
      return this._transport.getOptionalContentConfig();
    }

    getPermissions() {
      return this._transport.getPermissions();
    }

    getMetadata() {
      return this._transport.getMetadata();
    }

    getMarkInfo() {
      return this._transport.getMarkInfo();
    }

    getData() {
      return this._transport.getData();
    }

    getDownloadInfo() {
      return this._transport.downloadInfoCapability.promise;
    }

    getStats() {
      return this._transport.getStats();
    }

    cleanup() {
      return this._transport.startCleanup();
    }

    destroy() {
      return this.loadingTask.destroy();
    }

    get loadingParams() {
      return this._transport.loadingParams;
    }

    get loadingTask() {
      return this._transport.loadingTask;
    }

    saveDocument(annotationStorage) {
      return this._transport.saveDocument(annotationStorage);
    }

    getFieldObjects() {
      return this._transport.getFieldObjects();
    }

    hasJSActions() {
      return this._transport.hasJSActions();
    }

    getCalculationOrderIds() {
      return this._transport.getCalculationOrderIds();
    }

  }

  exports.PDFDocumentProxy = PDFDocumentProxy;

  class PDFPageProxy {
    constructor(pageIndex, pageInfo, transport, ownerDocument, pdfBug = false) {
      this._pageIndex = pageIndex;
      this._pageInfo = pageInfo;
      this._ownerDocument = ownerDocument;
      this._transport = transport;
      this._stats = pdfBug ? new _display_utils.StatTimer() : null;
      this._pdfBug = pdfBug;
      this.commonObjs = transport.commonObjs;
      this.objs = new PDFObjects();
      this.cleanupAfterRender = false;
      this.pendingCleanup = false;
      this._intentStates = new Map();
      this.destroyed = false;
    }

    get pageNumber() {
      return this._pageIndex + 1;
    }

    get rotate() {
      return this._pageInfo.rotate;
    }

    get ref() {
      return this._pageInfo.ref;
    }

    get userUnit() {
      return this._pageInfo.userUnit;
    }

    get view() {
      return this._pageInfo.view;
    }

    getViewport({
      scale,
      rotation = this.rotate,
      offsetX = 0,
      offsetY = 0,
      dontFlip = false
    } = {}) {
      return new _display_utils.PageViewport({
        viewBox: this.view,
        scale,
        rotation,
        offsetX,
        offsetY,
        dontFlip
      });
    }

    getAnnotations({
      intent = null
    } = {}) {
      if (!this.annotationsPromise || this.annotationsIntent !== intent) {
        this.annotationsPromise = this._transport.getAnnotations(this._pageIndex, intent);
        this.annotationsIntent = intent;
      }

      return this.annotationsPromise;
    }

    getJSActions() {
      return this._jsActionsPromise || (this._jsActionsPromise = this._transport.getPageJSActions(this._pageIndex));
    }

    render({
      canvasContext,
      viewport,
      intent = "display",
      enableWebGL = false,
      renderInteractiveForms = false,
      transform = null,
      imageLayer = null,
      canvasFactory = null,
      background = null,
      annotationStorage = null,
      optionalContentConfigPromise = null
    }) {
      if (this._stats) {
        this._stats.time("Overall");
      }

      const renderingIntent = intent === "print" ? "print" : "display";
      this.pendingCleanup = false;

      if (!optionalContentConfigPromise) {
        optionalContentConfigPromise = this._transport.getOptionalContentConfig();
      }

      let intentState = this._intentStates.get(renderingIntent);

      if (!intentState) {
        intentState = Object.create(null);

        this._intentStates.set(renderingIntent, intentState);
      }

      if (intentState.streamReaderCancelTimeout) {
        clearTimeout(intentState.streamReaderCancelTimeout);
        intentState.streamReaderCancelTimeout = null;
      }

      const canvasFactoryInstance = canvasFactory || new DefaultCanvasFactory({
        ownerDocument: this._ownerDocument
      });
      const webGLContext = new _webgl.WebGLContext({
        enable: enableWebGL
      });

      if (!intentState.displayReadyCapability) {
        intentState.displayReadyCapability = (0, _util.createPromiseCapability)();
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };

        if (this._stats) {
          this._stats.time("Page Request");
        }

        this._pumpOperatorList({
          pageIndex: this._pageIndex,
          intent: renderingIntent,
          renderInteractiveForms: renderInteractiveForms === true,
          annotationStorage: annotationStorage && annotationStorage.getAll() || null  // lwf
        });
      }

      const complete = error => {
        const i = intentState.renderTasks.indexOf(internalRenderTask);

        if (i >= 0) {
          intentState.renderTasks.splice(i, 1);
        }

        if (this.cleanupAfterRender || renderingIntent === "print") {
          this.pendingCleanup = true;
        }

        this._tryCleanup();

        if (error) {
          internalRenderTask.capability.reject(error);

          this._abortOperatorList({
            intentState,
            reason: error
          });
        } else {
          internalRenderTask.capability.resolve();
        }

        if (this._stats) {
          this._stats.timeEnd("Rendering");

          this._stats.timeEnd("Overall");
        }
      };

      const internalRenderTask = new InternalRenderTask({
        callback: complete,
        params: {
          canvasContext,
          viewport,
          transform,
          imageLayer,
          background
        },
        objs: this.objs,
        commonObjs: this.commonObjs,
        operatorList: intentState.operatorList,
        pageIndex: this._pageIndex,
        canvasFactory: canvasFactoryInstance,
        webGLContext,
        useRequestAnimationFrame: renderingIntent !== "print",
        pdfBug: this._pdfBug
      });

      if (!intentState.renderTasks) {
        intentState.renderTasks = [];
      }

      intentState.renderTasks.push(internalRenderTask);
      const renderTask = internalRenderTask.task;
      Promise.all([intentState.displayReadyCapability.promise, optionalContentConfigPromise]).then(([transparency, optionalContentConfig]) => {
        if (this.pendingCleanup) {
          complete();
          return;
        }

        if (this._stats) {
          this._stats.time("Rendering");
        }

        internalRenderTask.initializeGraphics({
          transparency,
          optionalContentConfig
        });
        internalRenderTask.operatorListChanged();
      }).catch(complete);
      return renderTask;
    }

    getOperatorList() {
      function operatorListChanged() {
        if (intentState.operatorList.lastChunk) {
          intentState.opListReadCapability.resolve(intentState.operatorList);
          const i = intentState.renderTasks.indexOf(opListTask);

          if (i >= 0) {
            intentState.renderTasks.splice(i, 1);
          }
        }
      }

      const renderingIntent = "oplist";

      let intentState = this._intentStates.get(renderingIntent);

      if (!intentState) {
        intentState = Object.create(null);

        this._intentStates.set(renderingIntent, intentState);
      }

      let opListTask;

      if (!intentState.opListReadCapability) {
        opListTask = Object.create(null);
        opListTask.operatorListChanged = operatorListChanged;
        intentState.opListReadCapability = (0, _util.createPromiseCapability)();
        intentState.renderTasks = [];
        intentState.renderTasks.push(opListTask);
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };

        if (this._stats) {
          this._stats.time("Page Request");
        }

        this._pumpOperatorList({
          pageIndex: this._pageIndex,
          intent: renderingIntent
        });
      }

      return intentState.opListReadCapability.promise;
    }

    streamTextContent({
      normalizeWhitespace = false,
      disableCombineTextItems = false
    } = {}) {
      const TEXT_CONTENT_CHUNK_SIZE = 100;
      return this._transport.messageHandler.sendWithStream("GetTextContent", {
        pageIndex: this._pageIndex,
        normalizeWhitespace: normalizeWhitespace === true,
        combineTextItems: disableCombineTextItems !== true
      }, {
        highWaterMark: TEXT_CONTENT_CHUNK_SIZE,

        size(textContent) {
          return textContent.items.length;
        }

      });
    }

    getTextContent(params = {}) {
      const readableStream = this.streamTextContent(params);
      return new Promise(function (resolve, reject) {
        function pump() {
          reader.read().then(function ({
            value,
            done
          }) {
            if (done) {
              resolve(textContent);
              return;
            }

            Object.assign(textContent.styles, value.styles);
            textContent.items.push(...value.items);
            pump();
          }, reject);
        }

        const reader = readableStream.getReader();
        const textContent = {
          items: [],
          styles: Object.create(null)
        };
        pump();
      });
    }

    _destroy() {
      this.destroyed = true;
      this._transport.pageCache[this._pageIndex] = null;
      const waitOn = [];

      for (const [intent, intentState] of this._intentStates) {
        this._abortOperatorList({
          intentState,
          reason: new Error("Page was destroyed."),
          force: true
        });

        if (intent === "oplist") {
          continue;
        }

        for (const internalRenderTask of intentState.renderTasks) {
          waitOn.push(internalRenderTask.completed);
          internalRenderTask.cancel();
        }
      }

      this.objs.clear();
      this.annotationsPromise = null;
      this._jsActionsPromise = null;
      this.pendingCleanup = false;
      return Promise.all(waitOn);
    }

    cleanup(resetStats = false) {
      this.pendingCleanup = true;
      return this._tryCleanup(resetStats);
    }

    _tryCleanup(resetStats = false) {
      if (!this.pendingCleanup) {
        return false;
      }

      for (const {
        renderTasks,
        operatorList
      } of this._intentStates.values()) {
        if (renderTasks.length !== 0 || !operatorList.lastChunk) {
          return false;
        }
      }

      this._intentStates.clear();

      this.objs.clear();
      this.annotationsPromise = null;
      this._jsActionsPromise = null;

      if (resetStats && this._stats) {
        this._stats = new _display_utils.StatTimer();
      }

      this.pendingCleanup = false;
      return true;
    }

    _startRenderPage(transparency, intent) {
      const intentState = this._intentStates.get(intent);

      if (!intentState) {
        return;
      }

      if (this._stats) {
        this._stats.timeEnd("Page Request");
      }

      if (intentState.displayReadyCapability) {
        intentState.displayReadyCapability.resolve(transparency);
      }
    }

    _renderPageChunk(operatorListChunk, intentState) {
      for (let i = 0, ii = operatorListChunk.length; i < ii; i++) {
        intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
        intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
      }

      intentState.operatorList.lastChunk = operatorListChunk.lastChunk;

      for (let i = 0; i < intentState.renderTasks.length; i++) {
        intentState.renderTasks[i].operatorListChanged();
      }

      if (operatorListChunk.lastChunk) {
        this._tryCleanup();
      }
    }

    _pumpOperatorList(args) {
      (0, _util.assert)(args.intent, 'PDFPageProxy._pumpOperatorList: Expected "intent" argument.');

      const readableStream = this._transport.messageHandler.sendWithStream("GetOperatorList", args);

      const reader = readableStream.getReader();

      const intentState = this._intentStates.get(args.intent);

      intentState.streamReader = reader;

      const pump = () => {
        reader.read().then(({
          value,
          done
        }) => {
          if (done) {
            intentState.streamReader = null;
            return;
          }

          if (this._transport.destroyed) {
            return;
          }

          this._renderPageChunk(value, intentState);

          pump();
        }, reason => {
          intentState.streamReader = null;

          if (this._transport.destroyed) {
            return;
          }

          if (intentState.operatorList) {
            intentState.operatorList.lastChunk = true;

            for (let i = 0; i < intentState.renderTasks.length; i++) {
              intentState.renderTasks[i].operatorListChanged();
            }

            this._tryCleanup();
          }

          if (intentState.displayReadyCapability) {
            intentState.displayReadyCapability.reject(reason);
          } else if (intentState.opListReadCapability) {
            intentState.opListReadCapability.reject(reason);
          } else {
            throw reason;
          }
        });
      };

      pump();
    }

    _abortOperatorList({
      intentState,
      reason,
      force = false
    }) {
      (0, _util.assert)(reason instanceof Error || typeof reason === "object" && reason !== null, 'PDFPageProxy._abortOperatorList: Expected "reason" argument.');

      if (!intentState.streamReader) {
        return;
      }

      if (!force) {
        if (intentState.renderTasks.length !== 0) {
          return;
        }

        if (reason instanceof _display_utils.RenderingCancelledException) {
          intentState.streamReaderCancelTimeout = setTimeout(() => {
            this._abortOperatorList({
              intentState,
              reason,
              force: true
            });

            intentState.streamReaderCancelTimeout = null;
          }, RENDERING_CANCELLED_TIMEOUT);
          return;
        }
      }

      intentState.streamReader.cancel(new _util.AbortException(reason && reason.message)); // lwf
      intentState.streamReader = null;

      if (this._transport.destroyed) {
        return;
      }

      for (const [intent, curIntentState] of this._intentStates) {
        if (curIntentState === intentState) {
          this._intentStates.delete(intent);

          break;
        }
      }

      this.cleanup();
    }

    get stats() {
      return this._stats;
    }

  }

  exports.PDFPageProxy = PDFPageProxy;

  class LoopbackPort {
    constructor(defer = true) {
      this._listeners = [];
      this._defer = defer;
      this._deferred = Promise.resolve(undefined);
    }

    postMessage(obj, transfers) {
      function cloneValue(value) {
        if (typeof value !== "object" || value === null) {
          return value;
        }

        if (cloned.has(value)) {
          return cloned.get(value);
        }

        let buffer, result;

        if ((buffer = value.buffer) && (0, _util.isArrayBuffer)(buffer)) {
          if (transfers && transfers.includes(buffer)) { // lwf
            result = new value.constructor(buffer, value.byteOffset, value.byteLength);
          } else {
            result = new value.constructor(value);
          }

          cloned.set(value, result);
          return result;
        }

        result = Array.isArray(value) ? [] : {};
        cloned.set(value, result);

        for (const i in value) {
          let desc,
              p = value;

          while (!(desc = Object.getOwnPropertyDescriptor(p, i))) {
            p = Object.getPrototypeOf(p);
          }

          if (typeof desc.value === "undefined") {
            continue;
          }

          if (typeof desc.value === "function") {
            if (value.hasOwnProperty && value.hasOwnProperty(i)) {
              throw new Error(`LoopbackPort.postMessage - cannot clone: ${value[i]}`);
            }

            continue;
          }

          result[i] = cloneValue(desc.value);
        }

        return result;
      }

      if (!this._defer) {
        this._listeners.forEach(listener => {
          listener.call(this, {
            data: obj
          });
        });

        return;
      }

      const cloned = new WeakMap();
      const e = {
        data: cloneValue(obj)
      };

      this._deferred.then(() => {
        this._listeners.forEach(listener => {
          listener.call(this, e);
        });
      });
    }

    addEventListener(name, listener) {
      this._listeners.push(listener);
    }

    removeEventListener(name, listener) {
      const i = this._listeners.indexOf(listener);

      this._listeners.splice(i, 1);
    }

    terminate() {
      this._listeners.length = 0;
    }

  }

  exports.LoopbackPort = LoopbackPort;

  const PDFWorker = function PDFWorkerClosure() {
    const pdfWorkerPorts = new WeakMap();
    let isWorkerDisabled = false;
    let fallbackWorkerSrc;
    let nextFakeWorkerId = 0;
    let fakeWorkerCapability;

    if (_is_node.isNodeJS && typeof require === "function") {
      isWorkerDisabled = true;
      fallbackWorkerSrc = "./skylark-pdfjs-worker-all.js"; //"./pdf.worker.js";
    } else if (typeof document === "object" && "currentScript" in document) {
      const pdfjsFilePath = document.currentScript && document.currentScript.src; // lwf

      if (pdfjsFilePath) {
        fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2");
      }
    }

    function getWorkerSrc() {
      if (_worker_options.GlobalWorkerOptions.workerSrc) {
        return _worker_options.GlobalWorkerOptions.workerSrc;
      }

      if (typeof fallbackWorkerSrc !== "undefined") {
        if (!_is_node.isNodeJS) {
          (0, _display_utils.deprecated)('No "GlobalWorkerOptions.workerSrc" specified.');
        }

        return fallbackWorkerSrc;
      }

      throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
    }

    function getMainThreadWorkerMessageHandler() {
      let mainWorkerMessageHandler;

      try {
        ///mainWorkerMessageHandler = globalThis.pdfjsWorker && globalThis.pdfjsWorker.WorkerMessageHandler;  // lwf
        mainWorkerMessageHandler = pdfjs.worker.WorkerMessageHandler; 
      } catch (ex) {}

      return mainWorkerMessageHandler || null;
    }

    function setupFakeWorkerGlobal() {
      if (fakeWorkerCapability) {
        return fakeWorkerCapability.promise;
      }

      fakeWorkerCapability = (0, _util.createPromiseCapability)();

      const loader = async function () {
        const mainWorkerMessageHandler = getMainThreadWorkerMessageHandler();

        if (mainWorkerMessageHandler) {
          return mainWorkerMessageHandler;
        }

        if (_is_node.isNodeJS && typeof require === "function") {
          const worker = eval("require")(getWorkerSrc());
          return worker.WorkerMessageHandler;
        }

        await (0, _display_utils.loadScript)(getWorkerSrc());
        return window.pdfjsWorker.WorkerMessageHandler;
      };

      loader().then(fakeWorkerCapability.resolve, fakeWorkerCapability.reject);
      return fakeWorkerCapability.promise;
    }

    function createCDNWrapper(url) {
      const wrapper = "importScripts('" + url + "');";
      return URL.createObjectURL(new Blob([wrapper]));
    }

    class PDFWorker {
      constructor({
        name = null,
        port = null,
        verbosity = (0, _util.getVerbosityLevel)()
      } = {}) {
        if (port && pdfWorkerPorts.has(port)) {
          throw new Error("Cannot use more than one PDFWorker per port");
        }

        this.name = name;
        this.destroyed = false;
        this.postMessageTransfers = true;
        this.verbosity = verbosity;
        this._readyCapability = (0, _util.createPromiseCapability)();
        this._port = null;
        this._webWorker = null;
        this._messageHandler = null;

        if (port) {
          pdfWorkerPorts.set(port, this);

          this._initializeFromPort(port);

          return;
        }

        this._initialize();
      }

      get promise() {
        return this._readyCapability.promise;
      }

      get port() {
        return this._port;
      }

      get messageHandler() {
        return this._messageHandler;
      }

      _initializeFromPort(port) {
        this._port = port;
        this._messageHandler = new _message_handler.MessageHandler("main", "worker", port);

        this._messageHandler.on("ready", function () {});

        this._readyCapability.resolve();
      }

      _initialize() {
        if (typeof Worker !== "undefined" && !isWorkerDisabled && !getMainThreadWorkerMessageHandler()) {
          let workerSrc = getWorkerSrc();

          try {
            if (!(0, _util.isSameOrigin)(window.location.href, workerSrc)) {
              workerSrc = createCDNWrapper(new URL(workerSrc, window.location).href);
            }

            const worker = new Worker(workerSrc);
            const messageHandler = new _message_handler.MessageHandler("main", "worker", worker);

            const terminateEarly = () => {
              worker.removeEventListener("error", onWorkerError);
              messageHandler.destroy();
              worker.terminate();

              if (this.destroyed) {
                this._readyCapability.reject(new Error("Worker was destroyed"));
              } else {
                this._setupFakeWorker();
              }
            };

            const onWorkerError = () => {
              if (!this._webWorker) {
                terminateEarly();
              }
            };

            worker.addEventListener("error", onWorkerError);
            messageHandler.on("test", data => {
              worker.removeEventListener("error", onWorkerError);

              if (this.destroyed) {
                terminateEarly();
                return;
              }

              if (data) {
                this._messageHandler = messageHandler;
                this._port = worker;
                this._webWorker = worker;

                if (!data.supportTransfers) {
                  this.postMessageTransfers = false;
                }

                this._readyCapability.resolve();

                messageHandler.send("configure", {
                  verbosity: this.verbosity
                });
              } else {
                this._setupFakeWorker();

                messageHandler.destroy();
                worker.terminate();
              }
            });
            messageHandler.on("ready", data => {
              worker.removeEventListener("error", onWorkerError);

              if (this.destroyed) {
                terminateEarly();
                return;
              }

              try {
                sendTest();
              } catch (e) {
                this._setupFakeWorker();
              }
            });

            const sendTest = () => {
              const testObj = new Uint8Array([this.postMessageTransfers ? 255 : 0]);

              try {
                messageHandler.send("test", testObj, [testObj.buffer]);
              } catch (ex) {
                (0, _util.warn)("Cannot use postMessage transfers.");
                testObj[0] = 0;
                messageHandler.send("test", testObj);
              }
            };

            sendTest();
            return;
          } catch (e) {
            (0, _util.info)("The worker has been disabled.");
          }
        }

        this._setupFakeWorker();
      }

      _setupFakeWorker() {
        if (!isWorkerDisabled) {
          (0, _util.warn)("Setting up fake worker.");
          isWorkerDisabled = true;
        }

        setupFakeWorkerGlobal().then(WorkerMessageHandler => {
          if (this.destroyed) {
            this._readyCapability.reject(new Error("Worker was destroyed"));

            return;
          }

          const port = new LoopbackPort();
          this._port = port;
          const id = "fake" + nextFakeWorkerId++;
          const workerHandler = new _message_handler.MessageHandler(id + "_worker", id, port);
          WorkerMessageHandler.setup(workerHandler, port);
          const messageHandler = new _message_handler.MessageHandler(id, id + "_worker", port);
          this._messageHandler = messageHandler;

          this._readyCapability.resolve();

          messageHandler.send("configure", {
            verbosity: this.verbosity
          });
        }).catch(reason => {
          this._readyCapability.reject(new Error(`Setting up fake worker failed: "${reason.message}".`));
        });
      }

      destroy() {
        this.destroyed = true;

        if (this._webWorker) {
          this._webWorker.terminate();

          this._webWorker = null;
        }

        pdfWorkerPorts.delete(this._port);
        this._port = null;

        if (this._messageHandler) {
          this._messageHandler.destroy();

          this._messageHandler = null;
        }
      }

      static fromPort(params) {
        if (!params || !params.port) {
          throw new Error("PDFWorker.fromPort - invalid method signature.");
        }

        if (pdfWorkerPorts.has(params.port)) {
          return pdfWorkerPorts.get(params.port);
        }

        return new PDFWorker(params);
      }

      static getWorkerSrc() {
        return getWorkerSrc();
      }

    }

    return PDFWorker;
  }();

  exports.PDFWorker = PDFWorker;

  class WorkerTransport {
    constructor(messageHandler, loadingTask, networkStream, params) {
      this.messageHandler = messageHandler;
      this.loadingTask = loadingTask;
      this.commonObjs = new PDFObjects();
      this.fontLoader = new _font_loader.FontLoader({
        docId: loadingTask.docId,
        onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
        ownerDocument: params.ownerDocument
      });
      this._params = params;
      this.CMapReaderFactory = new params.CMapReaderFactory({
        baseUrl: params.cMapUrl,
        isCompressed: params.cMapPacked
      });
      this.destroyed = false;
      this.destroyCapability = null;
      this._passwordCapability = null;
      this._networkStream = networkStream;
      this._fullReader = null;
      this._lastProgress = null;
      this.pageCache = [];
      this.pagePromises = [];
      this.downloadInfoCapability = (0, _util.createPromiseCapability)();
      this.setupMessageHandler();
    }

    get loadingTaskSettled() {
      return this.loadingTask._capability.settled;
    }

    destroy() {
      if (this.destroyCapability) {
        return this.destroyCapability.promise;
      }

      this.destroyed = true;
      this.destroyCapability = (0, _util.createPromiseCapability)();

      if (this._passwordCapability) {
        this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
      }

      const waitOn = [];
      this.pageCache.forEach(function (page) {
        if (page) {
          waitOn.push(page._destroy());
        }
      });
      this.pageCache.length = 0;
      this.pagePromises.length = 0;
      const terminated = this.messageHandler.sendWithPromise("Terminate", null);
      waitOn.push(terminated);

      if (this.loadingTaskSettled) {
        const annotationStorageResetModified = this.loadingTask.promise.then(pdfDocument => {
          if (pdfDocument.hasOwnProperty("annotationStorage")) {
            pdfDocument.annotationStorage.resetModified();
          }
        }).catch(() => {});
        waitOn.push(annotationStorageResetModified);
      }

      Promise.all(waitOn).then(() => {
        this.commonObjs.clear();
        this.fontLoader.clear();
        this._hasJSActionsPromise = null;

        if (this._networkStream) {
          this._networkStream.cancelAllRequests(new _util.AbortException("Worker was terminated."));
        }

        if (this.messageHandler) {
          this.messageHandler.destroy();
          this.messageHandler = null;
        }

        this.destroyCapability.resolve();
      }, this.destroyCapability.reject);
      return this.destroyCapability.promise;
    }

    setupMessageHandler() {
      const {
        messageHandler,
        loadingTask
      } = this;
      messageHandler.on("GetReader", (data, sink) => {
        (0, _util.assert)(this._networkStream, "GetReader - no `IPDFStream` instance available.");
        this._fullReader = this._networkStream.getFullReader();

        this._fullReader.onProgress = evt => {
          this._lastProgress = {
            loaded: evt.loaded,
            total: evt.total
          };
        };

        sink.onPull = () => {
          this._fullReader.read().then(function ({
            value,
            done
          }) {
            if (done) {
              sink.close();
              return;
            }

            (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetReader - expected an ArrayBuffer.");
            sink.enqueue(new Uint8Array(value), 1, [value]);
          }).catch(reason => {
            sink.error(reason);
          });
        };

        sink.onCancel = reason => {
          this._fullReader.cancel(reason);

          sink.ready.catch(readyReason => {
            if (this.destroyed) {
              return;
            }

            throw readyReason;
          });
        };
      });
      messageHandler.on("ReaderHeadersReady", data => {
        const headersCapability = (0, _util.createPromiseCapability)();
        const fullReader = this._fullReader;
        fullReader.headersReady.then(() => {
          if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
            if (this._lastProgress && loadingTask.onProgress) {
              loadingTask.onProgress(this._lastProgress);
            }

            fullReader.onProgress = evt => {
              if (loadingTask.onProgress) {
                loadingTask.onProgress({
                  loaded: evt.loaded,
                  total: evt.total
                });
              }
            };
          }

          headersCapability.resolve({
            isStreamingSupported: fullReader.isStreamingSupported,
            isRangeSupported: fullReader.isRangeSupported,
            contentLength: fullReader.contentLength
          });
        }, headersCapability.reject);
        return headersCapability.promise;
      });
      messageHandler.on("GetRangeReader", (data, sink) => {
        (0, _util.assert)(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");

        const rangeReader = this._networkStream.getRangeReader(data.begin, data.end);

        if (!rangeReader) {
          sink.close();
          return;
        }

        sink.onPull = () => {
          rangeReader.read().then(function ({
            value,
            done
          }) {
            if (done) {
              sink.close();
              return;
            }

            (0, _util.assert)((0, _util.isArrayBuffer)(value), "GetRangeReader - expected an ArrayBuffer.");
            sink.enqueue(new Uint8Array(value), 1, [value]);
          }).catch(reason => {
            sink.error(reason);
          });
        };

        sink.onCancel = reason => {
          rangeReader.cancel(reason);
          sink.ready.catch(readyReason => {
            if (this.destroyed) {
              return;
            }

            throw readyReason;
          });
        };
      });
      messageHandler.on("GetDoc", ({
        pdfInfo
      }) => {
        this._numPages = pdfInfo.numPages;

        loadingTask._capability.resolve(new PDFDocumentProxy(pdfInfo, this));
      });
      messageHandler.on("DocException", function (ex) {
        let reason;

        switch (ex.name) {
          case "PasswordException":
            reason = new _util.PasswordException(ex.message, ex.code);
            break;

          case "InvalidPDFException":
            reason = new _util.InvalidPDFException(ex.message);
            break;

          case "MissingPDFException":
            reason = new _util.MissingPDFException(ex.message);
            break;

          case "UnexpectedResponseException":
            reason = new _util.UnexpectedResponseException(ex.message, ex.status);
            break;

          case "UnknownErrorException":
            reason = new _util.UnknownErrorException(ex.message, ex.details);
            break;
        }

        if (!(reason instanceof Error)) {
          const msg = "DocException - expected a valid Error.";
          (0, _util.warn)(msg);
        }

        loadingTask._capability.reject(reason);
      });
      messageHandler.on("PasswordRequest", exception => {
        this._passwordCapability = (0, _util.createPromiseCapability)();

        if (loadingTask.onPassword) {
          const updatePassword = password => {
            this._passwordCapability.resolve({
              password
            });
          };

          try {
            loadingTask.onPassword(updatePassword, exception.code);
          } catch (ex) {
            this._passwordCapability.reject(ex);
          }
        } else {
          this._passwordCapability.reject(new _util.PasswordException(exception.message, exception.code));
        }

        return this._passwordCapability.promise;
      });
      messageHandler.on("DataLoaded", data => {
        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.length,
            total: data.length
          });
        }

        this.downloadInfoCapability.resolve(data);
      });
      messageHandler.on("StartRenderPage", data => {
        if (this.destroyed) {
          return;
        }

        const page = this.pageCache[data.pageIndex];

        page._startRenderPage(data.transparency, data.intent);
      });
      messageHandler.on("commonobj", data => {
        if (this.destroyed) {
          return;
        }

        const [id, type, exportedData] = data;

        if (this.commonObjs.has(id)) {
          return;
        }

        switch (type) {
          case "Font":
            const params = this._params;

            if ("error" in exportedData) {
              const exportedError = exportedData.error;
              (0, _util.warn)(`Error during font loading: ${exportedError}`);
              this.commonObjs.resolve(id, exportedError);
              break;
            }

            let fontRegistry = null;

            if (params.pdfBug && globalThis.FontInspector && globalThis.FontInspector.enabled) { //lwf
              fontRegistry = {
                registerFont(font, url) {
                  globalThis.FontInspector.fontAdded(font, url);
                }

              };
            }

            const font = new _font_loader.FontFaceObject(exportedData, {
              isEvalSupported: params.isEvalSupported,
              disableFontFace: params.disableFontFace,
              ignoreErrors: params.ignoreErrors,
              onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
              fontRegistry
            });
            this.fontLoader.bind(font).catch(reason => {
              return messageHandler.sendWithPromise("FontFallback", {
                id
              });
            }).finally(() => {
              if (!params.fontExtraProperties && font.data) {
                font.data = null;
              }

              this.commonObjs.resolve(id, font);
            });
            break;

          case "FontPath":
          case "Image":
            this.commonObjs.resolve(id, exportedData);
            break;

          default:
            throw new Error(`Got unknown common object type ${type}`);
        }
      });
      messageHandler.on("obj", data => {
        if (this.destroyed) {
          return undefined;
        }

        const [id, pageIndex, type, imageData] = data;
        const pageProxy = this.pageCache[pageIndex];

        if (pageProxy.objs.has(id)) {
          return undefined;
        }

        switch (type) {
          case "Image":
            pageProxy.objs.resolve(id, imageData);
            const MAX_IMAGE_SIZE_TO_STORE = 8000000;

            if (imageData && imageData.data && imageData.data.length > MAX_IMAGE_SIZE_TO_STORE) { //lwf
              pageProxy.cleanupAfterRender = true;
            }

            break;

          default:
            throw new Error(`Got unknown object type ${type}`);
        }

        return undefined;
      });
      messageHandler.on("DocProgress", data => {
        if (this.destroyed) {
          return;
        }

        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.loaded,
            total: data.total
          });
        }
      });
      messageHandler.on("UnsupportedFeature", this._onUnsupportedFeature.bind(this));
      messageHandler.on("FetchBuiltInCMap", (data, sink) => {
        if (this.destroyed) {
          sink.error(new Error("Worker was destroyed"));
          return;
        }

        let fetched = false;

        sink.onPull = () => {
          if (fetched) {
            sink.close();
            return;
          }

          fetched = true;
          this.CMapReaderFactory.fetch(data).then(function (builtInCMap) {
            sink.enqueue(builtInCMap, 1, [builtInCMap.cMapData.buffer]);
          }).catch(function (reason) {
            sink.error(reason);
          });
        };
      });
    }

    _onUnsupportedFeature({
      featureId
    }) {
      if (this.destroyed) {
        return;
      }

      if (this.loadingTask.onUnsupportedFeature) {
        this.loadingTask.onUnsupportedFeature(featureId);
      }
    }

    getData() {
      return this.messageHandler.sendWithPromise("GetData", null);
    }

    getPage(pageNumber) {
      if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this._numPages) {
        return Promise.reject(new Error("Invalid page request"));
      }

      const pageIndex = pageNumber - 1;

      if (pageIndex in this.pagePromises) {
        return this.pagePromises[pageIndex];
      }

      const promise = this.messageHandler.sendWithPromise("GetPage", {
        pageIndex
      }).then(pageInfo => {
        if (this.destroyed) {
          throw new Error("Transport destroyed");
        }

        const page = new PDFPageProxy(pageIndex, pageInfo, this, this._params.ownerDocument, this._params.pdfBug);
        this.pageCache[pageIndex] = page;
        return page;
      });
      this.pagePromises[pageIndex] = promise;
      return promise;
    }

    getPageIndex(ref) {
      return this.messageHandler.sendWithPromise("GetPageIndex", {
        ref
      }).catch(function (reason) {
        return Promise.reject(new Error(reason));
      });
    }

    getAnnotations(pageIndex, intent) {
      return this.messageHandler.sendWithPromise("GetAnnotations", {
        pageIndex,
        intent
      });
    }

    saveDocument(annotationStorage) {
      return this.messageHandler.sendWithPromise("SaveDocument", {
        numPages: this._numPages,
        annotationStorage: annotationStorage && annotationStorage.getAll() || null,  // lwf
        filename: this._fullReader && this._fullReader.filename || null // lwf
      }).finally(() => {
        if (annotationStorage) {
          annotationStorage.resetModified();
        }
      });
    }

    getFieldObjects() {
      return this.messageHandler.sendWithPromise("GetFieldObjects", null);
    }

    hasJSActions() {
      return this._hasJSActionsPromise || (this._hasJSActionsPromise = this.messageHandler.sendWithPromise("HasJSActions", null));
    }

    getCalculationOrderIds() {
      return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
    }

    getDestinations() {
      return this.messageHandler.sendWithPromise("GetDestinations", null);
    }

    getDestination(id) {
      if (typeof id !== "string") {
        return Promise.reject(new Error("Invalid destination request."));
      }

      return this.messageHandler.sendWithPromise("GetDestination", {
        id
      });
    }

    getPageLabels() {
      return this.messageHandler.sendWithPromise("GetPageLabels", null);
    }

    getPageLayout() {
      return this.messageHandler.sendWithPromise("GetPageLayout", null);
    }

    getPageMode() {
      return this.messageHandler.sendWithPromise("GetPageMode", null);
    }

    getViewerPreferences() {
      return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
    }

    getOpenAction() {
      return this.messageHandler.sendWithPromise("GetOpenAction", null);
    }

    getAttachments() {
      return this.messageHandler.sendWithPromise("GetAttachments", null);
    }

    getJavaScript() {
      return this.messageHandler.sendWithPromise("GetJavaScript", null);
    }

    getDocJSActions() {
      return this.messageHandler.sendWithPromise("GetDocJSActions", null);
    }

    getPageJSActions(pageIndex) {
      return this.messageHandler.sendWithPromise("GetPageJSActions", {
        pageIndex
      });
    }

    getOutline() {
      return this.messageHandler.sendWithPromise("GetOutline", null);
    }

    getOptionalContentConfig() {
      return this.messageHandler.sendWithPromise("GetOptionalContentConfig", null).then(results => {
        return new _optional_content_config.OptionalContentConfig(results);
      });
    }

    getPermissions() {
      return this.messageHandler.sendWithPromise("GetPermissions", null);
    }

    getMetadata() {
      return this.messageHandler.sendWithPromise("GetMetadata", null).then(results => {
        return {
          info: results[0],
          metadata: results[1] ? new _metadata.Metadata(results[1]) : null,
          contentDispositionFilename: this._fullReader && this._fullReader.filename || null, // lwf
          contentLength: this._fullReader && this._fullReader.contentLength || null  // lwf
        };
      });
    }

    getMarkInfo() {
      return this.messageHandler.sendWithPromise("GetMarkInfo", null);
    }

    getStats() {
      return this.messageHandler.sendWithPromise("GetStats", null);
    }

    startCleanup() {
      return this.messageHandler.sendWithPromise("Cleanup", null).then(() => {
        for (let i = 0, ii = this.pageCache.length; i < ii; i++) {
          const page = this.pageCache[i];

          if (page) {
            const cleanupSuccessful = page.cleanup();

            if (!cleanupSuccessful) {
              throw new Error(`startCleanup: Page ${i + 1} is currently rendering.`);
            }
          }
        }

        this.commonObjs.clear();
        this.fontLoader.clear();
        this._hasJSActionsPromise = null;
      });
    }

    get loadingParams() {
      const params = this._params;
      return (0, _util.shadow)(this, "loadingParams", {
        disableAutoFetch: params.disableAutoFetch,
        disableFontFace: params.disableFontFace
      });
    }

  }

  class PDFObjects {
    constructor() {
      this._objs = Object.create(null);
    }

    _ensureObj(objId) {
      if (this._objs[objId]) {
        return this._objs[objId];
      }

      return this._objs[objId] = {
        capability: (0, _util.createPromiseCapability)(),
        data: null,
        resolved: false
      };
    }

    get(objId, callback = null) {
      if (callback) {
        this._ensureObj(objId).capability.promise.then(callback);

        return null;
      }

      const obj = this._objs[objId];

      if (!obj || !obj.resolved) {
        throw new Error(`Requesting object that isn't resolved yet ${objId}.`);
      }

      return obj.data;
    }

    has(objId) {
      const obj = this._objs[objId];
      return obj && obj.resolved || false; // lwf
    }

    resolve(objId, data) {
      const obj = this._ensureObj(objId);

      obj.resolved = true;
      obj.data = data;
      obj.capability.resolve(data);
    }

    clear() {
      this._objs = Object.create(null);
    }

  }

  class RenderTask {
    constructor(internalRenderTask) {
      this._internalRenderTask = internalRenderTask;
      this.onContinue = null;
    }

    get promise() {
      return this._internalRenderTask.capability.promise;
    }

    cancel() {
      this._internalRenderTask.cancel();
    }

  }

  const InternalRenderTask = function InternalRenderTaskClosure() {
    const canvasInRendering = new WeakSet();

    class InternalRenderTask {
      constructor({
        callback,
        params,
        objs,
        commonObjs,
        operatorList,
        pageIndex,
        canvasFactory,
        webGLContext,
        useRequestAnimationFrame = false,
        pdfBug = false
      }) {
        this.callback = callback;
        this.params = params;
        this.objs = objs;
        this.commonObjs = commonObjs;
        this.operatorListIdx = null;
        this.operatorList = operatorList;
        this._pageIndex = pageIndex;
        this.canvasFactory = canvasFactory;
        this.webGLContext = webGLContext;
        this._pdfBug = pdfBug;
        this.running = false;
        this.graphicsReadyCallback = null;
        this.graphicsReady = false;
        this._useRequestAnimationFrame = useRequestAnimationFrame === true && typeof window !== "undefined";
        this.cancelled = false;
        this.capability = (0, _util.createPromiseCapability)();
        this.task = new RenderTask(this);
        this._continueBound = this._continue.bind(this);
        this._scheduleNextBound = this._scheduleNext.bind(this);
        this._nextBound = this._next.bind(this);
        this._canvas = params.canvasContext.canvas;
      }

      get completed() {
        return this.capability.promise.catch(function () {});
      }

      initializeGraphics({
        transparency = false,
        optionalContentConfig
      }) {
        if (this.cancelled) {
          return;
        }

        if (this._canvas) {
          if (canvasInRendering.has(this._canvas)) {
            throw new Error("Cannot use the same canvas during multiple render() operations. " + "Use different canvas or ensure previous operations were " + "cancelled or completed.");
          }

          canvasInRendering.add(this._canvas);
        }

        if (this._pdfBug && globalThis.StepperManager && globalThis.StepperManager.enabled) { // lwf
          this.stepper = globalThis.StepperManager.create(this._pageIndex);
          this.stepper.init(this.operatorList);
          this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
        }

        const {
          canvasContext,
          viewport,
          transform,
          imageLayer,
          background
        } = this.params;
        this.gfx = new _canvas.CanvasGraphics(canvasContext, this.commonObjs, this.objs, this.canvasFactory, this.webGLContext, imageLayer, optionalContentConfig);
        this.gfx.beginDrawing({
          transform,
          viewport,
          transparency,
          background
        });
        this.operatorListIdx = 0;
        this.graphicsReady = true;

        if (this.graphicsReadyCallback) {
          this.graphicsReadyCallback();
        }
      }

      cancel(error = null) {
        this.running = false;
        this.cancelled = true;

        if (this.gfx) {
          this.gfx.endDrawing();
        }

        if (this._canvas) {
          canvasInRendering.delete(this._canvas);
        }

        this.callback(error || new _display_utils.RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1}`, "canvas"));
      }

      operatorListChanged() {
        if (!this.graphicsReady) {
          if (!this.graphicsReadyCallback) {
            this.graphicsReadyCallback = this._continueBound;
          }

          return;
        }

        if (this.stepper) {
          this.stepper.updateOperatorList(this.operatorList);
        }

        if (this.running) {
          return;
        }

        this._continue();
      }

      _continue() {
        this.running = true;

        if (this.cancelled) {
          return;
        }

        if (this.task.onContinue) {
          this.task.onContinue(this._scheduleNextBound);
        } else {
          this._scheduleNext();
        }
      }

      _scheduleNext() {
        if (this._useRequestAnimationFrame) {
          window.requestAnimationFrame(() => {
            this._nextBound().catch(this.cancel.bind(this));
          });
        } else {
          Promise.resolve().then(this._nextBound).catch(this.cancel.bind(this));
        }
      }

      async _next() {
        if (this.cancelled) {
          return;
        }

        this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);

        if (this.operatorListIdx === this.operatorList.argsArray.length) {
          this.running = false;

          if (this.operatorList.lastChunk) {
            this.gfx.endDrawing();

            if (this._canvas) {
              canvasInRendering.delete(this._canvas);
            }

            this.callback();
          }
        }
      }

    }

    return InternalRenderTask;
  }();

  const version = '2.7.570';
  exports.version = version;
  const build = 'f2c7338b0';
  exports.build = build;

  /***/ }),
  /* 6 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.FontLoader = exports.FontFaceObject = void 0;

  var _util = __w_pdfjs_require__(2);

  class BaseFontLoader {
    constructor({
      docId,
      onUnsupportedFeature,
      ownerDocument = globalThis.document
    }) {
      if (this.constructor === BaseFontLoader) {
        (0, _util.unreachable)("Cannot initialize BaseFontLoader.");
      }

      this.docId = docId;
      this._onUnsupportedFeature = onUnsupportedFeature;
      this._document = ownerDocument;
      this.nativeFontFaces = [];
      this.styleElement = null;
    }

    addNativeFontFace(nativeFontFace) {
      this.nativeFontFaces.push(nativeFontFace);

      this._document.fonts.add(nativeFontFace);
    }

    insertRule(rule) {
      let styleElement = this.styleElement;

      if (!styleElement) {
        styleElement = this.styleElement = this._document.createElement("style");
        styleElement.id = `PDFJS_FONT_STYLE_TAG_${this.docId}`;

        this._document.documentElement.getElementsByTagName("head")[0].appendChild(styleElement);
      }

      const styleSheet = styleElement.sheet;
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    }

    clear() {
      this.nativeFontFaces.forEach(nativeFontFace => {
        this._document.fonts.delete(nativeFontFace);
      });
      this.nativeFontFaces.length = 0;

      if (this.styleElement) {
        this.styleElement.remove();
        this.styleElement = null;
      }
    }

    async bind(font) {
      if (font.attached || font.missingFile) {
        return;
      }

      font.attached = true;

      if (this.isFontLoadingAPISupported) {
        const nativeFontFace = font.createNativeFontFace();

        if (nativeFontFace) {
          this.addNativeFontFace(nativeFontFace);

          try {
            await nativeFontFace.loaded;
          } catch (ex) {
            this._onUnsupportedFeature({
              featureId: _util.UNSUPPORTED_FEATURES.errorFontLoadNative
            });

            (0, _util.warn)(`Failed to load font '${nativeFontFace.family}': '${ex}'.`);
            font.disableFontFace = true;
            throw ex;
          }
        }

        return;
      }

      const rule = font.createFontFaceRule();

      if (rule) {
        this.insertRule(rule);

        if (this.isSyncFontLoadingSupported) {
          return;
        }

        await new Promise(resolve => {
          const request = this._queueLoadingCallback(resolve);

          this._prepareFontLoadEvent([rule], [font], request);
        });
      }
    }

    _queueLoadingCallback(callback) {
      (0, _util.unreachable)("Abstract method `_queueLoadingCallback`.");
    }

    get isFontLoadingAPISupported() {
      return (0, _util.shadow)(this, "isFontLoadingAPISupported", !!(this._document && this._document.fonts)); // lwf
    }

    get isSyncFontLoadingSupported() {
      (0, _util.unreachable)("Abstract method `isSyncFontLoadingSupported`.");
    }

    get _loadTestFont() {
      (0, _util.unreachable)("Abstract method `_loadTestFont`.");
    }

    _prepareFontLoadEvent(rules, fontsToLoad, request) {
      (0, _util.unreachable)("Abstract method `_prepareFontLoadEvent`.");
    }

  }

  let FontLoader;
  exports.FontLoader = FontLoader;
  {
    exports.FontLoader = FontLoader = class GenericFontLoader extends BaseFontLoader {
      constructor(params) {
        super(params);
        this.loadingContext = {
          requests: [],
          nextRequestId: 0
        };
        this.loadTestFontId = 0;
      }

      get isSyncFontLoadingSupported() {
        let supported = false;

        if (typeof navigator === "undefined") {
          supported = true;
        } else {
          const m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);

          if (m && m[1] >= 14) { // lwf
            supported = true;
          }
        }

        return (0, _util.shadow)(this, "isSyncFontLoadingSupported", supported);
      }

      _queueLoadingCallback(callback) {
        function completeRequest() {
          (0, _util.assert)(!request.done, "completeRequest() cannot be called twice.");
          request.done = true;

          while (context.requests.length > 0 && context.requests[0].done) {
            const otherRequest = context.requests.shift();
            setTimeout(otherRequest.callback, 0);
          }
        }

        const context = this.loadingContext;
        const request = {
          id: `pdfjs-font-loading-${context.nextRequestId++}`,
          done: false,
          complete: completeRequest,
          callback
        };
        context.requests.push(request);
        return request;
      }

      get _loadTestFont() {
        const getLoadTestFont = function () {
          return atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQA" + "FQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAA" + "ALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgA" + "AAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1" + "AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD" + "6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACM" + "AooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4D" + "IP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAA" + "AAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUA" + "AQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgAB" + "AAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABY" + "AAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAA" + "AC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAA" + "AAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQAC" + "AQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3" + "Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTj" + "FQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
        };

        return (0, _util.shadow)(this, "_loadTestFont", getLoadTestFont());
      }

      _prepareFontLoadEvent(rules, fonts, request) {
        function int32(data, offset) {
          return data.charCodeAt(offset) << 24 | data.charCodeAt(offset + 1) << 16 | data.charCodeAt(offset + 2) << 8 | data.charCodeAt(offset + 3) & 0xff;
        }

        function spliceString(s, offset, remove, insert) {
          const chunk1 = s.substring(0, offset);
          const chunk2 = s.substring(offset + remove);
          return chunk1 + insert + chunk2;
        }

        let i, ii;

        const canvas = this._document.createElement("canvas");

        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d");
        let called = 0;

        function isFontReady(name, callback) {
          called++;

          if (called > 30) {
            (0, _util.warn)("Load test font never loaded.");
            callback();
            return;
          }

          ctx.font = "30px " + name;
          ctx.fillText(".", 0, 20);
          const imageData = ctx.getImageData(0, 0, 1, 1);

          if (imageData.data[3] > 0) {
            callback();
            return;
          }

          setTimeout(isFontReady.bind(null, name, callback));
        }

        const loadTestFontId = `lt${Date.now()}${this.loadTestFontId++}`;
        let data = this._loadTestFont;
        const COMMENT_OFFSET = 976;
        data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
        const CFF_CHECKSUM_OFFSET = 16;
        const XXXX_VALUE = 0x58585858;
        let checksum = int32(data, CFF_CHECKSUM_OFFSET);

        for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {
          checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i) | 0;
        }

        if (i < loadTestFontId.length) {
          checksum = checksum - XXXX_VALUE + int32(loadTestFontId + "XXX", i) | 0;
        }

        data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, (0, _util.string32)(checksum));
        const url = `url(data:font/opentype;base64,${btoa(data)});`;
        const rule = `@font-face {font-family:"${loadTestFontId}";src:${url}}`;
        this.insertRule(rule);
        const names = [];

        for (i = 0, ii = fonts.length; i < ii; i++) {
          names.push(fonts[i].loadedName);
        }

        names.push(loadTestFontId);

        const div = this._document.createElement("div");

        div.style.visibility = "hidden";
        div.style.width = div.style.height = "10px";
        div.style.position = "absolute";
        div.style.top = div.style.left = "0px";

        for (i = 0, ii = names.length; i < ii; ++i) {
          const span = this._document.createElement("span");

          span.textContent = "Hi";
          span.style.fontFamily = names[i];
          div.appendChild(span);
        }

        this._document.body.appendChild(div);

        isFontReady(loadTestFontId, () => {
          this._document.body.removeChild(div);

          request.complete();
        });
      }

    };
  }

  class FontFaceObject {
    constructor(translatedData, {
      isEvalSupported = true,
      disableFontFace = false,
      ignoreErrors = false,
      onUnsupportedFeature = null,
      fontRegistry = null
    }) {
      this.compiledGlyphs = Object.create(null);

      for (const i in translatedData) {
        this[i] = translatedData[i];
      }

      this.isEvalSupported = isEvalSupported !== false;
      this.disableFontFace = disableFontFace === true;
      this.ignoreErrors = ignoreErrors === true;
      this._onUnsupportedFeature = onUnsupportedFeature;
      this.fontRegistry = fontRegistry;
    }

    createNativeFontFace() {
      if (!this.data || this.disableFontFace) {
        return null;
      }

      const nativeFontFace = new FontFace(this.loadedName, this.data, {});

      if (this.fontRegistry) {
        this.fontRegistry.registerFont(this);
      }

      return nativeFontFace;
    }

    createFontFaceRule() {
      if (!this.data || this.disableFontFace) {
        return null;
      }

      const data = (0, _util.bytesToString)(new Uint8Array(this.data));
      const url = `url(data:${this.mimetype};base64,${btoa(data)});`;
      const rule = `@font-face {font-family:"${this.loadedName}";src:${url}}`;

      if (this.fontRegistry) {
        this.fontRegistry.registerFont(this, url);
      }

      return rule;
    }

    getPathGenerator(objs, character) {
      if (this.compiledGlyphs[character] !== undefined) {
        return this.compiledGlyphs[character];
      }

      let cmds, current;

      try {
        cmds = objs.get(this.loadedName + "_path_" + character);
      } catch (ex) {
        if (!this.ignoreErrors) {
          throw ex;
        }

        if (this._onUnsupportedFeature) {
          this._onUnsupportedFeature({
            featureId: _util.UNSUPPORTED_FEATURES.errorFontGetPath
          });
        }

        (0, _util.warn)(`getPathGenerator - ignoring character: "${ex}".`);
        return this.compiledGlyphs[character] = function (c, size) {};
      }

      if (this.isEvalSupported && _util.IsEvalSupportedCached.value) {
        let args,
            js = "";

        for (let i = 0, ii = cmds.length; i < ii; i++) {
          current = cmds[i];

          if (current.args !== undefined) {
            args = current.args.join(",");
          } else {
            args = "";
          }

          js += "c." + current.cmd + "(" + args + ");\n";
        }

        return this.compiledGlyphs[character] = new Function("c", "size", js);
      }

      return this.compiledGlyphs[character] = function (c, size) {
        for (let i = 0, ii = cmds.length; i < ii; i++) {
          current = cmds[i];

          if (current.cmd === "scale") {
            current.args = [size, -size];
          }

          c[current.cmd].apply(c, current.args);
        }
      };
    }

  }

  exports.FontFaceObject = FontFaceObject;

  /***/ }),
  /* 7 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.NodeCMapReaderFactory = exports.NodeCanvasFactory = void 0;

  var _display_utils = __w_pdfjs_require__(1);

  var _is_node = __w_pdfjs_require__(4);

  var _util = __w_pdfjs_require__(2);

  let NodeCanvasFactory = class {
    constructor() {
      (0, _util.unreachable)("Not implemented: NodeCanvasFactory");
    }

  };
  exports.NodeCanvasFactory = NodeCanvasFactory;
  let NodeCMapReaderFactory = class {
    constructor() {
      (0, _util.unreachable)("Not implemented: NodeCMapReaderFactory");
    }

  };
  exports.NodeCMapReaderFactory = NodeCMapReaderFactory;

  if (_is_node.isNodeJS) {
    exports.NodeCanvasFactory = NodeCanvasFactory = class extends _display_utils.BaseCanvasFactory {
      create(width, height) {
        if (width <= 0 || height <= 0) {
          throw new Error("Invalid canvas size");
        }

        const Canvas = require("canvas");

        const canvas = Canvas.createCanvas(width, height);
        return {
          canvas,
          context: canvas.getContext("2d")
        };
      }

    };
    exports.NodeCMapReaderFactory = NodeCMapReaderFactory = class extends _display_utils.BaseCMapReaderFactory {
      _fetchData(url, compressionType) {
        return new Promise((resolve, reject) => {
          const fs = require("fs");

          fs.readFile(url, (error, data) => {
            if (error || !data) {
              reject(new Error(error));
              return;
            }

            resolve({
              cMapData: new Uint8Array(data),
              compressionType
            });
          });
        });
      }

    };
  }

  /***/ }),
  /* 8 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.AnnotationStorage = void 0;

  var _util = __w_pdfjs_require__(2);

  class AnnotationStorage {
    constructor() {
      this._storage = new Map();
      this._modified = false;
      this.onSetModified = null;
      this.onResetModified = null;
    }

    getOrCreateValue(key, defaultValue) {
      if (this._storage.has(key)) {
        return this._storage.get(key);
      }

      this._storage.set(key, defaultValue);

      return defaultValue;
    }

    setValue(key, value) {
      const obj = this._storage.get(key);

      let modified = false;

      if (obj !== undefined) {
        for (const [entry, val] of Object.entries(value)) {
          if (obj[entry] !== val) {
            modified = true;
            obj[entry] = val;
          }
        }
      } else {
        this._storage.set(key, value);

        modified = true;
      }

      if (modified) {
        this._setModified();
      }
    }

    getAll() {
      if (this._storage.size === 0) {
        return null;
      }

      return (0, _util.objectFromEntries)(this._storage);
    }

    get size() {
      return this._storage.size;
    }

    _setModified() {
      if (!this._modified) {
        this._modified = true;

        if (typeof this.onSetModified === "function") {
          this.onSetModified();
        }
      }
    }

    resetModified() {
      if (this._modified) {
        this._modified = false;

        if (typeof this.onResetModified === "function") {
          this.onResetModified();
        }
      }
    }

  }

  exports.AnnotationStorage = AnnotationStorage;

  /***/ }),
  /* 9 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.apiCompatibilityParams = void 0;

  var _is_node = __w_pdfjs_require__(4);

  const compatibilityParams = Object.create(null);
  {
    (function checkFontFace() {
      if (_is_node.isNodeJS) {
        compatibilityParams.disableFontFace = true;
      }
    })();
  }
  const apiCompatibilityParams = Object.freeze(compatibilityParams);
  exports.apiCompatibilityParams = apiCompatibilityParams;

  /***/ }),
  /* 10 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.CanvasGraphics = void 0;

  var _util = __w_pdfjs_require__(2);

  var _pattern_helper = __w_pdfjs_require__(11);

  const MIN_FONT_SIZE = 16;
  const MAX_FONT_SIZE = 100;
  const MAX_GROUP_SIZE = 4096;
  const COMPILE_TYPE3_GLYPHS = true;
  const MAX_SIZE_TO_COMPILE = 1000;
  const FULL_CHUNK_HEIGHT = 16;

  function addContextCurrentTransform(ctx) {
    if (!ctx.mozCurrentTransform) {
      ctx._originalSave = ctx.save;
      ctx._originalRestore = ctx.restore;
      ctx._originalRotate = ctx.rotate;
      ctx._originalScale = ctx.scale;
      ctx._originalTranslate = ctx.translate;
      ctx._originalTransform = ctx.transform;
      ctx._originalSetTransform = ctx.setTransform;
      ctx._transformMatrix = ctx._transformMatrix || [1, 0, 0, 1, 0, 0];
      ctx._transformStack = [];
      Object.defineProperty(ctx, "mozCurrentTransform", {
        get: function getCurrentTransform() {
          return this._transformMatrix;
        }
      });
      Object.defineProperty(ctx, "mozCurrentTransformInverse", {
        get: function getCurrentTransformInverse() {
          const m = this._transformMatrix;
          const a = m[0],
                b = m[1],
                c = m[2],
                d = m[3],
                e = m[4],
                f = m[5];
          const ad_bc = a * d - b * c;
          const bc_ad = b * c - a * d;
          return [d / ad_bc, b / bc_ad, c / bc_ad, a / ad_bc, (d * e - c * f) / bc_ad, (b * e - a * f) / ad_bc];
        }
      });

      ctx.save = function ctxSave() {
        const old = this._transformMatrix;

        this._transformStack.push(old);

        this._transformMatrix = old.slice(0, 6);

        this._originalSave();
      };

      ctx.restore = function ctxRestore() {
        const prev = this._transformStack.pop();

        if (prev) {
          this._transformMatrix = prev;

          this._originalRestore();
        }
      };

      ctx.translate = function ctxTranslate(x, y) {
        const m = this._transformMatrix;
        m[4] = m[0] * x + m[2] * y + m[4];
        m[5] = m[1] * x + m[3] * y + m[5];

        this._originalTranslate(x, y);
      };

      ctx.scale = function ctxScale(x, y) {
        const m = this._transformMatrix;
        m[0] = m[0] * x;
        m[1] = m[1] * x;
        m[2] = m[2] * y;
        m[3] = m[3] * y;

        this._originalScale(x, y);
      };

      ctx.transform = function ctxTransform(a, b, c, d, e, f) {
        const m = this._transformMatrix;
        this._transformMatrix = [m[0] * a + m[2] * b, m[1] * a + m[3] * b, m[0] * c + m[2] * d, m[1] * c + m[3] * d, m[0] * e + m[2] * f + m[4], m[1] * e + m[3] * f + m[5]];

        ctx._originalTransform(a, b, c, d, e, f);
      };

      ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f) {
        this._transformMatrix = [a, b, c, d, e, f];

        ctx._originalSetTransform(a, b, c, d, e, f);
      };

      ctx.rotate = function ctxRotate(angle) {
        const cosValue = Math.cos(angle);
        const sinValue = Math.sin(angle);
        const m = this._transformMatrix;
        this._transformMatrix = [m[0] * cosValue + m[2] * sinValue, m[1] * cosValue + m[3] * sinValue, m[0] * -sinValue + m[2] * cosValue, m[1] * -sinValue + m[3] * cosValue, m[4], m[5]];

        this._originalRotate(angle);
      };
    }
  }

  const CachedCanvases = function CachedCanvasesClosure() {
    function CachedCanvases(canvasFactory) {
      this.canvasFactory = canvasFactory;
      this.cache = Object.create(null);
    }

    CachedCanvases.prototype = {
      getCanvas: function CachedCanvases_getCanvas(id, width, height, trackTransform) {
        let canvasEntry;

        if (this.cache[id] !== undefined) {
          canvasEntry = this.cache[id];
          this.canvasFactory.reset(canvasEntry, width, height);
          canvasEntry.context.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          canvasEntry = this.canvasFactory.create(width, height);
          this.cache[id] = canvasEntry;
        }

        if (trackTransform) {
          addContextCurrentTransform(canvasEntry.context);
        }

        return canvasEntry;
      },

      clear() {
        for (const id in this.cache) {
          const canvasEntry = this.cache[id];
          this.canvasFactory.destroy(canvasEntry);
          delete this.cache[id];
        }
      }

    };
    return CachedCanvases;
  }();

  function compileType3Glyph(imgData) {
    const POINT_TO_PROCESS_LIMIT = 1000;
    const width = imgData.width,
          height = imgData.height,
          width1 = width + 1;
    let i, ii, j, j0;
    const points = new Uint8Array(width1 * (height + 1));
    const POINT_TYPES = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]);
    const lineSize = width + 7 & ~7,
          data0 = imgData.data;
    const data = new Uint8Array(lineSize * height);
    let pos = 0;

    for (i = 0, ii = data0.length; i < ii; i++) {
      const elem = data0[i];
      let mask = 128;

      while (mask > 0) {
        data[pos++] = elem & mask ? 0 : 255;
        mask >>= 1;
      }
    }

    let count = 0;
    pos = 0;

    if (data[pos] !== 0) {
      points[0] = 1;
      ++count;
    }

    for (j = 1; j < width; j++) {
      if (data[pos] !== data[pos + 1]) {
        points[j] = data[pos] ? 2 : 1;
        ++count;
      }

      pos++;
    }

    if (data[pos] !== 0) {
      points[j] = 2;
      ++count;
    }

    for (i = 1; i < height; i++) {
      pos = i * lineSize;
      j0 = i * width1;

      if (data[pos - lineSize] !== data[pos]) {
        points[j0] = data[pos] ? 1 : 8;
        ++count;
      }

      let sum = (data[pos] ? 4 : 0) + (data[pos - lineSize] ? 8 : 0);

      for (j = 1; j < width; j++) {
        sum = (sum >> 2) + (data[pos + 1] ? 4 : 0) + (data[pos - lineSize + 1] ? 8 : 0);

        if (POINT_TYPES[sum]) {
          points[j0 + j] = POINT_TYPES[sum];
          ++count;
        }

        pos++;
      }

      if (data[pos - lineSize] !== data[pos]) {
        points[j0 + j] = data[pos] ? 2 : 4;
        ++count;
      }

      if (count > POINT_TO_PROCESS_LIMIT) {
        return null;
      }
    }

    pos = lineSize * (height - 1);
    j0 = i * width1;

    if (data[pos] !== 0) {
      points[j0] = 8;
      ++count;
    }

    for (j = 1; j < width; j++) {
      if (data[pos] !== data[pos + 1]) {
        points[j0 + j] = data[pos] ? 4 : 8;
        ++count;
      }

      pos++;
    }

    if (data[pos] !== 0) {
      points[j0 + j] = 4;
      ++count;
    }

    if (count > POINT_TO_PROCESS_LIMIT) {
      return null;
    }

    const steps = new Int32Array([0, width1, -1, 0, -width1, 0, 0, 0, 1]);
    const outlines = [];

    for (i = 0; count && i <= height; i++) {
      let p = i * width1;
      const end = p + width;

      while (p < end && !points[p]) {
        p++;
      }

      if (p === end) {
        continue;
      }

      const coords = [p % width1, i];
      const p0 = p;
      let type = points[p];

      do {
        const step = steps[type];

        do {
          p += step;
        } while (!points[p]);

        const pp = points[p];

        if (pp !== 5 && pp !== 10) {
          type = pp;
          points[p] = 0;
        } else {
          type = pp & 0x33 * type >> 4;
          points[p] &= type >> 2 | type << 2;
        }

        coords.push(p % width1);
        coords.push(p / width1 | 0);

        if (!points[p]) {
          --count;
        }
      } while (p0 !== p);

      outlines.push(coords);
      --i;
    }

    const drawOutline = function (c) {
      c.save();
      c.scale(1 / width, -1 / height);
      c.translate(0, -height);
      c.beginPath();

      for (let k = 0, kk = outlines.length; k < kk; k++) {
        const o = outlines[k];
        c.moveTo(o[0], o[1]);

        for (let l = 2, ll = o.length; l < ll; l += 2) {
          c.lineTo(o[l], o[l + 1]);
        }
      }

      c.fill();
      c.beginPath();
      c.restore();
    };

    return drawOutline;
  }

  const CanvasExtraState = function CanvasExtraStateClosure() {
    function CanvasExtraState() {
      this.alphaIsShape = false;
      this.fontSize = 0;
      this.fontSizeScale = 1;
      this.textMatrix = _util.IDENTITY_MATRIX;
      this.textMatrixScale = 1;
      this.fontMatrix = _util.FONT_IDENTITY_MATRIX;
      this.leading = 0;
      this.x = 0;
      this.y = 0;
      this.lineX = 0;
      this.lineY = 0;
      this.charSpacing = 0;
      this.wordSpacing = 0;
      this.textHScale = 1;
      this.textRenderingMode = _util.TextRenderingMode.FILL;
      this.textRise = 0;
      this.fillColor = "#000000";
      this.strokeColor = "#000000";
      this.patternFill = false;
      this.fillAlpha = 1;
      this.strokeAlpha = 1;
      this.lineWidth = 1;
      this.activeSMask = null;
      this.resumeSMaskCtx = null;
      this.transferMaps = null;
    }

    CanvasExtraState.prototype = {
      clone: function CanvasExtraState_clone() {
        return Object.create(this);
      },
      setCurrentPoint: function CanvasExtraState_setCurrentPoint(x, y) {
        this.x = x;
        this.y = y;
      }
    };
    return CanvasExtraState;
  }();

  const CanvasGraphics = function CanvasGraphicsClosure() {
    const EXECUTION_TIME = 15;
    const EXECUTION_STEPS = 10;

    function CanvasGraphics(canvasCtx, commonObjs, objs, canvasFactory, webGLContext, imageLayer, optionalContentConfig) {
      this.ctx = canvasCtx;
      this.current = new CanvasExtraState();
      this.stateStack = [];
      this.pendingClip = null;
      this.pendingEOFill = false;
      this.res = null;
      this.xobjs = null;
      this.commonObjs = commonObjs;
      this.objs = objs;
      this.canvasFactory = canvasFactory;
      this.webGLContext = webGLContext;
      this.imageLayer = imageLayer;
      this.groupStack = [];
      this.processingType3 = null;
      this.baseTransform = null;
      this.baseTransformStack = [];
      this.groupLevel = 0;
      this.smaskStack = [];
      this.smaskCounter = 0;
      this.tempSMask = null;
      this.contentVisible = true;
      this.markedContentStack = [];
      this.optionalContentConfig = optionalContentConfig;
      this.cachedCanvases = new CachedCanvases(this.canvasFactory);

      if (canvasCtx) {
        addContextCurrentTransform(canvasCtx);
      }

      this._cachedGetSinglePixelWidth = null;
    }

    function putBinaryImageData(ctx, imgData, transferMaps = null) {
      if (typeof ImageData !== "undefined" && imgData instanceof ImageData) {
        ctx.putImageData(imgData, 0, 0);
        return;
      }

      const height = imgData.height,
            width = imgData.width;
      const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
      const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
      const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
      const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
      let srcPos = 0,
          destPos;
      const src = imgData.data;
      const dest = chunkImgData.data;
      let i, j, thisChunkHeight, elemsInThisChunk;
      let transferMapRed, transferMapGreen, transferMapBlue, transferMapGray;

      if (transferMaps) {
        switch (transferMaps.length) {
          case 1:
            transferMapRed = transferMaps[0];
            transferMapGreen = transferMaps[0];
            transferMapBlue = transferMaps[0];
            transferMapGray = transferMaps[0];
            break;

          case 4:
            transferMapRed = transferMaps[0];
            transferMapGreen = transferMaps[1];
            transferMapBlue = transferMaps[2];
            transferMapGray = transferMaps[3];
            break;
        }
      }

      if (imgData.kind === _util.ImageKind.GRAYSCALE_1BPP) {
        const srcLength = src.byteLength;
        const dest32 = new Uint32Array(dest.buffer, 0, dest.byteLength >> 2);
        const dest32DataLength = dest32.length;
        const fullSrcDiff = width + 7 >> 3;
        let white = 0xffffffff;
        let black = _util.IsLittleEndianCached.value ? 0xff000000 : 0x000000ff;

        if (transferMapGray) {
          if (transferMapGray[0] === 0xff && transferMapGray[0xff] === 0) {
            [white, black] = [black, white];
          }
        }

        for (i = 0; i < totalChunks; i++) {
          thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
          destPos = 0;

          for (j = 0; j < thisChunkHeight; j++) {
            const srcDiff = srcLength - srcPos;
            let k = 0;
            const kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
            const kEndUnrolled = kEnd & ~7;
            let mask = 0;
            let srcByte = 0;

            for (; k < kEndUnrolled; k += 8) {
              srcByte = src[srcPos++];
              dest32[destPos++] = srcByte & 128 ? white : black;
              dest32[destPos++] = srcByte & 64 ? white : black;
              dest32[destPos++] = srcByte & 32 ? white : black;
              dest32[destPos++] = srcByte & 16 ? white : black;
              dest32[destPos++] = srcByte & 8 ? white : black;
              dest32[destPos++] = srcByte & 4 ? white : black;
              dest32[destPos++] = srcByte & 2 ? white : black;
              dest32[destPos++] = srcByte & 1 ? white : black;
            }

            for (; k < kEnd; k++) {
              if (mask === 0) {
                srcByte = src[srcPos++];
                mask = 128;
              }

              dest32[destPos++] = srcByte & mask ? white : black;
              mask >>= 1;
            }
          }

          while (destPos < dest32DataLength) {
            dest32[destPos++] = 0;
          }

          ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
        }
      } else if (imgData.kind === _util.ImageKind.RGBA_32BPP) {
        const hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
        j = 0;
        elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;

        for (i = 0; i < fullChunks; i++) {
          dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
          srcPos += elemsInThisChunk;

          if (hasTransferMaps) {
            for (let k = 0; k < elemsInThisChunk; k += 4) {
              if (transferMapRed) {
                dest[k + 0] = transferMapRed[dest[k + 0]];
              }

              if (transferMapGreen) {
                dest[k + 1] = transferMapGreen[dest[k + 1]];
              }

              if (transferMapBlue) {
                dest[k + 2] = transferMapBlue[dest[k + 2]];
              }
            }
          }

          ctx.putImageData(chunkImgData, 0, j);
          j += FULL_CHUNK_HEIGHT;
        }

        if (i < totalChunks) {
          elemsInThisChunk = width * partialChunkHeight * 4;
          dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));

          if (hasTransferMaps) {
            for (let k = 0; k < elemsInThisChunk; k += 4) {
              if (transferMapRed) {
                dest[k + 0] = transferMapRed[dest[k + 0]];
              }

              if (transferMapGreen) {
                dest[k + 1] = transferMapGreen[dest[k + 1]];
              }

              if (transferMapBlue) {
                dest[k + 2] = transferMapBlue[dest[k + 2]];
              }
            }
          }

          ctx.putImageData(chunkImgData, 0, j);
        }
      } else if (imgData.kind === _util.ImageKind.RGB_24BPP) {
        const hasTransferMaps = !!(transferMapRed || transferMapGreen || transferMapBlue);
        thisChunkHeight = FULL_CHUNK_HEIGHT;
        elemsInThisChunk = width * thisChunkHeight;

        for (i = 0; i < totalChunks; i++) {
          if (i >= fullChunks) {
            thisChunkHeight = partialChunkHeight;
            elemsInThisChunk = width * thisChunkHeight;
          }

          destPos = 0;

          for (j = elemsInThisChunk; j--;) {
            dest[destPos++] = src[srcPos++];
            dest[destPos++] = src[srcPos++];
            dest[destPos++] = src[srcPos++];
            dest[destPos++] = 255;
          }

          if (hasTransferMaps) {
            for (let k = 0; k < destPos; k += 4) {
              if (transferMapRed) {
                dest[k + 0] = transferMapRed[dest[k + 0]];
              }

              if (transferMapGreen) {
                dest[k + 1] = transferMapGreen[dest[k + 1]];
              }

              if (transferMapBlue) {
                dest[k + 2] = transferMapBlue[dest[k + 2]];
              }
            }
          }

          ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
        }
      } else {
        throw new Error(`bad image kind: ${imgData.kind}`);
      }
    }

    function putBinaryImageMask(ctx, imgData) {
      const height = imgData.height,
            width = imgData.width;
      const partialChunkHeight = height % FULL_CHUNK_HEIGHT;
      const fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
      const totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
      const chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
      let srcPos = 0;
      const src = imgData.data;
      const dest = chunkImgData.data;

      for (let i = 0; i < totalChunks; i++) {
        const thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
        let destPos = 3;

        for (let j = 0; j < thisChunkHeight; j++) {
          let elem,
              mask = 0;

          for (let k = 0; k < width; k++) {
            if (!mask) {
              elem = src[srcPos++];
              mask = 128;
            }

            dest[destPos] = elem & mask ? 0 : 255;
            destPos += 4;
            mask >>= 1;
          }
        }

        ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
      }
    }

    function copyCtxState(sourceCtx, destCtx) {
      const properties = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"];

      for (let i = 0, ii = properties.length; i < ii; i++) {
        const property = properties[i];

        if (sourceCtx[property] !== undefined) {
          destCtx[property] = sourceCtx[property];
        }
      }

      if (sourceCtx.setLineDash !== undefined) {
        destCtx.setLineDash(sourceCtx.getLineDash());
        destCtx.lineDashOffset = sourceCtx.lineDashOffset;
      }
    }

    function resetCtxToDefault(ctx) {
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#000000";
      ctx.fillRule = "nonzero";
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;
      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 10;
      ctx.globalCompositeOperation = "source-over";
      ctx.font = "10px sans-serif";

      if (ctx.setLineDash !== undefined) {
        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;
      }
    }

    function composeSMaskBackdrop(bytes, r0, g0, b0) {
      const length = bytes.length;

      for (let i = 3; i < length; i += 4) {
        const alpha = bytes[i];

        if (alpha === 0) {
          bytes[i - 3] = r0;
          bytes[i - 2] = g0;
          bytes[i - 1] = b0;
        } else if (alpha < 255) {
          const alpha_ = 255 - alpha;
          bytes[i - 3] = bytes[i - 3] * alpha + r0 * alpha_ >> 8;
          bytes[i - 2] = bytes[i - 2] * alpha + g0 * alpha_ >> 8;
          bytes[i - 1] = bytes[i - 1] * alpha + b0 * alpha_ >> 8;
        }
      }
    }

    function composeSMaskAlpha(maskData, layerData, transferMap) {
      const length = maskData.length;
      const scale = 1 / 255;

      for (let i = 3; i < length; i += 4) {
        const alpha = transferMap ? transferMap[maskData[i]] : maskData[i];
        layerData[i] = layerData[i] * alpha * scale | 0;
      }
    }

    function composeSMaskLuminosity(maskData, layerData, transferMap) {
      const length = maskData.length;

      for (let i = 3; i < length; i += 4) {
        const y = maskData[i - 3] * 77 + maskData[i - 2] * 152 + maskData[i - 1] * 28;
        layerData[i] = transferMap ? layerData[i] * transferMap[y >> 8] >> 8 : layerData[i] * y >> 16;
      }
    }

    function genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap) {
      const hasBackdrop = !!backdrop;
      const r0 = hasBackdrop ? backdrop[0] : 0;
      const g0 = hasBackdrop ? backdrop[1] : 0;
      const b0 = hasBackdrop ? backdrop[2] : 0;
      let composeFn;

      if (subtype === "Luminosity") {
        composeFn = composeSMaskLuminosity;
      } else {
        composeFn = composeSMaskAlpha;
      }

      const PIXELS_TO_PROCESS = 1048576;
      const chunkSize = Math.min(height, Math.ceil(PIXELS_TO_PROCESS / width));

      for (let row = 0; row < height; row += chunkSize) {
        const chunkHeight = Math.min(chunkSize, height - row);
        const maskData = maskCtx.getImageData(0, row, width, chunkHeight);
        const layerData = layerCtx.getImageData(0, row, width, chunkHeight);

        if (hasBackdrop) {
          composeSMaskBackdrop(maskData.data, r0, g0, b0);
        }

        composeFn(maskData.data, layerData.data, transferMap);
        maskCtx.putImageData(layerData, 0, row);
      }
    }

    function composeSMask(ctx, smask, layerCtx, webGLContext) {
      const mask = smask.canvas;
      const maskCtx = smask.context;
      ctx.setTransform(smask.scaleX, 0, 0, smask.scaleY, smask.offsetX, smask.offsetY);
      const backdrop = smask.backdrop || null;

      if (!smask.transferMap && webGLContext.isEnabled) {
        const composed = webGLContext.composeSMask({
          layer: layerCtx.canvas,
          mask,
          properties: {
            subtype: smask.subtype,
            backdrop
          }
        });
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(composed, smask.offsetX, smask.offsetY);
        return;
      }

      genericComposeSMask(maskCtx, layerCtx, mask.width, mask.height, smask.subtype, backdrop, smask.transferMap);
      ctx.drawImage(mask, 0, 0);
    }

    const LINE_CAP_STYLES = ["butt", "round", "square"];
    const LINE_JOIN_STYLES = ["miter", "round", "bevel"];
    const NORMAL_CLIP = {};
    const EO_CLIP = {};
    CanvasGraphics.prototype = {
      beginDrawing({
        transform,
        viewport,
        transparency = false,
        background = null
      }) {
        const width = this.ctx.canvas.width;
        const height = this.ctx.canvas.height;
        this.ctx.save();
        this.ctx.fillStyle = background || "rgb(255, 255, 255)";
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.restore();

        if (transparency) {
          const transparentCanvas = this.cachedCanvases.getCanvas("transparent", width, height, true);
          this.compositeCtx = this.ctx;
          this.transparentCanvas = transparentCanvas.canvas;
          this.ctx = transparentCanvas.context;
          this.ctx.save();
          this.ctx.transform.apply(this.ctx, this.compositeCtx.mozCurrentTransform);
        }

        this.ctx.save();
        resetCtxToDefault(this.ctx);

        if (transform) {
          this.ctx.transform.apply(this.ctx, transform);
        }

        this.ctx.transform.apply(this.ctx, viewport.transform);
        this.baseTransform = this.ctx.mozCurrentTransform.slice();
        this._combinedScaleFactor = Math.hypot(this.baseTransform[0], this.baseTransform[2]);

        if (this.imageLayer) {
          this.imageLayer.beginLayout();
        }
      },

      executeOperatorList: function CanvasGraphics_executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper) {
        const argsArray = operatorList.argsArray;
        const fnArray = operatorList.fnArray;
        let i = executionStartIdx || 0;
        const argsArrayLen = argsArray.length;

        if (argsArrayLen === i) {
          return i;
        }

        const chunkOperations = argsArrayLen - i > EXECUTION_STEPS && typeof continueCallback === "function";
        const endTime = chunkOperations ? Date.now() + EXECUTION_TIME : 0;
        let steps = 0;
        const commonObjs = this.commonObjs;
        const objs = this.objs;
        let fnId;

        while (true) {
          if (stepper !== undefined && i === stepper.nextBreakPoint) {
            stepper.breakIt(i, continueCallback);
            return i;
          }

          fnId = fnArray[i];

          if (fnId !== _util.OPS.dependency) {
            this[fnId].apply(this, argsArray[i]);
          } else {
            for (const depObjId of argsArray[i]) {
              const objsPool = depObjId.startsWith("g_") ? commonObjs : objs;

              if (!objsPool.has(depObjId)) {
                objsPool.get(depObjId, continueCallback);
                return i;
              }
            }
          }

          i++;

          if (i === argsArrayLen) {
            return i;
          }

          if (chunkOperations && ++steps > EXECUTION_STEPS) {
            if (Date.now() > endTime) {
              continueCallback();
              return i;
            }

            steps = 0;
          }
        }
      },
      endDrawing: function CanvasGraphics_endDrawing() {
        while (this.stateStack.length || this.current.activeSMask !== null) {
          this.restore();
        }

        this.ctx.restore();

        if (this.transparentCanvas) {
          this.ctx = this.compositeCtx;
          this.ctx.save();
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          this.ctx.drawImage(this.transparentCanvas, 0, 0);
          this.ctx.restore();
          this.transparentCanvas = null;
        }

        this.cachedCanvases.clear();
        this.webGLContext.clear();

        if (this.imageLayer) {
          this.imageLayer.endLayout();
        }
      },
      setLineWidth: function CanvasGraphics_setLineWidth(width) {
        this.current.lineWidth = width;
        this.ctx.lineWidth = width;
      },
      setLineCap: function CanvasGraphics_setLineCap(style) {
        this.ctx.lineCap = LINE_CAP_STYLES[style];
      },
      setLineJoin: function CanvasGraphics_setLineJoin(style) {
        this.ctx.lineJoin = LINE_JOIN_STYLES[style];
      },
      setMiterLimit: function CanvasGraphics_setMiterLimit(limit) {
        this.ctx.miterLimit = limit;
      },
      setDash: function CanvasGraphics_setDash(dashArray, dashPhase) {
        const ctx = this.ctx;

        if (ctx.setLineDash !== undefined) {
          ctx.setLineDash(dashArray);
          ctx.lineDashOffset = dashPhase;
        }
      },

      setRenderingIntent(intent) {},

      setFlatness(flatness) {},

      setGState: function CanvasGraphics_setGState(states) {
        for (let i = 0, ii = states.length; i < ii; i++) {
          const state = states[i];
          const key = state[0];
          const value = state[1];

          switch (key) {
            case "LW":
              this.setLineWidth(value);
              break;

            case "LC":
              this.setLineCap(value);
              break;

            case "LJ":
              this.setLineJoin(value);
              break;

            case "ML":
              this.setMiterLimit(value);
              break;

            case "D":
              this.setDash(value[0], value[1]);
              break;

            case "RI":
              this.setRenderingIntent(value);
              break;

            case "FL":
              this.setFlatness(value);
              break;

            case "Font":
              this.setFont(value[0], value[1]);
              break;

            case "CA":
              this.current.strokeAlpha = state[1];
              break;

            case "ca":
              this.current.fillAlpha = state[1];
              this.ctx.globalAlpha = state[1];
              break;

            case "BM":
              this.ctx.globalCompositeOperation = value;
              break;

            case "SMask":
              if (this.current.activeSMask) {
                if (this.stateStack.length > 0 && this.stateStack[this.stateStack.length - 1].activeSMask === this.current.activeSMask) {
                  this.suspendSMaskGroup();
                } else {
                  this.endSMaskGroup();
                }
              }

              this.current.activeSMask = value ? this.tempSMask : null;

              if (this.current.activeSMask) {
                this.beginSMaskGroup();
              }

              this.tempSMask = null;
              break;

            case "TR":
              this.current.transferMaps = value;
          }
        }
      },
      beginSMaskGroup: function CanvasGraphics_beginSMaskGroup() {
        const activeSMask = this.current.activeSMask;
        const drawnWidth = activeSMask.canvas.width;
        const drawnHeight = activeSMask.canvas.height;
        const cacheId = "smaskGroupAt" + this.groupLevel;
        const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
        const currentCtx = this.ctx;
        const currentTransform = currentCtx.mozCurrentTransform;
        this.ctx.save();
        const groupCtx = scratchCanvas.context;
        groupCtx.scale(1 / activeSMask.scaleX, 1 / activeSMask.scaleY);
        groupCtx.translate(-activeSMask.offsetX, -activeSMask.offsetY);
        groupCtx.transform.apply(groupCtx, currentTransform);
        activeSMask.startTransformInverse = groupCtx.mozCurrentTransformInverse;
        copyCtxState(currentCtx, groupCtx);
        this.ctx = groupCtx;
        this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
        this.groupStack.push(currentCtx);
        this.groupLevel++;
      },
      suspendSMaskGroup: function CanvasGraphics_endSMaskGroup() {
        const groupCtx = this.ctx;
        this.groupLevel--;
        this.ctx = this.groupStack.pop();
        composeSMask(this.ctx, this.current.activeSMask, groupCtx, this.webGLContext);
        this.ctx.restore();
        this.ctx.save();
        copyCtxState(groupCtx, this.ctx);
        this.current.resumeSMaskCtx = groupCtx;

        const deltaTransform = _util.Util.transform(this.current.activeSMask.startTransformInverse, groupCtx.mozCurrentTransform);

        this.ctx.transform.apply(this.ctx, deltaTransform);
        groupCtx.save();
        groupCtx.setTransform(1, 0, 0, 1, 0, 0);
        groupCtx.clearRect(0, 0, groupCtx.canvas.width, groupCtx.canvas.height);
        groupCtx.restore();
      },
      resumeSMaskGroup: function CanvasGraphics_resumeSMaskGroup() {
        const groupCtx = this.current.resumeSMaskCtx;
        const currentCtx = this.ctx;
        this.ctx = groupCtx;
        this.groupStack.push(currentCtx);
        this.groupLevel++;
      },
      endSMaskGroup: function CanvasGraphics_endSMaskGroup() {
        const groupCtx = this.ctx;
        this.groupLevel--;
        this.ctx = this.groupStack.pop();
        composeSMask(this.ctx, this.current.activeSMask, groupCtx, this.webGLContext);
        this.ctx.restore();
        copyCtxState(groupCtx, this.ctx);

        const deltaTransform = _util.Util.transform(this.current.activeSMask.startTransformInverse, groupCtx.mozCurrentTransform);

        this.ctx.transform.apply(this.ctx, deltaTransform);
      },
      save: function CanvasGraphics_save() {
        this.ctx.save();
        const old = this.current;
        this.stateStack.push(old);
        this.current = old.clone();
        this.current.resumeSMaskCtx = null;
      },
      restore: function CanvasGraphics_restore() {
        if (this.current.resumeSMaskCtx) {
          this.resumeSMaskGroup();
        }

        if (this.current.activeSMask !== null && (this.stateStack.length === 0 || this.stateStack[this.stateStack.length - 1].activeSMask !== this.current.activeSMask)) {
          this.endSMaskGroup();
        }

        if (this.stateStack.length !== 0) {
          this.current = this.stateStack.pop();
          this.ctx.restore();
          this.pendingClip = null;
          this._cachedGetSinglePixelWidth = null;
        } else {
          this.current.activeSMask = null;
        }
      },
      transform: function CanvasGraphics_transform(a, b, c, d, e, f) {
        this.ctx.transform(a, b, c, d, e, f);
        this._cachedGetSinglePixelWidth = null;
      },
      constructPath: function CanvasGraphics_constructPath(ops, args) {
        const ctx = this.ctx;
        const current = this.current;
        let x = current.x,
            y = current.y;

        for (let i = 0, j = 0, ii = ops.length; i < ii; i++) {
          switch (ops[i] | 0) {
            case _util.OPS.rectangle:
              x = args[j++];
              y = args[j++];
              const width = args[j++];
              const height = args[j++];
              const xw = x + width;
              const yh = y + height;
              ctx.moveTo(x, y);

              if (width === 0 || height === 0) {
                ctx.lineTo(xw, yh);
              } else {
                ctx.lineTo(xw, y);
                ctx.lineTo(xw, yh);
                ctx.lineTo(x, yh);
              }

              ctx.closePath();
              break;

            case _util.OPS.moveTo:
              x = args[j++];
              y = args[j++];
              ctx.moveTo(x, y);
              break;

            case _util.OPS.lineTo:
              x = args[j++];
              y = args[j++];
              ctx.lineTo(x, y);
              break;

            case _util.OPS.curveTo:
              x = args[j + 4];
              y = args[j + 5];
              ctx.bezierCurveTo(args[j], args[j + 1], args[j + 2], args[j + 3], x, y);
              j += 6;
              break;

            case _util.OPS.curveTo2:
              ctx.bezierCurveTo(x, y, args[j], args[j + 1], args[j + 2], args[j + 3]);
              x = args[j + 2];
              y = args[j + 3];
              j += 4;
              break;

            case _util.OPS.curveTo3:
              x = args[j + 2];
              y = args[j + 3];
              ctx.bezierCurveTo(args[j], args[j + 1], x, y, x, y);
              j += 4;
              break;

            case _util.OPS.closePath:
              ctx.closePath();
              break;
          }
        }

        current.setCurrentPoint(x, y);
      },
      closePath: function CanvasGraphics_closePath() {
        this.ctx.closePath();
      },
      stroke: function CanvasGraphics_stroke(consumePath) {
        consumePath = typeof consumePath !== "undefined" ? consumePath : true;
        const ctx = this.ctx;
        const strokeColor = this.current.strokeColor;
        ctx.globalAlpha = this.current.strokeAlpha;

        if (this.contentVisible) {
          if (typeof strokeColor === "object" && strokeColor && strokeColor.getPattern) { // lwf
            ctx.save();
            const transform = ctx.mozCurrentTransform;

            const scale = _util.Util.singularValueDecompose2dScale(transform)[0];

            ctx.strokeStyle = strokeColor.getPattern(ctx, this);
            const lineWidth = this.getSinglePixelWidth();
            const scaledLineWidth = this.current.lineWidth * scale;

            if (lineWidth < 0 && -lineWidth >= scaledLineWidth) {
              ctx.resetTransform();
              ctx.lineWidth = Math.round(this._combinedScaleFactor);
            } else {
              ctx.lineWidth = Math.max(lineWidth, scaledLineWidth);
            }

            ctx.stroke();
            ctx.restore();
          } else {
            const lineWidth = this.getSinglePixelWidth();

            if (lineWidth < 0 && -lineWidth >= this.current.lineWidth) {
              ctx.save();
              ctx.resetTransform();
              ctx.lineWidth = Math.round(this._combinedScaleFactor);
              ctx.stroke();
              ctx.restore();
            } else {
              ctx.lineWidth = Math.max(lineWidth, this.current.lineWidth);
              ctx.stroke();
            }
          }
        }

        if (consumePath) {
          this.consumePath();
        }

        ctx.globalAlpha = this.current.fillAlpha;
      },
      closeStroke: function CanvasGraphics_closeStroke() {
        this.closePath();
        this.stroke();
      },
      fill: function CanvasGraphics_fill(consumePath) {
        consumePath = typeof consumePath !== "undefined" ? consumePath : true;
        const ctx = this.ctx;
        const fillColor = this.current.fillColor;
        const isPatternFill = this.current.patternFill;
        let needRestore = false;

        if (isPatternFill) {
          ctx.save();

          if (this.baseTransform) {
            ctx.setTransform.apply(ctx, this.baseTransform);
          }

          ctx.fillStyle = fillColor.getPattern(ctx, this);
          needRestore = true;
        }

        if (this.contentVisible) {
          if (this.pendingEOFill) {
            ctx.fill("evenodd");
            this.pendingEOFill = false;
          } else {
            ctx.fill();
          }
        }

        if (needRestore) {
          ctx.restore();
        }

        if (consumePath) {
          this.consumePath();
        }
      },
      eoFill: function CanvasGraphics_eoFill() {
        this.pendingEOFill = true;
        this.fill();
      },
      fillStroke: function CanvasGraphics_fillStroke() {
        this.fill(false);
        this.stroke(false);
        this.consumePath();
      },
      eoFillStroke: function CanvasGraphics_eoFillStroke() {
        this.pendingEOFill = true;
        this.fillStroke();
      },
      closeFillStroke: function CanvasGraphics_closeFillStroke() {
        this.closePath();
        this.fillStroke();
      },
      closeEOFillStroke: function CanvasGraphics_closeEOFillStroke() {
        this.pendingEOFill = true;
        this.closePath();
        this.fillStroke();
      },
      endPath: function CanvasGraphics_endPath() {
        this.consumePath();
      },
      clip: function CanvasGraphics_clip() {
        this.pendingClip = NORMAL_CLIP;
      },
      eoClip: function CanvasGraphics_eoClip() {
        this.pendingClip = EO_CLIP;
      },
      beginText: function CanvasGraphics_beginText() {
        this.current.textMatrix = _util.IDENTITY_MATRIX;
        this.current.textMatrixScale = 1;
        this.current.x = this.current.lineX = 0;
        this.current.y = this.current.lineY = 0;
      },
      endText: function CanvasGraphics_endText() {
        const paths = this.pendingTextPaths;
        const ctx = this.ctx;

        if (paths === undefined) {
          ctx.beginPath();
          return;
        }

        ctx.save();
        ctx.beginPath();

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          ctx.setTransform.apply(ctx, path.transform);
          ctx.translate(path.x, path.y);
          path.addToPath(ctx, path.fontSize);
        }

        ctx.restore();
        ctx.clip();
        ctx.beginPath();
        delete this.pendingTextPaths;
      },
      setCharSpacing: function CanvasGraphics_setCharSpacing(spacing) {
        this.current.charSpacing = spacing;
      },
      setWordSpacing: function CanvasGraphics_setWordSpacing(spacing) {
        this.current.wordSpacing = spacing;
      },
      setHScale: function CanvasGraphics_setHScale(scale) {
        this.current.textHScale = scale / 100;
      },
      setLeading: function CanvasGraphics_setLeading(leading) {
        this.current.leading = -leading;
      },
      setFont: function CanvasGraphics_setFont(fontRefName, size) {
        const fontObj = this.commonObjs.get(fontRefName);
        const current = this.current;

        if (!fontObj) {
          throw new Error(`Can't find font for ${fontRefName}`);
        }

        current.fontMatrix = fontObj.fontMatrix || _util.FONT_IDENTITY_MATRIX;

        if (current.fontMatrix[0] === 0 || current.fontMatrix[3] === 0) {
          (0, _util.warn)("Invalid font matrix for font " + fontRefName);
        }

        if (size < 0) {
          size = -size;
          current.fontDirection = -1;
        } else {
          current.fontDirection = 1;
        }

        this.current.font = fontObj;
        this.current.fontSize = size;

        if (fontObj.isType3Font) {
          return;
        }

        const name = fontObj.loadedName || "sans-serif";
        let bold = "normal";

        if (fontObj.black) {
          bold = "900";
        } else if (fontObj.bold) {
          bold = "bold";
        }

        const italic = fontObj.italic ? "italic" : "normal";
        const typeface = `"${name}", ${fontObj.fallbackName}`;
        let browserFontSize = size;

        if (size < MIN_FONT_SIZE) {
          browserFontSize = MIN_FONT_SIZE;
        } else if (size > MAX_FONT_SIZE) {
          browserFontSize = MAX_FONT_SIZE;
        }

        this.current.fontSizeScale = size / browserFontSize;
        this.ctx.font = `${italic} ${bold} ${browserFontSize}px ${typeface}`;
      },
      setTextRenderingMode: function CanvasGraphics_setTextRenderingMode(mode) {
        this.current.textRenderingMode = mode;
      },
      setTextRise: function CanvasGraphics_setTextRise(rise) {
        this.current.textRise = rise;
      },
      moveText: function CanvasGraphics_moveText(x, y) {
        this.current.x = this.current.lineX += x;
        this.current.y = this.current.lineY += y;
      },
      setLeadingMoveText: function CanvasGraphics_setLeadingMoveText(x, y) {
        this.setLeading(-y);
        this.moveText(x, y);
      },
      setTextMatrix: function CanvasGraphics_setTextMatrix(a, b, c, d, e, f) {
        this.current.textMatrix = [a, b, c, d, e, f];
        this.current.textMatrixScale = Math.sqrt(a * a + b * b);
        this.current.x = this.current.lineX = 0;
        this.current.y = this.current.lineY = 0;
      },
      nextLine: function CanvasGraphics_nextLine() {
        this.moveText(0, this.current.leading);
      },

      paintChar(character, x, y, patternTransform, resetLineWidthToOne) {
        const ctx = this.ctx;
        const current = this.current;
        const font = current.font;
        const textRenderingMode = current.textRenderingMode;
        const fontSize = current.fontSize / current.fontSizeScale;
        const fillStrokeMode = textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;
        const isAddToPathSet = !!(textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG);
        const patternFill = current.patternFill && !font.missingFile;
        let addToPath;

        if (font.disableFontFace || isAddToPathSet || patternFill) {
          addToPath = font.getPathGenerator(this.commonObjs, character);
        }

        if (font.disableFontFace || patternFill) {
          ctx.save();
          ctx.translate(x, y);
          ctx.beginPath();
          addToPath(ctx, fontSize);

          if (patternTransform) {
            ctx.setTransform.apply(ctx, patternTransform);
          }

          if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            ctx.fill();
          }

          if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            if (resetLineWidthToOne) {
              ctx.resetTransform();
              ctx.lineWidth = Math.round(this._combinedScaleFactor);
            }

            ctx.stroke();
          }

          ctx.restore();
        } else {
          if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            ctx.fillText(character, x, y);
          }

          if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            if (resetLineWidthToOne) {
              ctx.save();
              ctx.moveTo(x, y);
              ctx.resetTransform();
              ctx.lineWidth = Math.round(this._combinedScaleFactor);
              ctx.strokeText(character, 0, 0);
              ctx.restore();
            } else {
              ctx.strokeText(character, x, y);
            }
          }
        }

        if (isAddToPathSet) {
          const paths = this.pendingTextPaths || (this.pendingTextPaths = []);
          paths.push({
            transform: ctx.mozCurrentTransform,
            x,
            y,
            fontSize,
            addToPath
          });
        }
      },

      get isFontSubpixelAAEnabled() {
        const {
          context: ctx
        } = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10);
        ctx.scale(1.5, 1);
        ctx.fillText("I", 0, 10);
        const data = ctx.getImageData(0, 0, 10, 10).data;
        let enabled = false;

        for (let i = 3; i < data.length; i += 4) {
          if (data[i] > 0 && data[i] < 255) {
            enabled = true;
            break;
          }
        }

        return (0, _util.shadow)(this, "isFontSubpixelAAEnabled", enabled);
      },

      showText: function CanvasGraphics_showText(glyphs) {
        const current = this.current;
        const font = current.font;

        if (font.isType3Font) {
          return this.showType3Text(glyphs);
        }

        const fontSize = current.fontSize;

        if (fontSize === 0) {
          return undefined;
        }

        const ctx = this.ctx;
        const fontSizeScale = current.fontSizeScale;
        const charSpacing = current.charSpacing;
        const wordSpacing = current.wordSpacing;
        const fontDirection = current.fontDirection;
        const textHScale = current.textHScale * fontDirection;
        const glyphsLength = glyphs.length;
        const vertical = font.vertical;
        const spacingDir = vertical ? 1 : -1;
        const defaultVMetrics = font.defaultVMetrics;
        const widthAdvanceScale = fontSize * current.fontMatrix[0];
        const simpleFillText = current.textRenderingMode === _util.TextRenderingMode.FILL && !font.disableFontFace && !current.patternFill;
        ctx.save();
        let patternTransform;

        if (current.patternFill) {
          ctx.save();
          const pattern = current.fillColor.getPattern(ctx, this);
          patternTransform = ctx.mozCurrentTransform;
          ctx.restore();
          ctx.fillStyle = pattern;
        }

        ctx.transform.apply(ctx, current.textMatrix);
        ctx.translate(current.x, current.y + current.textRise);

        if (fontDirection > 0) {
          ctx.scale(textHScale, -1);
        } else {
          ctx.scale(textHScale, 1);
        }

        let lineWidth = current.lineWidth;
        let resetLineWidthToOne = false;
        const scale = current.textMatrixScale;

        if (scale === 0 || lineWidth === 0) {
          const fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

          if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
            this._cachedGetSinglePixelWidth = null;
            lineWidth = this.getSinglePixelWidth();
            resetLineWidthToOne = lineWidth < 0;
          }
        } else {
          lineWidth /= scale;
        }

        if (fontSizeScale !== 1.0) {
          ctx.scale(fontSizeScale, fontSizeScale);
          lineWidth /= fontSizeScale;
        }

        ctx.lineWidth = lineWidth;
        let x = 0,
            i;

        for (i = 0; i < glyphsLength; ++i) {
          const glyph = glyphs[i];

          if ((0, _util.isNum)(glyph)) {
            x += spacingDir * glyph * fontSize / 1000;
            continue;
          }

          let restoreNeeded = false;
          const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
          const character = glyph.fontChar;
          const accent = glyph.accent;
          let scaledX, scaledY;
          let width = glyph.width;

          if (vertical) {
            const vmetric = glyph.vmetric || defaultVMetrics;
            const vx = -(glyph.vmetric ? vmetric[1] : width * 0.5) * widthAdvanceScale;
            const vy = vmetric[2] * widthAdvanceScale;
            width = vmetric ? -vmetric[0] : width;
            scaledX = vx / fontSizeScale;
            scaledY = (x + vy) / fontSizeScale;
          } else {
            scaledX = x / fontSizeScale;
            scaledY = 0;
          }

          if (font.remeasure && width > 0) {
            const measuredWidth = ctx.measureText(character).width * 1000 / fontSize * fontSizeScale;

            if (width < measuredWidth && this.isFontSubpixelAAEnabled) {
              const characterScaleX = width / measuredWidth;
              restoreNeeded = true;
              ctx.save();
              ctx.scale(characterScaleX, 1);
              scaledX /= characterScaleX;
            } else if (width !== measuredWidth) {
              scaledX += (width - measuredWidth) / 2000 * fontSize / fontSizeScale;
            }
          }

          if (this.contentVisible && (glyph.isInFont || font.missingFile)) {
            if (simpleFillText && !accent) {
              ctx.fillText(character, scaledX, scaledY);
            } else {
              this.paintChar(character, scaledX, scaledY, patternTransform, resetLineWidthToOne);

              if (accent) {
                const scaledAccentX = scaledX + fontSize * accent.offset.x / fontSizeScale;
                const scaledAccentY = scaledY - fontSize * accent.offset.y / fontSizeScale;
                this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY, patternTransform, resetLineWidthToOne);
              }
            }
          }

          let charWidth;

          if (vertical) {
            charWidth = width * widthAdvanceScale - spacing * fontDirection;
          } else {
            charWidth = width * widthAdvanceScale + spacing * fontDirection;
          }

          x += charWidth;

          if (restoreNeeded) {
            ctx.restore();
          }
        }

        if (vertical) {
          current.y -= x;
        } else {
          current.x += x * textHScale;
        }

        ctx.restore();
      },
      showType3Text: function CanvasGraphics_showType3Text(glyphs) {
        const ctx = this.ctx;
        const current = this.current;
        const font = current.font;
        const fontSize = current.fontSize;
        const fontDirection = current.fontDirection;
        const spacingDir = font.vertical ? 1 : -1;
        const charSpacing = current.charSpacing;
        const wordSpacing = current.wordSpacing;
        const textHScale = current.textHScale * fontDirection;
        const fontMatrix = current.fontMatrix || _util.FONT_IDENTITY_MATRIX;
        const glyphsLength = glyphs.length;
        const isTextInvisible = current.textRenderingMode === _util.TextRenderingMode.INVISIBLE;
        let i, glyph, width, spacingLength;

        if (isTextInvisible || fontSize === 0) {
          return;
        }

        this._cachedGetSinglePixelWidth = null;
        ctx.save();
        ctx.transform.apply(ctx, current.textMatrix);
        ctx.translate(current.x, current.y);
        ctx.scale(textHScale, fontDirection);

        for (i = 0; i < glyphsLength; ++i) {
          glyph = glyphs[i];

          if ((0, _util.isNum)(glyph)) {
            spacingLength = spacingDir * glyph * fontSize / 1000;
            this.ctx.translate(spacingLength, 0);
            current.x += spacingLength * textHScale;
            continue;
          }

          const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
          const operatorList = font.charProcOperatorList[glyph.operatorListId];

          if (!operatorList) {
            (0, _util.warn)(`Type3 character "${glyph.operatorListId}" is not available.`);
            continue;
          }

          if (this.contentVisible) {
            this.processingType3 = glyph;
            this.save();
            ctx.scale(fontSize, fontSize);
            ctx.transform.apply(ctx, fontMatrix);
            this.executeOperatorList(operatorList);
            this.restore();
          }

          const transformed = _util.Util.applyTransform([glyph.width, 0], fontMatrix);

          width = transformed[0] * fontSize + spacing;
          ctx.translate(width, 0);
          current.x += width * textHScale;
        }

        ctx.restore();
        this.processingType3 = null;
      },
      setCharWidth: function CanvasGraphics_setCharWidth(xWidth, yWidth) {},
      setCharWidthAndBounds: function CanvasGraphics_setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury) {
        this.ctx.rect(llx, lly, urx - llx, ury - lly);
        this.clip();
        this.endPath();
      },
      getColorN_Pattern: function CanvasGraphics_getColorN_Pattern(IR) {
        let pattern;

        if (IR[0] === "TilingPattern") {
          const color = IR[1];
          const baseTransform = this.baseTransform || this.ctx.mozCurrentTransform.slice();
          const canvasGraphicsFactory = {
            createCanvasGraphics: ctx => {
              return new CanvasGraphics(ctx, this.commonObjs, this.objs, this.canvasFactory, this.webGLContext);
            }
          };
          pattern = new _pattern_helper.TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform);
        } else {
          pattern = (0, _pattern_helper.getShadingPatternFromIR)(IR);
        }

        return pattern;
      },
      setStrokeColorN: function CanvasGraphics_setStrokeColorN() {
        this.current.strokeColor = this.getColorN_Pattern(arguments);
      },
      setFillColorN: function CanvasGraphics_setFillColorN() {
        this.current.fillColor = this.getColorN_Pattern(arguments);
        this.current.patternFill = true;
      },
      setStrokeRGBColor: function CanvasGraphics_setStrokeRGBColor(r, g, b) {
        const color = _util.Util.makeHexColor(r, g, b);

        this.ctx.strokeStyle = color;
        this.current.strokeColor = color;
      },
      setFillRGBColor: function CanvasGraphics_setFillRGBColor(r, g, b) {
        const color = _util.Util.makeHexColor(r, g, b);

        this.ctx.fillStyle = color;
        this.current.fillColor = color;
        this.current.patternFill = false;
      },
      shadingFill: function CanvasGraphics_shadingFill(patternIR) {
        if (!this.contentVisible) {
          return;
        }

        const ctx = this.ctx;
        this.save();
        const pattern = (0, _pattern_helper.getShadingPatternFromIR)(patternIR);
        ctx.fillStyle = pattern.getPattern(ctx, this, true);
        const inv = ctx.mozCurrentTransformInverse;

        if (inv) {
          const canvas = ctx.canvas;
          const width = canvas.width;
          const height = canvas.height;

          const bl = _util.Util.applyTransform([0, 0], inv);

          const br = _util.Util.applyTransform([0, height], inv);

          const ul = _util.Util.applyTransform([width, 0], inv);

          const ur = _util.Util.applyTransform([width, height], inv);

          const x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
          const y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
          const x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
          const y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
          this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
        } else {
          this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
        }

        this.restore();
      },
      beginInlineImage: function CanvasGraphics_beginInlineImage() {
        (0, _util.unreachable)("Should not call beginInlineImage");
      },
      beginImageData: function CanvasGraphics_beginImageData() {
        (0, _util.unreachable)("Should not call beginImageData");
      },
      paintFormXObjectBegin: function CanvasGraphics_paintFormXObjectBegin(matrix, bbox) {
        if (!this.contentVisible) {
          return;
        }

        this.save();
        this.baseTransformStack.push(this.baseTransform);

        if (Array.isArray(matrix) && matrix.length === 6) {
          this.transform.apply(this, matrix);
        }

        this.baseTransform = this.ctx.mozCurrentTransform;

        if (bbox) {
          const width = bbox[2] - bbox[0];
          const height = bbox[3] - bbox[1];
          this.ctx.rect(bbox[0], bbox[1], width, height);
          this.clip();
          this.endPath();
        }
      },
      paintFormXObjectEnd: function CanvasGraphics_paintFormXObjectEnd() {
        if (!this.contentVisible) {
          return;
        }

        this.restore();
        this.baseTransform = this.baseTransformStack.pop();
      },
      beginGroup: function CanvasGraphics_beginGroup(group) {
        if (!this.contentVisible) {
          return;
        }

        this.save();
        const currentCtx = this.ctx;

        if (!group.isolated) {
          (0, _util.info)("TODO: Support non-isolated groups.");
        }

        if (group.knockout) {
          (0, _util.warn)("Knockout groups not supported.");
        }

        const currentTransform = currentCtx.mozCurrentTransform;

        if (group.matrix) {
          currentCtx.transform.apply(currentCtx, group.matrix);
        }

        if (!group.bbox) {
          throw new Error("Bounding box is required.");
        }

        let bounds = _util.Util.getAxialAlignedBoundingBox(group.bbox, currentCtx.mozCurrentTransform);

        const canvasBounds = [0, 0, currentCtx.canvas.width, currentCtx.canvas.height];
        bounds = _util.Util.intersect(bounds, canvasBounds) || [0, 0, 0, 0];
        const offsetX = Math.floor(bounds[0]);
        const offsetY = Math.floor(bounds[1]);
        let drawnWidth = Math.max(Math.ceil(bounds[2]) - offsetX, 1);
        let drawnHeight = Math.max(Math.ceil(bounds[3]) - offsetY, 1);
        let scaleX = 1,
            scaleY = 1;

        if (drawnWidth > MAX_GROUP_SIZE) {
          scaleX = drawnWidth / MAX_GROUP_SIZE;
          drawnWidth = MAX_GROUP_SIZE;
        }

        if (drawnHeight > MAX_GROUP_SIZE) {
          scaleY = drawnHeight / MAX_GROUP_SIZE;
          drawnHeight = MAX_GROUP_SIZE;
        }

        let cacheId = "groupAt" + this.groupLevel;

        if (group.smask) {
          cacheId += "_smask_" + this.smaskCounter++ % 2;
        }

        const scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
        const groupCtx = scratchCanvas.context;
        groupCtx.scale(1 / scaleX, 1 / scaleY);
        groupCtx.translate(-offsetX, -offsetY);
        groupCtx.transform.apply(groupCtx, currentTransform);

        if (group.smask) {
          this.smaskStack.push({
            canvas: scratchCanvas.canvas,
            context: groupCtx,
            offsetX,
            offsetY,
            scaleX,
            scaleY,
            subtype: group.smask.subtype,
            backdrop: group.smask.backdrop,
            transferMap: group.smask.transferMap || null,
            startTransformInverse: null
          });
        } else {
          currentCtx.setTransform(1, 0, 0, 1, 0, 0);
          currentCtx.translate(offsetX, offsetY);
          currentCtx.scale(scaleX, scaleY);
        }

        copyCtxState(currentCtx, groupCtx);
        this.ctx = groupCtx;
        this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
        this.groupStack.push(currentCtx);
        this.groupLevel++;
        this.current.activeSMask = null;
      },
      endGroup: function CanvasGraphics_endGroup(group) {
        if (!this.contentVisible) {
          return;
        }

        this.groupLevel--;
        const groupCtx = this.ctx;
        this.ctx = this.groupStack.pop();

        if (this.ctx.imageSmoothingEnabled !== undefined) {
          this.ctx.imageSmoothingEnabled = false;
        } else {
          this.ctx.mozImageSmoothingEnabled = false;
        }

        if (group.smask) {
          this.tempSMask = this.smaskStack.pop();
        } else {
          this.ctx.drawImage(groupCtx.canvas, 0, 0);
        }

        this.restore();
      },
      beginAnnotations: function CanvasGraphics_beginAnnotations() {
        this.save();

        if (this.baseTransform) {
          this.ctx.setTransform.apply(this.ctx, this.baseTransform);
        }
      },
      endAnnotations: function CanvasGraphics_endAnnotations() {
        this.restore();
      },
      beginAnnotation: function CanvasGraphics_beginAnnotation(rect, transform, matrix) {
        this.save();
        resetCtxToDefault(this.ctx);
        this.current = new CanvasExtraState();

        if (Array.isArray(rect) && rect.length === 4) {
          const width = rect[2] - rect[0];
          const height = rect[3] - rect[1];
          this.ctx.rect(rect[0], rect[1], width, height);
          this.clip();
          this.endPath();
        }

        this.transform.apply(this, transform);
        this.transform.apply(this, matrix);
      },
      endAnnotation: function CanvasGraphics_endAnnotation() {
        this.restore();
      },
      paintImageMaskXObject: function CanvasGraphics_paintImageMaskXObject(img) {
        if (!this.contentVisible) {
          return;
        }

        const ctx = this.ctx;
        const width = img.width,
              height = img.height;
        const fillColor = this.current.fillColor;
        const isPatternFill = this.current.patternFill;
        const glyph = this.processingType3;

        if (COMPILE_TYPE3_GLYPHS && glyph && glyph.compiled === undefined) {
          if (width <= MAX_SIZE_TO_COMPILE && height <= MAX_SIZE_TO_COMPILE) {
            glyph.compiled = compileType3Glyph({
              data: img.data,
              width,
              height
            });
          } else {
            glyph.compiled = null;
          }
        }

        if (glyph && glyph.compiled) { // lwf
          glyph.compiled(ctx);
          return;
        }

        const maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
        const maskCtx = maskCanvas.context;
        maskCtx.save();
        putBinaryImageMask(maskCtx, img);
        maskCtx.globalCompositeOperation = "source-in";
        maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
        maskCtx.fillRect(0, 0, width, height);
        maskCtx.restore();
        this.paintInlineImageXObject(maskCanvas.canvas);
      },

      paintImageMaskXObjectRepeat(imgData, scaleX, skewX = 0, skewY = 0, scaleY, positions) {
        if (!this.contentVisible) {
          return;
        }

        const width = imgData.width;
        const height = imgData.height;
        const fillColor = this.current.fillColor;
        const isPatternFill = this.current.patternFill;
        const maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
        const maskCtx = maskCanvas.context;
        maskCtx.save();
        putBinaryImageMask(maskCtx, imgData);
        maskCtx.globalCompositeOperation = "source-in";
        maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
        maskCtx.fillRect(0, 0, width, height);
        maskCtx.restore();
        const ctx = this.ctx;

        for (let i = 0, ii = positions.length; i < ii; i += 2) {
          ctx.save();
          ctx.transform(scaleX, skewX, skewY, scaleY, positions[i], positions[i + 1]);
          ctx.scale(1, -1);
          ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
          ctx.restore();
        }
      },

      paintImageMaskXObjectGroup: function CanvasGraphics_paintImageMaskXObjectGroup(images) {
        if (!this.contentVisible) {
          return;
        }

        const ctx = this.ctx;
        const fillColor = this.current.fillColor;
        const isPatternFill = this.current.patternFill;

        for (let i = 0, ii = images.length; i < ii; i++) {
          const image = images[i];
          const width = image.width,
                height = image.height;
          const maskCanvas = this.cachedCanvases.getCanvas("maskCanvas", width, height);
          const maskCtx = maskCanvas.context;
          maskCtx.save();
          putBinaryImageMask(maskCtx, image);
          maskCtx.globalCompositeOperation = "source-in";
          maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
          maskCtx.fillRect(0, 0, width, height);
          maskCtx.restore();
          ctx.save();
          ctx.transform.apply(ctx, image.transform);
          ctx.scale(1, -1);
          ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
          ctx.restore();
        }
      },
      paintImageXObject: function CanvasGraphics_paintImageXObject(objId) {
        if (!this.contentVisible) {
          return;
        }

        const imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

        if (!imgData) {
          (0, _util.warn)("Dependent image isn't ready yet");
          return;
        }

        this.paintInlineImageXObject(imgData);
      },
      paintImageXObjectRepeat: function CanvasGraphics_paintImageXObjectRepeat(objId, scaleX, scaleY, positions) {
        if (!this.contentVisible) {
          return;
        }

        const imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

        if (!imgData) {
          (0, _util.warn)("Dependent image isn't ready yet");
          return;
        }

        const width = imgData.width;
        const height = imgData.height;
        const map = [];

        for (let i = 0, ii = positions.length; i < ii; i += 2) {
          map.push({
            transform: [scaleX, 0, 0, scaleY, positions[i], positions[i + 1]],
            x: 0,
            y: 0,
            w: width,
            h: height
          });
        }

        this.paintInlineImageXObjectGroup(imgData, map);
      },
      paintInlineImageXObject: function CanvasGraphics_paintInlineImageXObject(imgData) {
        if (!this.contentVisible) {
          return;
        }

        const width = imgData.width;
        const height = imgData.height;
        const ctx = this.ctx;
        this.save();
        ctx.scale(1 / width, -1 / height);
        const currentTransform = ctx.mozCurrentTransformInverse;
        const a = currentTransform[0],
              b = currentTransform[1];
        let widthScale = Math.max(Math.sqrt(a * a + b * b), 1);
        const c = currentTransform[2],
              d = currentTransform[3];
        let heightScale = Math.max(Math.sqrt(c * c + d * d), 1);
        let imgToPaint, tmpCanvas, tmpCtx;

        if (typeof HTMLElement === "function" && imgData instanceof HTMLElement || !imgData.data) {
          imgToPaint = imgData;
        } else {
          tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", width, height);
          tmpCtx = tmpCanvas.context;
          putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);
          imgToPaint = tmpCanvas.canvas;
        }

        let paintWidth = width,
            paintHeight = height;
        let tmpCanvasId = "prescale1";

        while (widthScale > 2 && paintWidth > 1 || heightScale > 2 && paintHeight > 1) {
          let newWidth = paintWidth,
              newHeight = paintHeight;

          if (widthScale > 2 && paintWidth > 1) {
            newWidth = Math.ceil(paintWidth / 2);
            widthScale /= paintWidth / newWidth;
          }

          if (heightScale > 2 && paintHeight > 1) {
            newHeight = Math.ceil(paintHeight / 2);
            heightScale /= paintHeight / newHeight;
          }

          tmpCanvas = this.cachedCanvases.getCanvas(tmpCanvasId, newWidth, newHeight);
          tmpCtx = tmpCanvas.context;
          tmpCtx.clearRect(0, 0, newWidth, newHeight);
          tmpCtx.drawImage(imgToPaint, 0, 0, paintWidth, paintHeight, 0, 0, newWidth, newHeight);
          imgToPaint = tmpCanvas.canvas;
          paintWidth = newWidth;
          paintHeight = newHeight;
          tmpCanvasId = tmpCanvasId === "prescale1" ? "prescale2" : "prescale1";
        }

        ctx.drawImage(imgToPaint, 0, 0, paintWidth, paintHeight, 0, -height, width, height);

        if (this.imageLayer) {
          const position = this.getCanvasPosition(0, -height);
          this.imageLayer.appendImage({
            imgData,
            left: position[0],
            top: position[1],
            width: width / currentTransform[0],
            height: height / currentTransform[3]
          });
        }

        this.restore();
      },
      paintInlineImageXObjectGroup: function CanvasGraphics_paintInlineImageXObjectGroup(imgData, map) {
        if (!this.contentVisible) {
          return;
        }

        const ctx = this.ctx;
        const w = imgData.width;
        const h = imgData.height;
        const tmpCanvas = this.cachedCanvases.getCanvas("inlineImage", w, h);
        const tmpCtx = tmpCanvas.context;
        putBinaryImageData(tmpCtx, imgData, this.current.transferMaps);

        for (let i = 0, ii = map.length; i < ii; i++) {
          const entry = map[i];
          ctx.save();
          ctx.transform.apply(ctx, entry.transform);
          ctx.scale(1, -1);
          ctx.drawImage(tmpCanvas.canvas, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1);

          if (this.imageLayer) {
            const position = this.getCanvasPosition(entry.x, entry.y);
            this.imageLayer.appendImage({
              imgData,
              left: position[0],
              top: position[1],
              width: w,
              height: h
            });
          }

          ctx.restore();
        }
      },
      paintSolidColorImageMask: function CanvasGraphics_paintSolidColorImageMask() {
        if (!this.contentVisible) {
          return;
        }

        this.ctx.fillRect(0, 0, 1, 1);
      },
      markPoint: function CanvasGraphics_markPoint(tag) {},
      markPointProps: function CanvasGraphics_markPointProps(tag, properties) {},
      beginMarkedContent: function CanvasGraphics_beginMarkedContent(tag) {
        this.markedContentStack.push({
          visible: true
        });
      },
      beginMarkedContentProps: function CanvasGraphics_beginMarkedContentProps(tag, properties) {
        if (tag === "OC") {
          this.markedContentStack.push({
            visible: this.optionalContentConfig.isVisible(properties)
          });
        } else {
          this.markedContentStack.push({
            visible: true
          });
        }

        this.contentVisible = this.isContentVisible();
      },
      endMarkedContent: function CanvasGraphics_endMarkedContent() {
        this.markedContentStack.pop();
        this.contentVisible = this.isContentVisible();
      },
      beginCompat: function CanvasGraphics_beginCompat() {},
      endCompat: function CanvasGraphics_endCompat() {},
      consumePath: function CanvasGraphics_consumePath() {
        const ctx = this.ctx;

        if (this.pendingClip) {
          if (this.pendingClip === EO_CLIP) {
            ctx.clip("evenodd");
          } else {
            ctx.clip();
          }

          this.pendingClip = null;
        }

        ctx.beginPath();
      },

      getSinglePixelWidth() {
        if (this._cachedGetSinglePixelWidth === null) {
          const m = this.ctx.mozCurrentTransform;
          const absDet = Math.abs(m[0] * m[3] - m[2] * m[1]);
          const sqNorm1 = m[0] ** 2 + m[2] ** 2;
          const sqNorm2 = m[1] ** 2 + m[3] ** 2;
          const pixelHeight = Math.sqrt(Math.max(sqNorm1, sqNorm2)) / absDet;

          if (sqNorm1 !== sqNorm2 && this._combinedScaleFactor * pixelHeight > 1) {
            this._cachedGetSinglePixelWidth = -(this._combinedScaleFactor * pixelHeight);
          } else if (absDet > Number.EPSILON) {
            this._cachedGetSinglePixelWidth = pixelHeight * 1.0000001;
          } else {
            this._cachedGetSinglePixelWidth = 1;
          }
        }

        return this._cachedGetSinglePixelWidth;
      },

      getCanvasPosition: function CanvasGraphics_getCanvasPosition(x, y) {
        const transform = this.ctx.mozCurrentTransform;
        return [transform[0] * x + transform[2] * y + transform[4], transform[1] * x + transform[3] * y + transform[5]];
      },
      isContentVisible: function CanvasGraphics_isContentVisible() {
        for (let i = this.markedContentStack.length - 1; i >= 0; i--) {
          if (!this.markedContentStack[i].visible) {
            return false;
          }
        }

        return true;
      }
    };

    for (const op in _util.OPS) {
      CanvasGraphics.prototype[_util.OPS[op]] = CanvasGraphics.prototype[op];
    }

    return CanvasGraphics;
  }();

  exports.CanvasGraphics = CanvasGraphics;

  /***/ }),
  /* 11 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.getShadingPatternFromIR = getShadingPatternFromIR;
  exports.TilingPattern = void 0;

  var _util = __w_pdfjs_require__(2);

  const ShadingIRs = {};

  function applyBoundingBox(ctx, bbox) {
    if (!bbox || typeof Path2D === "undefined") {
      return;
    }

    const width = bbox[2] - bbox[0];
    const height = bbox[3] - bbox[1];
    const region = new Path2D();
    region.rect(bbox[0], bbox[1], width, height);
    ctx.clip(region);
  }

  ShadingIRs.RadialAxial = {
    fromIR: function RadialAxial_fromIR(raw) {
      const type = raw[1];
      const bbox = raw[2];
      const colorStops = raw[3];
      const p0 = raw[4];
      const p1 = raw[5];
      const r0 = raw[6];
      const r1 = raw[7];
      return {
        getPattern: function RadialAxial_getPattern(ctx) {
          applyBoundingBox(ctx, bbox);
          let grad;

          if (type === "axial") {
            grad = ctx.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
          } else if (type === "radial") {
            grad = ctx.createRadialGradient(p0[0], p0[1], r0, p1[0], p1[1], r1);
          }

          for (let i = 0, ii = colorStops.length; i < ii; ++i) {
            const c = colorStops[i];
            grad.addColorStop(c[0], c[1]);
          }

          return grad;
        }
      };
    }
  };

  const createMeshCanvas = function createMeshCanvasClosure() {
    function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {
      const coords = context.coords,
            colors = context.colors;
      const bytes = data.data,
            rowSize = data.width * 4;
      let tmp;

      if (coords[p1 + 1] > coords[p2 + 1]) {
        tmp = p1;
        p1 = p2;
        p2 = tmp;
        tmp = c1;
        c1 = c2;
        c2 = tmp;
      }

      if (coords[p2 + 1] > coords[p3 + 1]) {
        tmp = p2;
        p2 = p3;
        p3 = tmp;
        tmp = c2;
        c2 = c3;
        c3 = tmp;
      }

      if (coords[p1 + 1] > coords[p2 + 1]) {
        tmp = p1;
        p1 = p2;
        p2 = tmp;
        tmp = c1;
        c1 = c2;
        c2 = tmp;
      }

      const x1 = (coords[p1] + context.offsetX) * context.scaleX;
      const y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;
      const x2 = (coords[p2] + context.offsetX) * context.scaleX;
      const y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;
      const x3 = (coords[p3] + context.offsetX) * context.scaleX;
      const y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;

      if (y1 >= y3) {
        return;
      }

      const c1r = colors[c1],
            c1g = colors[c1 + 1],
            c1b = colors[c1 + 2];
      const c2r = colors[c2],
            c2g = colors[c2 + 1],
            c2b = colors[c2 + 2];
      const c3r = colors[c3],
            c3g = colors[c3 + 1],
            c3b = colors[c3 + 2];
      const minY = Math.round(y1),
            maxY = Math.round(y3);
      let xa, car, cag, cab;
      let xb, cbr, cbg, cbb;

      for (let y = minY; y <= maxY; y++) {
        if (y < y2) {
          let k;

          if (y < y1) {
            k = 0;
          } else if (y1 === y2) {
            k = 1;
          } else {
            k = (y1 - y) / (y1 - y2);
          }

          xa = x1 - (x1 - x2) * k;
          car = c1r - (c1r - c2r) * k;
          cag = c1g - (c1g - c2g) * k;
          cab = c1b - (c1b - c2b) * k;
        } else {
          let k;

          if (y > y3) {
            k = 1;
          } else if (y2 === y3) {
            k = 0;
          } else {
            k = (y2 - y) / (y2 - y3);
          }

          xa = x2 - (x2 - x3) * k;
          car = c2r - (c2r - c3r) * k;
          cag = c2g - (c2g - c3g) * k;
          cab = c2b - (c2b - c3b) * k;
        }

        let k;

        if (y < y1) {
          k = 0;
        } else if (y > y3) {
          k = 1;
        } else {
          k = (y1 - y) / (y1 - y3);
        }

        xb = x1 - (x1 - x3) * k;
        cbr = c1r - (c1r - c3r) * k;
        cbg = c1g - (c1g - c3g) * k;
        cbb = c1b - (c1b - c3b) * k;
        const x1_ = Math.round(Math.min(xa, xb));
        const x2_ = Math.round(Math.max(xa, xb));
        let j = rowSize * y + x1_ * 4;

        for (let x = x1_; x <= x2_; x++) {
          k = (xa - x) / (xa - xb);

          if (k < 0) {
            k = 0;
          } else if (k > 1) {
            k = 1;
          }

          bytes[j++] = car - (car - cbr) * k | 0;
          bytes[j++] = cag - (cag - cbg) * k | 0;
          bytes[j++] = cab - (cab - cbb) * k | 0;
          bytes[j++] = 255;
        }
      }
    }

    function drawFigure(data, figure, context) {
      const ps = figure.coords;
      const cs = figure.colors;
      let i, ii;

      switch (figure.type) {
        case "lattice":
          const verticesPerRow = figure.verticesPerRow;
          const rows = Math.floor(ps.length / verticesPerRow) - 1;
          const cols = verticesPerRow - 1;

          for (i = 0; i < rows; i++) {
            let q = i * verticesPerRow;

            for (let j = 0; j < cols; j++, q++) {
              drawTriangle(data, context, ps[q], ps[q + 1], ps[q + verticesPerRow], cs[q], cs[q + 1], cs[q + verticesPerRow]);
              drawTriangle(data, context, ps[q + verticesPerRow + 1], ps[q + 1], ps[q + verticesPerRow], cs[q + verticesPerRow + 1], cs[q + 1], cs[q + verticesPerRow]);
            }
          }

          break;

        case "triangles":
          for (i = 0, ii = ps.length; i < ii; i += 3) {
            drawTriangle(data, context, ps[i], ps[i + 1], ps[i + 2], cs[i], cs[i + 1], cs[i + 2]);
          }

          break;

        default:
          throw new Error("illegal figure");
      }
    }

    function createMeshCanvas(bounds, combinesScale, coords, colors, figures, backgroundColor, cachedCanvases, webGLContext) {
      const EXPECTED_SCALE = 1.1;
      const MAX_PATTERN_SIZE = 3000;
      const BORDER_SIZE = 2;
      const offsetX = Math.floor(bounds[0]);
      const offsetY = Math.floor(bounds[1]);
      const boundsWidth = Math.ceil(bounds[2]) - offsetX;
      const boundsHeight = Math.ceil(bounds[3]) - offsetY;
      const width = Math.min(Math.ceil(Math.abs(boundsWidth * combinesScale[0] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
      const height = Math.min(Math.ceil(Math.abs(boundsHeight * combinesScale[1] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
      const scaleX = boundsWidth / width;
      const scaleY = boundsHeight / height;
      const context = {
        coords,
        colors,
        offsetX: -offsetX,
        offsetY: -offsetY,
        scaleX: 1 / scaleX,
        scaleY: 1 / scaleY
      };
      const paddedWidth = width + BORDER_SIZE * 2;
      const paddedHeight = height + BORDER_SIZE * 2;
      let canvas, tmpCanvas, i, ii;

      if (webGLContext.isEnabled) {
        canvas = webGLContext.drawFigures({
          width,
          height,
          backgroundColor,
          figures,
          context
        });
        tmpCanvas = cachedCanvases.getCanvas("mesh", paddedWidth, paddedHeight, false);
        tmpCanvas.context.drawImage(canvas, BORDER_SIZE, BORDER_SIZE);
        canvas = tmpCanvas.canvas;
      } else {
        tmpCanvas = cachedCanvases.getCanvas("mesh", paddedWidth, paddedHeight, false);
        const tmpCtx = tmpCanvas.context;
        const data = tmpCtx.createImageData(width, height);

        if (backgroundColor) {
          const bytes = data.data;

          for (i = 0, ii = bytes.length; i < ii; i += 4) {
            bytes[i] = backgroundColor[0];
            bytes[i + 1] = backgroundColor[1];
            bytes[i + 2] = backgroundColor[2];
            bytes[i + 3] = 255;
          }
        }

        for (i = 0; i < figures.length; i++) {
          drawFigure(data, figures[i], context);
        }

        tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE);
        canvas = tmpCanvas.canvas;
      }

      return {
        canvas,
        offsetX: offsetX - BORDER_SIZE * scaleX,
        offsetY: offsetY - BORDER_SIZE * scaleY,
        scaleX,
        scaleY
      };
    }

    return createMeshCanvas;
  }();

  ShadingIRs.Mesh = {
    fromIR: function Mesh_fromIR(raw) {
      const coords = raw[2];
      const colors = raw[3];
      const figures = raw[4];
      const bounds = raw[5];
      const matrix = raw[6];
      const bbox = raw[7];
      const background = raw[8];
      return {
        getPattern: function Mesh_getPattern(ctx, owner, shadingFill) {
          applyBoundingBox(ctx, bbox);
          let scale;

          if (shadingFill) {
            scale = _util.Util.singularValueDecompose2dScale(ctx.mozCurrentTransform);
          } else {
            scale = _util.Util.singularValueDecompose2dScale(owner.baseTransform);

            if (matrix) {
              const matrixScale = _util.Util.singularValueDecompose2dScale(matrix);

              scale = [scale[0] * matrixScale[0], scale[1] * matrixScale[1]];
            }
          }

          const temporaryPatternCanvas = createMeshCanvas(bounds, scale, coords, colors, figures, shadingFill ? null : background, owner.cachedCanvases, owner.webGLContext);

          if (!shadingFill) {
            ctx.setTransform.apply(ctx, owner.baseTransform);

            if (matrix) {
              ctx.transform.apply(ctx, matrix);
            }
          }

          ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
          ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY);
          return ctx.createPattern(temporaryPatternCanvas.canvas, "no-repeat");
        }
      };
    }
  };
  ShadingIRs.Dummy = {
    fromIR: function Dummy_fromIR() {
      return {
        getPattern: function Dummy_fromIR_getPattern() {
          return "hotpink";
        }
      };
    }
  };

  function getShadingPatternFromIR(raw) {
    const shadingIR = ShadingIRs[raw[0]];

    if (!shadingIR) {
      throw new Error(`Unknown IR type: ${raw[0]}`);
    }

    return shadingIR.fromIR(raw);
  }

  const TilingPattern = function TilingPatternClosure() {
    const PaintType = {
      COLORED: 1,
      UNCOLORED: 2
    };
    const MAX_PATTERN_SIZE = 3000;

    function TilingPattern(IR, color, ctx, canvasGraphicsFactory, baseTransform) {
      this.operatorList = IR[2];
      this.matrix = IR[3] || [1, 0, 0, 1, 0, 0];
      this.bbox = IR[4];
      this.xstep = IR[5];
      this.ystep = IR[6];
      this.paintType = IR[7];
      this.tilingType = IR[8];
      this.color = color;
      this.canvasGraphicsFactory = canvasGraphicsFactory;
      this.baseTransform = baseTransform;
      this.ctx = ctx;
    }

    TilingPattern.prototype = {
      createPatternCanvas: function TilinPattern_createPatternCanvas(owner) {
        const operatorList = this.operatorList;
        const bbox = this.bbox;
        const xstep = this.xstep;
        const ystep = this.ystep;
        const paintType = this.paintType;
        const tilingType = this.tilingType;
        const color = this.color;
        const canvasGraphicsFactory = this.canvasGraphicsFactory;
        (0, _util.info)("TilingType: " + tilingType);
        const x0 = bbox[0],
              y0 = bbox[1],
              x1 = bbox[2],
              y1 = bbox[3];

        const matrixScale = _util.Util.singularValueDecompose2dScale(this.matrix);

        const curMatrixScale = _util.Util.singularValueDecompose2dScale(this.baseTransform);

        const combinedScale = [matrixScale[0] * curMatrixScale[0], matrixScale[1] * curMatrixScale[1]];
        const dimx = this.getSizeAndScale(xstep, this.ctx.canvas.width, combinedScale[0]);
        const dimy = this.getSizeAndScale(ystep, this.ctx.canvas.height, combinedScale[1]);
        const tmpCanvas = owner.cachedCanvases.getCanvas("pattern", dimx.size, dimy.size, true);
        const tmpCtx = tmpCanvas.context;
        const graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx);
        graphics.groupLevel = owner.groupLevel;
        this.setFillAndStrokeStyleToContext(graphics, paintType, color);
        graphics.transform(dimx.scale, 0, 0, dimy.scale, 0, 0);
        graphics.transform(1, 0, 0, 1, -x0, -y0);
        this.clipBbox(graphics, bbox, x0, y0, x1, y1);
        graphics.executeOperatorList(operatorList);
        this.ctx.transform(1, 0, 0, 1, x0, y0);
        this.ctx.scale(1 / dimx.scale, 1 / dimy.scale);
        return tmpCanvas.canvas;
      },
      getSizeAndScale: function TilingPattern_getSizeAndScale(step, realOutputSize, scale) {
        step = Math.abs(step);
        const maxSize = Math.max(MAX_PATTERN_SIZE, realOutputSize);
        let size = Math.ceil(step * scale);

        if (size >= maxSize) {
          size = maxSize;
        } else {
          scale = size / step;
        }

        return {
          scale,
          size
        };
      },
      clipBbox: function clipBbox(graphics, bbox, x0, y0, x1, y1) {
        if (Array.isArray(bbox) && bbox.length === 4) {
          const bboxWidth = x1 - x0;
          const bboxHeight = y1 - y0;
          graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);
          graphics.clip();
          graphics.endPath();
        }
      },
      setFillAndStrokeStyleToContext: function setFillAndStrokeStyleToContext(graphics, paintType, color) {
        const context = graphics.ctx,
              current = graphics.current;

        switch (paintType) {
          case PaintType.COLORED:
            const ctx = this.ctx;
            context.fillStyle = ctx.fillStyle;
            context.strokeStyle = ctx.strokeStyle;
            current.fillColor = ctx.fillStyle;
            current.strokeColor = ctx.strokeStyle;
            break;

          case PaintType.UNCOLORED:
            const cssColor = _util.Util.makeHexColor(color[0], color[1], color[2]);

            context.fillStyle = cssColor;
            context.strokeStyle = cssColor;
            current.fillColor = cssColor;
            current.strokeColor = cssColor;
            break;

          default:
            throw new _util.FormatError(`Unsupported paint type: ${paintType}`);
        }
      },
      getPattern: function TilingPattern_getPattern(ctx, owner) {
        ctx = this.ctx;
        ctx.setTransform.apply(ctx, this.baseTransform);
        ctx.transform.apply(ctx, this.matrix);
        const temporaryPatternCanvas = this.createPatternCanvas(owner);
        return ctx.createPattern(temporaryPatternCanvas, "repeat");
      }
    };
    return TilingPattern;
  }();

  exports.TilingPattern = TilingPattern;

  /***/ }),
  /* 12 */
  /***/ ((__unused_webpack_module, exports) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.GlobalWorkerOptions = void 0;
  const GlobalWorkerOptions = Object.create(null);
  exports.GlobalWorkerOptions = GlobalWorkerOptions;
  GlobalWorkerOptions.workerPort = GlobalWorkerOptions.workerPort === undefined ? null : GlobalWorkerOptions.workerPort;
  GlobalWorkerOptions.workerSrc = GlobalWorkerOptions.workerSrc === undefined ? "" : GlobalWorkerOptions.workerSrc;

  /***/ }),
  /* 13 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.MessageHandler = void 0;

  var _util = __w_pdfjs_require__(2);

  const CallbackKind = {
    UNKNOWN: 0,
    DATA: 1,
    ERROR: 2
  };
  const StreamKind = {
    UNKNOWN: 0,
    CANCEL: 1,
    CANCEL_COMPLETE: 2,
    CLOSE: 3,
    ENQUEUE: 4,
    ERROR: 5,
    PULL: 6,
    PULL_COMPLETE: 7,
    START_COMPLETE: 8
  };

  function wrapReason(reason) {
    if (typeof reason !== "object" || reason === null) {
      return reason;
    }

    switch (reason.name) {
      case "AbortException":
        return new _util.AbortException(reason.message);

      case "MissingPDFException":
        return new _util.MissingPDFException(reason.message);

      case "UnexpectedResponseException":
        return new _util.UnexpectedResponseException(reason.message, reason.status);

      case "UnknownErrorException":
        return new _util.UnknownErrorException(reason.message, reason.details);

      default:
        return new _util.UnknownErrorException(reason.message, reason.toString());
    }
  }

  class MessageHandler {
    constructor(sourceName, targetName, comObj) {
      this.sourceName = sourceName;
      this.targetName = targetName;
      this.comObj = comObj;
      this.callbackId = 1;
      this.streamId = 1;
      this.postMessageTransfers = true;
      this.streamSinks = Object.create(null);
      this.streamControllers = Object.create(null);
      this.callbackCapabilities = Object.create(null);
      this.actionHandler = Object.create(null);

      this._onComObjOnMessage = event => {
        const data = event.data;

        if (data.targetName !== this.sourceName) {
          return;
        }

        if (data.stream) {
          this._processStreamMessage(data);

          return;
        }

        if (data.callback) {
          const callbackId = data.callbackId;
          const capability = this.callbackCapabilities[callbackId];

          if (!capability) {
            throw new Error(`Cannot resolve callback ${callbackId}`);
          }

          delete this.callbackCapabilities[callbackId];

          if (data.callback === CallbackKind.DATA) {
            capability.resolve(data.data);
          } else if (data.callback === CallbackKind.ERROR) {
            capability.reject(wrapReason(data.reason));
          } else {
            throw new Error("Unexpected callback case");
          }

          return;
        }

        const action = this.actionHandler[data.action];

        if (!action) {
          throw new Error(`Unknown action from worker: ${data.action}`);
        }

        if (data.callbackId) {
          const cbSourceName = this.sourceName;
          const cbTargetName = data.sourceName;
          new Promise(function (resolve) {
            resolve(action(data.data));
          }).then(function (result) {
            comObj.postMessage({
              sourceName: cbSourceName,
              targetName: cbTargetName,
              callback: CallbackKind.DATA,
              callbackId: data.callbackId,
              data: result
            });
          }, function (reason) {
            comObj.postMessage({
              sourceName: cbSourceName,
              targetName: cbTargetName,
              callback: CallbackKind.ERROR,
              callbackId: data.callbackId,
              reason: wrapReason(reason)
            });
          });
          return;
        }

        if (data.streamId) {
          this._createStreamSink(data);

          return;
        }

        action(data.data);
      };

      comObj.addEventListener("message", this._onComObjOnMessage);
    }

    on(actionName, handler) {
      const ah = this.actionHandler;

      if (ah[actionName]) {
        throw new Error(`There is already an actionName called "${actionName}"`);
      }

      ah[actionName] = handler;
    }

    send(actionName, data, transfers) {
      this._postMessage({
        sourceName: this.sourceName,
        targetName: this.targetName,
        action: actionName,
        data
      }, transfers);
    }

    sendWithPromise(actionName, data, transfers) {
      const callbackId = this.callbackId++;
      const capability = (0, _util.createPromiseCapability)();
      this.callbackCapabilities[callbackId] = capability;

      try {
        this._postMessage({
          sourceName: this.sourceName,
          targetName: this.targetName,
          action: actionName,
          callbackId,
          data
        }, transfers);
      } catch (ex) {
        capability.reject(ex);
      }

      return capability.promise;
    }

    sendWithStream(actionName, data, queueingStrategy, transfers) {
      const streamId = this.streamId++;
      const sourceName = this.sourceName;
      const targetName = this.targetName;
      const comObj = this.comObj;
      return new ReadableStream({
        start: controller => {
          const startCapability = (0, _util.createPromiseCapability)();
          this.streamControllers[streamId] = {
            controller,
            startCall: startCapability,
            pullCall: null,
            cancelCall: null,
            isClosed: false
          };

          this._postMessage({
            sourceName,
            targetName,
            action: actionName,
            streamId,
            data,
            desiredSize: controller.desiredSize
          }, transfers);

          return startCapability.promise;
        },
        pull: controller => {
          const pullCapability = (0, _util.createPromiseCapability)();
          this.streamControllers[streamId].pullCall = pullCapability;
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.PULL,
            streamId,
            desiredSize: controller.desiredSize
          });
          return pullCapability.promise;
        },
        cancel: reason => {
          (0, _util.assert)(reason instanceof Error, "cancel must have a valid reason");
          const cancelCapability = (0, _util.createPromiseCapability)();
          this.streamControllers[streamId].cancelCall = cancelCapability;
          this.streamControllers[streamId].isClosed = true;
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.CANCEL,
            streamId,
            reason: wrapReason(reason)
          });
          return cancelCapability.promise;
        }
      }, queueingStrategy);
    }

    _createStreamSink(data) {
      const self = this;
      const action = this.actionHandler[data.action];
      const streamId = data.streamId;
      const sourceName = this.sourceName;
      const targetName = data.sourceName;
      const comObj = this.comObj;
      const streamSink = {
        enqueue(chunk, size = 1, transfers) {
          if (this.isCancelled) {
            return;
          }

          const lastDesiredSize = this.desiredSize;
          this.desiredSize -= size;

          if (lastDesiredSize > 0 && this.desiredSize <= 0) {
            this.sinkCapability = (0, _util.createPromiseCapability)();
            this.ready = this.sinkCapability.promise;
          }

          self._postMessage({
            sourceName,
            targetName,
            stream: StreamKind.ENQUEUE,
            streamId,
            chunk
          }, transfers);
        },

        close() {
          if (this.isCancelled) {
            return;
          }

          this.isCancelled = true;
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.CLOSE,
            streamId
          });
          delete self.streamSinks[streamId];
        },

        error(reason) {
          (0, _util.assert)(reason instanceof Error, "error must have a valid reason");

          if (this.isCancelled) {
            return;
          }

          this.isCancelled = true;
          comObj.postMessage({
            sourceName,
            targetName,
            stream: StreamKind.ERROR,
            streamId,
            reason: wrapReason(reason)
          });
        },

        sinkCapability: (0, _util.createPromiseCapability)(),
        onPull: null,
        onCancel: null,
        isCancelled: false,
        desiredSize: data.desiredSize,
        ready: null
      };
      streamSink.sinkCapability.resolve();
      streamSink.ready = streamSink.sinkCapability.promise;
      this.streamSinks[streamId] = streamSink;
      new Promise(function (resolve) {
        resolve(action(data.data, streamSink));
      }).then(function () {
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.START_COMPLETE,
          streamId,
          success: true
        });
      }, function (reason) {
        comObj.postMessage({
          sourceName,
          targetName,
          stream: StreamKind.START_COMPLETE,
          streamId,
          reason: wrapReason(reason)
        });
      });
    }

    _processStreamMessage(data) {
      const streamId = data.streamId;
      const sourceName = this.sourceName;
      const targetName = data.sourceName;
      const comObj = this.comObj;

      switch (data.stream) {
        case StreamKind.START_COMPLETE:
          if (data.success) {
            this.streamControllers[streamId].startCall.resolve();
          } else {
            this.streamControllers[streamId].startCall.reject(wrapReason(data.reason));
          }

          break;

        case StreamKind.PULL_COMPLETE:
          if (data.success) {
            this.streamControllers[streamId].pullCall.resolve();
          } else {
            this.streamControllers[streamId].pullCall.reject(wrapReason(data.reason));
          }

          break;

        case StreamKind.PULL:
          if (!this.streamSinks[streamId]) {
            comObj.postMessage({
              sourceName,
              targetName,
              stream: StreamKind.PULL_COMPLETE,
              streamId,
              success: true
            });
            break;
          }

          if (this.streamSinks[streamId].desiredSize <= 0 && data.desiredSize > 0) {
            this.streamSinks[streamId].sinkCapability.resolve();
          }

          this.streamSinks[streamId].desiredSize = data.desiredSize;
          const {
            onPull
          } = this.streamSinks[data.streamId];
          new Promise(function (resolve) {
            resolve(onPull && onPull());
          }).then(function () {
            comObj.postMessage({
              sourceName,
              targetName,
              stream: StreamKind.PULL_COMPLETE,
              streamId,
              success: true
            });
          }, function (reason) {
            comObj.postMessage({
              sourceName,
              targetName,
              stream: StreamKind.PULL_COMPLETE,
              streamId,
              reason: wrapReason(reason)
            });
          });
          break;

        case StreamKind.ENQUEUE:
          (0, _util.assert)(this.streamControllers[streamId], "enqueue should have stream controller");

          if (this.streamControllers[streamId].isClosed) {
            break;
          }

          this.streamControllers[streamId].controller.enqueue(data.chunk);
          break;

        case StreamKind.CLOSE:
          (0, _util.assert)(this.streamControllers[streamId], "close should have stream controller");

          if (this.streamControllers[streamId].isClosed) {
            break;
          }

          this.streamControllers[streamId].isClosed = true;
          this.streamControllers[streamId].controller.close();

          this._deleteStreamController(streamId);

          break;

        case StreamKind.ERROR:
          (0, _util.assert)(this.streamControllers[streamId], "error should have stream controller");
          this.streamControllers[streamId].controller.error(wrapReason(data.reason));

          this._deleteStreamController(streamId);

          break;

        case StreamKind.CANCEL_COMPLETE:
          if (data.success) {
            this.streamControllers[streamId].cancelCall.resolve();
          } else {
            this.streamControllers[streamId].cancelCall.reject(wrapReason(data.reason));
          }

          this._deleteStreamController(streamId);

          break;

        case StreamKind.CANCEL:
          if (!this.streamSinks[streamId]) {
            break;
          }

          const {
            onCancel
          } = this.streamSinks[data.streamId];
          new Promise(function (resolve) {
            resolve(onCancel && onCancel(wrapReason(data.reason)));
          }).then(function () {
            comObj.postMessage({
              sourceName,
              targetName,
              stream: StreamKind.CANCEL_COMPLETE,
              streamId,
              success: true
            });
          }, function (reason) {
            comObj.postMessage({
              sourceName,
              targetName,
              stream: StreamKind.CANCEL_COMPLETE,
              streamId,
              reason: wrapReason(reason)
            });
          });
          this.streamSinks[streamId].sinkCapability.reject(wrapReason(data.reason));
          this.streamSinks[streamId].isCancelled = true;
          delete this.streamSinks[streamId];
          break;

        default:
          throw new Error("Unexpected stream case");
      }
    }

    async _deleteStreamController(streamId) {
      await Promise.allSettled([this.streamControllers[streamId].startCall, this.streamControllers[streamId].pullCall, this.streamControllers[streamId].cancelCall].map(function (capability) {
        return capability && capability.promise;
      }));
      delete this.streamControllers[streamId];
    }

    _postMessage(message, transfers) {
      if (transfers && this.postMessageTransfers) {
        this.comObj.postMessage(message, transfers);
      } else {
        this.comObj.postMessage(message);
      }
    }

    destroy() {
      this.comObj.removeEventListener("message", this._onComObjOnMessage);
    }

  }

  exports.MessageHandler = MessageHandler;

  /***/ }),
  /* 14 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.Metadata = void 0;

  var _util = __w_pdfjs_require__(2);

  var _xml_parser = __w_pdfjs_require__(15);

  class Metadata {
    constructor(data) {
      (0, _util.assert)(typeof data === "string", "Metadata: input is not a string");
      data = this._repair(data);
      const parser = new _xml_parser.SimpleXMLParser({
        lowerCaseName: true
      });
      const xmlDocument = parser.parseFromString(data);
      this._metadataMap = new Map();

      if (xmlDocument) {
        this._parse(xmlDocument);
      }

      this._data = data;
    }

    _repair(data) {
      return data.replace(/^[^<]+/, "").replace(/>\\376\\377([^<]+)/g, function (all, codes) {
        const bytes = codes.replace(/\\([0-3])([0-7])([0-7])/g, function (code, d1, d2, d3) {
          return String.fromCharCode(d1 * 64 + d2 * 8 + d3 * 1);
        }).replace(/&(amp|apos|gt|lt|quot);/g, function (str, name) {
          switch (name) {
            case "amp":
              return "&";

            case "apos":
              return "'";

            case "gt":
              return ">";

            case "lt":
              return "<";

            case "quot":
              return '"';
          }

          throw new Error(`_repair: ${name} isn't defined.`);
        });
        let chars = "";

        for (let i = 0, ii = bytes.length; i < ii; i += 2) {
          const code = bytes.charCodeAt(i) * 256 + bytes.charCodeAt(i + 1);

          if (code >= 32 && code < 127 && code !== 60 && code !== 62 && code !== 38) {
            chars += String.fromCharCode(code);
          } else {
            chars += "&#x" + (0x10000 + code).toString(16).substring(1) + ";";
          }
        }

        return ">" + chars;
      });
    }

    _getSequence(entry) {
      const name = entry.nodeName;

      if (name !== "rdf:bag" && name !== "rdf:seq" && name !== "rdf:alt") {
        return null;
      }

      return entry.childNodes.filter(node => node.nodeName === "rdf:li");
    }

    _getCreators(entry) {
      if (entry.nodeName !== "dc:creator") {
        return false;
      }

      if (!entry.hasChildNodes()) {
        return true;
      }

      const seqNode = entry.childNodes[0];
      const authors = this._getSequence(seqNode) || [];

      this._metadataMap.set(entry.nodeName, authors.map(node => node.textContent.trim()));

      return true;
    }

    _parse(xmlDocument) {
      let rdf = xmlDocument.documentElement;

      if (rdf.nodeName !== "rdf:rdf") {
        rdf = rdf.firstChild;

        while (rdf && rdf.nodeName !== "rdf:rdf") {
          rdf = rdf.nextSibling;
        }
      }

      if (!rdf || rdf.nodeName !== "rdf:rdf" || !rdf.hasChildNodes()) {
        return;
      }

      for (const desc of rdf.childNodes) {
        if (desc.nodeName !== "rdf:description") {
          continue;
        }

        for (const entry of desc.childNodes) {
          const name = entry.nodeName;

          if (name === "#text") {
            continue;
          }

          if (this._getCreators(entry)) {
            continue;
          }

          this._metadataMap.set(name, entry.textContent.trim());
        }
      }
    }

    getRaw() {
      return this._data;
    }

    get(name) {
      return this._metadataMap.get(name) || null; //lwf
    }

    getAll() {
      return (0, _util.objectFromEntries)(this._metadataMap);
    }

    has(name) {
      return this._metadataMap.has(name);
    }

  }

  exports.Metadata = Metadata;

  /***/ }),
  /* 15 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.SimpleXMLParser = exports.SimpleDOMNode = void 0;

  var _util = __w_pdfjs_require__(2);

  const XMLParserErrorCode = {
    NoError: 0,
    EndOfDocument: -1,
    UnterminatedCdat: -2,
    UnterminatedXmlDeclaration: -3,
    UnterminatedDoctypeDeclaration: -4,
    UnterminatedComment: -5,
    MalformedElement: -6,
    OutOfMemory: -7,
    UnterminatedAttributeValue: -8,
    UnterminatedElement: -9,
    ElementNeverBegun: -10
  };

  function isWhitespace(s, index) {
    const ch = s[index];
    return ch === " " || ch === "\n" || ch === "\r" || ch === "\t";
  }

  function isWhitespaceString(s) {
    for (let i = 0, ii = s.length; i < ii; i++) {
      if (!isWhitespace(s, i)) {
        return false;
      }
    }

    return true;
  }

  class XMLParserBase {
    _resolveEntities(s) {
      return s.replace(/&([^;]+);/g, (all, entity) => {
        if (entity.substring(0, 2) === "#x") {
          return String.fromCodePoint(parseInt(entity.substring(2), 16));
        } else if (entity.substring(0, 1) === "#") {
          return String.fromCodePoint(parseInt(entity.substring(1), 10));
        }

        switch (entity) {
          case "lt":
            return "<";

          case "gt":
            return ">";

          case "amp":
            return "&";

          case "quot":
            return '"';
        }

        return this.onResolveEntity(entity);
      });
    }

    _parseContent(s, start) {
      const attributes = [];
      let pos = start;

      function skipWs() {
        while (pos < s.length && isWhitespace(s, pos)) {
          ++pos;
        }
      }

      while (pos < s.length && !isWhitespace(s, pos) && s[pos] !== ">" && s[pos] !== "/") {
        ++pos;
      }

      const name = s.substring(start, pos);
      skipWs();

      while (pos < s.length && s[pos] !== ">" && s[pos] !== "/" && s[pos] !== "?") {
        skipWs();
        let attrName = "",
            attrValue = "";

        while (pos < s.length && !isWhitespace(s, pos) && s[pos] !== "=") {
          attrName += s[pos];
          ++pos;
        }

        skipWs();

        if (s[pos] !== "=") {
          return null;
        }

        ++pos;
        skipWs();
        const attrEndChar = s[pos];

        if (attrEndChar !== '"' && attrEndChar !== "'") {
          return null;
        }

        const attrEndIndex = s.indexOf(attrEndChar, ++pos);

        if (attrEndIndex < 0) {
          return null;
        }

        attrValue = s.substring(pos, attrEndIndex);
        attributes.push({
          name: attrName,
          value: this._resolveEntities(attrValue)
        });
        pos = attrEndIndex + 1;
        skipWs();
      }

      return {
        name,
        attributes,
        parsed: pos - start
      };
    }

    _parseProcessingInstruction(s, start) {
      let pos = start;

      function skipWs() {
        while (pos < s.length && isWhitespace(s, pos)) {
          ++pos;
        }
      }

      while (pos < s.length && !isWhitespace(s, pos) && s[pos] !== ">" && s[pos] !== "/") {
        ++pos;
      }

      const name = s.substring(start, pos);
      skipWs();
      const attrStart = pos;

      while (pos < s.length && (s[pos] !== "?" || s[pos + 1] !== ">")) {
        ++pos;
      }

      const value = s.substring(attrStart, pos);
      return {
        name,
        value,
        parsed: pos - start
      };
    }

    parseXml(s) {
      let i = 0;

      while (i < s.length) {
        const ch = s[i];
        let j = i;

        if (ch === "<") {
          ++j;
          const ch2 = s[j];
          let q;

          switch (ch2) {
            case "/":
              ++j;
              q = s.indexOf(">", j);

              if (q < 0) {
                this.onError(XMLParserErrorCode.UnterminatedElement);
                return;
              }

              this.onEndElement(s.substring(j, q));
              j = q + 1;
              break;

            case "?":
              ++j;

              const pi = this._parseProcessingInstruction(s, j);

              if (s.substring(j + pi.parsed, j + pi.parsed + 2) !== "?>") {
                this.onError(XMLParserErrorCode.UnterminatedXmlDeclaration);
                return;
              }

              this.onPi(pi.name, pi.value);
              j += pi.parsed + 2;
              break;

            case "!":
              if (s.substring(j + 1, j + 3) === "--") {
                q = s.indexOf("-->", j + 3);

                if (q < 0) {
                  this.onError(XMLParserErrorCode.UnterminatedComment);
                  return;
                }

                this.onComment(s.substring(j + 3, q));
                j = q + 3;
              } else if (s.substring(j + 1, j + 8) === "[CDATA[") {
                q = s.indexOf("]]>", j + 8);

                if (q < 0) {
                  this.onError(XMLParserErrorCode.UnterminatedCdat);
                  return;
                }

                this.onCdata(s.substring(j + 8, q));
                j = q + 3;
              } else if (s.substring(j + 1, j + 8) === "DOCTYPE") {
                const q2 = s.indexOf("[", j + 8);
                let complexDoctype = false;
                q = s.indexOf(">", j + 8);

                if (q < 0) {
                  this.onError(XMLParserErrorCode.UnterminatedDoctypeDeclaration);
                  return;
                }

                if (q2 > 0 && q > q2) {
                  q = s.indexOf("]>", j + 8);

                  if (q < 0) {
                    this.onError(XMLParserErrorCode.UnterminatedDoctypeDeclaration);
                    return;
                  }

                  complexDoctype = true;
                }

                const doctypeContent = s.substring(j + 8, q + (complexDoctype ? 1 : 0));
                this.onDoctype(doctypeContent);
                j = q + (complexDoctype ? 2 : 1);
              } else {
                this.onError(XMLParserErrorCode.MalformedElement);
                return;
              }

              break;

            default:
              const content = this._parseContent(s, j);

              if (content === null) {
                this.onError(XMLParserErrorCode.MalformedElement);
                return;
              }

              let isClosed = false;

              if (s.substring(j + content.parsed, j + content.parsed + 2) === "/>") {
                isClosed = true;
              } else if (s.substring(j + content.parsed, j + content.parsed + 1) !== ">") {
                this.onError(XMLParserErrorCode.UnterminatedElement);
                return;
              }

              this.onBeginElement(content.name, content.attributes, isClosed);
              j += content.parsed + (isClosed ? 2 : 1);
              break;
          }
        } else {
          while (j < s.length && s[j] !== "<") {
            j++;
          }

          const text = s.substring(i, j);
          this.onText(this._resolveEntities(text));
        }

        i = j;
      }
    }

    onResolveEntity(name) {
      return `&${name};`;
    }

    onPi(name, value) {}

    onComment(text) {}

    onCdata(text) {}

    onDoctype(doctypeContent) {}

    onText(text) {}

    onBeginElement(name, attributes, isEmpty) {}

    onEndElement(name) {}

    onError(code) {}

  }

  class SimpleDOMNode {
    constructor(nodeName, nodeValue) {
      this.nodeName = nodeName;
      this.nodeValue = nodeValue;
      Object.defineProperty(this, "parentNode", {
        value: null,
        writable: true
      });
    }

    get firstChild() {
      return this.childNodes && this.childNodes[0];
    }

    get nextSibling() {
      const childNodes = this.parentNode.childNodes;

      if (!childNodes) {
        return undefined;
      }

      const index = childNodes.indexOf(this);

      if (index === -1) {
        return undefined;
      }

      return childNodes[index + 1];
    }

    get textContent() {
      if (!this.childNodes) {
        return this.nodeValue || "";
      }

      return this.childNodes.map(function (child) {
        return child.textContent;
      }).join("");
    }

    hasChildNodes() {
      return this.childNodes && this.childNodes.length > 0;
    }

    searchNode(paths, pos) {
      if (pos >= paths.length) {
        return this;
      }

      const component = paths[pos];
      const stack = [];
      let node = this;

      while (true) {
        if (component.name === node.nodeName) {
          if (component.pos === 0) {
            const res = node.searchNode(paths, pos + 1);

            if (res !== null) {
              return res;
            }
          } else if (stack.length === 0) {
            return null;
          } else {
            const [parent] = stack.pop();
            let siblingPos = 0;

            for (const child of parent.childNodes) {
              if (component.name === child.nodeName) {
                if (siblingPos === component.pos) {
                  return child.searchNode(paths, pos + 1);
                }

                siblingPos++;
              }
            }

            return node.searchNode(paths, pos + 1);
          }
        }

        if (node.childNodes && node.childNodes.length !== 0) {
          stack.push([node, 0]);
          node = node.childNodes[0];
        } else if (stack.length === 0) {
          return null;
        } else {
          while (stack.length !== 0) {
            const [parent, currentPos] = stack.pop();
            const newPos = currentPos + 1;

            if (newPos < parent.childNodes.length) {
              stack.push([parent, newPos]);
              node = parent.childNodes[newPos];
              break;
            }
          }

          if (stack.length === 0) {
            return null;
          }
        }
      }
    }

    dump(buffer) {
      if (this.nodeName === "#text") {
        buffer.push((0, _util.encodeToXmlString)(this.nodeValue));
        return;
      }

      buffer.push(`<${this.nodeName}`);

      if (this.attributes) {
        for (const attribute of this.attributes) {
          buffer.push(` ${attribute.name}="${(0, _util.encodeToXmlString)(attribute.value)}"`);
        }
      }

      if (this.hasChildNodes()) {
        buffer.push(">");

        for (const child of this.childNodes) {
          child.dump(buffer);
        }

        buffer.push(`</${this.nodeName}>`);
      } else if (this.nodeValue) {
        buffer.push(`>${(0, _util.encodeToXmlString)(this.nodeValue)}</${this.nodeName}>`);
      } else {
        buffer.push("/>");
      }
    }

  }

  exports.SimpleDOMNode = SimpleDOMNode;

  class SimpleXMLParser extends XMLParserBase {
    constructor({
      hasAttributes = false,
      lowerCaseName = false
    }) {
      super();
      this._currentFragment = null;
      this._stack = null;
      this._errorCode = XMLParserErrorCode.NoError;
      this._hasAttributes = hasAttributes;
      this._lowerCaseName = lowerCaseName;
    }

    parseFromString(data) {
      this._currentFragment = [];
      this._stack = [];
      this._errorCode = XMLParserErrorCode.NoError;
      this.parseXml(data);

      if (this._errorCode !== XMLParserErrorCode.NoError) {
        return undefined;
      }

      const [documentElement] = this._currentFragment;

      if (!documentElement) {
        return undefined;
      }

      return {
        documentElement
      };
    }

    onResolveEntity(name) {
      switch (name) {
        case "apos":
          return "'";
      }

      return super.onResolveEntity(name);
    }

    onText(text) {
      if (isWhitespaceString(text)) {
        return;
      }

      const node = new SimpleDOMNode("#text", text);

      this._currentFragment.push(node);
    }

    onCdata(text) {
      const node = new SimpleDOMNode("#text", text);

      this._currentFragment.push(node);
    }

    onBeginElement(name, attributes, isEmpty) {
      if (this._lowerCaseName) {
        name = name.toLowerCase();
      }

      const node = new SimpleDOMNode(name);
      node.childNodes = [];

      if (this._hasAttributes) {
        node.attributes = attributes;
      }

      this._currentFragment.push(node);

      if (isEmpty) {
        return;
      }

      this._stack.push(this._currentFragment);

      this._currentFragment = node.childNodes;
    }

    onEndElement(name) {
      this._currentFragment = this._stack.pop() || [];
      const lastElement = this._currentFragment[this._currentFragment.length - 1];

      if (!lastElement) {
        return;
      }

      for (let i = 0, ii = lastElement.childNodes.length; i < ii; i++) {
        lastElement.childNodes[i].parentNode = lastElement;
      }
    }

    onError(code) {
      this._errorCode = code;
    }

  }

  exports.SimpleXMLParser = SimpleXMLParser;

  /***/ }),
  /* 16 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.OptionalContentConfig = void 0;

  var _util = __w_pdfjs_require__(2);

  class OptionalContentGroup {
    constructor(name, intent) {
      this.visible = true;
      this.name = name;
      this.intent = intent;
    }

  }

  class OptionalContentConfig {
    constructor(data) {
      this.name = null;
      this.creator = null;
      this._order = null;
      this._groups = new Map();

      if (data === null) {
        return;
      }

      this.name = data.name;
      this.creator = data.creator;
      this._order = data.order;

      for (const group of data.groups) {
        this._groups.set(group.id, new OptionalContentGroup(group.name, group.intent));
      }

      if (data.baseState === "OFF") {
        for (const group of this._groups) {
          group.visible = false;
        }
      }

      for (const on of data.on) {
        this._groups.get(on).visible = true;
      }

      for (const off of data.off) {
        this._groups.get(off).visible = false;
      }
    }

    isVisible(group) {
      if (group.type === "OCG") {
        if (!this._groups.has(group.id)) {
          (0, _util.warn)(`Optional content group not found: ${group.id}`);
          return true;
        }

        return this._groups.get(group.id).visible;
      } else if (group.type === "OCMD") {
        if (group.expression) {
          (0, _util.warn)("Visibility expression not supported yet.");
        }

        if (!group.policy || group.policy === "AnyOn") {
          for (const id of group.ids) {
            if (!this._groups.has(id)) {
              (0, _util.warn)(`Optional content group not found: ${id}`);
              return true;
            }

            if (this._groups.get(id).visible) {
              return true;
            }
          }

          return false;
        } else if (group.policy === "AllOn") {
          for (const id of group.ids) {
            if (!this._groups.has(id)) {
              (0, _util.warn)(`Optional content group not found: ${id}`);
              return true;
            }

            if (!this._groups.get(id).visible) {
              return false;
            }
          }

          return true;
        } else if (group.policy === "AnyOff") {
          for (const id of group.ids) {
            if (!this._groups.has(id)) {
              (0, _util.warn)(`Optional content group not found: ${id}`);
              return true;
            }

            if (!this._groups.get(id).visible) {
              return true;
            }
          }

          return false;
        } else if (group.policy === "AllOff") {
          for (const id of group.ids) {
            if (!this._groups.has(id)) {
              (0, _util.warn)(`Optional content group not found: ${id}`);
              return true;
            }

            if (this._groups.get(id).visible) {
              return false;
            }
          }

          return true;
        }

        (0, _util.warn)(`Unknown optional content policy ${group.policy}.`);
        return true;
      }

      (0, _util.warn)(`Unknown group type ${group.type}.`);
      return true;
    }

    setVisibility(id, visible = true) {
      if (!this._groups.has(id)) {
        (0, _util.warn)(`Optional content group not found: ${id}`);
        return;
      }

      this._groups.get(id).visible = !!visible;
    }

    getOrder() {
      if (!this._groups.size) {
        return null;
      }

      if (this._order) {
        return this._order.slice();
      }

      return Array.from(this._groups.keys());
    }

    getGroups() {
      if (!this._groups.size) {
        return null;
      }

      return (0, _util.objectFromEntries)(this._groups);
    }

    getGroup(id) {
      return this._groups.get(id) || null;
    }

  }

  exports.OptionalContentConfig = OptionalContentConfig;

  /***/ }),
  /* 17 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.PDFDataTransportStream = void 0;

  var _util = __w_pdfjs_require__(2);

  class PDFDataTransportStream {
    constructor(params, pdfDataRangeTransport) {
      (0, _util.assert)(pdfDataRangeTransport, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
      this._queuedChunks = [];
      this._progressiveDone = params.progressiveDone || false;
      const initialData = params.initialData;

      if (initialData && initialData.length > 0) { // lwf
        const buffer = new Uint8Array(initialData).buffer;

        this._queuedChunks.push(buffer);
      }

      this._pdfDataRangeTransport = pdfDataRangeTransport;
      this._isStreamingSupported = !params.disableStream;
      this._isRangeSupported = !params.disableRange;
      this._contentLength = params.length;
      this._fullRequestReader = null;
      this._rangeReaders = [];

      this._pdfDataRangeTransport.addRangeListener((begin, chunk) => {
        this._onReceiveData({
          begin,
          chunk
        });
      });

      this._pdfDataRangeTransport.addProgressListener((loaded, total) => {
        this._onProgress({
          loaded,
          total
        });
      });

      this._pdfDataRangeTransport.addProgressiveReadListener(chunk => {
        this._onReceiveData({
          chunk
        });
      });

      this._pdfDataRangeTransport.addProgressiveDoneListener(() => {
        this._onProgressiveDone();
      });

      this._pdfDataRangeTransport.transportReady();
    }

    _onReceiveData(args) {
      const buffer = new Uint8Array(args.chunk).buffer;

      if (args.begin === undefined) {
        if (this._fullRequestReader) {
          this._fullRequestReader._enqueue(buffer);
        } else {
          this._queuedChunks.push(buffer);
        }
      } else {
        const found = this._rangeReaders.some(function (rangeReader) {
          if (rangeReader._begin !== args.begin) {
            return false;
          }

          rangeReader._enqueue(buffer);

          return true;
        });

        (0, _util.assert)(found, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
      }
    }

    get _progressiveDataLength() {
      return this._fullRequestReader && this._fullRequestReader._loaded || 0; // lwf
    }

    _onProgress(evt) {
      if (evt.total === undefined) {
        const firstReader = this._rangeReaders[0];

        if (firstReader && firstReader.onProgress) { // lwf
          firstReader.onProgress({
            loaded: evt.loaded
          });
        }
      } else {
        const fullReader = this._fullRequestReader;

        if (fullReader && fullReader.onProgress) { // lwf
          fullReader.onProgress({
            loaded: evt.loaded,
            total: evt.total
          });
        }
      }
    }

    _onProgressiveDone() {
      if (this._fullRequestReader) {
        this._fullRequestReader.progressiveDone();
      }

      this._progressiveDone = true;
    }

    _removeRangeReader(reader) {
      const i = this._rangeReaders.indexOf(reader);

      if (i >= 0) {
        this._rangeReaders.splice(i, 1);
      }
    }

    getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
      const queuedChunks = this._queuedChunks;
      this._queuedChunks = null;
      return new PDFDataTransportStreamReader(this, queuedChunks, this._progressiveDone);
    }

    getRangeReader(begin, end) {
      if (end <= this._progressiveDataLength) {
        return null;
      }

      const reader = new PDFDataTransportStreamRangeReader(this, begin, end);

      this._pdfDataRangeTransport.requestDataRange(begin, end);

      this._rangeReaders.push(reader);

      return reader;
    }

    cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      const readers = this._rangeReaders.slice(0);

      readers.forEach(function (rangeReader) {
        rangeReader.cancel(reason);
      });

      this._pdfDataRangeTransport.abort();
    }

  }

  exports.PDFDataTransportStream = PDFDataTransportStream;

  class PDFDataTransportStreamReader {
    constructor(stream, queuedChunks, progressiveDone = false) {
      this._stream = stream;
      this._done = progressiveDone || false;
      this._filename = null;
      this._queuedChunks = queuedChunks || [];
      this._loaded = 0;

      for (const chunk of this._queuedChunks) {
        this._loaded += chunk.byteLength;
      }

      this._requests = [];
      this._headersReady = Promise.resolve();
      stream._fullRequestReader = this;
      this.onProgress = null;
    }

    _enqueue(chunk) {
      if (this._done) {
        return;
      }

      if (this._requests.length > 0) {
        const requestCapability = this._requests.shift();

        requestCapability.resolve({
          value: chunk,
          done: false
        });
      } else {
        this._queuedChunks.push(chunk);
      }

      this._loaded += chunk.byteLength;
    }

    get headersReady() {
      return this._headersReady;
    }

    get filename() {
      return this._filename;
    }

    get isRangeSupported() {
      return this._stream._isRangeSupported;
    }

    get isStreamingSupported() {
      return this._stream._isStreamingSupported;
    }

    get contentLength() {
      return this._stream._contentLength;
    }

    async read() {
      if (this._queuedChunks.length > 0) {
        const chunk = this._queuedChunks.shift();

        return {
          value: chunk,
          done: false
        };
      }

      if (this._done) {
        return {
          value: undefined,
          done: true
        };
      }

      const requestCapability = (0, _util.createPromiseCapability)();

      this._requests.push(requestCapability);

      return requestCapability.promise;
    }

    cancel(reason) {
      this._done = true;

      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });

      this._requests = [];
    }

    progressiveDone() {
      if (this._done) {
        return;
      }

      this._done = true;
    }

  }

  class PDFDataTransportStreamRangeReader {
    constructor(stream, begin, end) {
      this._stream = stream;
      this._begin = begin;
      this._end = end;
      this._queuedChunk = null;
      this._requests = [];
      this._done = false;
      this.onProgress = null;
    }

    _enqueue(chunk) {
      if (this._done) {
        return;
      }

      if (this._requests.length === 0) {
        this._queuedChunk = chunk;
      } else {
        const requestsCapability = this._requests.shift();

        requestsCapability.resolve({
          value: chunk,
          done: false
        });

        this._requests.forEach(function (requestCapability) {
          requestCapability.resolve({
            value: undefined,
            done: true
          });
        });

        this._requests = [];
      }

      this._done = true;

      this._stream._removeRangeReader(this);
    }

    get isStreamingSupported() {
      return false;
    }

    async read() {
      if (this._queuedChunk) {
        const chunk = this._queuedChunk;
        this._queuedChunk = null;
        return {
          value: chunk,
          done: false
        };
      }

      if (this._done) {
        return {
          value: undefined,
          done: true
        };
      }

      const requestCapability = (0, _util.createPromiseCapability)();

      this._requests.push(requestCapability);

      return requestCapability.promise;
    }

    cancel(reason) {
      this._done = true;

      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });

      this._requests = [];

      this._stream._removeRangeReader(this);
    }

  }

  /***/ }),
  /* 18 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.WebGLContext = void 0;

  var _util = __w_pdfjs_require__(2);

  class WebGLContext {
    constructor({
      enable = false
    }) {
      this._enabled = enable === true;
    }

    get isEnabled() {
      let enabled = this._enabled;

      if (enabled) {
        enabled = WebGLUtils.tryInitGL();
      }

      return (0, _util.shadow)(this, "isEnabled", enabled);
    }

    composeSMask({
      layer,
      mask,
      properties
    }) {
      return WebGLUtils.composeSMask(layer, mask, properties);
    }

    drawFigures({
      width,
      height,
      backgroundColor,
      figures,
      context
    }) {
      return WebGLUtils.drawFigures(width, height, backgroundColor, figures, context);
    }

    clear() {
      WebGLUtils.cleanup();
    }

  }

  exports.WebGLContext = WebGLContext;

  const WebGLUtils = function WebGLUtilsClosure() {
    function loadShader(gl, code, shaderType) {
      const shader = gl.createShader(shaderType);
      gl.shaderSource(shader, code);
      gl.compileShader(shader);
      const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

      if (!compiled) {
        const errorMsg = gl.getShaderInfoLog(shader);
        throw new Error("Error during shader compilation: " + errorMsg);
      }

      return shader;
    }

    function createVertexShader(gl, code) {
      return loadShader(gl, code, gl.VERTEX_SHADER);
    }

    function createFragmentShader(gl, code) {
      return loadShader(gl, code, gl.FRAGMENT_SHADER);
    }

    function createProgram(gl, shaders) {
      const program = gl.createProgram();

      for (let i = 0, ii = shaders.length; i < ii; ++i) {
        gl.attachShader(program, shaders[i]);
      }

      gl.linkProgram(program);
      const linked = gl.getProgramParameter(program, gl.LINK_STATUS);

      if (!linked) {
        const errorMsg = gl.getProgramInfoLog(program);
        throw new Error("Error during program linking: " + errorMsg);
      }

      return program;
    }

    function createTexture(gl, image, textureId) {
      gl.activeTexture(textureId);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      return texture;
    }

    let currentGL, currentCanvas;

    function generateGL() {
      if (currentGL) {
        return;
      }

      currentCanvas = document.createElement("canvas");
      currentGL = currentCanvas.getContext("webgl", {
        premultipliedalpha: false
      });
    }

    const smaskVertexShaderCode = "\
    attribute vec2 a_position;                                    \
    attribute vec2 a_texCoord;                                    \
                                                                  \
    uniform vec2 u_resolution;                                    \
                                                                  \
    varying vec2 v_texCoord;                                      \
                                                                  \
    void main() {                                                 \
      vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;   \
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);          \
                                                                  \
      v_texCoord = a_texCoord;                                    \
    }                                                             ";
    const smaskFragmentShaderCode = "\
    precision mediump float;                                      \
                                                                  \
    uniform vec4 u_backdrop;                                      \
    uniform int u_subtype;                                        \
    uniform sampler2D u_image;                                    \
    uniform sampler2D u_mask;                                     \
                                                                  \
    varying vec2 v_texCoord;                                      \
                                                                  \
    void main() {                                                 \
      vec4 imageColor = texture2D(u_image, v_texCoord);           \
      vec4 maskColor = texture2D(u_mask, v_texCoord);             \
      if (u_backdrop.a > 0.0) {                                   \
        maskColor.rgb = maskColor.rgb * maskColor.a +             \
                        u_backdrop.rgb * (1.0 - maskColor.a);     \
      }                                                           \
      float lum;                                                  \
      if (u_subtype == 0) {                                       \
        lum = maskColor.a;                                        \
      } else {                                                    \
        lum = maskColor.r * 0.3 + maskColor.g * 0.59 +            \
              maskColor.b * 0.11;                                 \
      }                                                           \
      imageColor.a *= lum;                                        \
      imageColor.rgb *= imageColor.a;                             \
      gl_FragColor = imageColor;                                  \
    }                                                             ";
    let smaskCache = null;

    function initSmaskGL() {
      generateGL();
      const canvas = currentCanvas;
      currentCanvas = null;
      const gl = currentGL;
      currentGL = null;
      const vertexShader = createVertexShader(gl, smaskVertexShaderCode);
      const fragmentShader = createFragmentShader(gl, smaskFragmentShaderCode);
      const program = createProgram(gl, [vertexShader, fragmentShader]);
      gl.useProgram(program);
      const cache = {};
      cache.gl = gl;
      cache.canvas = canvas;
      cache.resolutionLocation = gl.getUniformLocation(program, "u_resolution");
      cache.positionLocation = gl.getAttribLocation(program, "a_position");
      cache.backdropLocation = gl.getUniformLocation(program, "u_backdrop");
      cache.subtypeLocation = gl.getUniformLocation(program, "u_subtype");
      const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
      const texLayerLocation = gl.getUniformLocation(program, "u_image");
      const texMaskLocation = gl.getUniformLocation(program, "u_mask");
      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1i(texLayerLocation, 0);
      gl.uniform1i(texMaskLocation, 1);
      smaskCache = cache;
    }

    function composeSMask(layer, mask, properties) {
      const width = layer.width,
            height = layer.height;

      if (!smaskCache) {
        initSmaskGL();
      }

      const cache = smaskCache,
            canvas = cache.canvas,
            gl = cache.gl;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.uniform2f(cache.resolutionLocation, width, height);

      if (properties.backdrop) {
        gl.uniform4f(cache.resolutionLocation, properties.backdrop[0], properties.backdrop[1], properties.backdrop[2], 1);
      } else {
        gl.uniform4f(cache.resolutionLocation, 0, 0, 0, 0);
      }

      gl.uniform1i(cache.subtypeLocation, properties.subtype === "Luminosity" ? 1 : 0);
      const texture = createTexture(gl, layer, gl.TEXTURE0);
      const maskTexture = createTexture(gl, mask, gl.TEXTURE1);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, width, 0, 0, height, 0, height, width, 0, width, height]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(cache.positionLocation);
      gl.vertexAttribPointer(cache.positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.flush();
      gl.deleteTexture(texture);
      gl.deleteTexture(maskTexture);
      gl.deleteBuffer(buffer);
      return canvas;
    }

    const figuresVertexShaderCode = "\
    attribute vec2 a_position;                                    \
    attribute vec3 a_color;                                       \
                                                                  \
    uniform vec2 u_resolution;                                    \
    uniform vec2 u_scale;                                         \
    uniform vec2 u_offset;                                        \
                                                                  \
    varying vec4 v_color;                                         \
                                                                  \
    void main() {                                                 \
      vec2 position = (a_position + u_offset) * u_scale;          \
      vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;     \
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);          \
                                                                  \
      v_color = vec4(a_color / 255.0, 1.0);                       \
    }                                                             ";
    const figuresFragmentShaderCode = "\
    precision mediump float;                                      \
                                                                  \
    varying vec4 v_color;                                         \
                                                                  \
    void main() {                                                 \
      gl_FragColor = v_color;                                     \
    }                                                             ";
    let figuresCache = null;

    function initFiguresGL() {
      generateGL();
      const canvas = currentCanvas;
      currentCanvas = null;
      const gl = currentGL;
      currentGL = null;
      const vertexShader = createVertexShader(gl, figuresVertexShaderCode);
      const fragmentShader = createFragmentShader(gl, figuresFragmentShaderCode);
      const program = createProgram(gl, [vertexShader, fragmentShader]);
      gl.useProgram(program);
      const cache = {};
      cache.gl = gl;
      cache.canvas = canvas;
      cache.resolutionLocation = gl.getUniformLocation(program, "u_resolution");
      cache.scaleLocation = gl.getUniformLocation(program, "u_scale");
      cache.offsetLocation = gl.getUniformLocation(program, "u_offset");
      cache.positionLocation = gl.getAttribLocation(program, "a_position");
      cache.colorLocation = gl.getAttribLocation(program, "a_color");
      figuresCache = cache;
    }

    function drawFigures(width, height, backgroundColor, figures, context) {
      if (!figuresCache) {
        initFiguresGL();
      }

      const cache = figuresCache,
            canvas = cache.canvas,
            gl = cache.gl;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.uniform2f(cache.resolutionLocation, width, height);
      let count = 0;

      for (let i = 0, ii = figures.length; i < ii; i++) {
        switch (figures[i].type) {
          case "lattice":
            const rows = figures[i].coords.length / figures[i].verticesPerRow | 0;
            count += (rows - 1) * (figures[i].verticesPerRow - 1) * 6;
            break;

          case "triangles":
            count += figures[i].coords.length;
            break;
        }
      }

      const coords = new Float32Array(count * 2);
      const colors = new Uint8Array(count * 3);
      const coordsMap = context.coords,
            colorsMap = context.colors;
      let pIndex = 0,
          cIndex = 0;

      for (let i = 0, ii = figures.length; i < ii; i++) {
        const figure = figures[i],
              ps = figure.coords,
              cs = figure.colors;

        switch (figure.type) {
          case "lattice":
            const cols = figure.verticesPerRow;
            const rows = ps.length / cols | 0;

            for (let row = 1; row < rows; row++) {
              let offset = row * cols + 1;

              for (let col = 1; col < cols; col++, offset++) {
                coords[pIndex] = coordsMap[ps[offset - cols - 1]];
                coords[pIndex + 1] = coordsMap[ps[offset - cols - 1] + 1];
                coords[pIndex + 2] = coordsMap[ps[offset - cols]];
                coords[pIndex + 3] = coordsMap[ps[offset - cols] + 1];
                coords[pIndex + 4] = coordsMap[ps[offset - 1]];
                coords[pIndex + 5] = coordsMap[ps[offset - 1] + 1];
                colors[cIndex] = colorsMap[cs[offset - cols - 1]];
                colors[cIndex + 1] = colorsMap[cs[offset - cols - 1] + 1];
                colors[cIndex + 2] = colorsMap[cs[offset - cols - 1] + 2];
                colors[cIndex + 3] = colorsMap[cs[offset - cols]];
                colors[cIndex + 4] = colorsMap[cs[offset - cols] + 1];
                colors[cIndex + 5] = colorsMap[cs[offset - cols] + 2];
                colors[cIndex + 6] = colorsMap[cs[offset - 1]];
                colors[cIndex + 7] = colorsMap[cs[offset - 1] + 1];
                colors[cIndex + 8] = colorsMap[cs[offset - 1] + 2];
                coords[pIndex + 6] = coords[pIndex + 2];
                coords[pIndex + 7] = coords[pIndex + 3];
                coords[pIndex + 8] = coords[pIndex + 4];
                coords[pIndex + 9] = coords[pIndex + 5];
                coords[pIndex + 10] = coordsMap[ps[offset]];
                coords[pIndex + 11] = coordsMap[ps[offset] + 1];
                colors[cIndex + 9] = colors[cIndex + 3];
                colors[cIndex + 10] = colors[cIndex + 4];
                colors[cIndex + 11] = colors[cIndex + 5];
                colors[cIndex + 12] = colors[cIndex + 6];
                colors[cIndex + 13] = colors[cIndex + 7];
                colors[cIndex + 14] = colors[cIndex + 8];
                colors[cIndex + 15] = colorsMap[cs[offset]];
                colors[cIndex + 16] = colorsMap[cs[offset] + 1];
                colors[cIndex + 17] = colorsMap[cs[offset] + 2];
                pIndex += 12;
                cIndex += 18;
              }
            }

            break;

          case "triangles":
            for (let j = 0, jj = ps.length; j < jj; j++) {
              coords[pIndex] = coordsMap[ps[j]];
              coords[pIndex + 1] = coordsMap[ps[j] + 1];
              colors[cIndex] = colorsMap[cs[j]];
              colors[cIndex + 1] = colorsMap[cs[j] + 1];
              colors[cIndex + 2] = colorsMap[cs[j] + 2];
              pIndex += 2;
              cIndex += 3;
            }

            break;
        }
      }

      if (backgroundColor) {
        gl.clearColor(backgroundColor[0] / 255, backgroundColor[1] / 255, backgroundColor[2] / 255, 1.0);
      } else {
        gl.clearColor(0, 0, 0, 0);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      const coordsBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, coordsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(cache.positionLocation);
      gl.vertexAttribPointer(cache.positionLocation, 2, gl.FLOAT, false, 0, 0);
      const colorsBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(cache.colorLocation);
      gl.vertexAttribPointer(cache.colorLocation, 3, gl.UNSIGNED_BYTE, false, 0, 0);
      gl.uniform2f(cache.scaleLocation, context.scaleX, context.scaleY);
      gl.uniform2f(cache.offsetLocation, context.offsetX, context.offsetY);
      gl.drawArrays(gl.TRIANGLES, 0, count);
      gl.flush();
      gl.deleteBuffer(coordsBuffer);
      gl.deleteBuffer(colorsBuffer);
      return canvas;
    }

    return {
      tryInitGL() {
        try {
          generateGL();
          return !!currentGL;
        } catch (ex) {}

        return false;
      },

      composeSMask,
      drawFigures,

      cleanup() {
        if (smaskCache && smaskCache.canvas) { // lwf
          smaskCache.canvas.width = 0;
          smaskCache.canvas.height = 0;
        }

        if (figuresCache && figuresCache.canvas) { // lwf
          figuresCache.canvas.width = 0;
          figuresCache.canvas.height = 0;
        }

        smaskCache = null;
        figuresCache = null;
      }

    };
  }();

  /***/ }),
  /* 19 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.AnnotationLayer = void 0;

  var _display_utils = __w_pdfjs_require__(1);

  var _util = __w_pdfjs_require__(2);

  var _annotation_storage = __w_pdfjs_require__(8);

  var _scripting_utils = __w_pdfjs_require__(20);

  class AnnotationElementFactory {
    static create(parameters) {
      const subtype = parameters.data.annotationType;

      switch (subtype) {
        case _util.AnnotationType.LINK:
          return new LinkAnnotationElement(parameters);

        case _util.AnnotationType.TEXT:
          return new TextAnnotationElement(parameters);

        case _util.AnnotationType.WIDGET:
          const fieldType = parameters.data.fieldType;

          switch (fieldType) {
            case "Tx":
              return new TextWidgetAnnotationElement(parameters);

            case "Btn":
              if (parameters.data.radioButton) {
                return new RadioButtonWidgetAnnotationElement(parameters);
              } else if (parameters.data.checkBox) {
                return new CheckboxWidgetAnnotationElement(parameters);
              }

              return new PushButtonWidgetAnnotationElement(parameters);

            case "Ch":
              return new ChoiceWidgetAnnotationElement(parameters);
          }

          return new WidgetAnnotationElement(parameters);

        case _util.AnnotationType.POPUP:
          return new PopupAnnotationElement(parameters);

        case _util.AnnotationType.FREETEXT:
          return new FreeTextAnnotationElement(parameters);

        case _util.AnnotationType.LINE:
          return new LineAnnotationElement(parameters);

        case _util.AnnotationType.SQUARE:
          return new SquareAnnotationElement(parameters);

        case _util.AnnotationType.CIRCLE:
          return new CircleAnnotationElement(parameters);

        case _util.AnnotationType.POLYLINE:
          return new PolylineAnnotationElement(parameters);

        case _util.AnnotationType.CARET:
          return new CaretAnnotationElement(parameters);

        case _util.AnnotationType.INK:
          return new InkAnnotationElement(parameters);

        case _util.AnnotationType.POLYGON:
          return new PolygonAnnotationElement(parameters);

        case _util.AnnotationType.HIGHLIGHT:
          return new HighlightAnnotationElement(parameters);

        case _util.AnnotationType.UNDERLINE:
          return new UnderlineAnnotationElement(parameters);

        case _util.AnnotationType.SQUIGGLY:
          return new SquigglyAnnotationElement(parameters);

        case _util.AnnotationType.STRIKEOUT:
          return new StrikeOutAnnotationElement(parameters);

        case _util.AnnotationType.STAMP:
          return new StampAnnotationElement(parameters);

        case _util.AnnotationType.FILEATTACHMENT:
          return new FileAttachmentAnnotationElement(parameters);

        default:
          return new AnnotationElement(parameters);
      }
    }

  }

  class AnnotationElement {
    constructor(parameters, {
      isRenderable = false,
      ignoreBorder = false,
      createQuadrilaterals = false
    } = {}) {
      this.isRenderable = isRenderable;
      this.data = parameters.data;
      this.layer = parameters.layer;
      this.page = parameters.page;
      this.viewport = parameters.viewport;
      this.linkService = parameters.linkService;
      this.downloadManager = parameters.downloadManager;
      this.imageResourcesPath = parameters.imageResourcesPath;
      this.renderInteractiveForms = parameters.renderInteractiveForms;
      this.svgFactory = parameters.svgFactory;
      this.annotationStorage = parameters.annotationStorage;
      this.enableScripting = parameters.enableScripting;
      this.hasJSActions = parameters.hasJSActions;
      this._mouseState = parameters.mouseState;

      if (isRenderable) {
        this.container = this._createContainer(ignoreBorder);
      }

      if (createQuadrilaterals) {
        this.quadrilaterals = this._createQuadrilaterals(ignoreBorder);
      }
    }

    _createContainer(ignoreBorder = false) {
      const data = this.data,
            page = this.page,
            viewport = this.viewport;
      const container = document.createElement("section");
      let width = data.rect[2] - data.rect[0];
      let height = data.rect[3] - data.rect[1];
      container.setAttribute("data-annotation-id", data.id);

      const rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

      container.style.transform = `matrix(${viewport.transform.join(",")})`;
      container.style.transformOrigin = `${-rect[0]}px ${-rect[1]}px`;

      if (!ignoreBorder && data.borderStyle.width > 0) {
        container.style.borderWidth = `${data.borderStyle.width}px`;

        if (data.borderStyle.style !== _util.AnnotationBorderStyleType.UNDERLINE) {
          width = width - 2 * data.borderStyle.width;
          height = height - 2 * data.borderStyle.width;
        }

        const horizontalRadius = data.borderStyle.horizontalCornerRadius;
        const verticalRadius = data.borderStyle.verticalCornerRadius;

        if (horizontalRadius > 0 || verticalRadius > 0) {
          const radius = `${horizontalRadius}px / ${verticalRadius}px`;
          container.style.borderRadius = radius;
        }

        switch (data.borderStyle.style) {
          case _util.AnnotationBorderStyleType.SOLID:
            container.style.borderStyle = "solid";
            break;

          case _util.AnnotationBorderStyleType.DASHED:
            container.style.borderStyle = "dashed";
            break;

          case _util.AnnotationBorderStyleType.BEVELED:
            (0, _util.warn)("Unimplemented border style: beveled");
            break;

          case _util.AnnotationBorderStyleType.INSET:
            (0, _util.warn)("Unimplemented border style: inset");
            break;

          case _util.AnnotationBorderStyleType.UNDERLINE:
            container.style.borderBottomStyle = "solid";
            break;

          default:
            break;
        }

        if (data.color) {
          container.style.borderColor = _util.Util.makeHexColor(data.color[0] | 0, data.color[1] | 0, data.color[2] | 0);
        } else {
          container.style.borderWidth = 0;
        }
      }

      container.style.left = `${rect[0]}px`;
      container.style.top = `${rect[1]}px`;
      container.style.width = `${width}px`;
      container.style.height = `${height}px`;
      return container;
    }

    _createQuadrilaterals(ignoreBorder = false) {
      if (!this.data.quadPoints) {
        return null;
      }

      const quadrilaterals = [];
      const savedRect = this.data.rect;

      for (const quadPoint of this.data.quadPoints) {
        this.data.rect = [quadPoint[2].x, quadPoint[2].y, quadPoint[1].x, quadPoint[1].y];
        quadrilaterals.push(this._createContainer(ignoreBorder));
      }

      this.data.rect = savedRect;
      return quadrilaterals;
    }

    _createPopup(trigger, data) {
      let container = this.container;

      if (this.quadrilaterals) {
        trigger = trigger || this.quadrilaterals;
        container = this.quadrilaterals[0];
      }

      if (!trigger) {
        trigger = document.createElement("div");
        trigger.style.height = container.style.height;
        trigger.style.width = container.style.width;
        container.appendChild(trigger);
      }

      const popupElement = new PopupElement({
        container,
        trigger,
        color: data.color,
        title: data.title,
        modificationDate: data.modificationDate,
        contents: data.contents,
        hideWrapper: true
      });
      const popup = popupElement.render();
      popup.style.left = container.style.width;
      container.appendChild(popup);
    }

    _renderQuadrilaterals(className) {
      this.quadrilaterals.forEach(quadrilateral => {
        quadrilateral.className = className;
      });
      return this.quadrilaterals;
    }

    render() {
      (0, _util.unreachable)("Abstract method `AnnotationElement.render` called");
    }

  }

  class LinkAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.url || parameters.data.dest || parameters.data.action || parameters.data.isTooltipOnly || parameters.data.actions && (parameters.data.actions.Action || parameters.data.actions["Mouse Up"] || parameters.data.actions["Mouse Down"]));
      super(parameters, {
        isRenderable,
        createQuadrilaterals: true
      });
    }

    render() {
      const {
        data,
        linkService
      } = this;
      const link = document.createElement("a");

      if (data.url) {
        (0, _display_utils.addLinkAttributes)(link, {
          url: data.url,
          target: data.newWindow ? _display_utils.LinkTarget.BLANK : linkService.externalLinkTarget,
          rel: linkService.externalLinkRel,
          enabled: linkService.externalLinkEnabled
        });
      } else if (data.action) {
        this._bindNamedAction(link, data.action);
      } else if (data.dest) {
        this._bindLink(link, data.dest);
      } else if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
        this._bindJSAction(link, data);
      } else {
        this._bindLink(link, "");
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("linkAnnotation").map((quadrilateral, index) => {
          const linkElement = index === 0 ? link : link.cloneNode();
          quadrilateral.appendChild(linkElement);
          return quadrilateral;
        });
      }

      this.container.className = "linkAnnotation";
      this.container.appendChild(link);
      return this.container;
    }

    _bindLink(link, destination) {
      link.href = this.linkService.getDestinationHash(destination);

      link.onclick = () => {
        if (destination) {
          this.linkService.goToDestination(destination);
        }

        return false;
      };

      if (destination || destination === "") {
        link.className = "internalLink";
      }
    }

    _bindNamedAction(link, action) {
      link.href = this.linkService.getAnchorUrl("");

      link.onclick = () => {
        this.linkService.executeNamedAction(action);
        return false;
      };

      link.className = "internalLink";
    }

    _bindJSAction(link, data) {
      link.href = this.linkService.getAnchorUrl("");
      const map = new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);

      for (const name of Object.keys(data.actions)) {
        const jsName = map.get(name);

        if (!jsName) {
          continue;
        }

        link[jsName] = () => {
          this.linkService.eventBus && this.linkService.eventBus.dispatch("dispatcheventinsandbox", { // lwf
            source: this,
            detail: {
              id: data.id,
              name
            }
          });
          return false;
        };
      }

      link.className = "internalLink";
    }

  }

  class TextAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable
      });
    }

    render() {
      this.container.className = "textAnnotation";
      const image = document.createElement("img");
      image.style.height = this.container.style.height;
      image.style.width = this.container.style.width;
      image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
      image.alt = "[{{type}} Annotation]";
      image.dataset.l10nId = "text_annotation_type";
      image.dataset.l10nArgs = JSON.stringify({
        type: this.data.name
      });

      if (!this.data.hasPopup) {
        this._createPopup(image, this.data);
      }

      this.container.appendChild(image);
      return this.container;
    }

  }

  class WidgetAnnotationElement extends AnnotationElement {
    render() {
      if (this.data.alternativeText) {
        this.container.title = this.data.alternativeText;
      }

      return this.container;
    }

    _getKeyModifier(event) {
      return navigator.platform.includes("Win") && event.ctrlKey || navigator.platform.includes("Mac") && event.metaKey;
    }

    _setEventListener(element, baseName, eventName, valueGetter) {
      if (baseName.includes("mouse")) {
        element.addEventListener(baseName, event => {
          this.linkService.eventBus && this.linkService.eventBus.dispatch("dispatcheventinsandbox", { // lwf
            source: this,
            detail: {
              id: this.data.id,
              name: eventName,
              value: valueGetter(event),
              shift: event.shiftKey,
              modifier: this._getKeyModifier(event)
            }
          });
        });
      } else {
        element.addEventListener(baseName, event => {
          this.linkService.eventBus && this.linkService.eventBus.dispatch("dispatcheventinsandbox", { // lwf
            source: this,
            detail: {
              id: this.data.id,
              name: eventName,
              value: event.target.checked
            }
          });
        });
      }
    }

    _setEventListeners(element, names, getter) {
      for (const [baseName, eventName] of names) {
        if (eventName === "Action" || this.data.actions && this.data.actions[eventName]) { // lwf
          this._setEventListener(element, baseName, eventName, getter);
        }
      }
    }

  }

  class TextWidgetAnnotationElement extends WidgetAnnotationElement {
    constructor(parameters) {
      const isRenderable = parameters.renderInteractiveForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
      super(parameters, {
        isRenderable
      });
    }

    render() {
      const storage = this.annotationStorage;
      const id = this.data.id;
      this.container.className = "textWidgetAnnotation";
      let element = null;

      if (this.renderInteractiveForms) {
        const textContent = storage.getOrCreateValue(id, {
          value: this.data.fieldValue
        }).value;
        const elementData = {
          userValue: null,
          formattedValue: null,
          beforeInputSelectionRange: null,
          beforeInputValue: null
        };

        if (this.data.multiLine) {
          element = document.createElement("textarea");
          element.textContent = textContent;
        } else {
          element = document.createElement("input");
          element.type = "text";
          element.setAttribute("value", textContent);
        }

        elementData.userValue = textContent;
        element.setAttribute("id", id);
        element.addEventListener("input", function (event) {
          storage.setValue(id, {
            value: event.target.value
          });
        });

        let blurListener = event => {
          if (elementData.formattedValue) {
            event.target.value = elementData.formattedValue;
          }

          event.target.setSelectionRange(0, 0);
          elementData.beforeInputSelectionRange = null;
        };

        if (this.enableScripting && this.hasJSActions) {
          element.addEventListener("focus", event => {
            if (elementData.userValue) {
              event.target.value = elementData.userValue;
            }
          });
          element.addEventListener("updatefromsandbox", function (event) {
            const {
              detail
            } = event;
            const actions = {
              value() {
                elementData.userValue = detail.value || "";
                storage.setValue(id, {
                  value: elementData.userValue.toString()
                });

                if (!elementData.formattedValue) {
                  event.target.value = elementData.userValue;
                }
              },

              valueAsString() {
                elementData.formattedValue = detail.valueAsString || "";

                if (event.target !== document.activeElement) {
                  event.target.value = elementData.formattedValue;
                }

                storage.setValue(id, {
                  formattedValue: elementData.formattedValue
                });
              },

              focus() {
                setTimeout(() => event.target.focus({
                  preventScroll: false
                }), 0);
              },

              userName() {
                event.target.title = detail.userName;
              },

              hidden() {
                event.target.style.visibility = detail.hidden ? "hidden" : "visible";
                storage.setValue(id, {
                  hidden: detail.hidden
                });
              },

              editable() {
                event.target.disabled = !detail.editable;
              },

              selRange() {
                const [selStart, selEnd] = detail.selRange;

                if (selStart >= 0 && selEnd < event.target.value.length) {
                  event.target.setSelectionRange(selStart, selEnd);
                }
              },

              strokeColor() {
                const color = detail.strokeColor;
                event.target.style.color = _scripting_utils.ColorConverters[`${color[0]}_HTML`](color.slice(1));
              }

            };
            Object.keys(detail).filter(name => name in actions).forEach(name => actions[name]());
          });

          if (this.data.actions) {
            element.addEventListener("keydown", event => {
              elementData.beforeInputValue = event.target.value;
              let commitKey = -1;

              if (event.key === "Escape") {
                commitKey = 0;
              } else if (event.key === "Enter") {
                commitKey = 2;
              } else if (event.key === "Tab") {
                commitKey = 3;
              }

              if (commitKey === -1) {
                return;
              }

              elementData.userValue = event.target.value;
              this.linkService.eventBus && this.linkService.eventBus.dispatch("dispatcheventinsandbox", { // lwf
                source: this,
                detail: {
                  id,
                  name: "Keystroke",
                  value: event.target.value,
                  willCommit: true,
                  commitKey,
                  selStart: event.target.selectionStart,
                  selEnd: event.target.selectionEnd
                }
              });
            });
            const _blurListener = blurListener;
            blurListener = null;
            element.addEventListener("blur", event => {
              if (this._mouseState.isDown) {
                elementData.userValue = event.target.value;
                this.linkService.eventBus && this.linkService.eventBus.dispatch("dispatcheventinsandbox", { // lwf
                  source: this,
                  detail: {
                    id,
                    name: "Keystroke",
                    value: event.target.value,
                    willCommit: true,
                    commitKey: 1,
                    selStart: event.target.selectionStart,
                    selEnd: event.target.selectionEnd
                  }
                });
              }

              _blurListener(event);
            });
            element.addEventListener("mousedown", event => {
              elementData.beforeInputValue = event.target.value;
              elementData.beforeInputSelectionRange = null;
            });
            element.addEventListener("keyup", event => {
              if (event.target.selectionStart === event.target.selectionEnd) {
                elementData.beforeInputSelectionRange = null;
              }
            });
            element.addEventListener("select", event => {
              elementData.beforeInputSelectionRange = [event.target.selectionStart, event.target.selectionEnd];
            });

            if ("Keystroke" in this.data.actions) {
              element.addEventListener("input", event => {
                let selStart = -1;
                let selEnd = -1;

                if (elementData.beforeInputSelectionRange) {
                  [selStart, selEnd] = elementData.beforeInputSelectionRange;
                }

                this.linkService.eventBus && this.linkService.eventBus.dispatch("dispatcheventinsandbox", { // lwf
                  source: this,
                  detail: {
                    id,
                    name: "Keystroke",
                    value: elementData.beforeInputValue,
                    change: event.data,
                    willCommit: false,
                    selStart,
                    selEnd
                  }
                });
              });
            }

            this._setEventListeners(element, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.value);
          }
        }

        if (blurListener) {
          element.addEventListener("blur", blurListener);
        }

        element.disabled = this.data.readOnly;
        element.name = this.data.fieldName;

        if (this.data.maxLen !== null) {
          element.maxLength = this.data.maxLen;
        }

        if (this.data.comb) {
          const fieldWidth = this.data.rect[2] - this.data.rect[0];
          const combWidth = fieldWidth / this.data.maxLen;
          element.classList.add("comb");
          element.style.letterSpacing = `calc(${combWidth}px - 1ch)`;
        }
      } else {
        element = document.createElement("div");
        element.textContent = this.data.fieldValue;
        element.style.verticalAlign = "middle";
        element.style.display = "table-cell";
      }

      this._setTextStyle(element);

      this.container.appendChild(element);
      return this.container;
    }

    _setTextStyle(element) {
      const TEXT_ALIGNMENT = ["left", "center", "right"];
      const {
        fontSize,
        fontColor
      } = this.data.defaultAppearanceData;
      const style = element.style;

      if (fontSize) {
        style.fontSize = `${fontSize}px`;
      }

      style.color = _util.Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]);

      if (this.data.textAlignment !== null) {
        style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
      }
    }

  }

  class CheckboxWidgetAnnotationElement extends WidgetAnnotationElement {
    constructor(parameters) {
      super(parameters, {
        isRenderable: parameters.renderInteractiveForms
      });
    }

    render() {
      const storage = this.annotationStorage;
      const data = this.data;
      const id = data.id;
      const value = storage.getOrCreateValue(id, {
        value: data.fieldValue && data.fieldValue !== "Off"
      }).value;
      this.container.className = "buttonWidgetAnnotation checkBox";
      const element = document.createElement("input");
      element.disabled = data.readOnly;
      element.type = "checkbox";
      element.name = this.data.fieldName;

      if (value) {
        element.setAttribute("checked", true);
      }

      element.setAttribute("id", id);
      element.addEventListener("change", function (event) {
        const name = event.target.name;

        for (const checkbox of document.getElementsByName(name)) {
          if (checkbox !== event.target) {
            checkbox.checked = false;
            storage.setValue(checkbox.parentNode.getAttribute("data-annotation-id"), {
              value: false
            });
          }
        }

        storage.setValue(id, {
          value: event.target.checked
        });
      });

      if (this.enableScripting && this.hasJSActions) {
        element.addEventListener("updatefromsandbox", event => {
          const {
            detail
          } = event;
          const actions = {
            value() {
              event.target.checked = detail.value !== "Off";
              storage.setValue(id, {
                value: event.target.checked
              });
            },

            focus() {
              setTimeout(() => event.target.focus({
                preventScroll: false
              }), 0);
            },

            hidden() {
              event.target.style.visibility = detail.hidden ? "hidden" : "visible";
              storage.setValue(id, {
                hidden: detail.hidden
              });
            },

            editable() {
              event.target.disabled = !detail.editable;
            }

          };
          Object.keys(detail).filter(name => name in actions).forEach(name => actions[name]());
        });

        this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
      }

      this.container.appendChild(element);
      return this.container;
    }

  }

  class RadioButtonWidgetAnnotationElement extends WidgetAnnotationElement {
    constructor(parameters) {
      super(parameters, {
        isRenderable: parameters.renderInteractiveForms
      });
    }

    render() {
      this.container.className = "buttonWidgetAnnotation radioButton";
      const storage = this.annotationStorage;
      const data = this.data;
      const id = data.id;
      const value = storage.getOrCreateValue(id, {
        value: data.fieldValue === data.buttonValue
      }).value;
      const element = document.createElement("input");
      element.disabled = data.readOnly;
      element.type = "radio";
      element.name = data.fieldName;

      if (value) {
        element.setAttribute("checked", true);
      }

      element.setAttribute("pdfButtonValue", data.buttonValue);
      element.setAttribute("id", id);
      element.addEventListener("change", function (event) {
        const {
          target
        } = event;

        for (const radio of document.getElementsByName(target.name)) {
          if (radio !== target) {
            storage.setValue(radio.getAttribute("id"), {
              value: false
            });
          }
        }

        storage.setValue(id, {
          value: target.checked
        });
      });

      if (this.enableScripting && this.hasJSActions) {
        element.addEventListener("updatefromsandbox", event => {
          const {
            detail
          } = event;
          const actions = {
            value() {
              const fieldValue = detail.value;

              for (const radio of document.getElementsByName(event.target.name)) {
                const radioId = radio.getAttribute("id");

                if (fieldValue === radio.getAttribute("pdfButtonValue")) {
                  radio.setAttribute("checked", true);
                  storage.setValue(radioId, {
                    value: true
                  });
                } else {
                  storage.setValue(radioId, {
                    value: false
                  });
                }
              }
            },

            focus() {
              setTimeout(() => event.target.focus({
                preventScroll: false
              }), 0);
            },

            hidden() {
              event.target.style.visibility = detail.hidden ? "hidden" : "visible";
              storage.setValue(id, {
                hidden: detail.hidden
              });
            },

            editable() {
              event.target.disabled = !detail.editable;
            }

          };
          Object.keys(detail).filter(name => name in actions).forEach(name => actions[name]());
        });

        this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
      }

      this.container.appendChild(element);
      return this.container;
    }

  }

  class PushButtonWidgetAnnotationElement extends LinkAnnotationElement {
    render() {
      const container = super.render();
      container.className = "buttonWidgetAnnotation pushButton";

      if (this.data.alternativeText) {
        container.title = this.data.alternativeText;
      }

      return container;
    }

  }

  class ChoiceWidgetAnnotationElement extends WidgetAnnotationElement {
    constructor(parameters) {
      super(parameters, {
        isRenderable: parameters.renderInteractiveForms
      });
    }

    render() {
      this.container.className = "choiceWidgetAnnotation";
      const storage = this.annotationStorage;
      const id = this.data.id;
      storage.getOrCreateValue(id, {
        value: this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : undefined
      });
      const selectElement = document.createElement("select");
      selectElement.disabled = this.data.readOnly;
      selectElement.name = this.data.fieldName;
      selectElement.setAttribute("id", id);

      if (!this.data.combo) {
        selectElement.size = this.data.options.length;

        if (this.data.multiSelect) {
          selectElement.multiple = true;
        }
      }

      for (const option of this.data.options) {
        const optionElement = document.createElement("option");
        optionElement.textContent = option.displayValue;
        optionElement.value = option.exportValue;

        if (this.data.fieldValue.includes(option.exportValue)) {
          optionElement.setAttribute("selected", true);
        }

        selectElement.appendChild(optionElement);
      }

      function getValue(event) {
        const options = event.target.options;
        return options[options.selectedIndex].value;
      }

      if (this.enableScripting && this.hasJSActions) {
        selectElement.addEventListener("updatefromsandbox", event => {
          const {
            detail
          } = event;
          const actions = {
            value() {
              const options = event.target.options;
              const value = detail.value;
              const i = options.indexOf(value);

              if (i !== -1) {
                options.selectedIndex = i;
                storage.setValue(id, {
                  value
                });
              }
            },

            focus() {
              setTimeout(() => event.target.focus({
                preventScroll: false
              }), 0);
            },

            hidden() {
              event.target.style.visibility = detail.hidden ? "hidden" : "visible";
              storage.setValue(id, {
                hidden: detail.hidden
              });
            },

            editable() {
              event.target.disabled = !detail.editable;
            }

          };
          Object.keys(detail).filter(name => name in actions).forEach(name => actions[name]());
        });
        selectElement.addEventListener("input", event => {
          const value = getValue(event);
          storage.setValue(id, {
            value
          });
          this.linkService.eventBus && this.linkService.eventBus.dispatch("dispatcheventinsandbox", { //lwf
            source: this,
            detail: {
              id,
              name: "Keystroke",
              changeEx: value,
              willCommit: true,
              commitKey: 1,
              keyDown: false
            }
          });
        });

        this._setEventListeners(selectElement, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
      } else {
        selectElement.addEventListener("input", function (event) {
          storage.setValue(id, {
            value: getValue(event)
          });
        });
      }

      this.container.appendChild(selectElement);
      return this.container;
    }

  }

  class PopupAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable
      });
    }

    render() {
      const IGNORE_TYPES = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
      this.container.className = "popupAnnotation";

      if (IGNORE_TYPES.includes(this.data.parentType)) {
        return this.container;
      }

      const selector = `[data-annotation-id="${this.data.parentId}"]`;
      const parentElements = this.layer.querySelectorAll(selector);

      if (parentElements.length === 0) {
        return this.container;
      }

      const popup = new PopupElement({
        container: this.container,
        trigger: Array.from(parentElements),
        color: this.data.color,
        title: this.data.title,
        modificationDate: this.data.modificationDate,
        contents: this.data.contents
      });
      const page = this.page;

      const rect = _util.Util.normalizeRect([this.data.parentRect[0], page.view[3] - this.data.parentRect[1] + page.view[1], this.data.parentRect[2], page.view[3] - this.data.parentRect[3] + page.view[1]]);

      const popupLeft = rect[0] + this.data.parentRect[2] - this.data.parentRect[0];
      const popupTop = rect[1];
      this.container.style.transformOrigin = `${-popupLeft}px ${-popupTop}px`;
      this.container.style.left = `${popupLeft}px`;
      this.container.style.top = `${popupTop}px`;
      this.container.appendChild(popup.render());
      return this.container;
    }

  }

  class PopupElement {
    constructor(parameters) {
      this.container = parameters.container;
      this.trigger = parameters.trigger;
      this.color = parameters.color;
      this.title = parameters.title;
      this.modificationDate = parameters.modificationDate;
      this.contents = parameters.contents;
      this.hideWrapper = parameters.hideWrapper || false;
      this.pinned = false;
    }

    render() {
      const BACKGROUND_ENLIGHT = 0.7;
      const wrapper = document.createElement("div");
      wrapper.className = "popupWrapper";
      this.hideElement = this.hideWrapper ? wrapper : this.container;
      this.hideElement.setAttribute("hidden", true);
      const popup = document.createElement("div");
      popup.className = "popup";
      const color = this.color;

      if (color) {
        const r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
        const g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
        const b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
        popup.style.backgroundColor = _util.Util.makeHexColor(r | 0, g | 0, b | 0);
      }

      const title = document.createElement("h1");
      title.textContent = this.title;
      popup.appendChild(title);

      const dateObject = _display_utils.PDFDateString.toDateObject(this.modificationDate);

      if (dateObject) {
        const modificationDate = document.createElement("span");
        modificationDate.textContent = "{{date}}, {{time}}";
        modificationDate.dataset.l10nId = "annotation_date_string";
        modificationDate.dataset.l10nArgs = JSON.stringify({
          date: dateObject.toLocaleDateString(),
          time: dateObject.toLocaleTimeString()
        });
        popup.appendChild(modificationDate);
      }

      const contents = this._formatContents(this.contents);

      popup.appendChild(contents);

      if (!Array.isArray(this.trigger)) {
        this.trigger = [this.trigger];
      }

      this.trigger.forEach(element => {
        element.addEventListener("click", this._toggle.bind(this));
        element.addEventListener("mouseover", this._show.bind(this, false));
        element.addEventListener("mouseout", this._hide.bind(this, false));
      });
      popup.addEventListener("click", this._hide.bind(this, true));
      wrapper.appendChild(popup);
      return wrapper;
    }

    _formatContents(contents) {
      const p = document.createElement("p");
      const lines = contents.split(/(?:\r\n?|\n)/);

      for (let i = 0, ii = lines.length; i < ii; ++i) {
        const line = lines[i];
        p.appendChild(document.createTextNode(line));

        if (i < ii - 1) {
          p.appendChild(document.createElement("br"));
        }
      }

      return p;
    }

    _toggle() {
      if (this.pinned) {
        this._hide(true);
      } else {
        this._show(true);
      }
    }

    _show(pin = false) {
      if (pin) {
        this.pinned = true;
      }

      if (this.hideElement.hasAttribute("hidden")) {
        this.hideElement.removeAttribute("hidden");
        this.container.style.zIndex += 1;
      }
    }

    _hide(unpin = true) {
      if (unpin) {
        this.pinned = false;
      }

      if (!this.hideElement.hasAttribute("hidden") && !this.pinned) {
        this.hideElement.setAttribute("hidden", true);
        this.container.style.zIndex -= 1;
      }
    }

  }

  class FreeTextAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true
      });
    }

    render() {
      this.container.className = "freeTextAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }

  }

  class LineAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true
      });
    }

    render() {
      this.container.className = "lineAnnotation";
      const data = this.data;
      const width = data.rect[2] - data.rect[0];
      const height = data.rect[3] - data.rect[1];
      const svg = this.svgFactory.create(width, height);
      const line = this.svgFactory.createElement("svg:line");
      line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
      line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
      line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
      line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
      line.setAttribute("stroke-width", data.borderStyle.width || 1);
      line.setAttribute("stroke", "transparent");
      svg.appendChild(line);
      this.container.append(svg);

      this._createPopup(line, data);

      return this.container;
    }

  }

  class SquareAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true
      });
    }

    render() {
      this.container.className = "squareAnnotation";
      const data = this.data;
      const width = data.rect[2] - data.rect[0];
      const height = data.rect[3] - data.rect[1];
      const svg = this.svgFactory.create(width, height);
      const borderWidth = data.borderStyle.width;
      const square = this.svgFactory.createElement("svg:rect");
      square.setAttribute("x", borderWidth / 2);
      square.setAttribute("y", borderWidth / 2);
      square.setAttribute("width", width - borderWidth);
      square.setAttribute("height", height - borderWidth);
      square.setAttribute("stroke-width", borderWidth || 1);
      square.setAttribute("stroke", "transparent");
      square.setAttribute("fill", "none");
      svg.appendChild(square);
      this.container.append(svg);

      this._createPopup(square, data);

      return this.container;
    }

  }

  class CircleAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true
      });
    }

    render() {
      this.container.className = "circleAnnotation";
      const data = this.data;
      const width = data.rect[2] - data.rect[0];
      const height = data.rect[3] - data.rect[1];
      const svg = this.svgFactory.create(width, height);
      const borderWidth = data.borderStyle.width;
      const circle = this.svgFactory.createElement("svg:ellipse");
      circle.setAttribute("cx", width / 2);
      circle.setAttribute("cy", height / 2);
      circle.setAttribute("rx", width / 2 - borderWidth / 2);
      circle.setAttribute("ry", height / 2 - borderWidth / 2);
      circle.setAttribute("stroke-width", borderWidth || 1);
      circle.setAttribute("stroke", "transparent");
      circle.setAttribute("fill", "none");
      svg.appendChild(circle);
      this.container.append(svg);

      this._createPopup(circle, data);

      return this.container;
    }

  }

  class PolylineAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true
      });
      this.containerClassName = "polylineAnnotation";
      this.svgElementName = "svg:polyline";
    }

    render() {
      this.container.className = this.containerClassName;
      const data = this.data;
      const width = data.rect[2] - data.rect[0];
      const height = data.rect[3] - data.rect[1];
      const svg = this.svgFactory.create(width, height);
      let points = [];

      for (const coordinate of data.vertices) {
        const x = coordinate.x - data.rect[0];
        const y = data.rect[3] - coordinate.y;
        points.push(x + "," + y);
      }

      points = points.join(" ");
      const polyline = this.svgFactory.createElement(this.svgElementName);
      polyline.setAttribute("points", points);
      polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
      polyline.setAttribute("stroke", "transparent");
      polyline.setAttribute("fill", "none");
      svg.appendChild(polyline);
      this.container.append(svg);

      this._createPopup(polyline, data);

      return this.container;
    }

  }

  class PolygonAnnotationElement extends PolylineAnnotationElement {
    constructor(parameters) {
      super(parameters);
      this.containerClassName = "polygonAnnotation";
      this.svgElementName = "svg:polygon";
    }

  }

  class CaretAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true
      });
    }

    render() {
      this.container.className = "caretAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }

  }

  class InkAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true
      });
      this.containerClassName = "inkAnnotation";
      this.svgElementName = "svg:polyline";
    }

    render() {
      this.container.className = this.containerClassName;
      const data = this.data;
      const width = data.rect[2] - data.rect[0];
      const height = data.rect[3] - data.rect[1];
      const svg = this.svgFactory.create(width, height);

      for (const inkList of data.inkLists) {
        let points = [];

        for (const coordinate of inkList) {
          const x = coordinate.x - data.rect[0];
          const y = data.rect[3] - coordinate.y;
          points.push(`${x},${y}`);
        }

        points = points.join(" ");
        const polyline = this.svgFactory.createElement(this.svgElementName);
        polyline.setAttribute("points", points);
        polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
        polyline.setAttribute("stroke", "transparent");
        polyline.setAttribute("fill", "none");

        this._createPopup(polyline, data);

        svg.appendChild(polyline);
      }

      this.container.append(svg);
      return this.container;
    }

  }

  class HighlightAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true,
        createQuadrilaterals: true
      });
    }

    render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("highlightAnnotation");
      }

      this.container.className = "highlightAnnotation";
      return this.container;
    }

  }

  class UnderlineAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true,
        createQuadrilaterals: true
      });
    }

    render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("underlineAnnotation");
      }

      this.container.className = "underlineAnnotation";
      return this.container;
    }

  }

  class SquigglyAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true,
        createQuadrilaterals: true
      });
    }

    render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("squigglyAnnotation");
      }

      this.container.className = "squigglyAnnotation";
      return this.container;
    }

  }

  class StrikeOutAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true,
        createQuadrilaterals: true
      });
    }

    render() {
      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      if (this.quadrilaterals) {
        return this._renderQuadrilaterals("strikeoutAnnotation");
      }

      this.container.className = "strikeoutAnnotation";
      return this.container;
    }

  }

  class StampAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      const isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
      super(parameters, {
        isRenderable,
        ignoreBorder: true
      });
    }

    render() {
      this.container.className = "stampAnnotation";

      if (!this.data.hasPopup) {
        this._createPopup(null, this.data);
      }

      return this.container;
    }

  }

  class FileAttachmentAnnotationElement extends AnnotationElement {
    constructor(parameters) {
      super(parameters, {
        isRenderable: true
      });
      const {
        filename,
        content
      } = this.data.file;
      this.filename = (0, _display_utils.getFilenameFromUrl)(filename);
      this.content = content;
      this.linkService.eventBus && this.linkService.eventBus.dispatch("fileattachmentannotation", { // lwf
        source: this,
        id: (0, _util.stringToPDFString)(filename),
        filename,
        content
      });
    }

    render() {
      this.container.className = "fileAttachmentAnnotation";
      const trigger = document.createElement("div");
      trigger.style.height = this.container.style.height;
      trigger.style.width = this.container.style.width;
      trigger.addEventListener("dblclick", this._download.bind(this));

      if (!this.data.hasPopup && (this.data.title || this.data.contents)) {
        this._createPopup(trigger, this.data);
      }

      this.container.appendChild(trigger);
      return this.container;
    }

    _download() {
      if (!this.downloadManager) {
        (0, _util.warn)("Download cannot be started due to unavailable download manager");
        return;
      }

      this.downloadManager.downloadData(this.content, this.filename, "");
    }

  }

  class AnnotationLayer {
    static render(parameters) {
      const sortedAnnotations = [],
            popupAnnotations = [];

      for (const data of parameters.annotations) {
        if (!data) {
          continue;
        }

        if (data.annotationType === _util.AnnotationType.POPUP) {
          popupAnnotations.push(data);
          continue;
        }

        sortedAnnotations.push(data);
      }

      if (popupAnnotations.length) {
        sortedAnnotations.push(...popupAnnotations);
      }

      for (const data of sortedAnnotations) {
        const element = AnnotationElementFactory.create({
          data,
          layer: parameters.div,
          page: parameters.page,
          viewport: parameters.viewport,
          linkService: parameters.linkService,
          downloadManager: parameters.downloadManager,
          imageResourcesPath: parameters.imageResourcesPath || "",
          renderInteractiveForms: typeof parameters.renderInteractiveForms === "boolean" ? parameters.renderInteractiveForms : true,
          svgFactory: new _display_utils.DOMSVGFactory(),
          annotationStorage: parameters.annotationStorage || new _annotation_storage.AnnotationStorage(),
          enableScripting: parameters.enableScripting,
          hasJSActions: parameters.hasJSActions,
          mouseState: parameters.mouseState || {
            isDown: false
          }
        });

        if (element.isRenderable) {
          const rendered = element.render();

          if (data.hidden) {
            rendered.style.visibility = "hidden";
          }

          if (Array.isArray(rendered)) {
            for (const renderedElement of rendered) {
              parameters.div.appendChild(renderedElement);
            }
          } else {
            if (element instanceof PopupAnnotationElement) {
              parameters.div.prepend(rendered);
            } else {
              parameters.div.appendChild(rendered);
            }
          }
        }
      }
    }

    static update(parameters) {
      const transform = `matrix(${parameters.viewport.transform.join(",")})`;

      for (const data of parameters.annotations) {
        const elements = parameters.div.querySelectorAll(`[data-annotation-id="${data.id}"]`);

        if (elements) {
          elements.forEach(element => {
            element.style.transform = transform;
          });
        }
      }

      parameters.div.removeAttribute("hidden");
    }

  }

  exports.AnnotationLayer = AnnotationLayer;

  /***/ }),
  /* 20 */
  /***/ ((__unused_webpack_module, exports) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.ColorConverters = void 0;

  function makeColorComp(n) {
    return Math.floor(Math.max(0, Math.min(1, n)) * 255).toString(16).padStart(2, "0");
  }

  class ColorConverters {
    static CMYK_G([c, y, m, k]) {
      return ["G", 1 - Math.min(1, 0.3 * c + 0.59 * m + 0.11 * y + k)];
    }

    static G_CMYK([g]) {
      return ["CMYK", 0, 0, 0, 1 - g];
    }

    static G_RGB([g]) {
      return ["RGB", g, g, g];
    }

    static G_HTML([g]) {
      const G = makeColorComp(g);
      return `#${G}${G}${G}`;
    }

    static RGB_G([r, g, b]) {
      return ["G", 0.3 * r + 0.59 * g + 0.11 * b];
    }

    static RGB_HTML([r, g, b]) {
      const R = makeColorComp(r);
      const G = makeColorComp(g);
      const B = makeColorComp(b);
      return `#${R}${G}${B}`;
    }

    static T_HTML() {
      return "#00000000";
    }

    static CMYK_RGB([c, y, m, k]) {
      return ["RGB", 1 - Math.min(1, c + k), 1 - Math.min(1, m + k), 1 - Math.min(1, y + k)];
    }

    static CMYK_HTML(components) {
      return this.RGB_HTML(this.CMYK_RGB(components));
    }

    static RGB_CMYK([r, g, b]) {
      const c = 1 - r;
      const m = 1 - g;
      const y = 1 - b;
      const k = Math.min(c, m, y);
      return ["CMYK", c, m, y, k];
    }

  }

  exports.ColorConverters = ColorConverters;

  /***/ }),
  /* 21 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.renderTextLayer = void 0;

  var _util = __w_pdfjs_require__(2);

  const renderTextLayer = function renderTextLayerClosure() {
    const MAX_TEXT_DIVS_TO_RENDER = 100000;
    const NonWhitespaceRegexp = /\S/;

    function isAllWhitespace(str) {
      return !NonWhitespaceRegexp.test(str);
    }

    function appendText(task, geom, styles) {
      const textDiv = document.createElement("span");
      const textDivProperties = {
        angle: 0,
        canvasWidth: 0,
        isWhitespace: false,
        originalTransform: null,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        scale: 1
      };

      task._textDivs.push(textDiv);

      if (isAllWhitespace(geom.str)) {
        textDivProperties.isWhitespace = true;

        task._textDivProperties.set(textDiv, textDivProperties);

        return;
      }

      const tx = _util.Util.transform(task._viewport.transform, geom.transform);

      let angle = Math.atan2(tx[1], tx[0]);
      const style = styles[geom.fontName];

      if (style.vertical) {
        angle += Math.PI / 2;
      }

      const fontHeight = Math.sqrt(tx[2] * tx[2] + tx[3] * tx[3]);
      let fontAscent = fontHeight;

      if (style.ascent) {
        fontAscent = style.ascent * fontAscent;
      } else if (style.descent) {
        fontAscent = (1 + style.descent) * fontAscent;
      }

      let left, top;

      if (angle === 0) {
        left = tx[4];
        top = tx[5] - fontAscent;
      } else {
        left = tx[4] + fontAscent * Math.sin(angle);
        top = tx[5] - fontAscent * Math.cos(angle);
      }

      textDiv.style.left = `${left}px`;
      textDiv.style.top = `${top}px`;
      textDiv.style.fontSize = `${fontHeight}px`;
      textDiv.style.fontFamily = style.fontFamily;
      textDiv.textContent = geom.str;

      if (task._fontInspectorEnabled) {
        textDiv.dataset.fontName = geom.fontName;
      }

      if (angle !== 0) {
        textDivProperties.angle = angle * (180 / Math.PI);
      }

      let shouldScaleText = false;

      if (geom.str.length > 1) {
        shouldScaleText = true;
      } else if (geom.transform[0] !== geom.transform[3]) {
        const absScaleX = Math.abs(geom.transform[0]),
              absScaleY = Math.abs(geom.transform[3]);

        if (absScaleX !== absScaleY && Math.max(absScaleX, absScaleY) / Math.min(absScaleX, absScaleY) > 1.5) {
          shouldScaleText = true;
        }
      }

      if (shouldScaleText) {
        if (style.vertical) {
          textDivProperties.canvasWidth = geom.height * task._viewport.scale;
        } else {
          textDivProperties.canvasWidth = geom.width * task._viewport.scale;
        }
      }

      task._textDivProperties.set(textDiv, textDivProperties);

      if (task._textContentStream) {
        task._layoutText(textDiv);
      }

      if (task._enhanceTextSelection) {
        let angleCos = 1,
            angleSin = 0;

        if (angle !== 0) {
          angleCos = Math.cos(angle);
          angleSin = Math.sin(angle);
        }

        const divWidth = (style.vertical ? geom.height : geom.width) * task._viewport.scale;
        const divHeight = fontHeight;
        let m, b;

        if (angle !== 0) {
          m = [angleCos, angleSin, -angleSin, angleCos, left, top];
          b = _util.Util.getAxialAlignedBoundingBox([0, 0, divWidth, divHeight], m);
        } else {
          b = [left, top, left + divWidth, top + divHeight];
        }

        task._bounds.push({
          left: b[0],
          top: b[1],
          right: b[2],
          bottom: b[3],
          div: textDiv,
          size: [divWidth, divHeight],
          m
        });
      }
    }

    function render(task) {
      if (task._canceled) {
        return;
      }

      const textDivs = task._textDivs;
      const capability = task._capability;
      const textDivsLength = textDivs.length;

      if (textDivsLength > MAX_TEXT_DIVS_TO_RENDER) {
        task._renderingDone = true;
        capability.resolve();
        return;
      }

      if (!task._textContentStream) {
        for (let i = 0; i < textDivsLength; i++) {
          task._layoutText(textDivs[i]);
        }
      }

      task._renderingDone = true;
      capability.resolve();
    }

    function findPositiveMin(ts, offset, count) {
      let result = 0;

      for (let i = 0; i < count; i++) {
        const t = ts[offset++];

        if (t > 0) {
          result = result ? Math.min(t, result) : t;
        }
      }

      return result;
    }

    function expand(task) {
      const bounds = task._bounds;
      const viewport = task._viewport;
      const expanded = expandBounds(viewport.width, viewport.height, bounds);

      for (let i = 0; i < expanded.length; i++) {
        const div = bounds[i].div;

        const divProperties = task._textDivProperties.get(div);

        if (divProperties.angle === 0) {
          divProperties.paddingLeft = bounds[i].left - expanded[i].left;
          divProperties.paddingTop = bounds[i].top - expanded[i].top;
          divProperties.paddingRight = expanded[i].right - bounds[i].right;
          divProperties.paddingBottom = expanded[i].bottom - bounds[i].bottom;

          task._textDivProperties.set(div, divProperties);

          continue;
        }

        const e = expanded[i],
              b = bounds[i];
        const m = b.m,
              c = m[0],
              s = m[1];
        const points = [[0, 0], [0, b.size[1]], [b.size[0], 0], b.size];
        const ts = new Float64Array(64);
        points.forEach(function (p, j) {
          const t = _util.Util.applyTransform(p, m);

          ts[j + 0] = c && (e.left - t[0]) / c;
          ts[j + 4] = s && (e.top - t[1]) / s;
          ts[j + 8] = c && (e.right - t[0]) / c;
          ts[j + 12] = s && (e.bottom - t[1]) / s;
          ts[j + 16] = s && (e.left - t[0]) / -s;
          ts[j + 20] = c && (e.top - t[1]) / c;
          ts[j + 24] = s && (e.right - t[0]) / -s;
          ts[j + 28] = c && (e.bottom - t[1]) / c;
          ts[j + 32] = c && (e.left - t[0]) / -c;
          ts[j + 36] = s && (e.top - t[1]) / -s;
          ts[j + 40] = c && (e.right - t[0]) / -c;
          ts[j + 44] = s && (e.bottom - t[1]) / -s;
          ts[j + 48] = s && (e.left - t[0]) / s;
          ts[j + 52] = c && (e.top - t[1]) / -c;
          ts[j + 56] = s && (e.right - t[0]) / s;
          ts[j + 60] = c && (e.bottom - t[1]) / -c;
        });
        const boxScale = 1 + Math.min(Math.abs(c), Math.abs(s));
        divProperties.paddingLeft = findPositiveMin(ts, 32, 16) / boxScale;
        divProperties.paddingTop = findPositiveMin(ts, 48, 16) / boxScale;
        divProperties.paddingRight = findPositiveMin(ts, 0, 16) / boxScale;
        divProperties.paddingBottom = findPositiveMin(ts, 16, 16) / boxScale;

        task._textDivProperties.set(div, divProperties);
      }
    }

    function expandBounds(width, height, boxes) {
      const bounds = boxes.map(function (box, i) {
        return {
          x1: box.left,
          y1: box.top,
          x2: box.right,
          y2: box.bottom,
          index: i,
          x1New: undefined,
          x2New: undefined
        };
      });
      expandBoundsLTR(width, bounds);
      const expanded = new Array(boxes.length);
      bounds.forEach(function (b) {
        const i = b.index;
        expanded[i] = {
          left: b.x1New,
          top: 0,
          right: b.x2New,
          bottom: 0
        };
      });
      boxes.map(function (box, i) {
        const e = expanded[i],
              b = bounds[i];
        b.x1 = box.top;
        b.y1 = width - e.right;
        b.x2 = box.bottom;
        b.y2 = width - e.left;
        b.index = i;
        b.x1New = undefined;
        b.x2New = undefined;
      });
      expandBoundsLTR(height, bounds);
      bounds.forEach(function (b) {
        const i = b.index;
        expanded[i].top = b.x1New;
        expanded[i].bottom = b.x2New;
      });
      return expanded;
    }

    function expandBoundsLTR(width, bounds) {
      bounds.sort(function (a, b) {
        return a.x1 - b.x1 || a.index - b.index;
      });
      const fakeBoundary = {
        x1: -Infinity,
        y1: -Infinity,
        x2: 0,
        y2: Infinity,
        index: -1,
        x1New: 0,
        x2New: 0
      };
      const horizon = [{
        start: -Infinity,
        end: Infinity,
        boundary: fakeBoundary
      }];
      bounds.forEach(function (boundary) {
        let i = 0;

        while (i < horizon.length && horizon[i].end <= boundary.y1) {
          i++;
        }

        let j = horizon.length - 1;

        while (j >= 0 && horizon[j].start >= boundary.y2) {
          j--;
        }

        let horizonPart, affectedBoundary;
        let q,
            k,
            maxXNew = -Infinity;

        for (q = i; q <= j; q++) {
          horizonPart = horizon[q];
          affectedBoundary = horizonPart.boundary;
          let xNew;

          if (affectedBoundary.x2 > boundary.x1) {
            xNew = affectedBoundary.index > boundary.index ? affectedBoundary.x1New : boundary.x1;
          } else if (affectedBoundary.x2New === undefined) {
            xNew = (affectedBoundary.x2 + boundary.x1) / 2;
          } else {
            xNew = affectedBoundary.x2New;
          }

          if (xNew > maxXNew) {
            maxXNew = xNew;
          }
        }

        boundary.x1New = maxXNew;

        for (q = i; q <= j; q++) {
          horizonPart = horizon[q];
          affectedBoundary = horizonPart.boundary;

          if (affectedBoundary.x2New === undefined) {
            if (affectedBoundary.x2 > boundary.x1) {
              if (affectedBoundary.index > boundary.index) {
                affectedBoundary.x2New = affectedBoundary.x2;
              }
            } else {
              affectedBoundary.x2New = maxXNew;
            }
          } else if (affectedBoundary.x2New > maxXNew) {
            affectedBoundary.x2New = Math.max(maxXNew, affectedBoundary.x2);
          }
        }

        const changedHorizon = [];
        let lastBoundary = null;

        for (q = i; q <= j; q++) {
          horizonPart = horizon[q];
          affectedBoundary = horizonPart.boundary;
          const useBoundary = affectedBoundary.x2 > boundary.x2 ? affectedBoundary : boundary;

          if (lastBoundary === useBoundary) {
            changedHorizon[changedHorizon.length - 1].end = horizonPart.end;
          } else {
            changedHorizon.push({
              start: horizonPart.start,
              end: horizonPart.end,
              boundary: useBoundary
            });
            lastBoundary = useBoundary;
          }
        }

        if (horizon[i].start < boundary.y1) {
          changedHorizon[0].start = boundary.y1;
          changedHorizon.unshift({
            start: horizon[i].start,
            end: boundary.y1,
            boundary: horizon[i].boundary
          });
        }

        if (boundary.y2 < horizon[j].end) {
          changedHorizon[changedHorizon.length - 1].end = boundary.y2;
          changedHorizon.push({
            start: boundary.y2,
            end: horizon[j].end,
            boundary: horizon[j].boundary
          });
        }

        for (q = i; q <= j; q++) {
          horizonPart = horizon[q];
          affectedBoundary = horizonPart.boundary;

          if (affectedBoundary.x2New !== undefined) {
            continue;
          }

          let used = false;

          for (k = i - 1; !used && k >= 0 && horizon[k].start >= affectedBoundary.y1; k--) {
            used = horizon[k].boundary === affectedBoundary;
          }

          for (k = j + 1; !used && k < horizon.length && horizon[k].end <= affectedBoundary.y2; k++) {
            used = horizon[k].boundary === affectedBoundary;
          }

          for (k = 0; !used && k < changedHorizon.length; k++) {
            used = changedHorizon[k].boundary === affectedBoundary;
          }

          if (!used) {
            affectedBoundary.x2New = maxXNew;
          }
        }

        Array.prototype.splice.apply(horizon, [i, j - i + 1].concat(changedHorizon));
      });
      horizon.forEach(function (horizonPart) {
        const affectedBoundary = horizonPart.boundary;

        if (affectedBoundary.x2New === undefined) {
          affectedBoundary.x2New = Math.max(width, affectedBoundary.x2);
        }
      });
    }

    function TextLayerRenderTask({
      textContent,
      textContentStream,
      container,
      viewport,
      textDivs,
      textContentItemsStr,
      enhanceTextSelection
    }) {
      this._textContent = textContent;
      this._textContentStream = textContentStream;
      this._container = container;
      this._document = container.ownerDocument;
      this._viewport = viewport;
      this._textDivs = textDivs || [];
      this._textContentItemsStr = textContentItemsStr || [];
      this._enhanceTextSelection = !!enhanceTextSelection;
      this._fontInspectorEnabled = !!(globalThis.FontInspector && globalThis.FontInspector.enabled); // lwf
      this._reader = null;
      this._layoutTextLastFontSize = null;
      this._layoutTextLastFontFamily = null;
      this._layoutTextCtx = null;
      this._textDivProperties = new WeakMap();
      this._renderingDone = false;
      this._canceled = false;
      this._capability = (0, _util.createPromiseCapability)();
      this._renderTimer = null;
      this._bounds = [];

      this._capability.promise.finally(() => {
        if (this._layoutTextCtx) {
          this._layoutTextCtx.canvas.width = 0;
          this._layoutTextCtx.canvas.height = 0;
          this._layoutTextCtx = null;
        }
      }).catch(() => {});
    }

    TextLayerRenderTask.prototype = {
      get promise() {
        return this._capability.promise;
      },

      cancel: function TextLayer_cancel() {
        this._canceled = true;

        if (this._reader) {
          this._reader.cancel(new _util.AbortException("TextLayer task cancelled."));

          this._reader = null;
        }

        if (this._renderTimer !== null) {
          clearTimeout(this._renderTimer);
          this._renderTimer = null;
        }

        this._capability.reject(new Error("TextLayer task cancelled."));
      },

      _processItems(items, styleCache) {
        for (let i = 0, len = items.length; i < len; i++) {
          this._textContentItemsStr.push(items[i].str);

          appendText(this, items[i], styleCache);
        }
      },

      _layoutText(textDiv) {
        const textDivProperties = this._textDivProperties.get(textDiv);

        if (textDivProperties.isWhitespace) {
          return;
        }

        let transform = "";

        if (textDivProperties.canvasWidth !== 0) {
          const {
            fontSize,
            fontFamily
          } = textDiv.style;

          if (fontSize !== this._layoutTextLastFontSize || fontFamily !== this._layoutTextLastFontFamily) {
            this._layoutTextCtx.font = `${fontSize} ${fontFamily}`;
            this._layoutTextLastFontSize = fontSize;
            this._layoutTextLastFontFamily = fontFamily;
          }

          const {
            width
          } = this._layoutTextCtx.measureText(textDiv.textContent);

          if (width > 0) {
            textDivProperties.scale = textDivProperties.canvasWidth / width;
            transform = `scaleX(${textDivProperties.scale})`;
          }
        }

        if (textDivProperties.angle !== 0) {
          transform = `rotate(${textDivProperties.angle}deg) ${transform}`;
        }

        if (transform.length > 0) {
          if (this._enhanceTextSelection) {
            textDivProperties.originalTransform = transform;
          }

          textDiv.style.transform = transform;
        }

        this._textDivProperties.set(textDiv, textDivProperties);

        this._container.appendChild(textDiv);
      },

      _render: function TextLayer_render(timeout) {
        const capability = (0, _util.createPromiseCapability)();
        let styleCache = Object.create(null);

        const canvas = this._document.createElement("canvas");

        canvas.mozOpaque = true;
        this._layoutTextCtx = canvas.getContext("2d", {
          alpha: false
        });

        if (this._textContent) {
          const textItems = this._textContent.items;
          const textStyles = this._textContent.styles;

          this._processItems(textItems, textStyles);

          capability.resolve();
        } else if (this._textContentStream) {
          const pump = () => {
            this._reader.read().then(({
              value,
              done
            }) => {
              if (done) {
                capability.resolve();
                return;
              }

              Object.assign(styleCache, value.styles);

              this._processItems(value.items, styleCache);

              pump();
            }, capability.reject);
          };

          this._reader = this._textContentStream.getReader();
          pump();
        } else {
          throw new Error('Neither "textContent" nor "textContentStream"' + " parameters specified.");
        }

        capability.promise.then(() => {
          styleCache = null;

          if (!timeout) {
            render(this);
          } else {
            this._renderTimer = setTimeout(() => {
              render(this);
              this._renderTimer = null;
            }, timeout);
          }
        }, this._capability.reject);
      },
      expandTextDivs: function TextLayer_expandTextDivs(expandDivs) {
        if (!this._enhanceTextSelection || !this._renderingDone) {
          return;
        }

        if (this._bounds !== null) {
          expand(this);
          this._bounds = null;
        }

        const transformBuf = [],
              paddingBuf = [];

        for (let i = 0, ii = this._textDivs.length; i < ii; i++) {
          const div = this._textDivs[i];

          const divProps = this._textDivProperties.get(div);

          if (divProps.isWhitespace) {
            continue;
          }

          if (expandDivs) {
            transformBuf.length = 0;
            paddingBuf.length = 0;

            if (divProps.originalTransform) {
              transformBuf.push(divProps.originalTransform);
            }

            if (divProps.paddingTop > 0) {
              paddingBuf.push(`${divProps.paddingTop}px`);
              transformBuf.push(`translateY(${-divProps.paddingTop}px)`);
            } else {
              paddingBuf.push(0);
            }

            if (divProps.paddingRight > 0) {
              paddingBuf.push(`${divProps.paddingRight / divProps.scale}px`);
            } else {
              paddingBuf.push(0);
            }

            if (divProps.paddingBottom > 0) {
              paddingBuf.push(`${divProps.paddingBottom}px`);
            } else {
              paddingBuf.push(0);
            }

            if (divProps.paddingLeft > 0) {
              paddingBuf.push(`${divProps.paddingLeft / divProps.scale}px`);
              transformBuf.push(`translateX(${-divProps.paddingLeft / divProps.scale}px)`);
            } else {
              paddingBuf.push(0);
            }

            div.style.padding = paddingBuf.join(" ");

            if (transformBuf.length) {
              div.style.transform = transformBuf.join(" ");
            }
          } else {
            div.style.padding = null;
            div.style.transform = divProps.originalTransform;
          }
        }
      }
    };

    function renderTextLayer(renderParameters) {
      const task = new TextLayerRenderTask({
        textContent: renderParameters.textContent,
        textContentStream: renderParameters.textContentStream,
        container: renderParameters.container,
        viewport: renderParameters.viewport,
        textDivs: renderParameters.textDivs,
        textContentItemsStr: renderParameters.textContentItemsStr,
        enhanceTextSelection: renderParameters.enhanceTextSelection
      });

      task._render(renderParameters.timeout);

      return task;
    }

    return renderTextLayer;
  }();

  exports.renderTextLayer = renderTextLayer;

  /***/ }),
  /* 22 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.SVGGraphics = void 0;

  var _util = __w_pdfjs_require__(2);

  var _display_utils = __w_pdfjs_require__(1);

  var _is_node = __w_pdfjs_require__(4);

  let SVGGraphics = function () {
    throw new Error("Not implemented: SVGGraphics");
  };

  exports.SVGGraphics = SVGGraphics;
  {
    const SVG_DEFAULTS = {
      fontStyle: "normal",
      fontWeight: "normal",
      fillColor: "#000000"
    };
    const XML_NS = "http://www.w3.org/XML/1998/namespace";
    const XLINK_NS = "http://www.w3.org/1999/xlink";
    const LINE_CAP_STYLES = ["butt", "round", "square"];
    const LINE_JOIN_STYLES = ["miter", "round", "bevel"];

    const convertImgDataToPng = function () {
      const PNG_HEADER = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const CHUNK_WRAPPER_SIZE = 12;
      const crcTable = new Int32Array(256);

      for (let i = 0; i < 256; i++) {
        let c = i;

        for (let h = 0; h < 8; h++) {
          if (c & 1) {
            c = 0xedb88320 ^ c >> 1 & 0x7fffffff;
          } else {
            c = c >> 1 & 0x7fffffff;
          }
        }

        crcTable[i] = c;
      }

      function crc32(data, start, end) {
        let crc = -1;

        for (let i = start; i < end; i++) {
          const a = (crc ^ data[i]) & 0xff;
          const b = crcTable[a];
          crc = crc >>> 8 ^ b;
        }

        return crc ^ -1;
      }

      function writePngChunk(type, body, data, offset) {
        let p = offset;
        const len = body.length;
        data[p] = len >> 24 & 0xff;
        data[p + 1] = len >> 16 & 0xff;
        data[p + 2] = len >> 8 & 0xff;
        data[p + 3] = len & 0xff;
        p += 4;
        data[p] = type.charCodeAt(0) & 0xff;
        data[p + 1] = type.charCodeAt(1) & 0xff;
        data[p + 2] = type.charCodeAt(2) & 0xff;
        data[p + 3] = type.charCodeAt(3) & 0xff;
        p += 4;
        data.set(body, p);
        p += body.length;
        const crc = crc32(data, offset + 4, p);
        data[p] = crc >> 24 & 0xff;
        data[p + 1] = crc >> 16 & 0xff;
        data[p + 2] = crc >> 8 & 0xff;
        data[p + 3] = crc & 0xff;
      }

      function adler32(data, start, end) {
        let a = 1;
        let b = 0;

        for (let i = start; i < end; ++i) {
          a = (a + (data[i] & 0xff)) % 65521;
          b = (b + a) % 65521;
        }

        return b << 16 | a;
      }

      function deflateSync(literals) {
        if (!_is_node.isNodeJS) {
          return deflateSyncUncompressed(literals);
        }

        try {
          let input;

          if (parseInt(process.versions.node) >= 8) {
            input = literals;
          } else {
            input = Buffer.from(literals);
          }

          const output = require("zlib").deflateSync(input, {
            level: 9
          });

          return output instanceof Uint8Array ? output : new Uint8Array(output);
        } catch (e) {
          (0, _util.warn)("Not compressing PNG because zlib.deflateSync is unavailable: " + e);
        }

        return deflateSyncUncompressed(literals);
      }

      function deflateSyncUncompressed(literals) {
        let len = literals.length;
        const maxBlockLength = 0xffff;
        const deflateBlocks = Math.ceil(len / maxBlockLength);
        const idat = new Uint8Array(2 + len + deflateBlocks * 5 + 4);
        let pi = 0;
        idat[pi++] = 0x78;
        idat[pi++] = 0x9c;
        let pos = 0;

        while (len > maxBlockLength) {
          idat[pi++] = 0x00;
          idat[pi++] = 0xff;
          idat[pi++] = 0xff;
          idat[pi++] = 0x00;
          idat[pi++] = 0x00;
          idat.set(literals.subarray(pos, pos + maxBlockLength), pi);
          pi += maxBlockLength;
          pos += maxBlockLength;
          len -= maxBlockLength;
        }

        idat[pi++] = 0x01;
        idat[pi++] = len & 0xff;
        idat[pi++] = len >> 8 & 0xff;
        idat[pi++] = ~len & 0xffff & 0xff;
        idat[pi++] = (~len & 0xffff) >> 8 & 0xff;
        idat.set(literals.subarray(pos), pi);
        pi += literals.length - pos;
        const adler = adler32(literals, 0, literals.length);
        idat[pi++] = adler >> 24 & 0xff;
        idat[pi++] = adler >> 16 & 0xff;
        idat[pi++] = adler >> 8 & 0xff;
        idat[pi++] = adler & 0xff;
        return idat;
      }

      function encode(imgData, kind, forceDataSchema, isMask) {
        const width = imgData.width;
        const height = imgData.height;
        let bitDepth, colorType, lineSize;
        const bytes = imgData.data;

        switch (kind) {
          case _util.ImageKind.GRAYSCALE_1BPP:
            colorType = 0;
            bitDepth = 1;
            lineSize = width + 7 >> 3;
            break;

          case _util.ImageKind.RGB_24BPP:
            colorType = 2;
            bitDepth = 8;
            lineSize = width * 3;
            break;

          case _util.ImageKind.RGBA_32BPP:
            colorType = 6;
            bitDepth = 8;
            lineSize = width * 4;
            break;

          default:
            throw new Error("invalid format");
        }

        const literals = new Uint8Array((1 + lineSize) * height);
        let offsetLiterals = 0,
            offsetBytes = 0;

        for (let y = 0; y < height; ++y) {
          literals[offsetLiterals++] = 0;
          literals.set(bytes.subarray(offsetBytes, offsetBytes + lineSize), offsetLiterals);
          offsetBytes += lineSize;
          offsetLiterals += lineSize;
        }

        if (kind === _util.ImageKind.GRAYSCALE_1BPP && isMask) {
          offsetLiterals = 0;

          for (let y = 0; y < height; y++) {
            offsetLiterals++;

            for (let i = 0; i < lineSize; i++) {
              literals[offsetLiterals++] ^= 0xff;
            }
          }
        }

        const ihdr = new Uint8Array([width >> 24 & 0xff, width >> 16 & 0xff, width >> 8 & 0xff, width & 0xff, height >> 24 & 0xff, height >> 16 & 0xff, height >> 8 & 0xff, height & 0xff, bitDepth, colorType, 0x00, 0x00, 0x00]);
        const idat = deflateSync(literals);
        const pngLength = PNG_HEADER.length + CHUNK_WRAPPER_SIZE * 3 + ihdr.length + idat.length;
        const data = new Uint8Array(pngLength);
        let offset = 0;
        data.set(PNG_HEADER, offset);
        offset += PNG_HEADER.length;
        writePngChunk("IHDR", ihdr, data, offset);
        offset += CHUNK_WRAPPER_SIZE + ihdr.length;
        writePngChunk("IDATA", idat, data, offset);
        offset += CHUNK_WRAPPER_SIZE + idat.length;
        writePngChunk("IEND", new Uint8Array(0), data, offset);
        return (0, _util.createObjectURL)(data, "image/png", forceDataSchema);
      }

      return function convertImgDataToPng(imgData, forceDataSchema, isMask) {
        const kind = imgData.kind === undefined ? _util.ImageKind.GRAYSCALE_1BPP : imgData.kind;
        return encode(imgData, kind, forceDataSchema, isMask);
      };
    }();

    class SVGExtraState {
      constructor() {
        this.fontSizeScale = 1;
        this.fontWeight = SVG_DEFAULTS.fontWeight;
        this.fontSize = 0;
        this.textMatrix = _util.IDENTITY_MATRIX;
        this.fontMatrix = _util.FONT_IDENTITY_MATRIX;
        this.leading = 0;
        this.textRenderingMode = _util.TextRenderingMode.FILL;
        this.textMatrixScale = 1;
        this.x = 0;
        this.y = 0;
        this.lineX = 0;
        this.lineY = 0;
        this.charSpacing = 0;
        this.wordSpacing = 0;
        this.textHScale = 1;
        this.textRise = 0;
        this.fillColor = SVG_DEFAULTS.fillColor;
        this.strokeColor = "#000000";
        this.fillAlpha = 1;
        this.strokeAlpha = 1;
        this.lineWidth = 1;
        this.lineJoin = "";
        this.lineCap = "";
        this.miterLimit = 0;
        this.dashArray = [];
        this.dashPhase = 0;
        this.dependencies = [];
        this.activeClipUrl = null;
        this.clipGroup = null;
        this.maskId = "";
      }

      clone() {
        return Object.create(this);
      }

      setCurrentPoint(x, y) {
        this.x = x;
        this.y = y;
      }

    }

    function opListToTree(opList) {
      let opTree = [];
      const tmp = [];

      for (const opListElement of opList) {
        if (opListElement.fn === "save") {
          opTree.push({
            fnId: 92,
            fn: "group",
            items: []
          });
          tmp.push(opTree);
          opTree = opTree[opTree.length - 1].items;
          continue;
        }

        if (opListElement.fn === "restore") {
          opTree = tmp.pop();
        } else {
          opTree.push(opListElement);
        }
      }

      return opTree;
    }

    function pf(value) {
      if (Number.isInteger(value)) {
        return value.toString();
      }

      const s = value.toFixed(10);
      let i = s.length - 1;

      if (s[i] !== "0") {
        return s;
      }

      do {
        i--;
      } while (s[i] === "0");

      return s.substring(0, s[i] === "." ? i : i + 1);
    }

    function pm(m) {
      if (m[4] === 0 && m[5] === 0) {
        if (m[1] === 0 && m[2] === 0) {
          if (m[0] === 1 && m[3] === 1) {
            return "";
          }

          return `scale(${pf(m[0])} ${pf(m[3])})`;
        }

        if (m[0] === m[3] && m[1] === -m[2]) {
          const a = Math.acos(m[0]) * 180 / Math.PI;
          return `rotate(${pf(a)})`;
        }
      } else {
        if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1) {
          return `translate(${pf(m[4])} ${pf(m[5])})`;
        }
      }

      return `matrix(${pf(m[0])} ${pf(m[1])} ${pf(m[2])} ${pf(m[3])} ${pf(m[4])} ` + `${pf(m[5])})`;
    }

    let clipCount = 0;
    let maskCount = 0;
    let shadingCount = 0;
    exports.SVGGraphics = SVGGraphics = class SVGGraphics {
      constructor(commonObjs, objs, forceDataSchema = false) {
        this.svgFactory = new _display_utils.DOMSVGFactory();
        this.current = new SVGExtraState();
        this.transformMatrix = _util.IDENTITY_MATRIX;
        this.transformStack = [];
        this.extraStack = [];
        this.commonObjs = commonObjs;
        this.objs = objs;
        this.pendingClip = null;
        this.pendingEOFill = false;
        this.embedFonts = false;
        this.embeddedFonts = Object.create(null);
        this.cssStyle = null;
        this.forceDataSchema = !!forceDataSchema;
        this._operatorIdMapping = [];

        for (const op in _util.OPS) {
          this._operatorIdMapping[_util.OPS[op]] = op;
        }
      }

      save() {
        this.transformStack.push(this.transformMatrix);
        const old = this.current;
        this.extraStack.push(old);
        this.current = old.clone();
      }

      restore() {
        this.transformMatrix = this.transformStack.pop();
        this.current = this.extraStack.pop();
        this.pendingClip = null;
        this.tgrp = null;
      }

      group(items) {
        this.save();
        this.executeOpTree(items);
        this.restore();
      }

      loadDependencies(operatorList) {
        const fnArray = operatorList.fnArray;
        const argsArray = operatorList.argsArray;

        for (let i = 0, ii = fnArray.length; i < ii; i++) {
          if (fnArray[i] !== _util.OPS.dependency) {
            continue;
          }

          for (const obj of argsArray[i]) {
            const objsPool = obj.startsWith("g_") ? this.commonObjs : this.objs;
            const promise = new Promise(resolve => {
              objsPool.get(obj, resolve);
            });
            this.current.dependencies.push(promise);
          }
        }

        return Promise.all(this.current.dependencies);
      }

      transform(a, b, c, d, e, f) {
        const transformMatrix = [a, b, c, d, e, f];
        this.transformMatrix = _util.Util.transform(this.transformMatrix, transformMatrix);
        this.tgrp = null;
      }

      getSVG(operatorList, viewport) {
        this.viewport = viewport;

        const svgElement = this._initialize(viewport);

        return this.loadDependencies(operatorList).then(() => {
          this.transformMatrix = _util.IDENTITY_MATRIX;
          this.executeOpTree(this.convertOpList(operatorList));
          return svgElement;
        });
      }

      convertOpList(operatorList) {
        const operatorIdMapping = this._operatorIdMapping;
        const argsArray = operatorList.argsArray;
        const fnArray = operatorList.fnArray;
        const opList = [];

        for (let i = 0, ii = fnArray.length; i < ii; i++) {
          const fnId = fnArray[i];
          opList.push({
            fnId,
            fn: operatorIdMapping[fnId],
            args: argsArray[i]
          });
        }

        return opListToTree(opList);
      }

      executeOpTree(opTree) {
        for (const opTreeElement of opTree) {
          const fn = opTreeElement.fn;
          const fnId = opTreeElement.fnId;
          const args = opTreeElement.args;

          switch (fnId | 0) {
            case _util.OPS.beginText:
              this.beginText();
              break;

            case _util.OPS.dependency:
              break;

            case _util.OPS.setLeading:
              this.setLeading(args);
              break;

            case _util.OPS.setLeadingMoveText:
              this.setLeadingMoveText(args[0], args[1]);
              break;

            case _util.OPS.setFont:
              this.setFont(args);
              break;

            case _util.OPS.showText:
              this.showText(args[0]);
              break;

            case _util.OPS.showSpacedText:
              this.showText(args[0]);
              break;

            case _util.OPS.endText:
              this.endText();
              break;

            case _util.OPS.moveText:
              this.moveText(args[0], args[1]);
              break;

            case _util.OPS.setCharSpacing:
              this.setCharSpacing(args[0]);
              break;

            case _util.OPS.setWordSpacing:
              this.setWordSpacing(args[0]);
              break;

            case _util.OPS.setHScale:
              this.setHScale(args[0]);
              break;

            case _util.OPS.setTextMatrix:
              this.setTextMatrix(args[0], args[1], args[2], args[3], args[4], args[5]);
              break;

            case _util.OPS.setTextRise:
              this.setTextRise(args[0]);
              break;

            case _util.OPS.setTextRenderingMode:
              this.setTextRenderingMode(args[0]);
              break;

            case _util.OPS.setLineWidth:
              this.setLineWidth(args[0]);
              break;

            case _util.OPS.setLineJoin:
              this.setLineJoin(args[0]);
              break;

            case _util.OPS.setLineCap:
              this.setLineCap(args[0]);
              break;

            case _util.OPS.setMiterLimit:
              this.setMiterLimit(args[0]);
              break;

            case _util.OPS.setFillRGBColor:
              this.setFillRGBColor(args[0], args[1], args[2]);
              break;

            case _util.OPS.setStrokeRGBColor:
              this.setStrokeRGBColor(args[0], args[1], args[2]);
              break;

            case _util.OPS.setStrokeColorN:
              this.setStrokeColorN(args);
              break;

            case _util.OPS.setFillColorN:
              this.setFillColorN(args);
              break;

            case _util.OPS.shadingFill:
              this.shadingFill(args[0]);
              break;

            case _util.OPS.setDash:
              this.setDash(args[0], args[1]);
              break;

            case _util.OPS.setRenderingIntent:
              this.setRenderingIntent(args[0]);
              break;

            case _util.OPS.setFlatness:
              this.setFlatness(args[0]);
              break;

            case _util.OPS.setGState:
              this.setGState(args[0]);
              break;

            case _util.OPS.fill:
              this.fill();
              break;

            case _util.OPS.eoFill:
              this.eoFill();
              break;

            case _util.OPS.stroke:
              this.stroke();
              break;

            case _util.OPS.fillStroke:
              this.fillStroke();
              break;

            case _util.OPS.eoFillStroke:
              this.eoFillStroke();
              break;

            case _util.OPS.clip:
              this.clip("nonzero");
              break;

            case _util.OPS.eoClip:
              this.clip("evenodd");
              break;

            case _util.OPS.paintSolidColorImageMask:
              this.paintSolidColorImageMask();
              break;

            case _util.OPS.paintImageXObject:
              this.paintImageXObject(args[0]);
              break;

            case _util.OPS.paintInlineImageXObject:
              this.paintInlineImageXObject(args[0]);
              break;

            case _util.OPS.paintImageMaskXObject:
              this.paintImageMaskXObject(args[0]);
              break;

            case _util.OPS.paintFormXObjectBegin:
              this.paintFormXObjectBegin(args[0], args[1]);
              break;

            case _util.OPS.paintFormXObjectEnd:
              this.paintFormXObjectEnd();
              break;

            case _util.OPS.closePath:
              this.closePath();
              break;

            case _util.OPS.closeStroke:
              this.closeStroke();
              break;

            case _util.OPS.closeFillStroke:
              this.closeFillStroke();
              break;

            case _util.OPS.closeEOFillStroke:
              this.closeEOFillStroke();
              break;

            case _util.OPS.nextLine:
              this.nextLine();
              break;

            case _util.OPS.transform:
              this.transform(args[0], args[1], args[2], args[3], args[4], args[5]);
              break;

            case _util.OPS.constructPath:
              this.constructPath(args[0], args[1]);
              break;

            case _util.OPS.endPath:
              this.endPath();
              break;

            case 92:
              this.group(opTreeElement.items);
              break;

            default:
              (0, _util.warn)(`Unimplemented operator ${fn}`);
              break;
          }
        }
      }

      setWordSpacing(wordSpacing) {
        this.current.wordSpacing = wordSpacing;
      }

      setCharSpacing(charSpacing) {
        this.current.charSpacing = charSpacing;
      }

      nextLine() {
        this.moveText(0, this.current.leading);
      }

      setTextMatrix(a, b, c, d, e, f) {
        const current = this.current;
        current.textMatrix = current.lineMatrix = [a, b, c, d, e, f];
        current.textMatrixScale = Math.sqrt(a * a + b * b);
        current.x = current.lineX = 0;
        current.y = current.lineY = 0;
        current.xcoords = [];
        current.ycoords = [];
        current.tspan = this.svgFactory.createElement("svg:tspan");
        current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
        current.tspan.setAttributeNS(null, "font-size", `${pf(current.fontSize)}px`);
        current.tspan.setAttributeNS(null, "y", pf(-current.y));
        current.txtElement = this.svgFactory.createElement("svg:text");
        current.txtElement.appendChild(current.tspan);
      }

      beginText() {
        const current = this.current;
        current.x = current.lineX = 0;
        current.y = current.lineY = 0;
        current.textMatrix = _util.IDENTITY_MATRIX;
        current.lineMatrix = _util.IDENTITY_MATRIX;
        current.textMatrixScale = 1;
        current.tspan = this.svgFactory.createElement("svg:tspan");
        current.txtElement = this.svgFactory.createElement("svg:text");
        current.txtgrp = this.svgFactory.createElement("svg:g");
        current.xcoords = [];
        current.ycoords = [];
      }

      moveText(x, y) {
        const current = this.current;
        current.x = current.lineX += x;
        current.y = current.lineY += y;
        current.xcoords = [];
        current.ycoords = [];
        current.tspan = this.svgFactory.createElement("svg:tspan");
        current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
        current.tspan.setAttributeNS(null, "font-size", `${pf(current.fontSize)}px`);
        current.tspan.setAttributeNS(null, "y", pf(-current.y));
      }

      showText(glyphs) {
        const current = this.current;
        const font = current.font;
        const fontSize = current.fontSize;

        if (fontSize === 0) {
          return;
        }

        const fontSizeScale = current.fontSizeScale;
        const charSpacing = current.charSpacing;
        const wordSpacing = current.wordSpacing;
        const fontDirection = current.fontDirection;
        const textHScale = current.textHScale * fontDirection;
        const vertical = font.vertical;
        const spacingDir = vertical ? 1 : -1;
        const defaultVMetrics = font.defaultVMetrics;
        const widthAdvanceScale = fontSize * current.fontMatrix[0];
        let x = 0;

        for (const glyph of glyphs) {
          if (glyph === null) {
            x += fontDirection * wordSpacing;
            continue;
          } else if ((0, _util.isNum)(glyph)) {
            x += spacingDir * glyph * fontSize / 1000;
            continue;
          }

          const spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
          const character = glyph.fontChar;
          let scaledX, scaledY;
          let width = glyph.width;

          if (vertical) {
            let vx;
            const vmetric = glyph.vmetric || defaultVMetrics;
            vx = glyph.vmetric ? vmetric[1] : width * 0.5;
            vx = -vx * widthAdvanceScale;
            const vy = vmetric[2] * widthAdvanceScale;
            width = vmetric ? -vmetric[0] : width;
            scaledX = vx / fontSizeScale;
            scaledY = (x + vy) / fontSizeScale;
          } else {
            scaledX = x / fontSizeScale;
            scaledY = 0;
          }

          if (glyph.isInFont || font.missingFile) {
            current.xcoords.push(current.x + scaledX);

            if (vertical) {
              current.ycoords.push(-current.y + scaledY);
            }

            current.tspan.textContent += character;
          } else {}

          let charWidth;

          if (vertical) {
            charWidth = width * widthAdvanceScale - spacing * fontDirection;
          } else {
            charWidth = width * widthAdvanceScale + spacing * fontDirection;
          }

          x += charWidth;
        }

        current.tspan.setAttributeNS(null, "x", current.xcoords.map(pf).join(" "));

        if (vertical) {
          current.tspan.setAttributeNS(null, "y", current.ycoords.map(pf).join(" "));
        } else {
          current.tspan.setAttributeNS(null, "y", pf(-current.y));
        }

        if (vertical) {
          current.y -= x;
        } else {
          current.x += x * textHScale;
        }

        current.tspan.setAttributeNS(null, "font-family", current.fontFamily);
        current.tspan.setAttributeNS(null, "font-size", `${pf(current.fontSize)}px`);

        if (current.fontStyle !== SVG_DEFAULTS.fontStyle) {
          current.tspan.setAttributeNS(null, "font-style", current.fontStyle);
        }

        if (current.fontWeight !== SVG_DEFAULTS.fontWeight) {
          current.tspan.setAttributeNS(null, "font-weight", current.fontWeight);
        }

        const fillStrokeMode = current.textRenderingMode & _util.TextRenderingMode.FILL_STROKE_MASK;

        if (fillStrokeMode === _util.TextRenderingMode.FILL || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          if (current.fillColor !== SVG_DEFAULTS.fillColor) {
            current.tspan.setAttributeNS(null, "fill", current.fillColor);
          }

          if (current.fillAlpha < 1) {
            current.tspan.setAttributeNS(null, "fill-opacity", current.fillAlpha);
          }
        } else if (current.textRenderingMode === _util.TextRenderingMode.ADD_TO_PATH) {
          current.tspan.setAttributeNS(null, "fill", "transparent");
        } else {
          current.tspan.setAttributeNS(null, "fill", "none");
        }

        if (fillStrokeMode === _util.TextRenderingMode.STROKE || fillStrokeMode === _util.TextRenderingMode.FILL_STROKE) {
          const lineWidthScale = 1 / (current.textMatrixScale || 1);

          this._setStrokeAttributes(current.tspan, lineWidthScale);
        }

        let textMatrix = current.textMatrix;

        if (current.textRise !== 0) {
          textMatrix = textMatrix.slice();
          textMatrix[5] += current.textRise;
        }

        current.txtElement.setAttributeNS(null, "transform", `${pm(textMatrix)} scale(${pf(textHScale)}, -1)`);
        current.txtElement.setAttributeNS(XML_NS, "xml:space", "preserve");
        current.txtElement.appendChild(current.tspan);
        current.txtgrp.appendChild(current.txtElement);

        this._ensureTransformGroup().appendChild(current.txtElement);
      }

      setLeadingMoveText(x, y) {
        this.setLeading(-y);
        this.moveText(x, y);
      }

      addFontStyle(fontObj) {
        if (!fontObj.data) {
          throw new Error("addFontStyle: No font data available, " + 'ensure that the "fontExtraProperties" API parameter is set.');
        }

        if (!this.cssStyle) {
          this.cssStyle = this.svgFactory.createElement("svg:style");
          this.cssStyle.setAttributeNS(null, "type", "text/css");
          this.defs.appendChild(this.cssStyle);
        }

        const url = (0, _util.createObjectURL)(fontObj.data, fontObj.mimetype, this.forceDataSchema);
        this.cssStyle.textContent += `@font-face { font-family: "${fontObj.loadedName}";` + ` src: url(${url}); }\n`;
      }

      setFont(details) {
        const current = this.current;
        const fontObj = this.commonObjs.get(details[0]);
        let size = details[1];
        current.font = fontObj;

        if (this.embedFonts && !fontObj.missingFile && !this.embeddedFonts[fontObj.loadedName]) {
          this.addFontStyle(fontObj);
          this.embeddedFonts[fontObj.loadedName] = fontObj;
        }

        current.fontMatrix = fontObj.fontMatrix || _util.FONT_IDENTITY_MATRIX;
        let bold = "normal";

        if (fontObj.black) {
          bold = "900";
        } else if (fontObj.bold) {
          bold = "bold";
        }

        const italic = fontObj.italic ? "italic" : "normal";

        if (size < 0) {
          size = -size;
          current.fontDirection = -1;
        } else {
          current.fontDirection = 1;
        }

        current.fontSize = size;
        current.fontFamily = fontObj.loadedName;
        current.fontWeight = bold;
        current.fontStyle = italic;
        current.tspan = this.svgFactory.createElement("svg:tspan");
        current.tspan.setAttributeNS(null, "y", pf(-current.y));
        current.xcoords = [];
        current.ycoords = [];
      }

      endText() {
        const current = this.current;

        if (current.textRenderingMode & _util.TextRenderingMode.ADD_TO_PATH_FLAG && current.txtElement && current.txtElement.hasChildNodes()) { // lwf
          current.element = current.txtElement;
          this.clip("nonzero");
          this.endPath();
        }
      }

      setLineWidth(width) {
        if (width > 0) {
          this.current.lineWidth = width;
        }
      }

      setLineCap(style) {
        this.current.lineCap = LINE_CAP_STYLES[style];
      }

      setLineJoin(style) {
        this.current.lineJoin = LINE_JOIN_STYLES[style];
      }

      setMiterLimit(limit) {
        this.current.miterLimit = limit;
      }

      setStrokeAlpha(strokeAlpha) {
        this.current.strokeAlpha = strokeAlpha;
      }

      setStrokeRGBColor(r, g, b) {
        this.current.strokeColor = _util.Util.makeHexColor(r, g, b);
      }

      setFillAlpha(fillAlpha) {
        this.current.fillAlpha = fillAlpha;
      }

      setFillRGBColor(r, g, b) {
        this.current.fillColor = _util.Util.makeHexColor(r, g, b);
        this.current.tspan = this.svgFactory.createElement("svg:tspan");
        this.current.xcoords = [];
        this.current.ycoords = [];
      }

      setStrokeColorN(args) {
        this.current.strokeColor = this._makeColorN_Pattern(args);
      }

      setFillColorN(args) {
        this.current.fillColor = this._makeColorN_Pattern(args);
      }

      shadingFill(args) {
        const width = this.viewport.width;
        const height = this.viewport.height;

        const inv = _util.Util.inverseTransform(this.transformMatrix);

        const bl = _util.Util.applyTransform([0, 0], inv);

        const br = _util.Util.applyTransform([0, height], inv);

        const ul = _util.Util.applyTransform([width, 0], inv);

        const ur = _util.Util.applyTransform([width, height], inv);

        const x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
        const y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
        const x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
        const y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
        const rect = this.svgFactory.createElement("svg:rect");
        rect.setAttributeNS(null, "x", x0);
        rect.setAttributeNS(null, "y", y0);
        rect.setAttributeNS(null, "width", x1 - x0);
        rect.setAttributeNS(null, "height", y1 - y0);
        rect.setAttributeNS(null, "fill", this._makeShadingPattern(args));

        if (this.current.fillAlpha < 1) {
          rect.setAttributeNS(null, "fill-opacity", this.current.fillAlpha);
        }

        this._ensureTransformGroup().appendChild(rect);
      }

      _makeColorN_Pattern(args) {
        if (args[0] === "TilingPattern") {
          return this._makeTilingPattern(args);
        }

        return this._makeShadingPattern(args);
      }

      _makeTilingPattern(args) {
        const color = args[1];
        const operatorList = args[2];
        const matrix = args[3] || _util.IDENTITY_MATRIX;
        const [x0, y0, x1, y1] = args[4];
        const xstep = args[5];
        const ystep = args[6];
        const paintType = args[7];
        const tilingId = `shading${shadingCount++}`;

        const [tx0, ty0] = _util.Util.applyTransform([x0, y0], matrix);

        const [tx1, ty1] = _util.Util.applyTransform([x1, y1], matrix);

        const [xscale, yscale] = _util.Util.singularValueDecompose2dScale(matrix);

        const txstep = xstep * xscale;
        const tystep = ystep * yscale;
        const tiling = this.svgFactory.createElement("svg:pattern");
        tiling.setAttributeNS(null, "id", tilingId);
        tiling.setAttributeNS(null, "patternUnits", "userSpaceOnUse");
        tiling.setAttributeNS(null, "width", txstep);
        tiling.setAttributeNS(null, "height", tystep);
        tiling.setAttributeNS(null, "x", `${tx0}`);
        tiling.setAttributeNS(null, "y", `${ty0}`);
        const svg = this.svg;
        const transformMatrix = this.transformMatrix;
        const fillColor = this.current.fillColor;
        const strokeColor = this.current.strokeColor;
        const bbox = this.svgFactory.create(tx1 - tx0, ty1 - ty0);
        this.svg = bbox;
        this.transformMatrix = matrix;

        if (paintType === 2) {
          const cssColor = _util.Util.makeHexColor(...color);

          this.current.fillColor = cssColor;
          this.current.strokeColor = cssColor;
        }

        this.executeOpTree(this.convertOpList(operatorList));
        this.svg = svg;
        this.transformMatrix = transformMatrix;
        this.current.fillColor = fillColor;
        this.current.strokeColor = strokeColor;
        tiling.appendChild(bbox.childNodes[0]);
        this.defs.appendChild(tiling);
        return `url(#${tilingId})`;
      }

      _makeShadingPattern(args) {
        switch (args[0]) {
          case "RadialAxial":
            const shadingId = `shading${shadingCount++}`;
            const colorStops = args[3];
            let gradient;

            switch (args[1]) {
              case "axial":
                const point0 = args[4];
                const point1 = args[5];
                gradient = this.svgFactory.createElement("svg:linearGradient");
                gradient.setAttributeNS(null, "id", shadingId);
                gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse");
                gradient.setAttributeNS(null, "x1", point0[0]);
                gradient.setAttributeNS(null, "y1", point0[1]);
                gradient.setAttributeNS(null, "x2", point1[0]);
                gradient.setAttributeNS(null, "y2", point1[1]);
                break;

              case "radial":
                const focalPoint = args[4];
                const circlePoint = args[5];
                const focalRadius = args[6];
                const circleRadius = args[7];
                gradient = this.svgFactory.createElement("svg:radialGradient");
                gradient.setAttributeNS(null, "id", shadingId);
                gradient.setAttributeNS(null, "gradientUnits", "userSpaceOnUse");
                gradient.setAttributeNS(null, "cx", circlePoint[0]);
                gradient.setAttributeNS(null, "cy", circlePoint[1]);
                gradient.setAttributeNS(null, "r", circleRadius);
                gradient.setAttributeNS(null, "fx", focalPoint[0]);
                gradient.setAttributeNS(null, "fy", focalPoint[1]);
                gradient.setAttributeNS(null, "fr", focalRadius);
                break;

              default:
                throw new Error(`Unknown RadialAxial type: ${args[1]}`);
            }

            for (const colorStop of colorStops) {
              const stop = this.svgFactory.createElement("svg:stop");
              stop.setAttributeNS(null, "offset", colorStop[0]);
              stop.setAttributeNS(null, "stop-color", colorStop[1]);
              gradient.appendChild(stop);
            }

            this.defs.appendChild(gradient);
            return `url(#${shadingId})`;

          case "Mesh":
            (0, _util.warn)("Unimplemented pattern Mesh");
            return null;

          case "Dummy":
            return "hotpink";

          default:
            throw new Error(`Unknown IR type: ${args[0]}`);
        }
      }

      setDash(dashArray, dashPhase) {
        this.current.dashArray = dashArray;
        this.current.dashPhase = dashPhase;
      }

      constructPath(ops, args) {
        const current = this.current;
        let x = current.x,
            y = current.y;
        let d = [];
        let j = 0;

        for (const op of ops) {
          switch (op | 0) {
            case _util.OPS.rectangle:
              x = args[j++];
              y = args[j++];
              const width = args[j++];
              const height = args[j++];
              const xw = x + width;
              const yh = y + height;
              d.push("M", pf(x), pf(y), "L", pf(xw), pf(y), "L", pf(xw), pf(yh), "L", pf(x), pf(yh), "Z");
              break;

            case _util.OPS.moveTo:
              x = args[j++];
              y = args[j++];
              d.push("M", pf(x), pf(y));
              break;

            case _util.OPS.lineTo:
              x = args[j++];
              y = args[j++];
              d.push("L", pf(x), pf(y));
              break;

            case _util.OPS.curveTo:
              x = args[j + 4];
              y = args[j + 5];
              d.push("C", pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]), pf(x), pf(y));
              j += 6;
              break;

            case _util.OPS.curveTo2:
              d.push("C", pf(x), pf(y), pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]));
              x = args[j + 2];
              y = args[j + 3];
              j += 4;
              break;

            case _util.OPS.curveTo3:
              x = args[j + 2];
              y = args[j + 3];
              d.push("C", pf(args[j]), pf(args[j + 1]), pf(x), pf(y), pf(x), pf(y));
              j += 4;
              break;

            case _util.OPS.closePath:
              d.push("Z");
              break;
          }
        }

        d = d.join(" ");

        if (current.path && ops.length > 0 && ops[0] !== _util.OPS.rectangle && ops[0] !== _util.OPS.moveTo) {
          d = current.path.getAttributeNS(null, "d") + d;
        } else {
          current.path = this.svgFactory.createElement("svg:path");

          this._ensureTransformGroup().appendChild(current.path);
        }

        current.path.setAttributeNS(null, "d", d);
        current.path.setAttributeNS(null, "fill", "none");
        current.element = current.path;
        current.setCurrentPoint(x, y);
      }

      endPath() {
        const current = this.current;
        current.path = null;

        if (!this.pendingClip) {
          return;
        }

        if (!current.element) {
          this.pendingClip = null;
          return;
        }

        const clipId = `clippath${clipCount++}`;
        const clipPath = this.svgFactory.createElement("svg:clipPath");
        clipPath.setAttributeNS(null, "id", clipId);
        clipPath.setAttributeNS(null, "transform", pm(this.transformMatrix));
        const clipElement = current.element.cloneNode(true);

        if (this.pendingClip === "evenodd") {
          clipElement.setAttributeNS(null, "clip-rule", "evenodd");
        } else {
          clipElement.setAttributeNS(null, "clip-rule", "nonzero");
        }

        this.pendingClip = null;
        clipPath.appendChild(clipElement);
        this.defs.appendChild(clipPath);

        if (current.activeClipUrl) {
          current.clipGroup = null;
          this.extraStack.forEach(function (prev) {
            prev.clipGroup = null;
          });
          clipPath.setAttributeNS(null, "clip-path", current.activeClipUrl);
        }

        current.activeClipUrl = `url(#${clipId})`;
        this.tgrp = null;
      }

      clip(type) {
        this.pendingClip = type;
      }

      closePath() {
        const current = this.current;

        if (current.path) {
          const d = `${current.path.getAttributeNS(null, "d")}Z`;
          current.path.setAttributeNS(null, "d", d);
        }
      }

      setLeading(leading) {
        this.current.leading = -leading;
      }

      setTextRise(textRise) {
        this.current.textRise = textRise;
      }

      setTextRenderingMode(textRenderingMode) {
        this.current.textRenderingMode = textRenderingMode;
      }

      setHScale(scale) {
        this.current.textHScale = scale / 100;
      }

      setRenderingIntent(intent) {}

      setFlatness(flatness) {}

      setGState(states) {
        for (const [key, value] of states) {
          switch (key) {
            case "LW":
              this.setLineWidth(value);
              break;

            case "LC":
              this.setLineCap(value);
              break;

            case "LJ":
              this.setLineJoin(value);
              break;

            case "ML":
              this.setMiterLimit(value);
              break;

            case "D":
              this.setDash(value[0], value[1]);
              break;

            case "RI":
              this.setRenderingIntent(value);
              break;

            case "FL":
              this.setFlatness(value);
              break;

            case "Font":
              this.setFont(value);
              break;

            case "CA":
              this.setStrokeAlpha(value);
              break;

            case "ca":
              this.setFillAlpha(value);
              break;

            default:
              (0, _util.warn)(`Unimplemented graphic state operator ${key}`);
              break;
          }
        }
      }

      fill() {
        const current = this.current;

        if (current.element) {
          current.element.setAttributeNS(null, "fill", current.fillColor);
          current.element.setAttributeNS(null, "fill-opacity", current.fillAlpha);
          this.endPath();
        }
      }

      stroke() {
        const current = this.current;

        if (current.element) {
          this._setStrokeAttributes(current.element);

          current.element.setAttributeNS(null, "fill", "none");
          this.endPath();
        }
      }

      _setStrokeAttributes(element, lineWidthScale = 1) {
        const current = this.current;
        let dashArray = current.dashArray;

        if (lineWidthScale !== 1 && dashArray.length > 0) {
          dashArray = dashArray.map(function (value) {
            return lineWidthScale * value;
          });
        }

        element.setAttributeNS(null, "stroke", current.strokeColor);
        element.setAttributeNS(null, "stroke-opacity", current.strokeAlpha);
        element.setAttributeNS(null, "stroke-miterlimit", pf(current.miterLimit));
        element.setAttributeNS(null, "stroke-linecap", current.lineCap);
        element.setAttributeNS(null, "stroke-linejoin", current.lineJoin);
        element.setAttributeNS(null, "stroke-width", pf(lineWidthScale * current.lineWidth) + "px");
        element.setAttributeNS(null, "stroke-dasharray", dashArray.map(pf).join(" "));
        element.setAttributeNS(null, "stroke-dashoffset", pf(lineWidthScale * current.dashPhase) + "px");
      }

      eoFill() {
        if (this.current.element) {
          this.current.element.setAttributeNS(null, "fill-rule", "evenodd");
        }

        this.fill();
      }

      fillStroke() {
        this.stroke();
        this.fill();
      }

      eoFillStroke() {
        if (this.current.element) {
          this.current.element.setAttributeNS(null, "fill-rule", "evenodd");
        }

        this.fillStroke();
      }

      closeStroke() {
        this.closePath();
        this.stroke();
      }

      closeFillStroke() {
        this.closePath();
        this.fillStroke();
      }

      closeEOFillStroke() {
        this.closePath();
        this.eoFillStroke();
      }

      paintSolidColorImageMask() {
        const rect = this.svgFactory.createElement("svg:rect");
        rect.setAttributeNS(null, "x", "0");
        rect.setAttributeNS(null, "y", "0");
        rect.setAttributeNS(null, "width", "1px");
        rect.setAttributeNS(null, "height", "1px");
        rect.setAttributeNS(null, "fill", this.current.fillColor);

        this._ensureTransformGroup().appendChild(rect);
      }

      paintImageXObject(objId) {
        const imgData = objId.startsWith("g_") ? this.commonObjs.get(objId) : this.objs.get(objId);

        if (!imgData) {
          (0, _util.warn)(`Dependent image with object ID ${objId} is not ready yet`);
          return;
        }

        this.paintInlineImageXObject(imgData);
      }

      paintInlineImageXObject(imgData, mask) {
        const width = imgData.width;
        const height = imgData.height;
        const imgSrc = convertImgDataToPng(imgData, this.forceDataSchema, !!mask);
        const cliprect = this.svgFactory.createElement("svg:rect");
        cliprect.setAttributeNS(null, "x", "0");
        cliprect.setAttributeNS(null, "y", "0");
        cliprect.setAttributeNS(null, "width", pf(width));
        cliprect.setAttributeNS(null, "height", pf(height));
        this.current.element = cliprect;
        this.clip("nonzero");
        const imgEl = this.svgFactory.createElement("svg:image");
        imgEl.setAttributeNS(XLINK_NS, "xlink:href", imgSrc);
        imgEl.setAttributeNS(null, "x", "0");
        imgEl.setAttributeNS(null, "y", pf(-height));
        imgEl.setAttributeNS(null, "width", pf(width) + "px");
        imgEl.setAttributeNS(null, "height", pf(height) + "px");
        imgEl.setAttributeNS(null, "transform", `scale(${pf(1 / width)} ${pf(-1 / height)})`);

        if (mask) {
          mask.appendChild(imgEl);
        } else {
          this._ensureTransformGroup().appendChild(imgEl);
        }
      }

      paintImageMaskXObject(imgData) {
        const current = this.current;
        const width = imgData.width;
        const height = imgData.height;
        const fillColor = current.fillColor;
        current.maskId = `mask${maskCount++}`;
        const mask = this.svgFactory.createElement("svg:mask");
        mask.setAttributeNS(null, "id", current.maskId);
        const rect = this.svgFactory.createElement("svg:rect");
        rect.setAttributeNS(null, "x", "0");
        rect.setAttributeNS(null, "y", "0");
        rect.setAttributeNS(null, "width", pf(width));
        rect.setAttributeNS(null, "height", pf(height));
        rect.setAttributeNS(null, "fill", fillColor);
        rect.setAttributeNS(null, "mask", `url(#${current.maskId})`);
        this.defs.appendChild(mask);

        this._ensureTransformGroup().appendChild(rect);

        this.paintInlineImageXObject(imgData, mask);
      }

      paintFormXObjectBegin(matrix, bbox) {
        if (Array.isArray(matrix) && matrix.length === 6) {
          this.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
        }

        if (bbox) {
          const width = bbox[2] - bbox[0];
          const height = bbox[3] - bbox[1];
          const cliprect = this.svgFactory.createElement("svg:rect");
          cliprect.setAttributeNS(null, "x", bbox[0]);
          cliprect.setAttributeNS(null, "y", bbox[1]);
          cliprect.setAttributeNS(null, "width", pf(width));
          cliprect.setAttributeNS(null, "height", pf(height));
          this.current.element = cliprect;
          this.clip("nonzero");
          this.endPath();
        }
      }

      paintFormXObjectEnd() {}

      _initialize(viewport) {
        const svg = this.svgFactory.create(viewport.width, viewport.height);
        const definitions = this.svgFactory.createElement("svg:defs");
        svg.appendChild(definitions);
        this.defs = definitions;
        const rootGroup = this.svgFactory.createElement("svg:g");
        rootGroup.setAttributeNS(null, "transform", pm(viewport.transform));
        svg.appendChild(rootGroup);
        this.svg = rootGroup;
        return svg;
      }

      _ensureClipGroup() {
        if (!this.current.clipGroup) {
          const clipGroup = this.svgFactory.createElement("svg:g");
          clipGroup.setAttributeNS(null, "clip-path", this.current.activeClipUrl);
          this.svg.appendChild(clipGroup);
          this.current.clipGroup = clipGroup;
        }

        return this.current.clipGroup;
      }

      _ensureTransformGroup() {
        if (!this.tgrp) {
          this.tgrp = this.svgFactory.createElement("svg:g");
          this.tgrp.setAttributeNS(null, "transform", pm(this.transformMatrix));

          if (this.current.activeClipUrl) {
            this._ensureClipGroup().appendChild(this.tgrp);
          } else {
            this.svg.appendChild(this.tgrp);
          }
        }

        return this.tgrp;
      }

    };
  }

  /***/ }),
  /* 23 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.PDFNodeStream = void 0;

  var _util = __w_pdfjs_require__(2);

  var _network_utils = __w_pdfjs_require__(24);

  ;

  const fs = require("fs");

  const http = require("http");

  const https = require("https");

  const url = require("url");

  const fileUriRegex = /^file:\/\/\/[a-zA-Z]:\//;

  function parseUrl(sourceUrl) {
    const parsedUrl = url.parse(sourceUrl);

    if (parsedUrl.protocol === "file:" || parsedUrl.host) {
      return parsedUrl;
    }

    if (/^[a-z]:[/\\]/i.test(sourceUrl)) {
      return url.parse(`file:///${sourceUrl}`);
    }

    if (!parsedUrl.host) {
      parsedUrl.protocol = "file:";
    }

    return parsedUrl;
  }

  class PDFNodeStream {
    constructor(source) {
      this.source = source;
      this.url = parseUrl(source.url);
      this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:";
      this.isFsUrl = this.url.protocol === "file:";
      this.httpHeaders = this.isHttp && source.httpHeaders || {};
      this._fullRequestReader = null;
      this._rangeRequestReaders = [];
    }

    get _progressiveDataLength() {
      return this._fullRequestReader && this._fullRequestReader._loaded || 0; // lwf
    }

    getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once.");
      this._fullRequestReader = this.isFsUrl ? new PDFNodeStreamFsFullReader(this) : new PDFNodeStreamFullReader(this);
      return this._fullRequestReader;
    }

    getRangeReader(start, end) {
      if (end <= this._progressiveDataLength) {
        return null;
      }

      const rangeReader = this.isFsUrl ? new PDFNodeStreamFsRangeReader(this, start, end) : new PDFNodeStreamRangeReader(this, start, end);

      this._rangeRequestReaders.push(rangeReader);

      return rangeReader;
    }

    cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      const readers = this._rangeRequestReaders.slice(0);

      readers.forEach(function (reader) {
        reader.cancel(reason);
      });
    }

  }

  exports.PDFNodeStream = PDFNodeStream;

  class BaseFullReader {
    constructor(stream) {
      this._url = stream.url;
      this._done = false;
      this._storedError = null;
      this.onProgress = null;
      const source = stream.source;
      this._contentLength = source.length;
      this._loaded = 0;
      this._filename = null;
      this._disableRange = source.disableRange || false;
      this._rangeChunkSize = source.rangeChunkSize;

      if (!this._rangeChunkSize && !this._disableRange) {
        this._disableRange = true;
      }

      this._isStreamingSupported = !source.disableStream;
      this._isRangeSupported = !source.disableRange;
      this._readableStream = null;
      this._readCapability = (0, _util.createPromiseCapability)();
      this._headersCapability = (0, _util.createPromiseCapability)();
    }

    get headersReady() {
      return this._headersCapability.promise;
    }

    get filename() {
      return this._filename;
    }

    get contentLength() {
      return this._contentLength;
    }

    get isRangeSupported() {
      return this._isRangeSupported;
    }

    get isStreamingSupported() {
      return this._isStreamingSupported;
    }

    async read() {
      await this._readCapability.promise;

      if (this._done) {
        return {
          value: undefined,
          done: true
        };
      }

      if (this._storedError) {
        throw this._storedError;
      }

      const chunk = this._readableStream.read();

      if (chunk === null) {
        this._readCapability = (0, _util.createPromiseCapability)();
        return this.read();
      }

      this._loaded += chunk.length;

      if (this.onProgress) {
        this.onProgress({
          loaded: this._loaded,
          total: this._contentLength
        });
      }

      const buffer = new Uint8Array(chunk).buffer;
      return {
        value: buffer,
        done: false
      };
    }

    cancel(reason) {
      if (!this._readableStream) {
        this._error(reason);

        return;
      }

      this._readableStream.destroy(reason);
    }

    _error(reason) {
      this._storedError = reason;

      this._readCapability.resolve();
    }

    _setReadableStream(readableStream) {
      this._readableStream = readableStream;
      readableStream.on("readable", () => {
        this._readCapability.resolve();
      });
      readableStream.on("end", () => {
        readableStream.destroy();
        this._done = true;

        this._readCapability.resolve();
      });
      readableStream.on("error", reason => {
        this._error(reason);
      });

      if (!this._isStreamingSupported && this._isRangeSupported) {
        this._error(new _util.AbortException("streaming is disabled"));
      }

      if (this._storedError) {
        this._readableStream.destroy(this._storedError);
      }
    }

  }

  class BaseRangeReader {
    constructor(stream) {
      this._url = stream.url;
      this._done = false;
      this._storedError = null;
      this.onProgress = null;
      this._loaded = 0;
      this._readableStream = null;
      this._readCapability = (0, _util.createPromiseCapability)();
      const source = stream.source;
      this._isStreamingSupported = !source.disableStream;
    }

    get isStreamingSupported() {
      return this._isStreamingSupported;
    }

    async read() {
      await this._readCapability.promise;

      if (this._done) {
        return {
          value: undefined,
          done: true
        };
      }

      if (this._storedError) {
        throw this._storedError;
      }

      const chunk = this._readableStream.read();

      if (chunk === null) {
        this._readCapability = (0, _util.createPromiseCapability)();
        return this.read();
      }

      this._loaded += chunk.length;

      if (this.onProgress) {
        this.onProgress({
          loaded: this._loaded
        });
      }

      const buffer = new Uint8Array(chunk).buffer;
      return {
        value: buffer,
        done: false
      };
    }

    cancel(reason) {
      if (!this._readableStream) {
        this._error(reason);

        return;
      }

      this._readableStream.destroy(reason);
    }

    _error(reason) {
      this._storedError = reason;

      this._readCapability.resolve();
    }

    _setReadableStream(readableStream) {
      this._readableStream = readableStream;
      readableStream.on("readable", () => {
        this._readCapability.resolve();
      });
      readableStream.on("end", () => {
        readableStream.destroy();
        this._done = true;

        this._readCapability.resolve();
      });
      readableStream.on("error", reason => {
        this._error(reason);
      });

      if (this._storedError) {
        this._readableStream.destroy(this._storedError);
      }
    }

  }

  function createRequestOptions(parsedUrl, headers) {
    return {
      protocol: parsedUrl.protocol,
      auth: parsedUrl.auth,
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.path,
      method: "GET",
      headers
    };
  }

  class PDFNodeStreamFullReader extends BaseFullReader {
    constructor(stream) {
      super(stream);

      const handleResponse = response => {
        if (response.statusCode === 404) {
          const error = new _util.MissingPDFException(`Missing PDF "${this._url}".`);
          this._storedError = error;

          this._headersCapability.reject(error);

          return;
        }

        this._headersCapability.resolve();

        this._setReadableStream(response);

        const getResponseHeader = name => {
          return this._readableStream.headers[name.toLowerCase()];
        };

        const {
          allowRangeRequests,
          suggestedLength
        } = (0, _network_utils.validateRangeRequestCapabilities)({
          getResponseHeader,
          isHttp: stream.isHttp,
          rangeChunkSize: this._rangeChunkSize,
          disableRange: this._disableRange
        });
        this._isRangeSupported = allowRangeRequests;
        this._contentLength = suggestedLength || this._contentLength;
        this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);
      };

      this._request = null;

      if (this._url.protocol === "http:") {
        this._request = http.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
      } else {
        this._request = https.request(createRequestOptions(this._url, stream.httpHeaders), handleResponse);
      }

      this._request.on("error", reason => {
        this._storedError = reason;

        this._headersCapability.reject(reason);
      });

      this._request.end();
    }

  }

  class PDFNodeStreamRangeReader extends BaseRangeReader {
    constructor(stream, start, end) {
      super(stream);
      this._httpHeaders = {};

      for (const property in stream.httpHeaders) {
        const value = stream.httpHeaders[property];

        if (typeof value === "undefined") {
          continue;
        }

        this._httpHeaders[property] = value;
      }

      this._httpHeaders.Range = `bytes=${start}-${end - 1}`;

      const handleResponse = response => {
        if (response.statusCode === 404) {
          const error = new _util.MissingPDFException(`Missing PDF "${this._url}".`);
          this._storedError = error;
          return;
        }

        this._setReadableStream(response);
      };

      this._request = null;

      if (this._url.protocol === "http:") {
        this._request = http.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
      } else {
        this._request = https.request(createRequestOptions(this._url, this._httpHeaders), handleResponse);
      }

      this._request.on("error", reason => {
        this._storedError = reason;
      });

      this._request.end();
    }

  }

  class PDFNodeStreamFsFullReader extends BaseFullReader {
    constructor(stream) {
      super(stream);
      let path = decodeURIComponent(this._url.path);

      if (fileUriRegex.test(this._url.href)) {
        path = path.replace(/^\//, "");
      }

      fs.lstat(path, (error, stat) => {
        if (error) {
          if (error.code === "ENOENT") {
            error = new _util.MissingPDFException(`Missing PDF "${path}".`);
          }

          this._storedError = error;

          this._headersCapability.reject(error);

          return;
        }

        this._contentLength = stat.size;

        this._setReadableStream(fs.createReadStream(path));

        this._headersCapability.resolve();
      });
    }

  }

  class PDFNodeStreamFsRangeReader extends BaseRangeReader {
    constructor(stream, start, end) {
      super(stream);
      let path = decodeURIComponent(this._url.path);

      if (fileUriRegex.test(this._url.href)) {
        path = path.replace(/^\//, "");
      }

      this._setReadableStream(fs.createReadStream(path, {
        start,
        end: end - 1
      }));
    }

  }

  /***/ }),
  /* 24 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.createResponseStatusError = createResponseStatusError;
  exports.extractFilenameFromHeader = extractFilenameFromHeader;
  exports.validateRangeRequestCapabilities = validateRangeRequestCapabilities;
  exports.validateResponseStatus = validateResponseStatus;

  var _util = __w_pdfjs_require__(2);

  var _content_disposition = __w_pdfjs_require__(25);

  function validateRangeRequestCapabilities({
    getResponseHeader,
    isHttp,
    rangeChunkSize,
    disableRange
  }) {
    (0, _util.assert)(rangeChunkSize > 0, "Range chunk size must be larger than zero");
    const returnValues = {
      allowRangeRequests: false,
      suggestedLength: undefined
    };
    const length = parseInt(getResponseHeader("Content-Length"), 10);

    if (!Number.isInteger(length)) {
      return returnValues;
    }

    returnValues.suggestedLength = length;

    if (length <= 2 * rangeChunkSize) {
      return returnValues;
    }

    if (disableRange || !isHttp) {
      return returnValues;
    }

    if (getResponseHeader("Accept-Ranges") !== "bytes") {
      return returnValues;
    }

    const contentEncoding = getResponseHeader("Content-Encoding") || "identity";

    if (contentEncoding !== "identity") {
      return returnValues;
    }

    returnValues.allowRangeRequests = true;
    return returnValues;
  }

  function extractFilenameFromHeader(getResponseHeader) {
    const contentDisposition = getResponseHeader("Content-Disposition");

    if (contentDisposition) {
      let filename = (0, _content_disposition.getFilenameFromContentDispositionHeader)(contentDisposition);

      if (filename.includes("%")) {
        try {
          filename = decodeURIComponent(filename);
        } catch (ex) {}
      }

      if (/\.pdf$/i.test(filename)) {
        return filename;
      }
    }

    return null;
  }

  function createResponseStatusError(status, url) {
    if (status === 404 || status === 0 && url.startsWith("file:")) {
      return new _util.MissingPDFException('Missing PDF "' + url + '".');
    }

    return new _util.UnexpectedResponseException("Unexpected server response (" + status + ') while retrieving PDF "' + url + '".', status);
  }

  function validateResponseStatus(status) {
    return status === 200 || status === 206;
  }

  /***/ }),
  /* 25 */
  /***/ ((__unused_webpack_module, exports) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.getFilenameFromContentDispositionHeader = getFilenameFromContentDispositionHeader;

  function getFilenameFromContentDispositionHeader(contentDisposition) {
    let needsEncodingFixup = true;
    let tmp = toParamRegExp("filename\\*", "i").exec(contentDisposition);

    if (tmp) {
      tmp = tmp[1];
      let filename = rfc2616unquote(tmp);
      filename = unescape(filename);
      filename = rfc5987decode(filename);
      filename = rfc2047decode(filename);
      return fixupEncoding(filename);
    }

    tmp = rfc2231getparam(contentDisposition);

    if (tmp) {
      const filename = rfc2047decode(tmp);
      return fixupEncoding(filename);
    }

    tmp = toParamRegExp("filename", "i").exec(contentDisposition);

    if (tmp) {
      tmp = tmp[1];
      let filename = rfc2616unquote(tmp);
      filename = rfc2047decode(filename);
      return fixupEncoding(filename);
    }

    function toParamRegExp(attributePattern, flags) {
      return new RegExp("(?:^|;)\\s*" + attributePattern + "\\s*=\\s*" + "(" + '[^";\\s][^;\\s]*' + "|" + '"(?:[^"\\\\]|\\\\"?)+"?' + ")", flags);
    }

    function textdecode(encoding, value) {
      if (encoding) {
        if (!/^[\x00-\xFF]+$/.test(value)) {
          return value;
        }

        try {
          const decoder = new TextDecoder(encoding, {
            fatal: true
          });
          const bytes = Array.from(value, function (ch) {
            return ch.charCodeAt(0) & 0xff;
          });
          value = decoder.decode(new Uint8Array(bytes));
          needsEncodingFixup = false;
        } catch (e) {
          if (/^utf-?8$/i.test(encoding)) {
            try {
              value = decodeURIComponent(escape(value));
              needsEncodingFixup = false;
            } catch (err) {}
          }
        }
      }

      return value;
    }

    function fixupEncoding(value) {
      if (needsEncodingFixup && /[\x80-\xff]/.test(value)) {
        value = textdecode("utf-8", value);

        if (needsEncodingFixup) {
          value = textdecode("iso-8859-1", value);
        }
      }

      return value;
    }

    function rfc2231getparam(contentDispositionStr) {
      const matches = [];
      let match;
      const iter = toParamRegExp("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");

      while ((match = iter.exec(contentDispositionStr)) !== null) {
        let [, n, quot, part] = match;
        n = parseInt(n, 10);

        if (n in matches) {
          if (n === 0) {
            break;
          }

          continue;
        }

        matches[n] = [quot, part];
      }

      const parts = [];

      for (let n = 0; n < matches.length; ++n) {
        if (!(n in matches)) {
          break;
        }

        let [quot, part] = matches[n];
        part = rfc2616unquote(part);

        if (quot) {
          part = unescape(part);

          if (n === 0) {
            part = rfc5987decode(part);
          }
        }

        parts.push(part);
      }

      return parts.join("");
    }

    function rfc2616unquote(value) {
      if (value.startsWith('"')) {
        const parts = value.slice(1).split('\\"');

        for (let i = 0; i < parts.length; ++i) {
          const quotindex = parts[i].indexOf('"');

          if (quotindex !== -1) {
            parts[i] = parts[i].slice(0, quotindex);
            parts.length = i + 1;
          }

          parts[i] = parts[i].replace(/\\(.)/g, "$1");
        }

        value = parts.join('"');
      }

      return value;
    }

    function rfc5987decode(extvalue) {
      const encodingend = extvalue.indexOf("'");

      if (encodingend === -1) {
        return extvalue;
      }

      const encoding = extvalue.slice(0, encodingend);
      const langvalue = extvalue.slice(encodingend + 1);
      const value = langvalue.replace(/^[^']*'/, "");
      return textdecode(encoding, value);
    }

    function rfc2047decode(value) {
      if (!value.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(value)) {
        return value;
      }

      return value.replace(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function (matches, charset, encoding, text) {
        if (encoding === "q" || encoding === "Q") {
          text = text.replace(/_/g, " ");
          text = text.replace(/=([0-9a-fA-F]{2})/g, function (match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
          });
          return textdecode(charset, text);
        }

        try {
          text = atob(text);
        } catch (e) {}

        return textdecode(charset, text);
      });
    }

    return "";
  }

  /***/ }),
  /* 26 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.PDFNetworkStream = void 0;

  var _util = __w_pdfjs_require__(2);

  var _network_utils = __w_pdfjs_require__(24);

  ;
  const OK_RESPONSE = 200;
  const PARTIAL_CONTENT_RESPONSE = 206;

  function getArrayBuffer(xhr) {
    const data = xhr.response;

    if (typeof data !== "string") {
      return data;
    }

    const array = (0, _util.stringToBytes)(data);
    return array.buffer;
  }

  class NetworkManager {
    constructor(url, args) {
      this.url = url;
      args = args || {};
      this.isHttp = /^https?:/i.test(url);
      this.httpHeaders = this.isHttp && args.httpHeaders || {};
      this.withCredentials = args.withCredentials || false;

      this.getXhr = args.getXhr || function NetworkManager_getXhr() {
        return new XMLHttpRequest();
      };

      this.currXhrId = 0;
      this.pendingRequests = Object.create(null);
    }

    requestRange(begin, end, listeners) {
      const args = {
        begin,
        end
      };

      for (const prop in listeners) {
        args[prop] = listeners[prop];
      }

      return this.request(args);
    }

    requestFull(listeners) {
      return this.request(listeners);
    }

    request(args) {
      const xhr = this.getXhr();
      const xhrId = this.currXhrId++;
      const pendingRequest = this.pendingRequests[xhrId] = {
        xhr
      };
      xhr.open("GET", this.url);
      xhr.withCredentials = this.withCredentials;

      for (const property in this.httpHeaders) {
        const value = this.httpHeaders[property];

        if (typeof value === "undefined") {
          continue;
        }

        xhr.setRequestHeader(property, value);
      }

      if (this.isHttp && "begin" in args && "end" in args) {
        xhr.setRequestHeader("Range", `bytes=${args.begin}-${args.end - 1}`);
        pendingRequest.expectedStatus = PARTIAL_CONTENT_RESPONSE;
      } else {
        pendingRequest.expectedStatus = OK_RESPONSE;
      }

      xhr.responseType = "arraybuffer";

      if (args.onError) {
        xhr.onerror = function (evt) {
          args.onError(xhr.status);
        };
      }

      xhr.onreadystatechange = this.onStateChange.bind(this, xhrId);
      xhr.onprogress = this.onProgress.bind(this, xhrId);
      pendingRequest.onHeadersReceived = args.onHeadersReceived;
      pendingRequest.onDone = args.onDone;
      pendingRequest.onError = args.onError;
      pendingRequest.onProgress = args.onProgress;
      xhr.send(null);
      return xhrId;
    }

    onProgress(xhrId, evt) {
      const pendingRequest = this.pendingRequests[xhrId];

      if (!pendingRequest) {
        return;
      }

      if (pendingRequest.onProgress) {
        pendingRequest.onProgress(evt);
      }
    }

    onStateChange(xhrId, evt) {
      const pendingRequest = this.pendingRequests[xhrId];

      if (!pendingRequest) {
        return;
      }

      const xhr = pendingRequest.xhr;

      if (xhr.readyState >= 2 && pendingRequest.onHeadersReceived) {
        pendingRequest.onHeadersReceived();
        delete pendingRequest.onHeadersReceived;
      }

      if (xhr.readyState !== 4) {
        return;
      }

      if (!(xhrId in this.pendingRequests)) {
        return;
      }

      delete this.pendingRequests[xhrId];

      if (xhr.status === 0 && this.isHttp) {
        if (pendingRequest.onError) {
          pendingRequest.onError(xhr.status);
        }

        return;
      }

      const xhrStatus = xhr.status || OK_RESPONSE;
      const ok_response_on_range_request = xhrStatus === OK_RESPONSE && pendingRequest.expectedStatus === PARTIAL_CONTENT_RESPONSE;

      if (!ok_response_on_range_request && xhrStatus !== pendingRequest.expectedStatus) {
        if (pendingRequest.onError) {
          pendingRequest.onError(xhr.status);
        }

        return;
      }

      const chunk = getArrayBuffer(xhr);

      if (xhrStatus === PARTIAL_CONTENT_RESPONSE) {
        const rangeHeader = xhr.getResponseHeader("Content-Range");
        const matches = /bytes (\d+)-(\d+)\/(\d+)/.exec(rangeHeader);
        pendingRequest.onDone({
          begin: parseInt(matches[1], 10),
          chunk
        });
      } else if (chunk) {
        pendingRequest.onDone({
          begin: 0,
          chunk
        });
      } else if (pendingRequest.onError) {
        pendingRequest.onError(xhr.status);
      }
    }

    getRequestXhr(xhrId) {
      return this.pendingRequests[xhrId].xhr;
    }

    isPendingRequest(xhrId) {
      return xhrId in this.pendingRequests;
    }

    abortRequest(xhrId) {
      const xhr = this.pendingRequests[xhrId].xhr;
      delete this.pendingRequests[xhrId];
      xhr.abort();
    }

  }

  class PDFNetworkStream {
    constructor(source) {
      this._source = source;
      this._manager = new NetworkManager(source.url, {
        httpHeaders: source.httpHeaders,
        withCredentials: source.withCredentials
      });
      this._rangeChunkSize = source.rangeChunkSize;
      this._fullRequestReader = null;
      this._rangeRequestReaders = [];
    }

    _onRangeRequestReaderClosed(reader) {
      const i = this._rangeRequestReaders.indexOf(reader);

      if (i >= 0) {
        this._rangeRequestReaders.splice(i, 1);
      }
    }

    getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once.");
      this._fullRequestReader = new PDFNetworkStreamFullRequestReader(this._manager, this._source);
      return this._fullRequestReader;
    }

    getRangeReader(begin, end) {
      const reader = new PDFNetworkStreamRangeRequestReader(this._manager, begin, end);
      reader.onClosed = this._onRangeRequestReaderClosed.bind(this);

      this._rangeRequestReaders.push(reader);

      return reader;
    }

    cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      const readers = this._rangeRequestReaders.slice(0);

      readers.forEach(function (reader) {
        reader.cancel(reason);
      });
    }

  }

  exports.PDFNetworkStream = PDFNetworkStream;

  class PDFNetworkStreamFullRequestReader {
    constructor(manager, source) {
      this._manager = manager;
      const args = {
        onHeadersReceived: this._onHeadersReceived.bind(this),
        onDone: this._onDone.bind(this),
        onError: this._onError.bind(this),
        onProgress: this._onProgress.bind(this)
      };
      this._url = source.url;
      this._fullRequestId = manager.requestFull(args);
      this._headersReceivedCapability = (0, _util.createPromiseCapability)();
      this._disableRange = source.disableRange || false;
      this._contentLength = source.length;
      this._rangeChunkSize = source.rangeChunkSize;

      if (!this._rangeChunkSize && !this._disableRange) {
        this._disableRange = true;
      }

      this._isStreamingSupported = false;
      this._isRangeSupported = false;
      this._cachedChunks = [];
      this._requests = [];
      this._done = false;
      this._storedError = undefined;
      this._filename = null;
      this.onProgress = null;
    }

    _onHeadersReceived() {
      const fullRequestXhrId = this._fullRequestId;

      const fullRequestXhr = this._manager.getRequestXhr(fullRequestXhrId);

      const getResponseHeader = name => {
        return fullRequestXhr.getResponseHeader(name);
      };

      const {
        allowRangeRequests,
        suggestedLength
      } = (0, _network_utils.validateRangeRequestCapabilities)({
        getResponseHeader,
        isHttp: this._manager.isHttp,
        rangeChunkSize: this._rangeChunkSize,
        disableRange: this._disableRange
      });

      if (allowRangeRequests) {
        this._isRangeSupported = true;
      }

      this._contentLength = suggestedLength || this._contentLength;
      this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);

      if (this._isRangeSupported) {
        this._manager.abortRequest(fullRequestXhrId);
      }

      this._headersReceivedCapability.resolve();
    }

    _onDone(args) {
      if (args) {
        if (this._requests.length > 0) {
          const requestCapability = this._requests.shift();

          requestCapability.resolve({
            value: args.chunk,
            done: false
          });
        } else {
          this._cachedChunks.push(args.chunk);
        }
      }

      this._done = true;

      if (this._cachedChunks.length > 0) {
        return;
      }

      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });

      this._requests = [];
    }

    _onError(status) {
      const url = this._url;
      const exception = (0, _network_utils.createResponseStatusError)(status, url);
      this._storedError = exception;

      this._headersReceivedCapability.reject(exception);

      this._requests.forEach(function (requestCapability) {
        requestCapability.reject(exception);
      });

      this._requests = [];
      this._cachedChunks = [];
    }

    _onProgress(data) {
      if (this.onProgress) {
        this.onProgress({
          loaded: data.loaded,
          total: data.lengthComputable ? data.total : this._contentLength
        });
      }
    }

    get filename() {
      return this._filename;
    }

    get isRangeSupported() {
      return this._isRangeSupported;
    }

    get isStreamingSupported() {
      return this._isStreamingSupported;
    }

    get contentLength() {
      return this._contentLength;
    }

    get headersReady() {
      return this._headersReceivedCapability.promise;
    }

    async read() {
      if (this._storedError) {
        throw this._storedError;
      }

      if (this._cachedChunks.length > 0) {
        const chunk = this._cachedChunks.shift();

        return {
          value: chunk,
          done: false
        };
      }

      if (this._done) {
        return {
          value: undefined,
          done: true
        };
      }

      const requestCapability = (0, _util.createPromiseCapability)();

      this._requests.push(requestCapability);

      return requestCapability.promise;
    }

    cancel(reason) {
      this._done = true;

      this._headersReceivedCapability.reject(reason);

      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });

      this._requests = [];

      if (this._manager.isPendingRequest(this._fullRequestId)) {
        this._manager.abortRequest(this._fullRequestId);
      }

      this._fullRequestReader = null;
    }

  }

  class PDFNetworkStreamRangeRequestReader {
    constructor(manager, begin, end) {
      this._manager = manager;
      const args = {
        onDone: this._onDone.bind(this),
        onProgress: this._onProgress.bind(this)
      };
      this._requestId = manager.requestRange(begin, end, args);
      this._requests = [];
      this._queuedChunk = null;
      this._done = false;
      this.onProgress = null;
      this.onClosed = null;
    }

    _close() {
      if (this.onClosed) {
        this.onClosed(this);
      }
    }

    _onDone(data) {
      const chunk = data.chunk;

      if (this._requests.length > 0) {
        const requestCapability = this._requests.shift();

        requestCapability.resolve({
          value: chunk,
          done: false
        });
      } else {
        this._queuedChunk = chunk;
      }

      this._done = true;

      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });

      this._requests = [];

      this._close();
    }

    _onProgress(evt) {
      if (!this.isStreamingSupported && this.onProgress) {
        this.onProgress({
          loaded: evt.loaded
        });
      }
    }

    get isStreamingSupported() {
      return false;
    }

    async read() {
      if (this._queuedChunk !== null) {
        const chunk = this._queuedChunk;
        this._queuedChunk = null;
        return {
          value: chunk,
          done: false
        };
      }

      if (this._done) {
        return {
          value: undefined,
          done: true
        };
      }

      const requestCapability = (0, _util.createPromiseCapability)();

      this._requests.push(requestCapability);

      return requestCapability.promise;
    }

    cancel(reason) {
      this._done = true;

      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });

      this._requests = [];

      if (this._manager.isPendingRequest(this._requestId)) {
        this._manager.abortRequest(this._requestId);
      }

      this._close();
    }

  }

  /***/ }),
  /* 27 */
  /***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



  Object.defineProperty(exports, "__esModule", ({
    value: true
  }));
  exports.PDFFetchStream = void 0;

  var _util = __w_pdfjs_require__(2);

  var _network_utils = __w_pdfjs_require__(24);

  ;

  function createFetchOptions(headers, withCredentials, abortController) {
    return {
      method: "GET",
      headers,
      signal: abortController && abortController.signal, // lwf
      mode: "cors",
      credentials: withCredentials ? "include" : "same-origin",
      redirect: "follow"
    };
  }

  function createHeaders(httpHeaders) {
    const headers = new Headers();

    for (const property in httpHeaders) {
      const value = httpHeaders[property];

      if (typeof value === "undefined") {
        continue;
      }

      headers.append(property, value);
    }

    return headers;
  }

  class PDFFetchStream {
    constructor(source) {
      this.source = source;
      this.isHttp = /^https?:/i.test(source.url);
      this.httpHeaders = this.isHttp && source.httpHeaders || {};
      this._fullRequestReader = null;
      this._rangeRequestReaders = [];
    }

    get _progressiveDataLength() {
      return this._fullRequestReader && this._fullRequestReader._loaded || 0; // lwf
    }

    getFullReader() {
      (0, _util.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once.");
      this._fullRequestReader = new PDFFetchStreamReader(this);
      return this._fullRequestReader;
    }

    getRangeReader(begin, end) {
      if (end <= this._progressiveDataLength) {
        return null;
      }

      const reader = new PDFFetchStreamRangeReader(this, begin, end);

      this._rangeRequestReaders.push(reader);

      return reader;
    }

    cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      const readers = this._rangeRequestReaders.slice(0);

      readers.forEach(function (reader) {
        reader.cancel(reason);
      });
    }

  }

  exports.PDFFetchStream = PDFFetchStream;

  class PDFFetchStreamReader {
    constructor(stream) {
      this._stream = stream;
      this._reader = null;
      this._loaded = 0;
      this._filename = null;
      const source = stream.source;
      this._withCredentials = source.withCredentials || false;
      this._contentLength = source.length;
      this._headersCapability = (0, _util.createPromiseCapability)();
      this._disableRange = source.disableRange || false;
      this._rangeChunkSize = source.rangeChunkSize;

      if (!this._rangeChunkSize && !this._disableRange) {
        this._disableRange = true;
      }

      if (typeof AbortController !== "undefined") {
        this._abortController = new AbortController();
      }

      this._isStreamingSupported = !source.disableStream;
      this._isRangeSupported = !source.disableRange;
      this._headers = createHeaders(this._stream.httpHeaders);
      const url = source.url;
      fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then(response => {
        if (!(0, _network_utils.validateResponseStatus)(response.status)) {
          throw (0, _network_utils.createResponseStatusError)(response.status, url);
        }

        this._reader = response.body.getReader();

        this._headersCapability.resolve();

        const getResponseHeader = name => {
          return response.headers.get(name);
        };

        const {
          allowRangeRequests,
          suggestedLength
        } = (0, _network_utils.validateRangeRequestCapabilities)({
          getResponseHeader,
          isHttp: this._stream.isHttp,
          rangeChunkSize: this._rangeChunkSize,
          disableRange: this._disableRange
        });
        this._isRangeSupported = allowRangeRequests;
        this._contentLength = suggestedLength || this._contentLength;
        this._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);

        if (!this._isStreamingSupported && this._isRangeSupported) {
          this.cancel(new _util.AbortException("Streaming is disabled."));
        }
      }).catch(this._headersCapability.reject);
      this.onProgress = null;
    }

    get headersReady() {
      return this._headersCapability.promise;
    }

    get filename() {
      return this._filename;
    }

    get contentLength() {
      return this._contentLength;
    }

    get isRangeSupported() {
      return this._isRangeSupported;
    }

    get isStreamingSupported() {
      return this._isStreamingSupported;
    }

    async read() {
      await this._headersCapability.promise;
      const {
        value,
        done
      } = await this._reader.read();

      if (done) {
        return {
          value,
          done
        };
      }

      this._loaded += value.byteLength;

      if (this.onProgress) {
        this.onProgress({
          loaded: this._loaded,
          total: this._contentLength
        });
      }

      const buffer = new Uint8Array(value).buffer;
      return {
        value: buffer,
        done: false
      };
    }

    cancel(reason) {
      if (this._reader) {
        this._reader.cancel(reason);
      }

      if (this._abortController) {
        this._abortController.abort();
      }
    }

  }

  class PDFFetchStreamRangeReader {
    constructor(stream, begin, end) {
      this._stream = stream;
      this._reader = null;
      this._loaded = 0;
      const source = stream.source;
      this._withCredentials = source.withCredentials || false;
      this._readCapability = (0, _util.createPromiseCapability)();
      this._isStreamingSupported = !source.disableStream;

      if (typeof AbortController !== "undefined") {
        this._abortController = new AbortController();
      }

      this._headers = createHeaders(this._stream.httpHeaders);

      this._headers.append("Range", `bytes=${begin}-${end - 1}`);

      const url = source.url;
      fetch(url, createFetchOptions(this._headers, this._withCredentials, this._abortController)).then(response => {
        if (!(0, _network_utils.validateResponseStatus)(response.status)) {
          throw (0, _network_utils.createResponseStatusError)(response.status, url);
        }

        this._readCapability.resolve();

        this._reader = response.body.getReader();
      }).catch(reason => {
        if (reason && reason.name === "AbortError") { // lwf
          return;
        }

        throw reason;
      });
      this.onProgress = null;
    }

    get isStreamingSupported() {
      return this._isStreamingSupported;
    }

    async read() {
      await this._readCapability.promise;
      const {
        value,
        done
      } = await this._reader.read();

      if (done) {
        return {
          value,
          done
        };
      }

      this._loaded += value.byteLength;

      if (this.onProgress) {
        this.onProgress({
          loaded: this._loaded
        });
      }

      const buffer = new Uint8Array(value).buffer;
      return {
        value: buffer,
        done: false
      };
    }

    cancel(reason) {
      if (this._reader) {
        this._reader.cancel(reason);
      }

      if (this._abortController) {
        this._abortController.abort();
      }
    }

  }
/***/ })
/******/  ]);
/************************************************************************/
/******/  // The module cache
/******/  var __webpack_module_cache__ = {};
/******/  
/******/  // The require function
/******/  function __w_pdfjs_require__(moduleId) {
/******/    // Check if module is in cache
/******/    if(__webpack_module_cache__[moduleId]) {
/******/      return __webpack_module_cache__[moduleId].exports;
/******/    }
/******/    // Create a new module (and put it into the cache)
/******/    var module = __webpack_module_cache__[moduleId] = {
/******/      // no module.id needed
/******/      // no module.loaded needed
/******/      exports: {}
/******/    };
/******/  
/******/    // Execute the module function
/******/    __webpack_modules__[moduleId](module, module.exports, __w_pdfjs_require__);
/******/  
/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }
/******/  
/************************************************************************/
/******/  // module exports must be returned from runtime so entry inlining is disabled
/******/  // startup
/******/  // Load entry module and return exports
/******/  return __w_pdfjs_require__(0);
/******/ })()
;
});

define('skylark-pdfjs-display/main',[
	"./display"
],function(display) {
	return display;
});
define('skylark-pdfjs-display', ['skylark-pdfjs-display/main'], function (main) { return main; });

define('skylark-pdfjs-viewer/viewer',[
  "skylark-pdfjs-display"
],function(pdfjsLib){

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "PDFViewerApplicationOptions", ({
  enumerable: true,
  get: function () {
    return _app_options.AppOptions;
  }
}));
Object.defineProperty(exports, "PDFViewerApplication", ({
  enumerable: true,
  get: function () {
    return _app.PDFViewerApplication;
  }
}));

var _app_options = __webpack_require__(1);

var _app = __webpack_require__(3);

const pdfjsVersion = '2.7.570';
const pdfjsBuild = 'f2c7338b0';
window.PDFViewerApplication = _app.PDFViewerApplication;
window.PDFViewerApplicationOptions = _app_options.AppOptions;
;
;
{
  __webpack_require__(35);
}
;
{
  __webpack_require__(41);
}

function getViewerConfiguration() {
  return {
    appContainer: document.body,
    mainContainer: document.getElementById("viewerContainer"),
    viewerContainer: document.getElementById("viewer"),
    eventBus: null,
    toolbar: {
      container: document.getElementById("toolbarViewer"),
      numPages: document.getElementById("numPages"),
      pageNumber: document.getElementById("pageNumber"),
      scaleSelectContainer: document.getElementById("scaleSelectContainer"),
      scaleSelect: document.getElementById("scaleSelect"),
      customScaleOption: document.getElementById("customScaleOption"),
      previous: document.getElementById("previous"),
      next: document.getElementById("next"),
      zoomIn: document.getElementById("zoomIn"),
      zoomOut: document.getElementById("zoomOut"),
      viewFind: document.getElementById("viewFind"),
      openFile: document.getElementById("openFile"),
      print: document.getElementById("print"),
      presentationModeButton: document.getElementById("presentationMode"),
      download: document.getElementById("download"),
      viewBookmark: document.getElementById("viewBookmark")
    },
    secondaryToolbar: {
      toolbar: document.getElementById("secondaryToolbar"),
      toggleButton: document.getElementById("secondaryToolbarToggle"),
      toolbarButtonContainer: document.getElementById("secondaryToolbarButtonContainer"),
      presentationModeButton: document.getElementById("secondaryPresentationMode"),
      openFileButton: document.getElementById("secondaryOpenFile"),
      printButton: document.getElementById("secondaryPrint"),
      downloadButton: document.getElementById("secondaryDownload"),
      viewBookmarkButton: document.getElementById("secondaryViewBookmark"),
      firstPageButton: document.getElementById("firstPage"),
      lastPageButton: document.getElementById("lastPage"),
      pageRotateCwButton: document.getElementById("pageRotateCw"),
      pageRotateCcwButton: document.getElementById("pageRotateCcw"),
      cursorSelectToolButton: document.getElementById("cursorSelectTool"),
      cursorHandToolButton: document.getElementById("cursorHandTool"),
      scrollVerticalButton: document.getElementById("scrollVertical"),
      scrollHorizontalButton: document.getElementById("scrollHorizontal"),
      scrollWrappedButton: document.getElementById("scrollWrapped"),
      spreadNoneButton: document.getElementById("spreadNone"),
      spreadOddButton: document.getElementById("spreadOdd"),
      spreadEvenButton: document.getElementById("spreadEven"),
      documentPropertiesButton: document.getElementById("documentProperties")
    },
    fullscreen: {
      contextFirstPage: document.getElementById("contextFirstPage"),
      contextLastPage: document.getElementById("contextLastPage"),
      contextPageRotateCw: document.getElementById("contextPageRotateCw"),
      contextPageRotateCcw: document.getElementById("contextPageRotateCcw")
    },
    sidebar: {
      outerContainer: document.getElementById("outerContainer"),
      viewerContainer: document.getElementById("viewerContainer"),
      toggleButton: document.getElementById("sidebarToggle"),
      thumbnailButton: document.getElementById("viewThumbnail"),
      outlineButton: document.getElementById("viewOutline"),
      attachmentsButton: document.getElementById("viewAttachments"),
      layersButton: document.getElementById("viewLayers"),
      thumbnailView: document.getElementById("thumbnailView"),
      outlineView: document.getElementById("outlineView"),
      attachmentsView: document.getElementById("attachmentsView"),
      layersView: document.getElementById("layersView"),
      outlineOptionsContainer: document.getElementById("outlineOptionsContainer"),
      currentOutlineItemButton: document.getElementById("currentOutlineItem")
    },
    sidebarResizer: {
      outerContainer: document.getElementById("outerContainer"),
      resizer: document.getElementById("sidebarResizer")
    },
    findBar: {
      bar: document.getElementById("findbar"),
      toggleButton: document.getElementById("viewFind"),
      findField: document.getElementById("findInput"),
      highlightAllCheckbox: document.getElementById("findHighlightAll"),
      caseSensitiveCheckbox: document.getElementById("findMatchCase"),
      entireWordCheckbox: document.getElementById("findEntireWord"),
      findMsg: document.getElementById("findMsg"),
      findResultsCount: document.getElementById("findResultsCount"),
      findPreviousButton: document.getElementById("findPrevious"),
      findNextButton: document.getElementById("findNext")
    },
    passwordOverlay: {
      overlayName: "passwordOverlay",
      container: document.getElementById("passwordOverlay"),
      label: document.getElementById("passwordText"),
      input: document.getElementById("password"),
      submitButton: document.getElementById("passwordSubmit"),
      cancelButton: document.getElementById("passwordCancel")
    },
    documentProperties: {
      overlayName: "documentPropertiesOverlay",
      container: document.getElementById("documentPropertiesOverlay"),
      closeButton: document.getElementById("documentPropertiesClose"),
      fields: {
        fileName: document.getElementById("fileNameField"),
        fileSize: document.getElementById("fileSizeField"),
        title: document.getElementById("titleField"),
        author: document.getElementById("authorField"),
        subject: document.getElementById("subjectField"),
        keywords: document.getElementById("keywordsField"),
        creationDate: document.getElementById("creationDateField"),
        modificationDate: document.getElementById("modificationDateField"),
        creator: document.getElementById("creatorField"),
        producer: document.getElementById("producerField"),
        version: document.getElementById("versionField"),
        pageCount: document.getElementById("pageCountField"),
        pageSize: document.getElementById("pageSizeField"),
        linearized: document.getElementById("linearizedField")
      }
    },
    errorWrapper: {
      container: document.getElementById("errorWrapper"),
      errorMessage: document.getElementById("errorMessage"),
      closeButton: document.getElementById("errorClose"),
      errorMoreInfo: document.getElementById("errorMoreInfo"),
      moreInfoButton: document.getElementById("errorShowMore"),
      lessInfoButton: document.getElementById("errorShowLess")
    },
    printContainer: document.getElementById("printContainer"),
    openFileInputName: "fileInput",
    debuggerScriptPath: "./debugger.js"
  };
}

function webViewerLoad() {
  const config = getViewerConfiguration();
  const event = document.createEvent("CustomEvent");
  event.initCustomEvent("webviewerloaded", true, true, {
    source: window
  });

  try {
    parent.document.dispatchEvent(event);
  } catch (ex) {
    console.error(`webviewerloaded: ${ex}`);
    document.dispatchEvent(event);
  }

  _app.PDFViewerApplication.run(config);
}

if (document.readyState === "interactive" || document.readyState === "complete") {
  webViewerLoad();
} else {
  document.addEventListener("DOMContentLoaded", webViewerLoad, true);
}

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OptionKind = exports.AppOptions = void 0;

var _viewer_compatibility = __webpack_require__(2);

const OptionKind = {
  VIEWER: 0x02,
  API: 0x04,
  WORKER: 0x08,
  PREFERENCE: 0x80
};
exports.OptionKind = OptionKind;
const defaultOptions = {
  cursorToolOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  defaultUrl: {
    value: "compressed.tracemonkey-pldi-09.pdf",
    kind: OptionKind.VIEWER
  },
  defaultZoomValue: {
    value: "",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  disableHistory: {
    value: false,
    kind: OptionKind.VIEWER
  },
  disablePageLabels: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePermissions: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enablePrintAutoRotate: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableScripting: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  enableWebGL: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  externalLinkRel: {
    value: "noopener noreferrer nofollow",
    kind: OptionKind.VIEWER
  },
  externalLinkTarget: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  historyUpdateUrl: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  ignoreDestinationZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  imageResourcesPath: {
    value: "./images/",
    kind: OptionKind.VIEWER
  },
  maxCanvasPixels: {
    value: 16777216,
    compatibility: _viewer_compatibility.viewerCompatibilityParams.maxCanvasPixels,
    kind: OptionKind.VIEWER
  },
  pdfBugEnabled: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  printResolution: {
    value: 150,
    kind: OptionKind.VIEWER
  },
  renderer: {
    value: "canvas",
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  renderInteractiveForms: {
    value: true,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  sidebarViewOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  scrollModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  spreadModeOnLoad: {
    value: -1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  textLayerMode: {
    value: 1,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  useOnlyCssZoom: {
    value: false,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  viewerCssTheme: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  viewOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER + OptionKind.PREFERENCE
  },
  cMapPacked: {
    value: true,
    kind: OptionKind.API
  },
  cMapUrl: {
    value: "../web/cmaps/",
    kind: OptionKind.API
  },
  disableAutoFetch: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableFontFace: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableRange: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  disableStream: {
    value: false,
    kind: OptionKind.API + OptionKind.PREFERENCE
  },
  docBaseUrl: {
    value: "",
    kind: OptionKind.API
  },
  fontExtraProperties: {
    value: false,
    kind: OptionKind.API
  },
  isEvalSupported: {
    value: true,
    kind: OptionKind.API
  },
  maxImageSize: {
    value: -1,
    kind: OptionKind.API
  },
  pdfBug: {
    value: false,
    kind: OptionKind.API
  },
  verbosity: {
    value: 1,
    kind: OptionKind.API
  },
  workerPort: {
    value: null,
    kind: OptionKind.WORKER
  },
  workerSrc: {
    value: "skylark-pdfjs-worker-all.js", //"../build/pdf.worker.js",
    kind: OptionKind.WORKER
  }
};
{
  defaultOptions.disablePreferences = {
    value: false,
    kind: OptionKind.VIEWER
  };
  defaultOptions.locale = {
    value: typeof navigator !== "undefined" ? navigator.language : "en-US",
    kind: OptionKind.VIEWER
  };
  defaultOptions.sandboxBundleSrc = {
    value: "../build/pdf.sandbox.js",
    kind: OptionKind.VIEWER
  };
}
const userOptions = Object.create(null);

class AppOptions {
  constructor() {
    throw new Error("Cannot initialize AppOptions.");
  }

  static get(name) {
    const userOption = userOptions[name];

    if (userOption !== undefined) {
      return userOption;
    }

    const defaultOption = defaultOptions[name];

    if (defaultOption !== undefined) {
      return defaultOption.compatibility || defaultOption.value;
    }

    return undefined;
  }

  static getAll(kind = null) {
    const options = Object.create(null);

    for (const name in defaultOptions) {
      const defaultOption = defaultOptions[name];

      if (kind) {
        if ((kind & defaultOption.kind) === 0) {
          continue;
        }

        if (kind === OptionKind.PREFERENCE) {
          const value = defaultOption.value,
                valueType = typeof value;

          if (valueType === "boolean" || valueType === "string" || valueType === "number" && Number.isInteger(value)) {
            options[name] = value;
            continue;
          }

          throw new Error(`Invalid type for preference: ${name}`);
        }
      }

      const userOption = userOptions[name];
      options[name] = userOption !== undefined ? userOption : defaultOption.compatibility || defaultOption.value;
    }

    return options;
  }

  static set(name, value) {
    userOptions[name] = value;
  }

  static setAll(options) {
    for (const name in options) {
      userOptions[name] = options[name];
    }
  }

  static remove(name) {
    delete userOptions[name];
  }

}

exports.AppOptions = AppOptions;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.viewerCompatibilityParams = void 0;
const compatibilityParams = Object.create(null);
{
  const userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
  const platform = typeof navigator !== "undefined" && navigator.platform || "";
  const maxTouchPoints = typeof navigator !== "undefined" && navigator.maxTouchPoints || 1;
  const isAndroid = /Android/.test(userAgent);
  const isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) || platform === "MacIntel" && maxTouchPoints > 1;
  const isIOSChrome = /CriOS/.test(userAgent);

  (function checkOnBlobSupport() {
    if (isIOSChrome) {
      compatibilityParams.disableCreateObjectURL = true;
    }
  })();

  (function checkCanvasSizeLimitation() {
    if (isIOS || isAndroid) {
      compatibilityParams.maxCanvasPixels = 5242880;
    }
  })();
}
const viewerCompatibilityParams = Object.freeze(compatibilityParams);
exports.viewerCompatibilityParams = viewerCompatibilityParams;

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFViewerApplication = exports.PDFPrintServiceFactory = exports.DefaultExternalServices = void 0;

var _ui_utils = __webpack_require__(4);

var _app_options = __webpack_require__(1);

var _pdfjsLib = __webpack_require__(5);

var _pdf_cursor_tools = __webpack_require__(6);

var _pdf_rendering_queue = __webpack_require__(8);

var _overlay_manager = __webpack_require__(9);

var _password_prompt = __webpack_require__(10);

var _pdf_attachment_viewer = __webpack_require__(11);

var _pdf_document_properties = __webpack_require__(13);

var _pdf_find_bar = __webpack_require__(14);

var _pdf_find_controller = __webpack_require__(15);

var _pdf_history = __webpack_require__(17);

var _pdf_layer_viewer = __webpack_require__(18);

var _pdf_link_service = __webpack_require__(19);

var _pdf_outline_viewer = __webpack_require__(20);

var _pdf_presentation_mode = __webpack_require__(21);

var _pdf_sidebar = __webpack_require__(22);

var _pdf_sidebar_resizer = __webpack_require__(23);

var _pdf_thumbnail_viewer = __webpack_require__(24);

var _pdf_viewer = __webpack_require__(26);

var _secondary_toolbar = __webpack_require__(31);

var _toolbar = __webpack_require__(33);

var _viewer_compatibility = __webpack_require__(2);

var _view_history = __webpack_require__(34);

const DEFAULT_SCALE_DELTA = 1.1;
const DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
const FORCE_PAGES_LOADED_TIMEOUT = 10000;
const WHEEL_ZOOM_DISABLED_TIMEOUT = 1000;
const ENABLE_PERMISSIONS_CLASS = "enablePermissions";
const ViewOnLoad = {
  UNKNOWN: -1,
  PREVIOUS: 0,
  INITIAL: 1
};
const ViewerCssTheme = {
  AUTOMATIC: 0,
  LIGHT: 1,
  DARK: 2
};
const KNOWN_VERSIONS = ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0", "2.1", "2.2", "2.3"];
const KNOWN_GENERATORS = ["acrobat distiller", "acrobat pdfwriter", "adobe livecycle", "adobe pdf library", "adobe photoshop", "ghostscript", "tcpdf", "cairo", "dvipdfm", "dvips", "pdftex", "pdfkit", "itext", "prince", "quarkxpress", "mac os x", "microsoft", "openoffice", "oracle", "luradocument", "pdf-xchange", "antenna house", "aspose.cells", "fpdf"];

class DefaultExternalServices {
  constructor() {
    throw new Error("Cannot initialize DefaultExternalServices.");
  }

  static updateFindControlState(data) {}

  static updateFindMatchesCount(data) {}

  static initPassiveLoading(callbacks) {}

  static async fallback(data) {}

  static reportTelemetry(data) {}

  static createDownloadManager(options) {
    throw new Error("Not implemented: createDownloadManager");
  }

  static createPreferences() {
    throw new Error("Not implemented: createPreferences");
  }

  static createL10n(options) {
    throw new Error("Not implemented: createL10n");
  }

  static createScripting(options) {
    throw new Error("Not implemented: createScripting");
  }

  static get supportsIntegratedFind() {
    return (0, _pdfjsLib.shadow)(this, "supportsIntegratedFind", false);
  }

  static get supportsDocumentFonts() {
    return (0, _pdfjsLib.shadow)(this, "supportsDocumentFonts", true);
  }

  static get supportedMouseWheelZoomModifierKeys() {
    return (0, _pdfjsLib.shadow)(this, "supportedMouseWheelZoomModifierKeys", {
      ctrlKey: true,
      metaKey: true
    });
  }

  static get isInAutomation() {
    return (0, _pdfjsLib.shadow)(this, "isInAutomation", false);
  }

}

exports.DefaultExternalServices = DefaultExternalServices;
const PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  _initializedCapability: (0, _pdfjsLib.createPromiseCapability)(),
  fellback: false,
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfSidebarResizer: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  pdfLayerViewer: null,
  pdfCursorTools: null,
  store: null,
  downloadManager: null,
  overlayManager: null,
  preferences: null,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  l10n: null,
  isInitialViewSet: false,
  downloadComplete: false,
  isViewerEmbedded: window.parent !== window,
  url: "",
  baseUrl: "",
  externalServices: DefaultExternalServices,
  _boundEvents: Object.create(null),
  documentInfo: null,
  metadata: null,
  _contentDispositionFilename: null,
  _contentLength: null,
  triggerDelayedFallback: null,
  _saveInProgress: false,
  _wheelUnusedTicks: 0,
  _idleCallbacks: new Set(),
  _scriptingInstance: null,
  _mouseState: Object.create(null),

  async initialize(appConfig) {
    this.preferences = this.externalServices.createPreferences();
    this.appConfig = appConfig;
    await this._readPreferences();
    await this._parseHashParameters();

    this._forceCssTheme();

    await this._initializeL10n();

    if (this.isViewerEmbedded && _app_options.AppOptions.get("externalLinkTarget") === _pdfjsLib.LinkTarget.NONE) {
      _app_options.AppOptions.set("externalLinkTarget", _pdfjsLib.LinkTarget.TOP);
    }

    await this._initializeViewerComponents();
    this.bindEvents();
    this.bindWindowEvents();
    const appContainer = appConfig.appContainer || document.documentElement;
    this.l10n.translate(appContainer).then(() => {
      this.eventBus.dispatch("localized", {
        source: this
      });
    });

    this._initializedCapability.resolve();
  },

  async _readPreferences() {
    if (_app_options.AppOptions.get("disablePreferences")) {
      return;
    }

    try {
      _app_options.AppOptions.setAll(await this.preferences.getAll());
    } catch (reason) {
      console.error(`_readPreferences: "${reason && reason.message}".`); // reason?.message // modified by lwf
    }
  },

  async _parseHashParameters() {
    if (!_app_options.AppOptions.get("pdfBugEnabled")) {
      return undefined;
    }

    const hash = document.location.hash.substring(1);

    if (!hash) {
      return undefined;
    }

    const hashParams = (0, _ui_utils.parseQueryString)(hash),
          waitOn = [];

    if ("disableworker" in hashParams && hashParams.disableworker === "true") {
      waitOn.push(loadFakeWorker());
    }

    if ("disablerange" in hashParams) {
      _app_options.AppOptions.set("disableRange", hashParams.disablerange === "true");
    }

    if ("disablestream" in hashParams) {
      _app_options.AppOptions.set("disableStream", hashParams.disablestream === "true");
    }

    if ("disableautofetch" in hashParams) {
      _app_options.AppOptions.set("disableAutoFetch", hashParams.disableautofetch === "true");
    }

    if ("disablefontface" in hashParams) {
      _app_options.AppOptions.set("disableFontFace", hashParams.disablefontface === "true");
    }

    if ("disablehistory" in hashParams) {
      _app_options.AppOptions.set("disableHistory", hashParams.disablehistory === "true");
    }

    if ("webgl" in hashParams) {
      _app_options.AppOptions.set("enableWebGL", hashParams.webgl === "true");
    }

    if ("verbosity" in hashParams) {
      _app_options.AppOptions.set("verbosity", hashParams.verbosity | 0);
    }

    if ("textlayer" in hashParams) {
      switch (hashParams.textlayer) {
        case "off":
          _app_options.AppOptions.set("textLayerMode", _ui_utils.TextLayerMode.DISABLE);

          break;

        case "visible":
        case "shadow":
        case "hover":
          const viewer = this.appConfig.viewerContainer;
          viewer.classList.add("textLayer-" + hashParams.textlayer);
          break;
      }
    }

    if ("pdfbug" in hashParams) {
      _app_options.AppOptions.set("pdfBug", true);

      _app_options.AppOptions.set("fontExtraProperties", true);

      const enabled = hashParams.pdfbug.split(",");
      waitOn.push(loadAndEnablePDFBug(enabled));
    }

    if ("locale" in hashParams) {
      _app_options.AppOptions.set("locale", hashParams.locale);
    }

    if (waitOn.length === 0) {
      return undefined;
    }

    return Promise.all(waitOn).catch(reason => {
      console.error(`_parseHashParameters: "${reason.message}".`);
    });
  },

  async _initializeL10n() {
    this.l10n = this.externalServices.createL10n({
      locale: _app_options.AppOptions.get("locale")
    });
    const dir = await this.l10n.getDirection();
    document.getElementsByTagName("html")[0].dir = dir;
  },

  _forceCssTheme() {
    const cssTheme = _app_options.AppOptions.get("viewerCssTheme");

    if (cssTheme === ViewerCssTheme.AUTOMATIC || !Object.values(ViewerCssTheme).includes(cssTheme)) {
      return;
    }

    try {
      const styleSheet = document.styleSheets[0];
      const cssRules = styleSheet && styleSheet.cssRules || []; //styleSheet?.cssRules modified by lwf

      for (let i = 0, ii = cssRules.length; i < ii; i++) {
        const rule = cssRules[i];

        if (rule instanceof CSSMediaRule && rule.media && rule.media[0] === "(prefers-color-scheme: dark)") { //rule.media?.[0] modified by lwf
          if (cssTheme === ViewerCssTheme.LIGHT) {
            styleSheet.deleteRule(i);
            return;
          }

          const darkRules = /^@media \(prefers-color-scheme: dark\) {\n\s*([\w\s-.,:;/\\{}()]+)\n}$/.exec(rule.cssText);

          if (darkRules && darkRule[1]) { //darkRules?.[1] modified by lwf
            styleSheet.deleteRule(i);
            styleSheet.insertRule(darkRules[1], i);
          }

          return;
        }
      }
    } catch (reason) {
      console.error(`_forceCssTheme: "${reason && reason.message}".`); //reason?.message  modified by lwf
    }
  },

  async _initializeViewerComponents() {
    const appConfig = this.appConfig;
    const eventBus = appConfig.eventBus || new _ui_utils.EventBus({
      isInAutomation: this.externalServices.isInAutomation
    });
    this.eventBus = eventBus;
    this.overlayManager = new _overlay_manager.OverlayManager();
    const pdfRenderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
    pdfRenderingQueue.onIdle = this.cleanup.bind(this);
    this.pdfRenderingQueue = pdfRenderingQueue;
    const pdfLinkService = new _pdf_link_service.PDFLinkService({
      eventBus,
      externalLinkTarget: _app_options.AppOptions.get("externalLinkTarget"),
      externalLinkRel: _app_options.AppOptions.get("externalLinkRel"),
      ignoreDestinationZoom: _app_options.AppOptions.get("ignoreDestinationZoom")
    });
    this.pdfLinkService = pdfLinkService;
    const downloadManager = this.externalServices.createDownloadManager();
    this.downloadManager = downloadManager;
    const findController = new _pdf_find_controller.PDFFindController({
      linkService: pdfLinkService,
      eventBus
    });
    this.findController = findController;
    const container = appConfig.mainContainer;
    const viewer = appConfig.viewerContainer;
    this.pdfViewer = new _pdf_viewer.PDFViewer({
      container,
      viewer,
      eventBus,
      renderingQueue: pdfRenderingQueue,
      linkService: pdfLinkService,
      downloadManager,
      findController,
      renderer: _app_options.AppOptions.get("renderer"),
      enableWebGL: _app_options.AppOptions.get("enableWebGL"),
      l10n: this.l10n,
      textLayerMode: _app_options.AppOptions.get("textLayerMode"),
      imageResourcesPath: _app_options.AppOptions.get("imageResourcesPath"),
      renderInteractiveForms: _app_options.AppOptions.get("renderInteractiveForms"),
      enablePrintAutoRotate: _app_options.AppOptions.get("enablePrintAutoRotate"),
      useOnlyCssZoom: _app_options.AppOptions.get("useOnlyCssZoom"),
      maxCanvasPixels: _app_options.AppOptions.get("maxCanvasPixels"),
      enableScripting: _app_options.AppOptions.get("enableScripting"),
      mouseState: this._mouseState
    });
    pdfRenderingQueue.setViewer(this.pdfViewer);
    pdfLinkService.setViewer(this.pdfViewer);
    this.pdfThumbnailViewer = new _pdf_thumbnail_viewer.PDFThumbnailViewer({
      container: appConfig.sidebar.thumbnailView,
      eventBus,
      renderingQueue: pdfRenderingQueue,
      linkService: pdfLinkService,
      l10n: this.l10n
    });
    pdfRenderingQueue.setThumbnailViewer(this.pdfThumbnailViewer);
    this.pdfHistory = new _pdf_history.PDFHistory({
      linkService: pdfLinkService,
      eventBus
    });
    pdfLinkService.setHistory(this.pdfHistory);

    if (!this.supportsIntegratedFind) {
      this.findBar = new _pdf_find_bar.PDFFindBar(appConfig.findBar, eventBus, this.l10n);
    }

    this.pdfDocumentProperties = new _pdf_document_properties.PDFDocumentProperties(appConfig.documentProperties, this.overlayManager, eventBus, this.l10n);
    this.pdfCursorTools = new _pdf_cursor_tools.PDFCursorTools({
      container,
      eventBus,
      cursorToolOnLoad: _app_options.AppOptions.get("cursorToolOnLoad")
    });
    this.toolbar = new _toolbar.Toolbar(appConfig.toolbar, eventBus, this.l10n);
    this.secondaryToolbar = new _secondary_toolbar.SecondaryToolbar(appConfig.secondaryToolbar, container, eventBus);

    if (this.supportsFullscreen) {
      this.pdfPresentationMode = new _pdf_presentation_mode.PDFPresentationMode({
        container,
        pdfViewer: this.pdfViewer,
        eventBus,
        contextMenuItems: appConfig.fullscreen
      });
    }

    this.passwordPrompt = new _password_prompt.PasswordPrompt(appConfig.passwordOverlay, this.overlayManager, this.l10n);
    this.pdfOutlineViewer = new _pdf_outline_viewer.PDFOutlineViewer({
      container: appConfig.sidebar.outlineView,
      eventBus,
      linkService: pdfLinkService
    });
    this.pdfAttachmentViewer = new _pdf_attachment_viewer.PDFAttachmentViewer({
      container: appConfig.sidebar.attachmentsView,
      eventBus,
      downloadManager
    });
    this.pdfLayerViewer = new _pdf_layer_viewer.PDFLayerViewer({
      container: appConfig.sidebar.layersView,
      eventBus,
      l10n: this.l10n
    });
    this.pdfSidebar = new _pdf_sidebar.PDFSidebar({
      elements: appConfig.sidebar,
      pdfViewer: this.pdfViewer,
      pdfThumbnailViewer: this.pdfThumbnailViewer,
      eventBus,
      l10n: this.l10n
    });
    this.pdfSidebar.onToggled = this.forceRendering.bind(this);
    this.pdfSidebarResizer = new _pdf_sidebar_resizer.PDFSidebarResizer(appConfig.sidebarResizer, eventBus, this.l10n);
  },

  run(config) {
    this.initialize(config).then(webViewerInitialized);
  },

  get initialized() {
    return this._initializedCapability.settled;
  },

  get initializedPromise() {
    return this._initializedCapability.promise;
  },

  zoomIn(ticks) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    let newScale = this.pdfViewer.currentScale;

    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(_ui_utils.MAX_SCALE, newScale);
    } while (--ticks > 0 && newScale < _ui_utils.MAX_SCALE);

    this.pdfViewer.currentScaleValue = newScale;
  },

  zoomOut(ticks) {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    let newScale = this.pdfViewer.currentScale;

    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(_ui_utils.MIN_SCALE, newScale);
    } while (--ticks > 0 && newScale > _ui_utils.MIN_SCALE);

    this.pdfViewer.currentScaleValue = newScale;
  },

  zoomReset() {
    if (this.pdfViewer.isInPresentationMode) {
      return;
    }

    this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
  },

  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },

  get page() {
    return this.pdfViewer.currentPageNumber;
  },

  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },

  get supportsPrinting() {
    return PDFPrintServiceFactory.instance.supportsPrinting;
  },

  get supportsFullscreen() {
    let support;
    const doc = document.documentElement;
    support = !!(doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullScreen);

    if (document.fullscreenEnabled === false || document.mozFullScreenEnabled === false || document.webkitFullscreenEnabled === false) {
      support = false;
    }

    return (0, _pdfjsLib.shadow)(this, "supportsFullscreen", support);
  },

  get supportsIntegratedFind() {
    return this.externalServices.supportsIntegratedFind;
  },

  get supportsDocumentFonts() {
    return this.externalServices.supportsDocumentFonts;
  },

  get loadingBar() {
    const bar = new _ui_utils.ProgressBar("#loadingBar");
    return (0, _pdfjsLib.shadow)(this, "loadingBar", bar);
  },

  get supportedMouseWheelZoomModifierKeys() {
    return this.externalServices.supportedMouseWheelZoomModifierKeys;
  },

  initPassiveLoading() {
    throw new Error("Not implemented: initPassiveLoading");
  },

  setTitleUsingUrl(url = "") {
    this.url = url;
    this.baseUrl = url.split("#")[0];
    let title = (0, _ui_utils.getPDFFileNameFromURL)(url, "");

    if (!title) {
      try {
        title = decodeURIComponent((0, _pdfjsLib.getFilenameFromUrl)(url)) || url;
      } catch (ex) {
        title = url;
      }
    }

    this.setTitle(title);
  },

  setTitle(title) {
    if (this.isViewerEmbedded) {
      return;
    }

    document.title = title;
  },

  get _docFilename() {
    return this._contentDispositionFilename || (0, _ui_utils.getPDFFileNameFromURL)(this.url);
  },

  _cancelIdleCallbacks() {
    if (!this._idleCallbacks.size) {
      return;
    }

    for (const callback of this._idleCallbacks) {
      window.cancelIdleCallback(callback);
    }

    this._idleCallbacks.clear();
  },

  async _destroyScriptingInstance() {
    if (!this._scriptingInstance) {
      return;
    }

    const {
      scripting,
      internalEvents,
      domEvents
    } = this._scriptingInstance;

    try {
      await scripting.destroySandbox();
    } catch (ex) {}

    for (const [name, listener] of internalEvents) {
      this.eventBus._off(name, listener);
    }

    internalEvents.clear();

    for (const [name, listener] of domEvents) {
      window.removeEventListener(name, listener);
    }

    domEvents.clear();
    delete this._mouseState.isDown;
    this._scriptingInstance = null;
  },

  async close() {
    const errorWrapper = this.appConfig.errorWrapper.container;
    errorWrapper.setAttribute("hidden", "true");

    if (!this.pdfLoadingTask) {
      return undefined;
    }

    const promises = [];
    promises.push(this.pdfLoadingTask.destroy());
    this.pdfLoadingTask = null;

    if (this.pdfDocument) {
      this.pdfDocument = null;
      this.pdfThumbnailViewer.setDocument(null);
      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null);
      this.pdfDocumentProperties.setDocument(null);
    }

    webViewerResetPermissions();
    this.store = null;
    this.isInitialViewSet = false;
    this.downloadComplete = false;
    this.url = "";
    this.baseUrl = "";
    this.documentInfo = null;
    this.metadata = null;
    this._contentDispositionFilename = null;
    this._contentLength = null;
    this.triggerDelayedFallback = null;
    this._saveInProgress = false;

    this._cancelIdleCallbacks();

    promises.push(this._destroyScriptingInstance());
    this.pdfSidebar.reset();
    this.pdfOutlineViewer.reset();
    this.pdfAttachmentViewer.reset();
    this.pdfLayerViewer.reset();

    if (this.pdfHistory) {
      this.pdfHistory.reset();
    }

    if (this.findBar) {
      this.findBar.reset();
    }

    this.toolbar.reset();
    this.secondaryToolbar.reset();

    if (typeof PDFBug !== "undefined") {
      PDFBug.cleanup();
    }

    await Promise.all(promises);
    return undefined;
  },

  async open(file, args) {
    if (this.pdfLoadingTask) {
      await this.close();
    }

    const workerParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.WORKER);

    for (const key in workerParameters) {
      _pdfjsLib.GlobalWorkerOptions[key] = workerParameters[key];
    }

    const parameters = Object.create(null);

    if (typeof file === "string") {
      this.setTitleUsingUrl(file);
      parameters.url = file;
    } else if (file && "byteLength" in file) {
      parameters.data = file;
    } else if (file.url && file.originalUrl) {
      this.setTitleUsingUrl(file.originalUrl);
      parameters.url = file.url;
    }

    const apiParameters = _app_options.AppOptions.getAll(_app_options.OptionKind.API);

    for (const key in apiParameters) {
      let value = apiParameters[key];

      if (key === "docBaseUrl" && !value) {}

      parameters[key] = value;
    }

    if (args) {
      for (const key in args) {
        parameters[key] = args[key];
      }
    }

    const loadingTask = (0, _pdfjsLib.getDocument)(parameters);
    this.pdfLoadingTask = loadingTask;

    loadingTask.onPassword = (updateCallback, reason) => {
      this.pdfLinkService.externalLinkEnabled = false;
      this.passwordPrompt.setUpdateCallback(updateCallback, reason);
      this.passwordPrompt.open();
    };

    loadingTask.onProgress = ({
      loaded,
      total
    }) => {
      this.progress(loaded / total);
    };

    loadingTask.onUnsupportedFeature = this.fallback.bind(this);
    return loadingTask.promise.then(pdfDocument => {
      this.load(pdfDocument);
    }, exception => {
      if (loadingTask !== this.pdfLoadingTask) {
        return undefined;
      }

      const message = exception && exception.message; // exception?.message modified by lwf
      let loadingErrorMessage;

      if (exception instanceof _pdfjsLib.InvalidPDFException) {
        loadingErrorMessage = this.l10n.get("invalid_file_error", null, "Invalid or corrupted PDF file.");
      } else if (exception instanceof _pdfjsLib.MissingPDFException) {
        loadingErrorMessage = this.l10n.get("missing_file_error", null, "Missing PDF file.");
      } else if (exception instanceof _pdfjsLib.UnexpectedResponseException) {
        loadingErrorMessage = this.l10n.get("unexpected_response_error", null, "Unexpected server response.");
      } else {
        loadingErrorMessage = this.l10n.get("loading_error", null, "An error occurred while loading the PDF.");
      }

      return loadingErrorMessage.then(msg => {
        this.error(msg, {
          message
        });
        throw exception;
      });
    });
  },

  download({
    sourceEventType = "download"
  } = {}) {
    function downloadByUrl() {
      downloadManager.downloadUrl(url, filename);
    }

    const downloadManager = this.downloadManager,
          url = this.baseUrl,
          filename = this._docFilename;

    if (!this.pdfDocument || !this.downloadComplete) {
      downloadByUrl();
      return;
    }

    this.pdfDocument.getData().then(function (data) {
      const blob = new Blob([data], {
        type: "application/pdf"
      });
      downloadManager.download(blob, url, filename, sourceEventType);
    }).catch(downloadByUrl);
  },

  async save({
    sourceEventType = "download"
  } = {}) {
    if (this._saveInProgress) {
      return;
    }

    const downloadManager = this.downloadManager,
          url = this.baseUrl,
          filename = this._docFilename;

    if (!this.pdfDocument || !this.downloadComplete) {
      this.download({
        sourceEventType
      });
      return;
    }

    this._saveInProgress = true;
    await this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({ // ?.
      id: "doc",
      name: "WillSave"
    });
    this.pdfDocument.saveDocument(this.pdfDocument.annotationStorage).then(data => {
      const blob = new Blob([data], {
        type: "application/pdf"
      });
      downloadManager.download(blob, url, filename, sourceEventType);
    }).catch(() => {
      this.download({
        sourceEventType
      });
    }).finally(async () => {
      await this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({ //?.
        id: "doc",
        name: "DidSave"
      });
      this._saveInProgress = false;
    });
  },

  downloadOrSave(options) {
    if (this.pdfDocument && this.pdfDocument.annotationStorage.size > 0) { //?.
      this.save(options);
    } else {
      this.download(options);
    }
  },

  _delayedFallback(featureId) {
    this.externalServices.reportTelemetry({
      type: "unsupportedFeature",
      featureId
    });

    if (!this.triggerDelayedFallback) {
      this.triggerDelayedFallback = () => {
        this.fallback(featureId);
        this.triggerDelayedFallback = null;
      };
    }
  },

  fallback(featureId) {
    this.externalServices.reportTelemetry({
      type: "unsupportedFeature",
      featureId
    });

    if (this.fellback) {
      return;
    }

    this.fellback = true;
    this.externalServices.fallback({
      featureId,
      url: this.baseUrl
    }).then(download => {
      if (!download) {
        return;
      }

      this.download({
        sourceEventType: "download"
      });
    });
  },

  error(message, moreInfo) {
    const moreInfoText = [this.l10n.get("error_version_info", {
      version: _pdfjsLib.version || "?",
      build: _pdfjsLib.build || "?"
    }, "PDF.js v{{version}} (build: {{build}})")];

    if (moreInfo) {
      moreInfoText.push(this.l10n.get("error_message", {
        message: moreInfo.message
      }, "Message: {{message}}"));

      if (moreInfo.stack) {
        moreInfoText.push(this.l10n.get("error_stack", {
          stack: moreInfo.stack
        }, "Stack: {{stack}}"));
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(this.l10n.get("error_file", {
            file: moreInfo.filename
          }, "File: {{file}}"));
        }

        if (moreInfo.lineNumber) {
          moreInfoText.push(this.l10n.get("error_line", {
            line: moreInfo.lineNumber
          }, "Line: {{line}}"));
        }
      }
    }

    const errorWrapperConfig = this.appConfig.errorWrapper;
    const errorWrapper = errorWrapperConfig.container;
    errorWrapper.removeAttribute("hidden");
    const errorMessage = errorWrapperConfig.errorMessage;
    errorMessage.textContent = message;
    const closeButton = errorWrapperConfig.closeButton;

    closeButton.onclick = function () {
      errorWrapper.setAttribute("hidden", "true");
    };

    const errorMoreInfo = errorWrapperConfig.errorMoreInfo;
    const moreInfoButton = errorWrapperConfig.moreInfoButton;
    const lessInfoButton = errorWrapperConfig.lessInfoButton;

    moreInfoButton.onclick = function () {
      errorMoreInfo.removeAttribute("hidden");
      moreInfoButton.setAttribute("hidden", "true");
      lessInfoButton.removeAttribute("hidden");
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + "px";
    };

    lessInfoButton.onclick = function () {
      errorMoreInfo.setAttribute("hidden", "true");
      moreInfoButton.removeAttribute("hidden");
      lessInfoButton.setAttribute("hidden", "true");
    };

    moreInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    lessInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    closeButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    moreInfoButton.removeAttribute("hidden");
    lessInfoButton.setAttribute("hidden", "true");
    Promise.all(moreInfoText).then(parts => {
      errorMoreInfo.value = parts.join("\n");
    });
  },

  progress(level) {
    if (this.downloadComplete) {
      return;
    }

    const percent = Math.round(level * 100);

    if (percent > this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
      const disableAutoFetch = this.pdfDocument ? this.pdfDocument.loadingParams.disableAutoFetch : _app_options.AppOptions.get("disableAutoFetch");

      if (disableAutoFetch && percent) {
        if (this.disableAutoFetchLoadingBarTimeout) {
          clearTimeout(this.disableAutoFetchLoadingBarTimeout);
          this.disableAutoFetchLoadingBarTimeout = null;
        }

        this.loadingBar.show();
        this.disableAutoFetchLoadingBarTimeout = setTimeout(() => {
          this.loadingBar.hide();
          this.disableAutoFetchLoadingBarTimeout = null;
        }, DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
      }
    }
  },

  load(pdfDocument) {
    this.pdfDocument = pdfDocument;
    pdfDocument.getDownloadInfo().then(({
      length
    }) => {
      this._contentLength = length;
      this.downloadComplete = true;
      this.loadingBar.hide();
      firstPagePromise.then(() => {
        this.eventBus.dispatch("documentloaded", {
          source: this
        });
      });
    });
    const pageLayoutPromise = pdfDocument.getPageLayout().catch(function () {});
    const pageModePromise = pdfDocument.getPageMode().catch(function () {});
    const openActionPromise = pdfDocument.getOpenAction().catch(function () {});
    this.toolbar.setPagesCount(pdfDocument.numPages, false);
    this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
    let baseDocumentUrl;
    baseDocumentUrl = null;
    this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
    this.pdfDocumentProperties.setDocument(pdfDocument, this.url);
    const pdfViewer = this.pdfViewer;
    pdfViewer.setDocument(pdfDocument);
    const {
      firstPagePromise,
      onePageRendered,
      pagesPromise
    } = pdfViewer;
    const pdfThumbnailViewer = this.pdfThumbnailViewer;
    pdfThumbnailViewer.setDocument(pdfDocument);
    const storedPromise = (this.store = new _view_history.ViewHistory(pdfDocument.fingerprint)).getMultiple({
      page: null,
      zoom: _ui_utils.DEFAULT_SCALE_VALUE,
      scrollLeft: "0",
      scrollTop: "0",
      rotation: null,
      sidebarView: _ui_utils.SidebarView.UNKNOWN,
      scrollMode: _ui_utils.ScrollMode.UNKNOWN,
      spreadMode: _ui_utils.SpreadMode.UNKNOWN
    }).catch(() => {
      return Object.create(null);
    });
    firstPagePromise.then(pdfPage => {
      this.loadingBar.setWidth(this.appConfig.viewerContainer);

      this._initializeAnnotationStorageCallbacks(pdfDocument);

      Promise.all([_ui_utils.animationStarted, storedPromise, pageLayoutPromise, pageModePromise, openActionPromise]).then(async ([timeStamp, stored, pageLayout, pageMode, openAction]) => {
        const viewOnLoad = _app_options.AppOptions.get("viewOnLoad");

        this._initializePdfHistory({
          fingerprint: pdfDocument.fingerprint,
          viewOnLoad,
          initialDest: openAction && openAction.dest
        });

        const initialBookmark = this.initialBookmark;

        const zoom = _app_options.AppOptions.get("defaultZoomValue");

        let hash = zoom ? `zoom=${zoom}` : null;
        let rotation = null;

        let sidebarView = _app_options.AppOptions.get("sidebarViewOnLoad");

        let scrollMode = _app_options.AppOptions.get("scrollModeOnLoad");

        let spreadMode = _app_options.AppOptions.get("spreadModeOnLoad");

        if (stored.page && viewOnLoad !== ViewOnLoad.INITIAL) {
          hash = `page=${stored.page}&zoom=${zoom || stored.zoom},` + `${stored.scrollLeft},${stored.scrollTop}`;
          rotation = parseInt(stored.rotation, 10);

          if (sidebarView === _ui_utils.SidebarView.UNKNOWN) {
            sidebarView = stored.sidebarView | 0;
          }

          if (scrollMode === _ui_utils.ScrollMode.UNKNOWN) {
            scrollMode = stored.scrollMode | 0;
          }

          if (spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
            spreadMode = stored.spreadMode | 0;
          }
        }

        if (pageMode && sidebarView === _ui_utils.SidebarView.UNKNOWN) {
          sidebarView = apiPageModeToSidebarView(pageMode);
        }

        if (pageLayout && spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
          spreadMode = apiPageLayoutToSpreadMode(pageLayout);
        }

        this.setInitialView(hash, {
          rotation,
          sidebarView,
          scrollMode,
          spreadMode
        });
        this.eventBus.dispatch("documentinit", {
          source: this
        });

        if (!this.isViewerEmbedded) {
          pdfViewer.focus();
        }

        this._initializePermissions(pdfDocument);

        await Promise.race([pagesPromise, new Promise(resolve => {
          setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT);
        })]);

        if (!initialBookmark && !hash) {
          return;
        }

        if (pdfViewer.hasEqualPageSizes) {
          return;
        }

        this.initialBookmark = initialBookmark;
        pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;
        this.setInitialView(hash);
      }).catch(() => {
        this.setInitialView();
      }).then(function () {
        pdfViewer.update();
      });
    });
    pagesPromise.then(() => {
      this._initializeAutoPrint(pdfDocument, openActionPromise);
    });
    onePageRendered.then(() => {
      pdfDocument.getOutline().then(outline => {
        this.pdfOutlineViewer.render({
          outline,
          pdfDocument
        });
      });
      pdfDocument.getAttachments().then(attachments => {
        this.pdfAttachmentViewer.render({
          attachments
        });
      });
      pdfViewer.optionalContentConfigPromise.then(optionalContentConfig => {
        this.pdfLayerViewer.render({
          optionalContentConfig,
          pdfDocument
        });
      });

      if ("requestIdleCallback" in window) {
        const callback = window.requestIdleCallback(() => {
          this._collectTelemetry(pdfDocument);

          this._idleCallbacks.delete(callback);
        }, {
          timeout: 1000
        });

        this._idleCallbacks.add(callback);
      }

      this._initializeJavaScript(pdfDocument);
    });

    this._initializePageLabels(pdfDocument);

    this._initializeMetadata(pdfDocument);
  },

  async _initializeJavaScript(pdfDocument) {
    if (!_app_options.AppOptions.get("enableScripting")) {
      return;
    }

    const [objects, calculationOrder, docActions] = await Promise.all([pdfDocument.getFieldObjects(), pdfDocument.getCalculationOrderIds(), pdfDocument.getJSActions()]);

    if (!objects && !docActions) {
      return;
    }

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    const scripting = this.externalServices.createScripting({
      sandboxBundleSrc: _app_options.AppOptions.get("sandboxBundleSrc")
    });
    const internalEvents = new Map(),
          domEvents = new Map();
    this._scriptingInstance = {
      scripting,
      ready: false,
      internalEvents,
      domEvents
    };

    if (!this.documentInfo) {
      await new Promise(resolve => {
        this.eventBus._on("metadataloaded", evt => {
          resolve();
        }, {
          once: true
        });
      });

      if (pdfDocument !== this.pdfDocument) {
        return;
      }
    }

    if (!this._contentLength) {
      await new Promise(resolve => {
        this.eventBus._on("documentloaded", evt => {
          resolve();
        }, {
          once: true
        });
      });

      if (pdfDocument !== this.pdfDocument) {
        return;
      }
    }

    const updateFromSandbox = ({
      detail
    }) => {
      const {
        id,
        command,
        value
      } = detail;

      if (!id) {
        switch (command) {
          case "clear":
            console.clear();
            break;

          case "error":
            console.error(value);
            break;

          case "layout":
            this.pdfViewer.spreadMode = apiPageLayoutToSpreadMode(value);
            break;

          case "page-num":
            this.pdfViewer.currentPageNumber = value + 1;
            break;

          case "print":
            this.pdfViewer.pagesPromise.then(() => {
              this.triggerPrinting();
            });
            break;

          case "println":
            console.log(value);
            break;

          case "zoom":
            this.pdfViewer.currentScaleValue = value;
            break;
        }

        return;
      }

      const element = document.getElementById(id);

      if (element) {
        element.dispatchEvent(new CustomEvent("updatefromsandbox", {
          detail
        }));
      } else {
        if (value !== undefined && value !== null) {
          pdfDocument.annotationStorage.setValue(id, value);
        }
      }
    };

    internalEvents.set("updatefromsandbox", updateFromSandbox);
    const visitedPages = new Map();

    const pageOpen = ({
      pageNumber,
      actionsPromise
    }) => {
      visitedPages.set(pageNumber, (async () => {
        let actions = null;

        if (!visitedPages.has(pageNumber)) {
          actions = await actionsPromise;

          if (pdfDocument !== this.pdfDocument) {
            return;
          }
        }

        await this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({  //?.
          id: "page",
          name: "PageOpen",
          pageNumber,
          actions
        });
      })());
    };

    const pageClose = async ({
      pageNumber
    }) => {
      const actionsPromise = visitedPages.get(pageNumber);

      if (!actionsPromise) {
        return;
      }

      visitedPages.set(pageNumber, null);
      await actionsPromise;

      if (pdfDocument !== this.pdfDocument) {
        return;
      }

      await this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({ //?.
        id: "page",
        name: "PageClose",
        pageNumber
      });
    };

    internalEvents.set("pageopen", pageOpen);
    internalEvents.set("pageclose", pageClose);

    const dispatchEventInSandbox = ({
      detail
    }) => {
      scripting.dispatchEventInSandbox(detail);
    };

    internalEvents.set("dispatcheventinsandbox", dispatchEventInSandbox);

    const mouseDown = event => {
      this._mouseState.isDown = true;
    };

    domEvents.set("mousedown", mouseDown);

    const mouseUp = event => {
      this._mouseState.isDown = false;
    };

    domEvents.set("mouseup", mouseUp);

    for (const [name, listener] of internalEvents) {
      this.eventBus._on(name, listener);
    }

    for (const [name, listener] of domEvents) {
      window.addEventListener(name, listener);
    }

    try {
      await scripting.createSandbox({
        objects,
        calculationOrder,
        appInfo: {
          platform: navigator.platform,
          language: navigator.language
        },
        docInfo: { ...this.documentInfo,
          baseURL: this.baseUrl,
          filesize: this._contentLength,
          filename: this._docFilename,
          metadata: this.metadata && this.metadata.getRaw(), //?.
          authors: this.metadata && this.metadata.get("dc:creator"), //?.
          numPages: pdfDocument.numPages,
          URL: this.url,
          actions: docActions
        }
      });

      if (this.externalServices.isInAutomation) {
        this.eventBus.dispatch("sandboxcreated", {
          source: this
        });
      }
    } catch (error) {
      console.error(`_initializeJavaScript: "${error && error.message}".`); //?.

      this._destroyScriptingInstance();

      return;
    }

    await scripting.dispatchEventInSandbox({
      id: "doc",
      name: "Open"
    });
    await this.pdfViewer.initializeScriptingEvents();
    Promise.resolve().then(() => {
      if (this._scriptingInstance) {
        this._scriptingInstance.ready = true;
      }
    });
  },

  async _collectTelemetry(pdfDocument) {
    const markInfo = await this.pdfDocument.getMarkInfo();

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    const tagged =markInfo && markInfo.Marked || false;  //?.
    this.externalServices.reportTelemetry({
      type: "tagged",
      tagged
    });
  },

  async _initializeAutoPrint(pdfDocument, openActionPromise) {
    const [openAction, javaScript] = await Promise.all([openActionPromise, !_app_options.AppOptions.get("enableScripting") ? pdfDocument.getJavaScript() : null]);

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    let triggerAutoPrint = false;

    if (openAction && openAction.action === "Print") { //?.
      triggerAutoPrint = true;
    }

    if (javaScript) {
      javaScript.some(js => {
        if (!js) {
          return false;
        }

        console.warn("Warning: JavaScript is not supported");

        this._delayedFallback(_pdfjsLib.UNSUPPORTED_FEATURES.javaScript);

        return true;
      });

      if (!triggerAutoPrint) {
        for (const js of javaScript) {
          if (js && _ui_utils.AutoPrintRegExp.test(js)) {
            triggerAutoPrint = true;
            break;
          }
        }
      }
    }

    if (triggerAutoPrint) {
      this.triggerPrinting();
    }
  },

  async _initializeMetadata(pdfDocument) {
    const {
      info,
      metadata,
      contentDispositionFilename,
      contentLength
    } = await pdfDocument.getMetadata();

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    this.documentInfo = info;
    this.metadata = metadata;
    this._contentDispositionFilename = contentDispositionFilename;
    this._contentLength ||  (this._contentLength = contentLength); // ??
    console.log(`PDF ${pdfDocument.fingerprint} [${info.PDFFormatVersion} ` + `${(info.Producer || "-").trim()} / ${(info.Creator || "-").trim()}] ` + `(PDF.js: ${_pdfjsLib.version || "-"}` + `${this.pdfViewer.enableWebGL ? " [WebGL]" : ""})`);
    let pdfTitle;
    const infoTitle = info && info.Title;

    if (infoTitle) {
      pdfTitle = infoTitle;
    }

    const metadataTitle = metadata && metadata.get("dc:title");

    if (metadataTitle) {
      if (metadataTitle !== "Untitled" && !/[\uFFF0-\uFFFF]/g.test(metadataTitle)) {
        pdfTitle = metadataTitle;
      }
    }

    if (pdfTitle) {
      this.setTitle(`${pdfTitle} - ${contentDispositionFilename || document.title}`);
    } else if (contentDispositionFilename) {
      this.setTitle(contentDispositionFilename);
    }

    if (info.IsXFAPresent && !info.IsAcroFormPresent) {
      console.warn("Warning: XFA is not supported");

      this._delayedFallback(_pdfjsLib.UNSUPPORTED_FEATURES.forms);
    } else if ((info.IsAcroFormPresent || info.IsXFAPresent) && !this.pdfViewer.renderInteractiveForms) {
      console.warn("Warning: Interactive form support is not enabled");

      this._delayedFallback(_pdfjsLib.UNSUPPORTED_FEATURES.forms);
    }

    let versionId = "other";

    if (KNOWN_VERSIONS.includes(info.PDFFormatVersion)) {
      versionId = `v${info.PDFFormatVersion.replace(".", "_")}`;
    }

    let generatorId = "other";

    if (info.Producer) {
      const producer = info.Producer.toLowerCase();
      KNOWN_GENERATORS.some(function (generator) {
        if (!producer.includes(generator)) {
          return false;
        }

        generatorId = generator.replace(/[ .-]/g, "_");
        return true;
      });
    }

    let formType = null;

    if (info.IsXFAPresent) {
      formType = "xfa";
    } else if (info.IsAcroFormPresent) {
      formType = "acroform";
    }

    this.externalServices.reportTelemetry({
      type: "documentInfo",
      version: versionId,
      generator: generatorId,
      formType
    });
    this.eventBus.dispatch("metadataloaded", {
      source: this
    });
  },

  async _initializePageLabels(pdfDocument) {
    const labels = await pdfDocument.getPageLabels();

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    if (!labels || _app_options.AppOptions.get("disablePageLabels")) {
      return;
    }

    const numLabels = labels.length;

    if (numLabels !== this.pagesCount) {
      console.error("The number of Page Labels does not match the number of pages in the document.");
      return;
    }

    let i = 0;

    while (i < numLabels && labels[i] === (i + 1).toString()) {
      i++;
    }

    if (i === numLabels) {
      return;
    }

    const {
      pdfViewer,
      pdfThumbnailViewer,
      toolbar
    } = this;
    pdfViewer.setPageLabels(labels);
    pdfThumbnailViewer.setPageLabels(labels);
    toolbar.setPagesCount(numLabels, true);
    toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  },

  _initializePdfHistory({
    fingerprint,
    viewOnLoad,
    initialDest = null
  }) {
    if (this.isViewerEmbedded || _app_options.AppOptions.get("disableHistory")) {
      return;
    }

    this.pdfHistory.initialize({
      fingerprint,
      resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
      updateUrl: _app_options.AppOptions.get("historyUpdateUrl")
    });

    if (this.pdfHistory.initialBookmark) {
      this.initialBookmark = this.pdfHistory.initialBookmark;
      this.initialRotation = this.pdfHistory.initialRotation;
    }

    if (initialDest && !this.initialBookmark && viewOnLoad === ViewOnLoad.UNKNOWN) {
      this.initialBookmark = JSON.stringify(initialDest);
      this.pdfHistory.push({
        explicitDest: initialDest,
        pageNumber: null
      });
    }
  },

  async _initializePermissions(pdfDocument) {
    const permissions = await pdfDocument.getPermissions();

    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    if (!permissions || !_app_options.AppOptions.get("enablePermissions")) {
      return;
    }

    if (!permissions.includes(_pdfjsLib.PermissionFlag.COPY)) {
      this.appConfig.viewerContainer.classList.add(ENABLE_PERMISSIONS_CLASS);
    }
  },

  _initializeAnnotationStorageCallbacks(pdfDocument) {
    if (pdfDocument !== this.pdfDocument) {
      return;
    }

    const {
      annotationStorage
    } = pdfDocument;

    annotationStorage.onSetModified = function () {
      window.addEventListener("beforeunload", beforeUnload);
    };

    annotationStorage.onResetModified = function () {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  },

  setInitialView(storedHash, {
    rotation,
    sidebarView,
    scrollMode,
    spreadMode
  } = {}) {
    const setRotation = angle => {
      if ((0, _ui_utils.isValidRotation)(angle)) {
        this.pdfViewer.pagesRotation = angle;
      }
    };

    const setViewerModes = (scroll, spread) => {
      if ((0, _ui_utils.isValidScrollMode)(scroll)) {
        this.pdfViewer.scrollMode = scroll;
      }

      if ((0, _ui_utils.isValidSpreadMode)(spread)) {
        this.pdfViewer.spreadMode = spread;
      }
    };

    this.isInitialViewSet = true;
    this.pdfSidebar.setInitialView(sidebarView);
    setViewerModes(scrollMode, spreadMode);

    if (this.initialBookmark) {
      setRotation(this.initialRotation);
      delete this.initialRotation;
      this.pdfLinkService.setHash(this.initialBookmark);
      this.initialBookmark = null;
    } else if (storedHash) {
      setRotation(rotation);
      this.pdfLinkService.setHash(storedHash);
    }

    this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
    this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);

    if (!this.pdfViewer.currentScaleValue) {
      this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
    }
  },

  cleanup() {
    if (!this.pdfDocument) {
      return;
    }

    this.pdfViewer.cleanup();
    this.pdfThumbnailViewer.cleanup();

    if (this.pdfViewer.renderer !== _ui_utils.RendererType.SVG) {
      this.pdfDocument.cleanup();
    }
  },

  forceRendering() {
    this.pdfRenderingQueue.printing = !!this.printService;
    this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible;
    this.pdfRenderingQueue.renderHighestPriority();
  },

  beforePrint() {
    this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({  //?
      id: "doc",
      name: "WillPrint"
    });

    if (this.printService) {
      return;
    }

    if (!this.supportsPrinting) {
      this.l10n.get("printing_not_supported", null, "Warning: Printing is not fully supported by this browser.").then(printMessage => {
        this.error(printMessage);
      });
      return;
    }

    if (!this.pdfViewer.pageViewsReady) {
      this.l10n.get("printing_not_ready", null, "Warning: The PDF is not fully loaded for printing.").then(notReadyMessage => {
        window.alert(notReadyMessage);
      });
      return;
    }

    const pagesOverview = this.pdfViewer.getPagesOverview();
    const printContainer = this.appConfig.printContainer;

    const printResolution = _app_options.AppOptions.get("printResolution");

    const optionalContentConfigPromise = this.pdfViewer.optionalContentConfigPromise;
    const printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, this.l10n);
    this.printService = printService;
    this.forceRendering();
    printService.layout();
    this.externalServices.reportTelemetry({
      type: "print"
    });
  },

  afterPrint() {
    this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({ //?.
      id: "doc",
      name: "DidPrint"
    });

    if (this.printService) {
      this.printService.destroy();
      this.printService = null;

      if (this.pdfDocument) {
        this.pdfDocument.annotationStorage.resetModified();
      }
    }

    this.forceRendering();
  },

  rotatePages(delta) {
    if (!this.pdfDocument) {
      return;
    }

    const newRotation = (this.pdfViewer.pagesRotation + 360 + delta) % 360;
    this.pdfViewer.pagesRotation = newRotation;
  },

  requestPresentationMode() {
    if (!this.pdfPresentationMode) {
      return;
    }

    this.pdfPresentationMode.request();
  },

  triggerPrinting() {
    if (!this.supportsPrinting) {
      return;
    }

    window.print();
  },

  bindEvents() {
    const {
      eventBus,
      _boundEvents
    } = this;
    _boundEvents.beforePrint = this.beforePrint.bind(this);
    _boundEvents.afterPrint = this.afterPrint.bind(this);

    eventBus._on("resize", webViewerResize);

    eventBus._on("hashchange", webViewerHashchange);

    eventBus._on("beforeprint", _boundEvents.beforePrint);

    eventBus._on("afterprint", _boundEvents.afterPrint);

    eventBus._on("pagerendered", webViewerPageRendered);

    eventBus._on("updateviewarea", webViewerUpdateViewarea);

    eventBus._on("pagechanging", webViewerPageChanging);

    eventBus._on("scalechanging", webViewerScaleChanging);

    eventBus._on("rotationchanging", webViewerRotationChanging);

    eventBus._on("sidebarviewchanged", webViewerSidebarViewChanged);

    eventBus._on("pagemode", webViewerPageMode);

    eventBus._on("namedaction", webViewerNamedAction);

    eventBus._on("presentationmodechanged", webViewerPresentationModeChanged);

    eventBus._on("presentationmode", webViewerPresentationMode);

    eventBus._on("print", webViewerPrint);

    eventBus._on("download", webViewerDownload);

    eventBus._on("save", webViewerSave);

    eventBus._on("firstpage", webViewerFirstPage);

    eventBus._on("lastpage", webViewerLastPage);

    eventBus._on("nextpage", webViewerNextPage);

    eventBus._on("previouspage", webViewerPreviousPage);

    eventBus._on("zoomin", webViewerZoomIn);

    eventBus._on("zoomout", webViewerZoomOut);

    eventBus._on("zoomreset", webViewerZoomReset);

    eventBus._on("pagenumberchanged", webViewerPageNumberChanged);

    eventBus._on("scalechanged", webViewerScaleChanged);

    eventBus._on("rotatecw", webViewerRotateCw);

    eventBus._on("rotateccw", webViewerRotateCcw);

    eventBus._on("optionalcontentconfig", webViewerOptionalContentConfig);

    eventBus._on("switchscrollmode", webViewerSwitchScrollMode);

    eventBus._on("scrollmodechanged", webViewerScrollModeChanged);

    eventBus._on("switchspreadmode", webViewerSwitchSpreadMode);

    eventBus._on("spreadmodechanged", webViewerSpreadModeChanged);

    eventBus._on("documentproperties", webViewerDocumentProperties);

    eventBus._on("find", webViewerFind);

    eventBus._on("findfromurlhash", webViewerFindFromUrlHash);

    eventBus._on("updatefindmatchescount", webViewerUpdateFindMatchesCount);

    eventBus._on("updatefindcontrolstate", webViewerUpdateFindControlState);

    if (_app_options.AppOptions.get("pdfBug")) {
      _boundEvents.reportPageStatsPDFBug = reportPageStatsPDFBug;

      eventBus._on("pagerendered", _boundEvents.reportPageStatsPDFBug);

      eventBus._on("pagechanging", _boundEvents.reportPageStatsPDFBug);
    }

    eventBus._on("fileinputchange", webViewerFileInputChange);

    eventBus._on("openfile", webViewerOpenFile);
  },

  bindWindowEvents() {
    const {
      eventBus,
      _boundEvents
    } = this;

    _boundEvents.windowResize = () => {
      eventBus.dispatch("resize", {
        source: window
      });
    };

    _boundEvents.windowHashChange = () => {
      eventBus.dispatch("hashchange", {
        source: window,
        hash: document.location.hash.substring(1)
      });
    };

    _boundEvents.windowBeforePrint = () => {
      eventBus.dispatch("beforeprint", {
        source: window
      });
    };

    _boundEvents.windowAfterPrint = () => {
      eventBus.dispatch("afterprint", {
        source: window
      });
    };

    _boundEvents.windowUpdateFromSandbox = event => {
      eventBus.dispatch("updatefromsandbox", {
        source: window,
        detail: event.detail
      });
    };

    window.addEventListener("visibilitychange", webViewerVisibilityChange);
    window.addEventListener("wheel", webViewerWheel, {
      passive: false
    });
    window.addEventListener("touchstart", webViewerTouchStart, {
      passive: false
    });
    window.addEventListener("click", webViewerClick);
    window.addEventListener("keydown", webViewerKeyDown);
    window.addEventListener("keyup", webViewerKeyUp);
    window.addEventListener("resize", _boundEvents.windowResize);
    window.addEventListener("hashchange", _boundEvents.windowHashChange);
    window.addEventListener("beforeprint", _boundEvents.windowBeforePrint);
    window.addEventListener("afterprint", _boundEvents.windowAfterPrint);
    window.addEventListener("updatefromsandbox", _boundEvents.windowUpdateFromSandbox);
  },

  unbindEvents() {
    const {
      eventBus,
      _boundEvents
    } = this;

    eventBus._off("resize", webViewerResize);

    eventBus._off("hashchange", webViewerHashchange);

    eventBus._off("beforeprint", _boundEvents.beforePrint);

    eventBus._off("afterprint", _boundEvents.afterPrint);

    eventBus._off("pagerendered", webViewerPageRendered);

    eventBus._off("updateviewarea", webViewerUpdateViewarea);

    eventBus._off("pagechanging", webViewerPageChanging);

    eventBus._off("scalechanging", webViewerScaleChanging);

    eventBus._off("rotationchanging", webViewerRotationChanging);

    eventBus._off("sidebarviewchanged", webViewerSidebarViewChanged);

    eventBus._off("pagemode", webViewerPageMode);

    eventBus._off("namedaction", webViewerNamedAction);

    eventBus._off("presentationmodechanged", webViewerPresentationModeChanged);

    eventBus._off("presentationmode", webViewerPresentationMode);

    eventBus._off("print", webViewerPrint);

    eventBus._off("download", webViewerDownload);

    eventBus._off("save", webViewerSave);

    eventBus._off("firstpage", webViewerFirstPage);

    eventBus._off("lastpage", webViewerLastPage);

    eventBus._off("nextpage", webViewerNextPage);

    eventBus._off("previouspage", webViewerPreviousPage);

    eventBus._off("zoomin", webViewerZoomIn);

    eventBus._off("zoomout", webViewerZoomOut);

    eventBus._off("zoomreset", webViewerZoomReset);

    eventBus._off("pagenumberchanged", webViewerPageNumberChanged);

    eventBus._off("scalechanged", webViewerScaleChanged);

    eventBus._off("rotatecw", webViewerRotateCw);

    eventBus._off("rotateccw", webViewerRotateCcw);

    eventBus._off("optionalcontentconfig", webViewerOptionalContentConfig);

    eventBus._off("switchscrollmode", webViewerSwitchScrollMode);

    eventBus._off("scrollmodechanged", webViewerScrollModeChanged);

    eventBus._off("switchspreadmode", webViewerSwitchSpreadMode);

    eventBus._off("spreadmodechanged", webViewerSpreadModeChanged);

    eventBus._off("documentproperties", webViewerDocumentProperties);

    eventBus._off("find", webViewerFind);

    eventBus._off("findfromurlhash", webViewerFindFromUrlHash);

    eventBus._off("updatefindmatchescount", webViewerUpdateFindMatchesCount);

    eventBus._off("updatefindcontrolstate", webViewerUpdateFindControlState);

    if (_boundEvents.reportPageStatsPDFBug) {
      eventBus._off("pagerendered", _boundEvents.reportPageStatsPDFBug);

      eventBus._off("pagechanging", _boundEvents.reportPageStatsPDFBug);

      _boundEvents.reportPageStatsPDFBug = null;
    }

    eventBus._off("fileinputchange", webViewerFileInputChange);

    eventBus._off("openfile", webViewerOpenFile);

    _boundEvents.beforePrint = null;
    _boundEvents.afterPrint = null;
  },

  unbindWindowEvents() {
    const {
      _boundEvents
    } = this;
    window.removeEventListener("visibilitychange", webViewerVisibilityChange);
    window.removeEventListener("wheel", webViewerWheel, {
      passive: false
    });
    window.removeEventListener("touchstart", webViewerTouchStart, {
      passive: false
    });
    window.removeEventListener("click", webViewerClick);
    window.removeEventListener("keydown", webViewerKeyDown);
    window.removeEventListener("keyup", webViewerKeyUp);
    window.removeEventListener("resize", _boundEvents.windowResize);
    window.removeEventListener("hashchange", _boundEvents.windowHashChange);
    window.removeEventListener("beforeprint", _boundEvents.windowBeforePrint);
    window.removeEventListener("afterprint", _boundEvents.windowAfterPrint);
    window.removeEventListener("updatefromsandbox", _boundEvents.windowUpdateFromSandbox);
    _boundEvents.windowResize = null;
    _boundEvents.windowHashChange = null;
    _boundEvents.windowBeforePrint = null;
    _boundEvents.windowAfterPrint = null;
    _boundEvents.windowUpdateFromSandbox = null;
  },

  accumulateWheelTicks(ticks) {
    if (this._wheelUnusedTicks > 0 && ticks < 0 || this._wheelUnusedTicks < 0 && ticks > 0) {
      this._wheelUnusedTicks = 0;
    }

    this._wheelUnusedTicks += ticks;
    const wholeTicks = Math.sign(this._wheelUnusedTicks) * Math.floor(Math.abs(this._wheelUnusedTicks));
    this._wheelUnusedTicks -= wholeTicks;
    return wholeTicks;
  },

  get scriptingReady() {
    return this._scriptingInstance && this._scriptingInstance.ready || false;  //?.
  }

};
exports.PDFViewerApplication = PDFViewerApplication;
let validateFileURL;
{
  const HOSTED_VIEWER_ORIGINS = ["null", "http://mozilla.github.io", "https://mozilla.github.io"];

  validateFileURL = function (file) {
    if (file === undefined) {
      return;
    }

    try {
      const viewerOrigin = new URL(window.location.href).origin || "null";

      if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
        return;
      }

      const {
        origin,
        protocol
      } = new URL(file, window.location.href);

      if (origin !== viewerOrigin && protocol !== "blob:") {
        throw new Error("file origin does not match viewer's");
      }
    } catch (ex) {
      const message = ex && ex.message;
      PDFViewerApplication.l10n.get("loading_error", null, "An error occurred while loading the PDF.").then(loadingErrorMessage => {
        PDFViewerApplication.error(loadingErrorMessage, {
          message
        });
      });
      throw ex;
    }
  };
}

async function loadFakeWorker() {
  if (!_pdfjsLib.GlobalWorkerOptions.workerSrc) {
    _pdfjsLib.GlobalWorkerOptions.workerSrc = _app_options.AppOptions.get("workerSrc");
  }

  return (0, _pdfjsLib.loadScript)(_pdfjsLib.PDFWorker.getWorkerSrc());
}

function loadAndEnablePDFBug(enabledTabs) {
  const appConfig = PDFViewerApplication.appConfig;
  return (0, _pdfjsLib.loadScript)(appConfig.debuggerScriptPath).then(function () {
    PDFBug.enable(enabledTabs);
    PDFBug.init({
      OPS: _pdfjsLib.OPS
    }, appConfig.mainContainer);
  });
}

function reportPageStatsPDFBug({
  pageNumber
}) {
  if (typeof Stats === "undefined" || !Stats.enabled) {
    return;
  }

  const pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
  const pageStats = pageView && pageView.pdfPage && pageView.pdfPage.stats;

  if (!pageStats) {
    return;
  }

  Stats.add(pageNumber, pageStats);
}

function webViewerInitialized() {
  const appConfig = PDFViewerApplication.appConfig;
  let file;
  const queryString = document.location.search.substring(1);
  const params = (0, _ui_utils.parseQueryString)(queryString);
  file = "file" in params ? params.file : _app_options.AppOptions.get("defaultUrl");
  validateFileURL(file);
  const fileInput = document.createElement("input");
  fileInput.id = appConfig.openFileInputName;
  fileInput.className = "fileInput";
  fileInput.setAttribute("type", "file");
  fileInput.oncontextmenu = _ui_utils.noContextMenuHandler;
  document.body.appendChild(fileInput);

  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    appConfig.toolbar.openFile.setAttribute("hidden", "true");
    appConfig.secondaryToolbar.openFileButton.setAttribute("hidden", "true");
  } else {
    fileInput.value = null;
  }

  fileInput.addEventListener("change", function (evt) {
    const files = evt.target.files;

    if (!files || files.length === 0) {
      return;
    }

    PDFViewerApplication.eventBus.dispatch("fileinputchange", {
      source: this,
      fileInput: evt.target
    });
  });
  appConfig.mainContainer.addEventListener("dragover", function (evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  });
  appConfig.mainContainer.addEventListener("drop", function (evt) {
    evt.preventDefault();
    const files = evt.dataTransfer.files;

    if (!files || files.length === 0) {
      return;
    }

    PDFViewerApplication.eventBus.dispatch("fileinputchange", {
      source: this,
      fileInput: evt.dataTransfer
    });
  });

  if (!PDFViewerApplication.supportsDocumentFonts) {
    _app_options.AppOptions.set("disableFontFace", true);

    PDFViewerApplication.l10n.get("web_fonts_disabled", null, "Web fonts are disabled: unable to use embedded PDF fonts.").then(msg => {
      console.warn(msg);
    });
  }

  if (!PDFViewerApplication.supportsPrinting) {
    appConfig.toolbar.print.classList.add("hidden");
    appConfig.secondaryToolbar.printButton.classList.add("hidden");
  }

  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.toolbar.presentationModeButton.classList.add("hidden");
    appConfig.secondaryToolbar.presentationModeButton.classList.add("hidden");
  }

  if (PDFViewerApplication.supportsIntegratedFind) {
    appConfig.toolbar.viewFind.classList.add("hidden");
  }

  appConfig.mainContainer.addEventListener("transitionend", function (evt) {
    if (evt.target === this) {
      PDFViewerApplication.eventBus.dispatch("resize", {
        source: this
      });
    }
  }, true);

  try {
    webViewerOpenFileViaURL(file);
  } catch (reason) {
    PDFViewerApplication.l10n.get("loading_error", null, "An error occurred while loading the PDF.").then(msg => {
      PDFViewerApplication.error(msg, reason);
    });
  }
}

let webViewerOpenFileViaURL;
{
  webViewerOpenFileViaURL = function (file) {
    if (file && file.lastIndexOf("file:", 0) === 0) {
      PDFViewerApplication.setTitleUsingUrl(file);
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        PDFViewerApplication.open(new Uint8Array(xhr.response));
      };

      xhr.open("GET", file);
      xhr.responseType = "arraybuffer";
      xhr.send();
      return;
    }

    if (file) {
      PDFViewerApplication.open(file);
    }
  };
}

function webViewerResetPermissions() {
  const {
    appConfig
  } = PDFViewerApplication;

  if (!appConfig) {
    return;
  }

  appConfig.viewerContainer.classList.remove(ENABLE_PERMISSIONS_CLASS);
}

function webViewerPageRendered({
  pageNumber,
  timestamp,
  error
}) {
  if (pageNumber === PDFViewerApplication.page) {
    PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
  }

  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    const pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
    const thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(pageNumber - 1);

    if (pageView && thumbnailView) {
      thumbnailView.setImage(pageView);
    }
  }

  if (error) {
    PDFViewerApplication.l10n.get("rendering_error", null, "An error occurred while rendering the page.").then(msg => {
      PDFViewerApplication.error(msg, error);
    });
  }

  PDFViewerApplication.externalServices.reportTelemetry({
    type: "pageInfo",
    timestamp
  });
  PDFViewerApplication.pdfDocument.getStats().then(function (stats) {
    PDFViewerApplication.externalServices.reportTelemetry({
      type: "documentStats",
      stats
    });
  });
}

function webViewerPageMode({
  mode
}) {
  let view;

  switch (mode) {
    case "thumbs":
      view = _ui_utils.SidebarView.THUMBS;
      break;

    case "bookmarks":
    case "outline":
      view = _ui_utils.SidebarView.OUTLINE;
      break;

    case "attachments":
      view = _ui_utils.SidebarView.ATTACHMENTS;
      break;

    case "layers":
      view = _ui_utils.SidebarView.LAYERS;
      break;

    case "none":
      view = _ui_utils.SidebarView.NONE;
      break;

    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
  }

  PDFViewerApplication.pdfSidebar.switchView(view, true);
}

function webViewerNamedAction(evt) {
  switch (evt.action) {
    case "GoToPage":
      PDFViewerApplication.appConfig.toolbar.pageNumber.select();
      break;

    case "Find":
      if (!PDFViewerApplication.supportsIntegratedFind) {
        PDFViewerApplication.findBar.toggle();
      }

      break;

    case "Print":
      PDFViewerApplication.triggerPrinting();
      break;

    case "SaveAs":
      webViewerSave();
      break;
  }
}

function webViewerPresentationModeChanged(evt) {
  PDFViewerApplication.pdfViewer.presentationModeState = evt.state;
}

function webViewerSidebarViewChanged(evt) {
  PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;
  const store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("sidebarView", evt.view).catch(function () {});
  }
}

function webViewerUpdateViewarea(evt) {
  const location = evt.location,
        store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.setMultiple({
      page: location.pageNumber,
      zoom: location.scale,
      scrollLeft: location.left,
      scrollTop: location.top,
      rotation: location.rotation
    }).catch(function () {});
  }

  const href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
  PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
  PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;
  const currentPage = PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page - 1);
  const loading = (currentPage && currentPage.renderingState) !== _pdf_rendering_queue.RenderingStates.FINISHED;
  PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}

function webViewerScrollModeChanged(evt) {
  const store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("scrollMode", evt.mode).catch(function () {});
  }
}

function webViewerSpreadModeChanged(evt) {
  const store = PDFViewerApplication.store;

  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set("spreadMode", evt.mode).catch(function () {});
  }
}

function webViewerResize() {
  const {
    pdfDocument,
    pdfViewer
  } = PDFViewerApplication;

  if (!pdfDocument) {
    return;
  }

  const currentScaleValue = pdfViewer.currentScaleValue;

  if (currentScaleValue === "auto" || currentScaleValue === "page-fit" || currentScaleValue === "page-width") {
    pdfViewer.currentScaleValue = currentScaleValue;
  }

  pdfViewer.update();
}

function webViewerHashchange(evt) {
  const hash = evt.hash;

  if (!hash) {
    return;
  }

  if (!PDFViewerApplication.isInitialViewSet) {
    PDFViewerApplication.initialBookmark = hash;
  } else if (!PDFViewerApplication.pdfHistory.popStateInProgress) {
    PDFViewerApplication.pdfLinkService.setHash(hash);
  }
}

let webViewerFileInputChange, webViewerOpenFile;
{
  webViewerFileInputChange = function (evt) {
    if (PDFViewerApplication.pdfViewer && PDFViewerApplication.pdfViewer.isInPresentationMode) {
      return;
    }

    const file = evt.fileInput.files[0];

    if (!_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
      let url = URL.createObjectURL(file);

      if (file.name) {
        url = {
          url,
          originalUrl: file.name
        };
      }

      PDFViewerApplication.open(url);
    } else {
      PDFViewerApplication.setTitleUsingUrl(file.name);
      const fileReader = new FileReader();

      fileReader.onload = function webViewerChangeFileReaderOnload(event) {
        const buffer = event.target.result;
        PDFViewerApplication.open(new Uint8Array(buffer));
      };

      fileReader.readAsArrayBuffer(file);
    }

    const appConfig = PDFViewerApplication.appConfig;
    appConfig.toolbar.viewBookmark.setAttribute("hidden", "true");
    appConfig.secondaryToolbar.viewBookmarkButton.setAttribute("hidden", "true");
    appConfig.toolbar.download.setAttribute("hidden", "true");
    appConfig.secondaryToolbar.downloadButton.setAttribute("hidden", "true");
  };

  webViewerOpenFile = function (evt) {
    const openFileInputName = PDFViewerApplication.appConfig.openFileInputName;
    document.getElementById(openFileInputName).click();
  };
}

function webViewerPresentationMode() {
  PDFViewerApplication.requestPresentationMode();
}

function webViewerPrint() {
  PDFViewerApplication.triggerPrinting();
}

function webViewerDownload() {
  PDFViewerApplication.downloadOrSave({
    sourceEventType: "download"
  });
}

function webViewerSave() {
  PDFViewerApplication.downloadOrSave({
    sourceEventType: "save"
  });
}

function webViewerFirstPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = 1;
  }
}

function webViewerLastPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
  }
}

function webViewerNextPage() {
  PDFViewerApplication.pdfViewer.nextPage();
}

function webViewerPreviousPage() {
  PDFViewerApplication.pdfViewer.previousPage();
}

function webViewerZoomIn() {
  PDFViewerApplication.zoomIn();
}

function webViewerZoomOut() {
  PDFViewerApplication.zoomOut();
}

function webViewerZoomReset() {
  PDFViewerApplication.zoomReset();
}

function webViewerPageNumberChanged(evt) {
  const pdfViewer = PDFViewerApplication.pdfViewer;

  if (evt.value !== "") {
    PDFViewerApplication.pdfLinkService.goToPage(evt.value);
  }

  if (evt.value !== pdfViewer.currentPageNumber.toString() && evt.value !== pdfViewer.currentPageLabel) {
    PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  }
}

function webViewerScaleChanged(evt) {
  PDFViewerApplication.pdfViewer.currentScaleValue = evt.value;
}

function webViewerRotateCw() {
  PDFViewerApplication.rotatePages(90);
}

function webViewerRotateCcw() {
  PDFViewerApplication.rotatePages(-90);
}

function webViewerOptionalContentConfig(evt) {
  PDFViewerApplication.pdfViewer.optionalContentConfigPromise = evt.promise;
}

function webViewerSwitchScrollMode(evt) {
  PDFViewerApplication.pdfViewer.scrollMode = evt.mode;
}

function webViewerSwitchSpreadMode(evt) {
  PDFViewerApplication.pdfViewer.spreadMode = evt.mode;
}

function webViewerDocumentProperties() {
  PDFViewerApplication.pdfDocumentProperties.open();
}

function webViewerFind(evt) {
  PDFViewerApplication.findController.executeCommand("find" + evt.type, {
    query: evt.query,
    phraseSearch: evt.phraseSearch,
    caseSensitive: evt.caseSensitive,
    entireWord: evt.entireWord,
    highlightAll: evt.highlightAll,
    findPrevious: evt.findPrevious
  });
}

function webViewerFindFromUrlHash(evt) {
  PDFViewerApplication.findController.executeCommand("find", {
    query: evt.query,
    phraseSearch: evt.phraseSearch,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: false
  });
}

function webViewerUpdateFindMatchesCount({
  matchesCount
}) {
  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindMatchesCount(matchesCount);
  } else {
    PDFViewerApplication.findBar.updateResultsCount(matchesCount);
  }
}

function webViewerUpdateFindControlState({
  state,
  previous,
  matchesCount,
  rawQuery
}) {
  if (PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.externalServices.updateFindControlState({
      result: state,
      findPrevious: previous,
      matchesCount,
      rawQuery
    });
  } else {
    PDFViewerApplication.findBar.updateUIState(state, previous, matchesCount);
  }
}

function webViewerScaleChanging(evt) {
  PDFViewerApplication.toolbar.setPageScale(evt.presetValue, evt.scale);
  PDFViewerApplication.pdfViewer.update();
}

function webViewerRotationChanging(evt) {
  PDFViewerApplication.pdfThumbnailViewer.pagesRotation = evt.pagesRotation;
  PDFViewerApplication.forceRendering();
  PDFViewerApplication.pdfViewer.currentPageNumber = evt.pageNumber;
}

function webViewerPageChanging({
  pageNumber,
  pageLabel
}) {
  PDFViewerApplication.toolbar.setPageNumber(pageNumber, pageLabel);
  PDFViewerApplication.secondaryToolbar.setPageNumber(pageNumber);

  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(pageNumber);
  }
}

function webViewerVisibilityChange(evt) {
  if (document.visibilityState === "visible") {
    setZoomDisabledTimeout();
  }
}

let zoomDisabledTimeout = null;

function setZoomDisabledTimeout() {
  if (zoomDisabledTimeout) {
    clearTimeout(zoomDisabledTimeout);
  }

  zoomDisabledTimeout = setTimeout(function () {
    zoomDisabledTimeout = null;
  }, WHEEL_ZOOM_DISABLED_TIMEOUT);
}

function webViewerWheel(evt) {
  const {
    pdfViewer,
    supportedMouseWheelZoomModifierKeys
  } = PDFViewerApplication;

  if (pdfViewer.isInPresentationMode) {
    return;
  }

  if (evt.ctrlKey && supportedMouseWheelZoomModifierKeys.ctrlKey || evt.metaKey && supportedMouseWheelZoomModifierKeys.metaKey) {
    evt.preventDefault();

    if (zoomDisabledTimeout || document.visibilityState === "hidden") {
      return;
    }

    const previousScale = pdfViewer.currentScale;
    const delta = (0, _ui_utils.normalizeWheelEventDirection)(evt);
    let ticks = 0;

    if (evt.deltaMode === WheelEvent.DOM_DELTA_LINE || evt.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      if (Math.abs(delta) >= 1) {
        ticks = Math.sign(delta);
      } else {
        ticks = PDFViewerApplication.accumulateWheelTicks(delta);
      }
    } else {
      const PIXELS_PER_LINE_SCALE = 30;
      ticks = PDFViewerApplication.accumulateWheelTicks(delta / PIXELS_PER_LINE_SCALE);
    }

    if (ticks < 0) {
      PDFViewerApplication.zoomOut(-ticks);
    } else if (ticks > 0) {
      PDFViewerApplication.zoomIn(ticks);
    }

    const currentScale = pdfViewer.currentScale;

    if (previousScale !== currentScale) {
      const scaleCorrectionFactor = currentScale / previousScale - 1;
      const rect = pdfViewer.container.getBoundingClientRect();
      const dx = evt.clientX - rect.left;
      const dy = evt.clientY - rect.top;
      pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
      pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
    }
  } else {
    setZoomDisabledTimeout();
  }
}

function webViewerTouchStart(evt) {
  if (evt.touches.length > 1) {
    evt.preventDefault();
  }
}

function webViewerClick(evt) {
  if (PDFViewerApplication.triggerDelayedFallback && PDFViewerApplication.pdfViewer.containsElement(evt.target)) {
    PDFViewerApplication.triggerDelayedFallback();
  }

  if (!PDFViewerApplication.secondaryToolbar.isOpen) {
    return;
  }

  const appConfig = PDFViewerApplication.appConfig;

  if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) && evt.target !== appConfig.secondaryToolbar.toggleButton) {
    PDFViewerApplication.secondaryToolbar.close();
  }
}

function webViewerKeyUp(evt) {
  if (evt.keyCode === 9) {
    if (PDFViewerApplication.triggerDelayedFallback) {
      PDFViewerApplication.triggerDelayedFallback();
    }
  }
}

function webViewerKeyDown(evt) {
  if (PDFViewerApplication.overlayManager.active) {
    return;
  }

  let handled = false,
      ensureViewerFocused = false;
  const cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);
  const pdfViewer = PDFViewerApplication.pdfViewer;
  const isViewerInPresentationMode = pdfViewer && pdfViewer.isInPresentationMode;

  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!PDFViewerApplication.supportsIntegratedFind && !evt.shiftKey) {
          PDFViewerApplication.findBar.open();
          handled = true;
        }

        break;

      case 71:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          const findState = PDFViewerApplication.findController.state;

          if (findState) {
            PDFViewerApplication.findController.executeCommand("findagain", {
              query: findState.query,
              phraseSearch: findState.phraseSearch,
              caseSensitive: findState.caseSensitive,
              entireWord: findState.entireWord,
              highlightAll: findState.highlightAll,
              findPrevious: cmd === 5 || cmd === 12
            });
          }

          handled = true;
        }

        break;

      case 61:
      case 107:
      case 187:
      case 171:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomIn();
        }

        handled = true;
        break;

      case 173:
      case 109:
      case 189:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomOut();
        }

        handled = true;
        break;

      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(function () {
            PDFViewerApplication.zoomReset();
          });
          handled = false;
        }

        break;

      case 38:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 40:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;
    }
  }

  const {
    eventBus
  } = PDFViewerApplication;

  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        eventBus.dispatch("download", {
          source: window
        });
        handled = true;
        break;

      case 79:
        {
          eventBus.dispatch("openfile", {
            source: window
          });
          handled = true;
        }
        break;
    }
  }

  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        PDFViewerApplication.requestPresentationMode();
        handled = true;
        break;

      case 71:
        PDFViewerApplication.appConfig.toolbar.pageNumber.select();
        handled = true;
        break;
    }
  }

  if (handled) {
    if (ensureViewerFocused && !isViewerInPresentationMode) {
      pdfViewer.focus();
    }

    evt.preventDefault();
    return;
  }

  const curElement = (0, _ui_utils.getActiveOrFocusedElement)();
  const curElementTagName = curElement && curElement.tagName.toUpperCase();

  if (curElementTagName === "INPUT" || curElementTagName === "TEXTAREA" || curElementTagName === "SELECT" || curElement && curElement.isContentEditable) {
    if (evt.keyCode !== 27) {
      return;
    }
  }

  if (cmd === 0) {
    let turnPage = 0,
        turnOnlyIfPageFit = false;

    switch (evt.keyCode) {
      case 38:
      case 33:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 8:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = -1;
        break;

      case 37:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 75:
      case 80:
        turnPage = -1;
        break;

      case 27:
        if (PDFViewerApplication.secondaryToolbar.isOpen) {
          PDFViewerApplication.secondaryToolbar.close();
          handled = true;
        }

        if (!PDFViewerApplication.supportsIntegratedFind && PDFViewerApplication.findBar.opened) {
          PDFViewerApplication.findBar.close();
          handled = true;
        }

        break;

      case 40:
      case 34:
        if (pdfViewer.isVerticalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 13:
      case 32:
        if (!isViewerInPresentationMode) {
          turnOnlyIfPageFit = true;
        }

        turnPage = 1;
        break;

      case 39:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          turnOnlyIfPageFit = true;
        }

      case 74:
      case 78:
        turnPage = 1;
        break;

      case 36:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 35:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }

        break;

      case 83:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.SELECT);
        break;

      case 72:
        PDFViewerApplication.pdfCursorTools.switchTool(_pdf_cursor_tools.CursorTool.HAND);
        break;

      case 82:
        PDFViewerApplication.rotatePages(90);
        break;

      case 115:
        PDFViewerApplication.pdfSidebar.toggle();
        break;
    }

    if (turnPage !== 0 && (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === "page-fit")) {
      if (turnPage > 0) {
        pdfViewer.nextPage();
      } else {
        pdfViewer.previousPage();
      }

      handled = true;
    }
  }

  if (cmd === 4) {
    switch (evt.keyCode) {
      case 13:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== "page-fit") {
          break;
        }

        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
        }

        handled = true;
        break;

      case 82:
        PDFViewerApplication.rotatePages(-90);
        break;
    }
  }

  if (!handled && !isViewerInPresentationMode) {
    if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== "BUTTON") {
      ensureViewerFocused = true;
    }
  }

  if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
  }

  if (handled) {
    evt.preventDefault();
  }
}

function beforeUnload(evt) {
  evt.preventDefault();
  evt.returnValue = "";
  return false;
}

function apiPageLayoutToSpreadMode(layout) {
  switch (layout) {
    case "SinglePage":
    case "OneColumn":
      return _ui_utils.SpreadMode.NONE;

    case "TwoColumnLeft":
    case "TwoPageLeft":
      return _ui_utils.SpreadMode.ODD;

    case "TwoColumnRight":
    case "TwoPageRight":
      return _ui_utils.SpreadMode.EVEN;
  }

  return _ui_utils.SpreadMode.NONE;
}

function apiPageModeToSidebarView(mode) {
  switch (mode) {
    case "UseNone":
      return _ui_utils.SidebarView.NONE;

    case "UseThumbs":
      return _ui_utils.SidebarView.THUMBS;

    case "UseOutlines":
      return _ui_utils.SidebarView.OUTLINE;

    case "UseAttachments":
      return _ui_utils.SidebarView.ATTACHMENTS;

    case "UseOC":
      return _ui_utils.SidebarView.LAYERS;
  }

  return _ui_utils.SidebarView.NONE;
}

const PDFPrintServiceFactory = {
  instance: {
    supportsPrinting: false,

    createPrintService() {
      throw new Error("Not implemented: createPrintService");
    }

  }
};
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.approximateFraction = approximateFraction;
exports.backtrackBeforeAllVisibleElements = backtrackBeforeAllVisibleElements;
exports.binarySearchFirstItem = binarySearchFirstItem;
exports.getActiveOrFocusedElement = getActiveOrFocusedElement;
exports.getOutputScale = getOutputScale;
exports.getPageSizeInches = getPageSizeInches;
exports.getPDFFileNameFromURL = getPDFFileNameFromURL;
exports.getVisibleElements = getVisibleElements;
exports.isPortraitOrientation = isPortraitOrientation;
exports.isValidRotation = isValidRotation;
exports.isValidScrollMode = isValidScrollMode;
exports.isValidSpreadMode = isValidSpreadMode;
exports.moveToEndOfArray = moveToEndOfArray;
exports.noContextMenuHandler = noContextMenuHandler;
exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
exports.normalizeWheelEventDirection = normalizeWheelEventDirection;
exports.parseQueryString = parseQueryString;
exports.roundToDivide = roundToDivide;
exports.scrollIntoView = scrollIntoView;
exports.waitOnEventOrTimeout = waitOnEventOrTimeout;
exports.watchScroll = watchScroll;
exports.WaitOnType = exports.VERTICAL_PADDING = exports.UNKNOWN_SCALE = exports.TextLayerMode = exports.SpreadMode = exports.SidebarView = exports.ScrollMode = exports.SCROLLBAR_PADDING = exports.RendererType = exports.ProgressBar = exports.PresentationModeState = exports.NullL10n = exports.MIN_SCALE = exports.MAX_SCALE = exports.MAX_AUTO_SCALE = exports.EventBus = exports.DEFAULT_SCALE_VALUE = exports.DEFAULT_SCALE = exports.CSS_UNITS = exports.AutoPrintRegExp = exports.animationStarted = void 0;
const CSS_UNITS = 96.0 / 72.0;
exports.CSS_UNITS = CSS_UNITS;
const DEFAULT_SCALE_VALUE = "auto";
exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
const DEFAULT_SCALE = 1.0;
exports.DEFAULT_SCALE = DEFAULT_SCALE;
const MIN_SCALE = 0.1;
exports.MIN_SCALE = MIN_SCALE;
const MAX_SCALE = 10.0;
exports.MAX_SCALE = MAX_SCALE;
const UNKNOWN_SCALE = 0;
exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
const MAX_AUTO_SCALE = 1.25;
exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
const SCROLLBAR_PADDING = 40;
exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
const VERTICAL_PADDING = 5;
exports.VERTICAL_PADDING = VERTICAL_PADDING;
const LOADINGBAR_END_OFFSET_VAR = "--loadingBar-end-offset";
const PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
};
exports.PresentationModeState = PresentationModeState;
const SidebarView = {
  UNKNOWN: -1,
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3,
  LAYERS: 4
};
exports.SidebarView = SidebarView;
const RendererType = {
  CANVAS: "canvas",
  SVG: "svg"
};
exports.RendererType = RendererType;
const TextLayerMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_ENHANCE: 2
};
exports.TextLayerMode = TextLayerMode;
const ScrollMode = {
  UNKNOWN: -1,
  VERTICAL: 0,
  HORIZONTAL: 1,
  WRAPPED: 2
};
exports.ScrollMode = ScrollMode;
const SpreadMode = {
  UNKNOWN: -1,
  NONE: 0,
  ODD: 1,
  EVEN: 2
};
exports.SpreadMode = SpreadMode;
const AutoPrintRegExp = /\bprint\s*\(/;
exports.AutoPrintRegExp = AutoPrintRegExp;

function formatL10nValue(text, args) {
  if (!args) {
    return text;
  }

  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (all, name) => {
    return name in args ? args[name] : "{{" + name + "}}";
  });
}

const NullL10n = {
  async getLanguage() {
    return "en-us";
  },

  async getDirection() {
    return "ltr";
  },

  async get(property, args, fallback) {
    return formatL10nValue(fallback, args);
  },

  async translate(element) {}

};
exports.NullL10n = NullL10n;

function getOutputScale(ctx) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  const pixelRatio = devicePixelRatio / backingStoreRatio;
  return {
    sx: pixelRatio,
    sy: pixelRatio,
    scaled: pixelRatio !== 1
  };
}

function scrollIntoView(element, spot, skipOverflowHiddenElements = false) {
  let parent = element.offsetParent;

  if (!parent) {
    console.error("offsetParent is not set -- cannot scroll");
    return;
  }

  let offsetY = element.offsetTop + element.clientTop;
  let offsetX = element.offsetLeft + element.clientLeft;

  while (parent.clientHeight === parent.scrollHeight && parent.clientWidth === parent.scrollWidth || skipOverflowHiddenElements && getComputedStyle(parent).overflow === "hidden") {
    if (parent.dataset._scaleY) {
      offsetY /= parent.dataset._scaleY;
      offsetX /= parent.dataset._scaleX;
    }

    offsetY += parent.offsetTop;
    offsetX += parent.offsetLeft;
    parent = parent.offsetParent;

    if (!parent) {
      return;
    }
  }

  if (spot) {
    if (spot.top !== undefined) {
      offsetY += spot.top;
    }

    if (spot.left !== undefined) {
      offsetX += spot.left;
      parent.scrollLeft = offsetX;
    }
  }

  parent.scrollTop = offsetY;
}

function watchScroll(viewAreaElement, callback) {
  const debounceScroll = function (evt) {
    if (rAF) {
      return;
    }

    rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
      rAF = null;
      const currentX = viewAreaElement.scrollLeft;
      const lastX = state.lastX;

      if (currentX !== lastX) {
        state.right = currentX > lastX;
      }

      state.lastX = currentX;
      const currentY = viewAreaElement.scrollTop;
      const lastY = state.lastY;

      if (currentY !== lastY) {
        state.down = currentY > lastY;
      }

      state.lastY = currentY;
      callback(state);
    });
  };

  const state = {
    right: true,
    down: true,
    lastX: viewAreaElement.scrollLeft,
    lastY: viewAreaElement.scrollTop,
    _eventHandler: debounceScroll
  };
  let rAF = null;
  viewAreaElement.addEventListener("scroll", debounceScroll, true);
  return state;
}

function parseQueryString(query) {
  const parts = query.split("&");
  const params = Object.create(null);

  for (let i = 0, ii = parts.length; i < ii; ++i) {
    const param = parts[i].split("=");
    const key = param[0].toLowerCase();
    const value = param.length > 1 ? param[1] : null;
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return params;
}

function binarySearchFirstItem(items, condition) {
  let minIndex = 0;
  let maxIndex = items.length - 1;

  if (maxIndex < 0 || !condition(items[maxIndex])) {
    return items.length;
  }

  if (condition(items[minIndex])) {
    return minIndex;
  }

  while (minIndex < maxIndex) {
    const currentIndex = minIndex + maxIndex >> 1;
    const currentItem = items[currentIndex];

    if (condition(currentItem)) {
      maxIndex = currentIndex;
    } else {
      minIndex = currentIndex + 1;
    }
  }

  return minIndex;
}

function approximateFraction(x) {
  if (Math.floor(x) === x) {
    return [x, 1];
  }

  const xinv = 1 / x;
  const limit = 8;

  if (xinv > limit) {
    return [1, limit];
  } else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
  }

  const x_ = x > 1 ? xinv : x;
  let a = 0,
      b = 1,
      c = 1,
      d = 1;

  while (true) {
    const p = a + c,
          q = b + d;

    if (q > limit) {
      break;
    }

    if (x_ <= p / q) {
      c = p;
      d = q;
    } else {
      a = p;
      b = q;
    }
  }

  let result;

  if (x_ - a / b < c / d - x_) {
    result = x_ === x ? [a, b] : [b, a];
  } else {
    result = x_ === x ? [c, d] : [d, c];
  }

  return result;
}

function roundToDivide(x, div) {
  const r = x % div;
  return r === 0 ? x : Math.round(x - r + div);
}

function getPageSizeInches({
  view,
  userUnit,
  rotate
}) {
  const [x1, y1, x2, y2] = view;
  const changeOrientation = rotate % 180 !== 0;
  const width = (x2 - x1) / 72 * userUnit;
  const height = (y2 - y1) / 72 * userUnit;
  return {
    width: changeOrientation ? height : width,
    height: changeOrientation ? width : height
  };
}

function backtrackBeforeAllVisibleElements(index, views, top) {
  if (index < 2) {
    return index;
  }

  let elt = views[index].div;
  let pageTop = elt.offsetTop + elt.clientTop;

  if (pageTop >= top) {
    elt = views[index - 1].div;
    pageTop = elt.offsetTop + elt.clientTop;
  }

  for (let i = index - 2; i >= 0; --i) {
    elt = views[i].div;

    if (elt.offsetTop + elt.clientTop + elt.clientHeight <= pageTop) {
      break;
    }

    index = i;
  }

  return index;
}

function getVisibleElements({
  scrollEl,
  views,
  sortByVisibility = false,
  horizontal = false,
  rtl = false
}) {
  const top = scrollEl.scrollTop,
        bottom = top + scrollEl.clientHeight;
  const left = scrollEl.scrollLeft,
        right = left + scrollEl.clientWidth;

  function isElementBottomAfterViewTop(view) {
    const element = view.div;
    const elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
  }

  function isElementNextAfterViewHorizontally(view) {
    const element = view.div;
    const elementLeft = element.offsetLeft + element.clientLeft;
    const elementRight = elementLeft + element.clientWidth;
    return rtl ? elementLeft < right : elementRight > left;
  }

  const visible = [],
        numViews = views.length;
  let firstVisibleElementInd = binarySearchFirstItem(views, horizontal ? isElementNextAfterViewHorizontally : isElementBottomAfterViewTop);

  if (firstVisibleElementInd > 0 && firstVisibleElementInd < numViews && !horizontal) {
    firstVisibleElementInd = backtrackBeforeAllVisibleElements(firstVisibleElementInd, views, top);
  }

  let lastEdge = horizontal ? right : -1;

  for (let i = firstVisibleElementInd; i < numViews; i++) {
    const view = views[i],
          element = view.div;
    const currentWidth = element.offsetLeft + element.clientLeft;
    const currentHeight = element.offsetTop + element.clientTop;
    const viewWidth = element.clientWidth,
          viewHeight = element.clientHeight;
    const viewRight = currentWidth + viewWidth;
    const viewBottom = currentHeight + viewHeight;

    if (lastEdge === -1) {
      if (viewBottom >= bottom) {
        lastEdge = viewBottom;
      }
    } else if ((horizontal ? currentWidth : currentHeight) > lastEdge) {
      break;
    }

    if (viewBottom <= top || currentHeight >= bottom || viewRight <= left || currentWidth >= right) {
      continue;
    }

    const hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
    const hiddenWidth = Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);
    const fractionHeight = (viewHeight - hiddenHeight) / viewHeight,
          fractionWidth = (viewWidth - hiddenWidth) / viewWidth;
    const percent = fractionHeight * fractionWidth * 100 | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view,
      percent,
      widthPercent: fractionWidth * 100 | 0
    });
  }

  const first = visible[0],
        last = visible[visible.length - 1];

  if (sortByVisibility) {
    visible.sort(function (a, b) {
      const pc = a.percent - b.percent;

      if (Math.abs(pc) > 0.001) {
        return -pc;
      }

      return a.id - b.id;
    });
  }

  return {
    first,
    last,
    views: visible
  };
}

function noContextMenuHandler(evt) {
  evt.preventDefault();
}

function isDataSchema(url) {
  let i = 0;
  const ii = url.length;

  while (i < ii && url[i].trim() === "") {
    i++;
  }

  return url.substring(i, i + 5).toLowerCase() === "data:";
}

function getPDFFileNameFromURL(url, defaultFilename = "document.pdf") {
  if (typeof url !== "string") {
    return defaultFilename;
  }

  if (isDataSchema(url)) {
    console.warn("getPDFFileNameFromURL: " + 'ignoring "data:" URL for performance reasons.');
    return defaultFilename;
  }

  const reURI = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
  const reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
  const splitURI = reURI.exec(url);
  let suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);

  if (suggestedFilename) {
    suggestedFilename = suggestedFilename[0];

    if (suggestedFilename.includes("%")) {
      try {
        suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
      } catch (ex) {}
    }
  }

  return suggestedFilename || defaultFilename;
}

function normalizeWheelEventDirection(evt) {
  let delta = Math.sqrt(evt.deltaX * evt.deltaX + evt.deltaY * evt.deltaY);
  const angle = Math.atan2(evt.deltaY, evt.deltaX);

  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
    delta = -delta;
  }

  return delta;
}

function normalizeWheelEventDelta(evt) {
  let delta = normalizeWheelEventDirection(evt);
  const MOUSE_DOM_DELTA_PIXEL_MODE = 0;
  const MOUSE_DOM_DELTA_LINE_MODE = 1;
  const MOUSE_PIXELS_PER_LINE = 30;
  const MOUSE_LINES_PER_PAGE = 30;

  if (evt.deltaMode === MOUSE_DOM_DELTA_PIXEL_MODE) {
    delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
  } else if (evt.deltaMode === MOUSE_DOM_DELTA_LINE_MODE) {
    delta /= MOUSE_LINES_PER_PAGE;
  }

  return delta;
}

function isValidRotation(angle) {
  return Number.isInteger(angle) && angle % 90 === 0;
}

function isValidScrollMode(mode) {
  return Number.isInteger(mode) && Object.values(ScrollMode).includes(mode) && mode !== ScrollMode.UNKNOWN;
}

function isValidSpreadMode(mode) {
  return Number.isInteger(mode) && Object.values(SpreadMode).includes(mode) && mode !== SpreadMode.UNKNOWN;
}

function isPortraitOrientation(size) {
  return size.width <= size.height;
}

const WaitOnType = {
  EVENT: "event",
  TIMEOUT: "timeout"
};
exports.WaitOnType = WaitOnType;

function waitOnEventOrTimeout({
  target,
  name,
  delay = 0
}) {
  return new Promise(function (resolve, reject) {
    if (typeof target !== "object" || !(name && typeof name === "string") || !(Number.isInteger(delay) && delay >= 0)) {
      throw new Error("waitOnEventOrTimeout - invalid parameters.");
    }

    function handler(type) {
      if (target instanceof EventBus) {
        target._off(name, eventHandler);
      } else {
        target.removeEventListener(name, eventHandler);
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      resolve(type);
    }

    const eventHandler = handler.bind(null, WaitOnType.EVENT);

    if (target instanceof EventBus) {
      target._on(name, eventHandler);
    } else {
      target.addEventListener(name, eventHandler);
    }

    const timeoutHandler = handler.bind(null, WaitOnType.TIMEOUT);
    const timeout = setTimeout(timeoutHandler, delay);
  });
}

const animationStarted = new Promise(function (resolve) {
  window.requestAnimationFrame(resolve);
});
exports.animationStarted = animationStarted;

function dispatchDOMEvent(eventName, args = null) {
  throw new Error("Not implemented: dispatchDOMEvent");
}

class EventBus {
  constructor(options) {
    this._listeners = Object.create(null);
  }

  on(eventName, listener, options = null) {
    this._on(eventName, listener, {
      external: true,
      once: options && options.once //?.
    });
  }

  off(eventName, listener, options = null) {
    this._off(eventName, listener, {
      external: true,
      once: options && options.once //?.
    });
  }

  dispatch(eventName) {
    const eventListeners = this._listeners[eventName];

    if (!eventListeners || eventListeners.length === 0) {
      return;
    }

    const args = Array.prototype.slice.call(arguments, 1);
    let externalListeners;
    eventListeners.slice(0).forEach(({
      listener,
      external,
      once
    }) => {
      if (once) {
        this._off(eventName, listener);
      }

      if (external) {
        (externalListeners || (externalListeners = [])).push(listener);
        return;
      }

      listener.apply(null, args);
    });

    if (externalListeners) {
      externalListeners.forEach(listener => {
        listener.apply(null, args);
      });
      externalListeners = null;
    }
  }

  _on(eventName, listener, options = null) {
    var _this$_listeners;

    const eventListeners = (_this$_listeners = this._listeners)[eventName] || (_this$_listeners[eventName] = []);
    eventListeners.push({
      listener,
      external: options && options.external === true, //?.
      once: options && options.once === true //?.
    });
  }

  _off(eventName, listener, options = null) {
    const eventListeners = this._listeners[eventName];

    if (!eventListeners) {
      return;
    }

    for (let i = 0, ii = eventListeners.length; i < ii; i++) {
      if (eventListeners[i].listener === listener) {
        eventListeners.splice(i, 1);
        return;
      }
    }
  }

}

exports.EventBus = EventBus;

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

class ProgressBar {
  constructor(id, {
    height,
    width,
    units
  } = {}) {
    this.visible = true;
    this.div = document.querySelector(id + " .progress");
    this.bar = this.div.parentNode;
    this.height = height || 100;
    this.width = width || 100;
    this.units = units || "%";
    this.div.style.height = this.height + this.units;
    this.percent = 0;
  }

  _updateBar() {
    if (this._indeterminate) {
      this.div.classList.add("indeterminate");
      this.div.style.width = this.width + this.units;
      return;
    }

    this.div.classList.remove("indeterminate");
    const progressSize = this.width * this._percent / 100;
    this.div.style.width = progressSize + this.units;
  }

  get percent() {
    return this._percent;
  }

  set percent(val) {
    this._indeterminate = isNaN(val);
    this._percent = clamp(val, 0, 100);

    this._updateBar();
  }

  setWidth(viewer) {
    if (!viewer) {
      return;
    }

    const container = viewer.parentNode;
    const scrollbarWidth = container.offsetWidth - viewer.offsetWidth;

    if (scrollbarWidth > 0) {
      const doc = document.documentElement;
      doc.style.setProperty(LOADINGBAR_END_OFFSET_VAR, `${scrollbarWidth}px`);
    }
  }

  hide() {
    if (!this.visible) {
      return;
    }

    this.visible = false;
    this.bar.classList.add("hidden");
  }

  show() {
    if (this.visible) {
      return;
    }

    this.visible = true;
    this.bar.classList.remove("hidden");
  }

}

exports.ProgressBar = ProgressBar;

function moveToEndOfArray(arr, condition) {
  const moved = [],
        len = arr.length;
  let write = 0;

  for (let read = 0; read < len; ++read) {
    if (condition(arr[read])) {
      moved.push(arr[read]);
    } else {
      arr[write] = arr[read];
      ++write;
    }
  }

  for (let read = 0; write < len; ++read, ++write) {
    arr[write] = moved[read];
  }
}

function getActiveOrFocusedElement() {
  let curRoot = document;
  let curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");

  while (curActiveOrFocused && curActiveOrFocused.shadowRoot) {
    curRoot = curActiveOrFocused.shadowRoot;
    curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");
  }

  return curActiveOrFocused;
}

/***/ }),
/* 5 */
/***/ ((module) => {


module.exports = pdfjsLib;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFCursorTools = exports.CursorTool = void 0;

var _grab_to_pan = __webpack_require__(7);

var _ui_utils = __webpack_require__(4);

const CursorTool = {
  SELECT: 0,
  HAND: 1,
  ZOOM: 2
};
exports.CursorTool = CursorTool;

class PDFCursorTools {
  constructor({
    container,
    eventBus,
    cursorToolOnLoad = CursorTool.SELECT
  }) {
    this.container = container;
    this.eventBus = eventBus;
    this.active = CursorTool.SELECT;
    this.activeBeforePresentationMode = null;
    this.handTool = new _grab_to_pan.GrabToPan({
      element: this.container
    });

    this._addEventListeners();

    Promise.resolve().then(() => {
      this.switchTool(cursorToolOnLoad);
    });
  }

  get activeTool() {
    return this.active;
  }

  switchTool(tool) {
    if (this.activeBeforePresentationMode !== null) {
      return;
    }

    if (tool === this.active) {
      return;
    }

    const disableActiveTool = () => {
      switch (this.active) {
        case CursorTool.SELECT:
          break;

        case CursorTool.HAND:
          this.handTool.deactivate();
          break;

        case CursorTool.ZOOM:
      }
    };

    switch (tool) {
      case CursorTool.SELECT:
        disableActiveTool();
        break;

      case CursorTool.HAND:
        disableActiveTool();
        this.handTool.activate();
        break;

      case CursorTool.ZOOM:
      default:
        console.error(`switchTool: "${tool}" is an unsupported value.`);
        return;
    }

    this.active = tool;

    this._dispatchEvent();
  }

  _dispatchEvent() {
    this.eventBus.dispatch("cursortoolchanged", {
      source: this,
      tool: this.active
    });
  }

  _addEventListeners() {
    this.eventBus._on("switchcursortool", evt => {
      this.switchTool(evt.tool);
    });

    this.eventBus._on("presentationmodechanged", evt => {
      switch (evt.state) {
        case _ui_utils.PresentationModeState.CHANGING:
          break;

        case _ui_utils.PresentationModeState.FULLSCREEN:
          {
            const previouslyActive = this.active;
            this.switchTool(CursorTool.SELECT);
            this.activeBeforePresentationMode = previouslyActive;
            break;
          }

        case _ui_utils.PresentationModeState.NORMAL:
          {
            const previouslyActive = this.activeBeforePresentationMode;
            this.activeBeforePresentationMode = null;
            this.switchTool(previouslyActive);
            break;
          }
      }
    });
  }

}

exports.PDFCursorTools = PDFCursorTools;

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GrabToPan = GrabToPan;

function GrabToPan(options) {
  this.element = options.element;
  this.document = options.element.ownerDocument;

  if (typeof options.ignoreTarget === "function") {
    this.ignoreTarget = options.ignoreTarget;
  }

  this.onActiveChanged = options.onActiveChanged;
  this.activate = this.activate.bind(this);
  this.deactivate = this.deactivate.bind(this);
  this.toggle = this.toggle.bind(this);
  this._onmousedown = this._onmousedown.bind(this);
  this._onmousemove = this._onmousemove.bind(this);
  this._endPan = this._endPan.bind(this);
  const overlay = this.overlay = document.createElement("div");
  overlay.className = "grab-to-pan-grabbing";
}

GrabToPan.prototype = {
  CSS_CLASS_GRAB: "grab-to-pan-grab",
  activate: function GrabToPan_activate() {
    if (!this.active) {
      this.active = true;
      this.element.addEventListener("mousedown", this._onmousedown, true);
      this.element.classList.add(this.CSS_CLASS_GRAB);

      if (this.onActiveChanged) {
        this.onActiveChanged(true);
      }
    }
  },
  deactivate: function GrabToPan_deactivate() {
    if (this.active) {
      this.active = false;
      this.element.removeEventListener("mousedown", this._onmousedown, true);

      this._endPan();

      this.element.classList.remove(this.CSS_CLASS_GRAB);

      if (this.onActiveChanged) {
        this.onActiveChanged(false);
      }
    }
  },
  toggle: function GrabToPan_toggle() {
    if (this.active) {
      this.deactivate();
    } else {
      this.activate();
    }
  },
  ignoreTarget: function GrabToPan_ignoreTarget(node) {
    return node[matchesSelector]("a[href], a[href] *, input, textarea, button, button *, select, option");
  },
  _onmousedown: function GrabToPan__onmousedown(event) {
    if (event.button !== 0 || this.ignoreTarget(event.target)) {
      return;
    }

    if (event.originalTarget) {
      try {
        event.originalTarget.tagName;
      } catch (e) {
        return;
      }
    }

    this.scrollLeftStart = this.element.scrollLeft;
    this.scrollTopStart = this.element.scrollTop;
    this.clientXStart = event.clientX;
    this.clientYStart = event.clientY;
    this.document.addEventListener("mousemove", this._onmousemove, true);
    this.document.addEventListener("mouseup", this._endPan, true);
    this.element.addEventListener("scroll", this._endPan, true);
    event.preventDefault();
    event.stopPropagation();
    const focusedElement = document.activeElement;

    if (focusedElement && !focusedElement.contains(event.target)) {
      focusedElement.blur();
    }
  },
  _onmousemove: function GrabToPan__onmousemove(event) {
    this.element.removeEventListener("scroll", this._endPan, true);

    if (isLeftMouseReleased(event)) {
      this._endPan();

      return;
    }

    const xDiff = event.clientX - this.clientXStart;
    const yDiff = event.clientY - this.clientYStart;
    const scrollTop = this.scrollTopStart - yDiff;
    const scrollLeft = this.scrollLeftStart - xDiff;

    if (this.element.scrollTo) {
      this.element.scrollTo({
        top: scrollTop,
        left: scrollLeft,
        behavior: "instant"
      });
    } else {
      this.element.scrollTop = scrollTop;
      this.element.scrollLeft = scrollLeft;
    }

    if (!this.overlay.parentNode) {
      document.body.appendChild(this.overlay);
    }
  },
  _endPan: function GrabToPan__endPan() {
    this.element.removeEventListener("scroll", this._endPan, true);
    this.document.removeEventListener("mousemove", this._onmousemove, true);
    this.document.removeEventListener("mouseup", this._endPan, true);
    this.overlay.remove();
  }
};
let matchesSelector;
["webkitM", "mozM", "m"].some(function (prefix) {
  let name = prefix + "atches";

  if (name in document.documentElement) {
    matchesSelector = name;
  }

  name += "Selector";

  if (name in document.documentElement) {
    matchesSelector = name;
  }

  return matchesSelector;
});
const isNotIEorIsIE10plus = !document.documentMode || document.documentMode > 9;
const chrome = window.chrome;
const isChrome15OrOpera15plus = chrome && (chrome.webstore || chrome.app);
const isSafari6plus = /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);

function isLeftMouseReleased(event) {
  if ("buttons" in event && isNotIEorIsIE10plus) {
    return !(event.buttons & 1);
  }

  if (isChrome15OrOpera15plus || isSafari6plus) {
    return event.which === 0;
  }

  return false;
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RenderingStates = exports.PDFRenderingQueue = void 0;

var _pdfjsLib = __webpack_require__(5);

const CLEANUP_TIMEOUT = 30000;
const RenderingStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
};
exports.RenderingStates = RenderingStates;

class PDFRenderingQueue {
  constructor() {
    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
  }

  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }

  setThumbnailViewer(pdfThumbnailViewer) {
    this.pdfThumbnailViewer = pdfThumbnailViewer;
  }

  isHighestPriority(view) {
    return this.highestPriorityPage === view.renderingId;
  }

  renderHighestPriority(currentlyVisiblePages) {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }

    if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
      return;
    }

    if (this.pdfThumbnailViewer && this.isThumbnailViewEnabled) {
      if (this.pdfThumbnailViewer.forceRendering()) {
        return;
      }
    }

    if (this.printing) {
      return;
    }

    if (this.onIdle) {
      this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
    }
  }

  getHighestPriority(visible, views, scrolledDown) {
    const visibleViews = visible.views;
    const numVisible = visibleViews.length;

    if (numVisible === 0) {
      return null;
    }

    for (let i = 0; i < numVisible; ++i) {
      const view = visibleViews[i].view;

      if (!this.isViewFinished(view)) {
        return view;
      }
    }

    if (scrolledDown) {
      const nextPageIndex = visible.last.id;

      if (views[nextPageIndex] && !this.isViewFinished(views[nextPageIndex])) {
        return views[nextPageIndex];
      }
    } else {
      const previousPageIndex = visible.first.id - 2;

      if (views[previousPageIndex] && !this.isViewFinished(views[previousPageIndex])) {
        return views[previousPageIndex];
      }
    }

    return null;
  }

  isViewFinished(view) {
    return view.renderingState === RenderingStates.FINISHED;
  }

  renderView(view) {
    switch (view.renderingState) {
      case RenderingStates.FINISHED:
        return false;

      case RenderingStates.PAUSED:
        this.highestPriorityPage = view.renderingId;
        view.resume();
        break;

      case RenderingStates.RUNNING:
        this.highestPriorityPage = view.renderingId;
        break;

      case RenderingStates.INITIAL:
        this.highestPriorityPage = view.renderingId;
        view.draw().finally(() => {
          this.renderHighestPriority();
        }).catch(reason => {
          if (reason instanceof _pdfjsLib.RenderingCancelledException) {
            return;
          }

          console.error(`renderView: "${reason}"`);
        });
        break;
    }

    return true;
  }

}

exports.PDFRenderingQueue = PDFRenderingQueue;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OverlayManager = void 0;

class OverlayManager {
  constructor() {
    this._overlays = {};
    this._active = null;
    this._keyDownBound = this._keyDown.bind(this);
  }

  get active() {
    return this._active;
  }

  async register(name, element, callerCloseMethod = null, canForceClose = false) {
    let container;

    if (!name || !element || !(container = element.parentNode)) {
      throw new Error("Not enough parameters.");
    } else if (this._overlays[name]) {
      throw new Error("The overlay is already registered.");
    }

    this._overlays[name] = {
      element,
      container,
      callerCloseMethod,
      canForceClose
    };
  }

  async unregister(name) {
    if (!this._overlays[name]) {
      throw new Error("The overlay does not exist.");
    } else if (this._active === name) {
      throw new Error("The overlay cannot be removed while it is active.");
    }

    delete this._overlays[name];
  }

  async open(name) {
    if (!this._overlays[name]) {
      throw new Error("The overlay does not exist.");
    } else if (this._active) {
      if (this._overlays[name].canForceClose) {
        this._closeThroughCaller();
      } else if (this._active === name) {
        throw new Error("The overlay is already active.");
      } else {
        throw new Error("Another overlay is currently active.");
      }
    }

    this._active = name;

    this._overlays[this._active].element.classList.remove("hidden");

    this._overlays[this._active].container.classList.remove("hidden");

    window.addEventListener("keydown", this._keyDownBound);
  }

  async close(name) {
    if (!this._overlays[name]) {
      throw new Error("The overlay does not exist.");
    } else if (!this._active) {
      throw new Error("The overlay is currently not active.");
    } else if (this._active !== name) {
      throw new Error("Another overlay is currently active.");
    }

    this._overlays[this._active].container.classList.add("hidden");

    this._overlays[this._active].element.classList.add("hidden");

    this._active = null;
    window.removeEventListener("keydown", this._keyDownBound);
  }

  _keyDown(evt) {
    if (this._active && evt.keyCode === 27) {
      this._closeThroughCaller();

      evt.preventDefault();
    }
  }

  _closeThroughCaller() {
    if (this._overlays[this._active].callerCloseMethod) {
      this._overlays[this._active].callerCloseMethod();
    }

    if (this._active) {
      this.close(this._active);
    }
  }

}

exports.OverlayManager = OverlayManager;

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PasswordPrompt = void 0;

var _ui_utils = __webpack_require__(4);

var _pdfjsLib = __webpack_require__(5);

class PasswordPrompt {
  constructor(options, overlayManager, l10n = _ui_utils.NullL10n) {
    this.overlayName = options.overlayName;
    this.container = options.container;
    this.label = options.label;
    this.input = options.input;
    this.submitButton = options.submitButton;
    this.cancelButton = options.cancelButton;
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this.updateCallback = null;
    this.reason = null;
    this.submitButton.addEventListener("click", this.verify.bind(this));
    this.cancelButton.addEventListener("click", this.close.bind(this));
    this.input.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        this.verify();
      }
    });
    this.overlayManager.register(this.overlayName, this.container, this.close.bind(this), true);
  }

  open() {
    this.overlayManager.open(this.overlayName).then(() => {
      this.input.focus();
      let promptString;

      if (this.reason === _pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {
        promptString = this.l10n.get("password_invalid", null, "Invalid password. Please try again.");
      } else {
        promptString = this.l10n.get("password_label", null, "Enter the password to open this PDF file.");
      }

      promptString.then(msg => {
        this.label.textContent = msg;
      });
    });
  }

  close() {
    this.overlayManager.close(this.overlayName).then(() => {
      this.input.value = "";
    });
  }

  verify() {
    const password = this.input.value;

    if (password && password.length > 0) {
      this.close();
      this.updateCallback(password);
    }
  }

  setUpdateCallback(updateCallback, reason) {
    this.updateCallback = updateCallback;
    this.reason = reason;
  }

}

exports.PasswordPrompt = PasswordPrompt;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFAttachmentViewer = void 0;

var _pdfjsLib = __webpack_require__(5);

var _base_tree_viewer = __webpack_require__(12);

var _viewer_compatibility = __webpack_require__(2);

const PdfFileRegExp = /\.pdf$/i;

class PDFAttachmentViewer extends _base_tree_viewer.BaseTreeViewer {
  constructor(options) {
    super(options);
    this.downloadManager = options.downloadManager;

    this.eventBus._on("fileattachmentannotation", this._appendAttachment.bind(this));
  }

  reset(keepRenderedCapability = false) {
    super.reset();
    this._attachments = null;

    if (!keepRenderedCapability) {
      this._renderedCapability = (0, _pdfjsLib.createPromiseCapability)();
    }

    if (this._pendingDispatchEvent) {
      clearTimeout(this._pendingDispatchEvent);
    }

    this._pendingDispatchEvent = null;
  }

  _dispatchEvent(attachmentsCount) {
    this._renderedCapability.resolve();

    if (this._pendingDispatchEvent) {
      clearTimeout(this._pendingDispatchEvent);
      this._pendingDispatchEvent = null;
    }

    if (attachmentsCount === 0) {
      this._pendingDispatchEvent = setTimeout(() => {
        this.eventBus.dispatch("attachmentsloaded", {
          source: this,
          attachmentsCount: 0
        });
        this._pendingDispatchEvent = null;
      });
      return;
    }

    this.eventBus.dispatch("attachmentsloaded", {
      source: this,
      attachmentsCount
    });
  }

  _bindPdfLink(element, {
    content,
    filename
  }) {
    let blobUrl;

    element.onclick = () => {
      if (!blobUrl) {
        blobUrl = URL.createObjectURL(new Blob([content], {
          type: "application/pdf"
        }));
      }

      let viewerUrl;
      viewerUrl = "?file=" + encodeURIComponent(blobUrl + "#" + filename);

      try {
        window.open(viewerUrl);
      } catch (ex) {
        console.error(`_bindPdfLink: ${ex}`);
        URL.revokeObjectURL(blobUrl);
        blobUrl = null;
        this.downloadManager.downloadData(content, filename, "application/pdf");
      }

      return false;
    };
  }

  _bindLink(element, {
    content,
    filename
  }) {
    element.onclick = () => {
      const contentType = PdfFileRegExp.test(filename) ? "application/pdf" : "";
      this.downloadManager.downloadData(content, filename, contentType);
      return false;
    };
  }

  render({
    attachments,
    keepRenderedCapability = false
  }) {
    if (this._attachments) {
      this.reset(keepRenderedCapability);
    }

    this._attachments = attachments || null;

    if (!attachments) {
      this._dispatchEvent(0);

      return;
    }

    const names = Object.keys(attachments).sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    const fragment = document.createDocumentFragment();
    let attachmentsCount = 0;

    for (const name of names) {
      const item = attachments[name];
      const filename = (0, _pdfjsLib.getFilenameFromUrl)(item.filename);
      const div = document.createElement("div");
      div.className = "treeItem";
      const element = document.createElement("a");

      if (PdfFileRegExp.test(filename) && !_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
        this._bindPdfLink(element, {
          content: item.content,
          filename
        });
      } else {
        this._bindLink(element, {
          content: item.content,
          filename
        });
      }

      element.textContent = this._normalizeTextContent(filename);
      div.appendChild(element);
      fragment.appendChild(div);
      attachmentsCount++;
    }

    this._finishRendering(fragment, attachmentsCount);
  }

  _appendAttachment({
    id,
    filename,
    content
  }) {
    const renderedPromise = this._renderedCapability.promise;
    renderedPromise.then(() => {
      if (renderedPromise !== this._renderedCapability.promise) {
        return;
      }

      let attachments = this._attachments;

      if (!attachments) {
        attachments = Object.create(null);
      } else {
        for (const name in attachments) {
          if (id === name) {
            return;
          }
        }
      }

      attachments[id] = {
        filename,
        content
      };
      this.render({
        attachments,
        keepRenderedCapability: true
      });
    });
  }

}

exports.PDFAttachmentViewer = PDFAttachmentViewer;

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseTreeViewer = void 0;

var _pdfjsLib = __webpack_require__(5);

const TREEITEM_OFFSET_TOP = -100;
const TREEITEM_SELECTED_CLASS = "selected";

class BaseTreeViewer {
  constructor(options) {
    if (this.constructor === BaseTreeViewer) {
      throw new Error("Cannot initialize BaseTreeViewer.");
    }

    this.container = options.container;
    this.eventBus = options.eventBus;
    this.reset();
  }

  reset() {
    this._pdfDocument = null;
    this._lastToggleIsShow = true;
    this._currentTreeItem = null;
    this.container.textContent = "";
    this.container.classList.remove("treeWithDeepNesting");
  }

  _dispatchEvent(count) {
    throw new Error("Not implemented: _dispatchEvent");
  }

  _bindLink(element, params) {
    throw new Error("Not implemented: _bindLink");
  }

  _normalizeTextContent(str) {
    return (0, _pdfjsLib.removeNullCharacters)(str) || "\u2013";
  }

  _addToggleButton(div, hidden = false) {
    const toggler = document.createElement("div");
    toggler.className = "treeItemToggler";

    if (hidden) {
      toggler.classList.add("treeItemsHidden");
    }

    toggler.onclick = evt => {
      evt.stopPropagation();
      toggler.classList.toggle("treeItemsHidden");

      if (evt.shiftKey) {
        const shouldShowAll = !toggler.classList.contains("treeItemsHidden");

        this._toggleTreeItem(div, shouldShowAll);
      }
    };

    div.insertBefore(toggler, div.firstChild);
  }

  _toggleTreeItem(root, show = false) {
    this._lastToggleIsShow = show;

    for (const toggler of root.querySelectorAll(".treeItemToggler")) {
      toggler.classList.toggle("treeItemsHidden", !show);
    }
  }

  _toggleAllTreeItems() {
    this._toggleTreeItem(this.container, !this._lastToggleIsShow);
  }

  _finishRendering(fragment, count, hasAnyNesting = false) {
    if (hasAnyNesting) {
      this.container.classList.add("treeWithDeepNesting");
      this._lastToggleIsShow = !fragment.querySelector(".treeItemsHidden");
    }

    this.container.appendChild(fragment);

    this._dispatchEvent(count);
  }

  render(params) {
    throw new Error("Not implemented: render");
  }

  _updateCurrentTreeItem(treeItem = null) {
    if (this._currentTreeItem) {
      this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS);

      this._currentTreeItem = null;
    }

    if (treeItem) {
      treeItem.classList.add(TREEITEM_SELECTED_CLASS);
      this._currentTreeItem = treeItem;
    }
  }

  _scrollToCurrentTreeItem(treeItem) {
    if (!treeItem) {
      return;
    }

    let currentNode = treeItem.parentNode;

    while (currentNode && currentNode !== this.container) {
      if (currentNode.classList.contains("treeItem")) {
        const toggler = currentNode.firstElementChild;
        toggler && toggler.classList.remove("treeItemsHidden"); //?.
      }

      currentNode = currentNode.parentNode;
    }

    this._updateCurrentTreeItem(treeItem);

    this.container.scrollTo(treeItem.offsetLeft, treeItem.offsetTop + TREEITEM_OFFSET_TOP);
  }

}

exports.BaseTreeViewer = BaseTreeViewer;

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFDocumentProperties = void 0;

var _pdfjsLib = __webpack_require__(5);

var _ui_utils = __webpack_require__(4);

const DEFAULT_FIELD_CONTENT = "-";
const NON_METRIC_LOCALES = ["en-us", "en-lr", "my"];
const US_PAGE_NAMES = {
  "8.5x11": "Letter",
  "8.5x14": "Legal"
};
const METRIC_PAGE_NAMES = {
  "297x420": "A3",
  "210x297": "A4"
};

function getPageName(size, isPortrait, pageNames) {
  const width = isPortrait ? size.width : size.height;
  const height = isPortrait ? size.height : size.width;
  return pageNames[`${width}x${height}`];
}

class PDFDocumentProperties {
  constructor({
    overlayName,
    fields,
    container,
    closeButton
  }, overlayManager, eventBus, l10n = _ui_utils.NullL10n) {
    this.overlayName = overlayName;
    this.fields = fields;
    this.container = container;
    this.overlayManager = overlayManager;
    this.l10n = l10n;

    this._reset();

    closeButton.addEventListener("click", this.close.bind(this));
    this.overlayManager.register(this.overlayName, this.container, this.close.bind(this));

    eventBus._on("pagechanging", evt => {
      this._currentPageNumber = evt.pageNumber;
    });

    eventBus._on("rotationchanging", evt => {
      this._pagesRotation = evt.pagesRotation;
    });

    this._isNonMetricLocale = true;
    l10n.getLanguage().then(locale => {
      this._isNonMetricLocale = NON_METRIC_LOCALES.includes(locale);
    });
  }

  async open() {
    const freezeFieldData = data => {
      Object.defineProperty(this, "fieldData", {
        value: Object.freeze(data),
        writable: false,
        enumerable: true,
        configurable: true
      });
    };

    await Promise.all([this.overlayManager.open(this.overlayName), this._dataAvailableCapability.promise]);
    const currentPageNumber = this._currentPageNumber;
    const pagesRotation = this._pagesRotation;

    if (this.fieldData && currentPageNumber === this.fieldData._currentPageNumber && pagesRotation === this.fieldData._pagesRotation) {
      this._updateUI();

      return;
    }

    const {
      info,
      contentDispositionFilename,
      contentLength
    } = await this.pdfDocument.getMetadata();
    const [fileName, fileSize, creationDate, modificationDate, pageSize, isLinearized] = await Promise.all([contentDispositionFilename || (0, _ui_utils.getPDFFileNameFromURL)(this.url), this._parseFileSize(contentLength), this._parseDate(info.CreationDate), this._parseDate(info.ModDate), this.pdfDocument.getPage(currentPageNumber).then(pdfPage => {
      return this._parsePageSize((0, _ui_utils.getPageSizeInches)(pdfPage), pagesRotation);
    }), this._parseLinearization(info.IsLinearized)]);
    freezeFieldData({
      fileName,
      fileSize,
      title: info.Title,
      author: info.Author,
      subject: info.Subject,
      keywords: info.Keywords,
      creationDate,
      modificationDate,
      creator: info.Creator,
      producer: info.Producer,
      version: info.PDFFormatVersion,
      pageCount: this.pdfDocument.numPages,
      pageSize,
      linearized: isLinearized,
      _currentPageNumber: currentPageNumber,
      _pagesRotation: pagesRotation
    });

    this._updateUI();

    const {
      length
    } = await this.pdfDocument.getDownloadInfo();

    if (contentLength === length) {
      return;
    }

    const data = Object.assign(Object.create(null), this.fieldData);
    data.fileSize = await this._parseFileSize(length);
    freezeFieldData(data);

    this._updateUI();
  }

  close() {
    this.overlayManager.close(this.overlayName);
  }

  setDocument(pdfDocument, url = null) {
    if (this.pdfDocument) {
      this._reset();

      this._updateUI(true);
    }

    if (!pdfDocument) {
      return;
    }

    this.pdfDocument = pdfDocument;
    this.url = url;

    this._dataAvailableCapability.resolve();
  }

  _reset() {
    this.pdfDocument = null;
    this.url = null;
    delete this.fieldData;
    this._dataAvailableCapability = (0, _pdfjsLib.createPromiseCapability)();
    this._currentPageNumber = 1;
    this._pagesRotation = 0;
  }

  _updateUI(reset = false) {
    if (reset || !this.fieldData) {
      for (const id in this.fields) {
        this.fields[id].textContent = DEFAULT_FIELD_CONTENT;
      }

      return;
    }

    if (this.overlayManager.active !== this.overlayName) {
      return;
    }

    for (const id in this.fields) {
      const content = this.fieldData[id];
      this.fields[id].textContent = content || content === 0 ? content : DEFAULT_FIELD_CONTENT;
    }
  }

  async _parseFileSize(fileSize = 0) {
    const kb = fileSize / 1024;

    if (!kb) {
      return undefined;
    } else if (kb < 1024) {
      return this.l10n.get("document_properties_kb", {
        size_kb: (+kb.toPrecision(3)).toLocaleString(),
        size_b: fileSize.toLocaleString()
      }, "{{size_kb}} KB ({{size_b}} bytes)");
    }

    return this.l10n.get("document_properties_mb", {
      size_mb: (+(kb / 1024).toPrecision(3)).toLocaleString(),
      size_b: fileSize.toLocaleString()
    }, "{{size_mb}} MB ({{size_b}} bytes)");
  }

  async _parsePageSize(pageSizeInches, pagesRotation) {
    if (!pageSizeInches) {
      return undefined;
    }

    if (pagesRotation % 180 !== 0) {
      pageSizeInches = {
        width: pageSizeInches.height,
        height: pageSizeInches.width
      };
    }

    const isPortrait = (0, _ui_utils.isPortraitOrientation)(pageSizeInches);
    let sizeInches = {
      width: Math.round(pageSizeInches.width * 100) / 100,
      height: Math.round(pageSizeInches.height * 100) / 100
    };
    let sizeMillimeters = {
      width: Math.round(pageSizeInches.width * 25.4 * 10) / 10,
      height: Math.round(pageSizeInches.height * 25.4 * 10) / 10
    };
    let pageName = null;
    let rawName = getPageName(sizeInches, isPortrait, US_PAGE_NAMES) || getPageName(sizeMillimeters, isPortrait, METRIC_PAGE_NAMES);

    if (!rawName && !(Number.isInteger(sizeMillimeters.width) && Number.isInteger(sizeMillimeters.height))) {
      const exactMillimeters = {
        width: pageSizeInches.width * 25.4,
        height: pageSizeInches.height * 25.4
      };
      const intMillimeters = {
        width: Math.round(sizeMillimeters.width),
        height: Math.round(sizeMillimeters.height)
      };

      if (Math.abs(exactMillimeters.width - intMillimeters.width) < 0.1 && Math.abs(exactMillimeters.height - intMillimeters.height) < 0.1) {
        rawName = getPageName(intMillimeters, isPortrait, METRIC_PAGE_NAMES);

        if (rawName) {
          sizeInches = {
            width: Math.round(intMillimeters.width / 25.4 * 100) / 100,
            height: Math.round(intMillimeters.height / 25.4 * 100) / 100
          };
          sizeMillimeters = intMillimeters;
        }
      }
    }

    if (rawName) {
      pageName = this.l10n.get("document_properties_page_size_name_" + rawName.toLowerCase(), null, rawName);
    }

    return Promise.all([this._isNonMetricLocale ? sizeInches : sizeMillimeters, this.l10n.get("document_properties_page_size_unit_" + (this._isNonMetricLocale ? "inches" : "millimeters"), null, this._isNonMetricLocale ? "in" : "mm"), pageName, this.l10n.get("document_properties_page_size_orientation_" + (isPortrait ? "portrait" : "landscape"), null, isPortrait ? "portrait" : "landscape")]).then(([{
      width,
      height
    }, unit, name, orientation]) => {
      return this.l10n.get("document_properties_page_size_dimension_" + (name ? "name_" : "") + "string", {
        width: width.toLocaleString(),
        height: height.toLocaleString(),
        unit,
        name,
        orientation
      }, "{{width}} × {{height}} {{unit}} (" + (name ? "{{name}}, " : "") + "{{orientation}})");
    });
  }

  async _parseDate(inputDate) {
    const dateObject = _pdfjsLib.PDFDateString.toDateObject(inputDate);

    if (!dateObject) {
      return undefined;
    }

    return this.l10n.get("document_properties_date_string", {
      date: dateObject.toLocaleDateString(),
      time: dateObject.toLocaleTimeString()
    }, "{{date}}, {{time}}");
  }

  _parseLinearization(isLinearized) {
    return this.l10n.get("document_properties_linearized_" + (isLinearized ? "yes" : "no"), null, isLinearized ? "Yes" : "No");
  }

}

exports.PDFDocumentProperties = PDFDocumentProperties;

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFFindBar = void 0;

var _pdf_find_controller = __webpack_require__(15);

var _ui_utils = __webpack_require__(4);

const MATCHES_COUNT_LIMIT = 1000;

class PDFFindBar {
  constructor(options, eventBus, l10n = _ui_utils.NullL10n) {
    this.opened = false;
    this.bar = options.bar || null;
    this.toggleButton = options.toggleButton || null;
    this.findField = options.findField || null;
    this.highlightAll = options.highlightAllCheckbox || null;
    this.caseSensitive = options.caseSensitiveCheckbox || null;
    this.entireWord = options.entireWordCheckbox || null;
    this.findMsg = options.findMsg || null;
    this.findResultsCount = options.findResultsCount || null;
    this.findPreviousButton = options.findPreviousButton || null;
    this.findNextButton = options.findNextButton || null;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.toggleButton.addEventListener("click", () => {
      this.toggle();
    });
    this.findField.addEventListener("input", () => {
      this.dispatchEvent("");
    });
    this.bar.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 13:
          if (e.target === this.findField) {
            this.dispatchEvent("again", e.shiftKey);
          }

          break;

        case 27:
          this.close();
          break;
      }
    });
    this.findPreviousButton.addEventListener("click", () => {
      this.dispatchEvent("again", true);
    });
    this.findNextButton.addEventListener("click", () => {
      this.dispatchEvent("again", false);
    });
    this.highlightAll.addEventListener("click", () => {
      this.dispatchEvent("highlightallchange");
    });
    this.caseSensitive.addEventListener("click", () => {
      this.dispatchEvent("casesensitivitychange");
    });
    this.entireWord.addEventListener("click", () => {
      this.dispatchEvent("entirewordchange");
    });

    this.eventBus._on("resize", this._adjustWidth.bind(this));
  }

  reset() {
    this.updateUIState();
  }

  dispatchEvent(type, findPrev) {
    this.eventBus.dispatch("find", {
      source: this,
      type,
      query: this.findField.value,
      phraseSearch: true,
      caseSensitive: this.caseSensitive.checked,
      entireWord: this.entireWord.checked,
      highlightAll: this.highlightAll.checked,
      findPrevious: findPrev
    });
  }

  updateUIState(state, previous, matchesCount) {
    let findMsg = "";
    let status = "";

    switch (state) {
      case _pdf_find_controller.FindState.FOUND:
        break;

      case _pdf_find_controller.FindState.PENDING:
        status = "pending";
        break;

      case _pdf_find_controller.FindState.NOT_FOUND:
        findMsg = this.l10n.get("find_not_found", null, "Phrase not found");
        status = "notFound";
        break;

      case _pdf_find_controller.FindState.WRAPPED:
        if (previous) {
          findMsg = this.l10n.get("find_reached_top", null, "Reached top of document, continued from bottom");
        } else {
          findMsg = this.l10n.get("find_reached_bottom", null, "Reached end of document, continued from top");
        }

        break;
    }

    this.findField.setAttribute("data-status", status);
    Promise.resolve(findMsg).then(msg => {
      this.findMsg.textContent = msg;

      this._adjustWidth();
    });
    this.updateResultsCount(matchesCount);
  }

  updateResultsCount({
    current = 0,
    total = 0
  } = {}) {
    if (!this.findResultsCount) {
      return;
    }

    const limit = MATCHES_COUNT_LIMIT;
    let matchesCountMsg = "";

    if (total > 0) {
      if (total > limit) {
        matchesCountMsg = this.l10n.get("find_match_count_limit", {
          limit
        }, "More than {{limit}} match" + (limit !== 1 ? "es" : ""));
      } else {
        matchesCountMsg = this.l10n.get("find_match_count", {
          current,
          total
        }, "{{current}} of {{total}} match" + (total !== 1 ? "es" : ""));
      }
    }

    Promise.resolve(matchesCountMsg).then(msg => {
      this.findResultsCount.textContent = msg;
      this.findResultsCount.classList.toggle("hidden", !total);

      this._adjustWidth();
    });
  }

  open() {
    if (!this.opened) {
      this.opened = true;
      this.toggleButton.classList.add("toggled");
      this.bar.classList.remove("hidden");
    }

    this.findField.select();
    this.findField.focus();

    this._adjustWidth();
  }

  close() {
    if (!this.opened) {
      return;
    }

    this.opened = false;
    this.toggleButton.classList.remove("toggled");
    this.bar.classList.add("hidden");
    this.eventBus.dispatch("findbarclose", {
      source: this
    });
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  _adjustWidth() {
    if (!this.opened) {
      return;
    }

    this.bar.classList.remove("wrapContainers");
    const findbarHeight = this.bar.clientHeight;
    const inputContainerHeight = this.bar.firstElementChild.clientHeight;

    if (findbarHeight > inputContainerHeight) {
      this.bar.classList.add("wrapContainers");
    }
  }

}

exports.PDFFindBar = PDFFindBar;

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFFindController = exports.FindState = void 0;

var _pdfjsLib = __webpack_require__(5);

var _pdf_find_utils = __webpack_require__(16);

var _ui_utils = __webpack_require__(4);

const FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
exports.FindState = FindState;
const FIND_TIMEOUT = 250;
const MATCH_SCROLL_OFFSET_TOP = -50;
const MATCH_SCROLL_OFFSET_LEFT = -400;
const CHARACTERS_TO_NORMALIZE = {
  "\u2018": "'",
  "\u2019": "'",
  "\u201A": "'",
  "\u201B": "'",
  "\u201C": '"',
  "\u201D": '"',
  "\u201E": '"',
  "\u201F": '"',
  "\u00BC": "1/4",
  "\u00BD": "1/2",
  "\u00BE": "3/4"
};
let normalizationRegex = null;

function normalize(text) {
  if (!normalizationRegex) {
    const replace = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
    normalizationRegex = new RegExp(`[${replace}]`, "g");
  }

  let diffs = null;
  const normalizedText = text.replace(normalizationRegex, function (ch, index) {
    const normalizedCh = CHARACTERS_TO_NORMALIZE[ch],
          diff = normalizedCh.length - ch.length;

    if (diff !== 0) {
      (diffs || (diffs = [])).push([index, diff]);
    }

    return normalizedCh;
  });
  return [normalizedText, diffs];
}

function getOriginalIndex(matchIndex, diffs = null) {
  if (!diffs) {
    return matchIndex;
  }

  let totalDiff = 0;

  for (const [index, diff] of diffs) {
    const currentIndex = index + totalDiff;

    if (currentIndex >= matchIndex) {
      break;
    }

    if (currentIndex + diff > matchIndex) {
      totalDiff += matchIndex - currentIndex;
      break;
    }

    totalDiff += diff;
  }

  return matchIndex - totalDiff;
}

class PDFFindController {
  constructor({
    linkService,
    eventBus
  }) {
    this._linkService = linkService;
    this._eventBus = eventBus;

    this._reset();

    eventBus._on("findbarclose", this._onFindBarClose.bind(this));
  }

  get highlightMatches() {
    return this._highlightMatches;
  }

  get pageMatches() {
    return this._pageMatches;
  }

  get pageMatchesLength() {
    return this._pageMatchesLength;
  }

  get selected() {
    return this._selected;
  }

  get state() {
    return this._state;
  }

  setDocument(pdfDocument) {
    if (this._pdfDocument) {
      this._reset();
    }

    if (!pdfDocument) {
      return;
    }

    this._pdfDocument = pdfDocument;

    this._firstPageCapability.resolve();
  }

  executeCommand(cmd, state) {
    if (!state) {
      return;
    }

    const pdfDocument = this._pdfDocument;

    if (this._state === null || this._shouldDirtyMatch(cmd, state)) {
      this._dirtyMatch = true;
    }

    this._state = state;

    if (cmd !== "findhighlightallchange") {
      this._updateUIState(FindState.PENDING);
    }

    this._firstPageCapability.promise.then(() => {
      if (!this._pdfDocument || pdfDocument && this._pdfDocument !== pdfDocument) {
        return;
      }

      this._extractText();

      const findbarClosed = !this._highlightMatches;
      const pendingTimeout = !!this._findTimeout;

      if (this._findTimeout) {
        clearTimeout(this._findTimeout);
        this._findTimeout = null;
      }

      if (cmd === "find") {
        this._findTimeout = setTimeout(() => {
          this._nextMatch();

          this._findTimeout = null;
        }, FIND_TIMEOUT);
      } else if (this._dirtyMatch) {
        this._nextMatch();
      } else if (cmd === "findagain") {
        this._nextMatch();

        if (findbarClosed && this._state.highlightAll) {
          this._updateAllPages();
        }
      } else if (cmd === "findhighlightallchange") {
        if (pendingTimeout) {
          this._nextMatch();
        } else {
          this._highlightMatches = true;
        }

        this._updateAllPages();
      } else {
        this._nextMatch();
      }
    });
  }

  scrollMatchIntoView({
    element = null,
    pageIndex = -1,
    matchIndex = -1
  }) {
    if (!this._scrollMatches || !element) {
      return;
    } else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx) {
      return;
    } else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
      return;
    }

    this._scrollMatches = false;
    const spot = {
      top: MATCH_SCROLL_OFFSET_TOP,
      left: MATCH_SCROLL_OFFSET_LEFT
    };
    (0, _ui_utils.scrollIntoView)(element, spot, true);
  }

  _reset() {
    this._highlightMatches = false;
    this._scrollMatches = false;
    this._pdfDocument = null;
    this._pageMatches = [];
    this._pageMatchesLength = [];
    this._state = null;
    this._selected = {
      pageIdx: -1,
      matchIdx: -1
    };
    this._offset = {
      pageIdx: null,
      matchIdx: null,
      wrapped: false
    };
    this._extractTextPromises = [];
    this._pageContents = [];
    this._pageDiffs = [];
    this._matchesCountTotal = 0;
    this._pagesToSearch = null;
    this._pendingFindMatches = Object.create(null);
    this._resumePageIdx = null;
    this._dirtyMatch = false;
    clearTimeout(this._findTimeout);
    this._findTimeout = null;
    this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
  }

  get _query() {
    if (this._state.query !== this._rawQuery) {
      this._rawQuery = this._state.query;
      [this._normalizedQuery] = normalize(this._state.query);
    }

    return this._normalizedQuery;
  }

  _shouldDirtyMatch(cmd, state) {
    if (state.query !== this._state.query) {
      return true;
    }

    switch (cmd) {
      case "findagain":
        const pageNumber = this._selected.pageIdx + 1;
        const linkService = this._linkService;

        if (pageNumber >= 1 && pageNumber <= linkService.pagesCount && pageNumber !== linkService.page && !linkService.isPageVisible(pageNumber)) {
          return true;
        }

        return false;

      case "findhighlightallchange":
        return false;
    }

    return true;
  }

  _prepareMatches(matchesWithLength, matches, matchesLength) {
    function isSubTerm(currentIndex) {
      const currentElem = matchesWithLength[currentIndex];
      const nextElem = matchesWithLength[currentIndex + 1];

      if (currentIndex < matchesWithLength.length - 1 && currentElem.match === nextElem.match) {
        currentElem.skipped = true;
        return true;
      }

      for (let i = currentIndex - 1; i >= 0; i--) {
        const prevElem = matchesWithLength[i];

        if (prevElem.skipped) {
          continue;
        }

        if (prevElem.match + prevElem.matchLength < currentElem.match) {
          break;
        }

        if (prevElem.match + prevElem.matchLength >= currentElem.match + currentElem.matchLength) {
          currentElem.skipped = true;
          return true;
        }
      }

      return false;
    }

    matchesWithLength.sort(function (a, b) {
      return a.match === b.match ? a.matchLength - b.matchLength : a.match - b.match;
    });

    for (let i = 0, len = matchesWithLength.length; i < len; i++) {
      if (isSubTerm(i)) {
        continue;
      }

      matches.push(matchesWithLength[i].match);
      matchesLength.push(matchesWithLength[i].matchLength);
    }
  }

  _isEntireWord(content, startIdx, length) {
    if (startIdx > 0) {
      const first = content.charCodeAt(startIdx);
      const limit = content.charCodeAt(startIdx - 1);

      if ((0, _pdf_find_utils.getCharacterType)(first) === (0, _pdf_find_utils.getCharacterType)(limit)) {
        return false;
      }
    }

    const endIdx = startIdx + length - 1;

    if (endIdx < content.length - 1) {
      const last = content.charCodeAt(endIdx);
      const limit = content.charCodeAt(endIdx + 1);

      if ((0, _pdf_find_utils.getCharacterType)(last) === (0, _pdf_find_utils.getCharacterType)(limit)) {
        return false;
      }
    }

    return true;
  }

  _calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, entireWord) {
    const matches = [],
          matchesLength = [];
    const queryLen = query.length;
    let matchIdx = -queryLen;

    while (true) {
      matchIdx = pageContent.indexOf(query, matchIdx + queryLen);

      if (matchIdx === -1) {
        break;
      }

      if (entireWord && !this._isEntireWord(pageContent, matchIdx, queryLen)) {
        continue;
      }

      const originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
            matchEnd = matchIdx + queryLen - 1,
            originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
      matches.push(originalMatchIdx);
      matchesLength.push(originalQueryLen);
    }

    this._pageMatches[pageIndex] = matches;
    this._pageMatchesLength[pageIndex] = matchesLength;
  }

  _calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord) {
    const matchesWithLength = [];
    const queryArray = query.match(/\S+/g);

    for (let i = 0, len = queryArray.length; i < len; i++) {
      const subquery = queryArray[i];
      const subqueryLen = subquery.length;
      let matchIdx = -subqueryLen;

      while (true) {
        matchIdx = pageContent.indexOf(subquery, matchIdx + subqueryLen);

        if (matchIdx === -1) {
          break;
        }

        if (entireWord && !this._isEntireWord(pageContent, matchIdx, subqueryLen)) {
          continue;
        }

        const originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
              matchEnd = matchIdx + subqueryLen - 1,
              originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
        matchesWithLength.push({
          match: originalMatchIdx,
          matchLength: originalQueryLen,
          skipped: false
        });
      }
    }

    this._pageMatchesLength[pageIndex] = [];
    this._pageMatches[pageIndex] = [];

    this._prepareMatches(matchesWithLength, this._pageMatches[pageIndex], this._pageMatchesLength[pageIndex]);
  }

  _calculateMatch(pageIndex) {
    let pageContent = this._pageContents[pageIndex];
    const pageDiffs = this._pageDiffs[pageIndex];
    let query = this._query;
    const {
      caseSensitive,
      entireWord,
      phraseSearch
    } = this._state;

    if (query.length === 0) {
      return;
    }

    if (!caseSensitive) {
      pageContent = pageContent.toLowerCase();
      query = query.toLowerCase();
    }

    if (phraseSearch) {
      this._calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, entireWord);
    } else {
      this._calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord);
    }

    if (this._state.highlightAll) {
      this._updatePage(pageIndex);
    }

    if (this._resumePageIdx === pageIndex) {
      this._resumePageIdx = null;

      this._nextPageMatch();
    }

    const pageMatchesCount = this._pageMatches[pageIndex].length;

    if (pageMatchesCount > 0) {
      this._matchesCountTotal += pageMatchesCount;

      this._updateUIResultsCount();
    }
  }

  _extractText() {
    if (this._extractTextPromises.length > 0) {
      return;
    }

    let promise = Promise.resolve();

    for (let i = 0, ii = this._linkService.pagesCount; i < ii; i++) {
      const extractTextCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._extractTextPromises[i] = extractTextCapability.promise;
      promise = promise.then(() => {
        return this._pdfDocument.getPage(i + 1).then(pdfPage => {
          return pdfPage.getTextContent({
            normalizeWhitespace: true
          });
        }).then(textContent => {
          const textItems = textContent.items;
          const strBuf = [];

          for (let j = 0, jj = textItems.length; j < jj; j++) {
            strBuf.push(textItems[j].str);
          }

          [this._pageContents[i], this._pageDiffs[i]] = normalize(strBuf.join(""));
          extractTextCapability.resolve(i);
        }, reason => {
          console.error(`Unable to get text content for page ${i + 1}`, reason);
          this._pageContents[i] = "";
          this._pageDiffs[i] = null;
          extractTextCapability.resolve(i);
        });
      });
    }
  }

  _updatePage(index) {
    if (this._scrollMatches && this._selected.pageIdx === index) {
      this._linkService.page = index + 1;
    }

    this._eventBus.dispatch("updatetextlayermatches", {
      source: this,
      pageIndex: index
    });
  }

  _updateAllPages() {
    this._eventBus.dispatch("updatetextlayermatches", {
      source: this,
      pageIndex: -1
    });
  }

  _nextMatch() {
    const previous = this._state.findPrevious;
    const currentPageIndex = this._linkService.page - 1;
    const numPages = this._linkService.pagesCount;
    this._highlightMatches = true;

    if (this._dirtyMatch) {
      this._dirtyMatch = false;
      this._selected.pageIdx = this._selected.matchIdx = -1;
      this._offset.pageIdx = currentPageIndex;
      this._offset.matchIdx = null;
      this._offset.wrapped = false;
      this._resumePageIdx = null;
      this._pageMatches.length = 0;
      this._pageMatchesLength.length = 0;
      this._matchesCountTotal = 0;

      this._updateAllPages();

      for (let i = 0; i < numPages; i++) {
        if (this._pendingFindMatches[i] === true) {
          continue;
        }

        this._pendingFindMatches[i] = true;

        this._extractTextPromises[i].then(pageIdx => {
          delete this._pendingFindMatches[pageIdx];

          this._calculateMatch(pageIdx);
        });
      }
    }

    if (this._query === "") {
      this._updateUIState(FindState.FOUND);

      return;
    }

    if (this._resumePageIdx) {
      return;
    }

    const offset = this._offset;
    this._pagesToSearch = numPages;

    if (offset.matchIdx !== null) {
      const numPageMatches = this._pageMatches[offset.pageIdx].length;

      if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
        offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;

        this._updateMatch(true);

        return;
      }

      this._advanceOffsetPage(previous);
    }

    this._nextPageMatch();
  }

  _matchesReady(matches) {
    const offset = this._offset;
    const numMatches = matches.length;
    const previous = this._state.findPrevious;

    if (numMatches) {
      offset.matchIdx = previous ? numMatches - 1 : 0;

      this._updateMatch(true);

      return true;
    }

    this._advanceOffsetPage(previous);

    if (offset.wrapped) {
      offset.matchIdx = null;

      if (this._pagesToSearch < 0) {
        this._updateMatch(false);

        return true;
      }
    }

    return false;
  }

  _nextPageMatch() {
    if (this._resumePageIdx !== null) {
      console.error("There can only be one pending page.");
    }

    let matches = null;

    do {
      const pageIdx = this._offset.pageIdx;
      matches = this._pageMatches[pageIdx];

      if (!matches) {
        this._resumePageIdx = pageIdx;
        break;
      }
    } while (!this._matchesReady(matches));
  }

  _advanceOffsetPage(previous) {
    const offset = this._offset;
    const numPages = this._linkService.pagesCount;
    offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
    offset.matchIdx = null;
    this._pagesToSearch--;

    if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
      offset.pageIdx = previous ? numPages - 1 : 0;
      offset.wrapped = true;
    }
  }

  _updateMatch(found = false) {
    let state = FindState.NOT_FOUND;
    const wrapped = this._offset.wrapped;
    this._offset.wrapped = false;

    if (found) {
      const previousPage = this._selected.pageIdx;
      this._selected.pageIdx = this._offset.pageIdx;
      this._selected.matchIdx = this._offset.matchIdx;
      state = wrapped ? FindState.WRAPPED : FindState.FOUND;

      if (previousPage !== -1 && previousPage !== this._selected.pageIdx) {
        this._updatePage(previousPage);
      }
    }

    this._updateUIState(state, this._state.findPrevious);

    if (this._selected.pageIdx !== -1) {
      this._scrollMatches = true;

      this._updatePage(this._selected.pageIdx);
    }
  }

  _onFindBarClose(evt) {
    const pdfDocument = this._pdfDocument;

    this._firstPageCapability.promise.then(() => {
      if (!this._pdfDocument || pdfDocument && this._pdfDocument !== pdfDocument) {
        return;
      }

      if (this._findTimeout) {
        clearTimeout(this._findTimeout);
        this._findTimeout = null;
      }

      if (this._resumePageIdx) {
        this._resumePageIdx = null;
        this._dirtyMatch = true;
      }

      this._updateUIState(FindState.FOUND);

      this._highlightMatches = false;

      this._updateAllPages();
    });
  }

  _requestMatchesCount() {
    const {
      pageIdx,
      matchIdx
    } = this._selected;
    let current = 0,
        total = this._matchesCountTotal;

    if (matchIdx !== -1) {
      for (let i = 0; i < pageIdx; i++) {
        current += this._pageMatches[i] && this._pageMatches[i].length || 0;
      }

      current += matchIdx + 1;
    }

    if (current < 1 || current > total) {
      current = total = 0;
    }

    return {
      current,
      total
    };
  }

  _updateUIResultsCount() {
    this._eventBus.dispatch("updatefindmatchescount", {
      source: this,
      matchesCount: this._requestMatchesCount()
    });
  }

  _updateUIState(state, previous) {
    this._eventBus.dispatch("updatefindcontrolstate", {
      source: this,
      state,
      previous,
      matchesCount: this._requestMatchesCount(),
      rawQuery: this._state ? this._state.query : null
    });
  }

}

exports.PDFFindController = PDFFindController;

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getCharacterType = getCharacterType;
exports.CharacterType = void 0;
const CharacterType = {
  SPACE: 0,
  ALPHA_LETTER: 1,
  PUNCT: 2,
  HAN_LETTER: 3,
  KATAKANA_LETTER: 4,
  HIRAGANA_LETTER: 5,
  HALFWIDTH_KATAKANA_LETTER: 6,
  THAI_LETTER: 7
};
exports.CharacterType = CharacterType;

function isAlphabeticalScript(charCode) {
  return charCode < 0x2e80;
}

function isAscii(charCode) {
  return (charCode & 0xff80) === 0;
}

function isAsciiAlpha(charCode) {
  return charCode >= 0x61 && charCode <= 0x7a || charCode >= 0x41 && charCode <= 0x5a;
}

function isAsciiDigit(charCode) {
  return charCode >= 0x30 && charCode <= 0x39;
}

function isAsciiSpace(charCode) {
  return charCode === 0x20 || charCode === 0x09 || charCode === 0x0d || charCode === 0x0a;
}

function isHan(charCode) {
  return charCode >= 0x3400 && charCode <= 0x9fff || charCode >= 0xf900 && charCode <= 0xfaff;
}

function isKatakana(charCode) {
  return charCode >= 0x30a0 && charCode <= 0x30ff;
}

function isHiragana(charCode) {
  return charCode >= 0x3040 && charCode <= 0x309f;
}

function isHalfwidthKatakana(charCode) {
  return charCode >= 0xff60 && charCode <= 0xff9f;
}

function isThai(charCode) {
  return (charCode & 0xff80) === 0x0e00;
}

function getCharacterType(charCode) {
  if (isAlphabeticalScript(charCode)) {
    if (isAscii(charCode)) {
      if (isAsciiSpace(charCode)) {
        return CharacterType.SPACE;
      } else if (isAsciiAlpha(charCode) || isAsciiDigit(charCode) || charCode === 0x5f) {
        return CharacterType.ALPHA_LETTER;
      }

      return CharacterType.PUNCT;
    } else if (isThai(charCode)) {
      return CharacterType.THAI_LETTER;
    } else if (charCode === 0xa0) {
      return CharacterType.SPACE;
    }

    return CharacterType.ALPHA_LETTER;
  }

  if (isHan(charCode)) {
    return CharacterType.HAN_LETTER;
  } else if (isKatakana(charCode)) {
    return CharacterType.KATAKANA_LETTER;
  } else if (isHiragana(charCode)) {
    return CharacterType.HIRAGANA_LETTER;
  } else if (isHalfwidthKatakana(charCode)) {
    return CharacterType.HALFWIDTH_KATAKANA_LETTER;
  }

  return CharacterType.ALPHA_LETTER;
}

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isDestArraysEqual = isDestArraysEqual;
exports.isDestHashesEqual = isDestHashesEqual;
exports.PDFHistory = void 0;

var _ui_utils = __webpack_require__(4);

const HASH_CHANGE_TIMEOUT = 1000;
const POSITION_UPDATED_THRESHOLD = 50;
const UPDATE_VIEWAREA_TIMEOUT = 1000;

function getCurrentHash() {
  return document.location.hash;
}

class PDFHistory {
  constructor({
    linkService,
    eventBus
  }) {
    this.linkService = linkService;
    this.eventBus = eventBus;
    this._initialized = false;
    this._fingerprint = "";
    this.reset();
    this._boundEvents = null;
    this._isViewerInPresentationMode = false;

    this.eventBus._on("presentationmodechanged", evt => {
      this._isViewerInPresentationMode = evt.state !== _ui_utils.PresentationModeState.NORMAL;
    });

    this.eventBus._on("pagesinit", () => {
      this._isPagesLoaded = false;

      this.eventBus._on("pagesloaded", evt => {
        this._isPagesLoaded = !!evt.pagesCount;
      }, {
        once: true
      });
    });
  }

  initialize({
    fingerprint,
    resetHistory = false,
    updateUrl = false
  }) {
    if (!fingerprint || typeof fingerprint !== "string") {
      console.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.');
      return;
    }

    if (this._initialized) {
      this.reset();
    }

    const reInitialized = this._fingerprint !== "" && this._fingerprint !== fingerprint;
    this._fingerprint = fingerprint;
    this._updateUrl = updateUrl === true;
    this._initialized = true;

    this._bindEvents();

    const state = window.history.state;
    this._popStateInProgress = false;
    this._blockHashChange = 0;
    this._currentHash = getCurrentHash();
    this._numPositionUpdates = 0;
    this._uid = this._maxUid = 0;
    this._destination = null;
    this._position = null;

    if (!this._isValidState(state, true) || resetHistory) {
      const {
        hash,
        page,
        rotation
      } = this._parseCurrentHash(true);

      if (!hash || reInitialized || resetHistory) {
        this._pushOrReplaceState(null, true);

        return;
      }

      this._pushOrReplaceState({
        hash,
        page,
        rotation
      }, true);

      return;
    }

    const destination = state.destination;

    this._updateInternalState(destination, state.uid, true);

    if (destination.rotation !== undefined) {
      this._initialRotation = destination.rotation;
    }

    if (destination.dest) {
      this._initialBookmark = JSON.stringify(destination.dest);
      this._destination.page = null;
    } else if (destination.hash) {
      this._initialBookmark = destination.hash;
    } else if (destination.page) {
      this._initialBookmark = `page=${destination.page}`;
    }
  }

  reset() {
    if (this._initialized) {
      this._pageHide();

      this._initialized = false;

      this._unbindEvents();
    }

    if (this._updateViewareaTimeout) {
      clearTimeout(this._updateViewareaTimeout);
      this._updateViewareaTimeout = null;
    }

    this._initialBookmark = null;
    this._initialRotation = null;
  }

  push({
    namedDest = null,
    explicitDest,
    pageNumber
  }) {
    if (!this._initialized) {
      return;
    }

    if (namedDest && typeof namedDest !== "string") {
      console.error("PDFHistory.push: " + `"${namedDest}" is not a valid namedDest parameter.`);
      return;
    } else if (!Array.isArray(explicitDest)) {
      console.error("PDFHistory.push: " + `"${explicitDest}" is not a valid explicitDest parameter.`);
      return;
    } else if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.linkService.pagesCount)) {
      if (pageNumber !== null || this._destination) {
        console.error("PDFHistory.push: " + `"${pageNumber}" is not a valid pageNumber parameter.`);
        return;
      }
    }

    const hash = namedDest || JSON.stringify(explicitDest);

    if (!hash) {
      return;
    }

    let forceReplace = false;

    if (this._destination && (isDestHashesEqual(this._destination.hash, hash) || isDestArraysEqual(this._destination.dest, explicitDest))) {
      if (this._destination.page) {
        return;
      }

      forceReplace = true;
    }

    if (this._popStateInProgress && !forceReplace) {
      return;
    }

    this._pushOrReplaceState({
      dest: explicitDest,
      hash,
      page: pageNumber,
      rotation: this.linkService.rotation
    }, forceReplace);

    if (!this._popStateInProgress) {
      this._popStateInProgress = true;
      Promise.resolve().then(() => {
        this._popStateInProgress = false;
      });
    }
  }

  pushPage(pageNumber) {
    if (!this._initialized) {
      return;
    }

    if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.linkService.pagesCount)) {
      console.error(`PDFHistory.pushPage: "${pageNumber}" is not a valid page number.`);
      return;
    }

    if (this._destination && this._destination.page === pageNumber) { //?.
      return;
    }

    if (this._popStateInProgress) {
      return;
    }

    this._pushOrReplaceState({
      hash: `page=${pageNumber}`,
      page: pageNumber,
      rotation: this.linkService.rotation
    });

    if (!this._popStateInProgress) {
      this._popStateInProgress = true;
      Promise.resolve().then(() => {
        this._popStateInProgress = false;
      });
    }
  }

  pushCurrentPosition() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }

    this._tryPushCurrentPosition();
  }

  back() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }

    const state = window.history.state;

    if (this._isValidState(state) && state.uid > 0) {
      window.history.back();
    }
  }

  forward() {
    if (!this._initialized || this._popStateInProgress) {
      return;
    }

    const state = window.history.state;

    if (this._isValidState(state) && state.uid < this._maxUid) {
      window.history.forward();
    }
  }

  get popStateInProgress() {
    return this._initialized && (this._popStateInProgress || this._blockHashChange > 0);
  }

  get initialBookmark() {
    return this._initialized ? this._initialBookmark : null;
  }

  get initialRotation() {
    return this._initialized ? this._initialRotation : null;
  }

  _pushOrReplaceState(destination, forceReplace = false) {
    const shouldReplace = forceReplace || !this._destination;
    const newState = {
      fingerprint: this._fingerprint,
      uid: shouldReplace ? this._uid : this._uid + 1,
      destination
    };

    this._updateInternalState(destination, newState.uid);

    let newUrl;

    if (this._updateUrl && destination && destination.hash) { //?.
      const baseUrl = document.location.href.split("#")[0];

      if (!baseUrl.startsWith("file://")) {
        newUrl = `${baseUrl}#${destination.hash}`;
      }
    }

    if (shouldReplace) {
      window.history.replaceState(newState, "", newUrl);
    } else {
      window.history.pushState(newState, "", newUrl);
    }
  }

  _tryPushCurrentPosition(temporary = false) {
    if (!this._position) {
      return;
    }

    let position = this._position;

    if (temporary) {
      position = Object.assign(Object.create(null), this._position);
      position.temporary = true;
    }

    if (!this._destination) {
      this._pushOrReplaceState(position);

      return;
    }

    if (this._destination.temporary) {
      this._pushOrReplaceState(position, true);

      return;
    }

    if (this._destination.hash === position.hash) {
      return;
    }

    if (!this._destination.page && (POSITION_UPDATED_THRESHOLD <= 0 || this._numPositionUpdates <= POSITION_UPDATED_THRESHOLD)) {
      return;
    }

    let forceReplace = false;

    if (this._destination.page >= position.first && this._destination.page <= position.page) {
      if (this._destination.dest || !this._destination.first) {
        return;
      }

      forceReplace = true;
    }

    this._pushOrReplaceState(position, forceReplace);
  }

  _isValidState(state, checkReload = false) {
    if (!state) {
      return false;
    }

    if (state.fingerprint !== this._fingerprint) {
      if (checkReload) {
        if (typeof state.fingerprint !== "string" || state.fingerprint.length !== this._fingerprint.length) {
          return false;
        }

        const [perfEntry] = performance.getEntriesByType("navigation");

        if (perfEntry && perfEntry.type !== "reload") { //?.
          return false;
        }
      } else {
        return false;
      }
    }

    if (!Number.isInteger(state.uid) || state.uid < 0) {
      return false;
    }

    if (state.destination === null || typeof state.destination !== "object") {
      return false;
    }

    return true;
  }

  _updateInternalState(destination, uid, removeTemporary = false) {
    if (this._updateViewareaTimeout) {
      clearTimeout(this._updateViewareaTimeout);
      this._updateViewareaTimeout = null;
    }

    if (removeTemporary && destination && destination.temporary) { //?.
      delete destination.temporary;
    }

    this._destination = destination;
    this._uid = uid;
    this._maxUid = Math.max(this._maxUid, uid);
    this._numPositionUpdates = 0;
  }

  _parseCurrentHash(checkNameddest = false) {
    const hash = unescape(getCurrentHash()).substring(1);
    const params = (0, _ui_utils.parseQueryString)(hash);
    const nameddest = params.nameddest || "";
    let page = params.page | 0;

    if (!(Number.isInteger(page) && page > 0 && page <= this.linkService.pagesCount) || checkNameddest && nameddest.length > 0) {
      page = null;
    }

    return {
      hash,
      page,
      rotation: this.linkService.rotation
    };
  }

  _updateViewarea({
    location
  }) {
    if (this._updateViewareaTimeout) {
      clearTimeout(this._updateViewareaTimeout);
      this._updateViewareaTimeout = null;
    }

    this._position = {
      hash: this._isViewerInPresentationMode ? `page=${location.pageNumber}` : location.pdfOpenParams.substring(1),
      page: this.linkService.page,
      first: location.pageNumber,
      rotation: location.rotation
    };

    if (this._popStateInProgress) {
      return;
    }

    if (POSITION_UPDATED_THRESHOLD > 0 && this._isPagesLoaded && this._destination && !this._destination.page) {
      this._numPositionUpdates++;
    }

    if (UPDATE_VIEWAREA_TIMEOUT > 0) {
      this._updateViewareaTimeout = setTimeout(() => {
        if (!this._popStateInProgress) {
          this._tryPushCurrentPosition(true);
        }

        this._updateViewareaTimeout = null;
      }, UPDATE_VIEWAREA_TIMEOUT);
    }
  }

  _popState({
    state
  }) {
    const newHash = getCurrentHash(),
          hashChanged = this._currentHash !== newHash;
    this._currentHash = newHash;

    if (!state) {
      this._uid++;

      const {
        hash,
        page,
        rotation
      } = this._parseCurrentHash();

      this._pushOrReplaceState({
        hash,
        page,
        rotation
      }, true);

      return;
    }

    if (!this._isValidState(state)) {
      return;
    }

    this._popStateInProgress = true;

    if (hashChanged) {
      this._blockHashChange++;
      (0, _ui_utils.waitOnEventOrTimeout)({
        target: window,
        name: "hashchange",
        delay: HASH_CHANGE_TIMEOUT
      }).then(() => {
        this._blockHashChange--;
      });
    }

    const destination = state.destination;

    this._updateInternalState(destination, state.uid, true);

    if ((0, _ui_utils.isValidRotation)(destination.rotation)) {
      this.linkService.rotation = destination.rotation;
    }

    if (destination.dest) {
      this.linkService.goToDestination(destination.dest);
    } else if (destination.hash) {
      this.linkService.setHash(destination.hash);
    } else if (destination.page) {
      this.linkService.page = destination.page;
    }

    Promise.resolve().then(() => {
      this._popStateInProgress = false;
    });
  }

  _pageHide() {
    if (!this._destination || this._destination.temporary) {
      this._tryPushCurrentPosition();
    }
  }

  _bindEvents() {
    if (this._boundEvents) {
      return;
    }

    this._boundEvents = {
      updateViewarea: this._updateViewarea.bind(this),
      popState: this._popState.bind(this),
      pageHide: this._pageHide.bind(this)
    };

    this.eventBus._on("updateviewarea", this._boundEvents.updateViewarea);

    window.addEventListener("popstate", this._boundEvents.popState);
    window.addEventListener("pagehide", this._boundEvents.pageHide);
  }

  _unbindEvents() {
    if (!this._boundEvents) {
      return;
    }

    this.eventBus._off("updateviewarea", this._boundEvents.updateViewarea);

    window.removeEventListener("popstate", this._boundEvents.popState);
    window.removeEventListener("pagehide", this._boundEvents.pageHide);
    this._boundEvents = null;
  }

}

exports.PDFHistory = PDFHistory;

function isDestHashesEqual(destHash, pushHash) {
  if (typeof destHash !== "string" || typeof pushHash !== "string") {
    return false;
  }

  if (destHash === pushHash) {
    return true;
  }

  const {
    nameddest
  } = (0, _ui_utils.parseQueryString)(destHash);

  if (nameddest === pushHash) {
    return true;
  }

  return false;
}

function isDestArraysEqual(firstDest, secondDest) {
  function isEntryEqual(first, second) {
    if (typeof first !== typeof second) {
      return false;
    }

    if (Array.isArray(first) || Array.isArray(second)) {
      return false;
    }

    if (first !== null && typeof first === "object" && second !== null) {
      if (Object.keys(first).length !== Object.keys(second).length) {
        return false;
      }

      for (const key in first) {
        if (!isEntryEqual(first[key], second[key])) {
          return false;
        }
      }

      return true;
    }

    return first === second || Number.isNaN(first) && Number.isNaN(second);
  }

  if (!(Array.isArray(firstDest) && Array.isArray(secondDest))) {
    return false;
  }

  if (firstDest.length !== secondDest.length) {
    return false;
  }

  for (let i = 0, ii = firstDest.length; i < ii; i++) {
    if (!isEntryEqual(firstDest[i], secondDest[i])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFLayerViewer = void 0;

var _base_tree_viewer = __webpack_require__(12);

class PDFLayerViewer extends _base_tree_viewer.BaseTreeViewer {
  constructor(options) {
    super(options);
    this.l10n = options.l10n;

    this.eventBus._on("resetlayers", this._resetLayers.bind(this));

    this.eventBus._on("togglelayerstree", this._toggleAllTreeItems.bind(this));
  }

  reset() {
    super.reset();
    this._optionalContentConfig = null;
  }

  _dispatchEvent(layersCount) {
    this.eventBus.dispatch("layersloaded", {
      source: this,
      layersCount
    });
  }

  _bindLink(element, {
    groupId,
    input
  }) {
    const setVisibility = () => {
      this._optionalContentConfig.setVisibility(groupId, input.checked);

      this.eventBus.dispatch("optionalcontentconfig", {
        source: this,
        promise: Promise.resolve(this._optionalContentConfig)
      });
    };

    element.onclick = evt => {
      if (evt.target === input) {
        setVisibility();
        return true;
      } else if (evt.target !== element) {
        return true;
      }

      input.checked = !input.checked;
      setVisibility();
      return false;
    };
  }

  async _setNestedName(element, {
    name = null
  }) {
    if (typeof name === "string") {
      element.textContent = this._normalizeTextContent(name);
      return;
    }

    element.textContent = await this.l10n.get("additional_layers", null, "Additional Layers");
    element.style.fontStyle = "italic";
  }

  _addToggleButton(div, {
    name = null
  }) {
    super._addToggleButton(div, name === null);
  }

  _toggleAllTreeItems() {
    if (!this._optionalContentConfig) {
      return;
    }

    super._toggleAllTreeItems();
  }

  render({
    optionalContentConfig,
    pdfDocument
  }) {
    if (this._optionalContentConfig) {
      this.reset();
    }

    this._optionalContentConfig = optionalContentConfig || null;
    this._pdfDocument = pdfDocument || null;
    const groups = optionalContentConfig && optionalContentConfig.getOrder();

    if (!groups) {
      this._dispatchEvent(0);

      return;
    }

    const fragment = document.createDocumentFragment(),
          queue = [{
      parent: fragment,
      groups
    }];
    let layersCount = 0,
        hasAnyNesting = false;

    while (queue.length > 0) {
      const levelData = queue.shift();

      for (const groupId of levelData.groups) {
        const div = document.createElement("div");
        div.className = "treeItem";
        const element = document.createElement("a");
        div.appendChild(element);

        if (typeof groupId === "object") {
          hasAnyNesting = true;

          this._addToggleButton(div, groupId);

          this._setNestedName(element, groupId);

          const itemsDiv = document.createElement("div");
          itemsDiv.className = "treeItems";
          div.appendChild(itemsDiv);
          queue.push({
            parent: itemsDiv,
            groups: groupId.order
          });
        } else {
          const group = optionalContentConfig.getGroup(groupId);
          const input = document.createElement("input");

          this._bindLink(element, {
            groupId,
            input
          });

          input.type = "checkbox";
          input.id = groupId;
          input.checked = group.visible;
          const label = document.createElement("label");
          label.setAttribute("for", groupId);
          label.textContent = this._normalizeTextContent(group.name);
          element.appendChild(input);
          element.appendChild(label);
          layersCount++;
        }

        levelData.parent.appendChild(div);
      }
    }

    this._finishRendering(fragment, layersCount, hasAnyNesting);
  }

  async _resetLayers() {
    if (!this._optionalContentConfig) {
      return;
    }

    const optionalContentConfig = await this._pdfDocument.getOptionalContentConfig();
    this.eventBus.dispatch("optionalcontentconfig", {
      source: this,
      promise: Promise.resolve(optionalContentConfig)
    });
    this.render({
      optionalContentConfig,
      pdfDocument: this._pdfDocument
    });
  }

}

exports.PDFLayerViewer = PDFLayerViewer;

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SimpleLinkService = exports.PDFLinkService = void 0;

var _ui_utils = __webpack_require__(4);

class PDFLinkService {
  constructor({
    eventBus,
    externalLinkTarget = null,
    externalLinkRel = null,
    externalLinkEnabled = true,
    ignoreDestinationZoom = false
  } = {}) {
    this.eventBus = eventBus;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = externalLinkRel;
    this.externalLinkEnabled = externalLinkEnabled;
    this._ignoreDestinationZoom = ignoreDestinationZoom;
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
    this._pagesRefCache = null;
  }

  setDocument(pdfDocument, baseUrl = null) {
    this.baseUrl = baseUrl;
    this.pdfDocument = pdfDocument;
    this._pagesRefCache = Object.create(null);
  }

  setViewer(pdfViewer) {
    this.pdfViewer = pdfViewer;
  }

  setHistory(pdfHistory) {
    this.pdfHistory = pdfHistory;
  }

  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  }

  get page() {
    return this.pdfViewer.currentPageNumber;
  }

  set page(value) {
    this.pdfViewer.currentPageNumber = value;
  }

  get rotation() {
    return this.pdfViewer.pagesRotation;
  }

  set rotation(value) {
    this.pdfViewer.pagesRotation = value;
  }

  navigateTo(dest) {
    console.error("Deprecated method: `navigateTo`, use `goToDestination` instead.");
    this.goToDestination(dest);
  }

  _goToDestinationHelper(rawDest, namedDest = null, explicitDest) {
    const destRef = explicitDest[0];
    let pageNumber;

    if (destRef instanceof Object) {
      pageNumber = this._cachedPageNumber(destRef);

      if (pageNumber === null) {
        this.pdfDocument.getPageIndex(destRef).then(pageIndex => {
          this.cachePageRef(pageIndex + 1, destRef);

          this._goToDestinationHelper(rawDest, namedDest, explicitDest);
        }).catch(() => {
          console.error(`PDFLinkService._goToDestinationHelper: "${destRef}" is not ` + `a valid page reference, for dest="${rawDest}".`);
        });
        return;
      }
    } else if (Number.isInteger(destRef)) {
      pageNumber = destRef + 1;
    } else {
      console.error(`PDFLinkService._goToDestinationHelper: "${destRef}" is not ` + `a valid destination reference, for dest="${rawDest}".`);
      return;
    }

    if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
      console.error(`PDFLinkService._goToDestinationHelper: "${pageNumber}" is not ` + `a valid page number, for dest="${rawDest}".`);
      return;
    }

    if (this.pdfHistory) {
      this.pdfHistory.pushCurrentPosition();
      this.pdfHistory.push({
        namedDest,
        explicitDest,
        pageNumber
      });
    }

    this.pdfViewer.scrollPageIntoView({
      pageNumber,
      destArray: explicitDest,
      ignoreDestinationZoom: this._ignoreDestinationZoom
    });
  }

  async goToDestination(dest) {
    if (!this.pdfDocument) {
      return;
    }

    let namedDest, explicitDest;

    if (typeof dest === "string") {
      namedDest = dest;
      explicitDest = await this.pdfDocument.getDestination(dest);
    } else {
      namedDest = null;
      explicitDest = await dest;
    }

    if (!Array.isArray(explicitDest)) {
      console.error(`PDFLinkService.goToDestination: "${explicitDest}" is not ` + `a valid destination array, for dest="${dest}".`);
      return;
    }

    this._goToDestinationHelper(dest, namedDest, explicitDest);
  }

  goToPage(val) {
    if (!this.pdfDocument) {
      return;
    }

    const pageNumber = typeof val === "string" && this.pdfViewer.pageLabelToPageNumber(val) || val | 0;

    if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
      console.error(`PDFLinkService.goToPage: "${val}" is not a valid page.`);
      return;
    }

    if (this.pdfHistory) {
      this.pdfHistory.pushCurrentPosition();
      this.pdfHistory.pushPage(pageNumber);
    }

    this.pdfViewer.scrollPageIntoView({
      pageNumber
    });
  }

  getDestinationHash(dest) {
    if (typeof dest === "string") {
      if (dest.length > 0) {
        return this.getAnchorUrl("#" + escape(dest));
      }
    } else if (Array.isArray(dest)) {
      const str = JSON.stringify(dest);

      if (str.length > 0) {
        return this.getAnchorUrl("#" + escape(str));
      }
    }

    return this.getAnchorUrl("");
  }

  getAnchorUrl(anchor) {
    return (this.baseUrl || "") + anchor;
  }

  setHash(hash) {
    if (!this.pdfDocument) {
      return;
    }

    let pageNumber, dest;

    if (hash.includes("=")) {
      const params = (0, _ui_utils.parseQueryString)(hash);

      if ("search" in params) {
        this.eventBus.dispatch("findfromurlhash", {
          source: this,
          query: params.search.replace(/"/g, ""),
          phraseSearch: params.phrase === "true"
        });
      }

      if ("page" in params) {
        pageNumber = params.page | 0 || 1;
      }

      if ("zoom" in params) {
        const zoomArgs = params.zoom.split(",");
        const zoomArg = zoomArgs[0];
        const zoomArgNumber = parseFloat(zoomArg);

        if (!zoomArg.includes("Fit")) {
          dest = [null, {
            name: "XYZ"
          }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null, zoomArgs.length > 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
        } else {
          if (zoomArg === "Fit" || zoomArg === "FitB") {
            dest = [null, {
              name: zoomArg
            }];
          } else if (zoomArg === "FitH" || zoomArg === "FitBH" || zoomArg === "FitV" || zoomArg === "FitBV") {
            dest = [null, {
              name: zoomArg
            }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null];
          } else if (zoomArg === "FitR") {
            if (zoomArgs.length !== 5) {
              console.error('PDFLinkService.setHash: Not enough parameters for "FitR".');
            } else {
              dest = [null, {
                name: zoomArg
              }, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
            }
          } else {
            console.error(`PDFLinkService.setHash: "${zoomArg}" is not ` + "a valid zoom value.");
          }
        }
      }

      if (dest) {
        this.pdfViewer.scrollPageIntoView({
          pageNumber: pageNumber || this.page,
          destArray: dest,
          allowNegativeOffset: true
        });
      } else if (pageNumber) {
        this.page = pageNumber;
      }

      if ("pagemode" in params) {
        this.eventBus.dispatch("pagemode", {
          source: this,
          mode: params.pagemode
        });
      }

      if ("nameddest" in params) {
        this.goToDestination(params.nameddest);
      }
    } else {
      dest = unescape(hash);

      try {
        dest = JSON.parse(dest);

        if (!Array.isArray(dest)) {
          dest = dest.toString();
        }
      } catch (ex) {}

      if (typeof dest === "string" || isValidExplicitDestination(dest)) {
        this.goToDestination(dest);
        return;
      }

      console.error(`PDFLinkService.setHash: "${unescape(hash)}" is not ` + "a valid destination.");
    }
  }

  executeNamedAction(action) {
    switch (action) {
      case "GoBack":
        if (this.pdfHistory) {
          this.pdfHistory.back();
        }

        break;

      case "GoForward":
        if (this.pdfHistory) {
          this.pdfHistory.forward();
        }

        break;

      case "NextPage":
        this.pdfViewer.nextPage();
        break;

      case "PrevPage":
        this.pdfViewer.previousPage();
        break;

      case "LastPage":
        this.page = this.pagesCount;
        break;

      case "FirstPage":
        this.page = 1;
        break;

      default:
        break;
    }

    this.eventBus.dispatch("namedaction", {
      source: this,
      action
    });
  }

  cachePageRef(pageNum, pageRef) {
    if (!pageRef) {
      return;
    }

    const refStr = pageRef.gen === 0 ? `${pageRef.num}R` : `${pageRef.num}R${pageRef.gen}`;
    this._pagesRefCache[refStr] = pageNum;
  }

  _cachedPageNumber(pageRef) {
    const refStr = pageRef.gen === 0 ? `${pageRef.num}R` : `${pageRef.num}R${pageRef.gen}`;
    return this._pagesRefCache && this._pagesRefCache[refStr] || null;
  }

  isPageVisible(pageNumber) {
    return this.pdfViewer.isPageVisible(pageNumber);
  }

  isPageCached(pageNumber) {
    return this.pdfViewer.isPageCached(pageNumber);
  }

}

exports.PDFLinkService = PDFLinkService;

function isValidExplicitDestination(dest) {
  if (!Array.isArray(dest)) {
    return false;
  }

  const destLength = dest.length;

  if (destLength < 2) {
    return false;
  }

  const page = dest[0];

  if (!(typeof page === "object" && Number.isInteger(page.num) && Number.isInteger(page.gen)) && !(Number.isInteger(page) && page >= 0)) {
    return false;
  }

  const zoom = dest[1];

  if (!(typeof zoom === "object" && typeof zoom.name === "string")) {
    return false;
  }

  let allowNull = true;

  switch (zoom.name) {
    case "XYZ":
      if (destLength !== 5) {
        return false;
      }

      break;

    case "Fit":
    case "FitB":
      return destLength === 2;

    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (destLength !== 3) {
        return false;
      }

      break;

    case "FitR":
      if (destLength !== 6) {
        return false;
      }

      allowNull = false;
      break;

    default:
      return false;
  }

  for (let i = 2; i < destLength; i++) {
    const param = dest[i];

    if (!(typeof param === "number" || allowNull && param === null)) {
      return false;
    }
  }

  return true;
}

class SimpleLinkService {
  constructor() {
    this.externalLinkTarget = null;
    this.externalLinkRel = null;
    this.externalLinkEnabled = true;
    this._ignoreDestinationZoom = false;
  }

  get pagesCount() {
    return 0;
  }

  get page() {
    return 0;
  }

  set page(value) {}

  get rotation() {
    return 0;
  }

  set rotation(value) {}

  async goToDestination(dest) {}

  goToPage(val) {}

  getDestinationHash(dest) {
    return "#";
  }

  getAnchorUrl(hash) {
    return "#";
  }

  setHash(hash) {}

  executeNamedAction(action) {}

  cachePageRef(pageNum, pageRef) {}

  isPageVisible(pageNumber) {
    return true;
  }

  isPageCached(pageNumber) {
    return true;
  }

}

exports.SimpleLinkService = SimpleLinkService;

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFOutlineViewer = void 0;

var _pdfjsLib = __webpack_require__(5);

var _base_tree_viewer = __webpack_require__(12);

var _ui_utils = __webpack_require__(4);

class PDFOutlineViewer extends _base_tree_viewer.BaseTreeViewer {
  constructor(options) {
    super(options);
    this.linkService = options.linkService;

    this.eventBus._on("toggleoutlinetree", this._toggleAllTreeItems.bind(this));

    this.eventBus._on("currentoutlineitem", this._currentOutlineItem.bind(this));

    this.eventBus._on("pagechanging", evt => {
      this._currentPageNumber = evt.pageNumber;
    });

    this.eventBus._on("pagesloaded", evt => {
      this._isPagesLoaded = !!evt.pagesCount;
    });

    this.eventBus._on("sidebarviewchanged", evt => {
      this._sidebarView = evt.view;
    });
  }

  reset() {
    super.reset();
    this._outline = null;
    this._pageNumberToDestHashCapability = null;
    this._currentPageNumber = 1;
    this._isPagesLoaded = false;
  }

  _dispatchEvent(outlineCount) {
    this.eventBus.dispatch("outlineloaded", {
      source: this,
      outlineCount,
      enableCurrentOutlineItemButton: outlineCount > 0 && !(this._pdfDocument && this._pdfDocument.loadingParams.disableAutoFetch) //?.
    });
  }

  _bindLink(element, {
    url,
    newWindow,
    dest
  }) {
    const {
      linkService
    } = this;

    if (url) {
      (0, _pdfjsLib.addLinkAttributes)(element, {
        url,
        target: newWindow ? _pdfjsLib.LinkTarget.BLANK : linkService.externalLinkTarget,
        rel: linkService.externalLinkRel,
        enabled: linkService.externalLinkEnabled
      });
      return;
    }

    element.href = linkService.getDestinationHash(dest);

    element.onclick = evt => {
      this._updateCurrentTreeItem(evt.target.parentNode);

      if (dest) {
        linkService.goToDestination(dest);
      }

      return false;
    };
  }

  _setStyles(element, {
    bold,
    italic
  }) {
    if (bold) {
      element.style.fontWeight = "bold";
    }

    if (italic) {
      element.style.fontStyle = "italic";
    }
  }

  _addToggleButton(div, {
    count,
    items
  }) {
    let hidden = false;

    if (count < 0) {
      let totalCount = items.length;

      if (totalCount > 0) {
        const queue = [...items];

        while (queue.length > 0) {
          const {
            count: nestedCount,
            items: nestedItems
          } = queue.shift();

          if (nestedCount > 0 && nestedItems.length > 0) {
            totalCount += nestedItems.length;
            queue.push(...nestedItems);
          }
        }
      }

      if (Math.abs(count) === totalCount) {
        hidden = true;
      }
    }

    super._addToggleButton(div, hidden);
  }

  _toggleAllTreeItems() {
    if (!this._outline) {
      return;
    }

    super._toggleAllTreeItems();
  }

  render({
    outline,
    pdfDocument
  }) {
    if (this._outline) {
      this.reset();
    }

    this._outline = outline || null;
    this._pdfDocument = pdfDocument || null;

    if (!outline) {
      this._dispatchEvent(0);

      return;
    }

    const fragment = document.createDocumentFragment();
    const queue = [{
      parent: fragment,
      items: outline
    }];
    let outlineCount = 0,
        hasAnyNesting = false;

    while (queue.length > 0) {
      const levelData = queue.shift();

      for (const item of levelData.items) {
        const div = document.createElement("div");
        div.className = "treeItem";
        const element = document.createElement("a");

        this._bindLink(element, item);

        this._setStyles(element, item);

        element.textContent = this._normalizeTextContent(item.title);
        div.appendChild(element);

        if (item.items.length > 0) {
          hasAnyNesting = true;

          this._addToggleButton(div, item);

          const itemsDiv = document.createElement("div");
          itemsDiv.className = "treeItems";
          div.appendChild(itemsDiv);
          queue.push({
            parent: itemsDiv,
            items: item.items
          });
        }

        levelData.parent.appendChild(div);
        outlineCount++;
      }
    }

    this._finishRendering(fragment, outlineCount, hasAnyNesting);
  }

  async _currentOutlineItem() {
    if (!this._isPagesLoaded) {
      throw new Error("_currentOutlineItem: All pages have not been loaded.");
    }

    if (!this._outline || !this._pdfDocument) {
      return;
    }

    const pageNumberToDestHash = await this._getPageNumberToDestHash(this._pdfDocument);

    if (!pageNumberToDestHash) {
      return;
    }

    this._updateCurrentTreeItem(null);

    if (this._sidebarView !== _ui_utils.SidebarView.OUTLINE) {
      return;
    }

    for (let i = this._currentPageNumber; i > 0; i--) {
      const destHash = pageNumberToDestHash.get(i);

      if (!destHash) {
        continue;
      }

      const linkElement = this.container.querySelector(`a[href="${destHash}"]`);

      if (!linkElement) {
        continue;
      }

      this._scrollToCurrentTreeItem(linkElement.parentNode);

      break;
    }
  }

  async _getPageNumberToDestHash(pdfDocument) {
    if (this._pageNumberToDestHashCapability) {
      return this._pageNumberToDestHashCapability.promise;
    }

    this._pageNumberToDestHashCapability = (0, _pdfjsLib.createPromiseCapability)();
    const pageNumberToDestHash = new Map(),
          pageNumberNesting = new Map();
    const queue = [{
      nesting: 0,
      items: this._outline
    }];

    while (queue.length > 0) {
      const levelData = queue.shift(),
            currentNesting = levelData.nesting;

      for (const {
        dest,
        items
      } of levelData.items) {
        let explicitDest, pageNumber;

        if (typeof dest === "string") {
          explicitDest = await pdfDocument.getDestination(dest);

          if (pdfDocument !== this._pdfDocument) {
            return null;
          }
        } else {
          explicitDest = dest;
        }

        if (Array.isArray(explicitDest)) {
          const [destRef] = explicitDest;

          if (typeof destRef === "object") {
            pageNumber = this.linkService._cachedPageNumber(destRef);

            if (!pageNumber) {
              try {
                pageNumber = (await pdfDocument.getPageIndex(destRef)) + 1;

                if (pdfDocument !== this._pdfDocument) {
                  return null;
                }

                this.linkService.cachePageRef(pageNumber, destRef);
              } catch (ex) {}
            }
          } else if (Number.isInteger(destRef)) {
            pageNumber = destRef + 1;
          }

          if (Number.isInteger(pageNumber) && (!pageNumberToDestHash.has(pageNumber) || currentNesting > pageNumberNesting.get(pageNumber))) {
            const destHash = this.linkService.getDestinationHash(dest);
            pageNumberToDestHash.set(pageNumber, destHash);
            pageNumberNesting.set(pageNumber, currentNesting);
          }
        }

        if (items.length > 0) {
          queue.push({
            nesting: currentNesting + 1,
            items
          });
        }
      }
    }

    this._pageNumberToDestHashCapability.resolve(pageNumberToDestHash.size > 0 ? pageNumberToDestHash : null);

    return this._pageNumberToDestHashCapability.promise;
  }

}

exports.PDFOutlineViewer = PDFOutlineViewer;

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFPresentationMode = void 0;

var _ui_utils = __webpack_require__(4);

const DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS = 1500;
const DELAY_BEFORE_HIDING_CONTROLS = 3000;
const ACTIVE_SELECTOR = "pdfPresentationMode";
const CONTROLS_SELECTOR = "pdfPresentationModeControls";
const MOUSE_SCROLL_COOLDOWN_TIME = 50;
const PAGE_SWITCH_THRESHOLD = 0.1;
const SWIPE_MIN_DISTANCE_THRESHOLD = 50;
const SWIPE_ANGLE_THRESHOLD = Math.PI / 6;

class PDFPresentationMode {
  constructor({
    container,
    pdfViewer,
    eventBus,
    contextMenuItems = null
  }) {
    this.container = container;
    this.pdfViewer = pdfViewer;
    this.eventBus = eventBus;
    this.active = false;
    this.args = null;
    this.contextMenuOpen = false;
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
    this.touchSwipeState = null;

    if (contextMenuItems) {
      contextMenuItems.contextFirstPage.addEventListener("click", () => {
        this.contextMenuOpen = false;
        this.eventBus.dispatch("firstpage", {
          source: this
        });
      });
      contextMenuItems.contextLastPage.addEventListener("click", () => {
        this.contextMenuOpen = false;
        this.eventBus.dispatch("lastpage", {
          source: this
        });
      });
      contextMenuItems.contextPageRotateCw.addEventListener("click", () => {
        this.contextMenuOpen = false;
        this.eventBus.dispatch("rotatecw", {
          source: this
        });
      });
      contextMenuItems.contextPageRotateCcw.addEventListener("click", () => {
        this.contextMenuOpen = false;
        this.eventBus.dispatch("rotateccw", {
          source: this
        });
      });
    }
  }

  request() {
    if (this.switchInProgress || this.active || !this.pdfViewer.pagesCount) {
      return false;
    }

    this._addFullscreenChangeListeners();

    this._setSwitchInProgress();

    this._notifyStateChange();

    if (this.container.requestFullscreen) {
      this.container.requestFullscreen();
    } else if (this.container.mozRequestFullScreen) {
      this.container.mozRequestFullScreen();
    } else if (this.container.webkitRequestFullscreen) {
      this.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else {
      return false;
    }

    this.args = {
      page: this.pdfViewer.currentPageNumber,
      previousScale: this.pdfViewer.currentScaleValue
    };
    return true;
  }

  _mouseWheel(evt) {
    if (!this.active) {
      return;
    }

    evt.preventDefault();
    const delta = (0, _ui_utils.normalizeWheelEventDelta)(evt);
    const currentTime = new Date().getTime();
    const storedTime = this.mouseScrollTimeStamp;

    if (currentTime > storedTime && currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME) {
      return;
    }

    if (this.mouseScrollDelta > 0 && delta < 0 || this.mouseScrollDelta < 0 && delta > 0) {
      this._resetMouseScrollState();
    }

    this.mouseScrollDelta += delta;

    if (Math.abs(this.mouseScrollDelta) >= PAGE_SWITCH_THRESHOLD) {
      const totalDelta = this.mouseScrollDelta;

      this._resetMouseScrollState();

      const success = totalDelta > 0 ? this.pdfViewer.previousPage() : this.pdfViewer.nextPage();

      if (success) {
        this.mouseScrollTimeStamp = currentTime;
      }
    }
  }

  get isFullscreen() {
    return !!(document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen);
  }

  _notifyStateChange() {
    let state = _ui_utils.PresentationModeState.NORMAL;

    if (this.switchInProgress) {
      state = _ui_utils.PresentationModeState.CHANGING;
    } else if (this.active) {
      state = _ui_utils.PresentationModeState.FULLSCREEN;
    }

    this.eventBus.dispatch("presentationmodechanged", {
      source: this,
      state,

      get active() {
        throw new Error("Deprecated parameter: `active`, please use `state` instead.");
      },

      get switchInProgress() {
        throw new Error("Deprecated parameter: `switchInProgress`, please use `state` instead.");
      }

    });
  }

  _setSwitchInProgress() {
    if (this.switchInProgress) {
      clearTimeout(this.switchInProgress);
    }

    this.switchInProgress = setTimeout(() => {
      this._removeFullscreenChangeListeners();

      delete this.switchInProgress;

      this._notifyStateChange();
    }, DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS);
  }

  _resetSwitchInProgress() {
    if (this.switchInProgress) {
      clearTimeout(this.switchInProgress);
      delete this.switchInProgress;
    }
  }

  _enter() {
    this.active = true;

    this._resetSwitchInProgress();

    this._notifyStateChange();

    this.container.classList.add(ACTIVE_SELECTOR);
    setTimeout(() => {
      this.pdfViewer.currentPageNumber = this.args.page;
      this.pdfViewer.currentScaleValue = "page-fit";
    }, 0);

    this._addWindowListeners();

    this._showControls();

    this.contextMenuOpen = false;
    this.container.setAttribute("contextmenu", "viewerContextMenu");
    window.getSelection().removeAllRanges();
  }

  _exit() {
    const page = this.pdfViewer.currentPageNumber;
    this.container.classList.remove(ACTIVE_SELECTOR);
    setTimeout(() => {
      this.active = false;

      this._removeFullscreenChangeListeners();

      this._notifyStateChange();

      this.pdfViewer.currentScaleValue = this.args.previousScale;
      this.pdfViewer.currentPageNumber = page;
      this.args = null;
    }, 0);

    this._removeWindowListeners();

    this._hideControls();

    this._resetMouseScrollState();

    this.container.removeAttribute("contextmenu");
    this.contextMenuOpen = false;
  }

  _mouseDown(evt) {
    if (this.contextMenuOpen) {
      this.contextMenuOpen = false;
      evt.preventDefault();
      return;
    }

    if (evt.button === 0) {
      const isInternalLink = evt.target.href && evt.target.classList.contains("internalLink");

      if (!isInternalLink) {
        evt.preventDefault();

        if (evt.shiftKey) {
          this.pdfViewer.previousPage();
        } else {
          this.pdfViewer.nextPage();
        }
      }
    }
  }

  _contextMenu() {
    this.contextMenuOpen = true;
  }

  _showControls() {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    } else {
      this.container.classList.add(CONTROLS_SELECTOR);
    }

    this.controlsTimeout = setTimeout(() => {
      this.container.classList.remove(CONTROLS_SELECTOR);
      delete this.controlsTimeout;
    }, DELAY_BEFORE_HIDING_CONTROLS);
  }

  _hideControls() {
    if (!this.controlsTimeout) {
      return;
    }

    clearTimeout(this.controlsTimeout);
    this.container.classList.remove(CONTROLS_SELECTOR);
    delete this.controlsTimeout;
  }

  _resetMouseScrollState() {
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
  }

  _touchSwipe(evt) {
    if (!this.active) {
      return;
    }

    if (evt.touches.length > 1) {
      this.touchSwipeState = null;
      return;
    }

    switch (evt.type) {
      case "touchstart":
        this.touchSwipeState = {
          startX: evt.touches[0].pageX,
          startY: evt.touches[0].pageY,
          endX: evt.touches[0].pageX,
          endY: evt.touches[0].pageY
        };
        break;

      case "touchmove":
        if (this.touchSwipeState === null) {
          return;
        }

        this.touchSwipeState.endX = evt.touches[0].pageX;
        this.touchSwipeState.endY = evt.touches[0].pageY;
        evt.preventDefault();
        break;

      case "touchend":
        if (this.touchSwipeState === null) {
          return;
        }

        let delta = 0;
        const dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
        const dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
        const absAngle = Math.abs(Math.atan2(dy, dx));

        if (Math.abs(dx) > SWIPE_MIN_DISTANCE_THRESHOLD && (absAngle <= SWIPE_ANGLE_THRESHOLD || absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD)) {
          delta = dx;
        } else if (Math.abs(dy) > SWIPE_MIN_DISTANCE_THRESHOLD && Math.abs(absAngle - Math.PI / 2) <= SWIPE_ANGLE_THRESHOLD) {
          delta = dy;
        }

        if (delta > 0) {
          this.pdfViewer.previousPage();
        } else if (delta < 0) {
          this.pdfViewer.nextPage();
        }

        break;
    }
  }

  _addWindowListeners() {
    this.showControlsBind = this._showControls.bind(this);
    this.mouseDownBind = this._mouseDown.bind(this);
    this.mouseWheelBind = this._mouseWheel.bind(this);
    this.resetMouseScrollStateBind = this._resetMouseScrollState.bind(this);
    this.contextMenuBind = this._contextMenu.bind(this);
    this.touchSwipeBind = this._touchSwipe.bind(this);
    window.addEventListener("mousemove", this.showControlsBind);
    window.addEventListener("mousedown", this.mouseDownBind);
    window.addEventListener("wheel", this.mouseWheelBind, {
      passive: false
    });
    window.addEventListener("keydown", this.resetMouseScrollStateBind);
    window.addEventListener("contextmenu", this.contextMenuBind);
    window.addEventListener("touchstart", this.touchSwipeBind);
    window.addEventListener("touchmove", this.touchSwipeBind);
    window.addEventListener("touchend", this.touchSwipeBind);
  }

  _removeWindowListeners() {
    window.removeEventListener("mousemove", this.showControlsBind);
    window.removeEventListener("mousedown", this.mouseDownBind);
    window.removeEventListener("wheel", this.mouseWheelBind, {
      passive: false
    });
    window.removeEventListener("keydown", this.resetMouseScrollStateBind);
    window.removeEventListener("contextmenu", this.contextMenuBind);
    window.removeEventListener("touchstart", this.touchSwipeBind);
    window.removeEventListener("touchmove", this.touchSwipeBind);
    window.removeEventListener("touchend", this.touchSwipeBind);
    delete this.showControlsBind;
    delete this.mouseDownBind;
    delete this.mouseWheelBind;
    delete this.resetMouseScrollStateBind;
    delete this.contextMenuBind;
    delete this.touchSwipeBind;
  }

  _fullscreenChange() {
    if (this.isFullscreen) {
      this._enter();
    } else {
      this._exit();
    }
  }

  _addFullscreenChangeListeners() {
    this.fullscreenChangeBind = this._fullscreenChange.bind(this);
    window.addEventListener("fullscreenchange", this.fullscreenChangeBind);
    window.addEventListener("mozfullscreenchange", this.fullscreenChangeBind);
    window.addEventListener("webkitfullscreenchange", this.fullscreenChangeBind);
  }

  _removeFullscreenChangeListeners() {
    window.removeEventListener("fullscreenchange", this.fullscreenChangeBind);
    window.removeEventListener("mozfullscreenchange", this.fullscreenChangeBind);
    window.removeEventListener("webkitfullscreenchange", this.fullscreenChangeBind);
    delete this.fullscreenChangeBind;
  }

}

exports.PDFPresentationMode = PDFPresentationMode;

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFSidebar = void 0;

var _ui_utils = __webpack_require__(4);

var _pdf_rendering_queue = __webpack_require__(8);

const UI_NOTIFICATION_CLASS = "pdfSidebarNotification";

class PDFSidebar {
  constructor({
    elements,
    pdfViewer,
    pdfThumbnailViewer,
    eventBus,
    l10n = _ui_utils.NullL10n
  }) {
    this.isOpen = false;
    this.active = _ui_utils.SidebarView.THUMBS;
    this.isInitialViewSet = false;
    this.onToggled = null;
    this.pdfViewer = pdfViewer;
    this.pdfThumbnailViewer = pdfThumbnailViewer;
    this.outerContainer = elements.outerContainer;
    this.viewerContainer = elements.viewerContainer;
    this.toggleButton = elements.toggleButton;
    this.thumbnailButton = elements.thumbnailButton;
    this.outlineButton = elements.outlineButton;
    this.attachmentsButton = elements.attachmentsButton;
    this.layersButton = elements.layersButton;
    this.thumbnailView = elements.thumbnailView;
    this.outlineView = elements.outlineView;
    this.attachmentsView = elements.attachmentsView;
    this.layersView = elements.layersView;
    this._outlineOptionsContainer = elements.outlineOptionsContainer;
    this._currentOutlineItemButton = elements.currentOutlineItemButton;
    this.eventBus = eventBus;
    this.l10n = l10n;

    this._addEventListeners();
  }

  reset() {
    this.isInitialViewSet = false;

    this._hideUINotification(true);

    this.switchView(_ui_utils.SidebarView.THUMBS);
    this.outlineButton.disabled = false;
    this.attachmentsButton.disabled = false;
    this.layersButton.disabled = false;
    this._currentOutlineItemButton.disabled = true;
  }

  get visibleView() {
    return this.isOpen ? this.active : _ui_utils.SidebarView.NONE;
  }

  get isThumbnailViewVisible() {
    return this.isOpen && this.active === _ui_utils.SidebarView.THUMBS;
  }

  get isOutlineViewVisible() {
    return this.isOpen && this.active === _ui_utils.SidebarView.OUTLINE;
  }

  get isAttachmentsViewVisible() {
    return this.isOpen && this.active === _ui_utils.SidebarView.ATTACHMENTS;
  }

  get isLayersViewVisible() {
    return this.isOpen && this.active === _ui_utils.SidebarView.LAYERS;
  }

  setInitialView(view = _ui_utils.SidebarView.NONE) {
    if (this.isInitialViewSet) {
      return;
    }

    this.isInitialViewSet = true;

    if (view === _ui_utils.SidebarView.NONE || view === _ui_utils.SidebarView.UNKNOWN) {
      this._dispatchEvent();

      return;
    }

    if (!this._switchView(view, true)) {
      this._dispatchEvent();
    }
  }

  switchView(view, forceOpen = false) {
    this._switchView(view, forceOpen);
  }

  _switchView(view, forceOpen = false) {
    const isViewChanged = view !== this.active;
    let shouldForceRendering = false;

    switch (view) {
      case _ui_utils.SidebarView.NONE:
        if (this.isOpen) {
          this.close();
          return true;
        }

        return false;

      case _ui_utils.SidebarView.THUMBS:
        if (this.isOpen && isViewChanged) {
          shouldForceRendering = true;
        }

        break;

      case _ui_utils.SidebarView.OUTLINE:
        if (this.outlineButton.disabled) {
          return false;
        }

        break;

      case _ui_utils.SidebarView.ATTACHMENTS:
        if (this.attachmentsButton.disabled) {
          return false;
        }

        break;

      case _ui_utils.SidebarView.LAYERS:
        if (this.layersButton.disabled) {
          return false;
        }

        break;

      default:
        console.error(`PDFSidebar._switchView: "${view}" is not a valid view.`);
        return false;
    }

    this.active = view;
    this.thumbnailButton.classList.toggle("toggled", view === _ui_utils.SidebarView.THUMBS);
    this.outlineButton.classList.toggle("toggled", view === _ui_utils.SidebarView.OUTLINE);
    this.attachmentsButton.classList.toggle("toggled", view === _ui_utils.SidebarView.ATTACHMENTS);
    this.layersButton.classList.toggle("toggled", view === _ui_utils.SidebarView.LAYERS);
    this.thumbnailView.classList.toggle("hidden", view !== _ui_utils.SidebarView.THUMBS);
    this.outlineView.classList.toggle("hidden", view !== _ui_utils.SidebarView.OUTLINE);
    this.attachmentsView.classList.toggle("hidden", view !== _ui_utils.SidebarView.ATTACHMENTS);
    this.layersView.classList.toggle("hidden", view !== _ui_utils.SidebarView.LAYERS);

    this._outlineOptionsContainer.classList.toggle("hidden", view !== _ui_utils.SidebarView.OUTLINE);

    if (forceOpen && !this.isOpen) {
      this.open();
      return true;
    }

    if (shouldForceRendering) {
      this._updateThumbnailViewer();

      this._forceRendering();
    }

    if (isViewChanged) {
      this._dispatchEvent();
    }

    return isViewChanged;
  }

  open() {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.toggleButton.classList.add("toggled");
    this.outerContainer.classList.add("sidebarMoving", "sidebarOpen");

    if (this.active === _ui_utils.SidebarView.THUMBS) {
      this._updateThumbnailViewer();
    }

    this._forceRendering();

    this._dispatchEvent();

    this._hideUINotification();
  }

  close() {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.toggleButton.classList.remove("toggled");
    this.outerContainer.classList.add("sidebarMoving");
    this.outerContainer.classList.remove("sidebarOpen");

    this._forceRendering();

    this._dispatchEvent();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  _dispatchEvent() {
    this.eventBus.dispatch("sidebarviewchanged", {
      source: this,
      view: this.visibleView
    });
  }

  _forceRendering() {
    if (this.onToggled) {
      this.onToggled();
    } else {
      this.pdfViewer.forceRendering();
      this.pdfThumbnailViewer.forceRendering();
    }
  }

  _updateThumbnailViewer() {
    const {
      pdfViewer,
      pdfThumbnailViewer
    } = this;
    const pagesCount = pdfViewer.pagesCount;

    for (let pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
      const pageView = pdfViewer.getPageView(pageIndex);

      if (pageView && pageView.renderingState === _pdf_rendering_queue.RenderingStates.FINISHED) {
        const thumbnailView = pdfThumbnailViewer.getThumbnail(pageIndex);
        thumbnailView.setImage(pageView);
      }
    }

    pdfThumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
  }

  _showUINotification() {
    this.l10n.get("toggle_sidebar_notification2.title", null, "Toggle Sidebar (document contains outline/attachments/layers)").then(msg => {
      this.toggleButton.title = msg;
    });

    if (!this.isOpen) {
      this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
    }
  }

  _hideUINotification(reset = false) {
    if (this.isOpen || reset) {
      this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
    }

    if (reset) {
      this.l10n.get("toggle_sidebar.title", null, "Toggle Sidebar").then(msg => {
        this.toggleButton.title = msg;
      });
    }
  }

  _addEventListeners() {
    this.viewerContainer.addEventListener("transitionend", evt => {
      if (evt.target === this.viewerContainer) {
        this.outerContainer.classList.remove("sidebarMoving");
      }
    });
    this.toggleButton.addEventListener("click", () => {
      this.toggle();
    });
    this.thumbnailButton.addEventListener("click", () => {
      this.switchView(_ui_utils.SidebarView.THUMBS);
    });
    this.outlineButton.addEventListener("click", () => {
      this.switchView(_ui_utils.SidebarView.OUTLINE);
    });
    this.outlineButton.addEventListener("dblclick", () => {
      this.eventBus.dispatch("toggleoutlinetree", {
        source: this
      });
    });
    this.attachmentsButton.addEventListener("click", () => {
      this.switchView(_ui_utils.SidebarView.ATTACHMENTS);
    });
    this.layersButton.addEventListener("click", () => {
      this.switchView(_ui_utils.SidebarView.LAYERS);
    });
    this.layersButton.addEventListener("dblclick", () => {
      this.eventBus.dispatch("resetlayers", {
        source: this
      });
    });

    this._currentOutlineItemButton.addEventListener("click", () => {
      this.eventBus.dispatch("currentoutlineitem", {
        source: this
      });
    });

    const onTreeLoaded = (count, button, view) => {
      button.disabled = !count;

      if (count) {
        this._showUINotification();
      } else if (this.active === view) {
        this.switchView(_ui_utils.SidebarView.THUMBS);
      }
    };

    this.eventBus._on("outlineloaded", evt => {
      onTreeLoaded(evt.outlineCount, this.outlineButton, _ui_utils.SidebarView.OUTLINE);

      if (evt.enableCurrentOutlineItemButton) {
        this.pdfViewer.pagesPromise.then(() => {
          this._currentOutlineItemButton.disabled = !this.isInitialViewSet;
        });
      }
    });

    this.eventBus._on("attachmentsloaded", evt => {
      onTreeLoaded(evt.attachmentsCount, this.attachmentsButton, _ui_utils.SidebarView.ATTACHMENTS);
    });

    this.eventBus._on("layersloaded", evt => {
      onTreeLoaded(evt.layersCount, this.layersButton, _ui_utils.SidebarView.LAYERS);
    });

    this.eventBus._on("presentationmodechanged", evt => {
      if (evt.state === _ui_utils.PresentationModeState.NORMAL && this.isThumbnailViewVisible) {
        this._updateThumbnailViewer();
      }
    });
  }

}

exports.PDFSidebar = PDFSidebar;

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFSidebarResizer = void 0;

var _ui_utils = __webpack_require__(4);

const SIDEBAR_WIDTH_VAR = "--sidebar-width";
const SIDEBAR_MIN_WIDTH = 200;
const SIDEBAR_RESIZING_CLASS = "sidebarResizing";

class PDFSidebarResizer {
  constructor(options, eventBus, l10n = _ui_utils.NullL10n) {
    this.isRTL = false;
    this.sidebarOpen = false;
    this.doc = document.documentElement;
    this._width = null;
    this._outerContainerWidth = null;
    this._boundEvents = Object.create(null);
    this.outerContainer = options.outerContainer;
    this.resizer = options.resizer;
    this.eventBus = eventBus;
    l10n.getDirection().then(dir => {
      this.isRTL = dir === "rtl";
    });

    this._addEventListeners();
  }

  get outerContainerWidth() {
    if (!this._outerContainerWidth) {
      this._outerContainerWidth = this.outerContainer.clientWidth;
    }

    return this._outerContainerWidth;
  }

  _updateWidth(width = 0) {
    const maxWidth = Math.floor(this.outerContainerWidth / 2);

    if (width > maxWidth) {
      width = maxWidth;
    }

    if (width < SIDEBAR_MIN_WIDTH) {
      width = SIDEBAR_MIN_WIDTH;
    }

    if (width === this._width) {
      return false;
    }

    this._width = width;
    this.doc.style.setProperty(SIDEBAR_WIDTH_VAR, `${width}px`);
    return true;
  }

  _mouseMove(evt) {
    let width = evt.clientX;

    if (this.isRTL) {
      width = this.outerContainerWidth - width;
    }

    this._updateWidth(width);
  }

  _mouseUp(evt) {
    this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
    this.eventBus.dispatch("resize", {
      source: this
    });
    const _boundEvents = this._boundEvents;
    window.removeEventListener("mousemove", _boundEvents.mouseMove);
    window.removeEventListener("mouseup", _boundEvents.mouseUp);
  }

  _addEventListeners() {
    const _boundEvents = this._boundEvents;
    _boundEvents.mouseMove = this._mouseMove.bind(this);
    _boundEvents.mouseUp = this._mouseUp.bind(this);
    this.resizer.addEventListener("mousedown", evt => {
      if (evt.button !== 0) {
        return;
      }

      this.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);
      window.addEventListener("mousemove", _boundEvents.mouseMove);
      window.addEventListener("mouseup", _boundEvents.mouseUp);
    });

    this.eventBus._on("sidebarviewchanged", evt => {
      this.sidebarOpen = !!(evt && evt.view);
    });

    this.eventBus._on("resize", evt => {
      if (!evt || evt.source !== window) {
        return;
      }

      this._outerContainerWidth = null;

      if (!this._width) {
        return;
      }

      if (!this.sidebarOpen) {
        this._updateWidth(this._width);

        return;
      }

      this.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);

      const updated = this._updateWidth(this._width);

      Promise.resolve().then(() => {
        this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);

        if (updated) {
          this.eventBus.dispatch("resize", {
            source: this
          });
        }
      });
    });
  }

}

exports.PDFSidebarResizer = PDFSidebarResizer;

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFThumbnailViewer = void 0;

var _ui_utils = __webpack_require__(4);

var _pdf_thumbnail_view = __webpack_require__(25);

var _pdf_rendering_queue = __webpack_require__(8);

const THUMBNAIL_SCROLL_MARGIN = -19;
const THUMBNAIL_SELECTED_CLASS = "selected";

class PDFThumbnailViewer {
  constructor({
    container,
    eventBus,
    linkService,
    renderingQueue,
    l10n = _ui_utils.NullL10n
  }) {
    this.container = container;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.l10n = l10n;
    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdated.bind(this));

    this._resetView();

    eventBus._on("optionalcontentconfigchanged", () => {
      this._setImageDisabled = true;
    });
  }

  _scrollUpdated() {
    this.renderingQueue.renderHighestPriority();
  }

  getThumbnail(index) {
    return this._thumbnails[index];
  }

  _getVisibleThumbs() {
    return (0, _ui_utils.getVisibleElements)({
      scrollEl: this.container,
      views: this._thumbnails
    });
  }

  scrollThumbnailIntoView(pageNumber) {
    if (!this.pdfDocument) {
      return;
    }

    const thumbnailView = this._thumbnails[pageNumber - 1];

    if (!thumbnailView) {
      console.error('scrollThumbnailIntoView: Invalid "pageNumber" parameter.');
      return;
    }

    if (pageNumber !== this._currentPageNumber) {
      const prevThumbnailView = this._thumbnails[this._currentPageNumber - 1];
      prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS);
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
    }

    const visibleThumbs = this._getVisibleThumbs();

    const numVisibleThumbs = visibleThumbs.views.length;

    if (numVisibleThumbs > 0) {
      const first = visibleThumbs.first.id;
      const last = numVisibleThumbs > 1 ? visibleThumbs.last.id : first;
      let shouldScroll = false;

      if (pageNumber <= first || pageNumber >= last) {
        shouldScroll = true;
      } else {
        visibleThumbs.views.some(function (view) {
          if (view.id !== pageNumber) {
            return false;
          }

          shouldScroll = view.percent < 100;
          return true;
        });
      }

      if (shouldScroll) {
        (0, _ui_utils.scrollIntoView)(thumbnailView.div, {
          top: THUMBNAIL_SCROLL_MARGIN
        });
      }
    }

    this._currentPageNumber = pageNumber;
  }

  get pagesRotation() {
    return this._pagesRotation;
  }

  set pagesRotation(rotation) {
    if (!(0, _ui_utils.isValidRotation)(rotation)) {
      throw new Error("Invalid thumbnails rotation angle.");
    }

    if (!this.pdfDocument) {
      return;
    }

    if (this._pagesRotation === rotation) {
      return;
    }

    this._pagesRotation = rotation;

    for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
      this._thumbnails[i].update(rotation);
    }
  }

  cleanup() {
    for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
      if (this._thumbnails[i] && this._thumbnails[i].renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
        this._thumbnails[i].reset();
      }
    }

    _pdf_thumbnail_view.TempImageFactory.destroyCanvas();
  }

  _resetView() {
    this._thumbnails = [];
    this._currentPageNumber = 1;
    this._pageLabels = null;
    this._pagesRotation = 0;
    this._optionalContentConfigPromise = null;
    this._pagesRequests = new WeakMap();
    this._setImageDisabled = false;
    this.container.textContent = "";
  }

  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      this._cancelRendering();

      this._resetView();
    }

    this.pdfDocument = pdfDocument;

    if (!pdfDocument) {
      return;
    }

    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();
    firstPagePromise.then(firstPdfPage => {
      this._optionalContentConfigPromise = optionalContentConfigPromise;
      const pagesCount = pdfDocument.numPages;
      const viewport = firstPdfPage.getViewport({
        scale: 1
      });

      const checkSetImageDisabled = () => {
        return this._setImageDisabled;
      };

      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
        const thumbnail = new _pdf_thumbnail_view.PDFThumbnailView({
          container: this.container,
          id: pageNum,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          linkService: this.linkService,
          renderingQueue: this.renderingQueue,
          checkSetImageDisabled,
          disableCanvasToImageConversion: false,
          l10n: this.l10n
        });

        this._thumbnails.push(thumbnail);
      }

      const firstThumbnailView = this._thumbnails[0];

      if (firstThumbnailView) {
        firstThumbnailView.setPdfPage(firstPdfPage);
      }

      const thumbnailView = this._thumbnails[this._currentPageNumber - 1];
      thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
    }).catch(reason => {
      console.error("Unable to initialize thumbnail viewer", reason);
    });
  }

  _cancelRendering() {
    for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
      if (this._thumbnails[i]) {
        this._thumbnails[i].cancelRendering();
      }
    }
  }

  setPageLabels(labels) {
    if (!this.pdfDocument) {
      return;
    }

    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.");
    } else {
      this._pageLabels = labels;
    }

    for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
      const label = this._pageLabels && this._pageLabels[i];

      this._thumbnails[i].setPageLabel(label);
    }
  }

  _ensurePdfPageLoaded(thumbView) {
    if (thumbView.pdfPage) {
      return Promise.resolve(thumbView.pdfPage);
    }

    if (this._pagesRequests.has(thumbView)) {
      return this._pagesRequests.get(thumbView);
    }

    const promise = this.pdfDocument.getPage(thumbView.id).then(pdfPage => {
      if (!thumbView.pdfPage) {
        thumbView.setPdfPage(pdfPage);
      }

      this._pagesRequests.delete(thumbView);

      return pdfPage;
    }).catch(reason => {
      console.error("Unable to get page for thumb view", reason);

      this._pagesRequests.delete(thumbView);
    });

    this._pagesRequests.set(thumbView, promise);

    return promise;
  }

  forceRendering() {
    const visibleThumbs = this._getVisibleThumbs();

    const thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this._thumbnails, this.scroll.down);

    if (thumbView) {
      this._ensurePdfPageLoaded(thumbView).then(() => {
        this.renderingQueue.renderView(thumbView);
      });

      return true;
    }

    return false;
  }

}

exports.PDFThumbnailViewer = PDFThumbnailViewer;

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TempImageFactory = exports.PDFThumbnailView = void 0;

var _ui_utils = __webpack_require__(4);

var _pdfjsLib = __webpack_require__(5);

var _pdf_rendering_queue = __webpack_require__(8);

const MAX_NUM_SCALING_STEPS = 3;
const THUMBNAIL_CANVAS_BORDER_WIDTH = 1;
const THUMBNAIL_WIDTH = 98;

const TempImageFactory = function TempImageFactoryClosure() {
  let tempCanvasCache = null;
  return {
    getCanvas(width, height) {
      let tempCanvas = tempCanvasCache;

      if (!tempCanvas) {
        tempCanvas = document.createElement("canvas");
        tempCanvasCache = tempCanvas;
      }

      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCanvas.mozOpaque = true;
      const ctx = tempCanvas.getContext("2d", {
        alpha: false
      });
      ctx.save();
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
      return tempCanvas;
    },

    destroyCanvas() {
      const tempCanvas = tempCanvasCache;

      if (tempCanvas) {
        tempCanvas.width = 0;
        tempCanvas.height = 0;
      }

      tempCanvasCache = null;
    }

  };
}();

exports.TempImageFactory = TempImageFactory;

class PDFThumbnailView {
  constructor({
    container,
    id,
    defaultViewport,
    optionalContentConfigPromise,
    linkService,
    renderingQueue,
    checkSetImageDisabled,
    disableCanvasToImageConversion = false,
    l10n = _ui_utils.NullL10n
  }) {
    this.id = id;
    this.renderingId = "thumbnail" + id;
    this.pageLabel = null;
    this.pdfPage = null;
    this.rotation = 0;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = optionalContentConfigPromise || null;
    this.linkService = linkService;
    this.renderingQueue = renderingQueue;
    this.renderTask = null;
    this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
    this.resume = null;

    this._checkSetImageDisabled = checkSetImageDisabled || function () {
      return false;
    };

    this.disableCanvasToImageConversion = disableCanvasToImageConversion;
    this.pageWidth = this.viewport.width;
    this.pageHeight = this.viewport.height;
    this.pageRatio = this.pageWidth / this.pageHeight;
    this.canvasWidth = THUMBNAIL_WIDTH;
    this.canvasHeight = this.canvasWidth / this.pageRatio | 0;
    this.scale = this.canvasWidth / this.pageWidth;
    this.l10n = l10n;
    const anchor = document.createElement("a");
    anchor.href = linkService.getAnchorUrl("#page=" + id);

    this._thumbPageTitle.then(msg => {
      anchor.title = msg;
    });

    anchor.onclick = function () {
      linkService.goToPage(id);
      return false;
    };

    this.anchor = anchor;
    const div = document.createElement("div");
    div.className = "thumbnail";
    div.setAttribute("data-page-number", this.id);
    this.div = div;
    const ring = document.createElement("div");
    ring.className = "thumbnailSelectionRing";
    const borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
    ring.style.width = this.canvasWidth + borderAdjustment + "px";
    ring.style.height = this.canvasHeight + borderAdjustment + "px";
    this.ring = ring;
    div.appendChild(ring);
    anchor.appendChild(div);
    container.appendChild(anchor);
  }

  setPdfPage(pdfPage) {
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = pdfPage.getViewport({
      scale: 1,
      rotation: totalRotation
    });
    this.reset();
  }

  reset() {
    this.cancelRendering();
    this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
    this.pageWidth = this.viewport.width;
    this.pageHeight = this.viewport.height;
    this.pageRatio = this.pageWidth / this.pageHeight;
    this.canvasHeight = this.canvasWidth / this.pageRatio | 0;
    this.scale = this.canvasWidth / this.pageWidth;
    this.div.removeAttribute("data-loaded");
    const ring = this.ring;
    const childNodes = ring.childNodes;

    for (let i = childNodes.length - 1; i >= 0; i--) {
      ring.removeChild(childNodes[i]);
    }

    const borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
    ring.style.width = this.canvasWidth + borderAdjustment + "px";
    ring.style.height = this.canvasHeight + borderAdjustment + "px";

    if (this.canvas) {
      this.canvas.width = 0;
      this.canvas.height = 0;
      delete this.canvas;
    }

    if (this.image) {
      this.image.removeAttribute("src");
      delete this.image;
    }
  }

  update(rotation) {
    if (typeof rotation !== "undefined") {
      this.rotation = rotation;
    }

    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = this.viewport.clone({
      scale: 1,
      rotation: totalRotation
    });
    this.reset();
  }

  cancelRendering() {
    if (this.renderTask) {
      this.renderTask.cancel();
      this.renderTask = null;
    }

    this.resume = null;
  }

  _getPageDrawContext() {
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.mozOpaque = true;
    const ctx = canvas.getContext("2d", {
      alpha: false
    });
    const outputScale = (0, _ui_utils.getOutputScale)(ctx);
    canvas.width = this.canvasWidth * outputScale.sx | 0;
    canvas.height = this.canvasHeight * outputScale.sy | 0;
    canvas.style.width = this.canvasWidth + "px";
    canvas.style.height = this.canvasHeight + "px";
    const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;
    return [ctx, transform];
  }

  _convertCanvasToImage() {
    if (!this.canvas) {
      return;
    }

    if (this.renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
      return;
    }

    const className = "thumbnailImage";

    if (this.disableCanvasToImageConversion) {
      this.canvas.className = className;

      this._thumbPageCanvas.then(msg => {
        this.canvas.setAttribute("aria-label", msg);
      });

      this.div.setAttribute("data-loaded", true);
      this.ring.appendChild(this.canvas);
      return;
    }

    const image = document.createElement("img");
    image.className = className;

    this._thumbPageCanvas.then(msg => {
      image.setAttribute("aria-label", msg);
    });

    image.style.width = this.canvasWidth + "px";
    image.style.height = this.canvasHeight + "px";
    image.src = this.canvas.toDataURL();
    this.image = image;
    this.div.setAttribute("data-loaded", true);
    this.ring.appendChild(image);
    this.canvas.width = 0;
    this.canvas.height = 0;
    delete this.canvas;
  }

  draw() {
    if (this.renderingState !== _pdf_rendering_queue.RenderingStates.INITIAL) {
      console.error("Must be in new state before drawing");
      return Promise.resolve(undefined);
    }

    const {
      pdfPage
    } = this;

    if (!pdfPage) {
      this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;
      return Promise.reject(new Error("pdfPage is not loaded"));
    }

    this.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;

    const finishRenderTask = async (error = null) => {
      if (renderTask === this.renderTask) {
        this.renderTask = null;
      }

      if (error instanceof _pdfjsLib.RenderingCancelledException) {
        return;
      }

      this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

      this._convertCanvasToImage();

      if (error) {
        throw error;
      }
    };

    const [ctx, transform] = this._getPageDrawContext();

    const drawViewport = this.viewport.clone({
      scale: this.scale
    });

    const renderContinueCallback = cont => {
      if (!this.renderingQueue.isHighestPriority(this)) {
        this.renderingState = _pdf_rendering_queue.RenderingStates.PAUSED;

        this.resume = () => {
          this.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;
          cont();
        };

        return;
      }

      cont();
    };

    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport: drawViewport,
      optionalContentConfigPromise: this._optionalContentConfigPromise
    };
    const renderTask = this.renderTask = pdfPage.render(renderContext);
    renderTask.onContinue = renderContinueCallback;
    const resultPromise = renderTask.promise.then(function () {
      finishRenderTask(null);
    }, function (error) {
      finishRenderTask(error);
    });
    resultPromise.finally(() => {
      const pageCached = this.linkService.isPageCached(this.id);

      if (pageCached) {
        return;
      }

      this.pdfPage && this.pdfPage.cleanup(); //?.
    });
    return resultPromise;
  }

  setImage(pageView) {
    if (this._checkSetImageDisabled()) {
      return;
    }

    if (this.renderingState !== _pdf_rendering_queue.RenderingStates.INITIAL) {
      return;
    }

    const img = pageView.canvas;

    if (!img) {
      return;
    }

    if (!this.pdfPage) {
      this.setPdfPage(pageView.pdfPage);
    }

    this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

    const [ctx] = this._getPageDrawContext();

    const canvas = ctx.canvas;

    if (img.width <= 2 * canvas.width) {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

      this._convertCanvasToImage();

      return;
    }

    let reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
    let reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
    const reducedImage = TempImageFactory.getCanvas(reducedWidth, reducedHeight);
    const reducedImageCtx = reducedImage.getContext("2d");

    while (reducedWidth > img.width || reducedHeight > img.height) {
      reducedWidth >>= 1;
      reducedHeight >>= 1;
    }

    reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight);

    while (reducedWidth > 2 * canvas.width) {
      reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth >> 1, reducedHeight >> 1);
      reducedWidth >>= 1;
      reducedHeight >>= 1;
    }

    ctx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height);

    this._convertCanvasToImage();
  }

  get _thumbPageTitle() {
    return this.l10n.get("thumb_page_title", {
      page: this.pageLabel ||  this.id // ??
    }, "Page {{page}}");
  }

  get _thumbPageCanvas() {
    return this.l10n.get("thumb_page_canvas", {
      page: this.pageLabel ||  this.id // ??
    }, "Thumbnail of Page {{page}}");
  }

  setPageLabel(label) {
    this.pageLabel = typeof label === "string" ? label : null;

    this._thumbPageTitle.then(msg => {
      this.anchor.title = msg;
    });

    if (this.renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
      return;
    }

    this._thumbPageCanvas.then(msg => {
      if (this.image) {
        this.image.setAttribute("aria-label", msg);
      } else if (this.disableCanvasToImageConversion && this.canvas) {
        this.canvas.setAttribute("aria-label", msg);
      }
    });
  }

}

exports.PDFThumbnailView = PDFThumbnailView;

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFViewer = void 0;

var _ui_utils = __webpack_require__(4);

var _base_viewer = __webpack_require__(27);

var _pdfjsLib = __webpack_require__(5);

class PDFViewer extends _base_viewer.BaseViewer {
  get _viewerElement() {
    return (0, _pdfjsLib.shadow)(this, "_viewerElement", this.viewer);
  }

  _scrollIntoView({
    pageDiv,
    pageSpot = null,
    pageNumber = null
  }) {
    if (!pageSpot && !this.isInPresentationMode) {
      const left = pageDiv.offsetLeft + pageDiv.clientLeft;
      const right = left + pageDiv.clientWidth;
      const {
        scrollLeft,
        clientWidth
      } = this.container;

      if (this._isScrollModeHorizontal || left < scrollLeft || right > scrollLeft + clientWidth) {
        pageSpot = {
          left: 0,
          top: 0
        };
      }
    }

    super._scrollIntoView({
      pageDiv,
      pageSpot,
      pageNumber
    });
  }

  _getVisiblePages() {
    if (this.isInPresentationMode) {
      return this._getCurrentVisiblePage();
    }

    return super._getVisiblePages();
  }

  _updateHelper(visiblePages) {
    if (this.isInPresentationMode) {
      return;
    }

    let currentId = this._currentPageNumber;
    let stillFullyVisible = false;

    for (const page of visiblePages) {
      if (page.percent < 100) {
        break;
      }

      if (page.id === currentId && this._scrollMode === _ui_utils.ScrollMode.VERTICAL && this._spreadMode === _ui_utils.SpreadMode.NONE) {
        stillFullyVisible = true;
        break;
      }
    }

    if (!stillFullyVisible) {
      currentId = visiblePages[0].id;
    }

    this._setCurrentPageNumber(currentId);
  }

}

exports.PDFViewer = PDFViewer;

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseViewer = void 0;

var _pdfjsLib = __webpack_require__(5);

var _ui_utils = __webpack_require__(4);

var _pdf_rendering_queue = __webpack_require__(8);

var _annotation_layer_builder = __webpack_require__(28);

var _pdf_page_view = __webpack_require__(29);

var _pdf_link_service = __webpack_require__(19);

var _text_layer_builder = __webpack_require__(30);

const DEFAULT_CACHE_SIZE = 10;

function PDFPageViewBuffer(size) {
  const data = [];

  this.push = function (view) {
    const i = data.indexOf(view);

    if (i >= 0) {
      data.splice(i, 1);
    }

    data.push(view);

    if (data.length > size) {
      data.shift().destroy();
    }
  };

  this.resize = function (newSize, pagesToKeep) {
    size = newSize;

    if (pagesToKeep) {
      const pageIdsToKeep = new Set();

      for (let i = 0, iMax = pagesToKeep.length; i < iMax; ++i) {
        pageIdsToKeep.add(pagesToKeep[i].id);
      }

      (0, _ui_utils.moveToEndOfArray)(data, function (page) {
        return pageIdsToKeep.has(page.id);
      });
    }

    while (data.length > size) {
      data.shift().destroy();
    }
  };

  this.has = function (view) {
    return data.includes(view);
  };
}

function isSameScale(oldScale, newScale) {
  if (newScale === oldScale) {
    return true;
  }

  if (Math.abs(newScale - oldScale) < 1e-15) {
    return true;
  }

  return false;
}

class BaseViewer {
  constructor(options) {
    if (this.constructor === BaseViewer) {
      throw new Error("Cannot initialize BaseViewer.");
    }

    const viewerVersion = '2.7.570';

    if (_pdfjsLib.version !== viewerVersion) {
      throw new Error(`The API version "${_pdfjsLib.version}" does not match the Viewer version "${viewerVersion}".`);
    }

    this._name = this.constructor.name;
    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;

    if (!(this.container && this.container.tagName.toUpperCase() === "DIV" && (this.viewer && this.viewer.tagName.toUpperCase() === "DIV"))) { //?.
      throw new Error("Invalid `container` and/or `viewer` option.");
    }

    if (getComputedStyle(this.container).position !== "absolute") {
      throw new Error("The `container` must be absolutely positioned.");
    }

    this.eventBus = options.eventBus;
    this.linkService = options.linkService || new _pdf_link_service.SimpleLinkService();
    this.downloadManager = options.downloadManager || null;
    this.findController = options.findController || null;
    this.removePageBorders = options.removePageBorders || false;
    this.textLayerMode = Number.isInteger(options.textLayerMode) ? options.textLayerMode : _ui_utils.TextLayerMode.ENABLE;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.renderInteractiveForms = typeof options.renderInteractiveForms === "boolean" ? options.renderInteractiveForms : true;
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.enableWebGL = options.enableWebGL || false;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels;
    this.l10n = options.l10n || _ui_utils.NullL10n;
    this.enableScripting = options.enableScripting || false;
    this._mouseState = options.mouseState || null;
    this.defaultRenderingQueue = !options.renderingQueue;

    if (this.defaultRenderingQueue) {
      this.renderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
    } else {
      this.renderingQueue = options.renderingQueue;
    }

    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdate.bind(this));
    this.presentationModeState = _ui_utils.PresentationModeState.UNKNOWN;
    this._onBeforeDraw = this._onAfterDraw = null;

    this._resetView();

    if (this.removePageBorders) {
      this.viewer.classList.add("removePageBorders");
    }

    Promise.resolve().then(() => {
      this.eventBus.dispatch("baseviewerinit", {
        source: this
      });
    });
  }

  get pagesCount() {
    return this._pages.length;
  }

  getPageView(index) {
    return this._pages[index];
  }

  get pageViewsReady() {
    if (!this._pagesCapability.settled) {
      return false;
    }

    return this._pages.every(function (pageView) {
      return pageView && pageView.pdfPage;
    });
  }

  get currentPageNumber() {
    return this._currentPageNumber;
  }

  set currentPageNumber(val) {
    if (!Number.isInteger(val)) {
      throw new Error("Invalid page number.");
    }

    if (!this.pdfDocument) {
      return;
    }

    if (!this._setCurrentPageNumber(val, true)) {
      console.error(`${this._name}.currentPageNumber: "${val}" is not a valid page.`);
    }
  }

  _setCurrentPageNumber(val, resetCurrentPageView = false) {
    if (this._currentPageNumber === val) {
      if (resetCurrentPageView) {
        this._resetCurrentPageView();
      }

      return true;
    }

    if (!(0 < val && val <= this.pagesCount)) {
      return false;
    }

    const previous = this._currentPageNumber;
    this._currentPageNumber = val;
    this.eventBus.dispatch("pagechanging", {
      source: this,
      pageNumber: val,
      pageLabel: this._pageLabels && this._pageLabels[val - 1],
      previous
    });

    if (resetCurrentPageView) {
      this._resetCurrentPageView();
    }

    return true;
  }

  get currentPageLabel() {
    return this._pageLabels && this._pageLabels[this._currentPageNumber - 1];
  }

  set currentPageLabel(val) {
    if (!this.pdfDocument) {
      return;
    }

    let page = val | 0;

    if (this._pageLabels) {
      const i = this._pageLabels.indexOf(val);

      if (i >= 0) {
        page = i + 1;
      }
    }

    if (!this._setCurrentPageNumber(page, true)) {
      console.error(`${this._name}.currentPageLabel: "${val}" is not a valid page.`);
    }
  }

  get currentScale() {
    return this._currentScale !== _ui_utils.UNKNOWN_SCALE ? this._currentScale : _ui_utils.DEFAULT_SCALE;
  }

  set currentScale(val) {
    if (isNaN(val)) {
      throw new Error("Invalid numeric scale.");
    }

    if (!this.pdfDocument) {
      return;
    }

    this._setScale(val, false);
  }

  get currentScaleValue() {
    return this._currentScaleValue;
  }

  set currentScaleValue(val) {
    if (!this.pdfDocument) {
      return;
    }

    this._setScale(val, false);
  }

  get pagesRotation() {
    return this._pagesRotation;
  }

  set pagesRotation(rotation) {
    if (!(0, _ui_utils.isValidRotation)(rotation)) {
      throw new Error("Invalid pages rotation angle.");
    }

    if (!this.pdfDocument) {
      return;
    }

    if (this._pagesRotation === rotation) {
      return;
    }

    this._pagesRotation = rotation;
    const pageNumber = this._currentPageNumber;

    for (let i = 0, ii = this._pages.length; i < ii; i++) {
      const pageView = this._pages[i];
      pageView.update(pageView.scale, rotation);
    }

    if (this._currentScaleValue) {
      this._setScale(this._currentScaleValue, true);
    }

    this.eventBus.dispatch("rotationchanging", {
      source: this,
      pagesRotation: rotation,
      pageNumber
    });

    if (this.defaultRenderingQueue) {
      this.update();
    }
  }

  get firstPagePromise() {
    return this.pdfDocument ? this._firstPageCapability.promise : null;
  }

  get onePageRendered() {
    return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
  }

  get pagesPromise() {
    return this.pdfDocument ? this._pagesCapability.promise : null;
  }

  get _viewerElement() {
    throw new Error("Not implemented: _viewerElement");
  }

  _onePageRenderedOrForceFetch() {
    if (!this.container.offsetParent || this._getVisiblePages().views.length === 0) {
      return Promise.resolve();
    }

    return this._onePageRenderedCapability.promise;
  }

  setDocument(pdfDocument) {
    if (this.pdfDocument) {
      this.eventBus.dispatch("pagesdestroy", {
        source: this
      });

      this._cancelRendering();

      this._resetView();

      if (this.findController) {
        this.findController.setDocument(null);
      }
    }

    this.pdfDocument = pdfDocument;

    if (!pdfDocument) {
      return;
    }

    const pagesCount = pdfDocument.numPages;
    const firstPagePromise = pdfDocument.getPage(1);
    const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();

    this._pagesCapability.promise.then(() => {
      this.eventBus.dispatch("pagesloaded", {
        source: this,
        pagesCount
      });
    });

    this._onBeforeDraw = evt => {
      const pageView = this._pages[evt.pageNumber - 1];

      if (!pageView) {
        return;
      }

      this._buffer.push(pageView);
    };

    this.eventBus._on("pagerender", this._onBeforeDraw);

    this._onAfterDraw = evt => {
      if (evt.cssTransform || this._onePageRenderedCapability.settled) {
        return;
      }

      this._onePageRenderedCapability.resolve();

      this.eventBus._off("pagerendered", this._onAfterDraw);

      this._onAfterDraw = null;
    };

    this.eventBus._on("pagerendered", this._onAfterDraw);

    firstPagePromise.then(firstPdfPage => {
      this._firstPageCapability.resolve(firstPdfPage);

      this._optionalContentConfigPromise = optionalContentConfigPromise;
      const scale = this.currentScale;
      const viewport = firstPdfPage.getViewport({
        scale: scale * _ui_utils.CSS_UNITS
      });
      const textLayerFactory = this.textLayerMode !== _ui_utils.TextLayerMode.DISABLE ? this : null;

      for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
        const pageView = new _pdf_page_view.PDFPageView({
          container: this._viewerElement,
          eventBus: this.eventBus,
          id: pageNum,
          scale,
          defaultViewport: viewport.clone(),
          optionalContentConfigPromise,
          renderingQueue: this.renderingQueue,
          textLayerFactory,
          textLayerMode: this.textLayerMode,
          annotationLayerFactory: this,
          imageResourcesPath: this.imageResourcesPath,
          renderInteractiveForms: this.renderInteractiveForms,
          renderer: this.renderer,
          enableWebGL: this.enableWebGL,
          useOnlyCssZoom: this.useOnlyCssZoom,
          maxCanvasPixels: this.maxCanvasPixels,
          l10n: this.l10n,
          enableScripting: this.enableScripting
        });

        this._pages.push(pageView);
      }

      const firstPageView = this._pages[0];

      if (firstPageView) {
        firstPageView.setPdfPage(firstPdfPage);
        this.linkService.cachePageRef(1, firstPdfPage.ref);
      }

      if (this._spreadMode !== _ui_utils.SpreadMode.NONE) {
        this._updateSpreadMode();
      }

      this._onePageRenderedOrForceFetch().then(() => {
        if (this.findController) {
          this.findController.setDocument(pdfDocument);
        }

        if (pdfDocument.loadingParams.disableAutoFetch || pagesCount > 7500) {
          this._pagesCapability.resolve();

          return;
        }

        let getPagesLeft = pagesCount - 1;

        if (getPagesLeft <= 0) {
          this._pagesCapability.resolve();

          return;
        }

        for (let pageNum = 2; pageNum <= pagesCount; ++pageNum) {
          pdfDocument.getPage(pageNum).then(pdfPage => {
            const pageView = this._pages[pageNum - 1];

            if (!pageView.pdfPage) {
              pageView.setPdfPage(pdfPage);
            }

            this.linkService.cachePageRef(pageNum, pdfPage.ref);

            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          }, reason => {
            console.error(`Unable to get page ${pageNum} to initialize viewer`, reason);

            if (--getPagesLeft === 0) {
              this._pagesCapability.resolve();
            }
          });
        }
      });

      this.eventBus.dispatch("pagesinit", {
        source: this
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }).catch(reason => {
      console.error("Unable to initialize viewer", reason);
    });
  }

  setPageLabels(labels) {
    if (!this.pdfDocument) {
      return;
    }

    if (!labels) {
      this._pageLabels = null;
    } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
      this._pageLabels = null;
      console.error(`${this._name}.setPageLabels: Invalid page labels.`);
    } else {
      this._pageLabels = labels;
    }

    for (let i = 0, ii = this._pages.length; i < ii; i++) {
      const pageView = this._pages[i];
      const label = this._pageLabels && this._pageLabels[i];
      pageView.setPageLabel(label);
    }
  }

  _resetView() {
    this._pages = [];
    this._currentPageNumber = 1;
    this._currentScale = _ui_utils.UNKNOWN_SCALE;
    this._currentScaleValue = null;
    this._pageLabels = null;
    this._buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
    this._location = null;
    this._pagesRotation = 0;
    this._optionalContentConfigPromise = null;
    this._pagesRequests = new WeakMap();
    this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
    this._onePageRenderedCapability = (0, _pdfjsLib.createPromiseCapability)();
    this._pagesCapability = (0, _pdfjsLib.createPromiseCapability)();
    this._scrollMode = _ui_utils.ScrollMode.VERTICAL;
    this._spreadMode = _ui_utils.SpreadMode.NONE;

    if (this._onBeforeDraw) {
      this.eventBus._off("pagerender", this._onBeforeDraw);

      this._onBeforeDraw = null;
    }

    if (this._onAfterDraw) {
      this.eventBus._off("pagerendered", this._onAfterDraw);

      this._onAfterDraw = null;
    }

    this._resetScriptingEvents();

    this.viewer.textContent = "";

    this._updateScrollMode();
  }

  _scrollUpdate() {
    if (this.pagesCount === 0) {
      return;
    }

    this.update();
  }

  _scrollIntoView({
    pageDiv,
    pageSpot = null,
    pageNumber = null
  }) {
    (0, _ui_utils.scrollIntoView)(pageDiv, pageSpot);
  }

  _setScaleUpdatePages(newScale, newValue, noScroll = false, preset = false) {
    this._currentScaleValue = newValue.toString();

    if (isSameScale(this._currentScale, newScale)) {
      if (preset) {
        this.eventBus.dispatch("scalechanging", {
          source: this,
          scale: newScale,
          presetValue: newValue
        });
      }

      return;
    }

    for (let i = 0, ii = this._pages.length; i < ii; i++) {
      this._pages[i].update(newScale);
    }

    this._currentScale = newScale;

    if (!noScroll) {
      let page = this._currentPageNumber,
          dest;

      if (this._location && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
        page = this._location.pageNumber;
        dest = [null, {
          name: "XYZ"
        }, this._location.left, this._location.top, null];
      }

      this.scrollPageIntoView({
        pageNumber: page,
        destArray: dest,
        allowNegativeOffset: true
      });
    }

    this.eventBus.dispatch("scalechanging", {
      source: this,
      scale: newScale,
      presetValue: preset ? newValue : undefined
    });

    if (this.defaultRenderingQueue) {
      this.update();
    }
  }

  get _pageWidthScaleFactor() {
    if (this.spreadMode !== _ui_utils.SpreadMode.NONE && this.scrollMode !== _ui_utils.ScrollMode.HORIZONTAL && !this.isInPresentationMode) {
      return 2;
    }

    return 1;
  }

  _setScale(value, noScroll = false) {
    let scale = parseFloat(value);

    if (scale > 0) {
      this._setScaleUpdatePages(scale, value, noScroll, false);
    } else {
      const currentPage = this._pages[this._currentPageNumber - 1];

      if (!currentPage) {
        return;
      }

      const noPadding = this.isInPresentationMode || this.removePageBorders;
      let hPadding = noPadding ? 0 : _ui_utils.SCROLLBAR_PADDING;
      let vPadding = noPadding ? 0 : _ui_utils.VERTICAL_PADDING;

      if (!noPadding && this._isScrollModeHorizontal) {
        [hPadding, vPadding] = [vPadding, hPadding];
      }

      const pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale / this._pageWidthScaleFactor;
      const pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;

      switch (value) {
        case "page-actual":
          scale = 1;
          break;

        case "page-width":
          scale = pageWidthScale;
          break;

        case "page-height":
          scale = pageHeightScale;
          break;

        case "page-fit":
          scale = Math.min(pageWidthScale, pageHeightScale);
          break;

        case "auto":
          const horizontalScale = (0, _ui_utils.isPortraitOrientation)(currentPage) ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale);
          scale = Math.min(_ui_utils.MAX_AUTO_SCALE, horizontalScale);
          break;

        default:
          console.error(`${this._name}._setScale: "${value}" is an unknown zoom value.`);
          return;
      }

      this._setScaleUpdatePages(scale, value, noScroll, true);
    }
  }

  _resetCurrentPageView() {
    if (this.isInPresentationMode) {
      this._setScale(this._currentScaleValue, true);
    }

    const pageView = this._pages[this._currentPageNumber - 1];

    this._scrollIntoView({
      pageDiv: pageView.div
    });
  }

  pageLabelToPageNumber(label) {
    if (!this._pageLabels) {
      return null;
    }

    const i = this._pageLabels.indexOf(label);

    if (i < 0) {
      return null;
    }

    return i + 1;
  }

  scrollPageIntoView({
    pageNumber,
    destArray = null,
    allowNegativeOffset = false,
    ignoreDestinationZoom = false
  }) {
    if (!this.pdfDocument) {
      return;
    }

    const pageView = Number.isInteger(pageNumber) && this._pages[pageNumber - 1];

    if (!pageView) {
      console.error(`${this._name}.scrollPageIntoView: ` + `"${pageNumber}" is not a valid pageNumber parameter.`);
      return;
    }

    if (this.isInPresentationMode || !destArray) {
      this._setCurrentPageNumber(pageNumber, true);

      return;
    }

    let x = 0,
        y = 0;
    let width = 0,
        height = 0,
        widthScale,
        heightScale;
    const changeOrientation = pageView.rotation % 180 !== 0;
    const pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / _ui_utils.CSS_UNITS;
    const pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / _ui_utils.CSS_UNITS;
    let scale = 0;

    switch (destArray[1].name) {
      case "XYZ":
        x = destArray[2];
        y = destArray[3];
        scale = destArray[4];
        x = x !== null ? x : 0;
        y = y !== null ? y : pageHeight;
        break;

      case "Fit":
      case "FitB":
        scale = "page-fit";
        break;

      case "FitH":
      case "FitBH":
        y = destArray[2];
        scale = "page-width";

        if (y === null && this._location) {
          x = this._location.left;
          y = this._location.top;
        } else if (typeof y !== "number") {
          y = pageHeight;
        }

        break;

      case "FitV":
      case "FitBV":
        x = destArray[2];
        width = pageWidth;
        height = pageHeight;
        scale = "page-height";
        break;

      case "FitR":
        x = destArray[2];
        y = destArray[3];
        width = destArray[4] - x;
        height = destArray[5] - y;
        const hPadding = this.removePageBorders ? 0 : _ui_utils.SCROLLBAR_PADDING;
        const vPadding = this.removePageBorders ? 0 : _ui_utils.VERTICAL_PADDING;
        widthScale = (this.container.clientWidth - hPadding) / width / _ui_utils.CSS_UNITS;
        heightScale = (this.container.clientHeight - vPadding) / height / _ui_utils.CSS_UNITS;
        scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
        break;

      default:
        console.error(`${this._name}.scrollPageIntoView: ` + `"${destArray[1].name}" is not a valid destination type.`);
        return;
    }

    if (!ignoreDestinationZoom) {
      if (scale && scale !== this._currentScale) {
        this.currentScaleValue = scale;
      } else if (this._currentScale === _ui_utils.UNKNOWN_SCALE) {
        this.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
      }
    }

    if (scale === "page-fit" && !destArray[4]) {
      this._scrollIntoView({
        pageDiv: pageView.div,
        pageNumber
      });

      return;
    }

    const boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
    let left = Math.min(boundingRect[0][0], boundingRect[1][0]);
    let top = Math.min(boundingRect[0][1], boundingRect[1][1]);

    if (!allowNegativeOffset) {
      left = Math.max(left, 0);
      top = Math.max(top, 0);
    }

    this._scrollIntoView({
      pageDiv: pageView.div,
      pageSpot: {
        left,
        top
      },
      pageNumber
    });
  }

  _updateLocation(firstPage) {
    const currentScale = this._currentScale;
    const currentScaleValue = this._currentScaleValue;
    const normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
    const pageNumber = firstPage.id;
    let pdfOpenParams = "#page=" + pageNumber;
    pdfOpenParams += "&zoom=" + normalizedScaleValue;
    const currentPageView = this._pages[pageNumber - 1];
    const container = this.container;
    const topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
    const intLeft = Math.round(topLeft[0]);
    const intTop = Math.round(topLeft[1]);
    pdfOpenParams += "," + intLeft + "," + intTop;
    this._location = {
      pageNumber,
      scale: normalizedScaleValue,
      top: intTop,
      left: intLeft,
      rotation: this._pagesRotation,
      pdfOpenParams
    };
  }

  _updateHelper(visiblePages) {
    throw new Error("Not implemented: _updateHelper");
  }

  update() {
    const visible = this._getVisiblePages();

    const visiblePages = visible.views,
          numVisiblePages = visiblePages.length;

    if (numVisiblePages === 0) {
      return;
    }

    const newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1);

    this._buffer.resize(newCacheSize, visiblePages);

    this.renderingQueue.renderHighestPriority(visible);

    this._updateHelper(visiblePages);

    this._updateLocation(visible.first);

    this.eventBus.dispatch("updateviewarea", {
      source: this,
      location: this._location
    });
  }

  containsElement(element) {
    return this.container.contains(element);
  }

  focus() {
    this.container.focus();
  }

  get _isScrollModeHorizontal() {
    return this.isInPresentationMode ? false : this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL;
  }

  get _isContainerRtl() {
    return getComputedStyle(this.container).direction === "rtl";
  }

  get isInPresentationMode() {
    return this.presentationModeState === _ui_utils.PresentationModeState.FULLSCREEN;
  }

  get isChangingPresentationMode() {
    return this.presentationModeState === _ui_utils.PresentationModeState.CHANGING;
  }

  get isHorizontalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
  }

  get isVerticalScrollbarEnabled() {
    return this.isInPresentationMode ? false : this.container.scrollHeight > this.container.clientHeight;
  }

  _getCurrentVisiblePage() {
    if (!this.pagesCount) {
      return {
        views: []
      };
    }

    const pageView = this._pages[this._currentPageNumber - 1];
    const element = pageView.div;
    const view = {
      id: pageView.id,
      x: element.offsetLeft + element.clientLeft,
      y: element.offsetTop + element.clientTop,
      view: pageView
    };
    return {
      first: view,
      last: view,
      views: [view]
    };
  }

  _getVisiblePages() {
    return (0, _ui_utils.getVisibleElements)({
      scrollEl: this.container,
      views: this._pages,
      sortByVisibility: true,
      horizontal: this._isScrollModeHorizontal,
      rtl: this._isScrollModeHorizontal && this._isContainerRtl
    });
  }

  isPageVisible(pageNumber) {
    if (!this.pdfDocument) {
      return false;
    }

    if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
      console.error(`${this._name}.isPageVisible: "${pageNumber}" is not a valid page.`);
      return false;
    }

    return this._getVisiblePages().views.some(function (view) {
      return view.id === pageNumber;
    });
  }

  isPageCached(pageNumber) {
    if (!this.pdfDocument || !this._buffer) {
      return false;
    }

    if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
      console.error(`${this._name}.isPageCached: "${pageNumber}" is not a valid page.`);
      return false;
    }

    const pageView = this._pages[pageNumber - 1];

    if (!pageView) {
      return false;
    }

    return this._buffer.has(pageView);
  }

  cleanup() {
    for (let i = 0, ii = this._pages.length; i < ii; i++) {
      if (this._pages[i] && this._pages[i].renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
        this._pages[i].reset();
      }
    }
  }

  _cancelRendering() {
    for (let i = 0, ii = this._pages.length; i < ii; i++) {
      if (this._pages[i]) {
        this._pages[i].cancelRendering();
      }
    }
  }

  _ensurePdfPageLoaded(pageView) {
    if (pageView.pdfPage) {
      return Promise.resolve(pageView.pdfPage);
    }

    if (this._pagesRequests.has(pageView)) {
      return this._pagesRequests.get(pageView);
    }

    const promise = this.pdfDocument.getPage(pageView.id).then(pdfPage => {
      if (!pageView.pdfPage) {
        pageView.setPdfPage(pdfPage);
      }

      this._pagesRequests.delete(pageView);

      return pdfPage;
    }).catch(reason => {
      console.error("Unable to get page for page view", reason);

      this._pagesRequests.delete(pageView);
    });

    this._pagesRequests.set(pageView, promise);

    return promise;
  }

  forceRendering(currentlyVisiblePages) {
    const visiblePages = currentlyVisiblePages || this._getVisiblePages();

    const scrollAhead = this._isScrollModeHorizontal ? this.scroll.right : this.scroll.down;
    const pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead);

    if (pageView) {
      this._ensurePdfPageLoaded(pageView).then(() => {
        this.renderingQueue.renderView(pageView);
      });

      return true;
    }

    return false;
  }

  createTextLayerBuilder(textLayerDiv, pageIndex, viewport, enhanceTextSelection = false, eventBus) {
    return new _text_layer_builder.TextLayerBuilder({
      textLayerDiv,
      eventBus,
      pageIndex,
      viewport,
      findController: this.isInPresentationMode ? null : this.findController,
      enhanceTextSelection: this.isInPresentationMode ? false : enhanceTextSelection
    });
  }

  createAnnotationLayerBuilder(pageDiv, pdfPage, annotationStorage = null, imageResourcesPath = "", renderInteractiveForms = false, l10n = _ui_utils.NullL10n, enableScripting = false, hasJSActionsPromise = null, mouseState = null) {
    return new _annotation_layer_builder.AnnotationLayerBuilder({
      pageDiv,
      pdfPage,
      annotationStorage: annotationStorage || this.pdfDocument && this.pdfDocument.annotationStorage, // ?.
      imageResourcesPath,
      renderInteractiveForms,
      linkService: this.linkService,
      downloadManager: this.downloadManager,
      l10n,
      enableScripting,
      hasJSActionsPromise: hasJSActionsPromise || this.pdfDocument && this.pdfDocument.hasJSActions(), //?.
      mouseState: mouseState || this._mouseState
    });
  }

  get hasEqualPageSizes() {
    const firstPageView = this._pages[0];

    for (let i = 1, ii = this._pages.length; i < ii; ++i) {
      const pageView = this._pages[i];

      if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height) {
        return false;
      }
    }

    return true;
  }

  getPagesOverview() {
    const pagesOverview = this._pages.map(function (pageView) {
      const viewport = pageView.pdfPage.getViewport({
        scale: 1
      });
      return {
        width: viewport.width,
        height: viewport.height,
        rotation: viewport.rotation
      };
    });

    if (!this.enablePrintAutoRotate) {
      return pagesOverview;
    }

    return pagesOverview.map(function (size) {
      if ((0, _ui_utils.isPortraitOrientation)(size)) {
        return size;
      }

      return {
        width: size.height,
        height: size.width,
        rotation: (size.rotation + 90) % 360
      };
    });
  }

  get optionalContentConfigPromise() {
    if (!this.pdfDocument) {
      return Promise.resolve(null);
    }

    if (!this._optionalContentConfigPromise) {
      return this.pdfDocument.getOptionalContentConfig();
    }

    return this._optionalContentConfigPromise;
  }

  set optionalContentConfigPromise(promise) {
    if (!(promise instanceof Promise)) {
      throw new Error(`Invalid optionalContentConfigPromise: ${promise}`);
    }

    if (!this.pdfDocument) {
      return;
    }

    if (!this._optionalContentConfigPromise) {
      return;
    }

    this._optionalContentConfigPromise = promise;

    for (const pageView of this._pages) {
      pageView.update(pageView.scale, pageView.rotation, promise);
    }

    this.update();
    this.eventBus.dispatch("optionalcontentconfigchanged", {
      source: this,
      promise
    });
  }

  get scrollMode() {
    return this._scrollMode;
  }

  set scrollMode(mode) {
    if (this._scrollMode === mode) {
      return;
    }

    if (!(0, _ui_utils.isValidScrollMode)(mode)) {
      throw new Error(`Invalid scroll mode: ${mode}`);
    }

    this._scrollMode = mode;
    this.eventBus.dispatch("scrollmodechanged", {
      source: this,
      mode
    });

    this._updateScrollMode(this._currentPageNumber);
  }

  _updateScrollMode(pageNumber = null) {
    const scrollMode = this._scrollMode,
          viewer = this.viewer;
    viewer.classList.toggle("scrollHorizontal", scrollMode === _ui_utils.ScrollMode.HORIZONTAL);
    viewer.classList.toggle("scrollWrapped", scrollMode === _ui_utils.ScrollMode.WRAPPED);

    if (!this.pdfDocument || !pageNumber) {
      return;
    }

    if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
      this._setScale(this._currentScaleValue, true);
    }

    this._setCurrentPageNumber(pageNumber, true);

    this.update();
  }

  get spreadMode() {
    return this._spreadMode;
  }

  set spreadMode(mode) {
    if (this._spreadMode === mode) {
      return;
    }

    if (!(0, _ui_utils.isValidSpreadMode)(mode)) {
      throw new Error(`Invalid spread mode: ${mode}`);
    }

    this._spreadMode = mode;
    this.eventBus.dispatch("spreadmodechanged", {
      source: this,
      mode
    });

    this._updateSpreadMode(this._currentPageNumber);
  }

  _updateSpreadMode(pageNumber = null) {
    if (!this.pdfDocument) {
      return;
    }

    const viewer = this.viewer,
          pages = this._pages;
    viewer.textContent = "";

    if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
      for (let i = 0, iMax = pages.length; i < iMax; ++i) {
        viewer.appendChild(pages[i].div);
      }
    } else {
      const parity = this._spreadMode - 1;
      let spread = null;

      for (let i = 0, iMax = pages.length; i < iMax; ++i) {
        if (spread === null) {
          spread = document.createElement("div");
          spread.className = "spread";
          viewer.appendChild(spread);
        } else if (i % 2 === parity) {
          spread = spread.cloneNode(false);
          viewer.appendChild(spread);
        }

        spread.appendChild(pages[i].div);
      }
    }

    if (!pageNumber) {
      return;
    }

    if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
      this._setScale(this._currentScaleValue, true);
    }

    this._setCurrentPageNumber(pageNumber, true);

    this.update();
  }

  _getPageAdvance(currentPageNumber, previous = false) {
    if (this.isInPresentationMode) {
      return 1;
    }

    switch (this._scrollMode) {
      case _ui_utils.ScrollMode.WRAPPED:
        {
          const {
            views
          } = this._getVisiblePages(),
                pageLayout = new Map();

          for (const {
            id,
            y,
            percent,
            widthPercent
          } of views) {
            if (percent === 0 || widthPercent < 100) {
              continue;
            }

            let yArray = pageLayout.get(y);

            if (!yArray) {
              pageLayout.set(y, yArray || (yArray = []));
            }

            yArray.push(id);
          }

          for (const yArray of pageLayout.values()) {
            const currentIndex = yArray.indexOf(currentPageNumber);

            if (currentIndex === -1) {
              continue;
            }

            const numPages = yArray.length;

            if (numPages === 1) {
              break;
            }

            if (previous) {
              for (let i = currentIndex - 1, ii = 0; i >= ii; i--) {
                const currentId = yArray[i],
                      expectedId = yArray[i + 1] - 1;

                if (currentId < expectedId) {
                  return currentPageNumber - expectedId;
                }
              }
            } else {
              for (let i = currentIndex + 1, ii = numPages; i < ii; i++) {
                const currentId = yArray[i],
                      expectedId = yArray[i - 1] + 1;

                if (currentId > expectedId) {
                  return expectedId - currentPageNumber;
                }
              }
            }

            if (previous) {
              const firstId = yArray[0];

              if (firstId < currentPageNumber) {
                return currentPageNumber - firstId + 1;
              }
            } else {
              const lastId = yArray[numPages - 1];

              if (lastId > currentPageNumber) {
                return lastId - currentPageNumber + 1;
              }
            }

            break;
          }

          break;
        }

      case _ui_utils.ScrollMode.HORIZONTAL:
        {
          break;
        }

      case _ui_utils.ScrollMode.VERTICAL:
        {
          if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
            break;
          }

          const parity = this._spreadMode - 1;

          if (previous && currentPageNumber % 2 !== parity) {
            break;
          } else if (!previous && currentPageNumber % 2 === parity) {
            break;
          }

          const {
            views
          } = this._getVisiblePages(),
                expectedId = previous ? currentPageNumber - 1 : currentPageNumber + 1;

          for (const {
            id,
            percent,
            widthPercent
          } of views) {
            if (id !== expectedId) {
              continue;
            }

            if (percent > 0 && widthPercent === 100) {
              return 2;
            }

            break;
          }

          break;
        }
    }

    return 1;
  }

  nextPage() {
    const currentPageNumber = this._currentPageNumber,
          pagesCount = this.pagesCount;

    if (currentPageNumber >= pagesCount) {
      return false;
    }

    const advance = this._getPageAdvance(currentPageNumber, false) || 1;
    this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
    return true;
  }

  previousPage() {
    const currentPageNumber = this._currentPageNumber;

    if (currentPageNumber <= 1) {
      return false;
    }

    const advance = this._getPageAdvance(currentPageNumber, true) || 1;
    this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
    return true;
  }

  initializeScriptingEvents() {
    if (!this.enableScripting || this._pageOpenPendingSet) {
      return;
    }

    const eventBus = this.eventBus,
          pageOpenPendingSet = this._pageOpenPendingSet = new Set(),
          scriptingEvents = this._scriptingEvents || (this._scriptingEvents = Object.create(null));

    const dispatchPageClose = pageNumber => {
      if (pageOpenPendingSet.has(pageNumber)) {
        return;
      }

      eventBus.dispatch("pageclose", {
        source: this,
        pageNumber
      });
    };

    const dispatchPageOpen = pageNumber => {
      const pageView = this._pages[pageNumber - 1];

      if (pageView && pageView.renderingState === _pdf_rendering_queue.RenderingStates.FINISHED) { //?.
        pageOpenPendingSet.delete(pageNumber);
        eventBus.dispatch("pageopen", {
          source: this,
          pageNumber,
          actionsPromise: pageView.pdfPage && pageView.pdfPage.getJSActions() //?.
        });
      } else {
        pageOpenPendingSet.add(pageNumber);
      }
    };

    scriptingEvents.onPageChanging = ({
      pageNumber,
      previous
    }) => {
      if (pageNumber === previous) {
        return;
      }

      dispatchPageClose(previous);
      dispatchPageOpen(pageNumber);
    };

    eventBus._on("pagechanging", scriptingEvents.onPageChanging);

    scriptingEvents.onPageRendered = ({
      pageNumber
    }) => {
      if (!pageOpenPendingSet.has(pageNumber)) {
        return;
      }

      if (pageNumber !== this._currentPageNumber) {
        return;
      }

      dispatchPageOpen(pageNumber);
    };

    eventBus._on("pagerendered", scriptingEvents.onPageRendered);

    scriptingEvents.onPagesDestroy = () => {
      dispatchPageClose(this._currentPageNumber);
    };

    eventBus._on("pagesdestroy", scriptingEvents.onPagesDestroy);

    dispatchPageOpen(this._currentPageNumber);
  }

  _resetScriptingEvents() {
    if (!this.enableScripting || !this._pageOpenPendingSet) {
      return;
    }

    const eventBus = this.eventBus,
          scriptingEvents = this._scriptingEvents;

    eventBus._off("pagechanging", scriptingEvents.onPageChanging);

    scriptingEvents.onPageChanging = null;

    eventBus._off("pagerendered", scriptingEvents.onPageRendered);

    scriptingEvents.onPageRendered = null;

    eventBus._off("pagesdestroy", scriptingEvents.onPagesDestroy);

    scriptingEvents.onPagesDestroy = null;
    this._pageOpenPendingSet = null;
  }

}

exports.BaseViewer = BaseViewer;

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DefaultAnnotationLayerFactory = exports.AnnotationLayerBuilder = void 0;

var _pdfjsLib = __webpack_require__(5);

var _ui_utils = __webpack_require__(4);

var _pdf_link_service = __webpack_require__(19);

class AnnotationLayerBuilder {
  constructor({
    pageDiv,
    pdfPage,
    linkService,
    downloadManager,
    annotationStorage = null,
    imageResourcesPath = "",
    renderInteractiveForms = true,
    l10n = _ui_utils.NullL10n,
    enableScripting = false,
    hasJSActionsPromise = null,
    mouseState = null
  }) {
    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.linkService = linkService;
    this.downloadManager = downloadManager;
    this.imageResourcesPath = imageResourcesPath;
    this.renderInteractiveForms = renderInteractiveForms;
    this.l10n = l10n;
    this.annotationStorage = annotationStorage;
    this.enableScripting = enableScripting;
    this._hasJSActionsPromise = hasJSActionsPromise;
    this._mouseState = mouseState;
    this.div = null;
    this._cancelled = false;
  }

  render(viewport, intent = "display") {
    return Promise.all([this.pdfPage.getAnnotations({
      intent
    }), this._hasJSActionsPromise]).then(([annotations, hasJSActions = false]) => {
      if (this._cancelled) {
        return;
      }

      if (annotations.length === 0) {
        return;
      }

      const parameters = {
        viewport: viewport.clone({
          dontFlip: true
        }),
        div: this.div,
        annotations,
        page: this.pdfPage,
        imageResourcesPath: this.imageResourcesPath,
        renderInteractiveForms: this.renderInteractiveForms,
        linkService: this.linkService,
        downloadManager: this.downloadManager,
        annotationStorage: this.annotationStorage,
        enableScripting: this.enableScripting,
        hasJSActions,
        mouseState: this._mouseState
      };

      if (this.div) {
        _pdfjsLib.AnnotationLayer.update(parameters);
      } else {
        this.div = document.createElement("div");
        this.div.className = "annotationLayer";
        this.pageDiv.appendChild(this.div);
        parameters.div = this.div;

        _pdfjsLib.AnnotationLayer.render(parameters);

        this.l10n.translate(this.div);
      }
    });
  }

  cancel() {
    this._cancelled = true;
  }

  hide() {
    if (!this.div) {
      return;
    }

    this.div.setAttribute("hidden", "true");
  }

}

exports.AnnotationLayerBuilder = AnnotationLayerBuilder;

class DefaultAnnotationLayerFactory {
  createAnnotationLayerBuilder(pageDiv, pdfPage, annotationStorage = null, imageResourcesPath = "", renderInteractiveForms = true, l10n = _ui_utils.NullL10n, enableScripting = false, hasJSActionsPromise = null, mouseState = null) {
    return new AnnotationLayerBuilder({
      pageDiv,
      pdfPage,
      imageResourcesPath,
      renderInteractiveForms,
      linkService: new _pdf_link_service.SimpleLinkService(),
      l10n,
      annotationStorage,
      enableScripting,
      hasJSActionsPromise,
      mouseState
    });
  }

}

exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFPageView = void 0;

var _ui_utils = __webpack_require__(4);

var _pdfjsLib = __webpack_require__(5);

var _pdf_rendering_queue = __webpack_require__(8);

var _viewer_compatibility = __webpack_require__(2);

const MAX_CANVAS_PIXELS = _viewer_compatibility.viewerCompatibilityParams.maxCanvasPixels || 16777216;

class PDFPageView {
  constructor(options) {
    const container = options.container;
    const defaultViewport = options.defaultViewport;
    this.id = options.id;
    this.renderingId = "page" + this.id;
    this.pdfPage = null;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = options.scale || _ui_utils.DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = options.optionalContentConfigPromise || null;
    this.hasRestrictedScaling = false;
    this.textLayerMode = Number.isInteger(options.textLayerMode) ? options.textLayerMode : _ui_utils.TextLayerMode.ENABLE;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.renderInteractiveForms = typeof options.renderInteractiveForms === "boolean" ? options.renderInteractiveForms : true;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels || MAX_CANVAS_PIXELS;
    this.eventBus = options.eventBus;
    this.renderingQueue = options.renderingQueue;
    this.textLayerFactory = options.textLayerFactory;
    this.annotationLayerFactory = options.annotationLayerFactory;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.enableWebGL = options.enableWebGL || false;
    this.l10n = options.l10n || _ui_utils.NullL10n;
    this.enableScripting = options.enableScripting || false;
    this.paintTask = null;
    this.paintedViewportMap = new WeakMap();
    this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
    this.resume = null;
    this._renderError = null;
    this.annotationLayer = null;
    this.textLayer = null;
    this.zoomLayer = null;
    const div = document.createElement("div");
    div.className = "page";
    div.style.width = Math.floor(this.viewport.width) + "px";
    div.style.height = Math.floor(this.viewport.height) + "px";
    div.setAttribute("data-page-number", this.id);
    this.div = div;
    container.appendChild(div);
  }

  setPdfPage(pdfPage) {
    this.pdfPage = pdfPage;
    this.pdfPageRotate = pdfPage.rotate;
    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = pdfPage.getViewport({
      scale: this.scale * _ui_utils.CSS_UNITS,
      rotation: totalRotation
    });
    this.reset();
  }

  destroy() {
    this.reset();

    if (this.pdfPage) {
      this.pdfPage.cleanup();
    }
  }

  async _renderAnnotationLayer() {
    let error = null;

    try {
      await this.annotationLayer.render(this.viewport, "display");
    } catch (ex) {
      error = ex;
    } finally {
      this.eventBus.dispatch("annotationlayerrendered", {
        source: this,
        pageNumber: this.id,
        error
      });
    }
  }

  _resetZoomLayer(removeFromDOM = false) {
    if (!this.zoomLayer) {
      return;
    }

    const zoomLayerCanvas = this.zoomLayer.firstChild;
    this.paintedViewportMap.delete(zoomLayerCanvas);
    zoomLayerCanvas.width = 0;
    zoomLayerCanvas.height = 0;

    if (removeFromDOM) {
      this.zoomLayer.remove();
    }

    this.zoomLayer = null;
  }

  reset(keepZoomLayer = false, keepAnnotations = false) {
    this.cancelRendering(keepAnnotations);
    this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
    const div = this.div;
    div.style.width = Math.floor(this.viewport.width) + "px";
    div.style.height = Math.floor(this.viewport.height) + "px";
    const childNodes = div.childNodes;
    const currentZoomLayerNode = keepZoomLayer && this.zoomLayer || null;
    const currentAnnotationNode = keepAnnotations && this.annotationLayer && this.annotationLayer.div || null;

    for (let i = childNodes.length - 1; i >= 0; i--) {
      const node = childNodes[i];

      if (currentZoomLayerNode === node || currentAnnotationNode === node) {
        continue;
      }

      div.removeChild(node);
    }

    div.removeAttribute("data-loaded");

    if (currentAnnotationNode) {
      this.annotationLayer.hide();
    } else if (this.annotationLayer) {
      this.annotationLayer.cancel();
      this.annotationLayer = null;
    }

    if (!currentZoomLayerNode) {
      if (this.canvas) {
        this.paintedViewportMap.delete(this.canvas);
        this.canvas.width = 0;
        this.canvas.height = 0;
        delete this.canvas;
      }

      this._resetZoomLayer();
    }

    if (this.svg) {
      this.paintedViewportMap.delete(this.svg);
      delete this.svg;
    }

    this.loadingIconDiv = document.createElement("div");
    this.loadingIconDiv.className = "loadingIcon";
    div.appendChild(this.loadingIconDiv);
  }

  update(scale, rotation, optionalContentConfigPromise = null) {
    this.scale = scale || this.scale;

    if (typeof rotation !== "undefined") {
      this.rotation = rotation;
    }

    if (optionalContentConfigPromise instanceof Promise) {
      this._optionalContentConfigPromise = optionalContentConfigPromise;
    }

    const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
    this.viewport = this.viewport.clone({
      scale: this.scale * _ui_utils.CSS_UNITS,
      rotation: totalRotation
    });

    if (this.svg) {
      this.cssTransform(this.svg, true);
      this.eventBus.dispatch("pagerendered", {
        source: this,
        pageNumber: this.id,
        cssTransform: true,
        timestamp: performance.now(),
        error: this._renderError
      });
      return;
    }

    let isScalingRestricted = false;

    if (this.canvas && this.maxCanvasPixels > 0) {
      const outputScale = this.outputScale;

      if ((Math.floor(this.viewport.width) * outputScale.sx | 0) * (Math.floor(this.viewport.height) * outputScale.sy | 0) > this.maxCanvasPixels) {
        isScalingRestricted = true;
      }
    }

    if (this.canvas) {
      if (this.useOnlyCssZoom || this.hasRestrictedScaling && isScalingRestricted) {
        this.cssTransform(this.canvas, true);
        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(),
          error: this._renderError
        });
        return;
      }

      if (!this.zoomLayer && !this.canvas.hasAttribute("hidden")) {
        this.zoomLayer = this.canvas.parentNode;
        this.zoomLayer.style.position = "absolute";
      }
    }

    if (this.zoomLayer) {
      this.cssTransform(this.zoomLayer.firstChild);
    }

    this.reset(true, true);
  }

  cancelRendering(keepAnnotations = false) {
    if (this.paintTask) {
      this.paintTask.cancel();
      this.paintTask = null;
    }

    this.resume = null;

    if (this.textLayer) {
      this.textLayer.cancel();
      this.textLayer = null;
    }

    if (!keepAnnotations && this.annotationLayer) {
      this.annotationLayer.cancel();
      this.annotationLayer = null;
    }
  }

  cssTransform(target, redrawAnnotations = false) {
    const width = this.viewport.width;
    const height = this.viewport.height;
    const div = this.div;
    target.style.width = target.parentNode.style.width = div.style.width = Math.floor(width) + "px";
    target.style.height = target.parentNode.style.height = div.style.height = Math.floor(height) + "px";
    const relativeRotation = this.viewport.rotation - this.paintedViewportMap.get(target).rotation;
    const absRotation = Math.abs(relativeRotation);
    let scaleX = 1,
        scaleY = 1;

    if (absRotation === 90 || absRotation === 270) {
      scaleX = height / width;
      scaleY = width / height;
    }

    target.style.transform = `rotate(${relativeRotation}deg) scale(${scaleX}, ${scaleY})`;

    if (this.textLayer) {
      const textLayerViewport = this.textLayer.viewport;
      const textRelativeRotation = this.viewport.rotation - textLayerViewport.rotation;
      const textAbsRotation = Math.abs(textRelativeRotation);
      let scale = width / textLayerViewport.width;

      if (textAbsRotation === 90 || textAbsRotation === 270) {
        scale = width / textLayerViewport.height;
      }

      const textLayerDiv = this.textLayer.textLayerDiv;
      let transX, transY;

      switch (textAbsRotation) {
        case 0:
          transX = transY = 0;
          break;

        case 90:
          transX = 0;
          transY = "-" + textLayerDiv.style.height;
          break;

        case 180:
          transX = "-" + textLayerDiv.style.width;
          transY = "-" + textLayerDiv.style.height;
          break;

        case 270:
          transX = "-" + textLayerDiv.style.width;
          transY = 0;
          break;

        default:
          console.error("Bad rotation value.");
          break;
      }

      textLayerDiv.style.transform = `rotate(${textAbsRotation}deg) ` + `scale(${scale}) ` + `translate(${transX}, ${transY})`;
      textLayerDiv.style.transformOrigin = "0% 0%";
    }

    if (redrawAnnotations && this.annotationLayer) {
      this._renderAnnotationLayer();
    }
  }

  get width() {
    return this.viewport.width;
  }

  get height() {
    return this.viewport.height;
  }

  getPagePoint(x, y) {
    return this.viewport.convertToPdfPoint(x, y);
  }

  draw() {
    if (this.renderingState !== _pdf_rendering_queue.RenderingStates.INITIAL) {
      console.error("Must be in new state before drawing");
      this.reset();
    }

    const {
      div,
      pdfPage
    } = this;

    if (!pdfPage) {
      this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

      if (this.loadingIconDiv) {
        div.removeChild(this.loadingIconDiv);
        delete this.loadingIconDiv;
      }

      return Promise.reject(new Error("pdfPage is not loaded"));
    }

    this.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;
    const canvasWrapper = document.createElement("div");
    canvasWrapper.style.width = div.style.width;
    canvasWrapper.style.height = div.style.height;
    canvasWrapper.classList.add("canvasWrapper");

    if (this.annotationLayer && this.annotationLayer.div) {
      div.insertBefore(canvasWrapper, this.annotationLayer.div);
    } else {
      div.appendChild(canvasWrapper);
    }

    let textLayer = null;

    if (this.textLayerMode !== _ui_utils.TextLayerMode.DISABLE && this.textLayerFactory) {
      const textLayerDiv = document.createElement("div");
      textLayerDiv.className = "textLayer";
      textLayerDiv.style.width = canvasWrapper.style.width;
      textLayerDiv.style.height = canvasWrapper.style.height;

      if (this.annotationLayer && this.annotationLayer.div) {
        div.insertBefore(textLayerDiv, this.annotationLayer.div);
      } else {
        div.appendChild(textLayerDiv);
      }

      textLayer = this.textLayerFactory.createTextLayerBuilder(textLayerDiv, this.id - 1, this.viewport, this.textLayerMode === _ui_utils.TextLayerMode.ENABLE_ENHANCE, this.eventBus);
    }

    this.textLayer = textLayer;
    let renderContinueCallback = null;

    if (this.renderingQueue) {
      renderContinueCallback = cont => {
        if (!this.renderingQueue.isHighestPriority(this)) {
          this.renderingState = _pdf_rendering_queue.RenderingStates.PAUSED;

          this.resume = () => {
            this.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;
            cont();
          };

          return;
        }

        cont();
      };
    }

    const finishPaintTask = async (error = null) => {
      if (paintTask === this.paintTask) {
        this.paintTask = null;
      }

      if (error instanceof _pdfjsLib.RenderingCancelledException) {
        this._renderError = null;
        return;
      }

      this._renderError = error;
      this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

      if (this.loadingIconDiv) {
        div.removeChild(this.loadingIconDiv);
        delete this.loadingIconDiv;
      }

      this._resetZoomLayer(true);

      this.eventBus.dispatch("pagerendered", {
        source: this,
        pageNumber: this.id,
        cssTransform: false,
        timestamp: performance.now(),
        error: this._renderError
      });

      if (error) {
        throw error;
      }
    };

    const paintTask = this.renderer === _ui_utils.RendererType.SVG ? this.paintOnSvg(canvasWrapper) : this.paintOnCanvas(canvasWrapper);
    paintTask.onRenderContinue = renderContinueCallback;
    this.paintTask = paintTask;
    const resultPromise = paintTask.promise.then(function () {
      return finishPaintTask(null).then(function () {
        if (textLayer) {
          const readableStream = pdfPage.streamTextContent({
            normalizeWhitespace: true
          });
          textLayer.setTextContentStream(readableStream);
          textLayer.render();
        }
      });
    }, function (reason) {
      return finishPaintTask(reason);
    });

    if (this.annotationLayerFactory) {
      if (!this.annotationLayer) {
        this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(div, pdfPage, null, this.imageResourcesPath, this.renderInteractiveForms, this.l10n, this.enableScripting, null, null);
      }

      this._renderAnnotationLayer();
    }

    div.setAttribute("data-loaded", true);
    this.eventBus.dispatch("pagerender", {
      source: this,
      pageNumber: this.id
    });
    return resultPromise;
  }

  paintOnCanvas(canvasWrapper) {
    const renderCapability = (0, _pdfjsLib.createPromiseCapability)();
    const result = {
      promise: renderCapability.promise,

      onRenderContinue(cont) {
        cont();
      },

      cancel() {
        renderTask.cancel();
      }

    };
    const viewport = this.viewport;
    const canvas = document.createElement("canvas");
    this.l10n.get("page_canvas", {
      page: this.id
    }, "Page {{page}}").then(msg => {
      canvas.setAttribute("aria-label", msg);
    });
    canvas.setAttribute("hidden", "hidden");
    let isCanvasHidden = true;

    const showCanvas = function () {
      if (isCanvasHidden) {
        canvas.removeAttribute("hidden");
        isCanvasHidden = false;
      }
    };

    canvasWrapper.appendChild(canvas);
    this.canvas = canvas;
    canvas.mozOpaque = true;
    const ctx = canvas.getContext("2d", {
      alpha: false
    });
    const outputScale = (0, _ui_utils.getOutputScale)(ctx);
    this.outputScale = outputScale;

    if (this.useOnlyCssZoom) {
      const actualSizeViewport = viewport.clone({
        scale: _ui_utils.CSS_UNITS
      });
      outputScale.sx *= actualSizeViewport.width / viewport.width;
      outputScale.sy *= actualSizeViewport.height / viewport.height;
      outputScale.scaled = true;
    }

    if (this.maxCanvasPixels > 0) {
      const pixelsInViewport = viewport.width * viewport.height;
      const maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport);

      if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
        outputScale.sx = maxScale;
        outputScale.sy = maxScale;
        outputScale.scaled = true;
        this.hasRestrictedScaling = true;
      } else {
        this.hasRestrictedScaling = false;
      }
    }

    const sfx = (0, _ui_utils.approximateFraction)(outputScale.sx);
    const sfy = (0, _ui_utils.approximateFraction)(outputScale.sy);
    canvas.width = (0, _ui_utils.roundToDivide)(viewport.width * outputScale.sx, sfx[0]);
    canvas.height = (0, _ui_utils.roundToDivide)(viewport.height * outputScale.sy, sfy[0]);
    canvas.style.width = (0, _ui_utils.roundToDivide)(viewport.width, sfx[1]) + "px";
    canvas.style.height = (0, _ui_utils.roundToDivide)(viewport.height, sfy[1]) + "px";
    this.paintedViewportMap.set(canvas, viewport);
    const transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
    const renderContext = {
      canvasContext: ctx,
      transform,
      viewport: this.viewport,
      enableWebGL: this.enableWebGL,
      renderInteractiveForms: this.renderInteractiveForms,
      optionalContentConfigPromise: this._optionalContentConfigPromise
    };
    const renderTask = this.pdfPage.render(renderContext);

    renderTask.onContinue = function (cont) {
      showCanvas();

      if (result.onRenderContinue) {
        result.onRenderContinue(cont);
      } else {
        cont();
      }
    };

    renderTask.promise.then(function () {
      showCanvas();
      renderCapability.resolve(undefined);
    }, function (error) {
      showCanvas();
      renderCapability.reject(error);
    });
    return result;
  }

  paintOnSvg(wrapper) {
    let cancelled = false;

    const ensureNotCancelled = () => {
      if (cancelled) {
        throw new _pdfjsLib.RenderingCancelledException(`Rendering cancelled, page ${this.id}`, "svg");
      }
    };

    const pdfPage = this.pdfPage;
    const actualSizeViewport = this.viewport.clone({
      scale: _ui_utils.CSS_UNITS
    });
    const promise = pdfPage.getOperatorList().then(opList => {
      ensureNotCancelled();
      const svgGfx = new _pdfjsLib.SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
      return svgGfx.getSVG(opList, actualSizeViewport).then(svg => {
        ensureNotCancelled();
        this.svg = svg;
        this.paintedViewportMap.set(svg, actualSizeViewport);
        svg.style.width = wrapper.style.width;
        svg.style.height = wrapper.style.height;
        this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;
        wrapper.appendChild(svg);
      });
    });
    return {
      promise,

      onRenderContinue(cont) {
        cont();
      },

      cancel() {
        cancelled = true;
      }

    };
  }

  setPageLabel(label) {
    this.pageLabel = typeof label === "string" ? label : null;

    if (this.pageLabel !== null) {
      this.div.setAttribute("data-page-label", this.pageLabel);
    } else {
      this.div.removeAttribute("data-page-label");
    }
  }

}

exports.PDFPageView = PDFPageView;

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TextLayerBuilder = exports.DefaultTextLayerFactory = void 0;

var _pdfjsLib = __webpack_require__(5);

const EXPAND_DIVS_TIMEOUT = 300;

class TextLayerBuilder {
  constructor({
    textLayerDiv,
    eventBus,
    pageIndex,
    viewport,
    findController = null,
    enhanceTextSelection = false
  }) {
    this.textLayerDiv = textLayerDiv;
    this.eventBus = eventBus;
    this.textContent = null;
    this.textContentItemsStr = [];
    this.textContentStream = null;
    this.renderingDone = false;
    this.pageIdx = pageIndex;
    this.pageNumber = this.pageIdx + 1;
    this.matches = [];
    this.viewport = viewport;
    this.textDivs = [];
    this.findController = findController;
    this.textLayerRenderTask = null;
    this.enhanceTextSelection = enhanceTextSelection;
    this._onUpdateTextLayerMatches = null;

    this._bindMouse();
  }

  _finishRendering() {
    this.renderingDone = true;

    if (!this.enhanceTextSelection) {
      const endOfContent = document.createElement("div");
      endOfContent.className = "endOfContent";
      this.textLayerDiv.appendChild(endOfContent);
    }

    this.eventBus.dispatch("textlayerrendered", {
      source: this,
      pageNumber: this.pageNumber,
      numTextDivs: this.textDivs.length
    });
  }

  render(timeout = 0) {
    if (!(this.textContent || this.textContentStream) || this.renderingDone) {
      return;
    }

    this.cancel();
    this.textDivs = [];
    const textLayerFrag = document.createDocumentFragment();
    this.textLayerRenderTask = (0, _pdfjsLib.renderTextLayer)({
      textContent: this.textContent,
      textContentStream: this.textContentStream,
      container: textLayerFrag,
      viewport: this.viewport,
      textDivs: this.textDivs,
      textContentItemsStr: this.textContentItemsStr,
      timeout,
      enhanceTextSelection: this.enhanceTextSelection
    });
    this.textLayerRenderTask.promise.then(() => {
      this.textLayerDiv.appendChild(textLayerFrag);

      this._finishRendering();

      this._updateMatches();
    }, function (reason) {});

    if (!this._onUpdateTextLayerMatches) {
      this._onUpdateTextLayerMatches = evt => {
        if (evt.pageIndex === this.pageIdx || evt.pageIndex === -1) {
          this._updateMatches();
        }
      };

      this.eventBus._on("updatetextlayermatches", this._onUpdateTextLayerMatches);
    }
  }

  cancel() {
    if (this.textLayerRenderTask) {
      this.textLayerRenderTask.cancel();
      this.textLayerRenderTask = null;
    }

    if (this._onUpdateTextLayerMatches) {
      this.eventBus._off("updatetextlayermatches", this._onUpdateTextLayerMatches);

      this._onUpdateTextLayerMatches = null;
    }
  }

  setTextContentStream(readableStream) {
    this.cancel();
    this.textContentStream = readableStream;
  }

  setTextContent(textContent) {
    this.cancel();
    this.textContent = textContent;
  }

  _convertMatches(matches, matchesLength) {
    if (!matches) {
      return [];
    }

    const {
      textContentItemsStr
    } = this;
    let i = 0,
        iIndex = 0;
    const end = textContentItemsStr.length - 1;
    const result = [];

    for (let m = 0, mm = matches.length; m < mm; m++) {
      let matchIdx = matches[m];

      while (i !== end && matchIdx >= iIndex + textContentItemsStr[i].length) {
        iIndex += textContentItemsStr[i].length;
        i++;
      }

      if (i === textContentItemsStr.length) {
        console.error("Could not find a matching mapping");
      }

      const match = {
        begin: {
          divIdx: i,
          offset: matchIdx - iIndex
        }
      };
      matchIdx += matchesLength[m];

      while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
        iIndex += textContentItemsStr[i].length;
        i++;
      }

      match.end = {
        divIdx: i,
        offset: matchIdx - iIndex
      };
      result.push(match);
    }

    return result;
  }

  _renderMatches(matches) {
    if (matches.length === 0) {
      return;
    }

    const {
      findController,
      pageIdx,
      textContentItemsStr,
      textDivs
    } = this;
    const isSelectedPage = pageIdx === findController.selected.pageIdx;
    const selectedMatchIdx = findController.selected.matchIdx;
    const highlightAll = findController.state.highlightAll;
    let prevEnd = null;
    const infinity = {
      divIdx: -1,
      offset: undefined
    };

    function beginText(begin, className) {
      const divIdx = begin.divIdx;
      textDivs[divIdx].textContent = "";
      appendTextToDiv(divIdx, 0, begin.offset, className);
    }

    function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
      const div = textDivs[divIdx];
      const content = textContentItemsStr[divIdx].substring(fromOffset, toOffset);
      const node = document.createTextNode(content);

      if (className) {
        const span = document.createElement("span");
        span.className = className;
        span.appendChild(node);
        div.appendChild(span);
        return;
      }

      div.appendChild(node);
    }

    let i0 = selectedMatchIdx,
        i1 = i0 + 1;

    if (highlightAll) {
      i0 = 0;
      i1 = matches.length;
    } else if (!isSelectedPage) {
      return;
    }

    for (let i = i0; i < i1; i++) {
      const match = matches[i];
      const begin = match.begin;
      const end = match.end;
      const isSelected = isSelectedPage && i === selectedMatchIdx;
      const highlightSuffix = isSelected ? " selected" : "";

      if (isSelected) {
        findController.scrollMatchIntoView({
          element: textDivs[begin.divIdx],
          pageIndex: pageIdx,
          matchIndex: selectedMatchIdx
        });
      }

      if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
        if (prevEnd !== null) {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
        }

        beginText(begin);
      } else {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
      }

      if (begin.divIdx === end.divIdx) {
        appendTextToDiv(begin.divIdx, begin.offset, end.offset, "highlight" + highlightSuffix);
      } else {
        appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, "highlight begin" + highlightSuffix);

        for (let n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
          textDivs[n0].className = "highlight middle" + highlightSuffix;
        }

        beginText(end, "highlight end" + highlightSuffix);
      }

      prevEnd = end;
    }

    if (prevEnd) {
      appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
    }
  }

  _updateMatches() {
    if (!this.renderingDone) {
      return;
    }

    const {
      findController,
      matches,
      pageIdx,
      textContentItemsStr,
      textDivs
    } = this;
    let clearedUntilDivIdx = -1;

    for (let i = 0, ii = matches.length; i < ii; i++) {
      const match = matches[i];
      const begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);

      for (let n = begin, end = match.end.divIdx; n <= end; n++) {
        const div = textDivs[n];
        div.textContent = textContentItemsStr[n];
        div.className = "";
      }

      clearedUntilDivIdx = match.end.divIdx + 1;
    }

    if (!findController || !findController.highlightMatches) {
      return;
    }

    const pageMatches = findController.pageMatches[pageIdx] || null;
    const pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;
    this.matches = this._convertMatches(pageMatches, pageMatchesLength);

    this._renderMatches(this.matches);
  }

  _bindMouse() {
    const div = this.textLayerDiv;
    let expandDivsTimer = null;
    div.addEventListener("mousedown", evt => {
      if (this.enhanceTextSelection && this.textLayerRenderTask) {
        this.textLayerRenderTask.expandTextDivs(true);

        if (expandDivsTimer) {
          clearTimeout(expandDivsTimer);
          expandDivsTimer = null;
        }

        return;
      }

      const end = div.querySelector(".endOfContent");

      if (!end) {
        return;
      }

      let adjustTop = evt.target !== div;
      adjustTop = adjustTop && window.getComputedStyle(end).getPropertyValue("-moz-user-select") !== "none";

      if (adjustTop) {
        const divBounds = div.getBoundingClientRect();
        const r = Math.max(0, (evt.pageY - divBounds.top) / divBounds.height);
        end.style.top = (r * 100).toFixed(2) + "%";
      }

      end.classList.add("active");
    });
    div.addEventListener("mouseup", () => {
      if (this.enhanceTextSelection && this.textLayerRenderTask) {
        expandDivsTimer = setTimeout(() => {
          if (this.textLayerRenderTask) {
            this.textLayerRenderTask.expandTextDivs(false);
          }

          expandDivsTimer = null;
        }, EXPAND_DIVS_TIMEOUT);
        return;
      }

      const end = div.querySelector(".endOfContent");

      if (!end) {
        return;
      }

      end.style.top = "";
      end.classList.remove("active");
    });
  }

}

exports.TextLayerBuilder = TextLayerBuilder;

class DefaultTextLayerFactory {
  createTextLayerBuilder(textLayerDiv, pageIndex, viewport, enhanceTextSelection = false, eventBus) {
    return new TextLayerBuilder({
      textLayerDiv,
      pageIndex,
      viewport,
      enhanceTextSelection,
      eventBus
    });
  }

}

exports.DefaultTextLayerFactory = DefaultTextLayerFactory;

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SecondaryToolbar = void 0;

var _ui_utils = __webpack_require__(4);

var _pdf_cursor_tools = __webpack_require__(6);

var _pdf_single_page_viewer = __webpack_require__(32);

class SecondaryToolbar {
  constructor(options, mainContainer, eventBus) {
    this.toolbar = options.toolbar;
    this.toggleButton = options.toggleButton;
    this.toolbarButtonContainer = options.toolbarButtonContainer;
    this.buttons = [{
      element: options.presentationModeButton,
      eventName: "presentationmode",
      close: true
    }, {
      element: options.openFileButton,
      eventName: "openfile",
      close: true
    }, {
      element: options.printButton,
      eventName: "print",
      close: true
    }, {
      element: options.downloadButton,
      eventName: "download",
      close: true
    }, {
      element: options.viewBookmarkButton,
      eventName: null,
      close: true
    }, {
      element: options.firstPageButton,
      eventName: "firstpage",
      close: true
    }, {
      element: options.lastPageButton,
      eventName: "lastpage",
      close: true
    }, {
      element: options.pageRotateCwButton,
      eventName: "rotatecw",
      close: false
    }, {
      element: options.pageRotateCcwButton,
      eventName: "rotateccw",
      close: false
    }, {
      element: options.cursorSelectToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: _pdf_cursor_tools.CursorTool.SELECT
      },
      close: true
    }, {
      element: options.cursorHandToolButton,
      eventName: "switchcursortool",
      eventDetails: {
        tool: _pdf_cursor_tools.CursorTool.HAND
      },
      close: true
    }, {
      element: options.scrollVerticalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.VERTICAL
      },
      close: true
    }, {
      element: options.scrollHorizontalButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.HORIZONTAL
      },
      close: true
    }, {
      element: options.scrollWrappedButton,
      eventName: "switchscrollmode",
      eventDetails: {
        mode: _ui_utils.ScrollMode.WRAPPED
      },
      close: true
    }, {
      element: options.spreadNoneButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.NONE
      },
      close: true
    }, {
      element: options.spreadOddButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.ODD
      },
      close: true
    }, {
      element: options.spreadEvenButton,
      eventName: "switchspreadmode",
      eventDetails: {
        mode: _ui_utils.SpreadMode.EVEN
      },
      close: true
    }, {
      element: options.documentPropertiesButton,
      eventName: "documentproperties",
      close: true
    }];
    this.items = {
      firstPage: options.firstPageButton,
      lastPage: options.lastPageButton,
      pageRotateCw: options.pageRotateCwButton,
      pageRotateCcw: options.pageRotateCcwButton
    };
    this.mainContainer = mainContainer;
    this.eventBus = eventBus;
    this.opened = false;
    this.containerHeight = null;
    this.previousContainerHeight = null;
    this.reset();

    this._bindClickListeners();

    this._bindCursorToolsListener(options);

    this._bindScrollModeListener(options);

    this._bindSpreadModeListener(options);

    this.eventBus._on("resize", this._setMaxHeight.bind(this));

    this.eventBus._on("baseviewerinit", evt => {
      if (evt.source instanceof _pdf_single_page_viewer.PDFSinglePageViewer) {
        this.toolbarButtonContainer.classList.add("hiddenScrollModeButtons", "hiddenSpreadModeButtons");
      } else {
        this.toolbarButtonContainer.classList.remove("hiddenScrollModeButtons", "hiddenSpreadModeButtons");
      }
    });
  }

  get isOpen() {
    return this.opened;
  }

  setPageNumber(pageNumber) {
    this.pageNumber = pageNumber;

    this._updateUIState();
  }

  setPagesCount(pagesCount) {
    this.pagesCount = pagesCount;

    this._updateUIState();
  }

  reset() {
    this.pageNumber = 0;
    this.pagesCount = 0;

    this._updateUIState();

    this.eventBus.dispatch("secondarytoolbarreset", {
      source: this
    });
  }

  _updateUIState() {
    this.items.firstPage.disabled = this.pageNumber <= 1;
    this.items.lastPage.disabled = this.pageNumber >= this.pagesCount;
    this.items.pageRotateCw.disabled = this.pagesCount === 0;
    this.items.pageRotateCcw.disabled = this.pagesCount === 0;
  }

  _bindClickListeners() {
    this.toggleButton.addEventListener("click", this.toggle.bind(this));

    for (const {
      element,
      eventName,
      close,
      eventDetails
    } of this.buttons) {
      element.addEventListener("click", evt => {
        if (eventName !== null) {
          const details = {
            source: this
          };

          for (const property in eventDetails) {
            details[property] = eventDetails[property];
          }

          this.eventBus.dispatch(eventName, details);
        }

        if (close) {
          this.close();
        }
      });
    }
  }

  _bindCursorToolsListener(buttons) {
    this.eventBus._on("cursortoolchanged", function ({
      tool
    }) {
      buttons.cursorSelectToolButton.classList.toggle("toggled", tool === _pdf_cursor_tools.CursorTool.SELECT);
      buttons.cursorHandToolButton.classList.toggle("toggled", tool === _pdf_cursor_tools.CursorTool.HAND);
    });
  }

  _bindScrollModeListener(buttons) {
    function scrollModeChanged({
      mode
    }) {
      buttons.scrollVerticalButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.VERTICAL);
      buttons.scrollHorizontalButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.HORIZONTAL);
      buttons.scrollWrappedButton.classList.toggle("toggled", mode === _ui_utils.ScrollMode.WRAPPED);
      const isScrollModeHorizontal = mode === _ui_utils.ScrollMode.HORIZONTAL;
      buttons.spreadNoneButton.disabled = isScrollModeHorizontal;
      buttons.spreadOddButton.disabled = isScrollModeHorizontal;
      buttons.spreadEvenButton.disabled = isScrollModeHorizontal;
    }

    this.eventBus._on("scrollmodechanged", scrollModeChanged);

    this.eventBus._on("secondarytoolbarreset", evt => {
      if (evt.source === this) {
        scrollModeChanged({
          mode: _ui_utils.ScrollMode.VERTICAL
        });
      }
    });
  }

  _bindSpreadModeListener(buttons) {
    function spreadModeChanged({
      mode
    }) {
      buttons.spreadNoneButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.NONE);
      buttons.spreadOddButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.ODD);
      buttons.spreadEvenButton.classList.toggle("toggled", mode === _ui_utils.SpreadMode.EVEN);
    }

    this.eventBus._on("spreadmodechanged", spreadModeChanged);

    this.eventBus._on("secondarytoolbarreset", evt => {
      if (evt.source === this) {
        spreadModeChanged({
          mode: _ui_utils.SpreadMode.NONE
        });
      }
    });
  }

  open() {
    if (this.opened) {
      return;
    }

    this.opened = true;

    this._setMaxHeight();

    this.toggleButton.classList.add("toggled");
    this.toolbar.classList.remove("hidden");
  }

  close() {
    if (!this.opened) {
      return;
    }

    this.opened = false;
    this.toolbar.classList.add("hidden");
    this.toggleButton.classList.remove("toggled");
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  _setMaxHeight() {
    if (!this.opened) {
      return;
    }

    this.containerHeight = this.mainContainer.clientHeight;

    if (this.containerHeight === this.previousContainerHeight) {
      return;
    }

    this.toolbarButtonContainer.style.maxHeight = `${this.containerHeight - _ui_utils.SCROLLBAR_PADDING}px`;
    this.previousContainerHeight = this.containerHeight;
  }

}

exports.SecondaryToolbar = SecondaryToolbar;

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFSinglePageViewer = void 0;

var _base_viewer = __webpack_require__(27);

var _pdfjsLib = __webpack_require__(5);

class PDFSinglePageViewer extends _base_viewer.BaseViewer {
  constructor(options) {
    super(options);

    this.eventBus._on("pagesinit", evt => {
      this._ensurePageViewVisible();
    });
  }

  get _viewerElement() {
    return (0, _pdfjsLib.shadow)(this, "_viewerElement", this._shadowViewer);
  }

  get _pageWidthScaleFactor() {
    return 1;
  }

  _resetView() {
    super._resetView();

    this._previousPageNumber = 1;
    this._shadowViewer = document.createDocumentFragment();
    this._updateScrollDown = null;
  }

  _ensurePageViewVisible() {
    const pageView = this._pages[this._currentPageNumber - 1];
    const previousPageView = this._pages[this._previousPageNumber - 1];
    const viewerNodes = this.viewer.childNodes;

    switch (viewerNodes.length) {
      case 0:
        this.viewer.appendChild(pageView.div);
        break;

      case 1:
        if (viewerNodes[0] !== previousPageView.div) {
          throw new Error("_ensurePageViewVisible: Unexpected previously visible page.");
        }

        if (pageView === previousPageView) {
          break;
        }

        this._shadowViewer.appendChild(previousPageView.div);

        this.viewer.appendChild(pageView.div);
        this.container.scrollTop = 0;
        break;

      default:
        throw new Error("_ensurePageViewVisible: Only one page should be visible at a time.");
    }

    this._previousPageNumber = this._currentPageNumber;
  }

  _scrollUpdate() {
    if (this._updateScrollDown) {
      this._updateScrollDown();
    }

    super._scrollUpdate();
  }

  _scrollIntoView({
    pageDiv,
    pageSpot = null,
    pageNumber = null
  }) {
    if (pageNumber) {
      this._setCurrentPageNumber(pageNumber);
    }

    const scrolledDown = this._currentPageNumber >= this._previousPageNumber;

    this._ensurePageViewVisible();

    this.update();

    super._scrollIntoView({
      pageDiv,
      pageSpot,
      pageNumber
    });

    this._updateScrollDown = () => {
      this.scroll.down = scrolledDown;
      this._updateScrollDown = null;
    };
  }

  _getVisiblePages() {
    return this._getCurrentVisiblePage();
  }

  _updateHelper(visiblePages) {}

  get _isScrollModeHorizontal() {
    return (0, _pdfjsLib.shadow)(this, "_isScrollModeHorizontal", false);
  }

  _updateScrollMode() {}

  _updateSpreadMode() {}

  _getPageAdvance() {
    return 1;
  }

}

exports.PDFSinglePageViewer = PDFSinglePageViewer;

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Toolbar = void 0;

var _ui_utils = __webpack_require__(4);

const PAGE_NUMBER_LOADING_INDICATOR = "visiblePageIsLoading";
const SCALE_SELECT_CONTAINER_WIDTH = 140;
const SCALE_SELECT_WIDTH = 162;

class Toolbar {
  constructor(options, eventBus, l10n = _ui_utils.NullL10n) {
    this.toolbar = options.container;
    this.eventBus = eventBus;
    this.l10n = l10n;
    this.buttons = [{
      element: options.previous,
      eventName: "previouspage"
    }, {
      element: options.next,
      eventName: "nextpage"
    }, {
      element: options.zoomIn,
      eventName: "zoomin"
    }, {
      element: options.zoomOut,
      eventName: "zoomout"
    }, {
      element: options.openFile,
      eventName: "openfile"
    }, {
      element: options.print,
      eventName: "print"
    }, {
      element: options.presentationModeButton,
      eventName: "presentationmode"
    }, {
      element: options.download,
      eventName: "download"
    }, {
      element: options.viewBookmark,
      eventName: null
    }];
    this.items = {
      numPages: options.numPages,
      pageNumber: options.pageNumber,
      scaleSelectContainer: options.scaleSelectContainer,
      scaleSelect: options.scaleSelect,
      customScaleOption: options.customScaleOption,
      previous: options.previous,
      next: options.next,
      zoomIn: options.zoomIn,
      zoomOut: options.zoomOut
    };
    this._wasLocalized = false;
    this.reset();

    this._bindListeners();
  }

  setPageNumber(pageNumber, pageLabel) {
    this.pageNumber = pageNumber;
    this.pageLabel = pageLabel;

    this._updateUIState(false);
  }

  setPagesCount(pagesCount, hasPageLabels) {
    this.pagesCount = pagesCount;
    this.hasPageLabels = hasPageLabels;

    this._updateUIState(true);
  }

  setPageScale(pageScaleValue, pageScale) {
    this.pageScaleValue = (pageScaleValue || pageScale).toString();
    this.pageScale = pageScale;

    this._updateUIState(false);
  }

  reset() {
    this.pageNumber = 0;
    this.pageLabel = null;
    this.hasPageLabels = false;
    this.pagesCount = 0;
    this.pageScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
    this.pageScale = _ui_utils.DEFAULT_SCALE;

    this._updateUIState(true);

    this.updateLoadingIndicatorState();
  }

  _bindListeners() {
    const {
      pageNumber,
      scaleSelect
    } = this.items;
    const self = this;

    for (const {
      element,
      eventName
    } of this.buttons) {
      element.addEventListener("click", evt => {
        if (eventName !== null) {
          this.eventBus.dispatch(eventName, {
            source: this
          });
        }
      });
    }

    pageNumber.addEventListener("click", function () {
      this.select();
    });
    pageNumber.addEventListener("change", function () {
      self.eventBus.dispatch("pagenumberchanged", {
        source: self,
        value: this.value
      });
    });
    scaleSelect.addEventListener("change", function () {
      if (this.value === "custom") {
        return;
      }

      self.eventBus.dispatch("scalechanged", {
        source: self,
        value: this.value
      });
    });
    scaleSelect.oncontextmenu = _ui_utils.noContextMenuHandler;

    this.eventBus._on("localized", () => {
      this._wasLocalized = true;

      this._adjustScaleWidth();

      this._updateUIState(true);
    });
  }

  _updateUIState(resetNumPages = false) {
    if (!this._wasLocalized) {
      return;
    }

    const {
      pageNumber,
      pagesCount,
      pageScaleValue,
      pageScale,
      items
    } = this;

    if (resetNumPages) {
      if (this.hasPageLabels) {
        items.pageNumber.type = "text";
      } else {
        items.pageNumber.type = "number";
        this.l10n.get("of_pages", {
          pagesCount
        }, "of {{pagesCount}}").then(msg => {
          items.numPages.textContent = msg;
        });
      }

      items.pageNumber.max = pagesCount;
    }

    if (this.hasPageLabels) {
      items.pageNumber.value = this.pageLabel;
      this.l10n.get("page_of_pages", {
        pageNumber,
        pagesCount
      }, "({{pageNumber}} of {{pagesCount}})").then(msg => {
        items.numPages.textContent = msg;
      });
    } else {
      items.pageNumber.value = pageNumber;
    }

    items.previous.disabled = pageNumber <= 1;
    items.next.disabled = pageNumber >= pagesCount;
    items.zoomOut.disabled = pageScale <= _ui_utils.MIN_SCALE;
    items.zoomIn.disabled = pageScale >= _ui_utils.MAX_SCALE;
    const customScale = Math.round(pageScale * 10000) / 100;
    this.l10n.get("page_scale_percent", {
      scale: customScale
    }, "{{scale}}%").then(msg => {
      let predefinedValueFound = false;

      for (const option of items.scaleSelect.options) {
        if (option.value !== pageScaleValue) {
          option.selected = false;
          continue;
        }

        option.selected = true;
        predefinedValueFound = true;
      }

      if (!predefinedValueFound) {
        items.customScaleOption.textContent = msg;
        items.customScaleOption.selected = true;
      }
    });
  }

  updateLoadingIndicatorState(loading = false) {
    const pageNumberInput = this.items.pageNumber;
    pageNumberInput.classList.toggle(PAGE_NUMBER_LOADING_INDICATOR, loading);
  }

  async _adjustScaleWidth() {
    const {
      items,
      l10n
    } = this;
    const predefinedValuesPromise = Promise.all([l10n.get("page_scale_auto", null, "Automatic Zoom"), l10n.get("page_scale_actual", null, "Actual Size"), l10n.get("page_scale_fit", null, "Page Fit"), l10n.get("page_scale_width", null, "Page Width")]);
    let canvas = document.createElement("canvas");
    canvas.mozOpaque = true;
    let ctx = canvas.getContext("2d", {
      alpha: false
    });
    await _ui_utils.animationStarted;
    const {
      fontSize,
      fontFamily
    } = getComputedStyle(items.scaleSelect);
    ctx.font = `${fontSize} ${fontFamily}`;
    let maxWidth = 0;

    for (const predefinedValue of await predefinedValuesPromise) {
      const {
        width
      } = ctx.measureText(predefinedValue);

      if (width > maxWidth) {
        maxWidth = width;
      }
    }

    const overflow = SCALE_SELECT_WIDTH - SCALE_SELECT_CONTAINER_WIDTH;
    maxWidth += 2 * overflow;

    if (maxWidth > SCALE_SELECT_CONTAINER_WIDTH) {
      items.scaleSelect.style.width = `${maxWidth + overflow}px`;
      items.scaleSelectContainer.style.width = `${maxWidth}px`;
    }

    canvas.width = 0;
    canvas.height = 0;
    canvas = ctx = null;
  }

}

exports.Toolbar = Toolbar;

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ViewHistory = void 0;
const DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;

class ViewHistory {
  constructor(fingerprint, cacheSize = DEFAULT_VIEW_HISTORY_CACHE_SIZE) {
    this.fingerprint = fingerprint;
    this.cacheSize = cacheSize;
    this._initializedPromise = this._readFromStorage().then(databaseStr => {
      const database = JSON.parse(databaseStr || "{}");
      let index = -1;

      if (!Array.isArray(database.files)) {
        database.files = [];
      } else {
        while (database.files.length >= this.cacheSize) {
          database.files.shift();
        }

        for (let i = 0, ii = database.files.length; i < ii; i++) {
          const branch = database.files[i];

          if (branch.fingerprint === this.fingerprint) {
            index = i;
            break;
          }
        }
      }

      if (index === -1) {
        index = database.files.push({
          fingerprint: this.fingerprint
        }) - 1;
      }

      this.file = database.files[index];
      this.database = database;
    });
  }

  async _writeToStorage() {
    const databaseStr = JSON.stringify(this.database);
    localStorage.setItem("pdfjs.history", databaseStr);
  }

  async _readFromStorage() {
    return localStorage.getItem("pdfjs.history");
  }

  async set(name, val) {
    await this._initializedPromise;
    this.file[name] = val;
    return this._writeToStorage();
  }

  async setMultiple(properties) {
    await this._initializedPromise;

    for (const name in properties) {
      this.file[name] = properties[name];
    }

    return this._writeToStorage();
  }

  async get(name, defaultValue) {
    await this._initializedPromise;
    const val = this.file[name];
    return val !== undefined ? val : defaultValue;
  }

  async getMultiple(properties) {
    await this._initializedPromise;
    const values = Object.create(null);

    for (const name in properties) {
      const val = this.file[name];
      values[name] = val !== undefined ? val : properties[name];
    }

    return values;
  }

}

exports.ViewHistory = ViewHistory;

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GenericCom = void 0;

var _app = __webpack_require__(3);

var _preferences = __webpack_require__(36);

var _download_manager = __webpack_require__(37);

var _genericl10n = __webpack_require__(38);

var _generic_scripting = __webpack_require__(40);

;
const GenericCom = {};
exports.GenericCom = GenericCom;

class GenericPreferences extends _preferences.BasePreferences {
  async _writeToStorage(prefObj) {
    localStorage.setItem("pdfjs.preferences", JSON.stringify(prefObj));
  }

  async _readFromStorage(prefObj) {
    return JSON.parse(localStorage.getItem("pdfjs.preferences"));
  }

}

class GenericExternalServices extends _app.DefaultExternalServices {
  static createDownloadManager(options) {
    return new _download_manager.DownloadManager();
  }

  static createPreferences() {
    return new GenericPreferences();
  }

  static createL10n({
    locale = "en-US"
  }) {
    return new _genericl10n.GenericL10n(locale);
  }

  static createScripting({
    sandboxBundleSrc
  }) {
    return new _generic_scripting.GenericScripting(sandboxBundleSrc);
  }

}

_app.PDFViewerApplication.externalServices = GenericExternalServices;

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BasePreferences = void 0;

var _app_options = __webpack_require__(1);

class BasePreferences {
  constructor() {
    if (this.constructor === BasePreferences) {
      throw new Error("Cannot initialize BasePreferences.");
    }

    Object.defineProperty(this, "defaults", {
      value: Object.freeze({
        "cursorToolOnLoad": 0,
        "defaultZoomValue": "",
        "disablePageLabels": false,
        "enablePermissions": false,
        "enablePrintAutoRotate": false,
        "enableScripting": false,
        "enableWebGL": false,
        "externalLinkTarget": 0,
        "historyUpdateUrl": false,
        "ignoreDestinationZoom": false,
        "pdfBugEnabled": false,
        "renderer": "canvas",
        "renderInteractiveForms": true,
        "sidebarViewOnLoad": -1,
        "scrollModeOnLoad": -1,
        "spreadModeOnLoad": -1,
        "textLayerMode": 1,
        "useOnlyCssZoom": false,
        "viewerCssTheme": 0,
        "viewOnLoad": 0,
        "disableAutoFetch": false,
        "disableFontFace": false,
        "disableRange": false,
        "disableStream": false
      }),
      writable: false,
      enumerable: true,
      configurable: false
    });
    this.prefs = Object.assign(Object.create(null), this.defaults);
    this._initializedPromise = this._readFromStorage(this.defaults).then(prefs => {
      if (!prefs) {
        return;
      }

      for (const name in prefs) {
        const defaultValue = this.defaults[name],
              prefValue = prefs[name];

        if (defaultValue === undefined || typeof prefValue !== typeof defaultValue) {
          continue;
        }

        this.prefs[name] = prefValue;
      }
    });
  }

  async _writeToStorage(prefObj) {
    throw new Error("Not implemented: _writeToStorage");
  }

  async _readFromStorage(prefObj) {
    throw new Error("Not implemented: _readFromStorage");
  }

  async reset() {
    await this._initializedPromise;
    this.prefs = Object.assign(Object.create(null), this.defaults);
    return this._writeToStorage(this.defaults);
  }

  async set(name, value) {
    await this._initializedPromise;
    const defaultValue = this.defaults[name];

    if (defaultValue === undefined) {
      throw new Error(`Set preference: "${name}" is undefined.`);
    } else if (value === undefined) {
      throw new Error("Set preference: no value is specified.");
    }

    const valueType = typeof value;
    const defaultType = typeof defaultValue;

    if (valueType !== defaultType) {
      if (valueType === "number" && defaultType === "string") {
        value = value.toString();
      } else {
        throw new Error(`Set preference: "${value}" is a ${valueType}, ` + `expected a ${defaultType}.`);
      }
    } else {
      if (valueType === "number" && !Number.isInteger(value)) {
        throw new Error(`Set preference: "${value}" must be an integer.`);
      }
    }

    this.prefs[name] = value;
    return this._writeToStorage(this.prefs);
  }

  async get(name) {
    await this._initializedPromise;
    const defaultValue = this.defaults[name];

    if (defaultValue === undefined) {
      throw new Error(`Get preference: "${name}" is undefined.`);
    } else {
      const prefValue = this.prefs[name];

      if (prefValue !== undefined) {
        return prefValue;
      }
    }

    return defaultValue;
  }

  async getAll() {
    await this._initializedPromise;
    return Object.assign(Object.create(null), this.defaults, this.prefs);
  }

}

exports.BasePreferences = BasePreferences;

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DownloadManager = void 0;

var _pdfjsLib = __webpack_require__(5);

var _viewer_compatibility = __webpack_require__(2);

;

function download(blobUrl, filename) {
  const a = document.createElement("a");

  if (!a.click) {
    throw new Error('DownloadManager: "a.click()" is not supported.');
  }

  a.href = blobUrl;
  a.target = "_parent";

  if ("download" in a) {
    a.download = filename;
  }

  (document.body || document.documentElement).appendChild(a);
  a.click();
  a.remove();
}

class DownloadManager {
  downloadUrl(url, filename) {
    if (!(0, _pdfjsLib.createValidAbsoluteUrl)(url, "http://example.com")) {
      return;
    }

    download(url + "#pdfjs.action=download", filename);
  }

  downloadData(data, filename, contentType) {
    const blobUrl = (0, _pdfjsLib.createObjectURL)(data, contentType, _viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL);
    download(blobUrl, filename);
  }

  download(blob, url, filename, sourceEventType = "download") {
    if (_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
      this.downloadUrl(url, filename);
      return;
    }

    const blobUrl = URL.createObjectURL(blob);
    download(blobUrl, filename);
  }

}

exports.DownloadManager = DownloadManager;

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GenericL10n = void 0;

__webpack_require__(39);

const webL10n = document.webL10n;

class GenericL10n {
  constructor(lang) {
    this._lang = lang;
    this._ready = new Promise((resolve, reject) => {
      webL10n.setLanguage(lang, () => {
        resolve(webL10n);
      });
    });
  }

  async getLanguage() {
    const l10n = await this._ready;
    return l10n.getLanguage();
  }

  async getDirection() {
    const l10n = await this._ready;
    return l10n.getDirection();
  }

  async get(property, args, fallback) {
    const l10n = await this._ready;
    return l10n.get(property, args, fallback);
  }

  async translate(element) {
    const l10n = await this._ready;
    return l10n.translate(element);
  }

}

exports.GenericL10n = GenericL10n;

/***/ }),
/* 39 */
/***/ (() => {



document.webL10n = function (window, document, undefined) {
  var gL10nData = {};
  var gTextData = '';
  var gTextProp = 'textContent';
  var gLanguage = '';
  var gMacros = {};
  var gReadyState = 'loading';
  var gAsyncResourceLoading = true;

  function getL10nResourceLinks() {
    return document.querySelectorAll('link[type="application/l10n"]');
  }

  function getL10nDictionary() {
    var script = document.querySelector('script[type="application/l10n"]');
    return script ? JSON.parse(script.innerHTML) : null;
  }

  function getTranslatableChildren(element) {
    return element ? element.querySelectorAll('*[data-l10n-id]') : [];
  }

  function getL10nAttributes(element) {
    if (!element) return {};
    var l10nId = element.getAttribute('data-l10n-id');
    var l10nArgs = element.getAttribute('data-l10n-args');
    var args = {};

    if (l10nArgs) {
      try {
        args = JSON.parse(l10nArgs);
      } catch (e) {
        console.warn('could not parse arguments for #' + l10nId);
      }
    }

    return {
      id: l10nId,
      args: args
    };
  }

  function xhrLoadText(url, onSuccess, onFailure) {
    onSuccess = onSuccess || function _onSuccess(data) {};

    onFailure = onFailure || function _onFailure() {};

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, gAsyncResourceLoading);

    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/plain; charset=utf-8');
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status === 0) {
          onSuccess(xhr.responseText);
        } else {
          onFailure();
        }
      }
    };

    xhr.onerror = onFailure;
    xhr.ontimeout = onFailure;

    try {
      xhr.send(null);
    } catch (e) {
      onFailure();
    }
  }

  function parseResource(href, lang, successCallback, failureCallback) {
    var baseURL = href.replace(/[^\/]*$/, '') || './';

    function evalString(text) {
      if (text.lastIndexOf('\\') < 0) return text;
      return text.replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t').replace(/\\b/g, '\b').replace(/\\f/g, '\f').replace(/\\{/g, '{').replace(/\\}/g, '}').replace(/\\"/g, '"').replace(/\\'/g, "'");
    }

    function parseProperties(text, parsedPropertiesCallback) {
      var dictionary = {};
      var reBlank = /^\s*|\s*$/;
      var reComment = /^\s*#|^\s*$/;
      var reSection = /^\s*\[(.*)\]\s*$/;
      var reImport = /^\s*@import\s+url\((.*)\)\s*$/i;
      var reSplit = /^([^=\s]*)\s*=\s*(.+)$/;

      function parseRawLines(rawText, extendedSyntax, parsedRawLinesCallback) {
        var entries = rawText.replace(reBlank, '').split(/[\r\n]+/);
        var currentLang = '*';
        var genericLang = lang.split('-', 1)[0];
        var skipLang = false;
        var match = '';

        function nextEntry() {
          while (true) {
            if (!entries.length) {
              parsedRawLinesCallback();
              return;
            }

            var line = entries.shift();
            if (reComment.test(line)) continue;

            if (extendedSyntax) {
              match = reSection.exec(line);

              if (match) {
                currentLang = match[1].toLowerCase();
                skipLang = currentLang !== '*' && currentLang !== lang && currentLang !== genericLang;
                continue;
              } else if (skipLang) {
                continue;
              }

              match = reImport.exec(line);

              if (match) {
                loadImport(baseURL + match[1], nextEntry);
                return;
              }
            }

            var tmp = line.match(reSplit);

            if (tmp && tmp.length == 3) {
              dictionary[tmp[1]] = evalString(tmp[2]);
            }
          }
        }

        nextEntry();
      }

      function loadImport(url, callback) {
        xhrLoadText(url, function (content) {
          parseRawLines(content, false, callback);
        }, function () {
          console.warn(url + ' not found.');
          callback();
        });
      }

      parseRawLines(text, true, function () {
        parsedPropertiesCallback(dictionary);
      });
    }

    xhrLoadText(href, function (response) {
      gTextData += response;
      parseProperties(response, function (data) {
        for (var key in data) {
          var id,
              prop,
              index = key.lastIndexOf('.');

          if (index > 0) {
            id = key.substring(0, index);
            prop = key.substring(index + 1);
          } else {
            id = key;
            prop = gTextProp;
          }

          if (!gL10nData[id]) {
            gL10nData[id] = {};
          }

          gL10nData[id][prop] = data[key];
        }

        if (successCallback) {
          successCallback();
        }
      });
    }, failureCallback);
  }

  function loadLocale(lang, callback) {
    if (lang) {
      lang = lang.toLowerCase();
    }

    callback = callback || function _callback() {};

    clear();
    gLanguage = lang;
    var langLinks = getL10nResourceLinks();
    var langCount = langLinks.length;

    if (langCount === 0) {
      var dict = getL10nDictionary();

      if (dict && dict.locales && dict.default_locale) {
        console.log('using the embedded JSON directory, early way out');
        gL10nData = dict.locales[lang];

        if (!gL10nData) {
          var defaultLocale = dict.default_locale.toLowerCase();

          for (var anyCaseLang in dict.locales) {
            anyCaseLang = anyCaseLang.toLowerCase();

            if (anyCaseLang === lang) {
              gL10nData = dict.locales[lang];
              break;
            } else if (anyCaseLang === defaultLocale) {
              gL10nData = dict.locales[defaultLocale];
            }
          }
        }

        callback();
      } else {
        console.log('no resource to load, early way out');
      }

      gReadyState = 'complete';
      return;
    }

    var onResourceLoaded = null;
    var gResourceCount = 0;

    onResourceLoaded = function () {
      gResourceCount++;

      if (gResourceCount >= langCount) {
        callback();
        gReadyState = 'complete';
      }
    };

    function L10nResourceLink(link) {
      var href = link.href;

      this.load = function (lang, callback) {
        parseResource(href, lang, callback, function () {
          console.warn(href + ' not found.');
          console.warn('"' + lang + '" resource not found');
          gLanguage = '';
          callback();
        });
      };
    }

    for (var i = 0; i < langCount; i++) {
      var resource = new L10nResourceLink(langLinks[i]);
      resource.load(lang, onResourceLoaded);
    }
  }

  function clear() {
    gL10nData = {};
    gTextData = '';
    gLanguage = '';
  }

  function getPluralRules(lang) {
    var locales2rules = {
      'af': 3,
      'ak': 4,
      'am': 4,
      'ar': 1,
      'asa': 3,
      'az': 0,
      'be': 11,
      'bem': 3,
      'bez': 3,
      'bg': 3,
      'bh': 4,
      'bm': 0,
      'bn': 3,
      'bo': 0,
      'br': 20,
      'brx': 3,
      'bs': 11,
      'ca': 3,
      'cgg': 3,
      'chr': 3,
      'cs': 12,
      'cy': 17,
      'da': 3,
      'de': 3,
      'dv': 3,
      'dz': 0,
      'ee': 3,
      'el': 3,
      'en': 3,
      'eo': 3,
      'es': 3,
      'et': 3,
      'eu': 3,
      'fa': 0,
      'ff': 5,
      'fi': 3,
      'fil': 4,
      'fo': 3,
      'fr': 5,
      'fur': 3,
      'fy': 3,
      'ga': 8,
      'gd': 24,
      'gl': 3,
      'gsw': 3,
      'gu': 3,
      'guw': 4,
      'gv': 23,
      'ha': 3,
      'haw': 3,
      'he': 2,
      'hi': 4,
      'hr': 11,
      'hu': 0,
      'id': 0,
      'ig': 0,
      'ii': 0,
      'is': 3,
      'it': 3,
      'iu': 7,
      'ja': 0,
      'jmc': 3,
      'jv': 0,
      'ka': 0,
      'kab': 5,
      'kaj': 3,
      'kcg': 3,
      'kde': 0,
      'kea': 0,
      'kk': 3,
      'kl': 3,
      'km': 0,
      'kn': 0,
      'ko': 0,
      'ksb': 3,
      'ksh': 21,
      'ku': 3,
      'kw': 7,
      'lag': 18,
      'lb': 3,
      'lg': 3,
      'ln': 4,
      'lo': 0,
      'lt': 10,
      'lv': 6,
      'mas': 3,
      'mg': 4,
      'mk': 16,
      'ml': 3,
      'mn': 3,
      'mo': 9,
      'mr': 3,
      'ms': 0,
      'mt': 15,
      'my': 0,
      'nah': 3,
      'naq': 7,
      'nb': 3,
      'nd': 3,
      'ne': 3,
      'nl': 3,
      'nn': 3,
      'no': 3,
      'nr': 3,
      'nso': 4,
      'ny': 3,
      'nyn': 3,
      'om': 3,
      'or': 3,
      'pa': 3,
      'pap': 3,
      'pl': 13,
      'ps': 3,
      'pt': 3,
      'rm': 3,
      'ro': 9,
      'rof': 3,
      'ru': 11,
      'rwk': 3,
      'sah': 0,
      'saq': 3,
      'se': 7,
      'seh': 3,
      'ses': 0,
      'sg': 0,
      'sh': 11,
      'shi': 19,
      'sk': 12,
      'sl': 14,
      'sma': 7,
      'smi': 7,
      'smj': 7,
      'smn': 7,
      'sms': 7,
      'sn': 3,
      'so': 3,
      'sq': 3,
      'sr': 11,
      'ss': 3,
      'ssy': 3,
      'st': 3,
      'sv': 3,
      'sw': 3,
      'syr': 3,
      'ta': 3,
      'te': 3,
      'teo': 3,
      'th': 0,
      'ti': 4,
      'tig': 3,
      'tk': 3,
      'tl': 4,
      'tn': 3,
      'to': 0,
      'tr': 0,
      'ts': 3,
      'tzm': 22,
      'uk': 11,
      'ur': 3,
      've': 3,
      'vi': 0,
      'vun': 3,
      'wa': 4,
      'wae': 3,
      'wo': 0,
      'xh': 3,
      'xog': 3,
      'yo': 0,
      'zh': 0,
      'zu': 3
    };

    function isIn(n, list) {
      return list.indexOf(n) !== -1;
    }

    function isBetween(n, start, end) {
      return start <= n && n <= end;
    }

    var pluralRules = {
      '0': function (n) {
        return 'other';
      },
      '1': function (n) {
        if (isBetween(n % 100, 3, 10)) return 'few';
        if (n === 0) return 'zero';
        if (isBetween(n % 100, 11, 99)) return 'many';
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '2': function (n) {
        if (n !== 0 && n % 10 === 0) return 'many';
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '3': function (n) {
        if (n == 1) return 'one';
        return 'other';
      },
      '4': function (n) {
        if (isBetween(n, 0, 1)) return 'one';
        return 'other';
      },
      '5': function (n) {
        if (isBetween(n, 0, 2) && n != 2) return 'one';
        return 'other';
      },
      '6': function (n) {
        if (n === 0) return 'zero';
        if (n % 10 == 1 && n % 100 != 11) return 'one';
        return 'other';
      },
      '7': function (n) {
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '8': function (n) {
        if (isBetween(n, 3, 6)) return 'few';
        if (isBetween(n, 7, 10)) return 'many';
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '9': function (n) {
        if (n === 0 || n != 1 && isBetween(n % 100, 1, 19)) return 'few';
        if (n == 1) return 'one';
        return 'other';
      },
      '10': function (n) {
        if (isBetween(n % 10, 2, 9) && !isBetween(n % 100, 11, 19)) return 'few';
        if (n % 10 == 1 && !isBetween(n % 100, 11, 19)) return 'one';
        return 'other';
      },
      '11': function (n) {
        if (isBetween(n % 10, 2, 4) && !isBetween(n % 100, 12, 14)) return 'few';
        if (n % 10 === 0 || isBetween(n % 10, 5, 9) || isBetween(n % 100, 11, 14)) return 'many';
        if (n % 10 == 1 && n % 100 != 11) return 'one';
        return 'other';
      },
      '12': function (n) {
        if (isBetween(n, 2, 4)) return 'few';
        if (n == 1) return 'one';
        return 'other';
      },
      '13': function (n) {
        if (isBetween(n % 10, 2, 4) && !isBetween(n % 100, 12, 14)) return 'few';
        if (n != 1 && isBetween(n % 10, 0, 1) || isBetween(n % 10, 5, 9) || isBetween(n % 100, 12, 14)) return 'many';
        if (n == 1) return 'one';
        return 'other';
      },
      '14': function (n) {
        if (isBetween(n % 100, 3, 4)) return 'few';
        if (n % 100 == 2) return 'two';
        if (n % 100 == 1) return 'one';
        return 'other';
      },
      '15': function (n) {
        if (n === 0 || isBetween(n % 100, 2, 10)) return 'few';
        if (isBetween(n % 100, 11, 19)) return 'many';
        if (n == 1) return 'one';
        return 'other';
      },
      '16': function (n) {
        if (n % 10 == 1 && n != 11) return 'one';
        return 'other';
      },
      '17': function (n) {
        if (n == 3) return 'few';
        if (n === 0) return 'zero';
        if (n == 6) return 'many';
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '18': function (n) {
        if (n === 0) return 'zero';
        if (isBetween(n, 0, 2) && n !== 0 && n != 2) return 'one';
        return 'other';
      },
      '19': function (n) {
        if (isBetween(n, 2, 10)) return 'few';
        if (isBetween(n, 0, 1)) return 'one';
        return 'other';
      },
      '20': function (n) {
        if ((isBetween(n % 10, 3, 4) || n % 10 == 9) && !(isBetween(n % 100, 10, 19) || isBetween(n % 100, 70, 79) || isBetween(n % 100, 90, 99))) return 'few';
        if (n % 1000000 === 0 && n !== 0) return 'many';
        if (n % 10 == 2 && !isIn(n % 100, [12, 72, 92])) return 'two';
        if (n % 10 == 1 && !isIn(n % 100, [11, 71, 91])) return 'one';
        return 'other';
      },
      '21': function (n) {
        if (n === 0) return 'zero';
        if (n == 1) return 'one';
        return 'other';
      },
      '22': function (n) {
        if (isBetween(n, 0, 1) || isBetween(n, 11, 99)) return 'one';
        return 'other';
      },
      '23': function (n) {
        if (isBetween(n % 10, 1, 2) || n % 20 === 0) return 'one';
        return 'other';
      },
      '24': function (n) {
        if (isBetween(n, 3, 10) || isBetween(n, 13, 19)) return 'few';
        if (isIn(n, [2, 12])) return 'two';
        if (isIn(n, [1, 11])) return 'one';
        return 'other';
      }
    };
    var index = locales2rules[lang.replace(/-.*$/, '')];

    if (!(index in pluralRules)) {
      console.warn('plural form unknown for [' + lang + ']');
      return function () {
        return 'other';
      };
    }

    return pluralRules[index];
  }

  gMacros.plural = function (str, param, key, prop) {
    var n = parseFloat(param);
    if (isNaN(n)) return str;
    if (prop != gTextProp) return str;

    if (!gMacros._pluralRules) {
      gMacros._pluralRules = getPluralRules(gLanguage);
    }

    var index = '[' + gMacros._pluralRules(n) + ']';

    if (n === 0 && key + '[zero]' in gL10nData) {
      str = gL10nData[key + '[zero]'][prop];
    } else if (n == 1 && key + '[one]' in gL10nData) {
      str = gL10nData[key + '[one]'][prop];
    } else if (n == 2 && key + '[two]' in gL10nData) {
      str = gL10nData[key + '[two]'][prop];
    } else if (key + index in gL10nData) {
      str = gL10nData[key + index][prop];
    } else if (key + '[other]' in gL10nData) {
      str = gL10nData[key + '[other]'][prop];
    }

    return str;
  };

  function getL10nData(key, args, fallback) {
    var data = gL10nData[key];

    if (!data) {
      console.warn('#' + key + ' is undefined.');

      if (!fallback) {
        return null;
      }

      data = fallback;
    }

    var rv = {};

    for (var prop in data) {
      var str = data[prop];
      str = substIndexes(str, args, key, prop);
      str = substArguments(str, args, key);
      rv[prop] = str;
    }

    return rv;
  }

  function substIndexes(str, args, key, prop) {
    var reIndex = /\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/;
    var reMatch = reIndex.exec(str);
    if (!reMatch || !reMatch.length) return str;
    var macroName = reMatch[1];
    var paramName = reMatch[2];
    var param;

    if (args && paramName in args) {
      param = args[paramName];
    } else if (paramName in gL10nData) {
      param = gL10nData[paramName];
    }

    if (macroName in gMacros) {
      var macro = gMacros[macroName];
      str = macro(str, param, key, prop);
    }

    return str;
  }

  function substArguments(str, args, key) {
    var reArgs = /\{\{\s*(.+?)\s*\}\}/g;
    return str.replace(reArgs, function (matched_text, arg) {
      if (args && arg in args) {
        return args[arg];
      }

      if (arg in gL10nData) {
        return gL10nData[arg];
      }

      console.log('argument {{' + arg + '}} for #' + key + ' is undefined.');
      return matched_text;
    });
  }

  function translateElement(element) {
    var l10n = getL10nAttributes(element);
    if (!l10n.id) return;
    var data = getL10nData(l10n.id, l10n.args);

    if (!data) {
      console.warn('#' + l10n.id + ' is undefined.');
      return;
    }

    if (data[gTextProp]) {
      if (getChildElementCount(element) === 0) {
        element[gTextProp] = data[gTextProp];
      } else {
        var children = element.childNodes;
        var found = false;

        for (var i = 0, l = children.length; i < l; i++) {
          if (children[i].nodeType === 3 && /\S/.test(children[i].nodeValue)) {
            if (found) {
              children[i].nodeValue = '';
            } else {
              children[i].nodeValue = data[gTextProp];
              found = true;
            }
          }
        }

        if (!found) {
          var textNode = document.createTextNode(data[gTextProp]);
          element.insertBefore(textNode, element.firstChild);
        }
      }

      delete data[gTextProp];
    }

    for (var k in data) {
      element[k] = data[k];
    }
  }

  function getChildElementCount(element) {
    if (element.children) {
      return element.children.length;
    }

    if (typeof element.childElementCount !== 'undefined') {
      return element.childElementCount;
    }

    var count = 0;

    for (var i = 0; i < element.childNodes.length; i++) {
      count += element.nodeType === 1 ? 1 : 0;
    }

    return count;
  }

  function translateFragment(element) {
    element = element || document.documentElement;
    var children = getTranslatableChildren(element);
    var elementCount = children.length;

    for (var i = 0; i < elementCount; i++) {
      translateElement(children[i]);
    }

    translateElement(element);
  }

  return {
    get: function (key, args, fallbackString) {
      var index = key.lastIndexOf('.');
      var prop = gTextProp;

      if (index > 0) {
        prop = key.substring(index + 1);
        key = key.substring(0, index);
      }

      var fallback;

      if (fallbackString) {
        fallback = {};
        fallback[prop] = fallbackString;
      }

      var data = getL10nData(key, args, fallback);

      if (data && prop in data) {
        return data[prop];
      }

      return '{{' + key + '}}';
    },
    getData: function () {
      return gL10nData;
    },
    getText: function () {
      return gTextData;
    },
    getLanguage: function () {
      return gLanguage;
    },
    setLanguage: function (lang, callback) {
      loadLocale(lang, function () {
        if (callback) callback();
      });
    },
    getDirection: function () {
      var rtlList = ['ar', 'he', 'fa', 'ps', 'ur'];
      var shortCode = gLanguage.split('-', 1)[0];
      return rtlList.indexOf(shortCode) >= 0 ? 'rtl' : 'ltr';
    },
    translate: translateFragment,
    getReadyState: function () {
      return gReadyState;
    },
    ready: function (callback) {
      if (!callback) {
        return;
      } else if (gReadyState == 'complete' || gReadyState == 'interactive') {
        window.setTimeout(function () {
          callback();
        });
      } else if (document.addEventListener) {
        document.addEventListener('localized', function once() {
          document.removeEventListener('localized', once);
          callback();
        });
      }
    }
  };
}(window, document);

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GenericScripting = void 0;

var _pdfjsLib = __webpack_require__(5);

class GenericScripting {
  constructor(sandboxBundleSrc) {
    this._ready = (0, _pdfjsLib.loadScript)(sandboxBundleSrc, true).then(() => {
      return window.pdfjsSandbox.QuickJSSandbox();
    });
  }

  async createSandbox(data) {
    const sandbox = await this._ready;
    sandbox.create(data);
  }

  async dispatchEventInSandbox(event) {
    const sandbox = await this._ready;
    sandbox.dispatchEvent(event);
  }

  async destroySandbox() {
    const sandbox = await this._ready;
    sandbox.nukeSandbox();
  }

}

exports.GenericScripting = GenericScripting;

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFPrintService = PDFPrintService;

var _ui_utils = __webpack_require__(4);

var _app = __webpack_require__(3);

var _viewer_compatibility = __webpack_require__(2);

let activeService = null;
let overlayManager = null;

function renderPage(activeServiceOnEntry, pdfDocument, pageNumber, size, printResolution, optionalContentConfigPromise) {
  const scratchCanvas = activeService.scratchCanvas;
  const PRINT_UNITS = printResolution / 72.0;
  scratchCanvas.width = Math.floor(size.width * PRINT_UNITS);
  scratchCanvas.height = Math.floor(size.height * PRINT_UNITS);
  const width = Math.floor(size.width * _ui_utils.CSS_UNITS) + "px";
  const height = Math.floor(size.height * _ui_utils.CSS_UNITS) + "px";
  const ctx = scratchCanvas.getContext("2d");
  ctx.save();
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  ctx.restore();
  return pdfDocument.getPage(pageNumber).then(function (pdfPage) {
    const renderContext = {
      canvasContext: ctx,
      transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
      viewport: pdfPage.getViewport({
        scale: 1,
        rotation: size.rotation
      }),
      intent: "print",
      annotationStorage: pdfDocument.annotationStorage,
      optionalContentConfigPromise
    };
    return pdfPage.render(renderContext).promise;
  }).then(function () {
    return {
      width,
      height
    };
  });
}

function PDFPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise = null, l10n) {
  this.pdfDocument = pdfDocument;
  this.pagesOverview = pagesOverview;
  this.printContainer = printContainer;
  this._printResolution = printResolution || 150;
  this._optionalContentConfigPromise = optionalContentConfigPromise || pdfDocument.getOptionalContentConfig();
  this.l10n = l10n || _ui_utils.NullL10n;
  this.currentPage = -1;
  this.scratchCanvas = document.createElement("canvas");
}

PDFPrintService.prototype = {
  layout() {
    this.throwIfInactive();
    const body = document.querySelector("body");
    body.setAttribute("data-pdfjsprinting", true);
    const hasEqualPageSizes = this.pagesOverview.every(function (size) {
      return size.width === this.pagesOverview[0].width && size.height === this.pagesOverview[0].height;
    }, this);

    if (!hasEqualPageSizes) {
      console.warn("Not all pages have the same size. The printed " + "result may be incorrect!");
    }

    this.pageStyleSheet = document.createElement("style");
    const pageSize = this.pagesOverview[0];
    this.pageStyleSheet.textContent = "@supports ((size:A4) and (size:1pt 1pt)) {" + "@page { size: " + pageSize.width + "pt " + pageSize.height + "pt;}" + "}";
    body.appendChild(this.pageStyleSheet);
  },

  destroy() {
    if (activeService !== this) {
      return;
    }

    this.printContainer.textContent = "";
    const body = document.querySelector("body");
    body.removeAttribute("data-pdfjsprinting");

    if (this.pageStyleSheet) {
      this.pageStyleSheet.remove();
      this.pageStyleSheet = null;
    }

    this.scratchCanvas.width = this.scratchCanvas.height = 0;
    this.scratchCanvas = null;
    activeService = null;
    ensureOverlay().then(function () {
      if (overlayManager.active !== "printServiceOverlay") {
        return;
      }

      overlayManager.close("printServiceOverlay");
    });
  },

  renderPages() {
    const pageCount = this.pagesOverview.length;

    const renderNextPage = (resolve, reject) => {
      this.throwIfInactive();

      if (++this.currentPage >= pageCount) {
        renderProgress(pageCount, pageCount, this.l10n);
        resolve();
        return;
      }

      const index = this.currentPage;
      renderProgress(index, pageCount, this.l10n);
      renderPage(this, this.pdfDocument, index + 1, this.pagesOverview[index], this._printResolution, this._optionalContentConfigPromise).then(this.useRenderedPage.bind(this)).then(function () {
        renderNextPage(resolve, reject);
      }, reject);
    };

    return new Promise(renderNextPage);
  },

  useRenderedPage(printItem) {
    this.throwIfInactive();
    const img = document.createElement("img");
    img.style.width = printItem.width;
    img.style.height = printItem.height;
    const scratchCanvas = this.scratchCanvas;

    if ("toBlob" in scratchCanvas && !_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
      scratchCanvas.toBlob(function (blob) {
        img.src = URL.createObjectURL(blob);
      });
    } else {
      img.src = scratchCanvas.toDataURL();
    }

    const wrapper = document.createElement("div");
    wrapper.appendChild(img);
    this.printContainer.appendChild(wrapper);
    return new Promise(function (resolve, reject) {
      img.onload = resolve;
      img.onerror = reject;
    });
  },

  performPrint() {
    this.throwIfInactive();
    return new Promise(resolve => {
      setTimeout(() => {
        if (!this.active) {
          resolve();
          return;
        }

        print.call(window);
        setTimeout(resolve, 20);
      }, 0);
    });
  },

  get active() {
    return this === activeService;
  },

  throwIfInactive() {
    if (!this.active) {
      throw new Error("This print request was cancelled or completed.");
    }
  }

};
const print = window.print;

window.print = function () {
  if (activeService) {
    console.warn("Ignored window.print() because of a pending print job.");
    return;
  }

  ensureOverlay().then(function () {
    if (activeService) {
      overlayManager.open("printServiceOverlay");
    }
  });

  try {
    dispatchEvent("beforeprint");
  } finally {
    if (!activeService) {
      console.error("Expected print service to be initialized.");
      ensureOverlay().then(function () {
        if (overlayManager.active === "printServiceOverlay") {
          overlayManager.close("printServiceOverlay");
        }
      });
      return;
    }

    const activeServiceOnEntry = activeService;
    activeService.renderPages().then(function () {
      return activeServiceOnEntry.performPrint();
    }).catch(function () {}).then(function () {
      if (activeServiceOnEntry.active) {
        abort();
      }
    });
  }
};

function dispatchEvent(eventType) {
  const event = document.createEvent("CustomEvent");
  event.initCustomEvent(eventType, false, false, "custom");
  window.dispatchEvent(event);
}

function abort() {
  if (activeService) {
    activeService.destroy();
    dispatchEvent("afterprint");
  }
}

function renderProgress(index, total, l10n) {
  const progressContainer = document.getElementById("printServiceOverlay");
  const progress = Math.round(100 * index / total);
  const progressBar = progressContainer.querySelector("progress");
  const progressPerc = progressContainer.querySelector(".relative-progress");
  progressBar.value = progress;
  l10n.get("print_progress_percent", {
    progress
  }, progress + "%").then(msg => {
    progressPerc.textContent = msg;
  });
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 80 && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
    window.print();
    event.preventDefault();

    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else {
      event.stopPropagation();
    }
  }
}, true);

if ("onbeforeprint" in window) {
  const stopPropagationIfNeeded = function (event) {
    if (event.detail !== "custom" && event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    }
  };

  window.addEventListener("beforeprint", stopPropagationIfNeeded);
  window.addEventListener("afterprint", stopPropagationIfNeeded);
}

let overlayPromise;

function ensureOverlay() {
  if (!overlayPromise) {
    overlayManager = _app.PDFViewerApplication.overlayManager;

    if (!overlayManager) {
      throw new Error("The overlay manager has not yet been initialized.");
    }

    overlayPromise = overlayManager.register("printServiceOverlay", document.getElementById("printServiceOverlay"), abort, true);
    document.getElementById("printCancel").onclick = abort;
  }

  return overlayPromise;
}

_app.PDFPrintServiceFactory.instance = {
  supportsPrinting: true,

  createPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, l10n) {
    if (activeService) {
      throw new Error("The print service is created and active.");
    }

    activeService = new PDFPrintService(pdfDocument, pagesOverview, printContainer, printResolution, optionalContentConfigPromise, l10n);
    return activeService;
  }

};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
});

define('skylark-pdfjs-viewer/main',[
	"skylark-langx/skylark",
	"./viewer"
],function(skylark,viewer) {
	return skylark.attach("intg.pdfjs.viewer",viewer);
});
define('skylark-pdfjs-viewer', ['skylark-pdfjs-viewer/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-pdfjs-viewer-all.js.map
