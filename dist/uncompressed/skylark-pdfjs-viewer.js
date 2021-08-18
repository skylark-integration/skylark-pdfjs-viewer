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

define('skylark-pdfjs-viewer/pdfjs_dev',[],function(){
	function evalInScope(js, contextAsScope) {
	    //# Return the results of the in-line anonymous function we .call with the passed context
	    return function() { with(this) { return eval(js); }; }.call(contextAsScope);
	}


	var DEFINES = {
	  BUNDLE_VERSION : "2.7.570",
	  BUNDLE_BUILD : 0,
	  PRODUCTION: true,
	  SKIP_BABEL: true,
	  TESTING: false,
	  // The main build targets:
	  GENERIC: true,
	  MOZCENTRAL: false,
	  CHROME: false,
	  MINIFIED: false,
	  COMPONENTS: false,
	  LIB: false,
	  IMAGE_DECODERS: false,
	};


	return   {
		DEFINES,

		eval(s) {
			return evalInScope(s,DEFINES);
		},


		test(s) {
			return !!evalInScope(s,DEFINES);

		}


	}

});
define('skylark-pdfjs-viewer/viewer_compatibility',[
  "./pdfjs_dev"
],function(PDFJSDev){
  /* Copyright 2018 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const compatibilityParams = Object.create(null);
  if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
    const userAgent =
      (typeof navigator !== "undefined" && navigator.userAgent) || "";
    const platform =
      (typeof navigator !== "undefined" && navigator.platform) || "";
    const maxTouchPoints =
      (typeof navigator !== "undefined" && navigator.maxTouchPoints) || 1;

    const isAndroid = /Android/.test(userAgent);
    const isIOS =
      /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) ||
      (platform === "MacIntel" && maxTouchPoints > 1);
    const isIOSChrome = /CriOS/.test(userAgent);

    // Checks if possible to use URL.createObjectURL()
    // Support: IE, Chrome on iOS
    (function checkOnBlobSupport() {
      // Sometimes Chrome on iOS loses data created with createObjectURL(),
      // see issue #8081.
      if (isIOSChrome) {
        compatibilityParams.disableCreateObjectURL = true;
      }
    })();

    // Limit canvas size to 5 mega-pixels on mobile.
    // Support: Android, iOS
    (function checkCanvasSizeLimitation() {
      if (isIOS || isAndroid) {
        compatibilityParams.maxCanvasPixels = 5242880;
      }
    })();
  }
  const viewerCompatibilityParams = Object.freeze(compatibilityParams);

  return { viewerCompatibilityParams };
});
define('skylark-pdfjs-viewer/app_options',[
  "./viewer_compatibility",
  "./pdfjs_dev"
],function(viewer_compatibility,PDFJSDev){

  /* Copyright 2018 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { viewerCompatibilityParams } = viewer_compatibility;

  const OptionKind = {
    VIEWER: 0x02,
    API: 0x04,
    WORKER: 0x08,
    PREFERENCE: 0x80,
  };

  /**
   * PLEASE NOTE: To avoid introducing unnecessary dependencies, we specify the
   *              values below *explicitly* rather than relying on imported types.
   */
  const defaultOptions = {
    cursorToolOnLoad: {
      /** @type {number} */
      value: 0,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    defaultUrl: {
      /** @type {string} */
      value: "compressed.tracemonkey-pldi-09.pdf",
      kind: OptionKind.VIEWER,
    },
    defaultZoomValue: {
      /** @type {string} */
      value: "",
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    disableHistory: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.VIEWER,
    },
    disablePageLabels: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    /**
     * The `disablePreferences` is, conditionally, defined below.
     */
    enablePermissions: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    enablePrintAutoRotate: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    enableScripting: {
      /** @type {boolean} */
      value: typeof PDFJSDev !== "undefined" && PDFJSDev.test("TESTING"),
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    enableWebGL: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    externalLinkRel: {
      /** @type {string} */
      value: "noopener noreferrer nofollow",
      kind: OptionKind.VIEWER,
    },
    externalLinkTarget: {
      /** @type {number} */
      value: 0,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    historyUpdateUrl: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    ignoreDestinationZoom: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    imageResourcesPath: {
      /** @type {string} */
      value: "./images/",
      kind: OptionKind.VIEWER,
    },
    /**
     * The `locale` is, conditionally, defined below.
     */
    maxCanvasPixels: {
      /** @type {number} */
      value: 16777216,
      compatibility: viewerCompatibilityParams.maxCanvasPixels,
      kind: OptionKind.VIEWER,
    },
    pdfBugEnabled: {
      /** @type {boolean} */
      value: typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION"),
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    printResolution: {
      /** @type {number} */
      value: 150,
      kind: OptionKind.VIEWER,
    },
    renderer: {
      /** @type {string} */
      value: "canvas",
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    renderInteractiveForms: {
      /** @type {boolean} */
      value: true,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    sidebarViewOnLoad: {
      /** @type {number} */
      value: -1,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    scrollModeOnLoad: {
      /** @type {number} */
      value: -1,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    spreadModeOnLoad: {
      /** @type {number} */
      value: -1,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    textLayerMode: {
      /** @type {number} */
      value: 1,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    useOnlyCssZoom: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    viewerCssTheme: {
      /** @type {number} */
      value: 0,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },
    viewOnLoad: {
      /** @type {boolean} */
      value: 0,
      kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
    },

    cMapPacked: {
      /** @type {boolean} */
      value: true,
      kind: OptionKind.API,
    },
    cMapUrl: {
      /** @type {string} */
      value:
        typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION")
          ? "../external/bcmaps/"
          : "../web/cmaps/",
      kind: OptionKind.API,
    },
    disableAutoFetch: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.API + OptionKind.PREFERENCE,
    },
    disableFontFace: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.API + OptionKind.PREFERENCE,
    },
    disableRange: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.API + OptionKind.PREFERENCE,
    },
    disableStream: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.API + OptionKind.PREFERENCE,
    },
    docBaseUrl: {
      /** @type {string} */
      value: "",
      kind: OptionKind.API,
    },
    fontExtraProperties: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.API,
    },
    isEvalSupported: {
      /** @type {boolean} */
      value: true,
      kind: OptionKind.API,
    },
    maxImageSize: {
      /** @type {number} */
      value: -1,
      kind: OptionKind.API,
    },
    pdfBug: {
      /** @type {boolean} */
      value: false,
      kind: OptionKind.API,
    },
    verbosity: {
      /** @type {number} */
      value: 1,
      kind: OptionKind.API,
    },

    workerPort: {
      /** @type {Object} */
      value: null,
      kind: OptionKind.WORKER,
    },
    workerSrc: {
      /** @type {string} */
      value:
        typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION")
          ? "../src/worker_loader.js"
          : "../build/pdf.worker.js",
      kind: OptionKind.WORKER,
    },
  };
  if (
    typeof PDFJSDev === "undefined" ||
    PDFJSDev.test("!PRODUCTION || (GENERIC && !LIB)")
  ) {
    defaultOptions.disablePreferences = {
      /** @type {boolean} */
      value: typeof PDFJSDev !== "undefined" && PDFJSDev.test("TESTING"),
      kind: OptionKind.VIEWER,
    };
    defaultOptions.locale = {
      /** @type {string} */
      value: typeof navigator !== "undefined" ? navigator.language : "en-US",
      kind: OptionKind.VIEWER,
    };
    defaultOptions.sandboxBundleSrc = {
      /** @type {string} */
      value:
        typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION")
          ? "../build/dev-sandbox/pdf.sandbox.js"
          : "../build/pdf.sandbox.js",
      kind: OptionKind.VIEWER,
    };
  } else if (PDFJSDev.test("CHROME")) {
    defaultOptions.sandboxBundleSrc = {
      /** @type {string} */
      value: "../build/pdf.sandbox.js",
      kind: OptionKind.VIEWER,
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

            if (
              valueType === "boolean" ||
              valueType === "string" ||
              (valueType === "number" && Number.isInteger(value))
            ) {
              options[name] = value;
              continue;
            }
            throw new Error(`Invalid type for preference: ${name}`);
          }
        }
        const userOption = userOptions[name];
        options[name] =
          userOption !== undefined
            ? userOption
            : defaultOption.compatibility || defaultOption.value;
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

  return { AppOptions, OptionKind };
});
define('skylark-pdfjs-viewer/ui_utils',[
  "./pdfjs_dev"
],function(PDFJSDev){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const CSS_UNITS = 96.0 / 72.0;
  const DEFAULT_SCALE_VALUE = "auto";
  const DEFAULT_SCALE = 1.0;
  const MIN_SCALE = 0.1;
  const MAX_SCALE = 10.0;
  const UNKNOWN_SCALE = 0;
  const MAX_AUTO_SCALE = 1.25;
  const SCROLLBAR_PADDING = 40;
  const VERTICAL_PADDING = 5;

  const LOADINGBAR_END_OFFSET_VAR = "--loadingBar-end-offset";

  const PresentationModeState = {
    UNKNOWN: 0,
    NORMAL: 1,
    CHANGING: 2,
    FULLSCREEN: 3,
  };

  const SidebarView = {
    UNKNOWN: -1,
    NONE: 0,
    THUMBS: 1, // Default value.
    OUTLINE: 2,
    ATTACHMENTS: 3,
    LAYERS: 4,
  };

  const RendererType = {
    CANVAS: "canvas",
    SVG: "svg",
  };

  const TextLayerMode = {
    DISABLE: 0,
    ENABLE: 1,
    ENABLE_ENHANCE: 2,
  };

  const ScrollMode = {
    UNKNOWN: -1,
    VERTICAL: 0, // Default value.
    HORIZONTAL: 1,
    WRAPPED: 2,
  };

  const SpreadMode = {
    UNKNOWN: -1,
    NONE: 0, // Default value.
    ODD: 1,
    EVEN: 2,
  };

  // Used by `PDFViewerApplication`, and by the API unit-tests.
  const AutoPrintRegExp = /\bprint\s*\(/;

  // Replaces {{arguments}} with their values.
  function formatL10nValue(text, args) {
    if (!args) {
      return text;
    }
    return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (all, name) => {
      return name in args ? args[name] : "{{" + name + "}}";
    });
  }

  /**
   * No-op implementation of the localization service.
   * @implements {IL10n}
   */
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

    async translate(element) {},
  };

  /**
   * Returns scale factor for the canvas. It makes sense for the HiDPI displays.
   * @returns {Object} The object with horizontal (sx) and vertical (sy)
   *                   scales. The scaled property is set to false if scaling is
   *                   not required, true otherwise.
   */
  function getOutputScale(ctx) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;
    const pixelRatio = devicePixelRatio / backingStoreRatio;
    return {
      sx: pixelRatio,
      sy: pixelRatio,
      scaled: pixelRatio !== 1,
    };
  }

  /**
   * Scrolls specified element into view of its parent.
   * @param {Object} element - The element to be visible.
   * @param {Object} spot - An object with optional top and left properties,
   *   specifying the offset from the top left edge.
   * @param {boolean} skipOverflowHiddenElements - Ignore elements that have
   *   the CSS rule `overflow: hidden;` set. The default is false.
   */
  function scrollIntoView(element, spot, skipOverflowHiddenElements = false) {
    // Assuming offsetParent is available (it's not available when viewer is in
    // hidden iframe or object). We have to scroll: if the offsetParent is not set
    // producing the error. See also animationStarted.
    let parent = element.offsetParent;
    if (!parent) {
      console.error("offsetParent is not set -- cannot scroll");
      return;
    }
    let offsetY = element.offsetTop + element.clientTop;
    let offsetX = element.offsetLeft + element.clientLeft;
    while (
      (parent.clientHeight === parent.scrollHeight &&
        parent.clientWidth === parent.scrollWidth) ||
      (skipOverflowHiddenElements &&
        getComputedStyle(parent).overflow === "hidden")
    ) {
      if (parent.dataset._scaleY) {
        offsetY /= parent.dataset._scaleY;
        offsetX /= parent.dataset._scaleX;
      }
      offsetY += parent.offsetTop;
      offsetX += parent.offsetLeft;
      parent = parent.offsetParent;
      if (!parent) {
        return; // no need to scroll
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

  /**
   * Helper function to start monitoring the scroll event and converting them into
   * PDF.js friendly one: with scroll debounce and scroll direction.
   */
  function watchScroll(viewAreaElement, callback) {
    const debounceScroll = function (evt) {
      if (rAF) {
        return;
      }
      // schedule an invocation of scroll for next animation frame.
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
      _eventHandler: debounceScroll,
    };

    let rAF = null;
    viewAreaElement.addEventListener("scroll", debounceScroll, true);
    return state;
  }

  /**
   * Helper function to parse query string (e.g. ?param1=value&parm2=...).
   */
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

  /**
   * Use binary search to find the index of the first item in a given array which
   * passes a given condition. The items are expected to be sorted in the sense
   * that if the condition is true for one item in the array, then it is also true
   * for all following items.
   *
   * @returns {number} Index of the first array element to pass the test,
   *                   or |items.length| if no such element exists.
   */
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
      const currentIndex = (minIndex + maxIndex) >> 1;
      const currentItem = items[currentIndex];
      if (condition(currentItem)) {
        maxIndex = currentIndex;
      } else {
        minIndex = currentIndex + 1;
      }
    }
    return minIndex; /* === maxIndex */
  }

  /**
   *  Approximates float number as a fraction using Farey sequence (max order
   *  of 8).
   *  @param {number} x - Positive float number.
   *  @returns {Array} Estimated fraction: the first array item is a numerator,
   *                   the second one is a denominator.
   */
  function approximateFraction(x) {
    // Fast paths for int numbers or their inversions.
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
    // a/b and c/d are neighbours in Farey sequence.
    let a = 0,
      b = 1,
      c = 1,
      d = 1;
    // Limiting search to order 8.
    while (true) {
      // Generating next term in sequence (order of q).
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
    // Select closest of the neighbours to x.
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

  /**
   * Gets the size of the specified page, converted from PDF units to inches.
   * @param {Object} An Object containing the properties: {Array} `view`,
   *   {number} `userUnit`, and {number} `rotate`.
   * @returns {Object} An Object containing the properties: {number} `width`
   *   and {number} `height`, given in inches.
   */
  function getPageSizeInches({ view, userUnit, rotate }) {
    const [x1, y1, x2, y2] = view;
    // We need to take the page rotation into account as well.
    const changeOrientation = rotate % 180 !== 0;

    const width = ((x2 - x1) / 72) * userUnit;
    const height = ((y2 - y1) / 72) * userUnit;

    return {
      width: changeOrientation ? height : width,
      height: changeOrientation ? width : height,
    };
  }

  /**
   * Helper function for getVisibleElements.
   *
   * @param {number} index - initial guess at the first visible element
   * @param {Array} views - array of pages, into which `index` is an index
   * @param {number} top - the top of the scroll pane
   * @returns {number} less than or equal to `index` that is definitely at or
   *   before the first visible element in `views`, but not by too much. (Usually,
   *   this will be the first element in the first partially visible row in
   *   `views`, although sometimes it goes back one row further.)
   */
  function backtrackBeforeAllVisibleElements(index, views, top) {
    // binarySearchFirstItem's assumption is that the input is ordered, with only
    // one index where the conditions flips from false to true: [false ...,
    // true...]. With vertical scrolling and spreads, it is possible to have
    // [false ..., true, false, true ...]. With wrapped scrolling we can have a
    // similar sequence, with many more mixed true and false in the middle.
    //
    // So there is no guarantee that the binary search yields the index of the
    // first visible element. It could have been any of the other visible elements
    // that were preceded by a hidden element.

    // Of course, if either this element or the previous (hidden) element is also
    // the first element, there's nothing to worry about.
    if (index < 2) {
      return index;
    }

    // That aside, the possible cases are represented below.
    //
    //     ****  = fully hidden
    //     A*B*  = mix of partially visible and/or hidden pages
    //     CDEF  = fully visible
    //
    // (1) Binary search could have returned A, in which case we can stop.
    // (2) Binary search could also have returned B, in which case we need to
    // check the whole row.
    // (3) Binary search could also have returned C, in which case we need to
    // check the whole previous row.
    //
    // There's one other possibility:
    //
    //     ****  = fully hidden
    //     ABCD  = mix of fully and/or partially visible pages
    //
    // (4) Binary search could only have returned A.

    // Initially assume that we need to find the beginning of the current row
    // (case 1, 2, or 4), which means finding a page that is above the current
    // page's top. If the found page is partially visible, we're definitely not in
    // case 3, and this assumption is correct.
    let elt = views[index].div;
    let pageTop = elt.offsetTop + elt.clientTop;

    if (pageTop >= top) {
      // The found page is fully visible, so we're actually either in case 3 or 4,
      // and unfortunately we can't tell the difference between them without
      // scanning the entire previous row, so we just conservatively assume that
      // we do need to backtrack to that row. In both cases, the previous page is
      // in the previous row, so use its top instead.
      elt = views[index - 1].div;
      pageTop = elt.offsetTop + elt.clientTop;
    }

    // Now we backtrack to the first page that still has its bottom below
    // `pageTop`, which is the top of a page in the first visible row (unless
    // we're in case 4, in which case it's the row before that).
    // `index` is found by binary search, so the page at `index - 1` is
    // invisible and we can start looking for potentially visible pages from
    // `index - 2`. (However, if this loop terminates on its first iteration,
    // which is the case when pages are stacked vertically, `index` should remain
    // unchanged, so we use a distinct loop variable.)
    for (let i = index - 2; i >= 0; --i) {
      elt = views[i].div;
      if (elt.offsetTop + elt.clientTop + elt.clientHeight <= pageTop) {
        // We have reached the previous row, so stop now.
        // This loop is expected to terminate relatively quickly because the
        // number of pages per row is expected to be small.
        break;
      }
      index = i;
    }
    return index;
  }

  /**
   * @typedef {Object} GetVisibleElementsParameters
   * @property {HTMLElement} scrollEl - A container that can possibly scroll.
   * @property {Array} views - Objects with a `div` property that contains an
   *   HTMLElement, which should all be descendants of `scrollEl` satisfying the
   *   relevant layout assumptions.
   * @property {boolean} sortByVisibility - If `true`, the returned elements are
   *   sorted in descending order of the percent of their padding box that is
   *   visible. The default value is `false`.
   * @property {boolean} horizontal - If `true`, the elements are assumed to be
   *   laid out horizontally instead of vertically. The default value is `false`.
   * @property {boolean} rtl - If `true`, the `scrollEl` container is assumed to
   *   be in right-to-left mode. The default value is `false`.
   */

  /**
   * Generic helper to find out what elements are visible within a scroll pane.
   *
   * Well, pretty generic. There are some assumptions placed on the elements
   * referenced by `views`:
   *   - If `horizontal`, no left of any earlier element is to the right of the
   *     left of any later element.
   *   - Otherwise, `views` can be split into contiguous rows where, within a row,
   *     no top of any element is below the bottom of any other element, and
   *     between rows, no bottom of any element in an earlier row is below the
   *     top of any element in a later row.
   *
   * (Here, top, left, etc. all refer to the padding edge of the element in
   * question. For pages, that ends up being equivalent to the bounding box of the
   * rendering canvas. Earlier and later refer to index in `views`, not page
   * layout.)
   *
   * @param {GetVisibleElementsParameters}
   * @returns {Object} `{ first, last, views: [{ id, x, y, view, percent }] }`
   */
  function getVisibleElements({
    scrollEl,
    views,
    sortByVisibility = false,
    horizontal = false,
    rtl = false,
  }) {
    const top = scrollEl.scrollTop,
      bottom = top + scrollEl.clientHeight;
    const left = scrollEl.scrollLeft,
      right = left + scrollEl.clientWidth;

    // Throughout this "generic" function, comments will assume we're working with
    // PDF document pages, which is the most important and complex case. In this
    // case, the visible elements we're actually interested is the page canvas,
    // which is contained in a wrapper which adds no padding/border/margin, which
    // is itself contained in `view.div` which adds no padding (but does add a
    // border). So, as specified in this function's doc comment, this function
    // does all of its work on the padding edge of the provided views, starting at
    // offsetLeft/Top (which includes margin) and adding clientLeft/Top (which is
    // the border). Adding clientWidth/Height gets us the bottom-right corner of
    // the padding edge.
    function isElementBottomAfterViewTop(view) {
      const element = view.div;
      const elementBottom =
        element.offsetTop + element.clientTop + element.clientHeight;
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
    let firstVisibleElementInd = binarySearchFirstItem(
      views,
      horizontal
        ? isElementNextAfterViewHorizontally
        : isElementBottomAfterViewTop
    );

    // Please note the return value of the `binarySearchFirstItem` function when
    // no valid element is found (hence the `firstVisibleElementInd` check below).
    if (
      firstVisibleElementInd > 0 &&
      firstVisibleElementInd < numViews &&
      !horizontal
    ) {
      // In wrapped scrolling (or vertical scrolling with spreads), with some page
      // sizes, isElementBottomAfterViewTop doesn't satisfy the binary search
      // condition: there can be pages with bottoms above the view top between
      // pages with bottoms below. This function detects and corrects that error;
      // see it for more comments.
      firstVisibleElementInd = backtrackBeforeAllVisibleElements(
        firstVisibleElementInd,
        views,
        top
      );
    }

    // lastEdge acts as a cutoff for us to stop looping, because we know all
    // subsequent pages will be hidden.
    //
    // When using wrapped scrolling or vertical scrolling with spreads, we can't
    // simply stop the first time we reach a page below the bottom of the view;
    // the tops of subsequent pages on the same row could still be visible. In
    // horizontal scrolling, we don't have that issue, so we can stop as soon as
    // we pass `right`, without needing the code below that handles the -1 case.
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
        // As commented above, this is only needed in non-horizontal cases.
        // Setting lastEdge to the bottom of the first page that is partially
        // visible ensures that the next page fully below lastEdge is on the
        // next row, which has to be fully hidden along with all subsequent rows.
        if (viewBottom >= bottom) {
          lastEdge = viewBottom;
        }
      } else if ((horizontal ? currentWidth : currentHeight) > lastEdge) {
        break;
      }

      if (
        viewBottom <= top ||
        currentHeight >= bottom ||
        viewRight <= left ||
        currentWidth >= right
      ) {
        continue;
      }

      const hiddenHeight =
        Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
      const hiddenWidth =
        Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);

      const fractionHeight = (viewHeight - hiddenHeight) / viewHeight,
        fractionWidth = (viewWidth - hiddenWidth) / viewWidth;
      const percent = (fractionHeight * fractionWidth * 100) | 0;

      visible.push({
        id: view.id,
        x: currentWidth,
        y: currentHeight,
        view,
        percent,
        widthPercent: (fractionWidth * 100) | 0,
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
        return a.id - b.id; // ensure stability
      });
    }
    return { first, last, views: visible };
  }

  /**
   * Event handler to suppress context menu.
   */
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

  /**
   * Returns the filename or guessed filename from the url (see issue 3455).
   * @param {string} url - The original PDF location.
   * @param {string} defaultFilename - The value returned if the filename is
   *   unknown, or the protocol is unsupported.
   * @returns {string} Guessed PDF filename.
   */
  function getPDFFileNameFromURL(url, defaultFilename = "document.pdf") {
    if (typeof url !== "string") {
      return defaultFilename;
    }
    if (isDataSchema(url)) {
      console.warn(
        "getPDFFileNameFromURL: " +
          'ignoring "data:" URL for performance reasons.'
      );
      return defaultFilename;
    }
    const reURI = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
    //              SCHEME        HOST        1.PATH  2.QUERY   3.REF
    // Pattern to get last matching NAME.pdf
    const reFilename = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
    const splitURI = reURI.exec(url);
    let suggestedFilename =
      reFilename.exec(splitURI[1]) ||
      reFilename.exec(splitURI[2]) ||
      reFilename.exec(splitURI[3]);
    if (suggestedFilename) {
      suggestedFilename = suggestedFilename[0];
      if (suggestedFilename.includes("%")) {
        // URL-encoded %2Fpath%2Fto%2Ffile.pdf should be file.pdf
        try {
          suggestedFilename = reFilename.exec(
            decodeURIComponent(suggestedFilename)
          )[0];
        } catch (ex) {
          // Possible (extremely rare) errors:
          // URIError "Malformed URI", e.g. for "%AA.pdf"
          // TypeError "null has no properties", e.g. for "%2F.pdf"
        }
      }
    }
    return suggestedFilename || defaultFilename;
  }

  function normalizeWheelEventDirection(evt) {
    let delta = Math.sqrt(evt.deltaX * evt.deltaX + evt.deltaY * evt.deltaY);
    const angle = Math.atan2(evt.deltaY, evt.deltaX);
    if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
      // All that is left-up oriented has to change the sign.
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

    // Converts delta to per-page units
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
    return (
      Number.isInteger(mode) &&
      Object.values(ScrollMode).includes(mode) &&
      mode !== ScrollMode.UNKNOWN
    );
  }

  function isValidSpreadMode(mode) {
    return (
      Number.isInteger(mode) &&
      Object.values(SpreadMode).includes(mode) &&
      mode !== SpreadMode.UNKNOWN
    );
  }

  function isPortraitOrientation(size) {
    return size.width <= size.height;
  }

  const WaitOnType = {
    EVENT: "event",
    TIMEOUT: "timeout",
  };

  /**
   * @typedef {Object} WaitOnEventOrTimeoutParameters
   * @property {Object} target - The event target, can for example be:
   *   `window`, `document`, a DOM element, or an {EventBus} instance.
   * @property {string} name - The name of the event.
   * @property {number} delay - The delay, in milliseconds, after which the
   *   timeout occurs (if the event wasn't already dispatched).
   */

  /**
   * Allows waiting for an event or a timeout, whichever occurs first.
   * Can be used to ensure that an action always occurs, even when an event
   * arrives late or not at all.
   *
   * @param {WaitOnEventOrTimeoutParameters}
   * @returns {Promise} A promise that is resolved with a {WaitOnType} value.
   */
  function waitOnEventOrTimeout({ target, name, delay = 0 }) {
    return new Promise(function (resolve, reject) {
      if (
        typeof target !== "object" ||
        !(name && typeof name === "string") ||
        !(Number.isInteger(delay) && delay >= 0)
      ) {
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

  /**
   * Promise that is resolved when DOM window becomes visible.
   */
  const animationStarted = new Promise(function (resolve) {
    if (
      typeof PDFJSDev !== "undefined" &&
      PDFJSDev.test("LIB && TESTING") &&
      typeof window === "undefined"
    ) {
      // Prevent "ReferenceError: window is not defined" errors when running the
      // unit-tests in Node.js/Travis.
      setTimeout(resolve, 20);
      return;
    }
    window.requestAnimationFrame(resolve);
  });

  /**
   * NOTE: Only used to support various PDF viewer tests in `mozilla-central`.
   */
  function dispatchDOMEvent(eventName, args = null) {
    if (typeof PDFJSDev !== "undefined" && !PDFJSDev.test("MOZCENTRAL")) {
      throw new Error("Not implemented: dispatchDOMEvent");
    }
    const details = Object.create(null);
    if (args && args.length > 0) {
      const obj = args[0];
      for (const key in obj) {
        const value = obj[key];
        if (key === "source") {
          if (value === window || value === document) {
            return; // No need to re-dispatch (already) global events.
          }
          continue; // Ignore the `source` property.
        }
        details[key] = value;
      }
    }
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent(eventName, true, true, details);
    document.dispatchEvent(event);
  }

  /**
   * Simple event bus for an application. Listeners are attached using the `on`
   * and `off` methods. To raise an event, the `dispatch` method shall be used.
   */
  class EventBus {
    constructor(options) {
      this._listeners = Object.create(null);

      if (typeof PDFJSDev === "undefined" || PDFJSDev.test("MOZCENTRAL")) {
        ///this._isInAutomation = options?.isInAutomation === true; // lwf
        this._isInAutomation = options && (options.isInAutomation === true);
      }
    }

    /**
     * @param {string} eventName
     * @param {function} listener
     * @param {Object} [options]
     */
    on(eventName, listener, options = null) {
      this._on(eventName, listener, {
        external: true,
        ///once: options?.once, // lwf
        once: options && options.once, 
      });
    }

    /**
     * @param {string} eventName
     * @param {function} listener
     * @param {Object} [options]
     */
    off(eventName, listener, options = null) {
      this._off(eventName, listener, {
        external: true,
        ///once: options?.once, // lwf
        once: options && options.once, 
      });
    }

    dispatch(eventName) {
      const eventListeners = this._listeners[eventName];
      if (!eventListeners || eventListeners.length === 0) {
        if (
          (typeof PDFJSDev === "undefined" || PDFJSDev.test("MOZCENTRAL")) &&
          this._isInAutomation
        ) {
          const args = Array.prototype.slice.call(arguments, 1);
          dispatchDOMEvent(eventName, args);
        }
        return;
      }
      // Passing all arguments after the eventName to the listeners.
      const args = Array.prototype.slice.call(arguments, 1);
      let externalListeners;
      // Making copy of the listeners array in case if it will be modified
      // during dispatch.
      eventListeners.slice(0).forEach(({ listener, external, once }) => {
        if (once) {
          this._off(eventName, listener);
        }
        if (external) {
          ///(externalListeners ||= []).push(listener); // lwf 
          (externalListeners || (externalListeners = [])).push(listener);
          return;
        }
        listener.apply(null, args);
      });
      // Dispatch any "external" listeners *after* the internal ones, to give the
      // viewer components time to handle events and update their state first.
      if (externalListeners) {
        externalListeners.forEach(listener => {
          listener.apply(null, args);
        });
        externalListeners = null;
      }
      if (
        (typeof PDFJSDev === "undefined" || PDFJSDev.test("MOZCENTRAL")) &&
        this._isInAutomation
      ) {
        dispatchDOMEvent(eventName, args);
      }
    }

    /**
     * @ignore
     */
    _on(eventName, listener, options = null) {
      ///const eventListeners = (this._listeners[eventName] ||= []); // lwf
      const eventListeners = (this._listeners[eventName] || (this._listeners[eventName]= []));
      eventListeners.push({
        listener,
        ///external: options?.external === true, // lwf
        ///once: options?.once === true,         // lwf
        external: options && options.external === true, 
        once: options && options.once === true,     
      });
    }

    /**
     * @ignore
     */
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

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  class ProgressBar {
    constructor(id, { height, width, units } = {}) {
      this.visible = true;

      // Fetch the sub-elements for later.
      this.div = document.querySelector(id + " .progress");
      // Get the loading bar element, so it can be resized to fit the viewer.
      this.bar = this.div.parentNode;

      // Get options, with sensible defaults.
      this.height = height || 100;
      this.width = width || 100;
      this.units = units || "%";

      // Initialize heights.
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
      const progressSize = (this.width * this._percent) / 100;
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

  /**
   * Moves all elements of an array that satisfy condition to the end of the
   * array, preserving the order of the rest.
   */
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

  /**
   * Get the active or focused element in current DOM.
   *
   * Recursively search for the truly active or focused element in case there are
   * shadow DOMs.
   *
   * @returns {Element} the truly active or focused element.
   */
  function getActiveOrFocusedElement() {
    let curRoot = document;
    let curActiveOrFocused =
      curRoot.activeElement || curRoot.querySelector(":focus");

    while (curActiveOrFocused && curActiveOrFocused.shadowRoot) {
      curRoot = curActiveOrFocused.shadowRoot;
      curActiveOrFocused =
        curRoot.activeElement || curRoot.querySelector(":focus");
    }

    return curActiveOrFocused;
  }

  return {
    animationStarted,
    approximateFraction,
    AutoPrintRegExp,
    backtrackBeforeAllVisibleElements, // only exported for testing
    binarySearchFirstItem,
    CSS_UNITS,
    DEFAULT_SCALE,
    DEFAULT_SCALE_VALUE,
    EventBus,
    getActiveOrFocusedElement,
    getOutputScale,
    getPageSizeInches,
    getPDFFileNameFromURL,
    getVisibleElements,
    isPortraitOrientation,
    isValidRotation,
    isValidScrollMode,
    isValidSpreadMode,
    MAX_AUTO_SCALE,
    MAX_SCALE,
    MIN_SCALE,
    moveToEndOfArray,
    noContextMenuHandler,
    normalizeWheelEventDelta,
    normalizeWheelEventDirection,
    NullL10n,
    parseQueryString,
    PresentationModeState,
    ProgressBar,
    RendererType,
    roundToDivide,
    SCROLLBAR_PADDING,
    scrollIntoView,
    ScrollMode,
    SidebarView,
    SpreadMode,
    TextLayerMode,
    UNKNOWN_SCALE,
    VERTICAL_PADDING,
    waitOnEventOrTimeout,
    WaitOnType,
    watchScroll,
  };
});
define('skylark-pdfjs-viewer/grab_to_pan',[],function(){
  /* Copyright 2013 Rob Wu <rob@robwu.nl>
   * https://github.com/Rob--W/grab-to-pan.js
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Construct a GrabToPan instance for a given HTML element.
   * @param options.element {Element}
   * @param options.ignoreTarget {function} optional. See `ignoreTarget(node)`
   * @param options.onActiveChanged {function(boolean)} optional. Called
   *  when grab-to-pan is (de)activated. The first argument is a boolean that
   *  shows whether grab-to-pan is activated.
   */
  function GrabToPan(options) {
    this.element = options.element;
    this.document = options.element.ownerDocument;
    if (typeof options.ignoreTarget === "function") {
      this.ignoreTarget = options.ignoreTarget;
    }
    this.onActiveChanged = options.onActiveChanged;

    // Bind the contexts to ensure that `this` always points to
    // the GrabToPan instance.
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.toggle = this.toggle.bind(this);
    this._onmousedown = this._onmousedown.bind(this);
    this._onmousemove = this._onmousemove.bind(this);
    this._endPan = this._endPan.bind(this);

    // This overlay will be inserted in the document when the mouse moves during
    // a grab operation, to ensure that the cursor has the desired appearance.
    const overlay = (this.overlay = document.createElement("div"));
    overlay.className = "grab-to-pan-grabbing";
  }
  GrabToPan.prototype = {
    /**
     * Class name of element which can be grabbed
     */
    CSS_CLASS_GRAB: "grab-to-pan-grab",

    /**
     * Bind a mousedown event to the element to enable grab-detection.
     */
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

    /**
     * Removes all events. Any pending pan session is immediately stopped.
     */
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

    /**
     * Whether to not pan if the target element is clicked.
     * Override this method to change the default behaviour.
     *
     * @param node {Element} The target of the event
     * @returns {boolean} Whether to not react to the click event.
     */
    ignoreTarget: function GrabToPan_ignoreTarget(node) {
      // Use matchesSelector to check whether the clicked element
      // is (a child of) an input element / link
      return node[matchesSelector](
        "a[href], a[href] *, input, textarea, button, button *, select, option"
      );
    },

    /**
     * @private
     */
    _onmousedown: function GrabToPan__onmousedown(event) {
      if (event.button !== 0 || this.ignoreTarget(event.target)) {
        return;
      }
      if (event.originalTarget) {
        try {
          // eslint-disable-next-line no-unused-expressions
          event.originalTarget.tagName;
        } catch (e) {
          // Mozilla-specific: element is a scrollbar (XUL element)
          return;
        }
      }

      this.scrollLeftStart = this.element.scrollLeft;
      this.scrollTopStart = this.element.scrollTop;
      this.clientXStart = event.clientX;
      this.clientYStart = event.clientY;
      this.document.addEventListener("mousemove", this._onmousemove, true);
      this.document.addEventListener("mouseup", this._endPan, true);
      // When a scroll event occurs before a mousemove, assume that the user
      // dragged a scrollbar (necessary for Opera Presto, Safari and IE)
      // (not needed for Chrome/Firefox)
      this.element.addEventListener("scroll", this._endPan, true);
      event.preventDefault();
      event.stopPropagation();

      const focusedElement = document.activeElement;
      if (focusedElement && !focusedElement.contains(event.target)) {
        focusedElement.blur();
      }
    },

    /**
     * @private
     */
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
          behavior: "instant",
        });
      } else {
        this.element.scrollTop = scrollTop;
        this.element.scrollLeft = scrollLeft;
      }
      if (!this.overlay.parentNode) {
        document.body.appendChild(this.overlay);
      }
    },

    /**
     * @private
     */
    _endPan: function GrabToPan__endPan() {
      this.element.removeEventListener("scroll", this._endPan, true);
      this.document.removeEventListener("mousemove", this._onmousemove, true);
      this.document.removeEventListener("mouseup", this._endPan, true);
      // Note: ChildNode.remove doesn't throw if the parentNode is undefined.
      this.overlay.remove();
    },
  };

  // Get the correct (vendor-prefixed) name of the matches method.
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
    return matchesSelector; // If found, then truthy, and [].some() ends.
  });

  // Browser sniffing because it's impossible to feature-detect
  // whether event.which for onmousemove is reliable
  const isNotIEorIsIE10plus = !document.documentMode || document.documentMode > 9;
  const chrome = window.chrome;
  const isChrome15OrOpera15plus = chrome && (chrome.webstore || chrome.app);
  //                                         ^ Chrome 15+       ^ Opera 15+
  const isSafari6plus =
    /Apple/.test(navigator.vendor) &&
    /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);

  /**
   * Whether the left mouse is not pressed.
   * @param event {MouseEvent}
   * @returns {boolean} True if the left mouse button is not pressed,
   *                    False if unsure or if the left mouse button is pressed.
   */
  function isLeftMouseReleased(event) {
    if ("buttons" in event && isNotIEorIsIE10plus) {
      // http://www.w3.org/TR/DOM-Level-3-Events/#events-MouseEvent-buttons
      // Firefox 15+
      // Internet Explorer 10+
      return !(event.buttons & 1);
    }
    if (isChrome15OrOpera15plus || isSafari6plus) {
      // Chrome 14+
      // Opera 15+
      // Safari 6.0+
      return event.which === 0;
    }
    return false;
  }

  return { GrabToPan };
});
define('skylark-pdfjs-viewer/pdf_cursor_tools',[
  "./ui_utils",
  "./grab_to_pan"
],function(ui_utils,grab_to_pan){
  /* Copyright 2017 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { GrabToPan } = grab_to_pan;
  const { PresentationModeState } = ui_utils;

  const CursorTool = {
    SELECT: 0, // The default value.
    HAND: 1,
    ZOOM: 2,
  };

  /**
   * @typedef {Object} PDFCursorToolsOptions
   * @property {HTMLDivElement} container - The document container.
   * @property {EventBus} eventBus - The application event bus.
   * @property {number} [cursorToolOnLoad] - The cursor tool that will be enabled
   *   on load; the constants from {CursorTool} should be used. The default value
   *   is `CursorTool.SELECT`.
   */

  class PDFCursorTools {
    /**
     * @param {PDFCursorToolsOptions} options
     */
    constructor({ container, eventBus, cursorToolOnLoad = CursorTool.SELECT }) {
      this.container = container;
      this.eventBus = eventBus;

      this.active = CursorTool.SELECT;
      this.activeBeforePresentationMode = null;

      this.handTool = new GrabToPan({
        element: this.container,
      });

      this._addEventListeners();

      // Defer the initial `switchTool` call, to give other viewer components
      // time to initialize *and* register 'cursortoolchanged' event listeners.
      Promise.resolve().then(() => {
        this.switchTool(cursorToolOnLoad);
      });
    }

    /**
     * @type {number} One of the values in {CursorTool}.
     */
    get activeTool() {
      return this.active;
    }

    /**
     * NOTE: This method is ignored while Presentation Mode is active.
     * @param {number} tool - The cursor mode that should be switched to,
     *                        must be one of the values in {CursorTool}.
     */
    switchTool(tool) {
      if (this.activeBeforePresentationMode !== null) {
        return; // Cursor tools cannot be used in Presentation Mode.
      }
      if (tool === this.active) {
        return; // The requested tool is already active.
      }

      const disableActiveTool = () => {
        switch (this.active) {
          case CursorTool.SELECT:
            break;
          case CursorTool.HAND:
            this.handTool.deactivate();
            break;
          case CursorTool.ZOOM:
          /* falls through */
        }
      };

      // Enable the new cursor tool.
      switch (tool) {
        case CursorTool.SELECT:
          disableActiveTool();
          break;
        case CursorTool.HAND:
          disableActiveTool();
          this.handTool.activate();
          break;
        case CursorTool.ZOOM:
        /* falls through */
        default:
          console.error(`switchTool: "${tool}" is an unsupported value.`);
          return;
      }
      // Update the active tool *after* it has been validated above,
      // in order to prevent setting it to an invalid state.
      this.active = tool;

      this._dispatchEvent();
    }

    /**
     * @private
     */
    _dispatchEvent() {
      this.eventBus.dispatch("cursortoolchanged", {
        source: this,
        tool: this.active,
      });
    }

    /**
     * @private
     */
    _addEventListeners() {
      this.eventBus._on("switchcursortool", evt => {
        this.switchTool(evt.tool);
      });

      this.eventBus._on("presentationmodechanged", evt => {
        switch (evt.state) {
          case PresentationModeState.CHANGING:
            break;
          case PresentationModeState.FULLSCREEN: {
            const previouslyActive = this.active;

            this.switchTool(CursorTool.SELECT);
            this.activeBeforePresentationMode = previouslyActive;
            break;
          }
          case PresentationModeState.NORMAL: {
            const previouslyActive = this.activeBeforePresentationMode;

            this.activeBeforePresentationMode = null;
            this.switchTool(previouslyActive);
            break;
          }
        }
      });
    }
  }

  return { CursorTool, PDFCursorTools };
});
define('skylark-pdfjs-viewer/pdf_rendering_queue',[
  "skylark-pdfjs-display"
],function(pdfjsLib){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { RenderingCancelledException } = pdfjsLib;

  const CLEANUP_TIMEOUT = 30000;

  const RenderingStates = {
    INITIAL: 0,
    RUNNING: 1,
    PAUSED: 2,
    FINISHED: 3,
  };

  /**
   * Controls rendering of the views for pages and thumbnails.
   */
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

    /**
     * @param {PDFViewer} pdfViewer
     */
    setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }

    /**
     * @param {PDFThumbnailViewer} pdfThumbnailViewer
     */
    setThumbnailViewer(pdfThumbnailViewer) {
      this.pdfThumbnailViewer = pdfThumbnailViewer;
    }

    /**
     * @param {IRenderableView} view
     * @returns {boolean}
     */
    isHighestPriority(view) {
      return this.highestPriorityPage === view.renderingId;
    }

    /**
     * @param {Object} currentlyVisiblePages
     */
    renderHighestPriority(currentlyVisiblePages) {
      if (this.idleTimeout) {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
      }

      // Pages have a higher priority than thumbnails, so check them first.
      if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
        return;
      }
      // No pages needed rendering, so check thumbnails.
      if (this.pdfThumbnailViewer && this.isThumbnailViewEnabled) {
        if (this.pdfThumbnailViewer.forceRendering()) {
          return;
        }
      }

      if (this.printing) {
        // If printing is currently ongoing do not reschedule cleanup.
        return;
      }

      if (this.onIdle) {
        this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
      }
    }

    /**
     * @param {Object} visible
     * @param {Array} views
     * @param {boolean} scrolledDown
     */
    getHighestPriority(visible, views, scrolledDown) {
      /**
       * The state has changed. Figure out which page has the highest priority to
       * render next (if any).
       *
       * Priority:
       * 1. visible pages
       * 2. if last scrolled down, the page after the visible pages, or
       *    if last scrolled up, the page before the visible pages
       */
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

      // All the visible views have rendered; try to render next/previous pages.
      if (scrolledDown) {
        const nextPageIndex = visible.last.id;
        // IDs start at 1, so no need to add 1.
        if (views[nextPageIndex] && !this.isViewFinished(views[nextPageIndex])) {
          return views[nextPageIndex];
        }
      } else {
        const previousPageIndex = visible.first.id - 2;
        if (
          views[previousPageIndex] &&
          !this.isViewFinished(views[previousPageIndex])
        ) {
          return views[previousPageIndex];
        }
      }
      // Everything that needs to be rendered has been.
      return null;
    }

    /**
     * @param {IRenderableView} view
     * @returns {boolean}
     */
    isViewFinished(view) {
      return view.renderingState === RenderingStates.FINISHED;
    }

    /**
     * Render a page or thumbnail view. This calls the appropriate function
     * based on the views state. If the view is already rendered it will return
     * `false`.
     *
     * @param {IRenderableView} view
     */
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
          view
            .draw()
            .finally(() => {
              this.renderHighestPriority();
            })
            .catch(reason => {
              if (reason instanceof RenderingCancelledException) {
                return;
              }
              console.error(`renderView: "${reason}"`);
            });
          break;
      }
      return true;
    }
  }

  return { 
    PDFRenderingQueue, 
    RenderingStates 
  };
});
define('skylark-pdfjs-viewer/overlay_manager',[],function(){
  /* Copyright 2014 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  class OverlayManager {
    constructor() {
      this._overlays = {};
      this._active = null;
      this._keyDownBound = this._keyDown.bind(this);
    }

    get active() {
      return this._active;
    }

    /**
     * @param {string} name - The name of the overlay that is registered.
     * @param {HTMLDivElement} element - The overlay's DOM element.
     * @param {function} [callerCloseMethod] - The method that, if present, calls
     *                   `OverlayManager.close` from the object registering the
     *                   overlay. Access to this method is necessary in order to
     *                   run cleanup code when e.g. the overlay is force closed.
     *                   The default is `null`.
     * @param {boolean} [canForceClose] - Indicates if opening the overlay closes
     *                  an active overlay. The default is `false`.
     * @returns {Promise} A promise that is resolved when the overlay has been
     *                    registered.
     */
    async register(
      name,
      element,
      callerCloseMethod = null,
      canForceClose = false
    ) {
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
        canForceClose,
      };
    }

    /**
     * @param {string} name - The name of the overlay that is unregistered.
     * @returns {Promise} A promise that is resolved when the overlay has been
     *                    unregistered.
     */
    async unregister(name) {
      if (!this._overlays[name]) {
        throw new Error("The overlay does not exist.");
      } else if (this._active === name) {
        throw new Error("The overlay cannot be removed while it is active.");
      }
      delete this._overlays[name];
    }

    /**
     * @param {string} name - The name of the overlay that should be opened.
     * @returns {Promise} A promise that is resolved when the overlay has been
     *                    opened.
     */
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

    /**
     * @param {string} name - The name of the overlay that should be closed.
     * @returns {Promise} A promise that is resolved when the overlay has been
     *                    closed.
     */
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

    /**
     * @private
     */
    _keyDown(evt) {
      if (this._active && evt.keyCode === /* Esc = */ 27) {
        this._closeThroughCaller();
        evt.preventDefault();
      }
    }

    /**
     * @private
     */
    _closeThroughCaller() {
      if (this._overlays[this._active].callerCloseMethod) {
        this._overlays[this._active].callerCloseMethod();
      }
      if (this._active) {
        this.close(this._active);
      }
    }
  }

  return { OverlayManager };
});
define('skylark-pdfjs-viewer/password_prompt',[
  "skylark-pdfjs-display",
  "./ui_utils"
],function(pdfjsLib,ui_utils){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { NullL10n } = ui_utils;
  const { PasswordResponses } = pdfjsLib;

  /**
   * @typedef {Object} PasswordPromptOptions
   * @property {string} overlayName - Name of the overlay for the overlay manager.
   * @property {HTMLDivElement} container - Div container for the overlay.
   * @property {HTMLParagraphElement} label - Label containing instructions for
   *                                          entering the password.
   * @property {HTMLInputElement} input - Input field for entering the password.
   * @property {HTMLButtonElement} submitButton - Button for submitting the
   *                                              password.
   * @property {HTMLButtonElement} cancelButton - Button for cancelling password
   *                                              entry.
   */

  class PasswordPrompt {
    /**
     * @param {PasswordPromptOptions} options
     * @param {OverlayManager} overlayManager - Manager for the viewer overlays.
     * @param {IL10n} l10n - Localization service.
     */
    constructor(options, overlayManager, l10n = NullL10n) {
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

      // Attach the event listeners.
      this.submitButton.addEventListener("click", this.verify.bind(this));
      this.cancelButton.addEventListener("click", this.close.bind(this));
      this.input.addEventListener("keydown", e => {
        if (e.keyCode === /* Enter = */ 13) {
          this.verify();
        }
      });

      this.overlayManager.register(
        this.overlayName,
        this.container,
        this.close.bind(this),
        true
      );
    }

    open() {
      this.overlayManager.open(this.overlayName).then(() => {
        this.input.focus();

        let promptString;
        if (this.reason === PasswordResponses.INCORRECT_PASSWORD) {
          promptString = this.l10n.get(
            "password_invalid",
            null,
            "Invalid password. Please try again."
          );
        } else {
          promptString = this.l10n.get(
            "password_label",
            null,
            "Enter the password to open this PDF file."
          );
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

  return { PasswordPrompt };
});
define('skylark-pdfjs-viewer/base_tree_viewer',[
  "skylark-pdfjs-display"
],function(pdfjsLib){

  /* Copyright 2020 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { removeNullCharacters } = pdfjsLib;

  const TREEITEM_OFFSET_TOP = -100; // px
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

      // Remove the tree from the DOM.
      this.container.textContent = "";
      // Ensure that the left (right in RTL locales) margin is always reset,
      // to prevent incorrect tree alignment if a new document is opened.
      this.container.classList.remove("treeWithDeepNesting");
    }

    /**
     * @private
     */
    _dispatchEvent(count) {
      throw new Error("Not implemented: _dispatchEvent");
    }

    /**
     * @private
     */
    _bindLink(element, params) {
      throw new Error("Not implemented: _bindLink");
    }

    /**
     * @private
     */
    _normalizeTextContent(str) {
      return removeNullCharacters(str) || /* en dash = */ "\u2013";
    }

    /**
     * Prepend a button before a tree item which allows the user to collapse or
     * expand all tree items at that level; see `_toggleTreeItem`.
     * @private
     */
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

    /**
     * Collapse or expand the subtree of a tree item.
     *
     * @param {Element} root - the root of the item (sub)tree.
     * @param {boolean} show - whether to show the item (sub)tree. If false,
     *   the item subtree rooted at `root` will be collapsed.
     * @private
     */
    _toggleTreeItem(root, show = false) {
      this._lastToggleIsShow = show;
      for (const toggler of root.querySelectorAll(".treeItemToggler")) {
        toggler.classList.toggle("treeItemsHidden", !show);
      }
    }

    /**
     * Collapse or expand all subtrees of the `container`.
     * @private
     */
    _toggleAllTreeItems() {
      this._toggleTreeItem(this.container, !this._lastToggleIsShow);
    }

    /**
     * @private
     */
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

    /**
     * @private
     */
    _updateCurrentTreeItem(treeItem = null) {
      if (this._currentTreeItem) {
        // Ensure that the current treeItem-selection is always removed.
        this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS);
        this._currentTreeItem = null;
      }
      if (treeItem) {
        treeItem.classList.add(TREEITEM_SELECTED_CLASS);
        this._currentTreeItem = treeItem;
      }
    }

    /**
     * @private
     */
    _scrollToCurrentTreeItem(treeItem) {
      if (!treeItem) {
        return;
      }
      // Ensure that the treeItem is *fully* expanded, such that it will first of
      // all be visible and secondly that scrolling it into view works correctly.
      let currentNode = treeItem.parentNode;
      while (currentNode && currentNode !== this.container) {
        if (currentNode.classList.contains("treeItem")) {
          const toggler = currentNode.firstElementChild;
          ///toggler?.classList.remove("treeItemsHidden"); // lwf
          toggler && toggler.classList.remove("treeItemsHidden");
        }
        currentNode = currentNode.parentNode;
      }
      this._updateCurrentTreeItem(treeItem);

      this.container.scrollTo(
        treeItem.offsetLeft,
        treeItem.offsetTop + TREEITEM_OFFSET_TOP
      );
    }
  }

  return { BaseTreeViewer };
});
define('skylark-pdfjs-viewer/pdf_attachment_viewer',[
  "skylark-pdfjs-display",
  "./pdfjs_dev",
  "./base_tree_viewer",
  "./viewer_compatibility"
],function(
  pdfjsLib,
  PDFJSDev,
  base_tree_viewer,
  viewer_compatibility
){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { createPromiseCapability, getFilenameFromUrl } = pdfjsLib;
  const { BaseTreeViewer } = base_tree_viewer;
  const { viewerCompatibilityParams } = viewer_compatibility;

  const PdfFileRegExp = /\.pdf$/i;

  /**
   * @typedef {Object} PDFAttachmentViewerOptions
   * @property {HTMLDivElement} container - The viewer element.
   * @property {EventBus} eventBus - The application event bus.
   * @property {DownloadManager} downloadManager - The download manager.
   */

  /**
   * @typedef {Object} PDFAttachmentViewerRenderParameters
   * @property {Object|null} attachments - A lookup table of attachment objects.
   */

  class PDFAttachmentViewer extends BaseTreeViewer {
    /**
     * @param {PDFAttachmentViewerOptions} options
     */
    constructor(options) {
      super(options);
      this.downloadManager = options.downloadManager;

      this.eventBus._on(
        "fileattachmentannotation",
        this._appendAttachment.bind(this)
      );
    }

    reset(keepRenderedCapability = false) {
      super.reset();
      this._attachments = null;

      if (!keepRenderedCapability) {
        // The only situation in which the `_renderedCapability` should *not* be
        // replaced is when appending FileAttachment annotations.
        this._renderedCapability = createPromiseCapability();
      }
      if (this._pendingDispatchEvent) {
        clearTimeout(this._pendingDispatchEvent);
      }
      this._pendingDispatchEvent = null;
    }

    /**
     * @private
     */
    _dispatchEvent(attachmentsCount) {
      this._renderedCapability.resolve();

      if (this._pendingDispatchEvent) {
        clearTimeout(this._pendingDispatchEvent);
        this._pendingDispatchEvent = null;
      }
      if (attachmentsCount === 0) {
        // Delay the event when no "regular" attachments exist, to allow time for
        // parsing of any FileAttachment annotations that may be present on the
        // *initially* rendered page; this reduces the likelihood of temporarily
        // disabling the attachmentsView when the `PDFSidebar` handles the event.
        this._pendingDispatchEvent = setTimeout(() => {
          this.eventBus.dispatch("attachmentsloaded", {
            source: this,
            attachmentsCount: 0,
          });
          this._pendingDispatchEvent = null;
        });
        return;
      }

      this.eventBus.dispatch("attachmentsloaded", {
        source: this,
        attachmentsCount,
      });
    }

    /**
     * NOTE: Should only be used when `URL.createObjectURL` is natively supported.
     * @private
     */
    _bindPdfLink(element, { content, filename }) {
      let blobUrl;
      element.onclick = () => {
        if (!blobUrl) {
          blobUrl = URL.createObjectURL(
            new Blob([content], { type: "application/pdf" })
          );
        }
        let viewerUrl;
        if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
          // The current URL is the viewer, let's use it and append the file.
          viewerUrl = "?file=" + encodeURIComponent(blobUrl + "#" + filename);
        } else if (PDFJSDev.test("MOZCENTRAL")) {
          // Let Firefox's content handler catch the URL and display the PDF.
          viewerUrl = blobUrl + "#filename=" + encodeURIComponent(filename);
        } else if (PDFJSDev.test("CHROME")) {
          // In the Chrome extension, the URL is rewritten using the history API
          // in viewer.js, so an absolute URL must be generated.
          viewerUrl =
            // eslint-disable-next-line no-undef
            chrome.runtime.getURL("/content/web/viewer.html") +
            "?file=" +
            encodeURIComponent(blobUrl + "#" + filename);
        }
        try {
          window.open(viewerUrl);
        } catch (ex) {
          console.error(`_bindPdfLink: ${ex}`);
          // Release the `blobUrl`, since opening it failed...
          URL.revokeObjectURL(blobUrl);
          blobUrl = null;
          // ... and fallback to downloading the PDF file.
          this.downloadManager.downloadData(content, filename, "application/pdf");
        }
        return false;
      };
    }

    /**
     * @private
     */
    _bindLink(element, { content, filename }) {
      element.onclick = () => {
        const contentType = PdfFileRegExp.test(filename) ? "application/pdf" : "";
        this.downloadManager.downloadData(content, filename, contentType);
        return false;
      };
    }

    /**
     * @param {PDFAttachmentViewerRenderParameters} params
     */
    render({ attachments, keepRenderedCapability = false }) {
      if (this._attachments) {
        this.reset(keepRenderedCapability);
      }
      this._attachments = attachments || null;

      if (!attachments) {
        this._dispatchEvent(/* attachmentsCount = */ 0);
        return;
      }
      const names = Object.keys(attachments).sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      const fragment = document.createDocumentFragment();
      let attachmentsCount = 0;
      for (const name of names) {
        const item = attachments[name];
        const filename = getFilenameFromUrl(item.filename);

        const div = document.createElement("div");
        div.className = "treeItem";

        const element = document.createElement("a");
        if (
          PdfFileRegExp.test(filename) &&
          !viewerCompatibilityParams.disableCreateObjectURL
        ) {
          this._bindPdfLink(element, { content: item.content, filename });
        } else {
          this._bindLink(element, { content: item.content, filename });
        }
        element.textContent = this._normalizeTextContent(filename);

        div.appendChild(element);

        fragment.appendChild(div);
        attachmentsCount++;
      }

      this._finishRendering(fragment, attachmentsCount);
    }

    /**
     * Used to append FileAttachment annotations to the sidebar.
     * @private
     */
    _appendAttachment({ id, filename, content }) {
      const renderedPromise = this._renderedCapability.promise;

      renderedPromise.then(() => {
        if (renderedPromise !== this._renderedCapability.promise) {
          return; // The FileAttachment annotation belongs to a previous document.
        }
        let attachments = this._attachments;

        if (!attachments) {
          attachments = Object.create(null);
        } else {
          for (const name in attachments) {
            if (id === name) {
              return; // Ignore the new attachment if it already exists.
            }
          }
        }
        attachments[id] = {
          filename,
          content,
        };
        this.render({
          attachments,
          keepRenderedCapability: true,
        });
      });
    }
  }

  return { PDFAttachmentViewer };
});
define('skylark-pdfjs-viewer/pdf_document_properties',[
  "skylark-pdfjs-display",
  "./ui_utils"
],function(pdfjsLib,ui_utils){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { createPromiseCapability, PDFDateString } = pdfjsLib;
  const {
    getPageSizeInches,
    getPDFFileNameFromURL,
    isPortraitOrientation,
    NullL10n,
  } = ui_utils;

  const DEFAULT_FIELD_CONTENT = "-";

  // See https://en.wikibooks.org/wiki/Lentis/Conversion_to_the_Metric_Standard_in_the_United_States
  const NON_METRIC_LOCALES = ["en-us", "en-lr", "my"];

  // Should use the format: `width x height`, in portrait orientation.
  // See https://en.wikipedia.org/wiki/Paper_size
  const US_PAGE_NAMES = {
    "8.5x11": "Letter",
    "8.5x14": "Legal",
  };
  const METRIC_PAGE_NAMES = {
    "297x420": "A3",
    "210x297": "A4",
  };

  function getPageName(size, isPortrait, pageNames) {
    const width = isPortrait ? size.width : size.height;
    const height = isPortrait ? size.height : size.width;

    return pageNames[`${width}x${height}`];
  }

  /**
   * @typedef {Object} PDFDocumentPropertiesOptions
   * @property {string} overlayName - Name/identifier for the overlay.
   * @property {Object} fields - Names and elements of the overlay's fields.
   * @property {HTMLDivElement} container - Div container for the overlay.
   * @property {HTMLButtonElement} closeButton - Button for closing the overlay.
   */

  class PDFDocumentProperties {
    /**
     * @param {PDFDocumentPropertiesOptions} options
     * @param {OverlayManager} overlayManager - Manager for the viewer overlays.
     * @param {EventBus} eventBus - The application event bus.
     * @param {IL10n} l10n - Localization service.
     */
    constructor(
      { overlayName, fields, container, closeButton },
      overlayManager,
      eventBus,
      l10n = NullL10n
    ) {
      this.overlayName = overlayName;
      this.fields = fields;
      this.container = container;
      this.overlayManager = overlayManager;
      this.l10n = l10n;

      this._reset();
      // Bind the event listener for the Close button.
      closeButton.addEventListener("click", this.close.bind(this));

      this.overlayManager.register(
        this.overlayName,
        this.container,
        this.close.bind(this)
      );

      eventBus._on("pagechanging", evt => {
        this._currentPageNumber = evt.pageNumber;
      });
      eventBus._on("rotationchanging", evt => {
        this._pagesRotation = evt.pagesRotation;
      });

      this._isNonMetricLocale = true; // The default viewer locale is 'en-us'.
      l10n.getLanguage().then(locale => {
        this._isNonMetricLocale = NON_METRIC_LOCALES.includes(locale);
      });
    }

    /**
     * Open the document properties overlay.
     */
    async open() {
      const freezeFieldData = data => {
        Object.defineProperty(this, "fieldData", {
          value: Object.freeze(data),
          writable: false,
          enumerable: true,
          configurable: true,
        });
      };

      await Promise.all([
        this.overlayManager.open(this.overlayName),
        this._dataAvailableCapability.promise,
      ]);
      const currentPageNumber = this._currentPageNumber;
      const pagesRotation = this._pagesRotation;

      // If the document properties were previously fetched (for this PDF file),
      // just update the dialog immediately to avoid redundant lookups.
      if (
        this.fieldData &&
        currentPageNumber === this.fieldData._currentPageNumber &&
        pagesRotation === this.fieldData._pagesRotation
      ) {
        this._updateUI();
        return;
      }

      // Get the document properties.
      const {
        info,
        /* metadata, */
        contentDispositionFilename,
        contentLength,
      } = await this.pdfDocument.getMetadata();

      const [
        fileName,
        fileSize,
        creationDate,
        modificationDate,
        pageSize,
        isLinearized,
      ] = await Promise.all([
        contentDispositionFilename || getPDFFileNameFromURL(this.url),
        this._parseFileSize(contentLength),
        this._parseDate(info.CreationDate),
        this._parseDate(info.ModDate),
        this.pdfDocument.getPage(currentPageNumber).then(pdfPage => {
          return this._parsePageSize(getPageSizeInches(pdfPage), pagesRotation);
        }),
        this._parseLinearization(info.IsLinearized),
      ]);

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
        _pagesRotation: pagesRotation,
      });
      this._updateUI();

      // Get the correct fileSize, since it may not have been available
      // or could potentially be wrong.
      const { length } = await this.pdfDocument.getDownloadInfo();
      if (contentLength === length) {
        return; // The fileSize has already been correctly set.
      }
      const data = Object.assign(Object.create(null), this.fieldData);
      data.fileSize = await this._parseFileSize(length);

      freezeFieldData(data);
      this._updateUI();
    }

    /**
     * Close the document properties overlay.
     */
    close() {
      this.overlayManager.close(this.overlayName);
    }

    /**
     * Set a reference to the PDF document and the URL in order
     * to populate the overlay fields with the document properties.
     * Note that the overlay will contain no information if this method
     * is not called.
     *
     * @param {PDFDocumentProxy} pdfDocument - A reference to the PDF document.
     * @param {string} url - The URL of the document.
     */
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

    /**
     * @private
     */
    _reset() {
      this.pdfDocument = null;
      this.url = null;

      delete this.fieldData;
      this._dataAvailableCapability = createPromiseCapability();
      this._currentPageNumber = 1;
      this._pagesRotation = 0;
    }

    /**
     * Always updates all of the dialog fields, to prevent inconsistent UI state.
     * NOTE: If the contents of a particular field is neither a non-empty string,
     *       nor a number, it will fall back to `DEFAULT_FIELD_CONTENT`.
     * @private
     */
    _updateUI(reset = false) {
      if (reset || !this.fieldData) {
        for (const id in this.fields) {
          this.fields[id].textContent = DEFAULT_FIELD_CONTENT;
        }
        return;
      }
      if (this.overlayManager.active !== this.overlayName) {
        // Don't bother updating the dialog if has already been closed,
        // since it will be updated the next time `this.open` is called.
        return;
      }
      for (const id in this.fields) {
        const content = this.fieldData[id];
        this.fields[id].textContent =
          content || content === 0 ? content : DEFAULT_FIELD_CONTENT;
      }
    }

    /**
     * @private
     */
    async _parseFileSize(fileSize = 0) {
      const kb = fileSize / 1024;
      if (!kb) {
        return undefined;
      } else if (kb < 1024) {
        return this.l10n.get(
          "document_properties_kb",
          {
            size_kb: (+kb.toPrecision(3)).toLocaleString(),
            size_b: fileSize.toLocaleString(),
          },
          "{{size_kb}} KB ({{size_b}} bytes)"
        );
      }
      return this.l10n.get(
        "document_properties_mb",
        {
          size_mb: (+(kb / 1024).toPrecision(3)).toLocaleString(),
          size_b: fileSize.toLocaleString(),
        },
        "{{size_mb}} MB ({{size_b}} bytes)"
      );
    }

    /**
     * @private
     */
    async _parsePageSize(pageSizeInches, pagesRotation) {
      if (!pageSizeInches) {
        return undefined;
      }
      // Take the viewer rotation into account as well; compare with Adobe Reader.
      if (pagesRotation % 180 !== 0) {
        pageSizeInches = {
          width: pageSizeInches.height,
          height: pageSizeInches.width,
        };
      }
      const isPortrait = isPortraitOrientation(pageSizeInches);

      let sizeInches = {
        width: Math.round(pageSizeInches.width * 100) / 100,
        height: Math.round(pageSizeInches.height * 100) / 100,
      };
      // 1in == 25.4mm; no need to round to 2 decimals for millimeters.
      let sizeMillimeters = {
        width: Math.round(pageSizeInches.width * 25.4 * 10) / 10,
        height: Math.round(pageSizeInches.height * 25.4 * 10) / 10,
      };

      let pageName = null;
      let rawName =
        getPageName(sizeInches, isPortrait, US_PAGE_NAMES) ||
        getPageName(sizeMillimeters, isPortrait, METRIC_PAGE_NAMES);

      if (
        !rawName &&
        !(
          Number.isInteger(sizeMillimeters.width) &&
          Number.isInteger(sizeMillimeters.height)
        )
      ) {
        // Attempt to improve the page name detection by falling back to fuzzy
        // matching of the metric dimensions, to account for e.g. rounding errors
        // and/or PDF files that define the page sizes in an imprecise manner.
        const exactMillimeters = {
          width: pageSizeInches.width * 25.4,
          height: pageSizeInches.height * 25.4,
        };
        const intMillimeters = {
          width: Math.round(sizeMillimeters.width),
          height: Math.round(sizeMillimeters.height),
        };

        // Try to avoid false positives, by only considering "small" differences.
        if (
          Math.abs(exactMillimeters.width - intMillimeters.width) < 0.1 &&
          Math.abs(exactMillimeters.height - intMillimeters.height) < 0.1
        ) {
          rawName = getPageName(intMillimeters, isPortrait, METRIC_PAGE_NAMES);
          if (rawName) {
            // Update *both* sizes, computed above, to ensure that the displayed
            // dimensions always correspond to the detected page name.
            sizeInches = {
              width: Math.round((intMillimeters.width / 25.4) * 100) / 100,
              height: Math.round((intMillimeters.height / 25.4) * 100) / 100,
            };
            sizeMillimeters = intMillimeters;
          }
        }
      }
      if (rawName) {
        pageName = this.l10n.get(
          "document_properties_page_size_name_" + rawName.toLowerCase(),
          null,
          rawName
        );
      }

      return Promise.all([
        this._isNonMetricLocale ? sizeInches : sizeMillimeters,
        this.l10n.get(
          "document_properties_page_size_unit_" +
            (this._isNonMetricLocale ? "inches" : "millimeters"),
          null,
          this._isNonMetricLocale ? "in" : "mm"
        ),
        pageName,
        this.l10n.get(
          "document_properties_page_size_orientation_" +
            (isPortrait ? "portrait" : "landscape"),
          null,
          isPortrait ? "portrait" : "landscape"
        ),
      ]).then(([{ width, height }, unit, name, orientation]) => {
        return this.l10n.get(
          "document_properties_page_size_dimension_" +
            (name ? "name_" : "") +
            "string",
          {
            width: width.toLocaleString(),
            height: height.toLocaleString(),
            unit,
            name,
            orientation,
          },
          "{{width}} × {{height}} {{unit}} (" +
            (name ? "{{name}}, " : "") +
            "{{orientation}})"
        );
      });
    }

    /**
     * @private
     */
    async _parseDate(inputDate) {
      const dateObject = PDFDateString.toDateObject(inputDate);
      if (!dateObject) {
        return undefined;
      }
      return this.l10n.get(
        "document_properties_date_string",
        {
          date: dateObject.toLocaleDateString(),
          time: dateObject.toLocaleTimeString(),
        },
        "{{date}}, {{time}}"
      );
    }

    /**
     * @private
     */
    _parseLinearization(isLinearized) {
      return this.l10n.get(
        "document_properties_linearized_" + (isLinearized ? "yes" : "no"),
        null,
        isLinearized ? "Yes" : "No"
      );
    }
  }

  return { PDFDocumentProperties };
});
define('skylark-pdfjs-viewer/pdf_find_utils',[],function(){
  /* Copyright 2018 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const CharacterType = {
    SPACE: 0,
    ALPHA_LETTER: 1,
    PUNCT: 2,
    HAN_LETTER: 3,
    KATAKANA_LETTER: 4,
    HIRAGANA_LETTER: 5,
    HALFWIDTH_KATAKANA_LETTER: 6,
    THAI_LETTER: 7,
  };

  function isAlphabeticalScript(charCode) {
    return charCode < 0x2e80;
  }

  function isAscii(charCode) {
    return (charCode & 0xff80) === 0;
  }

  function isAsciiAlpha(charCode) {
    return (
      (charCode >= /* a = */ 0x61 && charCode <= /* z = */ 0x7a) ||
      (charCode >= /* A = */ 0x41 && charCode <= /* Z = */ 0x5a)
    );
  }

  function isAsciiDigit(charCode) {
    return charCode >= /* 0 = */ 0x30 && charCode <= /* 9 = */ 0x39;
  }

  function isAsciiSpace(charCode) {
    return (
      charCode === /* SPACE = */ 0x20 ||
      charCode === /* TAB = */ 0x09 ||
      charCode === /* CR = */ 0x0d ||
      charCode === /* LF = */ 0x0a
    );
  }

  function isHan(charCode) {
    return (
      (charCode >= 0x3400 && charCode <= 0x9fff) ||
      (charCode >= 0xf900 && charCode <= 0xfaff)
    );
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

  /**
   * This function is based on the word-break detection implemented in:
   * https://hg.mozilla.org/mozilla-central/file/tip/intl/lwbrk/WordBreaker.cpp
   */
  function getCharacterType(charCode) {
    if (isAlphabeticalScript(charCode)) {
      if (isAscii(charCode)) {
        if (isAsciiSpace(charCode)) {
          return CharacterType.SPACE;
        } else if (
          isAsciiAlpha(charCode) ||
          isAsciiDigit(charCode) ||
          charCode === /* UNDERSCORE = */ 0x5f
        ) {
          return CharacterType.ALPHA_LETTER;
        }
        return CharacterType.PUNCT;
      } else if (isThai(charCode)) {
        return CharacterType.THAI_LETTER;
      } else if (charCode === /* NBSP = */ 0xa0) {
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

  return { CharacterType, getCharacterType };
});
define('skylark-pdfjs-viewer/pdf_find_controller',[
  "skylark-pdfjs-display",
  "./ui_utils",
  "./pdf_find_utils"
],function(pdfjsLib,ui_utils,pdf_find_utils){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { createPromiseCapability } = pdfjsLib;
  const { getCharacterType } = pdf_find_utils;
  const { scrollIntoView } = ui_utils;

  const FindState = {
    FOUND: 0,
    NOT_FOUND: 1,
    WRAPPED: 2,
    PENDING: 3,
  };

  const FIND_TIMEOUT = 250; // ms
  const MATCH_SCROLL_OFFSET_TOP = -50; // px
  const MATCH_SCROLL_OFFSET_LEFT = -400; // px

  const CHARACTERS_TO_NORMALIZE = {
    "\u2018": "'", // Left single quotation mark
    "\u2019": "'", // Right single quotation mark
    "\u201A": "'", // Single low-9 quotation mark
    "\u201B": "'", // Single high-reversed-9 quotation mark
    "\u201C": '"', // Left double quotation mark
    "\u201D": '"', // Right double quotation mark
    "\u201E": '"', // Double low-9 quotation mark
    "\u201F": '"', // Double high-reversed-9 quotation mark
    "\u00BC": "1/4", // Vulgar fraction one quarter
    "\u00BD": "1/2", // Vulgar fraction one half
    "\u00BE": "3/4", // Vulgar fraction three quarters
  };

  let normalizationRegex = null;
  function normalize(text) {
    if (!normalizationRegex) {
      // Compile the regular expression for text normalization once.
      const replace = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
      normalizationRegex = new RegExp(`[${replace}]`, "g");
    }
    let diffs = null;
    const normalizedText = text.replace(normalizationRegex, function (ch, index) {
      const normalizedCh = CHARACTERS_TO_NORMALIZE[ch],
        diff = normalizedCh.length - ch.length;
      if (diff !== 0) {
        ///(diffs ||= []).push([index, diff]); // lwf
        (diffs || (diffs = [])).push([index, diff]);
      }
      return normalizedCh;
    });

    return [normalizedText, diffs];
  }

  // Determine the original, non-normalized, match index such that highlighting of
  // search results is correct in the `textLayer` for strings containing e.g. "½"
  // characters; essentially "inverting" the result of the `normalize` function.
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

  /**
   * @typedef {Object} PDFFindControllerOptions
   * @property {IPDFLinkService} linkService - The navigation/linking service.
   * @property {EventBus} eventBus - The application event bus.
   */

  /**
   * Provides search functionality to find a given string in a PDF document.
   */
  class PDFFindController {
    /**
     * @param {PDFFindControllerOptions} options
     */
    constructor({ linkService, eventBus }) {
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

    /**
     * Set a reference to the PDF document in order to search it.
     * Note that searching is not possible if this method is not called.
     *
     * @param {PDFDocumentProxy} pdfDocument - The PDF document to search.
     */
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
        // If the document was closed before searching began, or if the search
        // operation was relevant for a previously opened document, do nothing.
        if (
          !this._pdfDocument ||
          (pdfDocument && this._pdfDocument !== pdfDocument)
        ) {
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
          // Trigger the find action with a small delay to avoid starting the
          // search when the user is still typing (saving resources).
          this._findTimeout = setTimeout(() => {
            this._nextMatch();
            this._findTimeout = null;
          }, FIND_TIMEOUT);
        } else if (this._dirtyMatch) {
          // Immediately trigger searching for non-'find' operations, when the
          // current state needs to be reset and matches re-calculated.
          this._nextMatch();
        } else if (cmd === "findagain") {
          this._nextMatch();

          // When the findbar was previously closed, and `highlightAll` is set,
          // ensure that the matches on all active pages are highlighted again.
          if (findbarClosed && this._state.highlightAll) {
            this._updateAllPages();
          }
        } else if (cmd === "findhighlightallchange") {
          // If there was a pending search operation, synchronously trigger a new
          // search *first* to ensure that the correct matches are highlighted.
          if (pendingTimeout) {
            this._nextMatch();
          } else {
            this._highlightMatches = true;
          }
          this._updateAllPages(); // Update the highlighting on all active pages.
        } else {
          this._nextMatch();
        }
      });
    }

    scrollMatchIntoView({ element = null, pageIndex = -1, matchIndex = -1 }) {
      if (!this._scrollMatches || !element) {
        return;
      } else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx) {
        return;
      } else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
        return;
      }
      this._scrollMatches = false; // Ensure that scrolling only happens once.

      const spot = {
        top: MATCH_SCROLL_OFFSET_TOP,
        left: MATCH_SCROLL_OFFSET_LEFT,
      };
      scrollIntoView(element, spot, /* skipOverflowHiddenElements = */ true);
    }

    _reset() {
      this._highlightMatches = false;
      this._scrollMatches = false;
      this._pdfDocument = null;
      this._pageMatches = [];
      this._pageMatchesLength = [];
      this._state = null;
      // Currently selected match.
      this._selected = {
        pageIdx: -1,
        matchIdx: -1,
      };
      // Where the find algorithm currently is in the document.
      this._offset = {
        pageIdx: null,
        matchIdx: null,
        wrapped: false,
      };
      this._extractTextPromises = [];
      this._pageContents = []; // Stores the normalized text for each page.
      this._pageDiffs = [];
      this._matchesCountTotal = 0;
      this._pagesToSearch = null;
      this._pendingFindMatches = Object.create(null);
      this._resumePageIdx = null;
      this._dirtyMatch = false;
      clearTimeout(this._findTimeout);
      this._findTimeout = null;

      this._firstPageCapability = createPromiseCapability();
    }

    /**
     * @type {string} The (current) normalized search query.
     */
    get _query() {
      if (this._state.query !== this._rawQuery) {
        this._rawQuery = this._state.query;
        [this._normalizedQuery] = normalize(this._state.query);
      }
      return this._normalizedQuery;
    }

    _shouldDirtyMatch(cmd, state) {
      // When the search query changes, regardless of the actual search command
      // used, always re-calculate matches to avoid errors (fixes bug 1030622).
      if (state.query !== this._state.query) {
        return true;
      }
      switch (cmd) {
        case "findagain":
          const pageNumber = this._selected.pageIdx + 1;
          const linkService = this._linkService;
          // Only treat a 'findagain' event as a new search operation when it's
          // *absolutely* certain that the currently selected match is no longer
          // visible, e.g. as a result of the user scrolling in the document.
          //
          // NOTE: If only a simple `this._linkService.page` check was used here,
          // there's a risk that consecutive 'findagain' operations could "skip"
          // over matches at the top/bottom of pages thus making them completely
          // inaccessible when there's multiple pages visible in the viewer.
          if (
            pageNumber >= 1 &&
            pageNumber <= linkService.pagesCount &&
            pageNumber !== linkService.page &&
            !linkService.isPageVisible(pageNumber)
          ) {
            return true;
          }
          return false;
        case "findhighlightallchange":
          return false;
      }
      return true;
    }

    /**
     * Helper for multi-term search that fills the `matchesWithLength` array
     * and handles cases where one search term includes another search term (for
     * example, "tamed tame" or "this is"). It looks for intersecting terms in
     * the `matches` and keeps elements with a longer match length.
     */
    _prepareMatches(matchesWithLength, matches, matchesLength) {
      function isSubTerm(currentIndex) {
        const currentElem = matchesWithLength[currentIndex];
        const nextElem = matchesWithLength[currentIndex + 1];

        // Check for cases like "TAMEd TAME".
        if (
          currentIndex < matchesWithLength.length - 1 &&
          currentElem.match === nextElem.match
        ) {
          currentElem.skipped = true;
          return true;
        }

        // Check for cases like "thIS IS".
        for (let i = currentIndex - 1; i >= 0; i--) {
          const prevElem = matchesWithLength[i];
          if (prevElem.skipped) {
            continue;
          }
          if (prevElem.match + prevElem.matchLength < currentElem.match) {
            break;
          }
          if (
            prevElem.match + prevElem.matchLength >=
            currentElem.match + currentElem.matchLength
          ) {
            currentElem.skipped = true;
            return true;
          }
        }
        return false;
      }

      // Sort the array of `{ match: <match>, matchLength: <matchLength> }`
      // objects on increasing index first and on the length otherwise.
      matchesWithLength.sort(function (a, b) {
        return a.match === b.match
          ? a.matchLength - b.matchLength
          : a.match - b.match;
      });
      for (let i = 0, len = matchesWithLength.length; i < len; i++) {
        if (isSubTerm(i)) {
          continue;
        }
        matches.push(matchesWithLength[i].match);
        matchesLength.push(matchesWithLength[i].matchLength);
      }
    }

    /**
     * Determine if the search query constitutes a "whole word", by comparing the
     * first/last character type with the preceding/following character type.
     */
    _isEntireWord(content, startIdx, length) {
      if (startIdx > 0) {
        const first = content.charCodeAt(startIdx);
        const limit = content.charCodeAt(startIdx - 1);
        if (getCharacterType(first) === getCharacterType(limit)) {
          return false;
        }
      }
      const endIdx = startIdx + length - 1;
      if (endIdx < content.length - 1) {
        const last = content.charCodeAt(endIdx);
        const limit = content.charCodeAt(endIdx + 1);
        if (getCharacterType(last) === getCharacterType(limit)) {
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
          originalQueryLen =
            getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;

        matches.push(originalMatchIdx);
        matchesLength.push(originalQueryLen);
      }
      this._pageMatches[pageIndex] = matches;
      this._pageMatchesLength[pageIndex] = matchesLength;
    }

    _calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord) {
      const matchesWithLength = [];

      // Divide the query into pieces and search for text in each piece.
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
          if (
            entireWord &&
            !this._isEntireWord(pageContent, matchIdx, subqueryLen)
          ) {
            continue;
          }
          const originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
            matchEnd = matchIdx + subqueryLen - 1,
            originalQueryLen =
              getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;

          // Other searches do not, so we store the length.
          matchesWithLength.push({
            match: originalMatchIdx,
            matchLength: originalQueryLen,
            skipped: false,
          });
        }
      }

      // Prepare arrays for storing the matches.
      this._pageMatchesLength[pageIndex] = [];
      this._pageMatches[pageIndex] = [];

      // Sort `matchesWithLength`, remove intersecting terms and put the result
      // into the two arrays.
      this._prepareMatches(
        matchesWithLength,
        this._pageMatches[pageIndex],
        this._pageMatchesLength[pageIndex]
      );
    }

    _calculateMatch(pageIndex) {
      let pageContent = this._pageContents[pageIndex];
      const pageDiffs = this._pageDiffs[pageIndex];
      let query = this._query;
      const { caseSensitive, entireWord, phraseSearch } = this._state;

      if (query.length === 0) {
        // Do nothing: the matches should be wiped out already.
        return;
      }

      if (!caseSensitive) {
        pageContent = pageContent.toLowerCase();
        query = query.toLowerCase();
      }

      if (phraseSearch) {
        this._calculatePhraseMatch(
          query,
          pageIndex,
          pageContent,
          pageDiffs,
          entireWord
        );
      } else {
        this._calculateWordMatch(
          query,
          pageIndex,
          pageContent,
          pageDiffs,
          entireWord
        );
      }

      // When `highlightAll` is set, ensure that the matches on previously
      // rendered (and still active) pages are correctly highlighted.
      if (this._state.highlightAll) {
        this._updatePage(pageIndex);
      }
      if (this._resumePageIdx === pageIndex) {
        this._resumePageIdx = null;
        this._nextPageMatch();
      }

      // Update the match count.
      const pageMatchesCount = this._pageMatches[pageIndex].length;
      if (pageMatchesCount > 0) {
        this._matchesCountTotal += pageMatchesCount;
        this._updateUIResultsCount();
      }
    }

    _extractText() {
      // Perform text extraction once if this method is called multiple times.
      if (this._extractTextPromises.length > 0) {
        return;
      }

      let promise = Promise.resolve();
      for (let i = 0, ii = this._linkService.pagesCount; i < ii; i++) {
        const extractTextCapability = createPromiseCapability();
        this._extractTextPromises[i] = extractTextCapability.promise;

        promise = promise.then(() => {
          return this._pdfDocument
            .getPage(i + 1)
            .then(pdfPage => {
              return pdfPage.getTextContent({
                normalizeWhitespace: true,
              });
            })
            .then(
              textContent => {
                const textItems = textContent.items;
                const strBuf = [];

                for (let j = 0, jj = textItems.length; j < jj; j++) {
                  strBuf.push(textItems[j].str);
                }

                // Store the normalized page content (text items) as one string.
                [this._pageContents[i], this._pageDiffs[i]] = normalize(
                  strBuf.join("")
                );
                extractTextCapability.resolve(i);
              },
              reason => {
                console.error(
                  `Unable to get text content for page ${i + 1}`,
                  reason
                );
                // Page error -- assuming no text content.
                this._pageContents[i] = "";
                this._pageDiffs[i] = null;
                extractTextCapability.resolve(i);
              }
            );
        });
      }
    }

    _updatePage(index) {
      if (this._scrollMatches && this._selected.pageIdx === index) {
        // If the page is selected, scroll the page into view, which triggers
        // rendering the page, which adds the text layer. Once the text layer
        // is built, it will attempt to scroll the selected match into view.
        this._linkService.page = index + 1;
      }

      this._eventBus.dispatch("updatetextlayermatches", {
        source: this,
        pageIndex: index,
      });
    }

    _updateAllPages() {
      this._eventBus.dispatch("updatetextlayermatches", {
        source: this,
        pageIndex: -1,
      });
    }

    _nextMatch() {
      const previous = this._state.findPrevious;
      const currentPageIndex = this._linkService.page - 1;
      const numPages = this._linkService.pagesCount;

      this._highlightMatches = true;

      if (this._dirtyMatch) {
        // Need to recalculate the matches, reset everything.
        this._dirtyMatch = false;
        this._selected.pageIdx = this._selected.matchIdx = -1;
        this._offset.pageIdx = currentPageIndex;
        this._offset.matchIdx = null;
        this._offset.wrapped = false;
        this._resumePageIdx = null;
        this._pageMatches.length = 0;
        this._pageMatchesLength.length = 0;
        this._matchesCountTotal = 0;

        this._updateAllPages(); // Wipe out any previously highlighted matches.

        for (let i = 0; i < numPages; i++) {
          // Start finding the matches as soon as the text is extracted.
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

      // If there's no query there's no point in searching.
      if (this._query === "") {
        this._updateUIState(FindState.FOUND);
        return;
      }
      // If we're waiting on a page, we return since we can't do anything else.
      if (this._resumePageIdx) {
        return;
      }

      const offset = this._offset;
      // Keep track of how many pages we should maximally iterate through.
      this._pagesToSearch = numPages;
      // If there's already a `matchIdx` that means we are iterating through a
      // page's matches.
      if (offset.matchIdx !== null) {
        const numPageMatches = this._pageMatches[offset.pageIdx].length;
        if (
          (!previous && offset.matchIdx + 1 < numPageMatches) ||
          (previous && offset.matchIdx > 0)
        ) {
          // The simple case; we just have advance the matchIdx to select
          // the next match on the page.
          offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
          this._updateMatch(/* found = */ true);
          return;
        }
        // We went beyond the current page's matches, so we advance to
        // the next page.
        this._advanceOffsetPage(previous);
      }
      // Start searching through the page.
      this._nextPageMatch();
    }

    _matchesReady(matches) {
      const offset = this._offset;
      const numMatches = matches.length;
      const previous = this._state.findPrevious;

      if (numMatches) {
        // There were matches for the page, so initialize `matchIdx`.
        offset.matchIdx = previous ? numMatches - 1 : 0;
        this._updateMatch(/* found = */ true);
        return true;
      }
      // No matches, so attempt to search the next page.
      this._advanceOffsetPage(previous);
      if (offset.wrapped) {
        offset.matchIdx = null;
        if (this._pagesToSearch < 0) {
          // No point in wrapping again, there were no matches.
          this._updateMatch(/* found = */ false);
          // While matches were not found, searching for a page
          // with matches should nevertheless halt.
          return true;
        }
      }
      // Matches were not found (and searching is not done).
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
          // The matches don't exist yet for processing by `_matchesReady`,
          // so set a resume point for when they do exist.
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

        // Update the currently selected page to wipe out any selected matches.
        if (previousPage !== -1 && previousPage !== this._selected.pageIdx) {
          this._updatePage(previousPage);
        }
      }

      this._updateUIState(state, this._state.findPrevious);
      if (this._selected.pageIdx !== -1) {
        // Ensure that the match will be scrolled into view.
        this._scrollMatches = true;

        this._updatePage(this._selected.pageIdx);
      }
    }

    _onFindBarClose(evt) {
      const pdfDocument = this._pdfDocument;
      // Since searching is asynchronous, ensure that the removal of highlighted
      // matches (from the UI) is async too such that the 'updatetextlayermatches'
      // events will always be dispatched in the expected order.
      this._firstPageCapability.promise.then(() => {
        // Only update the UI if the document is open, and is the current one.
        if (
          !this._pdfDocument ||
          (pdfDocument && this._pdfDocument !== pdfDocument)
        ) {
          return;
        }
        // Ensure that a pending, not yet started, search operation is aborted.
        if (this._findTimeout) {
          clearTimeout(this._findTimeout);
          this._findTimeout = null;
        }
        // Abort any long running searches, to avoid a match being scrolled into
        // view *after* the findbar has been closed. In this case `this._offset`
        // will most likely differ from `this._selected`, hence we also ensure
        // that any new search operation will always start with a clean slate.
        if (this._resumePageIdx) {
          this._resumePageIdx = null;
          this._dirtyMatch = true;
        }
        // Avoid the UI being in a pending state when the findbar is re-opened.
        this._updateUIState(FindState.FOUND);

        this._highlightMatches = false;
        this._updateAllPages(); // Wipe out any previously highlighted matches.
      });
    }

    _requestMatchesCount() {
      const { pageIdx, matchIdx } = this._selected;
      let current = 0,
        total = this._matchesCountTotal;
      if (matchIdx !== -1) {
        for (let i = 0; i < pageIdx; i++) {
          current += (this._pageMatches[i] && this._pageMatches[i].length) || 0;
        }
        current += matchIdx + 1;
      }
      // When searching starts, this method may be called before the `pageMatches`
      // have been counted (in `_calculateMatch`). Ensure that the UI won't show
      // temporarily broken state when the active find result doesn't make sense.
      if (current < 1 || current > total) {
        current = total = 0;
      }
      return { current, total };
    }

    _updateUIResultsCount() {
      this._eventBus.dispatch("updatefindmatchescount", {
        source: this,
        matchesCount: this._requestMatchesCount(),
      });
    }

    _updateUIState(state, previous) {
      this._eventBus.dispatch("updatefindcontrolstate", {
        source: this,
        state,
        previous,
        matchesCount: this._requestMatchesCount(),
        rawQuery: this._state ? this._state.query : null,
      });
    }
  }

  return { FindState, PDFFindController };
});
define('skylark-pdfjs-viewer/pdf_find_bar',[
  "./pdfjs_dev",
  "./ui_utils",
  "./pdf_find_controller"
],function(
  PDFJSDev,
  ui_utils,
  pdf_find_controller
){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { FindState } = pdf_find_controller;
  const { NullL10n } = ui_utils;

  const MATCHES_COUNT_LIMIT = 1000;

  /**
   * Creates a "search bar" given a set of DOM elements that act as controls
   * for searching or for setting search preferences in the UI. This object
   * also sets up the appropriate events for the controls. Actual searching
   * is done by PDFFindController.
   */
  class PDFFindBar {
    constructor(options, eventBus, l10n = NullL10n) {
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

      // Add event listeners to the DOM elements.
      this.toggleButton.addEventListener("click", () => {
        this.toggle();
      });

      this.findField.addEventListener("input", () => {
        this.dispatchEvent("");
      });

      this.bar.addEventListener("keydown", e => {
        switch (e.keyCode) {
          case 13: // Enter
            if (e.target === this.findField) {
              this.dispatchEvent("again", e.shiftKey);
            }
            break;
          case 27: // Escape
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
        findPrevious: findPrev,
      });
    }

    updateUIState(state, previous, matchesCount) {
      let findMsg = "";
      let status = "";

      switch (state) {
        case FindState.FOUND:
          break;

        case FindState.PENDING:
          status = "pending";
          break;

        case FindState.NOT_FOUND:
          findMsg = this.l10n.get("find_not_found", null, "Phrase not found");
          status = "notFound";
          break;

        case FindState.WRAPPED:
          if (previous) {
            findMsg = this.l10n.get(
              "find_reached_top",
              null,
              "Reached top of document, continued from bottom"
            );
          } else {
            findMsg = this.l10n.get(
              "find_reached_bottom",
              null,
              "Reached end of document, continued from top"
            );
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

    updateResultsCount({ current = 0, total = 0 } = {}) {
      if (!this.findResultsCount) {
        return; // No UI control is provided.
      }
      const limit = MATCHES_COUNT_LIMIT;
      let matchesCountMsg = "";

      if (total > 0) {
        if (total > limit) {
          if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("MOZCENTRAL")) {
            // TODO: Remove this hard-coded `[other]` form once plural support has
            // been implemented in the mozilla-central specific `l10n.js` file.
            matchesCountMsg = this.l10n.get(
              "find_match_count_limit[other]",
              {
                limit,
              },
              "More than {{limit}} matches"
            );
          } else {
            matchesCountMsg = this.l10n.get(
              "find_match_count_limit",
              {
                limit,
              },
              "More than {{limit}} match" + (limit !== 1 ? "es" : "")
            );
          }
        } else {
          if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("MOZCENTRAL")) {
            // TODO: Remove this hard-coded `[other]` form once plural support has
            // been implemented in the mozilla-central specific `l10n.js` file.
            matchesCountMsg = this.l10n.get(
              "find_match_count[other]",
              {
                current,
                total,
              },
              "{{current}} of {{total}} matches"
            );
          } else {
            matchesCountMsg = this.l10n.get(
              "find_match_count",
              {
                current,
                total,
              },
              "{{current}} of {{total}} match" + (total !== 1 ? "es" : "")
            );
          }
        }
      }
      Promise.resolve(matchesCountMsg).then(msg => {
        this.findResultsCount.textContent = msg;
        this.findResultsCount.classList.toggle("hidden", !total);
        // Since `updateResultsCount` may be called from `PDFFindController`,
        // ensure that the width of the findbar is always updated correctly.
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

      this.eventBus.dispatch("findbarclose", { source: this });
    }

    toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    }

    /**
     * @private
     */
    _adjustWidth() {
      if (!this.opened) {
        return;
      }

      // The find bar has an absolute position and thus the browser extends
      // its width to the maximum possible width once the find bar does not fit
      // entirely within the window anymore (and its elements are automatically
      // wrapped). Here we detect and fix that.
      this.bar.classList.remove("wrapContainers");

      const findbarHeight = this.bar.clientHeight;
      const inputContainerHeight = this.bar.firstElementChild.clientHeight;

      if (findbarHeight > inputContainerHeight) {
        // The findbar is taller than the input container, which means that
        // the browser wrapped some of the elements. For a consistent look,
        // wrap all of them to adjust the width of the find bar.
        this.bar.classList.add("wrapContainers");
      }
    }
  }

  return { PDFFindBar };
});
define('skylark-pdfjs-viewer/pdf_history',[
  "./pdfjs_dev",
  "./ui_utils",
],function(
  PDFJSDev,
  ui_utils
){
  /* Copyright 2017 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const {
    isValidRotation,
    parseQueryString,
    PresentationModeState,
    waitOnEventOrTimeout,
  } = ui_utils;

  // Heuristic value used when force-resetting `this._blockHashChange`.
  const HASH_CHANGE_TIMEOUT = 1000; // milliseconds
  // Heuristic value used when adding the current position to the browser history.
  const POSITION_UPDATED_THRESHOLD = 50;
  // Heuristic value used when adding a temporary position to the browser history.
  const UPDATE_VIEWAREA_TIMEOUT = 1000; // milliseconds

  /**
   * @typedef {Object} PDFHistoryOptions
   * @property {IPDFLinkService} linkService - The navigation/linking service.
   * @property {EventBus} eventBus - The application event bus.
   */

  /**
   * @typedef {Object} InitializeParameters
   * @property {string} fingerprint - The PDF document's unique fingerprint.
   * @property {boolean} [resetHistory] - Reset the browsing history.
   * @property {boolean} [updateUrl] - Attempt to update the document URL, with
   *   the current hash, when pushing/replacing browser history entries.
   */

  /**
   * @typedef {Object} PushParameters
   * @property {string} [namedDest] - The named destination. If absent, a
   *   stringified version of `explicitDest` is used.
   * @property {Array} explicitDest - The explicit destination array.
   * @property {number} pageNumber - The page to which the destination points.
   */

  function getCurrentHash() {
    return document.location.hash;
  }

  class PDFHistory {
    /**
     * @param {PDFHistoryOptions} options
     */
    constructor({ linkService, eventBus }) {
      this.linkService = linkService;
      this.eventBus = eventBus;

      this._initialized = false;
      this._fingerprint = "";
      this.reset();

      this._boundEvents = null;
      this._isViewerInPresentationMode = false;
      // Ensure that we don't miss either a 'presentationmodechanged' or a
      // 'pagesinit' event, by registering the listeners immediately.
      this.eventBus._on("presentationmodechanged", evt => {
        this._isViewerInPresentationMode =
          evt.state !== PresentationModeState.NORMAL;
      });
      this.eventBus._on("pagesinit", () => {
        this._isPagesLoaded = false;

        this.eventBus._on(
          "pagesloaded",
          evt => {
            this._isPagesLoaded = !!evt.pagesCount;
          },
          { once: true }
        );
      });
    }

    /**
     * Initialize the history for the PDF document, using either the current
     * browser history entry or the document hash, whichever is present.
     * @param {InitializeParameters} params
     */
    initialize({ fingerprint, resetHistory = false, updateUrl = false }) {
      if (!fingerprint || typeof fingerprint !== "string") {
        console.error(
          'PDFHistory.initialize: The "fingerprint" must be a non-empty string.'
        );
        return;
      }
      // Ensure that any old state is always reset upon initialization.
      if (this._initialized) {
        this.reset();
      }
      const reInitialized =
        this._fingerprint !== "" && this._fingerprint !== fingerprint;
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

      if (!this._isValidState(state, /* checkReload = */ true) || resetHistory) {
        const { hash, page, rotation } = this._parseCurrentHash(
          /* checkNameddest = */ true
        );

        if (!hash || reInitialized || resetHistory) {
          // Ensure that the browser history is reset on PDF document load.
          this._pushOrReplaceState(null, /* forceReplace = */ true);
          return;
        }
        // Ensure that the browser history is initialized correctly when
        // the document hash is present on PDF document load.
        this._pushOrReplaceState(
          { hash, page, rotation },
          /* forceReplace = */ true
        );
        return;
      }

      // The browser history contains a valid entry, ensure that the history is
      // initialized correctly on PDF document load.
      const destination = state.destination;
      this._updateInternalState(
        destination,
        state.uid,
        /* removeTemporary = */ true
      );

      if (destination.rotation !== undefined) {
        this._initialRotation = destination.rotation;
      }
      if (destination.dest) {
        this._initialBookmark = JSON.stringify(destination.dest);

        // If the history is updated, e.g. through the user changing the hash,
        // before the initial destination has become visible, then we do *not*
        // want to potentially add `this._position` to the browser history.
        this._destination.page = null;
      } else if (destination.hash) {
        this._initialBookmark = destination.hash;
      } else if (destination.page) {
        // Fallback case; shouldn't be necessary, but better safe than sorry.
        this._initialBookmark = `page=${destination.page}`;
      }
    }

    /**
     * Reset the current `PDFHistory` instance, and consequently prevent any
     * further updates and/or navigation of the browser history.
     */
    reset() {
      if (this._initialized) {
        this._pageHide(); // Simulate a 'pagehide' event when resetting.

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

    /**
     * Push an internal destination to the browser history.
     * @param {PushParameters}
     */
    push({ namedDest = null, explicitDest, pageNumber }) {
      if (!this._initialized) {
        return;
      }
      if (namedDest && typeof namedDest !== "string") {
        console.error(
          "PDFHistory.push: " +
            `"${namedDest}" is not a valid namedDest parameter.`
        );
        return;
      } else if (!Array.isArray(explicitDest)) {
        console.error(
          "PDFHistory.push: " +
            `"${explicitDest}" is not a valid explicitDest parameter.`
        );
        return;
      } else if (
        !(
          Number.isInteger(pageNumber) &&
          pageNumber > 0 &&
          pageNumber <= this.linkService.pagesCount
        )
      ) {
        // Allow an unset `pageNumber` if and only if the history is still empty;
        // please refer to the `this._destination.page = null;` comment above.
        if (pageNumber !== null || this._destination) {
          console.error(
            "PDFHistory.push: " +
              `"${pageNumber}" is not a valid pageNumber parameter.`
          );
          return;
        }
      }

      const hash = namedDest || JSON.stringify(explicitDest);
      if (!hash) {
        // The hash *should* never be undefined, but if that were to occur,
        // avoid any possible issues by not updating the browser history.
        return;
      }

      let forceReplace = false;
      if (
        this._destination &&
        (isDestHashesEqual(this._destination.hash, hash) ||
          isDestArraysEqual(this._destination.dest, explicitDest))
      ) {
        // When the new destination is identical to `this._destination`, and
        // its `page` is undefined, replace the current browser history entry.
        // NOTE: This can only occur if `this._destination` was set either:
        //  - through the document hash being specified on load.
        //  - through the user changing the hash of the document.
        if (this._destination.page) {
          return;
        }
        forceReplace = true;
      }
      if (this._popStateInProgress && !forceReplace) {
        return;
      }

      this._pushOrReplaceState(
        {
          dest: explicitDest,
          hash,
          page: pageNumber,
          rotation: this.linkService.rotation,
        },
        forceReplace
      );

      if (!this._popStateInProgress) {
        // Prevent the browser history from updating while the new destination is
        // being scrolled into view, to avoid potentially inconsistent state.
        this._popStateInProgress = true;
        // We defer the resetting of `this._popStateInProgress`, to account for
        // e.g. zooming occuring when the new destination is being navigated to.
        Promise.resolve().then(() => {
          this._popStateInProgress = false;
        });
      }
    }

    /**
     * Push a page to the browser history; generally the `push` method should be
     * used instead.
     * @param {number} pageNumber
     */
    pushPage(pageNumber) {
      if (!this._initialized) {
        return;
      }
      if (
        !(
          Number.isInteger(pageNumber) &&
          pageNumber > 0 &&
          pageNumber <= this.linkService.pagesCount
        )
      ) {
        console.error(
          `PDFHistory.pushPage: "${pageNumber}" is not a valid page number.`
        );
        return;
      }

      ///if (this._destination?.page === pageNumber) { // lwf
      if (this._destination && this._destination.page === pageNumber) {
        // When the new page is identical to the one in `this._destination`, we
        // don't want to add a potential duplicate entry in the browser history.
        return;
      }
      if (this._popStateInProgress) {
        return;
      }

      this._pushOrReplaceState({
        hash: `page=${pageNumber}`,
        page: pageNumber,
        rotation: this.linkService.rotation,
      });

      if (!this._popStateInProgress) {
        // Prevent the browser history from updating while the new page is
        // being scrolled into view, to avoid potentially inconsistent state.
        this._popStateInProgress = true;
        // We defer the resetting of `this._popStateInProgress`, to account for
        // e.g. zooming occuring when the new page is being navigated to.
        Promise.resolve().then(() => {
          this._popStateInProgress = false;
        });
      }
    }

    /**
     * Push the current position to the browser history.
     */
    pushCurrentPosition() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }
      this._tryPushCurrentPosition();
    }

    /**
     * Go back one step in the browser history.
     * NOTE: Avoids navigating away from the document, useful for "named actions".
     */
    back() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }
      const state = window.history.state;
      if (this._isValidState(state) && state.uid > 0) {
        window.history.back();
      }
    }

    /**
     * Go forward one step in the browser history.
     * NOTE: Avoids navigating away from the document, useful for "named actions".
     */
    forward() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }
      const state = window.history.state;
      if (this._isValidState(state) && state.uid < this._maxUid) {
        window.history.forward();
      }
    }

    /**
     * @type {boolean} Indicating if the user is currently moving through the
     *   browser history, useful e.g. for skipping the next 'hashchange' event.
     */
    get popStateInProgress() {
      return (
        this._initialized &&
        (this._popStateInProgress || this._blockHashChange > 0)
      );
    }

    get initialBookmark() {
      return this._initialized ? this._initialBookmark : null;
    }

    get initialRotation() {
      return this._initialized ? this._initialRotation : null;
    }

    /**
     * @private
     */
    _pushOrReplaceState(destination, forceReplace = false) {
      const shouldReplace = forceReplace || !this._destination;
      const newState = {
        fingerprint: this._fingerprint,
        uid: shouldReplace ? this._uid : this._uid + 1,
        destination,
      };

      if (
        typeof PDFJSDev !== "undefined" &&
        PDFJSDev.test("CHROME") &&
        ///window.history.state?.chromecomState // lwf
        (window.history.state && window.history.state.chromecomState)
      ) {
        // history.state.chromecomState is managed by chromecom.js.
        newState.chromecomState = window.history.state.chromecomState;
      }
      this._updateInternalState(destination, newState.uid);

      let newUrl;
      ///if (this._updateUrl && destination?.hash) { // lwf
      if (this._updateUrl && destination && destination.hash) {
        const baseUrl = document.location.href.split("#")[0];
        // Prevent errors in Firefox.
        if (!baseUrl.startsWith("file://")) {
          newUrl = `${baseUrl}#${destination.hash}`;
        }
      }
      if (shouldReplace) {
        window.history.replaceState(newState, "", newUrl);
      } else {
        window.history.pushState(newState, "", newUrl);
      }

      if (
        typeof PDFJSDev !== "undefined" &&
        PDFJSDev.test("CHROME") &&
        top === window
      ) {
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage("showPageAction");
      }
    }

    /**
     * @private
     */
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
        // Always replace a previous *temporary* position.
        this._pushOrReplaceState(position, /* forceReplace = */ true);
        return;
      }
      if (this._destination.hash === position.hash) {
        return; // The current document position has not changed.
      }
      if (
        !this._destination.page &&
        (POSITION_UPDATED_THRESHOLD <= 0 ||
          this._numPositionUpdates <= POSITION_UPDATED_THRESHOLD)
      ) {
        // `this._destination` was set through the user changing the hash of
        // the document. Do not add `this._position` to the browser history,
        // to avoid "flooding" it with lots of (nearly) identical entries,
        // since we cannot ensure that the document position has changed.
        return;
      }

      let forceReplace = false;
      if (
        this._destination.page >= position.first &&
        this._destination.page <= position.page
      ) {
        // When the `page` of `this._destination` is still visible, do not
        // update the browsing history when `this._destination` either:
        //  - contains an internal destination, since in this case we
        //    cannot ensure that the document position has actually changed.
        //  - was set through the user changing the hash of the document.
        if (this._destination.dest || !this._destination.first) {
          return;
        }
        // To avoid "flooding" the browser history, replace the current entry.
        forceReplace = true;
      }
      this._pushOrReplaceState(position, forceReplace);
    }

    /**
     * @private
     */
    _isValidState(state, checkReload = false) {
      if (!state) {
        return false;
      }
      if (state.fingerprint !== this._fingerprint) {
        if (checkReload) {
          // Potentially accept the history entry, even if the fingerprints don't
          // match, when the viewer was reloaded (see issue 6847).
          if (
            typeof state.fingerprint !== "string" ||
            state.fingerprint.length !== this._fingerprint.length
          ) {
            return false;
          }
          const [perfEntry] = performance.getEntriesByType("navigation");
          ///if (perfEntry?.type !== "reload") { // lwf
          if (perfEntry && perfEntry.type !== "reload") {
            return false;
          }
        } else {
          // This should only occur in viewers with support for opening more than
          // one PDF document, e.g. the GENERIC viewer.
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

    /**
     * @private
     */
    _updateInternalState(destination, uid, removeTemporary = false) {
      if (this._updateViewareaTimeout) {
        // When updating `this._destination`, make sure that we always wait for
        // the next 'updateviewarea' event before (potentially) attempting to
        // push the current position to the browser history.
        clearTimeout(this._updateViewareaTimeout);
        this._updateViewareaTimeout = null;
      }
      ///if (removeTemporary && destination?.temporary) { // lwf
      if (removeTemporary && destination && destination.temporary) {
        // When the `destination` comes from the browser history,
        // we no longer treat it as a *temporary* position.
        delete destination.temporary;
      }
      this._destination = destination;
      this._uid = uid;
      this._maxUid = Math.max(this._maxUid, uid);
      // This should always be reset when `this._destination` is updated.
      this._numPositionUpdates = 0;
    }

    /**
     * @private
     */
    _parseCurrentHash(checkNameddest = false) {
      const hash = unescape(getCurrentHash()).substring(1);
      const params = parseQueryString(hash);

      const nameddest = params.nameddest || "";
      let page = params.page | 0;

      if (
        !(
          Number.isInteger(page) &&
          page > 0 &&
          page <= this.linkService.pagesCount
        ) ||
        (checkNameddest && nameddest.length > 0)
      ) {
        page = null;
      }
      return { hash, page, rotation: this.linkService.rotation };
    }

    /**
     * @private
     */
    _updateViewarea({ location }) {
      if (this._updateViewareaTimeout) {
        clearTimeout(this._updateViewareaTimeout);
        this._updateViewareaTimeout = null;
      }

      this._position = {
        hash: this._isViewerInPresentationMode
          ? `page=${location.pageNumber}`
          : location.pdfOpenParams.substring(1),
        page: this.linkService.page,
        first: location.pageNumber,
        rotation: location.rotation,
      };

      if (this._popStateInProgress) {
        return;
      }

      if (
        POSITION_UPDATED_THRESHOLD > 0 &&
        this._isPagesLoaded &&
        this._destination &&
        !this._destination.page
      ) {
        // If the current destination was set through the user changing the hash
        // of the document, we will usually not try to push the current position
        // to the browser history; see `this._tryPushCurrentPosition()`.
        //
        // To prevent `this._tryPushCurrentPosition()` from effectively being
        // reduced to a no-op in this case, we will assume that the position
        // *did* in fact change if the 'updateviewarea' event was dispatched
        // more than `POSITION_UPDATED_THRESHOLD` times.
        this._numPositionUpdates++;
      }

      if (UPDATE_VIEWAREA_TIMEOUT > 0) {
        // When closing the browser, a 'pagehide' event will be dispatched which
        // *should* allow us to push the current position to the browser history.
        // In practice, it seems that the event is arriving too late in order for
        // the session history to be successfully updated.
        // (For additional details, please refer to the discussion in
        //  https://bugzilla.mozilla.org/show_bug.cgi?id=1153393.)
        //
        // To workaround this we attempt to *temporarily* add the current position
        // to the browser history only when the viewer is *idle*,
        // i.e. when scrolling and/or zooming does not occur.
        //
        // PLEASE NOTE: It's absolutely imperative that the browser history is
        // *not* updated too often, since that would render the viewer more or
        // less unusable. Hence the use of a timeout to delay the update until
        // the viewer has been idle for `UPDATE_VIEWAREA_TIMEOUT` milliseconds.
        this._updateViewareaTimeout = setTimeout(() => {
          if (!this._popStateInProgress) {
            this._tryPushCurrentPosition(/* temporary = */ true);
          }
          this._updateViewareaTimeout = null;
        }, UPDATE_VIEWAREA_TIMEOUT);
      }
    }

    /**
     * @private
     */
    _popState({ state }) {
      const newHash = getCurrentHash(),
        hashChanged = this._currentHash !== newHash;
      this._currentHash = newHash;

      if (
        (typeof PDFJSDev !== "undefined" &&
          PDFJSDev.test("CHROME") &&
          ///state?.chromecomState && // lwf
          state && state.chromecomState &&
          !this._isValidState(state)) ||
        !state
      ) {
        // This case corresponds to the user changing the hash of the document.
        this._uid++;

        const { hash, page, rotation } = this._parseCurrentHash();
        this._pushOrReplaceState(
          { hash, page, rotation },
          /* forceReplace = */ true
        );
        return;
      }
      if (!this._isValidState(state)) {
        // This should only occur in viewers with support for opening more than
        // one PDF document, e.g. the GENERIC viewer.
        return;
      }

      // Prevent the browser history from updating until the new destination,
      // as stored in the browser history, has been scrolled into view.
      this._popStateInProgress = true;

      if (hashChanged) {
        // When the hash changed, implying that the 'popstate' event will be
        // followed by a 'hashchange' event, then we do *not* want to update the
        // browser history when handling the 'hashchange' event (in web/app.js)
        // since that would *overwrite* the new destination navigated to below.
        //
        // To avoid accidentally disabling all future user-initiated hash changes,
        // if there's e.g. another 'hashchange' listener that stops the event
        // propagation, we make sure to always force-reset `this._blockHashChange`
        // after `HASH_CHANGE_TIMEOUT` milliseconds have passed.
        this._blockHashChange++;
        waitOnEventOrTimeout({
          target: window,
          name: "hashchange",
          delay: HASH_CHANGE_TIMEOUT,
        }).then(() => {
          this._blockHashChange--;
        });
      }

      // Navigate to the new destination.
      const destination = state.destination;
      this._updateInternalState(
        destination,
        state.uid,
        /* removeTemporary = */ true
      );

      if (isValidRotation(destination.rotation)) {
        this.linkService.rotation = destination.rotation;
      }
      if (destination.dest) {
        this.linkService.goToDestination(destination.dest);
      } else if (destination.hash) {
        this.linkService.setHash(destination.hash);
      } else if (destination.page) {
        // Fallback case; shouldn't be necessary, but better safe than sorry.
        this.linkService.page = destination.page;
      }

      // Since `PDFLinkService.goToDestination` is asynchronous, we thus defer the
      // resetting of `this._popStateInProgress` slightly.
      Promise.resolve().then(() => {
        this._popStateInProgress = false;
      });
    }

    /**
     * @private
     */
    _pageHide() {
      // Attempt to push the `this._position` into the browser history when
      // navigating away from the document. This is *only* done if the history
      // is empty/temporary, since otherwise an existing browser history entry
      // will end up being overwritten (given that new entries cannot be pushed
      // into the browser history when the 'unload' event has already fired).
      if (!this._destination || this._destination.temporary) {
        this._tryPushCurrentPosition();
      }
    }

    /**
     * @private
     */
    _bindEvents() {
      if (this._boundEvents) {
        return; // The event listeners were already added.
      }
      this._boundEvents = {
        updateViewarea: this._updateViewarea.bind(this),
        popState: this._popState.bind(this),
        pageHide: this._pageHide.bind(this),
      };

      this.eventBus._on("updateviewarea", this._boundEvents.updateViewarea);
      window.addEventListener("popstate", this._boundEvents.popState);
      window.addEventListener("pagehide", this._boundEvents.pageHide);
    }

    /**
     * @private
     */
    _unbindEvents() {
      if (!this._boundEvents) {
        return; // The event listeners were already removed.
      }
      this.eventBus._off("updateviewarea", this._boundEvents.updateViewarea);
      window.removeEventListener("popstate", this._boundEvents.popState);
      window.removeEventListener("pagehide", this._boundEvents.pageHide);

      this._boundEvents = null;
    }
  }

  function isDestHashesEqual(destHash, pushHash) {
    if (typeof destHash !== "string" || typeof pushHash !== "string") {
      return false;
    }
    if (destHash === pushHash) {
      return true;
    }
    const { nameddest } = parseQueryString(destHash);
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
      return first === second || (Number.isNaN(first) && Number.isNaN(second));
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

  return { isDestArraysEqual, isDestHashesEqual, PDFHistory };
});
define('skylark-pdfjs-viewer/pdf_layer_viewer',[
  "./base_tree_viewer"
],function(base_tree_viewer){
  /* Copyright 2020 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { BaseTreeViewer } = base_tree_viewer;

  /**
   * @typedef {Object} PDFLayerViewerOptions
   * @property {HTMLDivElement} container - The viewer element.
   * @property {EventBus} eventBus - The application event bus.
   * @property {IL10n} l10n - Localization service.
   */

  /**
   * @typedef {Object} PDFLayerViewerRenderParameters
   * @property {OptionalContentConfig|null} optionalContentConfig - An
   *   {OptionalContentConfig} instance.
   * @property {PDFDocument} pdfDocument - A {PDFDocument} instance.
   */

  class PDFLayerViewer extends BaseTreeViewer {
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

    /**
     * @private
     */
    _dispatchEvent(layersCount) {
      this.eventBus.dispatch("layersloaded", {
        source: this,
        layersCount,
      });
    }

    /**
     * @private
     */
    _bindLink(element, { groupId, input }) {
      const setVisibility = () => {
        this._optionalContentConfig.setVisibility(groupId, input.checked);

        this.eventBus.dispatch("optionalcontentconfig", {
          source: this,
          promise: Promise.resolve(this._optionalContentConfig),
        });
      };

      element.onclick = evt => {
        if (evt.target === input) {
          setVisibility();
          return true;
        } else if (evt.target !== element) {
          return true; // The target is the "label", which is handled above.
        }
        input.checked = !input.checked;
        setVisibility();
        return false;
      };
    }

    /**
     * @private
     */
    async _setNestedName(element, { name = null }) {
      if (typeof name === "string") {
        element.textContent = this._normalizeTextContent(name);
        return;
      }
      element.textContent = await this.l10n.get(
        "additional_layers",
        null,
        "Additional Layers"
      );
      element.style.fontStyle = "italic";
    }

    /**
     * @private
     */
    _addToggleButton(div, { name = null }) {
      super._addToggleButton(div, /* hidden = */ name === null);
    }

    /**
     * @private
     */
    _toggleAllTreeItems() {
      if (!this._optionalContentConfig) {
        return;
      }
      super._toggleAllTreeItems();
    }

    /**
     * @param {PDFLayerViewerRenderParameters} params
     */
    render({ optionalContentConfig, pdfDocument }) {
      if (this._optionalContentConfig) {
        this.reset();
      }
      this._optionalContentConfig = optionalContentConfig || null;
      this._pdfDocument = pdfDocument || null;

      const groups = optionalContentConfig && optionalContentConfig.getOrder();
      if (!groups) {
        this._dispatchEvent(/* layersCount = */ 0);
        return;
      }

      const fragment = document.createDocumentFragment(),
        queue = [{ parent: fragment, groups }];
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

            queue.push({ parent: itemsDiv, groups: groupId.order });
          } else {
            const group = optionalContentConfig.getGroup(groupId);

            const input = document.createElement("input");
            this._bindLink(element, { groupId, input });
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

    /**
     * @private
     */
    async _resetLayers() {
      if (!this._optionalContentConfig) {
        return;
      }
      // Fetch the default optional content configuration...
      const optionalContentConfig = await this._pdfDocument.getOptionalContentConfig();

      this.eventBus.dispatch("optionalcontentconfig", {
        source: this,
        promise: Promise.resolve(optionalContentConfig),
      });

      // ... and reset the sidebarView to the default state.
      this.render({
        optionalContentConfig,
        pdfDocument: this._pdfDocument,
      });
    }
  }

  return { PDFLayerViewer };

});
define('skylark-pdfjs-viewer/pdf_link_service',[
  "./ui_utils",
],function(ui_utils){
  /* Copyright 2015 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { parseQueryString } = ui_utils;

  /**
   * @typedef {Object} PDFLinkServiceOptions
   * @property {EventBus} eventBus - The application event bus.
   * @property {number} [externalLinkTarget] - Specifies the `target` attribute
   *   for external links. Must use one of the values from {LinkTarget}.
   *   Defaults to using no target.
   * @property {string} [externalLinkRel] - Specifies the `rel` attribute for
   *   external links. Defaults to stripping the referrer.
   * @property {boolean} [ignoreDestinationZoom] - Ignores the zoom argument,
   *   thus preserving the current zoom level in the viewer, when navigating
   *   to internal destinations. The default value is `false`.
   */

  /**
   * Performs navigation functions inside PDF, such as opening specified page,
   * or destination.
   * @implements {IPDFLinkService}
   */
  class PDFLinkService {
    /**
     * @param {PDFLinkServiceOptions} options
     */
    constructor({
      eventBus,
      externalLinkTarget = null,
      externalLinkRel = null,
      externalLinkEnabled = true,
      ignoreDestinationZoom = false,
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

    /**
     * @type {number}
     */
    get pagesCount() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }

    /**
     * @type {number}
     */
    get page() {
      return this.pdfViewer.currentPageNumber;
    }

    /**
     * @param {number} value
     */
    set page(value) {
      this.pdfViewer.currentPageNumber = value;
    }

    /**
     * @type {number}
     */
    get rotation() {
      return this.pdfViewer.pagesRotation;
    }

    /**
     * @param {number} value
     */
    set rotation(value) {
      this.pdfViewer.pagesRotation = value;
    }

    /**
     * @deprecated
     */
    navigateTo(dest) {
      console.error(
        "Deprecated method: `navigateTo`, use `goToDestination` instead."
      );
      this.goToDestination(dest);
    }

    /**
     * @private
     */
    _goToDestinationHelper(rawDest, namedDest = null, explicitDest) {
      // Dest array looks like that: <page-ref> </XYZ|/FitXXX> <args..>
      const destRef = explicitDest[0];
      let pageNumber;

      if (destRef instanceof Object) {
        pageNumber = this._cachedPageNumber(destRef);

        if (pageNumber === null) {
          // Fetch the page reference if it's not yet available. This could
          // only occur during loading, before all pages have been resolved.
          this.pdfDocument
            .getPageIndex(destRef)
            .then(pageIndex => {
              this.cachePageRef(pageIndex + 1, destRef);
              this._goToDestinationHelper(rawDest, namedDest, explicitDest);
            })
            .catch(() => {
              console.error(
                `PDFLinkService._goToDestinationHelper: "${destRef}" is not ` +
                  `a valid page reference, for dest="${rawDest}".`
              );
            });
          return;
        }
      } else if (Number.isInteger(destRef)) {
        pageNumber = destRef + 1;
      } else {
        console.error(
          `PDFLinkService._goToDestinationHelper: "${destRef}" is not ` +
            `a valid destination reference, for dest="${rawDest}".`
        );
        return;
      }
      if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
        console.error(
          `PDFLinkService._goToDestinationHelper: "${pageNumber}" is not ` +
            `a valid page number, for dest="${rawDest}".`
        );
        return;
      }

      if (this.pdfHistory) {
        // Update the browser history before scrolling the new destination into
        // view, to be able to accurately capture the current document position.
        this.pdfHistory.pushCurrentPosition();
        this.pdfHistory.push({ namedDest, explicitDest, pageNumber });
      }

      this.pdfViewer.scrollPageIntoView({
        pageNumber,
        destArray: explicitDest,
        ignoreDestinationZoom: this._ignoreDestinationZoom,
      });
    }

    /**
     * This method will, when available, also update the browser history.
     *
     * @param {string|Array} dest - The named, or explicit, PDF destination.
     */
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
        console.error(
          `PDFLinkService.goToDestination: "${explicitDest}" is not ` +
            `a valid destination array, for dest="${dest}".`
        );
        return;
      }
      this._goToDestinationHelper(dest, namedDest, explicitDest);
    }

    /**
     * This method will, when available, also update the browser history.
     *
     * @param {number|string} val - The page number, or page label.
     */
    goToPage(val) {
      if (!this.pdfDocument) {
        return;
      }
      const pageNumber =
        (typeof val === "string" && this.pdfViewer.pageLabelToPageNumber(val)) ||
        val | 0;
      if (
        !(
          Number.isInteger(pageNumber) &&
          pageNumber > 0 &&
          pageNumber <= this.pagesCount
        )
      ) {
        console.error(`PDFLinkService.goToPage: "${val}" is not a valid page.`);
        return;
      }

      if (this.pdfHistory) {
        // Update the browser history before scrolling the new page into view,
        // to be able to accurately capture the current document position.
        this.pdfHistory.pushCurrentPosition();
        this.pdfHistory.pushPage(pageNumber);
      }

      this.pdfViewer.scrollPageIntoView({ pageNumber });
    }

    /**
     * @param {string|Array} dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
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

    /**
     * Prefix the full url on anchor links to make sure that links are resolved
     * relative to the current URL instead of the one defined in <base href>.
     * @param {string} anchor - The anchor hash, including the #.
     * @returns {string} The hyperlink to the PDF object.
     */
    getAnchorUrl(anchor) {
      return (this.baseUrl || "") + anchor;
    }

    /**
     * @param {string} hash
     */
    setHash(hash) {
      if (!this.pdfDocument) {
        return;
      }
      let pageNumber, dest;
      if (hash.includes("=")) {
        const params = parseQueryString(hash);
        if ("search" in params) {
          this.eventBus.dispatch("findfromurlhash", {
            source: this,
            query: params.search.replace(/"/g, ""),
            phraseSearch: params.phrase === "true",
          });
        }
        // borrowing syntax from "Parameters for Opening PDF Files"
        if ("page" in params) {
          pageNumber = params.page | 0 || 1;
        }
        if ("zoom" in params) {
          // Build the destination array.
          const zoomArgs = params.zoom.split(","); // scale,left,top
          const zoomArg = zoomArgs[0];
          const zoomArgNumber = parseFloat(zoomArg);

          if (!zoomArg.includes("Fit")) {
            // If the zoomArg is a number, it has to get divided by 100. If it's
            // a string, it should stay as it is.
            dest = [
              null,
              { name: "XYZ" },
              zoomArgs.length > 1 ? zoomArgs[1] | 0 : null,
              zoomArgs.length > 2 ? zoomArgs[2] | 0 : null,
              zoomArgNumber ? zoomArgNumber / 100 : zoomArg,
            ];
          } else {
            if (zoomArg === "Fit" || zoomArg === "FitB") {
              dest = [null, { name: zoomArg }];
            } else if (
              zoomArg === "FitH" ||
              zoomArg === "FitBH" ||
              zoomArg === "FitV" ||
              zoomArg === "FitBV"
            ) {
              dest = [
                null,
                { name: zoomArg },
                zoomArgs.length > 1 ? zoomArgs[1] | 0 : null,
              ];
            } else if (zoomArg === "FitR") {
              if (zoomArgs.length !== 5) {
                console.error(
                  'PDFLinkService.setHash: Not enough parameters for "FitR".'
                );
              } else {
                dest = [
                  null,
                  { name: zoomArg },
                  zoomArgs[1] | 0,
                  zoomArgs[2] | 0,
                  zoomArgs[3] | 0,
                  zoomArgs[4] | 0,
                ];
              }
            } else {
              console.error(
                `PDFLinkService.setHash: "${zoomArg}" is not ` +
                  "a valid zoom value."
              );
            }
          }
        }
        if (dest) {
          this.pdfViewer.scrollPageIntoView({
            pageNumber: pageNumber || this.page,
            destArray: dest,
            allowNegativeOffset: true,
          });
        } else if (pageNumber) {
          this.page = pageNumber; // simple page
        }
        if ("pagemode" in params) {
          this.eventBus.dispatch("pagemode", {
            source: this,
            mode: params.pagemode,
          });
        }
        // Ensure that this parameter is *always* handled last, in order to
        // guarantee that it won't be overridden (e.g. by the "page" parameter).
        if ("nameddest" in params) {
          this.goToDestination(params.nameddest);
        }
      } else {
        // Named (or explicit) destination.
        dest = unescape(hash);
        try {
          dest = JSON.parse(dest);

          if (!Array.isArray(dest)) {
            // Avoid incorrectly rejecting a valid named destination, such as
            // e.g. "4.3" or "true", because `JSON.parse` converted its type.
            dest = dest.toString();
          }
        } catch (ex) {}

        if (typeof dest === "string" || isValidExplicitDestination(dest)) {
          this.goToDestination(dest);
          return;
        }
        console.error(
          `PDFLinkService.setHash: "${unescape(hash)}" is not ` +
            "a valid destination."
        );
      }
    }

    /**
     * @param {string} action
     */
    executeNamedAction(action) {
      // See PDF reference, table 8.45 - Named action
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
          break; // No action according to spec
      }

      this.eventBus.dispatch("namedaction", {
        source: this,
        action,
      });
    }

    /**
     * @param {number} pageNum - page number.
     * @param {Object} pageRef - reference to the page.
     */
    cachePageRef(pageNum, pageRef) {
      if (!pageRef) {
        return;
      }
      const refStr =
        pageRef.gen === 0 ? `${pageRef.num}R` : `${pageRef.num}R${pageRef.gen}`;
      this._pagesRefCache[refStr] = pageNum;
    }

    /**
     * @private
     */
    _cachedPageNumber(pageRef) {
      const refStr =
        pageRef.gen === 0 ? `${pageRef.num}R` : `${pageRef.num}R${pageRef.gen}`;
      return (this._pagesRefCache && this._pagesRefCache[refStr]) || null;
    }

    /**
     * @param {number} pageNumber
     */
    isPageVisible(pageNumber) {
      return this.pdfViewer.isPageVisible(pageNumber);
    }

    /**
     * @param {number} pageNumber
     */
    isPageCached(pageNumber) {
      return this.pdfViewer.isPageCached(pageNumber);
    }
  }

  function isValidExplicitDestination(dest) {
    if (!Array.isArray(dest)) {
      return false;
    }
    const destLength = dest.length;
    if (destLength < 2) {
      return false;
    }
    const page = dest[0];
    if (
      !(
        typeof page === "object" &&
        Number.isInteger(page.num) &&
        Number.isInteger(page.gen)
      ) &&
      !(Number.isInteger(page) && page >= 0)
    ) {
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
      if (!(typeof param === "number" || (allowNull && param === null))) {
        return false;
      }
    }
    return true;
  }

  /**
   * @implements {IPDFLinkService}
   */
  class SimpleLinkService {
    constructor() {
      this.externalLinkTarget = null;
      this.externalLinkRel = null;
      this.externalLinkEnabled = true;
      this._ignoreDestinationZoom = false;
    }

    /**
     * @type {number}
     */
    get pagesCount() {
      return 0;
    }

    /**
     * @type {number}
     */
    get page() {
      return 0;
    }

    /**
     * @param {number} value
     */
    set page(value) {}

    /**
     * @type {number}
     */
    get rotation() {
      return 0;
    }

    /**
     * @param {number} value
     */
    set rotation(value) {}

    /**
     * @param {string|Array} dest - The named, or explicit, PDF destination.
     */
    async goToDestination(dest) {}

    /**
     * @param {number|string} val - The page number, or page label.
     */
    goToPage(val) {}

    /**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
    getDestinationHash(dest) {
      return "#";
    }

    /**
     * @param hash - The PDF parameters/hash.
     * @returns {string} The hyperlink to the PDF object.
     */
    getAnchorUrl(hash) {
      return "#";
    }

    /**
     * @param {string} hash
     */
    setHash(hash) {}

    /**
     * @param {string} action
     */
    executeNamedAction(action) {}

    /**
     * @param {number} pageNum - page number.
     * @param {Object} pageRef - reference to the page.
     */
    cachePageRef(pageNum, pageRef) {}

    /**
     * @param {number} pageNumber
     */
    isPageVisible(pageNumber) {
      return true;
    }

    /**
     * @param {number} pageNumber
     */
    isPageCached(pageNumber) {
      return true;
    }
  }

  return { PDFLinkService, SimpleLinkService };
});
define('skylark-pdfjs-viewer/pdf_outline_viewer',[
  "skylark-pdfjs-display",
  "./ui_utils",
  "./base_tree_viewer"
],function(pdfjsLib,ui_utils,base_tree_viewer){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const {
    addLinkAttributes,
    createPromiseCapability,
    LinkTarget,
  } = pdfjsLib;

  const { BaseTreeViewer } = base_tree_viewer;
  const { SidebarView } = ui_utils;

  /**
   * @typedef {Object} PDFOutlineViewerOptions
   * @property {HTMLDivElement} container - The viewer element.
   * @property {IPDFLinkService} linkService - The navigation/linking service.
   * @property {EventBus} eventBus - The application event bus.
   */

  /**
   * @typedef {Object} PDFOutlineViewerRenderParameters
   * @property {Array|null} outline - An array of outline objects.
   * @property {PDFDocument} pdfDocument - A {PDFDocument} instance.
   */

  class PDFOutlineViewer extends BaseTreeViewer {
    /**
     * @param {PDFOutlineViewerOptions} options
     */
    constructor(options) {
      super(options);
      this.linkService = options.linkService;

      this.eventBus._on("toggleoutlinetree", this._toggleAllTreeItems.bind(this));
      this.eventBus._on(
        "currentoutlineitem",
        this._currentOutlineItem.bind(this)
      );

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

    /**
     * @private
     */
    _dispatchEvent(outlineCount) {
      this.eventBus.dispatch("outlineloaded", {
        source: this,
        outlineCount,
        enableCurrentOutlineItemButton:
          ///outlineCount > 0 && !this._pdfDocument?.loadingParams.disableAutoFetch, // lwf
          outlineCount > 0 && !(this._pdfDocument && this._pdfDocument.loadingParams.disableAutoFetch),
      });
    }

    /**
     * @private
     */
    _bindLink(element, { url, newWindow, dest }) {
      const { linkService } = this;

      if (url) {
        addLinkAttributes(element, {
          url,
          target: newWindow ? LinkTarget.BLANK : linkService.externalLinkTarget,
          rel: linkService.externalLinkRel,
          enabled: linkService.externalLinkEnabled,
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

    /**
     * @private
     */
    _setStyles(element, { bold, italic }) {
      if (bold) {
        element.style.fontWeight = "bold";
      }
      if (italic) {
        element.style.fontStyle = "italic";
      }
    }

    /**
     * @private
     */
    _addToggleButton(div, { count, items }) {
      let hidden = false;
      if (count < 0) {
        let totalCount = items.length;
        if (totalCount > 0) {
          const queue = [...items];
          while (queue.length > 0) {
            const { count: nestedCount, items: nestedItems } = queue.shift();
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

    /**
     * @private
     */
    _toggleAllTreeItems() {
      if (!this._outline) {
        return;
      }
      super._toggleAllTreeItems();
    }

    /**
     * @param {PDFOutlineViewerRenderParameters} params
     */
    render({ outline, pdfDocument }) {
      if (this._outline) {
        this.reset();
      }
      this._outline = outline || null;
      this._pdfDocument = pdfDocument || null;

      if (!outline) {
        this._dispatchEvent(/* outlineCount = */ 0);
        return;
      }

      const fragment = document.createDocumentFragment();
      const queue = [{ parent: fragment, items: outline }];
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

            queue.push({ parent: itemsDiv, items: item.items });
          }

          levelData.parent.appendChild(div);
          outlineCount++;
        }
      }

      this._finishRendering(fragment, outlineCount, hasAnyNesting);
    }

    /**
     * Find/highlight the current outline item, corresponding to the active page.
     * @private
     */
    async _currentOutlineItem() {
      if (!this._isPagesLoaded) {
        throw new Error("_currentOutlineItem: All pages have not been loaded.");
      }
      if (!this._outline || !this._pdfDocument) {
        return;
      }

      const pageNumberToDestHash = await this._getPageNumberToDestHash(
        this._pdfDocument
      );
      if (!pageNumberToDestHash) {
        return;
      }
      this._updateCurrentTreeItem(/* treeItem = */ null);

      if (this._sidebarView !== SidebarView.OUTLINE) {
        return; // The outline view is no longer visible, hence do nothing.
      }
      // When there is no destination on the current page, always check the
      // previous ones in (reverse) order.
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

    /**
     * To (significantly) simplify the overall implementation, we will only
     * consider *one* destination per page when finding/highlighting the current
     * outline item (similar to e.g. Adobe Reader); more specifically, we choose
     * the *first* outline item at the *lowest* level of the outline tree.
     * @private
     */
    async _getPageNumberToDestHash(pdfDocument) {
      if (this._pageNumberToDestHashCapability) {
        return this._pageNumberToDestHashCapability.promise;
      }
      this._pageNumberToDestHashCapability = createPromiseCapability();

      const pageNumberToDestHash = new Map(),
        pageNumberNesting = new Map();
      const queue = [{ nesting: 0, items: this._outline }];
      while (queue.length > 0) {
        const levelData = queue.shift(),
          currentNesting = levelData.nesting;
        for (const { dest, items } of levelData.items) {
          let explicitDest, pageNumber;
          if (typeof dest === "string") {
            explicitDest = await pdfDocument.getDestination(dest);

            if (pdfDocument !== this._pdfDocument) {
              return null; // The document was closed while the data resolved.
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
                    return null; // The document was closed while the data resolved.
                  }
                  this.linkService.cachePageRef(pageNumber, destRef);
                } catch (ex) {
                  // Invalid page reference, ignore it and continue parsing.
                }
              }
            } else if (Number.isInteger(destRef)) {
              pageNumber = destRef + 1;
            }

            if (
              Number.isInteger(pageNumber) &&
              (!pageNumberToDestHash.has(pageNumber) ||
                currentNesting > pageNumberNesting.get(pageNumber))
            ) {
              const destHash = this.linkService.getDestinationHash(dest);
              pageNumberToDestHash.set(pageNumber, destHash);
              pageNumberNesting.set(pageNumber, currentNesting);
            }
          }

          if (items.length > 0) {
            queue.push({ nesting: currentNesting + 1, items });
          }
        }
      }

      this._pageNumberToDestHashCapability.resolve(
        pageNumberToDestHash.size > 0 ? pageNumberToDestHash : null
      );
      return this._pageNumberToDestHashCapability.promise;
    }
  }

  return { PDFOutlineViewer };
});
define('skylark-pdfjs-viewer/pdf_presentation_mode',[
  "./pdfjs_dev",
  "./ui_utils",
],function(
  PDFJSDev,
  ui_utils
){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { normalizeWheelEventDelta, PresentationModeState } = ui_utils;

  const DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS = 1500; // in ms
  const DELAY_BEFORE_HIDING_CONTROLS = 3000; // in ms
  const ACTIVE_SELECTOR = "pdfPresentationMode";
  const CONTROLS_SELECTOR = "pdfPresentationModeControls";
  const MOUSE_SCROLL_COOLDOWN_TIME = 50; // in ms
  const PAGE_SWITCH_THRESHOLD = 0.1;

  // Number of CSS pixels for a movement to count as a swipe.
  const SWIPE_MIN_DISTANCE_THRESHOLD = 50;

  // Swipe angle deviation from the x or y axis before it is not
  // considered a swipe in that direction any more.
  const SWIPE_ANGLE_THRESHOLD = Math.PI / 6;

  /**
   * @typedef {Object} PDFPresentationModeOptions
   * @property {HTMLDivElement} container - The container for the viewer element.
   * @property {PDFViewer} pdfViewer - The document viewer.
   * @property {EventBus} eventBus - The application event bus.
   * @property {Array} [contextMenuItems] - The menu items that are added to the
   *   context menu in Presentation Mode.
   */

  class PDFPresentationMode {
    /**
     * @param {PDFPresentationModeOptions} options
     */
    constructor({ container, pdfViewer, eventBus, contextMenuItems = null }) {
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
          this.eventBus.dispatch("firstpage", { source: this });
        });
        contextMenuItems.contextLastPage.addEventListener("click", () => {
          this.contextMenuOpen = false;
          this.eventBus.dispatch("lastpage", { source: this });
        });
        contextMenuItems.contextPageRotateCw.addEventListener("click", () => {
          this.contextMenuOpen = false;
          this.eventBus.dispatch("rotatecw", { source: this });
        });
        contextMenuItems.contextPageRotateCcw.addEventListener("click", () => {
          this.contextMenuOpen = false;
          this.eventBus.dispatch("rotateccw", { source: this });
        });
      }
    }

    /**
     * Request the browser to enter fullscreen mode.
     * @returns {boolean} Indicating if the request was successful.
     */
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
        previousScale: this.pdfViewer.currentScaleValue,
      };

      return true;
    }

    /**
     * @private
     */
    _mouseWheel(evt) {
      if (!this.active) {
        return;
      }

      evt.preventDefault();

      const delta = normalizeWheelEventDelta(evt);
      const currentTime = new Date().getTime();
      const storedTime = this.mouseScrollTimeStamp;

      // If we've already switched page, avoid accidentally switching again.
      if (
        currentTime > storedTime &&
        currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME
      ) {
        return;
      }
      // If the scroll direction changed, reset the accumulated scroll delta.
      if (
        (this.mouseScrollDelta > 0 && delta < 0) ||
        (this.mouseScrollDelta < 0 && delta > 0)
      ) {
        this._resetMouseScrollState();
      }
      this.mouseScrollDelta += delta;

      if (Math.abs(this.mouseScrollDelta) >= PAGE_SWITCH_THRESHOLD) {
        const totalDelta = this.mouseScrollDelta;
        this._resetMouseScrollState();
        const success =
          totalDelta > 0
            ? this.pdfViewer.previousPage()
            : this.pdfViewer.nextPage();
        if (success) {
          this.mouseScrollTimeStamp = currentTime;
        }
      }
    }

    get isFullscreen() {
      return !!(
        document.fullscreenElement ||
        document.mozFullScreen ||
        document.webkitIsFullScreen
      );
    }

    /**
     * @private
     */
    _notifyStateChange() {
      let state = PresentationModeState.NORMAL;
      if (this.switchInProgress) {
        state = PresentationModeState.CHANGING;
      } else if (this.active) {
        state = PresentationModeState.FULLSCREEN;
      }

      if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("MOZCENTRAL")) {
        this.eventBus.dispatch("presentationmodechanged", {
          source: this,
          state,
        });
      } else {
        this.eventBus.dispatch("presentationmodechanged", {
          source: this,
          state,
          get active() {
            throw new Error(
              "Deprecated parameter: `active`, please use `state` instead."
            );
          },
          get switchInProgress() {
            throw new Error(
              "Deprecated parameter: `switchInProgress`, please use `state` instead."
            );
          },
        });
      }
    }

    /**
     * Used to initialize a timeout when requesting Presentation Mode,
     * i.e. when the browser is requested to enter fullscreen mode.
     * This timeout is used to prevent the current page from being scrolled
     * partially, or completely, out of view when entering Presentation Mode.
     * NOTE: This issue seems limited to certain zoom levels (e.g. page-width).
     *
     * @private
     */
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

    /**
     * @private
     */
    _resetSwitchInProgress() {
      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
        delete this.switchInProgress;
      }
    }

    /**
     * @private
     */
    _enter() {
      this.active = true;
      this._resetSwitchInProgress();
      this._notifyStateChange();
      this.container.classList.add(ACTIVE_SELECTOR);

      // Ensure that the correct page is scrolled into view when entering
      // Presentation Mode, by waiting until fullscreen mode in enabled.
      setTimeout(() => {
        this.pdfViewer.currentPageNumber = this.args.page;
        this.pdfViewer.currentScaleValue = "page-fit";
      }, 0);

      this._addWindowListeners();
      this._showControls();
      this.contextMenuOpen = false;
      this.container.setAttribute("contextmenu", "viewerContextMenu");

      // Text selection is disabled in Presentation Mode, thus it's not possible
      // for the user to deselect text that is selected (e.g. with "Select all")
      // when entering Presentation Mode, hence we remove any active selection.
      window.getSelection().removeAllRanges();
    }

    /**
     * @private
     */
    _exit() {
      const page = this.pdfViewer.currentPageNumber;
      this.container.classList.remove(ACTIVE_SELECTOR);

      // Ensure that the correct page is scrolled into view when exiting
      // Presentation Mode, by waiting until fullscreen mode is disabled.
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

    /**
     * @private
     */
    _mouseDown(evt) {
      if (this.contextMenuOpen) {
        this.contextMenuOpen = false;
        evt.preventDefault();
        return;
      }
      if (evt.button === 0) {
        // Enable clicking of links in presentation mode. Note: only links
        // pointing to destinations in the current PDF document work.
        const isInternalLink =
          evt.target.href && evt.target.classList.contains("internalLink");
        if (!isInternalLink) {
          // Unless an internal link was clicked, advance one page.
          evt.preventDefault();

          if (evt.shiftKey) {
            this.pdfViewer.previousPage();
          } else {
            this.pdfViewer.nextPage();
          }
        }
      }
    }

    /**
     * @private
     */
    _contextMenu() {
      this.contextMenuOpen = true;
    }

    /**
     * @private
     */
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

    /**
     * @private
     */
    _hideControls() {
      if (!this.controlsTimeout) {
        return;
      }
      clearTimeout(this.controlsTimeout);
      this.container.classList.remove(CONTROLS_SELECTOR);
      delete this.controlsTimeout;
    }

    /**
     * Resets the properties used for tracking mouse scrolling events.
     *
     * @private
     */
    _resetMouseScrollState() {
      this.mouseScrollTimeStamp = 0;
      this.mouseScrollDelta = 0;
    }

    /**
     * @private
     */
    _touchSwipe(evt) {
      if (!this.active) {
        return;
      }
      if (evt.touches.length > 1) {
        // Multiple touch points detected; cancel the swipe.
        this.touchSwipeState = null;
        return;
      }

      switch (evt.type) {
        case "touchstart":
          this.touchSwipeState = {
            startX: evt.touches[0].pageX,
            startY: evt.touches[0].pageY,
            endX: evt.touches[0].pageX,
            endY: evt.touches[0].pageY,
          };
          break;
        case "touchmove":
          if (this.touchSwipeState === null) {
            return;
          }
          this.touchSwipeState.endX = evt.touches[0].pageX;
          this.touchSwipeState.endY = evt.touches[0].pageY;
          // Avoid the swipe from triggering browser gestures (Chrome in
          // particular has some sort of swipe gesture in fullscreen mode).
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
          if (
            Math.abs(dx) > SWIPE_MIN_DISTANCE_THRESHOLD &&
            (absAngle <= SWIPE_ANGLE_THRESHOLD ||
              absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD)
          ) {
            // Horizontal swipe.
            delta = dx;
          } else if (
            Math.abs(dy) > SWIPE_MIN_DISTANCE_THRESHOLD &&
            Math.abs(absAngle - Math.PI / 2) <= SWIPE_ANGLE_THRESHOLD
          ) {
            // Vertical swipe.
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

    /**
     * @private
     */
    _addWindowListeners() {
      this.showControlsBind = this._showControls.bind(this);
      this.mouseDownBind = this._mouseDown.bind(this);
      this.mouseWheelBind = this._mouseWheel.bind(this);
      this.resetMouseScrollStateBind = this._resetMouseScrollState.bind(this);
      this.contextMenuBind = this._contextMenu.bind(this);
      this.touchSwipeBind = this._touchSwipe.bind(this);

      window.addEventListener("mousemove", this.showControlsBind);
      window.addEventListener("mousedown", this.mouseDownBind);
      window.addEventListener("wheel", this.mouseWheelBind, { passive: false });
      window.addEventListener("keydown", this.resetMouseScrollStateBind);
      window.addEventListener("contextmenu", this.contextMenuBind);
      window.addEventListener("touchstart", this.touchSwipeBind);
      window.addEventListener("touchmove", this.touchSwipeBind);
      window.addEventListener("touchend", this.touchSwipeBind);
    }

    /**
     * @private
     */
    _removeWindowListeners() {
      window.removeEventListener("mousemove", this.showControlsBind);
      window.removeEventListener("mousedown", this.mouseDownBind);
      window.removeEventListener("wheel", this.mouseWheelBind, {
        passive: false,
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

    /**
     * @private
     */
    _fullscreenChange() {
      if (this.isFullscreen) {
        this._enter();
      } else {
        this._exit();
      }
    }

    /**
     * @private
     */
    _addFullscreenChangeListeners() {
      this.fullscreenChangeBind = this._fullscreenChange.bind(this);

      window.addEventListener("fullscreenchange", this.fullscreenChangeBind);
      window.addEventListener("mozfullscreenchange", this.fullscreenChangeBind);
      if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("MOZCENTRAL")) {
        window.addEventListener(
          "webkitfullscreenchange",
          this.fullscreenChangeBind
        );
      }
    }

    /**
     * @private
     */
    _removeFullscreenChangeListeners() {
      window.removeEventListener("fullscreenchange", this.fullscreenChangeBind);
      window.removeEventListener(
        "mozfullscreenchange",
        this.fullscreenChangeBind
      );
      if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("MOZCENTRAL")) {
        window.removeEventListener(
          "webkitfullscreenchange",
          this.fullscreenChangeBind
        );
      }

      delete this.fullscreenChangeBind;
    }
  }

  return { PDFPresentationMode };
});
define('skylark-pdfjs-viewer/pdf_sidebar',[
  "./ui_utils",
  "./pdf_rendering_queue"
],function(ui_utils,pdf_rendering_queue){
  /* Copyright 2016 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { NullL10n, PresentationModeState, SidebarView } = ui_utils;
  const { RenderingStates } = pdf_rendering_queue;

  const UI_NOTIFICATION_CLASS = "pdfSidebarNotification";

  /**
   * @typedef {Object} PDFSidebarOptions
   * @property {PDFSidebarElements} elements - The DOM elements.
   * @property {PDFViewer} pdfViewer - The document viewer.
   * @property {PDFThumbnailViewer} pdfThumbnailViewer - The thumbnail viewer.
   * @property {EventBus} eventBus - The application event bus.
   * @property {IL10n} l10n - The localization service.
   */

  /**
   * @typedef {Object} PDFSidebarElements
   * @property {HTMLDivElement} outerContainer - The outer container
   *   (encasing both the viewer and sidebar elements).
   * @property {HTMLDivElement} viewerContainer - The viewer container
   *   (in which the viewer element is placed).
   * @property {HTMLButtonElement} toggleButton - The button used for
   *   opening/closing the sidebar.
   * @property {HTMLButtonElement} thumbnailButton - The button used to show
   *   the thumbnail view.
   * @property {HTMLButtonElement} outlineButton - The button used to show
   *   the outline view.
   * @property {HTMLButtonElement} attachmentsButton - The button used to show
   *   the attachments view.
   * @property {HTMLButtonElement} layersButton - The button used to show
   *   the layers view.
   * @property {HTMLDivElement} thumbnailView - The container in which
   *   the thumbnails are placed.
   * @property {HTMLDivElement} outlineView - The container in which
   *   the outline is placed.
   * @property {HTMLDivElement} attachmentsView - The container in which
   *   the attachments are placed.
   * @property {HTMLDivElement} layersView - The container in which
   *   the layers are placed.
   * @property {HTMLDivElement} outlineOptionsContainer - The container in which
   *   the outline view-specific option button(s) are placed.
   * @property {HTMLButtonElement} currentOutlineItemButton - The button used to
   *   find the current outline item.
   */

  class PDFSidebar {
    /**
     * @param {PDFSidebarOptions} options
     */
    constructor({
      elements,
      pdfViewer,
      pdfThumbnailViewer,
      eventBus,
      l10n = NullL10n,
    }) {
      this.isOpen = false;
      this.active = SidebarView.THUMBS;
      this.isInitialViewSet = false;

      /**
       * Callback used when the sidebar has been opened/closed, to ensure that
       * the viewers (PDFViewer/PDFThumbnailViewer) are updated correctly.
       */
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

      this._hideUINotification(/* reset = */ true);
      this.switchView(SidebarView.THUMBS);

      this.outlineButton.disabled = false;
      this.attachmentsButton.disabled = false;
      this.layersButton.disabled = false;
      this._currentOutlineItemButton.disabled = true;
    }

    /**
     * @type {number} One of the values in {SidebarView}.
     */
    get visibleView() {
      return this.isOpen ? this.active : SidebarView.NONE;
    }

    get isThumbnailViewVisible() {
      return this.isOpen && this.active === SidebarView.THUMBS;
    }

    get isOutlineViewVisible() {
      return this.isOpen && this.active === SidebarView.OUTLINE;
    }

    get isAttachmentsViewVisible() {
      return this.isOpen && this.active === SidebarView.ATTACHMENTS;
    }

    get isLayersViewVisible() {
      return this.isOpen && this.active === SidebarView.LAYERS;
    }

    /**
     * @param {number} view - The sidebar view that should become visible,
     *                        must be one of the values in {SidebarView}.
     */
    setInitialView(view = SidebarView.NONE) {
      if (this.isInitialViewSet) {
        return;
      }
      this.isInitialViewSet = true;

      // If the user has already manually opened the sidebar, immediately closing
      // it would be bad UX; also ignore the "unknown" sidebar view value.
      if (view === SidebarView.NONE || view === SidebarView.UNKNOWN) {
        this._dispatchEvent();
        return;
      }
      // Prevent dispatching two back-to-back `sidebarviewchanged` events,
      // since `this._switchView` dispatched the event if the view changed.
      if (!this._switchView(view, /* forceOpen */ true)) {
        this._dispatchEvent();
      }
    }

    /**
     * @param {number} view - The sidebar view that should be switched to,
     *                        must be one of the values in {SidebarView}.
     * @param {boolean} [forceOpen] - Ensure that the sidebar is open.
     *                                The default value is `false`.
     */
    switchView(view, forceOpen = false) {
      this._switchView(view, forceOpen);
    }

    /**
     * @returns {boolean} Indicating if `this._dispatchEvent` was called.
     * @private
     */
    _switchView(view, forceOpen = false) {
      const isViewChanged = view !== this.active;
      let shouldForceRendering = false;

      switch (view) {
        case SidebarView.NONE:
          if (this.isOpen) {
            this.close();
            return true; // Closing will trigger rendering and dispatch the event.
          }
          return false;
        case SidebarView.THUMBS:
          if (this.isOpen && isViewChanged) {
            shouldForceRendering = true;
          }
          break;
        case SidebarView.OUTLINE:
          if (this.outlineButton.disabled) {
            return false;
          }
          break;
        case SidebarView.ATTACHMENTS:
          if (this.attachmentsButton.disabled) {
            return false;
          }
          break;
        case SidebarView.LAYERS:
          if (this.layersButton.disabled) {
            return false;
          }
          break;
        default:
          console.error(`PDFSidebar._switchView: "${view}" is not a valid view.`);
          return false;
      }
      // Update the active view *after* it has been validated above,
      // in order to prevent setting it to an invalid state.
      this.active = view;

      // Update the CSS classes, for all buttons...
      this.thumbnailButton.classList.toggle(
        "toggled",
        view === SidebarView.THUMBS
      );
      this.outlineButton.classList.toggle(
        "toggled",
        view === SidebarView.OUTLINE
      );
      this.attachmentsButton.classList.toggle(
        "toggled",
        view === SidebarView.ATTACHMENTS
      );
      this.layersButton.classList.toggle("toggled", view === SidebarView.LAYERS);
      // ... and for all views.
      this.thumbnailView.classList.toggle("hidden", view !== SidebarView.THUMBS);
      this.outlineView.classList.toggle("hidden", view !== SidebarView.OUTLINE);
      this.attachmentsView.classList.toggle(
        "hidden",
        view !== SidebarView.ATTACHMENTS
      );
      this.layersView.classList.toggle("hidden", view !== SidebarView.LAYERS);

      // Finally, update view-specific CSS classes.
      this._outlineOptionsContainer.classList.toggle(
        "hidden",
        view !== SidebarView.OUTLINE
      );

      if (forceOpen && !this.isOpen) {
        this.open();
        return true; // Opening will trigger rendering and dispatch the event.
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

      if (this.active === SidebarView.THUMBS) {
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

    /**
     * @private
     */
    _dispatchEvent() {
      this.eventBus.dispatch("sidebarviewchanged", {
        source: this,
        view: this.visibleView,
      });
    }

    /**
     * @private
     */
    _forceRendering() {
      if (this.onToggled) {
        this.onToggled();
      } else {
        // Fallback
        this.pdfViewer.forceRendering();
        this.pdfThumbnailViewer.forceRendering();
      }
    }

    /**
     * @private
     */
    _updateThumbnailViewer() {
      const { pdfViewer, pdfThumbnailViewer } = this;

      // Use the rendered pages to set the corresponding thumbnail images.
      const pagesCount = pdfViewer.pagesCount;
      for (let pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
        const pageView = pdfViewer.getPageView(pageIndex);
        if (pageView && pageView.renderingState === RenderingStates.FINISHED) {
          const thumbnailView = pdfThumbnailViewer.getThumbnail(pageIndex);
          thumbnailView.setImage(pageView);
        }
      }
      pdfThumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
    }

    /**
     * @private
     */
    _showUINotification() {
      this.l10n
        .get(
          "toggle_sidebar_notification2.title",
          null,
          "Toggle Sidebar (document contains outline/attachments/layers)"
        )
        .then(msg => {
          this.toggleButton.title = msg;
        });

      if (!this.isOpen) {
        // Only show the notification on the `toggleButton` if the sidebar is
        // currently closed, to avoid unnecessarily bothering the user.
        this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
      }
    }

    /**
     * @private
     */
    _hideUINotification(reset = false) {
      if (this.isOpen || reset) {
        // Only hide the notification on the `toggleButton` if the sidebar is
        // currently open, or when the current PDF document is being closed.
        this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
      }

      if (reset) {
        this.l10n
          .get("toggle_sidebar.title", null, "Toggle Sidebar")
          .then(msg => {
            this.toggleButton.title = msg;
          });
      }
    }

    /**
     * @private
     */
    _addEventListeners() {
      this.viewerContainer.addEventListener("transitionend", evt => {
        if (evt.target === this.viewerContainer) {
          this.outerContainer.classList.remove("sidebarMoving");
        }
      });

      this.toggleButton.addEventListener("click", () => {
        this.toggle();
      });

      // Buttons for switching views.
      this.thumbnailButton.addEventListener("click", () => {
        this.switchView(SidebarView.THUMBS);
      });

      this.outlineButton.addEventListener("click", () => {
        this.switchView(SidebarView.OUTLINE);
      });
      this.outlineButton.addEventListener("dblclick", () => {
        this.eventBus.dispatch("toggleoutlinetree", { source: this });
      });

      this.attachmentsButton.addEventListener("click", () => {
        this.switchView(SidebarView.ATTACHMENTS);
      });

      this.layersButton.addEventListener("click", () => {
        this.switchView(SidebarView.LAYERS);
      });
      this.layersButton.addEventListener("dblclick", () => {
        this.eventBus.dispatch("resetlayers", { source: this });
      });

      // Buttons for view-specific options.
      this._currentOutlineItemButton.addEventListener("click", () => {
        this.eventBus.dispatch("currentoutlineitem", { source: this });
      });

      // Disable/enable views.
      const onTreeLoaded = (count, button, view) => {
        button.disabled = !count;

        if (count) {
          this._showUINotification();
        } else if (this.active === view) {
          // If the `view` was opened by the user during document load,
          // switch away from it if it turns out to be empty.
          this.switchView(SidebarView.THUMBS);
        }
      };

      this.eventBus._on("outlineloaded", evt => {
        onTreeLoaded(evt.outlineCount, this.outlineButton, SidebarView.OUTLINE);

        if (evt.enableCurrentOutlineItemButton) {
          this.pdfViewer.pagesPromise.then(() => {
            this._currentOutlineItemButton.disabled = !this.isInitialViewSet;
          });
        }
      });

      this.eventBus._on("attachmentsloaded", evt => {
        onTreeLoaded(
          evt.attachmentsCount,
          this.attachmentsButton,
          SidebarView.ATTACHMENTS
        );
      });

      this.eventBus._on("layersloaded", evt => {
        onTreeLoaded(evt.layersCount, this.layersButton, SidebarView.LAYERS);
      });

      // Update the thumbnailViewer, if visible, when exiting presentation mode.
      this.eventBus._on("presentationmodechanged", evt => {
        if (
          evt.state === PresentationModeState.NORMAL &&
          this.isThumbnailViewVisible
        ) {
          this._updateThumbnailViewer();
        }
      });
    }
  }

  return { PDFSidebar };
});
define('skylark-pdfjs-viewer/pdf_sidebar_resizer',[
  "./ui_utils",
],function(ui_utils){
  /* Copyright 2017 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { NullL10n } = ui_utils;

  const SIDEBAR_WIDTH_VAR = "--sidebar-width";
  const SIDEBAR_MIN_WIDTH = 200; // pixels
  const SIDEBAR_RESIZING_CLASS = "sidebarResizing";

  /**
   * @typedef {Object} PDFSidebarResizerOptions
   * @property {HTMLDivElement} outerContainer - The outer container
   *   (encasing both the viewer and sidebar elements).
   * @property {HTMLDivElement} resizer - The DOM element that can be dragged in
   *   order to adjust the width of the sidebar.
   */

  class PDFSidebarResizer {
    /**
     * @param {PDFSidebarResizerOptions} options
     * @param {EventBus} eventBus - The application event bus.
     * @param {IL10n} l10n - Localization service.
     */
    constructor(options, eventBus, l10n = NullL10n) {
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

    /**
     * @type {number}
     */
    get outerContainerWidth() {
      if (!this._outerContainerWidth) {
        this._outerContainerWidth = this.outerContainer.clientWidth;
      }
      return this._outerContainerWidth;
    }

    /**
     * @private
     * returns {boolean} Indicating if the sidebar width was updated.
     */
    _updateWidth(width = 0) {
      // Prevent the sidebar from becoming too narrow, or from occupying more
      // than half of the available viewer width.
      const maxWidth = Math.floor(this.outerContainerWidth / 2);
      if (width > maxWidth) {
        width = maxWidth;
      }
      if (width < SIDEBAR_MIN_WIDTH) {
        width = SIDEBAR_MIN_WIDTH;
      }
      // Only update the UI when the sidebar width did in fact change.
      if (width === this._width) {
        return false;
      }
      this._width = width;
      this.doc.style.setProperty(SIDEBAR_WIDTH_VAR, `${width}px`);
      return true;
    }

    /**
     * @private
     */
    _mouseMove(evt) {
      let width = evt.clientX;
      // For sidebar resizing to work correctly in RTL mode, invert the width.
      if (this.isRTL) {
        width = this.outerContainerWidth - width;
      }
      this._updateWidth(width);
    }

    /**
     * @private
     */
    _mouseUp(evt) {
      // Re-enable the `transition-duration` rules when sidebar resizing ends...
      this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
      // ... and ensure that rendering will always be triggered.
      this.eventBus.dispatch("resize", { source: this });

      const _boundEvents = this._boundEvents;
      window.removeEventListener("mousemove", _boundEvents.mouseMove);
      window.removeEventListener("mouseup", _boundEvents.mouseUp);
    }

    /**
     * @private
     */
    _addEventListeners() {
      const _boundEvents = this._boundEvents;
      _boundEvents.mouseMove = this._mouseMove.bind(this);
      _boundEvents.mouseUp = this._mouseUp.bind(this);

      this.resizer.addEventListener("mousedown", evt => {
        if (evt.button !== 0) {
          return;
        }
        // Disable the `transition-duration` rules when sidebar resizing begins,
        // in order to improve responsiveness and to avoid visual glitches.
        this.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);

        window.addEventListener("mousemove", _boundEvents.mouseMove);
        window.addEventListener("mouseup", _boundEvents.mouseUp);
      });

      this.eventBus._on("sidebarviewchanged", evt => {
        this.sidebarOpen = !!(evt && evt.view);
      });

      this.eventBus._on("resize", evt => {
        // When the *entire* viewer is resized, such that it becomes narrower,
        // ensure that the sidebar doesn't end up being too wide.
        if (!evt || evt.source !== window) {
          return;
        }
        // Always reset the cached width when the viewer is resized.
        this._outerContainerWidth = null;

        if (!this._width) {
          // The sidebar hasn't been resized, hence no need to adjust its width.
          return;
        }
        // NOTE: If the sidebar is closed, we don't need to worry about
        //       visual glitches nor ensure that rendering is triggered.
        if (!this.sidebarOpen) {
          this._updateWidth(this._width);
          return;
        }
        this.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);
        const updated = this._updateWidth(this._width);

        Promise.resolve().then(() => {
          this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
          // Trigger rendering if the sidebar width changed, to avoid
          // depending on the order in which 'resize' events are handled.
          if (updated) {
            this.eventBus.dispatch("resize", { source: this });
          }
        });
      });
    }
  }

  return { PDFSidebarResizer };
});
define('skylark-pdfjs-viewer/pdf_thumbnail_view',[
  "skylark-pdfjs-display",
  "./pdfjs_dev",
  "./ui_utils",
  "./pdf_rendering_queue"
],function(
  pdfjsLib,
  PDFJSDev,
  ui_utils,
  pdf_rendering_queue
){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { getOutputScale, NullL10n } = ui_utils;
  const { RenderingCancelledException } = pdfjsLib;
  const { RenderingStates } = pdf_rendering_queue;

  const MAX_NUM_SCALING_STEPS = 3;
  const THUMBNAIL_CANVAS_BORDER_WIDTH = 1; // px
  const THUMBNAIL_WIDTH = 98; // px

  /**
   * @typedef {Object} PDFThumbnailViewOptions
   * @property {HTMLDivElement} container - The viewer element.
   * @property {number} id - The thumbnail's unique ID (normally its number).
   * @property {PageViewport} defaultViewport - The page viewport.
   * @property {Promise<OptionalContentConfig>} [optionalContentConfigPromise] -
   *   A promise that is resolved with an {@link OptionalContentConfig} instance.
   *   The default value is `null`.
   * @property {IPDFLinkService} linkService - The navigation/linking service.
   * @property {PDFRenderingQueue} renderingQueue - The rendering queue object.
   * @property {function} checkSetImageDisabled
   * @property {boolean} [disableCanvasToImageConversion] - Don't convert the
   *   canvas thumbnails to images. This prevents `toDataURL` calls, but
   *   increases the overall memory usage. The default value is `false`.
   * @property {IL10n} l10n - Localization service.
   */

  const TempImageFactory = (function TempImageFactoryClosure() {
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

        // Since this is a temporary canvas, we need to fill it with a white
        // background ourselves. `_getPageDrawContext` uses CSS rules for this.
        if (
          typeof PDFJSDev === "undefined" ||
          PDFJSDev.test("MOZCENTRAL || GENERIC")
        ) {
          tempCanvas.mozOpaque = true;
        }

        const ctx = tempCanvas.getContext("2d", { alpha: false });
        ctx.save();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        return tempCanvas;
      },

      destroyCanvas() {
        const tempCanvas = tempCanvasCache;
        if (tempCanvas) {
          // Zeroing the width and height causes Firefox to release graphics
          // resources immediately, which can greatly reduce memory consumption.
          tempCanvas.width = 0;
          tempCanvas.height = 0;
        }
        tempCanvasCache = null;
      },
    };
  })();

  /**
   * @implements {IRenderableView}
   */
  class PDFThumbnailView {
    /**
     * @param {PDFThumbnailViewOptions} options
     */
    constructor({
      container,
      id,
      defaultViewport,
      optionalContentConfigPromise,
      linkService,
      renderingQueue,
      checkSetImageDisabled,
      disableCanvasToImageConversion = false,
      l10n = NullL10n,
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
      this.renderingState = RenderingStates.INITIAL;
      this.resume = null;
      this._checkSetImageDisabled =
        checkSetImageDisabled ||
        function () {
          return false;
        };
      this.disableCanvasToImageConversion = disableCanvasToImageConversion;

      this.pageWidth = this.viewport.width;
      this.pageHeight = this.viewport.height;
      this.pageRatio = this.pageWidth / this.pageHeight;

      this.canvasWidth = THUMBNAIL_WIDTH;
      this.canvasHeight = (this.canvasWidth / this.pageRatio) | 0;
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
      this.viewport = pdfPage.getViewport({ scale: 1, rotation: totalRotation });
      this.reset();
    }

    reset() {
      this.cancelRendering();
      this.renderingState = RenderingStates.INITIAL;

      this.pageWidth = this.viewport.width;
      this.pageHeight = this.viewport.height;
      this.pageRatio = this.pageWidth / this.pageHeight;

      this.canvasHeight = (this.canvasWidth / this.pageRatio) | 0;
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
        // Zeroing the width and height causes Firefox to release graphics
        // resources immediately, which can greatly reduce memory consumption.
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
        rotation: totalRotation,
      });
      this.reset();
    }

    /**
     * PLEASE NOTE: Most likely you want to use the `this.reset()` method,
     *              rather than calling this one directly.
     */
    cancelRendering() {
      if (this.renderTask) {
        this.renderTask.cancel();
        this.renderTask = null;
      }
      this.resume = null;
    }

    /**
     * @private
     */
    _getPageDrawContext() {
      const canvas = document.createElement("canvas");
      // Keep the no-thumbnail outline visible, i.e. `data-loaded === false`,
      // until rendering/image conversion is complete, to avoid display issues.
      this.canvas = canvas;

      if (
        typeof PDFJSDev === "undefined" ||
        PDFJSDev.test("MOZCENTRAL || GENERIC")
      ) {
        canvas.mozOpaque = true;
      }
      const ctx = canvas.getContext("2d", { alpha: false });
      const outputScale = getOutputScale(ctx);

      canvas.width = (this.canvasWidth * outputScale.sx) | 0;
      canvas.height = (this.canvasHeight * outputScale.sy) | 0;
      canvas.style.width = this.canvasWidth + "px";
      canvas.style.height = this.canvasHeight + "px";

      const transform = outputScale.scaled
        ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0]
        : null;

      return [ctx, transform];
    }

    /**
     * @private
     */
    _convertCanvasToImage() {
      if (!this.canvas) {
        return;
      }
      if (this.renderingState !== RenderingStates.FINISHED) {
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

      // Zeroing the width and height causes Firefox to release graphics
      // resources immediately, which can greatly reduce memory consumption.
      this.canvas.width = 0;
      this.canvas.height = 0;
      delete this.canvas;
    }

    draw() {
      if (this.renderingState !== RenderingStates.INITIAL) {
        console.error("Must be in new state before drawing");
        return Promise.resolve(undefined);
      }
      const { pdfPage } = this;

      if (!pdfPage) {
        this.renderingState = RenderingStates.FINISHED;
        return Promise.reject(new Error("pdfPage is not loaded"));
      }

      this.renderingState = RenderingStates.RUNNING;

      const finishRenderTask = async (error = null) => {
        // The renderTask may have been replaced by a new one, so only remove
        // the reference to the renderTask if it matches the one that is
        // triggering this callback.
        if (renderTask === this.renderTask) {
          this.renderTask = null;
        }

        if (error instanceof RenderingCancelledException) {
          return;
        }

        this.renderingState = RenderingStates.FINISHED;
        this._convertCanvasToImage();

        if (error) {
          throw error;
        }
      };

      const [ctx, transform] = this._getPageDrawContext();
      const drawViewport = this.viewport.clone({ scale: this.scale });
      const renderContinueCallback = cont => {
        if (!this.renderingQueue.isHighestPriority(this)) {
          this.renderingState = RenderingStates.PAUSED;
          this.resume = () => {
            this.renderingState = RenderingStates.RUNNING;
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
        optionalContentConfigPromise: this._optionalContentConfigPromise,
      };
      const renderTask = (this.renderTask = pdfPage.render(renderContext));
      renderTask.onContinue = renderContinueCallback;

      const resultPromise = renderTask.promise.then(
        function () {
          finishRenderTask(null);
        },
        function (error) {
          finishRenderTask(error);
        }
      );
      // Only trigger cleanup, once rendering has finished, when the current
      // pageView is *not* cached on the `BaseViewer`-instance.
      resultPromise.finally(() => {
        const pageCached = this.linkService.isPageCached(this.id);
        if (pageCached) {
          return;
        }
        ///this.pdfPage?.cleanup(); lwf
        this.pdfPage && this.pdfPage.cleanup();
      });

      return resultPromise;
    }

    setImage(pageView) {
      if (this._checkSetImageDisabled()) {
        return;
      }
      if (this.renderingState !== RenderingStates.INITIAL) {
        return;
      }
      const img = pageView.canvas;
      if (!img) {
        return;
      }
      if (!this.pdfPage) {
        this.setPdfPage(pageView.pdfPage);
      }

      this.renderingState = RenderingStates.FINISHED;

      const [ctx] = this._getPageDrawContext();
      const canvas = ctx.canvas;
      if (img.width <= 2 * canvas.width) {
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        this._convertCanvasToImage();
        return;
      }

      // drawImage does an awful job of rescaling the image, doing it gradually.
      let reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
      let reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
      const reducedImage = TempImageFactory.getCanvas(
        reducedWidth,
        reducedHeight
      );
      const reducedImageCtx = reducedImage.getContext("2d");

      while (reducedWidth > img.width || reducedHeight > img.height) {
        reducedWidth >>= 1;
        reducedHeight >>= 1;
      }
      reducedImageCtx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        reducedWidth,
        reducedHeight
      );
      while (reducedWidth > 2 * canvas.width) {
        reducedImageCtx.drawImage(
          reducedImage,
          0,
          0,
          reducedWidth,
          reducedHeight,
          0,
          0,
          reducedWidth >> 1,
          reducedHeight >> 1
        );
        reducedWidth >>= 1;
        reducedHeight >>= 1;
      }
      ctx.drawImage(
        reducedImage,
        0,
        0,
        reducedWidth,
        reducedHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
      this._convertCanvasToImage();
    }

    get _thumbPageTitle() {
      return this.l10n.get(
        "thumb_page_title",
        ///{ page: this.pageLabel ?? this.id }, // lwf
        { page: this.pageLabel && this.id },
        "Page {{page}}"
      );
    }

    get _thumbPageCanvas() {
      return this.l10n.get(
        "thumb_page_canvas",
        ///{ page: this.pageLabel ?? this.id }, // lwf
        { page: this.pageLabel && this.id },
        "Thumbnail of Page {{page}}"
      );
    }

    /**
     * @param {string|null} label
     */
    setPageLabel(label) {
      this.pageLabel = typeof label === "string" ? label : null;

      this._thumbPageTitle.then(msg => {
        this.anchor.title = msg;
      });

      if (this.renderingState !== RenderingStates.FINISHED) {
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

  return { PDFThumbnailView, TempImageFactory };
});
define('skylark-pdfjs-viewer/pdf_thumbnail_viewer',[
  "./ui_utils",
  "./pdf_thumbnail_view",
  "./pdf_rendering_queue"
],function(ui_utils,pdf_thumbnail_view,pdf_rendering_queue){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const {
    getVisibleElements,
    isValidRotation,
    NullL10n,
    scrollIntoView,
    watchScroll,
  } = ui_utils;
  const { PDFThumbnailView, TempImageFactory } = pdf_thumbnail_view;
  const { RenderingStates } = pdf_rendering_queue;

  const THUMBNAIL_SCROLL_MARGIN = -19;
  const THUMBNAIL_SELECTED_CLASS = "selected";

  /**
   * @typedef {Object} PDFThumbnailViewerOptions
   * @property {HTMLDivElement} container - The container for the thumbnail
   *   elements.
   * @property {EventBus} eventBus - The application event bus.
   * @property {IPDFLinkService} linkService - The navigation/linking service.
   * @property {PDFRenderingQueue} renderingQueue - The rendering queue object.
   * @property {IL10n} l10n - Localization service.
   */

  /**
   * Viewer control to display thumbnails for pages in a PDF document.
   *
   * @implements {IRenderableView}
   */
  class PDFThumbnailViewer {
    /**
     * @param {PDFThumbnailViewerOptions} options
     */
    constructor({
      container,
      eventBus,
      linkService,
      renderingQueue,
      l10n = NullL10n,
    }) {
      this.container = container;
      this.linkService = linkService;
      this.renderingQueue = renderingQueue;
      this.l10n = l10n;

      this.scroll = watchScroll(this.container, this._scrollUpdated.bind(this));
      this._resetView();

      eventBus._on("optionalcontentconfigchanged", () => {
        // Ensure that the thumbnails always render with the *default* optional
        // content configuration.
        this._setImageDisabled = true;
      });
    }

    /**
     * @private
     */
    _scrollUpdated() {
      this.renderingQueue.renderHighestPriority();
    }

    getThumbnail(index) {
      return this._thumbnails[index];
    }

    /**
     * @private
     */
    _getVisibleThumbs() {
      return getVisibleElements({
        scrollEl: this.container,
        views: this._thumbnails,
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
        // Remove the highlight from the previous thumbnail...
        prevThumbnailView.div.classList.remove(THUMBNAIL_SELECTED_CLASS);
        // ... and add the highlight to the new thumbnail.
        thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
      }
      const visibleThumbs = this._getVisibleThumbs();
      const numVisibleThumbs = visibleThumbs.views.length;

      // If the thumbnail isn't currently visible, scroll it into view.
      if (numVisibleThumbs > 0) {
        const first = visibleThumbs.first.id;
        // Account for only one thumbnail being visible.
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
          scrollIntoView(thumbnailView.div, { top: THUMBNAIL_SCROLL_MARGIN });
        }
      }

      this._currentPageNumber = pageNumber;
    }

    get pagesRotation() {
      return this._pagesRotation;
    }

    set pagesRotation(rotation) {
      if (!isValidRotation(rotation)) {
        throw new Error("Invalid thumbnails rotation angle.");
      }
      if (!this.pdfDocument) {
        return;
      }
      if (this._pagesRotation === rotation) {
        return; // The rotation didn't change.
      }
      this._pagesRotation = rotation;

      for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
        this._thumbnails[i].update(rotation);
      }
    }

    cleanup() {
      for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
        if (
          this._thumbnails[i] &&
          this._thumbnails[i].renderingState !== RenderingStates.FINISHED
        ) {
          this._thumbnails[i].reset();
        }
      }
      TempImageFactory.destroyCanvas();
    }

    /**
     * @private
     */
    _resetView() {
      this._thumbnails = [];
      this._currentPageNumber = 1;
      this._pageLabels = null;
      this._pagesRotation = 0;
      this._optionalContentConfigPromise = null;
      this._pagesRequests = new WeakMap();
      this._setImageDisabled = false;

      // Remove the thumbnails from the DOM.
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

      firstPagePromise
        .then(firstPdfPage => {
          this._optionalContentConfigPromise = optionalContentConfigPromise;

          const pagesCount = pdfDocument.numPages;
          const viewport = firstPdfPage.getViewport({ scale: 1 });
          const checkSetImageDisabled = () => {
            return this._setImageDisabled;
          };

          for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
            const thumbnail = new PDFThumbnailView({
              container: this.container,
              id: pageNum,
              defaultViewport: viewport.clone(),
              optionalContentConfigPromise,
              linkService: this.linkService,
              renderingQueue: this.renderingQueue,
              checkSetImageDisabled,
              disableCanvasToImageConversion: false,
              l10n: this.l10n,
            });
            this._thumbnails.push(thumbnail);
          }
          // Set the first `pdfPage` immediately, since it's already loaded,
          // rather than having to repeat the `PDFDocumentProxy.getPage` call in
          // the `this._ensurePdfPageLoaded` method before rendering can start.
          const firstThumbnailView = this._thumbnails[0];
          if (firstThumbnailView) {
            firstThumbnailView.setPdfPage(firstPdfPage);
          }

          // Ensure that the current thumbnail is always highlighted on load.
          const thumbnailView = this._thumbnails[this._currentPageNumber - 1];
          thumbnailView.div.classList.add(THUMBNAIL_SELECTED_CLASS);
        })
        .catch(reason => {
          console.error("Unable to initialize thumbnail viewer", reason);
        });
    }

    /**
     * @private
     */
    _cancelRendering() {
      for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
        if (this._thumbnails[i]) {
          this._thumbnails[i].cancelRendering();
        }
      }
    }

    /**
     * @param {Array|null} labels
     */
    setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
      }
      if (!labels) {
        this._pageLabels = null;
      } else if (
        !(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)
      ) {
        this._pageLabels = null;
        console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.");
      } else {
        this._pageLabels = labels;
      }
      // Update all the `PDFThumbnailView` instances.
      for (let i = 0, ii = this._thumbnails.length; i < ii; i++) {
        const label = this._pageLabels && this._pageLabels[i];
        this._thumbnails[i].setPageLabel(label);
      }
    }

    /**
     * @param {PDFThumbnailView} thumbView
     * @returns {PDFPage}
     * @private
     */
    _ensurePdfPageLoaded(thumbView) {
      if (thumbView.pdfPage) {
        return Promise.resolve(thumbView.pdfPage);
      }
      if (this._pagesRequests.has(thumbView)) {
        return this._pagesRequests.get(thumbView);
      }
      const promise = this.pdfDocument
        .getPage(thumbView.id)
        .then(pdfPage => {
          if (!thumbView.pdfPage) {
            thumbView.setPdfPage(pdfPage);
          }
          this._pagesRequests.delete(thumbView);
          return pdfPage;
        })
        .catch(reason => {
          console.error("Unable to get page for thumb view", reason);
          // Page error -- there is nothing that can be done.
          this._pagesRequests.delete(thumbView);
        });
      this._pagesRequests.set(thumbView, promise);
      return promise;
    }

    forceRendering() {
      const visibleThumbs = this._getVisibleThumbs();
      const thumbView = this.renderingQueue.getHighestPriority(
        visibleThumbs,
        this._thumbnails,
        this.scroll.down
      );
      if (thumbView) {
        this._ensurePdfPageLoaded(thumbView).then(() => {
          this.renderingQueue.renderView(thumbView);
        });
        return true;
      }
      return false;
    }
  }

  return { PDFThumbnailViewer };
});
define('skylark-pdfjs-viewer/annotation_layer_builder',[
  "skylark-pdfjs-display",
  "./ui_utils",
  "./pdf_link_service"
],function(pdfjsLib,ui_utils,pdf_link_service){
  /* Copyright 2014 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { AnnotationLayer } = pdfjsLib;
  const { NullL10n } =  ui_utils;
  const { SimpleLinkService } = pdf_link_service;

  /**
   * @typedef {Object} AnnotationLayerBuilderOptions
   * @property {HTMLDivElement} pageDiv
   * @property {PDFPage} pdfPage
   * @property {AnnotationStorage} [annotationStorage]
   * @property {string} [imageResourcesPath] - Path for image resources, mainly
   *   for annotation icons. Include trailing slash.
   * @property {boolean} renderInteractiveForms
   * @property {IPDFLinkService} linkService
   * @property {DownloadManager} downloadManager
   * @property {IL10n} l10n - Localization service.
   * @property {boolean} [enableScripting]
   * @property {Promise<boolean>} [hasJSActionsPromise]
   * @property {Object} [mouseState]
   */

  class AnnotationLayerBuilder {
    /**
     * @param {AnnotationLayerBuilderOptions} options
     */
    constructor({
      pageDiv,
      pdfPage,
      linkService,
      downloadManager,
      annotationStorage = null,
      imageResourcesPath = "",
      renderInteractiveForms = true,
      l10n = NullL10n,
      enableScripting = false,
      hasJSActionsPromise = null,
      mouseState = null,
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

    /**
     * @param {PageViewport} viewport
     * @param {string} intent (default value is 'display')
     * @returns {Promise<void>} A promise that is resolved when rendering of the
     *   annotations is complete.
     */
    render(viewport, intent = "display") {
      return Promise.all([
        this.pdfPage.getAnnotations({ intent }),
        this._hasJSActionsPromise,
      ]).then(([annotations, hasJSActions = false]) => {
        if (this._cancelled) {
          return;
        }
        if (annotations.length === 0) {
          return;
        }

        const parameters = {
          viewport: viewport.clone({ dontFlip: true }),
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
          mouseState: this._mouseState,
        };

        if (this.div) {
          // If an annotationLayer already exists, refresh its children's
          // transformation matrices.
          AnnotationLayer.update(parameters);
        } else {
          // Create an annotation layer div and render the annotations
          // if there is at least one annotation.
          this.div = document.createElement("div");
          this.div.className = "annotationLayer";
          this.pageDiv.appendChild(this.div);
          parameters.div = this.div;

          AnnotationLayer.render(parameters);
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

  /**
   * @implements IPDFAnnotationLayerFactory
   */
  class DefaultAnnotationLayerFactory {
    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @param {AnnotationStorage} [annotationStorage]
     * @param {string} [imageResourcesPath] - Path for image resources, mainly
     *   for annotation icons. Include trailing slash.
     * @param {boolean} renderInteractiveForms
     * @param {IL10n} l10n
     * @param {boolean} [enableScripting]
     * @param {Promise<boolean>} [hasJSActionsPromise]
     * @param {Object} [mouseState]
     * @returns {AnnotationLayerBuilder}
     */
    createAnnotationLayerBuilder(
      pageDiv,
      pdfPage,
      annotationStorage = null,
      imageResourcesPath = "",
      renderInteractiveForms = true,
      l10n = NullL10n,
      enableScripting = false,
      hasJSActionsPromise = null,
      mouseState = null
    ) {
      return new AnnotationLayerBuilder({
        pageDiv,
        pdfPage,
        imageResourcesPath,
        renderInteractiveForms,
        linkService: new SimpleLinkService(),
        l10n,
        annotationStorage,
        enableScripting,
        hasJSActionsPromise,
        mouseState,
      });
    }
  }

  return { 
    AnnotationLayerBuilder, 
    DefaultAnnotationLayerFactory 
  };
});
define('skylark-pdfjs-viewer/pdf_page_view',[
  "skylark-pdfjs-display",
  "./pdfjs_dev",
  "./ui_utils",
  "./pdf_rendering_queue",
  "./viewer_compatibility"
],function(
  pdfjsLib,
  PDFJSDev,
  ui_utils,
  pdf_rendering_queue,
  viewer_compatibility
){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const {
    approximateFraction,
    CSS_UNITS,
    DEFAULT_SCALE,
    getOutputScale,
    NullL10n,
    RendererType,
    roundToDivide,
    TextLayerMode,
  } = ui_utils;
  const {
    createPromiseCapability,
    RenderingCancelledException,
    SVGGraphics,
  } = pdfjsLib;
  const { RenderingStates } = pdf_rendering_queue;
  const { viewerCompatibilityParams } = viewer_compatibility;

  /**
   * @typedef {Object} PDFPageViewOptions
   * @property {HTMLDivElement} container - The viewer element.
   * @property {EventBus} eventBus - The application event bus.
   * @property {number} id - The page unique ID (normally its number).
   * @property {number} scale - The page scale display.
   * @property {PageViewport} defaultViewport - The page viewport.
   * @property {Promise<OptionalContentConfig>} [optionalContentConfigPromise] -
   *   A promise that is resolved with an {@link OptionalContentConfig} instance.
   *   The default value is `null`.
   * @property {PDFRenderingQueue} renderingQueue - The rendering queue object.
   * @property {IPDFTextLayerFactory} textLayerFactory
   * @property {number} [textLayerMode] - Controls if the text layer used for
   *   selection and searching is created, and if the improved text selection
   *   behaviour is enabled. The constants from {TextLayerMode} should be used.
   *   The default value is `TextLayerMode.ENABLE`.
   * @property {IPDFAnnotationLayerFactory} annotationLayerFactory
   * @property {string} [imageResourcesPath] - Path for image resources, mainly
   *   for annotation icons. Include trailing slash.
   * @property {boolean} renderInteractiveForms - Turns on rendering of
   *   interactive form elements. The default value is `true`.
   * @property {string} renderer - 'canvas' or 'svg'. The default is 'canvas'.
   * @property {boolean} [enableWebGL] - Enables WebGL accelerated rendering for
   *   some operations. The default value is `false`.
   * @property {boolean} [useOnlyCssZoom] - Enables CSS only zooming. The default
   *   value is `false`.
   * @property {number} [maxCanvasPixels] - The maximum supported canvas size in
   *   total pixels, i.e. width * height. Use -1 for no limit. The default value
   *   is 4096 * 4096 (16 mega-pixels).
   * @property {IL10n} l10n - Localization service.
   * @property {boolean} [enableScripting] - Enable embedded script execution.
   *   The default value is `false`.
   */

  const MAX_CANVAS_PIXELS = viewerCompatibilityParams.maxCanvasPixels || 16777216;

  /**
   * @implements {IRenderableView}
   */
  class PDFPageView {
    /**
     * @param {PDFPageViewOptions} options
     */
    constructor(options) {
      const container = options.container;
      const defaultViewport = options.defaultViewport;

      this.id = options.id;
      this.renderingId = "page" + this.id;

      this.pdfPage = null;
      this.pageLabel = null;
      this.rotation = 0;
      this.scale = options.scale || DEFAULT_SCALE;
      this.viewport = defaultViewport;
      this.pdfPageRotate = defaultViewport.rotation;
      this._optionalContentConfigPromise =
        options.optionalContentConfigPromise || null;
      this.hasRestrictedScaling = false;
      this.textLayerMode = Number.isInteger(options.textLayerMode)
        ? options.textLayerMode
        : TextLayerMode.ENABLE;
      this.imageResourcesPath = options.imageResourcesPath || "";
      this.renderInteractiveForms =
        typeof options.renderInteractiveForms === "boolean"
          ? options.renderInteractiveForms
          : true;
      this.useOnlyCssZoom = options.useOnlyCssZoom || false;
      this.maxCanvasPixels = options.maxCanvasPixels || MAX_CANVAS_PIXELS;

      this.eventBus = options.eventBus;
      this.renderingQueue = options.renderingQueue;
      this.textLayerFactory = options.textLayerFactory;
      this.annotationLayerFactory = options.annotationLayerFactory;
      this.renderer = options.renderer || RendererType.CANVAS;
      this.enableWebGL = options.enableWebGL || false;
      this.l10n = options.l10n || NullL10n;
      this.enableScripting = options.enableScripting || false;

      this.paintTask = null;
      this.paintedViewportMap = new WeakMap();
      this.renderingState = RenderingStates.INITIAL;
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
        scale: this.scale * CSS_UNITS,
        rotation: totalRotation,
      });
      this.reset();
    }

    destroy() {
      this.reset();
      if (this.pdfPage) {
        this.pdfPage.cleanup();
      }
    }

    /**
     * @private
     */
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
          error,
        });
      }
    }

    /**
     * @private
     */
    _resetZoomLayer(removeFromDOM = false) {
      if (!this.zoomLayer) {
        return;
      }
      const zoomLayerCanvas = this.zoomLayer.firstChild;
      this.paintedViewportMap.delete(zoomLayerCanvas);
      // Zeroing the width and height causes Firefox to release graphics
      // resources immediately, which can greatly reduce memory consumption.
      zoomLayerCanvas.width = 0;
      zoomLayerCanvas.height = 0;

      if (removeFromDOM) {
        // Note: `ChildNode.remove` doesn't throw if the parent node is undefined.
        this.zoomLayer.remove();
      }
      this.zoomLayer = null;
    }

    reset(keepZoomLayer = false, keepAnnotations = false) {
      this.cancelRendering(keepAnnotations);
      this.renderingState = RenderingStates.INITIAL;

      const div = this.div;
      div.style.width = Math.floor(this.viewport.width) + "px";
      div.style.height = Math.floor(this.viewport.height) + "px";

      const childNodes = div.childNodes;
      const currentZoomLayerNode = (keepZoomLayer && this.zoomLayer) || null;
      const currentAnnotationNode =
        (keepAnnotations && this.annotationLayer && this.annotationLayer.div) ||
        null;
      for (let i = childNodes.length - 1; i >= 0; i--) {
        const node = childNodes[i];
        if (currentZoomLayerNode === node || currentAnnotationNode === node) {
          continue;
        }
        div.removeChild(node);
      }
      div.removeAttribute("data-loaded");

      if (currentAnnotationNode) {
        // Hide the annotation layer until all elements are resized
        // so they are not displayed on the already resized page.
        this.annotationLayer.hide();
      } else if (this.annotationLayer) {
        this.annotationLayer.cancel();
        this.annotationLayer = null;
      }

      if (!currentZoomLayerNode) {
        if (this.canvas) {
          this.paintedViewportMap.delete(this.canvas);
          // Zeroing the width and height causes Firefox to release graphics
          // resources immediately, which can greatly reduce memory consumption.
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
      // The rotation may be zero.
      if (typeof rotation !== "undefined") {
        this.rotation = rotation;
      }
      if (optionalContentConfigPromise instanceof Promise) {
        this._optionalContentConfigPromise = optionalContentConfigPromise;
      }

      const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = this.viewport.clone({
        scale: this.scale * CSS_UNITS,
        rotation: totalRotation,
      });

      if (this.svg) {
        this.cssTransform(this.svg, true);

        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(),
          error: this._renderError,
        });
        return;
      }

      let isScalingRestricted = false;
      if (this.canvas && this.maxCanvasPixels > 0) {
        const outputScale = this.outputScale;
        if (
          ((Math.floor(this.viewport.width) * outputScale.sx) | 0) *
            ((Math.floor(this.viewport.height) * outputScale.sy) | 0) >
          this.maxCanvasPixels
        ) {
          isScalingRestricted = true;
        }
      }

      if (this.canvas) {
        if (
          this.useOnlyCssZoom ||
          (this.hasRestrictedScaling && isScalingRestricted)
        ) {
          this.cssTransform(this.canvas, true);

          this.eventBus.dispatch("pagerendered", {
            source: this,
            pageNumber: this.id,
            cssTransform: true,
            timestamp: performance.now(),
            error: this._renderError,
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
      this.reset(/* keepZoomLayer = */ true, /* keepAnnotations = */ true);
    }

    /**
     * PLEASE NOTE: Most likely you want to use the `this.reset()` method,
     *              rather than calling this one directly.
     */
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
      // Scale target (canvas or svg), its wrapper and page container.
      const width = this.viewport.width;
      const height = this.viewport.height;
      const div = this.div;
      target.style.width = target.parentNode.style.width = div.style.width =
        Math.floor(width) + "px";
      target.style.height = target.parentNode.style.height = div.style.height =
        Math.floor(height) + "px";
      // The canvas may have been originally rotated; rotate relative to that.
      const relativeRotation =
        this.viewport.rotation - this.paintedViewportMap.get(target).rotation;
      const absRotation = Math.abs(relativeRotation);
      let scaleX = 1,
        scaleY = 1;
      if (absRotation === 90 || absRotation === 270) {
        // Scale x and y because of the rotation.
        scaleX = height / width;
        scaleY = width / height;
      }
      target.style.transform = `rotate(${relativeRotation}deg) scale(${scaleX}, ${scaleY})`;

      if (this.textLayer) {
        // Rotating the text layer is more complicated since the divs inside the
        // the text layer are rotated.
        // TODO: This could probably be simplified by drawing the text layer in
        // one orientation and then rotating overall.
        const textLayerViewport = this.textLayer.viewport;
        const textRelativeRotation =
          this.viewport.rotation - textLayerViewport.rotation;
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

        textLayerDiv.style.transform =
          `rotate(${textAbsRotation}deg) ` +
          `scale(${scale}) ` +
          `translate(${transX}, ${transY})`;
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
      if (this.renderingState !== RenderingStates.INITIAL) {
        console.error("Must be in new state before drawing");
        this.reset(); // Ensure that we reset all state to prevent issues.
      }
      const { div, pdfPage } = this;

      if (!pdfPage) {
        this.renderingState = RenderingStates.FINISHED;

        if (this.loadingIconDiv) {
          div.removeChild(this.loadingIconDiv);
          delete this.loadingIconDiv;
        }
        return Promise.reject(new Error("pdfPage is not loaded"));
      }

      this.renderingState = RenderingStates.RUNNING;

      // Wrap the canvas so that if it has a CSS transform for high DPI the
      // overflow will be hidden in Firefox.
      const canvasWrapper = document.createElement("div");
      canvasWrapper.style.width = div.style.width;
      canvasWrapper.style.height = div.style.height;
      canvasWrapper.classList.add("canvasWrapper");

      if (this.annotationLayer && this.annotationLayer.div) {
        // The annotation layer needs to stay on top.
        div.insertBefore(canvasWrapper, this.annotationLayer.div);
      } else {
        div.appendChild(canvasWrapper);
      }

      let textLayer = null;
      if (this.textLayerMode !== TextLayerMode.DISABLE && this.textLayerFactory) {
        const textLayerDiv = document.createElement("div");
        textLayerDiv.className = "textLayer";
        textLayerDiv.style.width = canvasWrapper.style.width;
        textLayerDiv.style.height = canvasWrapper.style.height;
        if (this.annotationLayer && this.annotationLayer.div) {
          // The annotation layer needs to stay on top.
          div.insertBefore(textLayerDiv, this.annotationLayer.div);
        } else {
          div.appendChild(textLayerDiv);
        }

        textLayer = this.textLayerFactory.createTextLayerBuilder(
          textLayerDiv,
          this.id - 1,
          this.viewport,
          this.textLayerMode === TextLayerMode.ENABLE_ENHANCE,
          this.eventBus
        );
      }
      this.textLayer = textLayer;

      let renderContinueCallback = null;
      if (this.renderingQueue) {
        renderContinueCallback = cont => {
          if (!this.renderingQueue.isHighestPriority(this)) {
            this.renderingState = RenderingStates.PAUSED;
            this.resume = () => {
              this.renderingState = RenderingStates.RUNNING;
              cont();
            };
            return;
          }
          cont();
        };
      }

      const finishPaintTask = async (error = null) => {
        // The paintTask may have been replaced by a new one, so only remove
        // the reference to the paintTask if it matches the one that is
        // triggering this callback.
        if (paintTask === this.paintTask) {
          this.paintTask = null;
        }

        if (error instanceof RenderingCancelledException) {
          this._renderError = null;
          return;
        }
        this._renderError = error;

        this.renderingState = RenderingStates.FINISHED;

        if (this.loadingIconDiv) {
          div.removeChild(this.loadingIconDiv);
          delete this.loadingIconDiv;
        }
        this._resetZoomLayer(/* removeFromDOM = */ true);

        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: false,
          timestamp: performance.now(),
          error: this._renderError,
        });

        if (error) {
          throw error;
        }
      };

      const paintTask =
        this.renderer === RendererType.SVG
          ? this.paintOnSvg(canvasWrapper)
          : this.paintOnCanvas(canvasWrapper);
      paintTask.onRenderContinue = renderContinueCallback;
      this.paintTask = paintTask;

      const resultPromise = paintTask.promise.then(
        function () {
          return finishPaintTask(null).then(function () {
            if (textLayer) {
              const readableStream = pdfPage.streamTextContent({
                normalizeWhitespace: true,
              });
              textLayer.setTextContentStream(readableStream);
              textLayer.render();
            }
          });
        },
        function (reason) {
          return finishPaintTask(reason);
        }
      );

      if (this.annotationLayerFactory) {
        if (!this.annotationLayer) {
          this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(
            div,
            pdfPage,
            /* annotationStorage = */ null,
            this.imageResourcesPath,
            this.renderInteractiveForms,
            this.l10n,
            this.enableScripting,
            /* hasJSActionsPromise = */ null,
            /* mouseState = */ null
          );
        }
        this._renderAnnotationLayer();
      }
      div.setAttribute("data-loaded", true);

      this.eventBus.dispatch("pagerender", {
        source: this,
        pageNumber: this.id,
      });
      return resultPromise;
    }

    paintOnCanvas(canvasWrapper) {
      const renderCapability = createPromiseCapability();
      const result = {
        promise: renderCapability.promise,
        onRenderContinue(cont) {
          cont();
        },
        cancel() {
          renderTask.cancel();
        },
      };

      const viewport = this.viewport;
      const canvas = document.createElement("canvas");
      this.l10n
        .get("page_canvas", { page: this.id }, "Page {{page}}")
        .then(msg => {
          canvas.setAttribute("aria-label", msg);
        });

      // Keep the canvas hidden until the first draw callback, or until drawing
      // is complete when `!this.renderingQueue`, to prevent black flickering.
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

      if (
        typeof PDFJSDev === "undefined" ||
        PDFJSDev.test("MOZCENTRAL || GENERIC")
      ) {
        canvas.mozOpaque = true;
      }

      const ctx = canvas.getContext("2d", { alpha: false });
      const outputScale = getOutputScale(ctx);
      this.outputScale = outputScale;

      if (this.useOnlyCssZoom) {
        const actualSizeViewport = viewport.clone({ scale: CSS_UNITS });
        // Use a scale that makes the canvas have the originally intended size
        // of the page.
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

      const sfx = approximateFraction(outputScale.sx);
      const sfy = approximateFraction(outputScale.sy);
      canvas.width = roundToDivide(viewport.width * outputScale.sx, sfx[0]);
      canvas.height = roundToDivide(viewport.height * outputScale.sy, sfy[0]);
      canvas.style.width = roundToDivide(viewport.width, sfx[1]) + "px";
      canvas.style.height = roundToDivide(viewport.height, sfy[1]) + "px";
      // Add the viewport so it's known what it was originally drawn with.
      this.paintedViewportMap.set(canvas, viewport);

      // Rendering area
      const transform = !outputScale.scaled
        ? null
        : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
      const renderContext = {
        canvasContext: ctx,
        transform,
        viewport: this.viewport,
        enableWebGL: this.enableWebGL,
        renderInteractiveForms: this.renderInteractiveForms,
        optionalContentConfigPromise: this._optionalContentConfigPromise,
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

      renderTask.promise.then(
        function () {
          showCanvas();
          renderCapability.resolve(undefined);
        },
        function (error) {
          showCanvas();
          renderCapability.reject(error);
        }
      );
      return result;
    }

    paintOnSvg(wrapper) {
      if (
        typeof PDFJSDev !== "undefined" &&
        PDFJSDev.test("MOZCENTRAL || CHROME")
      ) {
        // Return a mock object, to prevent errors such as e.g.
        // "TypeError: paintTask.promise is undefined".
        return {
          promise: Promise.reject(new Error("SVG rendering is not supported.")),
          onRenderContinue(cont) {},
          cancel() {},
        };
      }

      let cancelled = false;
      const ensureNotCancelled = () => {
        if (cancelled) {
          throw new RenderingCancelledException(
            `Rendering cancelled, page ${this.id}`,
            "svg"
          );
        }
      };

      const pdfPage = this.pdfPage;
      const actualSizeViewport = this.viewport.clone({ scale: CSS_UNITS });
      const promise = pdfPage.getOperatorList().then(opList => {
        ensureNotCancelled();
        const svgGfx = new SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
        return svgGfx.getSVG(opList, actualSizeViewport).then(svg => {
          ensureNotCancelled();
          this.svg = svg;
          this.paintedViewportMap.set(svg, actualSizeViewport);

          svg.style.width = wrapper.style.width;
          svg.style.height = wrapper.style.height;
          this.renderingState = RenderingStates.FINISHED;
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
        },
      };
    }

    /**
     * @param {string|null} label
     */
    setPageLabel(label) {
      this.pageLabel = typeof label === "string" ? label : null;

      if (this.pageLabel !== null) {
        this.div.setAttribute("data-page-label", this.pageLabel);
      } else {
        this.div.removeAttribute("data-page-label");
      }
    }
  }

  return { PDFPageView };
});
define('skylark-pdfjs-viewer/text_layer_builder',[
  "skylark-pdfjs-display",
  "./pdfjs_dev"
],function(pdfjsLib,PDFJSDev){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { renderTextLayer } = pdfjsLib;

  const EXPAND_DIVS_TIMEOUT = 300; // ms

  /**
   * @typedef {Object} TextLayerBuilderOptions
   * @property {HTMLDivElement} textLayerDiv - The text layer container.
   * @property {EventBus} eventBus - The application event bus.
   * @property {number} pageIndex - The page index.
   * @property {PageViewport} viewport - The viewport of the text layer.
   * @property {PDFFindController} findController
   * @property {boolean} enhanceTextSelection - Option to turn on improved
   *   text selection.
   */

  /**
   * The text layer builder provides text selection functionality for the PDF.
   * It does this by creating overlay divs over the PDF's text. These divs
   * contain text that matches the PDF text they are overlaying. This object
   * also provides a way to highlight text that is being searched for.
   */
  class TextLayerBuilder {
    constructor({
      textLayerDiv,
      eventBus,
      pageIndex,
      viewport,
      findController = null,
      enhanceTextSelection = false,
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

    /**
     * @private
     */
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
        numTextDivs: this.textDivs.length,
      });
    }

    /**
     * Renders the text layer.
     *
     * @param {number} [timeout] - Wait for a specified amount of milliseconds
     *                             before rendering.
     */
    render(timeout = 0) {
      if (!(this.textContent || this.textContentStream) || this.renderingDone) {
        return;
      }
      this.cancel();

      this.textDivs = [];
      const textLayerFrag = document.createDocumentFragment();
      this.textLayerRenderTask = renderTextLayer({
        textContent: this.textContent,
        textContentStream: this.textContentStream,
        container: textLayerFrag,
        viewport: this.viewport,
        textDivs: this.textDivs,
        textContentItemsStr: this.textContentItemsStr,
        timeout,
        enhanceTextSelection: this.enhanceTextSelection,
      });
      this.textLayerRenderTask.promise.then(
        () => {
          this.textLayerDiv.appendChild(textLayerFrag);
          this._finishRendering();
          this._updateMatches();
        },
        function (reason) {
          // Cancelled or failed to render text layer; skipping errors.
        }
      );

      if (!this._onUpdateTextLayerMatches) {
        this._onUpdateTextLayerMatches = evt => {
          if (evt.pageIndex === this.pageIdx || evt.pageIndex === -1) {
            this._updateMatches();
          }
        };
        this.eventBus._on(
          "updatetextlayermatches",
          this._onUpdateTextLayerMatches
        );
      }
    }

    /**
     * Cancel rendering of the text layer.
     */
    cancel() {
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }
      if (this._onUpdateTextLayerMatches) {
        this.eventBus._off(
          "updatetextlayermatches",
          this._onUpdateTextLayerMatches
        );
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
      // Early exit if there is nothing to convert.
      if (!matches) {
        return [];
      }
      const { textContentItemsStr } = this;

      let i = 0,
        iIndex = 0;
      const end = textContentItemsStr.length - 1;
      const result = [];

      for (let m = 0, mm = matches.length; m < mm; m++) {
        // Calculate the start position.
        let matchIdx = matches[m];

        // Loop over the divIdxs.
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
            offset: matchIdx - iIndex,
          },
        };

        // Calculate the end position.
        matchIdx += matchesLength[m];

        // Somewhat the same array as above, but use > instead of >= to get
        // the end position right.
        while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        match.end = {
          divIdx: i,
          offset: matchIdx - iIndex,
        };
        result.push(match);
      }
      return result;
    }

    _renderMatches(matches) {
      // Early exit if there is nothing to render.
      if (matches.length === 0) {
        return;
      }
      const { findController, pageIdx, textContentItemsStr, textDivs } = this;

      const isSelectedPage = pageIdx === findController.selected.pageIdx;
      const selectedMatchIdx = findController.selected.matchIdx;
      const highlightAll = findController.state.highlightAll;
      let prevEnd = null;
      const infinity = {
        divIdx: -1,
        offset: undefined,
      };

      function beginText(begin, className) {
        const divIdx = begin.divIdx;
        textDivs[divIdx].textContent = "";
        appendTextToDiv(divIdx, 0, begin.offset, className);
      }

      function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
        const div = textDivs[divIdx];
        const content = textContentItemsStr[divIdx].substring(
          fromOffset,
          toOffset
        );
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
        // Not highlighting all and this isn't the selected page, so do nothing.
        return;
      }

      for (let i = i0; i < i1; i++) {
        const match = matches[i];
        const begin = match.begin;
        const end = match.end;
        const isSelected = isSelectedPage && i === selectedMatchIdx;
        const highlightSuffix = isSelected ? " selected" : "";

        if (isSelected) {
          // Attempt to scroll the selected match into view.
          findController.scrollMatchIntoView({
            element: textDivs[begin.divIdx],
            pageIndex: pageIdx,
            matchIndex: selectedMatchIdx,
          });
        }

        // Match inside new div.
        if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
          // If there was a previous div, then add the text at the end.
          if (prevEnd !== null) {
            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
          }
          // Clear the divs and set the content until the starting point.
          beginText(begin);
        } else {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
        }

        if (begin.divIdx === end.divIdx) {
          appendTextToDiv(
            begin.divIdx,
            begin.offset,
            end.offset,
            "highlight" + highlightSuffix
          );
        } else {
          appendTextToDiv(
            begin.divIdx,
            begin.offset,
            infinity.offset,
            "highlight begin" + highlightSuffix
          );
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
      // Only show matches when all rendering is done.
      if (!this.renderingDone) {
        return;
      }
      const {
        findController,
        matches,
        pageIdx,
        textContentItemsStr,
        textDivs,
      } = this;
      let clearedUntilDivIdx = -1;

      // Clear all current matches.
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
      // Convert the matches on the `findController` into the match format
      // used for the textLayer.
      const pageMatches = findController.pageMatches[pageIdx] || null;
      const pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;

      this.matches = this._convertMatches(pageMatches, pageMatchesLength);
      this._renderMatches(this.matches);
    }

    /**
     * Improves text selection by adding an additional div where the mouse was
     * clicked. This reduces flickering of the content if the mouse is slowly
     * dragged up or down.
     *
     * @private
     */
    _bindMouse() {
      const div = this.textLayerDiv;
      let expandDivsTimer = null;

      div.addEventListener("mousedown", evt => {
        if (this.enhanceTextSelection && this.textLayerRenderTask) {
          this.textLayerRenderTask.expandTextDivs(true);
          if (
            (typeof PDFJSDev === "undefined" || !PDFJSDev.test("MOZCENTRAL")) &&
            expandDivsTimer
          ) {
            clearTimeout(expandDivsTimer);
            expandDivsTimer = null;
          }
          return;
        }

        const end = div.querySelector(".endOfContent");
        if (!end) {
          return;
        }
        if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("MOZCENTRAL")) {
          // On non-Firefox browsers, the selection will feel better if the height
          // of the `endOfContent` div is adjusted to start at mouse click
          // location. This avoids flickering when the selection moves up.
          // However it does not work when selection is started on empty space.
          let adjustTop = evt.target !== div;
          if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
            adjustTop =
              adjustTop &&
              window
                .getComputedStyle(end)
                .getPropertyValue("-moz-user-select") !== "none";
          }
          if (adjustTop) {
            const divBounds = div.getBoundingClientRect();
            const r = Math.max(0, (evt.pageY - divBounds.top) / divBounds.height);
            end.style.top = (r * 100).toFixed(2) + "%";
          }
        }
        end.classList.add("active");
      });

      div.addEventListener("mouseup", () => {
        if (this.enhanceTextSelection && this.textLayerRenderTask) {
          if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("MOZCENTRAL")) {
            expandDivsTimer = setTimeout(() => {
              if (this.textLayerRenderTask) {
                this.textLayerRenderTask.expandTextDivs(false);
              }
              expandDivsTimer = null;
            }, EXPAND_DIVS_TIMEOUT);
          } else {
            this.textLayerRenderTask.expandTextDivs(false);
          }
          return;
        }

        const end = div.querySelector(".endOfContent");
        if (!end) {
          return;
        }
        if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("MOZCENTRAL")) {
          end.style.top = "";
        }
        end.classList.remove("active");
      });
    }
  }

  /**
   * @implements IPDFTextLayerFactory
   */
  class DefaultTextLayerFactory {
    /**
     * @param {HTMLDivElement} textLayerDiv
     * @param {number} pageIndex
     * @param {PageViewport} viewport
     * @param {boolean} enhanceTextSelection
     * @param {EventBus} eventBus
     * @returns {TextLayerBuilder}
     */
    createTextLayerBuilder(
      textLayerDiv,
      pageIndex,
      viewport,
      enhanceTextSelection = false,
      eventBus
    ) {
      return new TextLayerBuilder({
        textLayerDiv,
        pageIndex,
        viewport,
        enhanceTextSelection,
        eventBus,
      });
    }
  }

  return { 
    DefaultTextLayerFactory, 
    TextLayerBuilder 
  };
});
define('skylark-pdfjs-viewer/base_viewer',[
  "skylark-pdfjs-display",
  "./pdfjs_dev",
  "./ui_utils",
  "./pdf_rendering_queue",
  "./annotation_layer_builder",
  "./pdf_page_view",
  "./pdf_link_service",
  "./text_layer_builder"
],function(
  pdfjsLib,
  PDFJSDev,
  ui_utils,
  pdf_rendering_queue,
  annotation_layer_builder,
  pdf_page_view,
  pdf_link_service,
  text_layer_builder

){

  /* Copyright 2014 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { createPromiseCapability, version } = pdfjsLib;
  const {
    CSS_UNITS,
    DEFAULT_SCALE,
    DEFAULT_SCALE_VALUE,
    getVisibleElements,
    isPortraitOrientation,
    isValidRotation,
    isValidScrollMode,
    isValidSpreadMode,
    MAX_AUTO_SCALE,
    moveToEndOfArray,
    NullL10n,
    PresentationModeState,
    RendererType,
    SCROLLBAR_PADDING,
    scrollIntoView,
    ScrollMode,
    SpreadMode,
    TextLayerMode,
    UNKNOWN_SCALE,
    VERTICAL_PADDING,
    watchScroll,
  } = ui_utils;
  const { PDFRenderingQueue, RenderingStates } = pdf_rendering_queue;
  const { AnnotationLayerBuilder } = annotation_layer_builder;
  const { PDFPageView } = pdf_page_view;
  const { SimpleLinkService } = pdf_link_service;
  const { TextLayerBuilder } = text_layer_builder;

  const DEFAULT_CACHE_SIZE = 10;

  /**
   * @typedef {Object} PDFViewerOptions
   * @property {HTMLDivElement} container - The container for the viewer element.
   * @property {HTMLDivElement} [viewer] - The viewer element.
   * @property {EventBus} eventBus - The application event bus.
   * @property {IPDFLinkService} linkService - The navigation/linking service.
   * @property {DownloadManager} [downloadManager] - The download manager
   *   component.
   * @property {PDFFindController} [findController] - The find controller
   *   component.
   * @property {PDFRenderingQueue} [renderingQueue] - The rendering queue object.
   * @property {boolean} [removePageBorders] - Removes the border shadow around
   *   the pages. The default value is `false`.
   * @property {number} [textLayerMode] - Controls if the text layer used for
   *   selection and searching is created, and if the improved text selection
   *   behaviour is enabled. The constants from {TextLayerMode} should be used.
   *   The default value is `TextLayerMode.ENABLE`.
   * @property {string} [imageResourcesPath] - Path for image resources, mainly
   *   mainly for annotation icons. Include trailing slash.
   * @property {boolean} [renderInteractiveForms] - Enables rendering of
   *   interactive form elements. The default value is `true`.
   * @property {boolean} [enablePrintAutoRotate] - Enables automatic rotation of
   *   landscape pages upon printing. The default is `false`.
   * @property {string} renderer - 'canvas' or 'svg'. The default is 'canvas'.
   * @property {boolean} [enableWebGL] - Enables WebGL accelerated rendering for
   *   some operations. The default value is `false`.
   * @property {boolean} [useOnlyCssZoom] - Enables CSS only zooming. The default
   *   value is `false`.
   * @property {number} [maxCanvasPixels] - The maximum supported canvas size in
   *   total pixels, i.e. width * height. Use -1 for no limit. The default value
   *   is 4096 * 4096 (16 mega-pixels).
   * @property {IL10n} l10n - Localization service.
   * @property {boolean} [enableScripting] - Enable embedded script execution.
   *   The default value is `false`.
   * @property {Object} [mouseState] - The mouse button state. The default value
   *   is `null`.
   */

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
    /**
     * After calling resize, the size of the buffer will be newSize. The optional
     * parameter pagesToKeep is, if present, an array of pages to push to the back
     * of the buffer, delaying their destruction. The size of pagesToKeep has no
     * impact on the final size of the buffer; if pagesToKeep has length larger
     * than newSize, some of those pages will be destroyed anyway.
     */
    this.resize = function (newSize, pagesToKeep) {
      size = newSize;
      if (pagesToKeep) {
        const pageIdsToKeep = new Set();
        for (let i = 0, iMax = pagesToKeep.length; i < iMax; ++i) {
          pageIdsToKeep.add(pagesToKeep[i].id);
        }
        moveToEndOfArray(data, function (page) {
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
      // Prevent unnecessary re-rendering of all pages when the scale
      // changes only because of limited numerical precision.
      return true;
    }
    return false;
  }

  /**
   * Simple viewer control to display PDF content/pages.
   * @implements {IRenderableView}
   */
  class BaseViewer {
    /**
     * @param {PDFViewerOptions} options
     */
    constructor(options) {
      if (this.constructor === BaseViewer) {
        throw new Error("Cannot initialize BaseViewer.");
      }

      //TODO : checking
      const viewerVersion =
        typeof PDFJSDev !== "undefined" ? PDFJSDev.eval("BUNDLE_VERSION") : null;
      if (version !== viewerVersion) {
        throw new Error(
          `The API version "${version}" does not match the Viewer version "${viewerVersion}".`
        );
      }
      this._name = this.constructor.name;

      this.container = options.container;
      this.viewer = options.viewer || options.container.firstElementChild;

      //TODO : checking
      if (
        typeof PDFJSDev === "undefined" ||
        PDFJSDev.test("!PRODUCTION || GENERIC")
      ) {
        if (
          !(
            ///this.container?.tagName.toUpperCase() === "DIV" && // lwf 
            this.container && this.container.tagName.toUpperCase() === "DIV" &&
            ///this.viewer?.tagName.toUpperCase() === "DIV" // lwf
            this.viewer && this.viewer.tagName.toUpperCase() === "DIV"
          )
        ) {
          throw new Error("Invalid `container` and/or `viewer` option.");
        }

        if (getComputedStyle(this.container).position !== "absolute") {
          throw new Error("The `container` must be absolutely positioned.");
        }
      }
      this.eventBus = options.eventBus;
      this.linkService = options.linkService || new SimpleLinkService();
      this.downloadManager = options.downloadManager || null;
      this.findController = options.findController || null;
      this.removePageBorders = options.removePageBorders || false;
      this.textLayerMode = Number.isInteger(options.textLayerMode)
        ? options.textLayerMode
        : TextLayerMode.ENABLE;
      this.imageResourcesPath = options.imageResourcesPath || "";
      this.renderInteractiveForms =
        typeof options.renderInteractiveForms === "boolean"
          ? options.renderInteractiveForms
          : true;
      this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
      this.renderer = options.renderer || RendererType.CANVAS;
      this.enableWebGL = options.enableWebGL || false;
      this.useOnlyCssZoom = options.useOnlyCssZoom || false;
      this.maxCanvasPixels = options.maxCanvasPixels;
      this.l10n = options.l10n || NullL10n;
      this.enableScripting = options.enableScripting || false;
      this._mouseState = options.mouseState || null;

      this.defaultRenderingQueue = !options.renderingQueue;
      if (this.defaultRenderingQueue) {
        // Custom rendering queue is not specified, using default one
        this.renderingQueue = new PDFRenderingQueue();
        this.renderingQueue.setViewer(this);
      } else {
        this.renderingQueue = options.renderingQueue;
      }

      this.scroll = watchScroll(this.container, this._scrollUpdate.bind(this));
      this.presentationModeState = PresentationModeState.UNKNOWN;
      this._onBeforeDraw = this._onAfterDraw = null;
      this._resetView();

      if (this.removePageBorders) {
        this.viewer.classList.add("removePageBorders");
      }
      // Defer the dispatching of this event, to give other viewer components
      // time to initialize *and* register 'baseviewerinit' event listeners.
      Promise.resolve().then(() => {
        this.eventBus.dispatch("baseviewerinit", { source: this });
      });
    }

    get pagesCount() {
      return this._pages.length;
    }

    getPageView(index) {
      return this._pages[index];
    }

    /**
     * @type {boolean} - True if all {PDFPageView} objects are initialized.
     */
    get pageViewsReady() {
      if (!this._pagesCapability.settled) {
        return false;
      }
      // Prevent printing errors when 'disableAutoFetch' is set, by ensuring
      // that *all* pages have in fact been completely loaded.
      return this._pages.every(function (pageView) {
        return pageView && pageView.pdfPage;
      });
    }

    /**
     * @type {number}
     */
    get currentPageNumber() {
      return this._currentPageNumber;
    }

    /**
     * @param {number} val - The page number.
     */
    set currentPageNumber(val) {
      if (!Number.isInteger(val)) {
        throw new Error("Invalid page number.");
      }
      if (!this.pdfDocument) {
        return;
      }
      // The intent can be to just reset a scroll position and/or scale.
      if (!this._setCurrentPageNumber(val, /* resetCurrentPageView = */ true)) {
        console.error(
          `${this._name}.currentPageNumber: "${val}" is not a valid page.`
        );
      }
    }

    /**
     * @returns {boolean} Whether the pageNumber is valid (within bounds).
     * @private
     */
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
        previous,
      });

      if (resetCurrentPageView) {
        this._resetCurrentPageView();
      }
      return true;
    }

    /**
     * @type {string|null} Returns the current page label, or `null` if no page
     *   labels exist.
     */
    get currentPageLabel() {
      return this._pageLabels && this._pageLabels[this._currentPageNumber - 1];
    }

    /**
     * @param {string} val - The page label.
     */
    set currentPageLabel(val) {
      if (!this.pdfDocument) {
        return;
      }
      let page = val | 0; // Fallback page number.
      if (this._pageLabels) {
        const i = this._pageLabels.indexOf(val);
        if (i >= 0) {
          page = i + 1;
        }
      }
      // The intent can be to just reset a scroll position and/or scale.
      if (!this._setCurrentPageNumber(page, /* resetCurrentPageView = */ true)) {
        console.error(
          `${this._name}.currentPageLabel: "${val}" is not a valid page.`
        );
      }
    }

    /**
     * @type {number}
     */
    get currentScale() {
      return this._currentScale !== UNKNOWN_SCALE
        ? this._currentScale
        : DEFAULT_SCALE;
    }

    /**
     * @param {number} val - Scale of the pages in percents.
     */
    set currentScale(val) {
      if (isNaN(val)) {
        throw new Error("Invalid numeric scale.");
      }
      if (!this.pdfDocument) {
        return;
      }
      this._setScale(val, false);
    }

    /**
     * @type {string}
     */
    get currentScaleValue() {
      return this._currentScaleValue;
    }

    /**
     * @param val - The scale of the pages (in percent or predefined value).
     */
    set currentScaleValue(val) {
      if (!this.pdfDocument) {
        return;
      }
      this._setScale(val, false);
    }

    /**
     * @type {number}
     */
    get pagesRotation() {
      return this._pagesRotation;
    }

    /**
     * @param {number} rotation - The rotation of the pages (0, 90, 180, 270).
     */
    set pagesRotation(rotation) {
      if (!isValidRotation(rotation)) {
        throw new Error("Invalid pages rotation angle.");
      }
      if (!this.pdfDocument) {
        return;
      }
      if (this._pagesRotation === rotation) {
        return; // The rotation didn't change.
      }
      this._pagesRotation = rotation;

      const pageNumber = this._currentPageNumber;

      for (let i = 0, ii = this._pages.length; i < ii; i++) {
        const pageView = this._pages[i];
        pageView.update(pageView.scale, rotation);
      }
      // Prevent errors in case the rotation changes *before* the scale has been
      // set to a non-default value.
      if (this._currentScaleValue) {
        this._setScale(this._currentScaleValue, true);
      }

      this.eventBus.dispatch("rotationchanging", {
        source: this,
        pagesRotation: rotation,
        pageNumber,
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

    /**
     * @private
     */
    get _viewerElement() {
      // In most viewers, e.g. `PDFViewer`, this should return `this.viewer`.
      throw new Error("Not implemented: _viewerElement");
    }

    /**
     * @private
     */
    _onePageRenderedOrForceFetch() {
      // Unless the viewer *and* its pages are visible, rendering won't start and
      // `this._onePageRenderedCapability` thus won't be resolved.
      // To ensure that automatic printing, on document load, still works even in
      // those cases we force-allow fetching of all pages when:
      //  - The viewer is hidden in the DOM, e.g. in a `display: none` <iframe>
      //    element; fixes bug 1618621.
      //  - The viewer is visible, but none of the pages are (e.g. if the
      //    viewer is very small); fixes bug 1618955.
      if (
        !this.container.offsetParent ||
        this._getVisiblePages().views.length === 0
      ) {
        return Promise.resolve();
      }
      return this._onePageRenderedCapability.promise;
    }

    /**
     * @param pdfDocument {PDFDocument}
     */
    setDocument(pdfDocument) {
      if (this.pdfDocument) {
        this.eventBus.dispatch("pagesdestroy", { source: this });

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
      // Rendering (potentially) depends on this, hence fetching it immediately.
      const optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();

      this._pagesCapability.promise.then(() => {
        this.eventBus.dispatch("pagesloaded", {
          source: this,
          pagesCount,
        });
      });

      this._onBeforeDraw = evt => {
        const pageView = this._pages[evt.pageNumber - 1];
        if (!pageView) {
          return;
        }
        // Add the page to the buffer at the start of drawing. That way it can be
        // evicted from the buffer and destroyed even if we pause its rendering.
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

      // Fetch a single page so we can get a viewport that will be the default
      // viewport for all pages
      firstPagePromise
        .then(firstPdfPage => {
          this._firstPageCapability.resolve(firstPdfPage);
          this._optionalContentConfigPromise = optionalContentConfigPromise;

          const scale = this.currentScale;
          const viewport = firstPdfPage.getViewport({ scale: scale * CSS_UNITS });
          const textLayerFactory =
            this.textLayerMode !== TextLayerMode.DISABLE ? this : null;

          for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
            const pageView = new PDFPageView({
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
              enableScripting: this.enableScripting,
            });
            this._pages.push(pageView);
          }
          // Set the first `pdfPage` immediately, since it's already loaded,
          // rather than having to repeat the `PDFDocumentProxy.getPage` call in
          // the `this._ensurePdfPageLoaded` method before rendering can start.
          const firstPageView = this._pages[0];
          if (firstPageView) {
            firstPageView.setPdfPage(firstPdfPage);
            this.linkService.cachePageRef(1, firstPdfPage.ref);
          }
          if (this._spreadMode !== SpreadMode.NONE) {
            this._updateSpreadMode();
          }

          // Fetch all the pages since the viewport is needed before printing
          // starts to create the correct size canvas. Wait until one page is
          // rendered so we don't tie up too many resources early on.
          this._onePageRenderedOrForceFetch().then(() => {
            if (this.findController) {
              this.findController.setDocument(pdfDocument); // Enable searching.
            }

            // In addition to 'disableAutoFetch' being set, also attempt to reduce
            // resource usage when loading *very* long/large documents.
            if (pdfDocument.loadingParams.disableAutoFetch || pagesCount > 7500) {
              // XXX: Printing is semi-broken with auto fetch disabled.
              this._pagesCapability.resolve();
              return;
            }
            let getPagesLeft = pagesCount - 1; // The first page was already loaded.

            if (getPagesLeft <= 0) {
              this._pagesCapability.resolve();
              return;
            }
            for (let pageNum = 2; pageNum <= pagesCount; ++pageNum) {
              pdfDocument.getPage(pageNum).then(
                pdfPage => {
                  const pageView = this._pages[pageNum - 1];
                  if (!pageView.pdfPage) {
                    pageView.setPdfPage(pdfPage);
                  }
                  this.linkService.cachePageRef(pageNum, pdfPage.ref);
                  if (--getPagesLeft === 0) {
                    this._pagesCapability.resolve();
                  }
                },
                reason => {
                  console.error(
                    `Unable to get page ${pageNum} to initialize viewer`,
                    reason
                  );
                  if (--getPagesLeft === 0) {
                    this._pagesCapability.resolve();
                  }
                }
              );
            }
          });

          this.eventBus.dispatch("pagesinit", { source: this });

          if (this.defaultRenderingQueue) {
            this.update();
          }
        })
        .catch(reason => {
          console.error("Unable to initialize viewer", reason);
        });
    }

    /**
     * @param {Array|null} labels
     */
    setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
      }
      if (!labels) {
        this._pageLabels = null;
      } else if (
        !(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)
      ) {
        this._pageLabels = null;
        console.error(`${this._name}.setPageLabels: Invalid page labels.`);
      } else {
        this._pageLabels = labels;
      }
      // Update all the `PDFPageView` instances.
      for (let i = 0, ii = this._pages.length; i < ii; i++) {
        const pageView = this._pages[i];
        const label = this._pageLabels && this._pageLabels[i];
        pageView.setPageLabel(label);
      }
    }

    _resetView() {
      this._pages = [];
      this._currentPageNumber = 1;
      this._currentScale = UNKNOWN_SCALE;
      this._currentScaleValue = null;
      this._pageLabels = null;
      this._buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
      this._location = null;
      this._pagesRotation = 0;
      this._optionalContentConfigPromise = null;
      this._pagesRequests = new WeakMap();
      this._firstPageCapability = createPromiseCapability();
      this._onePageRenderedCapability = createPromiseCapability();
      this._pagesCapability = createPromiseCapability();
      this._scrollMode = ScrollMode.VERTICAL;
      this._spreadMode = SpreadMode.NONE;

      if (this._onBeforeDraw) {
        this.eventBus._off("pagerender", this._onBeforeDraw);
        this._onBeforeDraw = null;
      }
      if (this._onAfterDraw) {
        this.eventBus._off("pagerendered", this._onAfterDraw);
        this._onAfterDraw = null;
      }
      this._resetScriptingEvents();

      // Remove the pages from the DOM...
      this.viewer.textContent = "";
      // ... and reset the Scroll mode CSS class(es) afterwards.
      this._updateScrollMode();
    }

    _scrollUpdate() {
      if (this.pagesCount === 0) {
        return;
      }
      this.update();
    }

    _scrollIntoView({ pageDiv, pageSpot = null, pageNumber = null }) {
      scrollIntoView(pageDiv, pageSpot);
    }

    _setScaleUpdatePages(newScale, newValue, noScroll = false, preset = false) {
      this._currentScaleValue = newValue.toString();

      if (isSameScale(this._currentScale, newScale)) {
        if (preset) {
          this.eventBus.dispatch("scalechanging", {
            source: this,
            scale: newScale,
            presetValue: newValue,
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
        if (
          this._location &&
          !(this.isInPresentationMode || this.isChangingPresentationMode)
        ) {
          page = this._location.pageNumber;
          dest = [
            null,
            { name: "XYZ" },
            this._location.left,
            this._location.top,
            null,
          ];
        }
        this.scrollPageIntoView({
          pageNumber: page,
          destArray: dest,
          allowNegativeOffset: true,
        });
      }

      this.eventBus.dispatch("scalechanging", {
        source: this,
        scale: newScale,
        presetValue: preset ? newValue : undefined,
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }

    /**
     * @private
     */
    get _pageWidthScaleFactor() {
      if (
        this.spreadMode !== SpreadMode.NONE &&
        this.scrollMode !== ScrollMode.HORIZONTAL &&
        !this.isInPresentationMode
      ) {
        return 2;
      }
      return 1;
    }

    _setScale(value, noScroll = false) {
      let scale = parseFloat(value);

      if (scale > 0) {
        this._setScaleUpdatePages(scale, value, noScroll, /* preset = */ false);
      } else {
        const currentPage = this._pages[this._currentPageNumber - 1];
        if (!currentPage) {
          return;
        }
        const noPadding = this.isInPresentationMode || this.removePageBorders;
        let hPadding = noPadding ? 0 : SCROLLBAR_PADDING;
        let vPadding = noPadding ? 0 : VERTICAL_PADDING;

        if (!noPadding && this._isScrollModeHorizontal) {
          [hPadding, vPadding] = [vPadding, hPadding]; // Swap the padding values.
        }
        const pageWidthScale =
          (((this.container.clientWidth - hPadding) / currentPage.width) *
            currentPage.scale) /
          this._pageWidthScaleFactor;
        const pageHeightScale =
          ((this.container.clientHeight - vPadding) / currentPage.height) *
          currentPage.scale;
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
            // For pages in landscape mode, fit the page height to the viewer
            // *unless* the page would thus become too wide to fit horizontally.
            const horizontalScale = isPortraitOrientation(currentPage)
              ? pageWidthScale
              : Math.min(pageHeightScale, pageWidthScale);
            scale = Math.min(MAX_AUTO_SCALE, horizontalScale);
            break;
          default:
            console.error(
              `${this._name}._setScale: "${value}" is an unknown zoom value.`
            );
            return;
        }
        this._setScaleUpdatePages(scale, value, noScroll, /* preset = */ true);
      }
    }

    /**
     * Refreshes page view: scrolls to the current page and updates the scale.
     * @private
     */
    _resetCurrentPageView() {
      if (this.isInPresentationMode) {
        // Fixes the case when PDF has different page sizes.
        this._setScale(this._currentScaleValue, true);
      }

      const pageView = this._pages[this._currentPageNumber - 1];
      this._scrollIntoView({ pageDiv: pageView.div });
    }

    /**
     * @param {string} label - The page label.
     * @returns {number|null} The page number corresponding to the page label,
     *   or `null` when no page labels exist and/or the input is invalid.
     */
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

    /**
     * @typedef ScrollPageIntoViewParameters
     * @property {number} pageNumber - The page number.
     * @property {Array} [destArray] - The original PDF destination array, in the
     *   format: <page-ref> </XYZ|/FitXXX> <args..>
     * @property {boolean} [allowNegativeOffset] - Allow negative page offsets.
     *   The default value is `false`.
     * @property {boolean} [ignoreDestinationZoom] - Ignore the zoom argument in
     *   the destination array. The default value is `false`.
     */

    /**
     * Scrolls page into view.
     * @param {ScrollPageIntoViewParameters} params
     */
    scrollPageIntoView({
      pageNumber,
      destArray = null,
      allowNegativeOffset = false,
      ignoreDestinationZoom = false,
    }) {
      if (!this.pdfDocument) {
        return;
      }
      const pageView =
        Number.isInteger(pageNumber) && this._pages[pageNumber - 1];
      if (!pageView) {
        console.error(
          `${this._name}.scrollPageIntoView: ` +
            `"${pageNumber}" is not a valid pageNumber parameter.`
        );
        return;
      }

      if (this.isInPresentationMode || !destArray) {
        this._setCurrentPageNumber(pageNumber, /* resetCurrentPageView = */ true);
        return;
      }
      let x = 0,
        y = 0;
      let width = 0,
        height = 0,
        widthScale,
        heightScale;
      const changeOrientation = pageView.rotation % 180 !== 0;
      const pageWidth =
        (changeOrientation ? pageView.height : pageView.width) /
        pageView.scale /
        CSS_UNITS;
      const pageHeight =
        (changeOrientation ? pageView.width : pageView.height) /
        pageView.scale /
        CSS_UNITS;
      let scale = 0;
      switch (destArray[1].name) {
        case "XYZ":
          x = destArray[2];
          y = destArray[3];
          scale = destArray[4];
          // If x and/or y coordinates are not supplied, default to
          // _top_ left of the page (not the obvious bottom left,
          // since aligning the bottom of the intended page with the
          // top of the window is rarely helpful).
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
          // According to the PDF spec, section 12.3.2.2, a `null` value in the
          // parameter should maintain the position relative to the new page.
          if (y === null && this._location) {
            x = this._location.left;
            y = this._location.top;
          } else if (typeof y !== "number") {
            // The "top" value isn't optional, according to the spec, however some
            // bad PDF generators will pretend that it is (fixes bug 1663390).
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
          const hPadding = this.removePageBorders ? 0 : SCROLLBAR_PADDING;
          const vPadding = this.removePageBorders ? 0 : VERTICAL_PADDING;

          widthScale =
            (this.container.clientWidth - hPadding) / width / CSS_UNITS;
          heightScale =
            (this.container.clientHeight - vPadding) / height / CSS_UNITS;
          scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
          break;
        default:
          console.error(
            `${this._name}.scrollPageIntoView: ` +
              `"${destArray[1].name}" is not a valid destination type.`
          );
          return;
      }

      if (!ignoreDestinationZoom) {
        if (scale && scale !== this._currentScale) {
          this.currentScaleValue = scale;
        } else if (this._currentScale === UNKNOWN_SCALE) {
          this.currentScaleValue = DEFAULT_SCALE_VALUE;
        }
      }

      if (scale === "page-fit" && !destArray[4]) {
        this._scrollIntoView({
          pageDiv: pageView.div,
          pageNumber,
        });
        return;
      }

      const boundingRect = [
        pageView.viewport.convertToViewportPoint(x, y),
        pageView.viewport.convertToViewportPoint(x + width, y + height),
      ];
      let left = Math.min(boundingRect[0][0], boundingRect[1][0]);
      let top = Math.min(boundingRect[0][1], boundingRect[1][1]);

      if (!allowNegativeOffset) {
        // Some bad PDF generators will create destinations with e.g. top values
        // that exceeds the page height. Ensure that offsets are not negative,
        // to prevent a previous page from becoming visible (fixes bug 874482).
        left = Math.max(left, 0);
        top = Math.max(top, 0);
      }
      this._scrollIntoView({
        pageDiv: pageView.div,
        pageSpot: { left, top },
        pageNumber,
      });
    }

    _updateLocation(firstPage) {
      const currentScale = this._currentScale;
      const currentScaleValue = this._currentScaleValue;
      const normalizedScaleValue =
        parseFloat(currentScaleValue) === currentScale
          ? Math.round(currentScale * 10000) / 100
          : currentScaleValue;

      const pageNumber = firstPage.id;
      let pdfOpenParams = "#page=" + pageNumber;
      pdfOpenParams += "&zoom=" + normalizedScaleValue;
      const currentPageView = this._pages[pageNumber - 1];
      const container = this.container;
      const topLeft = currentPageView.getPagePoint(
        container.scrollLeft - firstPage.x,
        container.scrollTop - firstPage.y
      );
      const intLeft = Math.round(topLeft[0]);
      const intTop = Math.round(topLeft[1]);
      pdfOpenParams += "," + intLeft + "," + intTop;

      this._location = {
        pageNumber,
        scale: normalizedScaleValue,
        top: intTop,
        left: intLeft,
        rotation: this._pagesRotation,
        pdfOpenParams,
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

      this._updateHelper(visiblePages); // Run any class-specific update code.

      this._updateLocation(visible.first);
      this.eventBus.dispatch("updateviewarea", {
        source: this,
        location: this._location,
      });
    }

    containsElement(element) {
      return this.container.contains(element);
    }

    focus() {
      this.container.focus();
    }

    get _isScrollModeHorizontal() {
      // Used to ensure that pre-rendering of the next/previous page works
      // correctly, since Scroll/Spread modes are ignored in Presentation Mode.
      return this.isInPresentationMode
        ? false
        : this._scrollMode === ScrollMode.HORIZONTAL;
    }

    get _isContainerRtl() {
      return getComputedStyle(this.container).direction === "rtl";
    }

    get isInPresentationMode() {
      return this.presentationModeState === PresentationModeState.FULLSCREEN;
    }

    get isChangingPresentationMode() {
      return this.presentationModeState === PresentationModeState.CHANGING;
    }

    get isHorizontalScrollbarEnabled() {
      return this.isInPresentationMode
        ? false
        : this.container.scrollWidth > this.container.clientWidth;
    }

    get isVerticalScrollbarEnabled() {
      return this.isInPresentationMode
        ? false
        : this.container.scrollHeight > this.container.clientHeight;
    }

    /**
     * Helper method for `this._getVisiblePages`. Should only ever be used when
     * the viewer can only display a single page at a time, for example in:
     *  - `PDFSinglePageViewer`.
     *  - `PDFViewer` with Presentation Mode active.
     */
    _getCurrentVisiblePage() {
      if (!this.pagesCount) {
        return { views: [] };
      }
      const pageView = this._pages[this._currentPageNumber - 1];
      // NOTE: Compute the `x` and `y` properties of the current view,
      // since `this._updateLocation` depends of them being available.
      const element = pageView.div;

      const view = {
        id: pageView.id,
        x: element.offsetLeft + element.clientLeft,
        y: element.offsetTop + element.clientTop,
        view: pageView,
      };
      return { first: view, last: view, views: [view] };
    }

    _getVisiblePages() {
      return getVisibleElements({
        scrollEl: this.container,
        views: this._pages,
        sortByVisibility: true,
        horizontal: this._isScrollModeHorizontal,
        rtl: this._isScrollModeHorizontal && this._isContainerRtl,
      });
    }

    /**
     * @param {number} pageNumber
     */
    isPageVisible(pageNumber) {
      if (!this.pdfDocument) {
        return false;
      }
      if (
        !(
          Number.isInteger(pageNumber) &&
          pageNumber > 0 &&
          pageNumber <= this.pagesCount
        )
      ) {
        console.error(
          `${this._name}.isPageVisible: "${pageNumber}" is not a valid page.`
        );
        return false;
      }
      return this._getVisiblePages().views.some(function (view) {
        return view.id === pageNumber;
      });
    }

    /**
     * @param {number} pageNumber
     */
    isPageCached(pageNumber) {
      if (!this.pdfDocument || !this._buffer) {
        return false;
      }
      if (
        !(
          Number.isInteger(pageNumber) &&
          pageNumber > 0 &&
          pageNumber <= this.pagesCount
        )
      ) {
        console.error(
          `${this._name}.isPageCached: "${pageNumber}" is not a valid page.`
        );
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
        if (
          this._pages[i] &&
          this._pages[i].renderingState !== RenderingStates.FINISHED
        ) {
          this._pages[i].reset();
        }
      }
    }

    /**
     * @private
     */
    _cancelRendering() {
      for (let i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i]) {
          this._pages[i].cancelRendering();
        }
      }
    }

    /**
     * @param {PDFPageView} pageView
     * @returns {Promise} Returns a promise containing a {PDFPageProxy} object.
     * @private
     */
    _ensurePdfPageLoaded(pageView) {
      if (pageView.pdfPage) {
        return Promise.resolve(pageView.pdfPage);
      }
      if (this._pagesRequests.has(pageView)) {
        return this._pagesRequests.get(pageView);
      }
      const promise = this.pdfDocument
        .getPage(pageView.id)
        .then(pdfPage => {
          if (!pageView.pdfPage) {
            pageView.setPdfPage(pdfPage);
          }
          this._pagesRequests.delete(pageView);
          return pdfPage;
        })
        .catch(reason => {
          console.error("Unable to get page for page view", reason);
          // Page error -- there is nothing that can be done.
          this._pagesRequests.delete(pageView);
        });
      this._pagesRequests.set(pageView, promise);
      return promise;
    }

    forceRendering(currentlyVisiblePages) {
      const visiblePages = currentlyVisiblePages || this._getVisiblePages();
      const scrollAhead = this._isScrollModeHorizontal
        ? this.scroll.right
        : this.scroll.down;
      const pageView = this.renderingQueue.getHighestPriority(
        visiblePages,
        this._pages,
        scrollAhead
      );
      if (pageView) {
        this._ensurePdfPageLoaded(pageView).then(() => {
          this.renderingQueue.renderView(pageView);
        });
        return true;
      }
      return false;
    }

    /**
     * @param {HTMLDivElement} textLayerDiv
     * @param {number} pageIndex
     * @param {PageViewport} viewport
     * @param {boolean} enhanceTextSelection
     * @param {EventBus} eventBus
     * @returns {TextLayerBuilder}
     */
    createTextLayerBuilder(
      textLayerDiv,
      pageIndex,
      viewport,
      enhanceTextSelection = false,
      eventBus
    ) {
      return new TextLayerBuilder({
        textLayerDiv,
        eventBus,
        pageIndex,
        viewport,
        findController: this.isInPresentationMode ? null : this.findController,
        enhanceTextSelection: this.isInPresentationMode
          ? false
          : enhanceTextSelection,
      });
    }

    /**
     * @param {HTMLDivElement} pageDiv
     * @param {PDFPage} pdfPage
     * @param {AnnotationStorage} [annotationStorage] - Storage for annotation
     *   data in forms.
     * @param {string} [imageResourcesPath] - Path for image resources, mainly
     *   for annotation icons. Include trailing slash.
     * @param {boolean} renderInteractiveForms
     * @param {IL10n} l10n
     * @param {boolean} [enableScripting]
     * @param {Promise<boolean>} [hasJSActionsPromise]
     * @param {Object} [mouseState]
     * @returns {AnnotationLayerBuilder}
     */
    createAnnotationLayerBuilder(
      pageDiv,
      pdfPage,
      annotationStorage = null,
      imageResourcesPath = "",
      renderInteractiveForms = false,
      l10n = NullL10n,
      enableScripting = false,
      hasJSActionsPromise = null,
      mouseState = null
    ) {
      return new AnnotationLayerBuilder({
        pageDiv,
        pdfPage,
        annotationStorage:
          ///annotationStorage || this.pdfDocument?.annotationStorage, // lwf
          annotationStorage || (this.pdfDocument && this.pdfDocument.annotationStorage),
        imageResourcesPath,
        renderInteractiveForms,
        linkService: this.linkService,
        downloadManager: this.downloadManager,
        l10n,
        enableScripting,
        hasJSActionsPromise:
          ///hasJSActionsPromise || this.pdfDocument?.hasJSActions(), // lwf
          hasJSActionsPromise || (this.pdfDocument && this.pdfDocument.hasJSActions()),
        mouseState: mouseState || this._mouseState,
      });
    }

    /**
     * @type {boolean} Whether all pages of the PDF document have identical
     *   widths and heights.
     */
    get hasEqualPageSizes() {
      const firstPageView = this._pages[0];
      for (let i = 1, ii = this._pages.length; i < ii; ++i) {
        const pageView = this._pages[i];
        if (
          pageView.width !== firstPageView.width ||
          pageView.height !== firstPageView.height
        ) {
          return false;
        }
      }
      return true;
    }

    /**
     * Returns sizes of the pages.
     * @returns {Array} Array of objects with width/height/rotation fields.
     */
    getPagesOverview() {
      const pagesOverview = this._pages.map(function (pageView) {
        const viewport = pageView.pdfPage.getViewport({ scale: 1 });
        return {
          width: viewport.width,
          height: viewport.height,
          rotation: viewport.rotation,
        };
      });
      if (!this.enablePrintAutoRotate) {
        return pagesOverview;
      }
      return pagesOverview.map(function (size) {
        if (isPortraitOrientation(size)) {
          return size;
        }
        return {
          width: size.height,
          height: size.width,
          rotation: (size.rotation + 90) % 360,
        };
      });
    }

    /**
     * @type {Promise<OptionalContentConfig | null>}
     */
    get optionalContentConfigPromise() {
      if (!this.pdfDocument) {
        return Promise.resolve(null);
      }
      if (!this._optionalContentConfigPromise) {
        // Prevent issues if the getter is accessed *before* the `onePageRendered`
        // promise has resolved; won't (normally) happen in the default viewer.
        return this.pdfDocument.getOptionalContentConfig();
      }
      return this._optionalContentConfigPromise;
    }

    /**
     * @param {Promise<OptionalContentConfig>} promise - A promise that is
     *   resolved with an {@link OptionalContentConfig} instance.
     */
    set optionalContentConfigPromise(promise) {
      if (!(promise instanceof Promise)) {
        throw new Error(`Invalid optionalContentConfigPromise: ${promise}`);
      }
      if (!this.pdfDocument) {
        return;
      }
      if (!this._optionalContentConfigPromise) {
        // Ignore the setter *before* the `onePageRendered` promise has resolved,
        // since it'll be overwritten anyway; won't happen in the default viewer.
        return;
      }
      this._optionalContentConfigPromise = promise;

      for (const pageView of this._pages) {
        pageView.update(pageView.scale, pageView.rotation, promise);
      }
      this.update();

      this.eventBus.dispatch("optionalcontentconfigchanged", {
        source: this,
        promise,
      });
    }

    /**
     * @type {number} One of the values in {ScrollMode}.
     */
    get scrollMode() {
      return this._scrollMode;
    }

    /**
     * @param {number} mode - The direction in which the document pages should be
     *   laid out within the scrolling container.
     *   The constants from {ScrollMode} should be used.
     */
    set scrollMode(mode) {
      if (this._scrollMode === mode) {
        return; // The Scroll mode didn't change.
      }
      if (!isValidScrollMode(mode)) {
        throw new Error(`Invalid scroll mode: ${mode}`);
      }
      this._scrollMode = mode;
      this.eventBus.dispatch("scrollmodechanged", { source: this, mode });

      this._updateScrollMode(/* pageNumber = */ this._currentPageNumber);
    }

    _updateScrollMode(pageNumber = null) {
      const scrollMode = this._scrollMode,
        viewer = this.viewer;

      viewer.classList.toggle(
        "scrollHorizontal",
        scrollMode === ScrollMode.HORIZONTAL
      );
      viewer.classList.toggle("scrollWrapped", scrollMode === ScrollMode.WRAPPED);

      if (!this.pdfDocument || !pageNumber) {
        return;
      }
      // Non-numeric scale values can be sensitive to the scroll orientation.
      // Call this before re-scrolling to the current page, to ensure that any
      // changes in scale don't move the current page.
      if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
        this._setScale(this._currentScaleValue, true);
      }
      this._setCurrentPageNumber(pageNumber, /* resetCurrentPageView = */ true);
      this.update();
    }

    /**
     * @type {number} One of the values in {SpreadMode}.
     */
    get spreadMode() {
      return this._spreadMode;
    }

    /**
     * @param {number} mode - Group the pages in spreads, starting with odd- or
     *   even-number pages (unless `SpreadMode.NONE` is used).
     *   The constants from {SpreadMode} should be used.
     */
    set spreadMode(mode) {
      if (this._spreadMode === mode) {
        return; // The Spread mode didn't change.
      }
      if (!isValidSpreadMode(mode)) {
        throw new Error(`Invalid spread mode: ${mode}`);
      }
      this._spreadMode = mode;
      this.eventBus.dispatch("spreadmodechanged", { source: this, mode });

      this._updateSpreadMode(/* pageNumber = */ this._currentPageNumber);
    }

    _updateSpreadMode(pageNumber = null) {
      if (!this.pdfDocument) {
        return;
      }
      const viewer = this.viewer,
        pages = this._pages;
      // Temporarily remove all the pages from the DOM.
      viewer.textContent = "";

      if (this._spreadMode === SpreadMode.NONE) {
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
      this._setCurrentPageNumber(pageNumber, /* resetCurrentPageView = */ true);
      this.update();
    }

    /**
     * @private
     */
    _getPageAdvance(currentPageNumber, previous = false) {
      if (this.isInPresentationMode) {
        return 1;
      }
      switch (this._scrollMode) {
        case ScrollMode.WRAPPED: {
          const { views } = this._getVisiblePages(),
            pageLayout = new Map();

          // Determine the current (visible) page layout.
          for (const { id, y, percent, widthPercent } of views) {
            if (percent === 0 || widthPercent < 100) {
              continue;
            }
            let yArray = pageLayout.get(y);
            if (!yArray) {
              ///pageLayout.set(y, (yArray ||= [])); // lwf
              pageLayout.set(y, (yArray = []));
            }
            yArray.push(id);
          }
          // Find the row of the current page.
          for (const yArray of pageLayout.values()) {
            const currentIndex = yArray.indexOf(currentPageNumber);
            if (currentIndex === -1) {
              continue;
            }
            const numPages = yArray.length;
            if (numPages === 1) {
              break;
            }
            // Handle documents with varying page sizes.
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
            // The current row is "complete", advance to the previous/next one.
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
        case ScrollMode.HORIZONTAL: {
          break;
        }
        case ScrollMode.VERTICAL: {
          if (this._spreadMode === SpreadMode.NONE) {
            break; // Normal vertical scrolling.
          }
          const parity = this._spreadMode - 1;

          if (previous && currentPageNumber % 2 !== parity) {
            break; // Left-hand side page.
          } else if (!previous && currentPageNumber % 2 === parity) {
            break; // Right-hand side page.
          }
          const { views } = this._getVisiblePages(),
            expectedId = previous ? currentPageNumber - 1 : currentPageNumber + 1;

          for (const { id, percent, widthPercent } of views) {
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

    /**
     * Go to the next page, taking scroll/spread-modes into account.
     * @returns {boolean} Whether navigation occured.
     */
    nextPage() {
      const currentPageNumber = this._currentPageNumber,
        pagesCount = this.pagesCount;

      if (currentPageNumber >= pagesCount) {
        return false;
      }
      const advance =
        this._getPageAdvance(currentPageNumber, /* previous = */ false) || 1;

      this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
      return true;
    }

    /**
     * Go to the previous page, taking scroll/spread-modes into account.
     * @returns {boolean} Whether navigation occured.
     */
    previousPage() {
      const currentPageNumber = this._currentPageNumber;

      if (currentPageNumber <= 1) {
        return false;
      }
      const advance =
        this._getPageAdvance(currentPageNumber, /* previous = */ true) || 1;

      this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
      return true;
    }

    initializeScriptingEvents() {
      if (!this.enableScripting || this._pageOpenPendingSet) {
        return;
      }
      const eventBus = this.eventBus,
        pageOpenPendingSet = (this._pageOpenPendingSet = new Set()),
        //scriptingEvents = (this._scriptingEvents ||= Object.create(null)); // lwf
        scriptingEvents = (this._scriptingEvents || (this._scriptingEvents = Object.create(null)));

      const dispatchPageClose = pageNumber => {
        if (pageOpenPendingSet.has(pageNumber)) {
          return; // No "pageopen" event was dispatched for the previous page.
        }
        eventBus.dispatch("pageclose", { source: this, pageNumber });
      };
      const dispatchPageOpen = pageNumber => {
        const pageView = this._pages[pageNumber - 1];
        //if (pageView?.renderingState === RenderingStates.FINISHED) { // lwf
        if (pageView && pageView.renderingState === RenderingStates.FINISHED) {
          pageOpenPendingSet.delete(pageNumber);

          eventBus.dispatch("pageopen", {
            source: this,
            pageNumber,
            ///actionsPromise: pageView.pdfPage?.getJSActions(),// lwf
            actionsPromise: pageView.pdfPage && pageView.pdfPage.getJSActions(),
          });
        } else {
          pageOpenPendingSet.add(pageNumber);
        }
      };

      scriptingEvents.onPageChanging = ({ pageNumber, previous }) => {
        if (pageNumber === previous) {
          return; // The active page didn't change.
        }
        dispatchPageClose(previous);
        dispatchPageOpen(pageNumber);
      };
      eventBus._on("pagechanging", scriptingEvents.onPageChanging);

      scriptingEvents.onPageRendered = ({ pageNumber }) => {
        if (!pageOpenPendingSet.has(pageNumber)) {
          return; // No pending "pageopen" event for the newly rendered page.
        }
        if (pageNumber !== this._currentPageNumber) {
          return; // The newly rendered page is no longer the current one.
        }
        dispatchPageOpen(pageNumber);
      };
      eventBus._on("pagerendered", scriptingEvents.onPageRendered);

      scriptingEvents.onPagesDestroy = () => {
        dispatchPageClose(this._currentPageNumber);
      };
      eventBus._on("pagesdestroy", scriptingEvents.onPagesDestroy);

      // Ensure that a "pageopen" event is dispatched for the initial page.
      dispatchPageOpen(this._currentPageNumber);
    }

    /**
     * @private
     */
    _resetScriptingEvents() {
      if (!this.enableScripting || !this._pageOpenPendingSet) {
        return;
      }
      const eventBus = this.eventBus,
        scriptingEvents = this._scriptingEvents;

      // Remove the event listeners.
      eventBus._off("pagechanging", scriptingEvents.onPageChanging);
      scriptingEvents.onPageChanging = null;

      eventBus._off("pagerendered", scriptingEvents.onPageRendered);
      scriptingEvents.onPageRendered = null;

      eventBus._off("pagesdestroy", scriptingEvents.onPagesDestroy);
      scriptingEvents.onPagesDestroy = null;

      this._pageOpenPendingSet = null;
    }
  }

  return { BaseViewer };
});
define('skylark-pdfjs-viewer/pdf_viewer',[
  "skylark-pdfjs-display",
  "./ui_utils",
  "./base_viewer"
],function(pdfjsLib,ui_utils,base_viewer){
  /* Copyright 2014 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { ScrollMode, SpreadMode } = ui_utils;
  const { BaseViewer } = base_viewer;
  const { shadow } = pdfjsLib;

  class PDFViewer extends BaseViewer {
    get _viewerElement() {
      return shadow(this, "_viewerElement", this.viewer);
    }

    _scrollIntoView({ pageDiv, pageSpot = null, pageNumber = null }) {
      if (!pageSpot && !this.isInPresentationMode) {
        const left = pageDiv.offsetLeft + pageDiv.clientLeft;
        const right = left + pageDiv.clientWidth;
        const { scrollLeft, clientWidth } = this.container;
        if (
          this._isScrollModeHorizontal ||
          left < scrollLeft ||
          right > scrollLeft + clientWidth
        ) {
          pageSpot = { left: 0, top: 0 };
        }
      }
      super._scrollIntoView({ pageDiv, pageSpot, pageNumber });
    }

    _getVisiblePages() {
      if (this.isInPresentationMode) {
        // The algorithm in `getVisibleElements` doesn't work in all browsers and
        // configurations (e.g. Chrome) when Presentation Mode is active.
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
        if (
          page.id === currentId &&
          this._scrollMode === ScrollMode.VERTICAL &&
          this._spreadMode === SpreadMode.NONE
        ) {
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

  return { PDFViewer };
});
define('skylark-pdfjs-viewer/pdf_single_page_viewer',[
  "skylark-pdfjs-display",
  "./base_viewer"
],function(pdfjsLib,base_viewer){
  /* Copyright 2017 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { BaseViewer } = base_viewer;
  const { shadow } = pdfjsLib;

  class PDFSinglePageViewer extends BaseViewer {
    constructor(options) {
      super(options);

      this.eventBus._on("pagesinit", evt => {
        // Since the pages are placed in a `DocumentFragment`, make sure that
        // the current page becomes visible upon loading of the document.
        this._ensurePageViewVisible();
      });
    }

    get _viewerElement() {
      // Since we only want to display *one* page at a time when using the
      // `PDFSinglePageViewer`, we cannot append them to the `viewer` DOM element.
      // Instead, they are placed in a `DocumentFragment`, and only the current
      // page is displayed in the viewer (refer to `this._ensurePageViewVisible`).
      return shadow(this, "_viewerElement", this._shadowViewer);
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
        case 0: // Should *only* occur on initial loading.
          this.viewer.appendChild(pageView.div);
          break;
        case 1: // The normal page-switching case.
          if (viewerNodes[0] !== previousPageView.div) {
            throw new Error(
              "_ensurePageViewVisible: Unexpected previously visible page."
            );
          }
          if (pageView === previousPageView) {
            break; // The correct page is already visible.
          }
          // Switch visible pages, and reset the viewerContainer scroll position.
          this._shadowViewer.appendChild(previousPageView.div);
          this.viewer.appendChild(pageView.div);

          this.container.scrollTop = 0;
          break;
        default:
          throw new Error(
            "_ensurePageViewVisible: Only one page should be visible at a time."
          );
      }
      this._previousPageNumber = this._currentPageNumber;
    }

    _scrollUpdate() {
      if (this._updateScrollDown) {
        this._updateScrollDown();
      }
      super._scrollUpdate();
    }

    _scrollIntoView({ pageDiv, pageSpot = null, pageNumber = null }) {
      if (pageNumber) {
        // Ensure that `this._currentPageNumber` is correct.
        this._setCurrentPageNumber(pageNumber);
      }
      const scrolledDown = this._currentPageNumber >= this._previousPageNumber;

      this._ensurePageViewVisible();
      // Ensure that rendering always occurs, to avoid showing a blank page,
      // even if the current position doesn't change when the page is scrolled.
      this.update();

      super._scrollIntoView({ pageDiv, pageSpot, pageNumber });

      // Since scrolling is tracked using `requestAnimationFrame`, update the
      // scroll direction during the next `this._scrollUpdate` invocation.
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
      // The Scroll/Spread modes are never used in `PDFSinglePageViewer`.
      return shadow(this, "_isScrollModeHorizontal", false);
    }

    _updateScrollMode() {}

    _updateSpreadMode() {}

    _getPageAdvance() {
      return 1;
    }
  }

  return { PDFSinglePageViewer };
});
define('skylark-pdfjs-viewer/secondary_toolbar',[
  "./ui_utils",
  "./pdf_cursor_tools",
  "./pdf_single_page_viewer"
],function(ui_utils,pdf_cursor_tools,pdf_single_page_viewer){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { SCROLLBAR_PADDING, ScrollMode, SpreadMode } = ui_utils;
  const { CursorTool } = pdf_cursor_tools;
  const { PDFSinglePageViewer } = pdf_single_page_viewer;

  /**
   * @typedef {Object} SecondaryToolbarOptions
   * @property {HTMLDivElement} toolbar - Container for the secondary toolbar.
   * @property {HTMLButtonElement} toggleButton - Button to toggle the visibility
   *   of the secondary toolbar.
   * @property {HTMLDivElement} toolbarButtonContainer - Container where all the
   *   toolbar buttons are placed. The maximum height of the toolbar is controlled
   *   dynamically by adjusting the 'max-height' CSS property of this DOM element.
   * @property {HTMLButtonElement} presentationModeButton - Button for entering
   *   presentation mode.
   * @property {HTMLButtonElement} openFileButton - Button to open a file.
   * @property {HTMLButtonElement} printButton - Button to print the document.
   * @property {HTMLButtonElement} downloadButton - Button to download the
   *   document.
   * @property {HTMLLinkElement} viewBookmarkButton - Button to obtain a bookmark
   *   link to the current location in the document.
   * @property {HTMLButtonElement} firstPageButton - Button to go to the first
   *   page in the document.
   * @property {HTMLButtonElement} lastPageButton - Button to go to the last page
   *   in the document.
   * @property {HTMLButtonElement} pageRotateCwButton - Button to rotate the pages
   *   clockwise.
   * @property {HTMLButtonElement} pageRotateCcwButton - Button to rotate the
   *   pages counterclockwise.
   * @property {HTMLButtonElement} cursorSelectToolButton - Button to enable the
   *   select tool.
   * @property {HTMLButtonElement} cursorHandToolButton - Button to enable the
   *   hand tool.
   * @property {HTMLButtonElement} documentPropertiesButton - Button for opening
   *   the document properties dialog.
   */

  class SecondaryToolbar {
    /**
     * @param {SecondaryToolbarOptions} options
     * @param {HTMLDivElement} mainContainer
     * @param {EventBus} eventBus
     */
    constructor(options, mainContainer, eventBus) {
      this.toolbar = options.toolbar;
      this.toggleButton = options.toggleButton;
      this.toolbarButtonContainer = options.toolbarButtonContainer;
      this.buttons = [
        {
          element: options.presentationModeButton,
          eventName: "presentationmode",
          close: true,
        },
        { element: options.openFileButton, eventName: "openfile", close: true },
        { element: options.printButton, eventName: "print", close: true },
        { element: options.downloadButton, eventName: "download", close: true },
        { element: options.viewBookmarkButton, eventName: null, close: true },
        { element: options.firstPageButton, eventName: "firstpage", close: true },
        { element: options.lastPageButton, eventName: "lastpage", close: true },
        {
          element: options.pageRotateCwButton,
          eventName: "rotatecw",
          close: false,
        },
        {
          element: options.pageRotateCcwButton,
          eventName: "rotateccw",
          close: false,
        },
        {
          element: options.cursorSelectToolButton,
          eventName: "switchcursortool",
          eventDetails: { tool: CursorTool.SELECT },
          close: true,
        },
        {
          element: options.cursorHandToolButton,
          eventName: "switchcursortool",
          eventDetails: { tool: CursorTool.HAND },
          close: true,
        },
        {
          element: options.scrollVerticalButton,
          eventName: "switchscrollmode",
          eventDetails: { mode: ScrollMode.VERTICAL },
          close: true,
        },
        {
          element: options.scrollHorizontalButton,
          eventName: "switchscrollmode",
          eventDetails: { mode: ScrollMode.HORIZONTAL },
          close: true,
        },
        {
          element: options.scrollWrappedButton,
          eventName: "switchscrollmode",
          eventDetails: { mode: ScrollMode.WRAPPED },
          close: true,
        },
        {
          element: options.spreadNoneButton,
          eventName: "switchspreadmode",
          eventDetails: { mode: SpreadMode.NONE },
          close: true,
        },
        {
          element: options.spreadOddButton,
          eventName: "switchspreadmode",
          eventDetails: { mode: SpreadMode.ODD },
          close: true,
        },
        {
          element: options.spreadEvenButton,
          eventName: "switchspreadmode",
          eventDetails: { mode: SpreadMode.EVEN },
          close: true,
        },
        {
          element: options.documentPropertiesButton,
          eventName: "documentproperties",
          close: true,
        },
      ];
      this.items = {
        firstPage: options.firstPageButton,
        lastPage: options.lastPageButton,
        pageRotateCw: options.pageRotateCwButton,
        pageRotateCcw: options.pageRotateCcwButton,
      };

      this.mainContainer = mainContainer;
      this.eventBus = eventBus;

      this.opened = false;
      this.containerHeight = null;
      this.previousContainerHeight = null;

      this.reset();

      // Bind the event listeners for click, cursor tool, and scroll/spread mode
      // actions.
      this._bindClickListeners();
      this._bindCursorToolsListener(options);
      this._bindScrollModeListener(options);
      this._bindSpreadModeListener(options);

      // Bind the event listener for adjusting the 'max-height' of the toolbar.
      this.eventBus._on("resize", this._setMaxHeight.bind(this));

      // Hide the Scroll/Spread mode buttons, when they're not applicable to the
      // current `BaseViewer` instance (in particular `PDFSinglePageViewer`).
      this.eventBus._on("baseviewerinit", evt => {
        if (evt.source instanceof PDFSinglePageViewer) {
          this.toolbarButtonContainer.classList.add(
            "hiddenScrollModeButtons",
            "hiddenSpreadModeButtons"
          );
        } else {
          this.toolbarButtonContainer.classList.remove(
            "hiddenScrollModeButtons",
            "hiddenSpreadModeButtons"
          );
        }
      });
    }

    /**
     * @type {boolean}
     */
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

      // Reset the Scroll/Spread buttons too, since they're document specific.
      this.eventBus.dispatch("secondarytoolbarreset", { source: this });
    }

    _updateUIState() {
      this.items.firstPage.disabled = this.pageNumber <= 1;
      this.items.lastPage.disabled = this.pageNumber >= this.pagesCount;
      this.items.pageRotateCw.disabled = this.pagesCount === 0;
      this.items.pageRotateCcw.disabled = this.pagesCount === 0;
    }

    _bindClickListeners() {
      // Button to toggle the visibility of the secondary toolbar.
      this.toggleButton.addEventListener("click", this.toggle.bind(this));

      // All items within the secondary toolbar.
      for (const { element, eventName, close, eventDetails } of this.buttons) {
        element.addEventListener("click", evt => {
          if (eventName !== null) {
            const details = { source: this };
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
      this.eventBus._on("cursortoolchanged", function ({ tool }) {
        buttons.cursorSelectToolButton.classList.toggle(
          "toggled",
          tool === CursorTool.SELECT
        );
        buttons.cursorHandToolButton.classList.toggle(
          "toggled",
          tool === CursorTool.HAND
        );
      });
    }

    _bindScrollModeListener(buttons) {
      function scrollModeChanged({ mode }) {
        buttons.scrollVerticalButton.classList.toggle(
          "toggled",
          mode === ScrollMode.VERTICAL
        );
        buttons.scrollHorizontalButton.classList.toggle(
          "toggled",
          mode === ScrollMode.HORIZONTAL
        );
        buttons.scrollWrappedButton.classList.toggle(
          "toggled",
          mode === ScrollMode.WRAPPED
        );

        // Temporarily *disable* the Spread buttons when horizontal scrolling is
        // enabled, since the non-default Spread modes doesn't affect the layout.
        const isScrollModeHorizontal = mode === ScrollMode.HORIZONTAL;
        buttons.spreadNoneButton.disabled = isScrollModeHorizontal;
        buttons.spreadOddButton.disabled = isScrollModeHorizontal;
        buttons.spreadEvenButton.disabled = isScrollModeHorizontal;
      }
      this.eventBus._on("scrollmodechanged", scrollModeChanged);

      this.eventBus._on("secondarytoolbarreset", evt => {
        if (evt.source === this) {
          scrollModeChanged({ mode: ScrollMode.VERTICAL });
        }
      });
    }

    _bindSpreadModeListener(buttons) {
      function spreadModeChanged({ mode }) {
        buttons.spreadNoneButton.classList.toggle(
          "toggled",
          mode === SpreadMode.NONE
        );
        buttons.spreadOddButton.classList.toggle(
          "toggled",
          mode === SpreadMode.ODD
        );
        buttons.spreadEvenButton.classList.toggle(
          "toggled",
          mode === SpreadMode.EVEN
        );
      }
      this.eventBus._on("spreadmodechanged", spreadModeChanged);

      this.eventBus._on("secondarytoolbarreset", evt => {
        if (evt.source === this) {
          spreadModeChanged({ mode: SpreadMode.NONE });
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

    /**
     * @private
     */
    _setMaxHeight() {
      if (!this.opened) {
        return; // Only adjust the 'max-height' if the toolbar is visible.
      }
      this.containerHeight = this.mainContainer.clientHeight;

      if (this.containerHeight === this.previousContainerHeight) {
        return;
      }
      this.toolbarButtonContainer.style.maxHeight = `${
        this.containerHeight - SCROLLBAR_PADDING
      }px`;

      this.previousContainerHeight = this.containerHeight;
    }
  }

  return { SecondaryToolbar };
});
define('skylark-pdfjs-viewer/toolbar',[
  "./pdfjs_dev",
  "./ui_utils"
],function(PDFJSDev, ui_utils){
  /* Copyright 2016 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const {
    animationStarted,
    DEFAULT_SCALE,
    DEFAULT_SCALE_VALUE,
    MAX_SCALE,
    MIN_SCALE,
    noContextMenuHandler,
    NullL10n,
  } = ui_utils;

  const PAGE_NUMBER_LOADING_INDICATOR = "visiblePageIsLoading";
  // Keep the two values below up-to-date with the values in `web/viewer.css`:
  const SCALE_SELECT_CONTAINER_WIDTH = 140; // px
  const SCALE_SELECT_WIDTH = 162; // px

  /**
   * @typedef {Object} ToolbarOptions
   * @property {HTMLDivElement} container - Container for the secondary toolbar.
   * @property {HTMLSpanElement} numPages - Label that contains number of pages.
   * @property {HTMLInputElement} pageNumber - Control for display and user input
   *   of the current page number.
   * @property {HTMLSpanElement} scaleSelectContainer - Container where scale
   *   controls are placed. The width is adjusted on UI initialization.
   * @property {HTMLSelectElement} scaleSelect - Scale selection control.
   * @property {HTMLOptionElement} customScaleOption - The item used to display
   *   a non-predefined scale.
   * @property {HTMLButtonElement} previous - Button to go to the previous page.
   * @property {HTMLButtonElement} next - Button to go to the next page.
   * @property {HTMLButtonElement} zoomIn - Button to zoom in the pages.
   * @property {HTMLButtonElement} zoomOut - Button to zoom out the pages.
   * @property {HTMLButtonElement} viewFind - Button to open find bar.
   * @property {HTMLButtonElement} openFile - Button to open a new document.
   * @property {HTMLButtonElement} presentationModeButton - Button to switch to
   *   presentation mode.
   * @property {HTMLButtonElement} download - Button to download the document.
   * @property {HTMLAElement} viewBookmark - Element to link current url of
   *   the page view.
   */

  class Toolbar {
    /**
     * @param {ToolbarOptions} options
     * @param {EventBus} eventBus
     * @param {IL10n} l10n - Localization service.
     */
    constructor(options, eventBus, l10n = NullL10n) {
      this.toolbar = options.container;
      this.eventBus = eventBus;
      this.l10n = l10n;
      this.buttons = [
        { element: options.previous, eventName: "previouspage" },
        { element: options.next, eventName: "nextpage" },
        { element: options.zoomIn, eventName: "zoomin" },
        { element: options.zoomOut, eventName: "zoomout" },
        { element: options.openFile, eventName: "openfile" },
        { element: options.print, eventName: "print" },
        {
          element: options.presentationModeButton,
          eventName: "presentationmode",
        },
        { element: options.download, eventName: "download" },
        { element: options.viewBookmark, eventName: null },
      ];
      this.items = {
        numPages: options.numPages,
        pageNumber: options.pageNumber,
        scaleSelectContainer: options.scaleSelectContainer,
        scaleSelect: options.scaleSelect,
        customScaleOption: options.customScaleOption,
        previous: options.previous,
        next: options.next,
        zoomIn: options.zoomIn,
        zoomOut: options.zoomOut,
      };

      this._wasLocalized = false;
      this.reset();

      // Bind the event listeners for click and various other actions.
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
      this.pageScaleValue = DEFAULT_SCALE_VALUE;
      this.pageScale = DEFAULT_SCALE;
      this._updateUIState(true);
      this.updateLoadingIndicatorState();
    }

    _bindListeners() {
      const { pageNumber, scaleSelect } = this.items;
      const self = this;

      // The buttons within the toolbar.
      for (const { element, eventName } of this.buttons) {
        element.addEventListener("click", evt => {
          if (eventName !== null) {
            this.eventBus.dispatch(eventName, { source: this });
          }
        });
      }
      // The non-button elements within the toolbar.
      pageNumber.addEventListener("click", function () {
        this.select();
      });
      pageNumber.addEventListener("change", function () {
        self.eventBus.dispatch("pagenumberchanged", {
          source: self,
          value: this.value,
        });
      });

      scaleSelect.addEventListener("change", function () {
        if (this.value === "custom") {
          return;
        }
        self.eventBus.dispatch("scalechanged", {
          source: self,
          value: this.value,
        });
      });
      // Suppress context menus for some controls.
      scaleSelect.oncontextmenu = noContextMenuHandler;

      this.eventBus._on("localized", () => {
        this._wasLocalized = true;
        this._adjustScaleWidth();
        this._updateUIState(true);
      });
    }

    _updateUIState(resetNumPages = false) {
      if (!this._wasLocalized) {
        // Don't update the UI state until we localize the toolbar.
        return;
      }
      const { pageNumber, pagesCount, pageScaleValue, pageScale, items } = this;

      if (resetNumPages) {
        if (this.hasPageLabels) {
          items.pageNumber.type = "text";
        } else {
          items.pageNumber.type = "number";
          this.l10n
            .get("of_pages", { pagesCount }, "of {{pagesCount}}")
            .then(msg => {
              items.numPages.textContent = msg;
            });
        }
        items.pageNumber.max = pagesCount;
      }

      if (this.hasPageLabels) {
        items.pageNumber.value = this.pageLabel;
        this.l10n
          .get(
            "page_of_pages",
            { pageNumber, pagesCount },
            "({{pageNumber}} of {{pagesCount}})"
          )
          .then(msg => {
            items.numPages.textContent = msg;
          });
      } else {
        items.pageNumber.value = pageNumber;
      }

      items.previous.disabled = pageNumber <= 1;
      items.next.disabled = pageNumber >= pagesCount;

      items.zoomOut.disabled = pageScale <= MIN_SCALE;
      items.zoomIn.disabled = pageScale >= MAX_SCALE;

      const customScale = Math.round(pageScale * 10000) / 100;
      this.l10n
        .get("page_scale_percent", { scale: customScale }, "{{scale}}%")
        .then(msg => {
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

    /**
     * Increase the width of the zoom dropdown DOM element if, and only if, it's
     * too narrow to fit the *longest* of the localized strings.
     * @private
     */
    async _adjustScaleWidth() {
      const { items, l10n } = this;

      const predefinedValuesPromise = Promise.all([
        l10n.get("page_scale_auto", null, "Automatic Zoom"),
        l10n.get("page_scale_actual", null, "Actual Size"),
        l10n.get("page_scale_fit", null, "Page Fit"),
        l10n.get("page_scale_width", null, "Page Width"),
      ]);

      // The temporary canvas is used to measure text length in the DOM.
      let canvas = document.createElement("canvas");
      if (
        typeof PDFJSDev === "undefined" ||
        PDFJSDev.test("MOZCENTRAL || GENERIC")
      ) {
        canvas.mozOpaque = true;
      }
      let ctx = canvas.getContext("2d", { alpha: false });

      await animationStarted;
      const { fontSize, fontFamily } = getComputedStyle(items.scaleSelect);
      ctx.font = `${fontSize} ${fontFamily}`;

      let maxWidth = 0;
      for (const predefinedValue of await predefinedValuesPromise) {
        const { width } = ctx.measureText(predefinedValue);
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
      // Zeroing the width and height cause Firefox to release graphics resources
      // immediately, which can greatly reduce memory consumption.
      canvas.width = 0;
      canvas.height = 0;
      canvas = ctx = null;
    }
  }

  return { Toolbar };
});
define('skylark-pdfjs-viewer/view_history',[
  "./pdfjs_dev"
],function(PDFJSDev){
  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;

  /**
   * View History - This is a utility for saving various view parameters for
   *                recently opened files.
   *
   * The way that the view parameters are stored depends on how PDF.js is built,
   * for 'gulp <flag>' the following cases exist:
   *  - MOZCENTRAL        - uses sessionStorage.
   *  - GENERIC or CHROME - uses localStorage, if it is available.
   */
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
          index = database.files.push({ fingerprint: this.fingerprint }) - 1;
        }
        this.file = database.files[index];
        this.database = database;
      });
    }

    async _writeToStorage() {
      const databaseStr = JSON.stringify(this.database);

      if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("MOZCENTRAL")) {
        sessionStorage.setItem("pdfjs.history", databaseStr);
        return;
      }
      localStorage.setItem("pdfjs.history", databaseStr);
    }

    async _readFromStorage() {
      if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("MOZCENTRAL")) {
        return sessionStorage.getItem("pdfjs.history");
      }
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

  return { ViewHistory };
});
define('skylark-pdfjs-viewer/app',[
  "skylark-pdfjs-display",
  "./pdfjs_dev",

  "./ui_utils",
  "./app_options",

  "./pdf_cursor_tools",
  "./pdf_rendering_queue",
  "./overlay_manager",
  "./password_prompt",
  "./pdf_attachment_viewer",
  "./pdf_document_properties",
  "./pdf_find_bar",
  "./pdf_find_controller",
  "./pdf_history",
  "./pdf_layer_viewer",
  "./pdf_link_service",
  "./pdf_outline_viewer",
  "./pdf_presentation_mode",
  "./pdf_sidebar",
  "./pdf_sidebar_resizer",
  "./pdf_thumbnail_viewer",
  "./pdf_viewer",
  "./secondary_toolbar",
  "./toolbar",
  "./viewer_compatibility",
  "./view_history"

],function(
  pdfjsLib,
  PDFJSDev,

  ui_utils,
  app_options,

  pdf_cursor_tools,
  pdf_rendering_queue,
  overlay_manager,
  password_prompt,
  pdf_attachment_viewer,
  pdf_document_properties,
  pdf_find_bar,
  pdf_find_controller,
  pdf_history,
  pdf_layer_viewer,
  pdf_link_service,
  pdf_outline_viewer,
  pdf_presentation_mode,
  pdf_sidebar,
  pdf_sidebar_resizer,
  pdf_thumbnail_viewer,
  pdf_viewer,
  secondary_toolbar,
  toolbar,
  viewer_compatibility,
  view_history

  ){

  /* Copyright 2012 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
  /* globals PDFBug, Stats */



  const {
    animationStarted,
    AutoPrintRegExp,
    DEFAULT_SCALE_VALUE,
    EventBus,
    getActiveOrFocusedElement,
    getPDFFileNameFromURL,
    isValidRotation,
    isValidScrollMode,
    isValidSpreadMode,
    MAX_SCALE,
    MIN_SCALE,
    noContextMenuHandler,
    normalizeWheelEventDirection,
    parseQueryString,
    ProgressBar,
    RendererType,
    ScrollMode,
    SidebarView,
    SpreadMode,
    TextLayerMode,
  } = ui_utils;



  const { AppOptions, OptionKind } = app_options;
  const {
    build,
    createPromiseCapability,
    getDocument,
    getFilenameFromUrl,
    GlobalWorkerOptions,
    InvalidPDFException,
    LinkTarget,
    loadScript,
    MissingPDFException,
    OPS,
    PDFWorker,
    PermissionFlag,
    shadow,
    UnexpectedResponseException,
    UNSUPPORTED_FEATURES,
    version,
  } = pdfjsLib;


  const { CursorTool, PDFCursorTools } = pdf_cursor_tools;
  const { PDFRenderingQueue, RenderingStates } = pdf_rendering_queue;
  const { OverlayManager } = overlay_manager;
  const { PasswordPrompt } = password_prompt;
  const { PDFAttachmentViewer } = pdf_attachment_viewer;
  const { PDFDocumentProperties } = pdf_document_properties;
  const { PDFFindBar } = pdf_find_bar;
  const { PDFFindController } = pdf_find_controller;
  const { PDFHistory } = pdf_history;
  const { PDFLayerViewer } = pdf_layer_viewer;
  const { PDFLinkService } = pdf_link_service;
  const { PDFOutlineViewer } = pdf_outline_viewer;
  const { PDFPresentationMode } = pdf_presentation_mode;
  const { PDFSidebar } = pdf_sidebar;
  const { PDFSidebarResizer } = pdf_sidebar_resizer;
  const { PDFThumbnailViewer } = pdf_thumbnail_viewer;
  const { PDFViewer } = pdf_viewer;
  const { SecondaryToolbar } = secondary_toolbar;
  const { Toolbar } = toolbar;
  const { viewerCompatibilityParams } = viewer_compatibility;
  const { ViewHistory } = view_history;

  const DEFAULT_SCALE_DELTA = 1.1;
  const DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000; // ms
  const FORCE_PAGES_LOADED_TIMEOUT = 10000; // ms
  const WHEEL_ZOOM_DISABLED_TIMEOUT = 1000; // ms
  const ENABLE_PERMISSIONS_CLASS = "enablePermissions";

  const ViewOnLoad = {
    UNKNOWN: -1,
    PREVIOUS: 0, // Default value.
    INITIAL: 1,
  };

  const ViewerCssTheme = {
    AUTOMATIC: 0, // Default value.
    LIGHT: 1,
    DARK: 2,
  };

  // Keep these in sync with mozilla-central's Histograms.json.
  const KNOWN_VERSIONS = [
    "1.0",
    "1.1",
    "1.2",
    "1.3",
    "1.4",
    "1.5",
    "1.6",
    "1.7",
    "1.8",
    "1.9",
    "2.0",
    "2.1",
    "2.2",
    "2.3",
  ];
  // Keep these in sync with mozilla-central's Histograms.json.
  const KNOWN_GENERATORS = [
    "acrobat distiller",
    "acrobat pdfwriter",
    "adobe livecycle",
    "adobe pdf library",
    "adobe photoshop",
    "ghostscript",
    "tcpdf",
    "cairo",
    "dvipdfm",
    "dvips",
    "pdftex",
    "pdfkit",
    "itext",
    "prince",
    "quarkxpress",
    "mac os x",
    "microsoft",
    "openoffice",
    "oracle",
    "luradocument",
    "pdf-xchange",
    "antenna house",
    "aspose.cells",
    "fpdf",
  ];

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
      return shadow(this, "supportsIntegratedFind", false);
    }

    static get supportsDocumentFonts() {
      return shadow(this, "supportsDocumentFonts", true);
    }

    static get supportedMouseWheelZoomModifierKeys() {
      return shadow(this, "supportedMouseWheelZoomModifierKeys", {
        ctrlKey: true,
        metaKey: true,
      });
    }

    static get isInAutomation() {
      return shadow(this, "isInAutomation", false);
    }
  }

  const PDFViewerApplication = {
    initialBookmark: document.location.hash.substring(1),
    _initializedCapability: createPromiseCapability(),
    fellback: false,
    appConfig: null,
    pdfDocument: null,
    pdfLoadingTask: null,
    printService: null,
    /** @type {PDFViewer} */
    pdfViewer: null,
    /** @type {PDFThumbnailViewer} */
    pdfThumbnailViewer: null,
    /** @type {PDFRenderingQueue} */
    pdfRenderingQueue: null,
    /** @type {PDFPresentationMode} */
    pdfPresentationMode: null,
    /** @type {PDFDocumentProperties} */
    pdfDocumentProperties: null,
    /** @type {PDFLinkService} */
    pdfLinkService: null,
    /** @type {PDFHistory} */
    pdfHistory: null,
    /** @type {PDFSidebar} */
    pdfSidebar: null,
    /** @type {PDFSidebarResizer} */
    pdfSidebarResizer: null,
    /** @type {PDFOutlineViewer} */
    pdfOutlineViewer: null,
    /** @type {PDFAttachmentViewer} */
    pdfAttachmentViewer: null,
    /** @type {PDFLayerViewer} */
    pdfLayerViewer: null,
    /** @type {PDFCursorTools} */
    pdfCursorTools: null,
    /** @type {ViewHistory} */
    store: null,
    /** @type {DownloadManager} */
    downloadManager: null,
    /** @type {OverlayManager} */
    overlayManager: null,
    /** @type {Preferences} */
    preferences: null,
    /** @type {Toolbar} */
    toolbar: null,
    /** @type {SecondaryToolbar} */
    secondaryToolbar: null,
    /** @type {EventBus} */
    eventBus: null,
    /** @type {IL10n} */
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

    // Called once when the document is loaded.
    async initialize(appConfig) {
      this.preferences = this.externalServices.createPreferences();
      this.appConfig = appConfig;

      await this._readPreferences();
      await this._parseHashParameters();
      this._forceCssTheme();
      await this._initializeL10n();

      if (
        this.isViewerEmbedded &&
        AppOptions.get("externalLinkTarget") === LinkTarget.NONE
      ) {
        // Prevent external links from "replacing" the viewer,
        // when it's embedded in e.g. an <iframe> or an <object>.
        AppOptions.set("externalLinkTarget", LinkTarget.TOP);
      }
      await this._initializeViewerComponents();

      // Bind the various event handlers *after* the viewer has been
      // initialized, to prevent errors if an event arrives too soon.
      this.bindEvents();
      this.bindWindowEvents();

      // We can start UI localization now.
      const appContainer = appConfig.appContainer || document.documentElement;
      this.l10n.translate(appContainer).then(() => {
        // Dispatch the 'localized' event on the `eventBus` once the viewer
        // has been fully initialized and translated.
        this.eventBus.dispatch("localized", { source: this });
      });

      this._initializedCapability.resolve();
    },

    /**
     * @private
     */
    async _readPreferences() {
      if (
        (typeof PDFJSDev === "undefined" ||
          PDFJSDev.test("!PRODUCTION || GENERIC")) &&
        AppOptions.get("disablePreferences")
      ) {
        // Give custom implementations of the default viewer a simpler way to
        // opt-out of having the `Preferences` override existing `AppOptions`.
        return;
      }
      try {
        AppOptions.setAll(await this.preferences.getAll());
      } catch (reason) {
        ///console.error(`_readPreferences: "${reason?.message}".`);  // lwf
        console.error(`_readPreferences: "${reason && reason.message}".`); 
      }
    },

    /**
     * Potentially parse special debugging flags in the hash section of the URL.
     * @private
     */
    async _parseHashParameters() {
      if (!AppOptions.get("pdfBugEnabled")) {
        return undefined;
      }
      const hash = document.location.hash.substring(1);
      if (!hash) {
        return undefined;
      }
      const hashParams = parseQueryString(hash),
        waitOn = [];

      if ("disableworker" in hashParams && hashParams.disableworker === "true") {
        waitOn.push(loadFakeWorker());
      }
      if ("disablerange" in hashParams) {
        AppOptions.set("disableRange", hashParams.disablerange === "true");
      }
      if ("disablestream" in hashParams) {
        AppOptions.set("disableStream", hashParams.disablestream === "true");
      }
      if ("disableautofetch" in hashParams) {
        AppOptions.set(
          "disableAutoFetch",
          hashParams.disableautofetch === "true"
        );
      }
      if ("disablefontface" in hashParams) {
        AppOptions.set("disableFontFace", hashParams.disablefontface === "true");
      }
      if ("disablehistory" in hashParams) {
        AppOptions.set("disableHistory", hashParams.disablehistory === "true");
      }
      if ("webgl" in hashParams) {
        AppOptions.set("enableWebGL", hashParams.webgl === "true");
      }
      if ("verbosity" in hashParams) {
        AppOptions.set("verbosity", hashParams.verbosity | 0);
      }
      if ("textlayer" in hashParams) {
        switch (hashParams.textlayer) {
          case "off":
            AppOptions.set("textLayerMode", TextLayerMode.DISABLE);
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
        AppOptions.set("pdfBug", true);
        AppOptions.set("fontExtraProperties", true);

        const enabled = hashParams.pdfbug.split(",");
        waitOn.push(loadAndEnablePDFBug(enabled));
      }
      // It is not possible to change locale for the (various) extension builds.
      if (
        (typeof PDFJSDev === "undefined" ||
          PDFJSDev.test("!PRODUCTION || GENERIC")) &&
        "locale" in hashParams
      ) {
        AppOptions.set("locale", hashParams.locale);
      }

      if (waitOn.length === 0) {
        return undefined;
      }
      return Promise.all(waitOn).catch(reason => {
        console.error(`_parseHashParameters: "${reason.message}".`);
      });
    },

    /**
     * @private
     */
    async _initializeL10n() {
      this.l10n = this.externalServices.createL10n(
        typeof PDFJSDev === "undefined" || PDFJSDev.test("!PRODUCTION || GENERIC")
          ? { locale: AppOptions.get("locale") }
          : null
      );
      const dir = await this.l10n.getDirection();
      document.getElementsByTagName("html")[0].dir = dir;
    },

    /**
     * @private
     */
    _forceCssTheme() {
      const cssTheme = AppOptions.get("viewerCssTheme");
      if (
        cssTheme === ViewerCssTheme.AUTOMATIC ||
        !Object.values(ViewerCssTheme).includes(cssTheme)
      ) {
        return;
      }
      try {
        const styleSheet = document.styleSheets[0];
        //const cssRules = styleSheet?.cssRules || []; // lwf
        const cssRules = styleSheet && styleSheet.cssRules || [];
        for (let i = 0, ii = cssRules.length; i < ii; i++) {
          const rule = cssRules[i];
          if (
            rule instanceof CSSMediaRule &&
            ///rule.media?.[0] === "(prefers-color-scheme: dark)" // lwf
            rule.media && rule.media[0] === "(prefers-color-scheme: dark)"
          ) {
            if (cssTheme === ViewerCssTheme.LIGHT) {
              styleSheet.deleteRule(i);
              return;
            }
            // cssTheme === ViewerCssTheme.DARK
            const darkRules = /^@media \(prefers-color-scheme: dark\) {\n\s*([\w\s-.,:;/\\{}()]+)\n}$/.exec(
              rule.cssText
            );
            ///if (darkRules?.[1]) { // lwf
            if (darkRules && darkRules[1]) {
              styleSheet.deleteRule(i);
              styleSheet.insertRule(darkRules[1], i);
            }
            return;
          }
        }
      } catch (reason) {
        ///console.error(`_forceCssTheme: "${reason?.message}".`); // lwf
        console.error(`_forceCssTheme: "${reason && reason.message}".`);
      }
    },

    /**
     * @private
     */
    async _initializeViewerComponents() {
      const appConfig = this.appConfig;

      const eventBus =
        appConfig.eventBus ||
        new EventBus({ isInAutomation: this.externalServices.isInAutomation });
      this.eventBus = eventBus;

      this.overlayManager = new OverlayManager();

      const pdfRenderingQueue = new PDFRenderingQueue();
      pdfRenderingQueue.onIdle = this.cleanup.bind(this);
      this.pdfRenderingQueue = pdfRenderingQueue;

      const pdfLinkService = new PDFLinkService({
        eventBus,
        externalLinkTarget: AppOptions.get("externalLinkTarget"),
        externalLinkRel: AppOptions.get("externalLinkRel"),
        ignoreDestinationZoom: AppOptions.get("ignoreDestinationZoom"),
      });
      this.pdfLinkService = pdfLinkService;

      const downloadManager = this.externalServices.createDownloadManager();
      this.downloadManager = downloadManager;

      const findController = new PDFFindController({
        linkService: pdfLinkService,
        eventBus,
      });
      this.findController = findController;

      const container = appConfig.mainContainer;
      const viewer = appConfig.viewerContainer;
      this.pdfViewer = new PDFViewer({
        container,
        viewer,
        eventBus,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService,
        downloadManager,
        findController,
        renderer: AppOptions.get("renderer"),
        enableWebGL: AppOptions.get("enableWebGL"),
        l10n: this.l10n,
        textLayerMode: AppOptions.get("textLayerMode"),
        imageResourcesPath: AppOptions.get("imageResourcesPath"),
        renderInteractiveForms: AppOptions.get("renderInteractiveForms"),
        enablePrintAutoRotate: AppOptions.get("enablePrintAutoRotate"),
        useOnlyCssZoom: AppOptions.get("useOnlyCssZoom"),
        maxCanvasPixels: AppOptions.get("maxCanvasPixels"),
        enableScripting: AppOptions.get("enableScripting"),
        mouseState: this._mouseState,
      });
      pdfRenderingQueue.setViewer(this.pdfViewer);
      pdfLinkService.setViewer(this.pdfViewer);

      this.pdfThumbnailViewer = new PDFThumbnailViewer({
        container: appConfig.sidebar.thumbnailView,
        eventBus,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService,
        l10n: this.l10n,
      });
      pdfRenderingQueue.setThumbnailViewer(this.pdfThumbnailViewer);

      this.pdfHistory = new PDFHistory({
        linkService: pdfLinkService,
        eventBus,
      });
      pdfLinkService.setHistory(this.pdfHistory);

      if (!this.supportsIntegratedFind) {
        this.findBar = new PDFFindBar(appConfig.findBar, eventBus, this.l10n);
      }

      this.pdfDocumentProperties = new PDFDocumentProperties(
        appConfig.documentProperties,
        this.overlayManager,
        eventBus,
        this.l10n
      );

      this.pdfCursorTools = new PDFCursorTools({
        container,
        eventBus,
        cursorToolOnLoad: AppOptions.get("cursorToolOnLoad"),
      });

      this.toolbar = new Toolbar(appConfig.toolbar, eventBus, this.l10n);

      this.secondaryToolbar = new SecondaryToolbar(
        appConfig.secondaryToolbar,
        container,
        eventBus
      );

      if (this.supportsFullscreen) {
        this.pdfPresentationMode = new PDFPresentationMode({
          container,
          pdfViewer: this.pdfViewer,
          eventBus,
          contextMenuItems: appConfig.fullscreen,
        });
      }

      this.passwordPrompt = new PasswordPrompt(
        appConfig.passwordOverlay,
        this.overlayManager,
        this.l10n
      );

      this.pdfOutlineViewer = new PDFOutlineViewer({
        container: appConfig.sidebar.outlineView,
        eventBus,
        linkService: pdfLinkService,
      });

      this.pdfAttachmentViewer = new PDFAttachmentViewer({
        container: appConfig.sidebar.attachmentsView,
        eventBus,
        downloadManager,
      });

      this.pdfLayerViewer = new PDFLayerViewer({
        container: appConfig.sidebar.layersView,
        eventBus,
        l10n: this.l10n,
      });

      this.pdfSidebar = new PDFSidebar({
        elements: appConfig.sidebar,
        pdfViewer: this.pdfViewer,
        pdfThumbnailViewer: this.pdfThumbnailViewer,
        eventBus,
        l10n: this.l10n,
      });
      this.pdfSidebar.onToggled = this.forceRendering.bind(this);

      this.pdfSidebarResizer = new PDFSidebarResizer(
        appConfig.sidebarResizer,
        eventBus,
        this.l10n
      );
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
        newScale = Math.min(MAX_SCALE, newScale);
      } while (--ticks > 0 && newScale < MAX_SCALE);
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
        newScale = Math.max(MIN_SCALE, newScale);
      } while (--ticks > 0 && newScale > MIN_SCALE);
      this.pdfViewer.currentScaleValue = newScale;
    },

    zoomReset() {
      if (this.pdfViewer.isInPresentationMode) {
        return;
      }
      this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
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
      if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("MOZCENTRAL")) {
        support =
          document.fullscreenEnabled === true ||
          document.mozFullScreenEnabled === true;
      } else {
        const doc = document.documentElement;
        support = !!(
          doc.requestFullscreen ||
          doc.mozRequestFullScreen ||
          doc.webkitRequestFullScreen
        );

        if (
          document.fullscreenEnabled === false ||
          document.mozFullScreenEnabled === false ||
          document.webkitFullscreenEnabled === false
        ) {
          support = false;
        }
      }
      return shadow(this, "supportsFullscreen", support);
    },

    get supportsIntegratedFind() {
      return this.externalServices.supportsIntegratedFind;
    },

    get supportsDocumentFonts() {
      return this.externalServices.supportsDocumentFonts;
    },

    get loadingBar() {
      const bar = new ProgressBar("#loadingBar");
      return shadow(this, "loadingBar", bar);
    },

    get supportedMouseWheelZoomModifierKeys() {
      return this.externalServices.supportedMouseWheelZoomModifierKeys;
    },

    initPassiveLoading() {
      if (
        typeof PDFJSDev === "undefined" ||
        !PDFJSDev.test("MOZCENTRAL || CHROME")
      ) {
        throw new Error("Not implemented: initPassiveLoading");
      }
      this.externalServices.initPassiveLoading({
        onOpenWithTransport(url, length, transport) {
          PDFViewerApplication.open(url, { length, range: transport });
        },
        onOpenWithData(data) {
          PDFViewerApplication.open(data);
        },
        onOpenWithURL(url, length, originalUrl) {
          let file = url,
            args = null;
          if (length !== undefined) {
            args = { length };
          }
          if (originalUrl !== undefined) {
            file = { url, originalUrl };
          }
          PDFViewerApplication.open(file, args);
        },
        onError(err) {
          PDFViewerApplication.l10n
            .get(
              "loading_error",
              null,
              "An error occurred while loading the PDF."
            )
            .then(msg => {
              PDFViewerApplication.error(msg, err);
            });
        },
        onProgress(loaded, total) {
          PDFViewerApplication.progress(loaded / total);
        },
      });
    },

    setTitleUsingUrl(url = "") {
      this.url = url;
      this.baseUrl = url.split("#")[0];
      let title = getPDFFileNameFromURL(url, "");
      if (!title) {
        try {
          title = decodeURIComponent(getFilenameFromUrl(url)) || url;
        } catch (ex) {
          // decodeURIComponent may throw URIError,
          // fall back to using the unprocessed url in that case
          title = url;
        }
      }
      this.setTitle(title);
    },

    setTitle(title) {
      if (this.isViewerEmbedded) {
        // Embedded PDF viewers should not be changing their parent page's title.
        return;
      }
      document.title = title;
    },

    get _docFilename() {
      // Use `this.url` instead of `this.baseUrl` to perform filename detection
      // based on the reference fragment as ultimate fallback if needed.
      return this._contentDispositionFilename || getPDFFileNameFromURL(this.url);
    },

    /**
     * @private
     */
    _cancelIdleCallbacks() {
      if (!this._idleCallbacks.size) {
        return;
      }
      for (const callback of this._idleCallbacks) {
        window.cancelIdleCallback(callback);
      }
      this._idleCallbacks.clear();
    },

    /**
     * @private
     */
    async _destroyScriptingInstance() {
      if (!this._scriptingInstance) {
        return;
      }
      const { scripting, internalEvents, domEvents } = this._scriptingInstance;
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

    /**
     * Closes opened PDF document.
     * @returns {Promise} - Returns the promise, which is resolved when all
     *                      destruction is completed.
     */
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

    /**
     * Opens PDF document specified by URL or array with additional arguments.
     * @param {string|TypedArray|ArrayBuffer} file - PDF location or binary data.
     * @param {Object} [args] - Additional arguments for the getDocument call,
     *                          e.g. HTTP headers ('httpHeaders') or alternative
     *                          data transport ('range').
     * @returns {Promise} - Returns the promise, which is resolved when document
     *                      is opened.
     */
    async open(file, args) {
      if (this.pdfLoadingTask) {
        // We need to destroy already opened document.
        await this.close();
      }
      // Set the necessary global worker parameters, using the available options.
      const workerParameters = AppOptions.getAll(OptionKind.WORKER);
      for (const key in workerParameters) {
        GlobalWorkerOptions[key] = workerParameters[key];
      }

      const parameters = Object.create(null);
      if (typeof file === "string") {
        // URL
        this.setTitleUsingUrl(file);
        parameters.url = file;
      } else if (file && "byteLength" in file) {
        // ArrayBuffer
        parameters.data = file;
      } else if (file.url && file.originalUrl) {
        this.setTitleUsingUrl(file.originalUrl);
        parameters.url = file.url;
      }
      // Set the necessary API parameters, using the available options.
      const apiParameters = AppOptions.getAll(OptionKind.API);
      for (const key in apiParameters) {
        let value = apiParameters[key];

        if (key === "docBaseUrl" && !value) {
          if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION")) {
            value = document.URL.split("#")[0];
          } else if (PDFJSDev.test("MOZCENTRAL || CHROME")) {
            value = this.baseUrl;
          }
        }
        parameters[key] = value;
      }
      // Finally, update the API parameters with the arguments (if they exist).
      if (args) {
        for (const key in args) {
          parameters[key] = args[key];
        }
      }

      const loadingTask = getDocument(parameters);
      this.pdfLoadingTask = loadingTask;

      loadingTask.onPassword = (updateCallback, reason) => {
        this.pdfLinkService.externalLinkEnabled = false;
        this.passwordPrompt.setUpdateCallback(updateCallback, reason);
        this.passwordPrompt.open();
      };

      loadingTask.onProgress = ({ loaded, total }) => {
        this.progress(loaded / total);
      };

      // Listen for unsupported features to trigger the fallback UI.
      loadingTask.onUnsupportedFeature = this.fallback.bind(this);

      return loadingTask.promise.then(
        pdfDocument => {
          this.load(pdfDocument);
        },
        exception => {
          if (loadingTask !== this.pdfLoadingTask) {
            return undefined; // Ignore errors for previously opened PDF files.
          }

          ///const message = exception?.message; // lwf
          const message = exception && exception.message;
          let loadingErrorMessage;
          if (exception instanceof InvalidPDFException) {
            // change error message also for other builds
            loadingErrorMessage = this.l10n.get(
              "invalid_file_error",
              null,
              "Invalid or corrupted PDF file."
            );
          } else if (exception instanceof MissingPDFException) {
            // special message for missing PDF's
            loadingErrorMessage = this.l10n.get(
              "missing_file_error",
              null,
              "Missing PDF file."
            );
          } else if (exception instanceof UnexpectedResponseException) {
            loadingErrorMessage = this.l10n.get(
              "unexpected_response_error",
              null,
              "Unexpected server response."
            );
          } else {
            loadingErrorMessage = this.l10n.get(
              "loading_error",
              null,
              "An error occurred while loading the PDF."
            );
          }

          return loadingErrorMessage.then(msg => {
            this.error(msg, { message });
            throw exception;
          });
        }
      );
    },

    download({ sourceEventType = "download" } = {}) {
      function downloadByUrl() {
        downloadManager.downloadUrl(url, filename);
      }

      const downloadManager = this.downloadManager,
        url = this.baseUrl,
        filename = this._docFilename;

      // When the PDF document isn't ready, or the PDF file is still downloading,
      // simply download using the URL.
      if (!this.pdfDocument || !this.downloadComplete) {
        downloadByUrl();
        return;
      }

      this.pdfDocument
        .getData()
        .then(function (data) {
          const blob = new Blob([data], { type: "application/pdf" });
          downloadManager.download(blob, url, filename, sourceEventType);
        })
        .catch(downloadByUrl); // Error occurred, try downloading with the URL.
    },

    async save({ sourceEventType = "download" } = {}) {
      if (this._saveInProgress) {
        return;
      }

      const downloadManager = this.downloadManager,
        url = this.baseUrl,
        filename = this._docFilename;

      // When the PDF document isn't ready, or the PDF file is still downloading,
      // simply download using the URL.
      if (!this.pdfDocument || !this.downloadComplete) {
        this.download({ sourceEventType });
        return;
      }
      this._saveInProgress = true;

      ///await this._scriptingInstance?.scripting.dispatchEventInSandbox({ // lwf
      await this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({
        id: "doc",
        name: "WillSave",
      });

      this.pdfDocument
        .saveDocument(this.pdfDocument.annotationStorage)
        .then(data => {
          const blob = new Blob([data], { type: "application/pdf" });
          downloadManager.download(blob, url, filename, sourceEventType);
        })
        .catch(() => {
          this.download({ sourceEventType });
        })
        .finally(async () => {
          ///await this._scriptingInstance?.scripting.dispatchEventInSandbox({ // lwf
          await this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({
            id: "doc",
            name: "DidSave",
          });

          this._saveInProgress = false;
        });
    },

    downloadOrSave(options) {
      ///if (this.pdfDocument?.annotationStorage.size > 0) { // lwf
      if (this.pdfDocument && this.pdfDocument.annotationStorage.size > 0) {
        this.save(options);
      } else {
        this.download(options);
      }
    },

    /**
     * For PDF documents that contain e.g. forms and javaScript, we should only
     * trigger the fallback bar once the user has interacted with the page.
     * @private
     */
    _delayedFallback(featureId) {
      // Ensure that telemetry is always reported, since it's not guaranteed
      // that the fallback bar will be shown (depends on user interaction).
      this.externalServices.reportTelemetry({
        type: "unsupportedFeature",
        featureId,
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
        featureId,
      });

      // Only trigger the fallback once so we don't spam the user with messages
      // for one PDF.
      if (this.fellback) {
        return;
      }
      this.fellback = true;
      this.externalServices
        .fallback({
          featureId,
          url: this.baseUrl,
        })
        .then(download => {
          if (!download) {
            return;
          }
          this.download({ sourceEventType: "download" });
        });
    },

    /**
     * Show the error box.
     * @param {string} message - A message that is human readable.
     * @param {Object} [moreInfo] - Further information about the error that is
     *                              more technical.  Should have a 'message' and
     *                              optionally a 'stack' property.
     */
    error(message, moreInfo) {
      const moreInfoText = [
        this.l10n.get(
          "error_version_info",
          { version: version || "?", build: build || "?" },
          "PDF.js v{{version}} (build: {{build}})"
        ),
      ];
      if (moreInfo) {
        moreInfoText.push(
          this.l10n.get(
            "error_message",
            { message: moreInfo.message },
            "Message: {{message}}"
          )
        );
        if (moreInfo.stack) {
          moreInfoText.push(
            this.l10n.get(
              "error_stack",
              { stack: moreInfo.stack },
              "Stack: {{stack}}"
            )
          );
        } else {
          if (moreInfo.filename) {
            moreInfoText.push(
              this.l10n.get(
                "error_file",
                { file: moreInfo.filename },
                "File: {{file}}"
              )
            );
          }
          if (moreInfo.lineNumber) {
            moreInfoText.push(
              this.l10n.get(
                "error_line",
                { line: moreInfo.lineNumber },
                "Line: {{line}}"
              )
            );
          }
        }
      }

      if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("MOZCENTRAL")) {
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
        moreInfoButton.oncontextmenu = noContextMenuHandler;
        lessInfoButton.oncontextmenu = noContextMenuHandler;
        closeButton.oncontextmenu = noContextMenuHandler;
        moreInfoButton.removeAttribute("hidden");
        lessInfoButton.setAttribute("hidden", "true");
        Promise.all(moreInfoText).then(parts => {
          errorMoreInfo.value = parts.join("\n");
        });
      } else {
        Promise.all(moreInfoText).then(parts => {
          console.error(message + "\n" + parts.join("\n"));
        });
        this.fallback();
      }
    },

    progress(level) {
      if (this.downloadComplete) {
        // Don't accidentally show the loading bar again when the entire file has
        // already been fetched (only an issue when disableAutoFetch is enabled).
        return;
      }
      const percent = Math.round(level * 100);
      // When we transition from full request to range requests, it's possible
      // that we discard some of the loaded data. This can cause the loading
      // bar to move backwards. So prevent this by only updating the bar if it
      // increases.
      if (percent > this.loadingBar.percent || isNaN(percent)) {
        this.loadingBar.percent = percent;

        // When disableAutoFetch is enabled, it's not uncommon for the entire file
        // to never be fetched (depends on e.g. the file structure). In this case
        // the loading bar will not be completely filled, nor will it be hidden.
        // To prevent displaying a partially filled loading bar permanently, we
        // hide it when no data has been loaded during a certain amount of time.
        const disableAutoFetch = this.pdfDocument
          ? this.pdfDocument.loadingParams.disableAutoFetch
          : AppOptions.get("disableAutoFetch");

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

      pdfDocument.getDownloadInfo().then(({ length }) => {
        this._contentLength = length; // Ensure that the correct length is used.
        this.downloadComplete = true;
        this.loadingBar.hide();

        firstPagePromise.then(() => {
          this.eventBus.dispatch("documentloaded", { source: this });
        });
      });

      // Since the `setInitialView` call below depends on this being resolved,
      // fetch it early to avoid delaying initial rendering of the PDF document.
      const pageLayoutPromise = pdfDocument.getPageLayout().catch(function () {
        /* Avoid breaking initial rendering; ignoring errors. */
      });
      const pageModePromise = pdfDocument.getPageMode().catch(function () {
        /* Avoid breaking initial rendering; ignoring errors. */
      });
      const openActionPromise = pdfDocument.getOpenAction().catch(function () {
        /* Avoid breaking initial rendering; ignoring errors. */
      });

      this.toolbar.setPagesCount(pdfDocument.numPages, false);
      this.secondaryToolbar.setPagesCount(pdfDocument.numPages);

      let baseDocumentUrl;
      if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
        baseDocumentUrl = null;
      } else if (PDFJSDev.test("MOZCENTRAL")) {
        baseDocumentUrl = this.baseUrl;
      } else if (PDFJSDev.test("CHROME")) {
        baseDocumentUrl = location.href.split("#")[0];
      }
      this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
      this.pdfDocumentProperties.setDocument(pdfDocument, this.url);

      const pdfViewer = this.pdfViewer;
      pdfViewer.setDocument(pdfDocument);
      const { firstPagePromise, onePageRendered, pagesPromise } = pdfViewer;

      const pdfThumbnailViewer = this.pdfThumbnailViewer;
      pdfThumbnailViewer.setDocument(pdfDocument);

      const storedPromise = (this.store = new ViewHistory(
        pdfDocument.fingerprint
      ))
        .getMultiple({
          page: null,
          zoom: DEFAULT_SCALE_VALUE,
          scrollLeft: "0",
          scrollTop: "0",
          rotation: null,
          sidebarView: SidebarView.UNKNOWN,
          scrollMode: ScrollMode.UNKNOWN,
          spreadMode: SpreadMode.UNKNOWN,
        })
        .catch(() => {
          /* Unable to read from storage; ignoring errors. */
          return Object.create(null);
        });

      firstPagePromise.then(pdfPage => {
        this.loadingBar.setWidth(this.appConfig.viewerContainer);
        this._initializeAnnotationStorageCallbacks(pdfDocument);

        Promise.all([
          animationStarted,
          storedPromise,
          pageLayoutPromise,
          pageModePromise,
          openActionPromise,
        ])
          .then(async ([timeStamp, stored, pageLayout, pageMode, openAction]) => {
            const viewOnLoad = AppOptions.get("viewOnLoad");

            this._initializePdfHistory({
              fingerprint: pdfDocument.fingerprint,
              viewOnLoad,
              initialDest: openAction && openAction.dest,
            });
            const initialBookmark = this.initialBookmark;

            // Initialize the default values, from user preferences.
            const zoom = AppOptions.get("defaultZoomValue");
            let hash = zoom ? `zoom=${zoom}` : null;

            let rotation = null;
            let sidebarView = AppOptions.get("sidebarViewOnLoad");
            let scrollMode = AppOptions.get("scrollModeOnLoad");
            let spreadMode = AppOptions.get("spreadModeOnLoad");

            if (stored.page && viewOnLoad !== ViewOnLoad.INITIAL) {
              hash =
                `page=${stored.page}&zoom=${zoom || stored.zoom},` +
                `${stored.scrollLeft},${stored.scrollTop}`;

              rotation = parseInt(stored.rotation, 10);
              // Always let user preference take precedence over the view history.
              if (sidebarView === SidebarView.UNKNOWN) {
                sidebarView = stored.sidebarView | 0;
              }
              if (scrollMode === ScrollMode.UNKNOWN) {
                scrollMode = stored.scrollMode | 0;
              }
              if (spreadMode === SpreadMode.UNKNOWN) {
                spreadMode = stored.spreadMode | 0;
              }
            }
            // Always let the user preference/view history take precedence.
            if (pageMode && sidebarView === SidebarView.UNKNOWN) {
              sidebarView = apiPageModeToSidebarView(pageMode);
            }
            if (pageLayout && spreadMode === SpreadMode.UNKNOWN) {
              spreadMode = apiPageLayoutToSpreadMode(pageLayout);
            }

            this.setInitialView(hash, {
              rotation,
              sidebarView,
              scrollMode,
              spreadMode,
            });
            this.eventBus.dispatch("documentinit", { source: this });
            // Make all navigation keys work on document load,
            // unless the viewer is embedded in a web page.
            if (!this.isViewerEmbedded) {
              pdfViewer.focus();
            }

            // Currently only the "copy"-permission is supported, hence we delay
            // the `getPermissions` API call until *after* rendering has started.
            this._initializePermissions(pdfDocument);

            // For documents with different page sizes, once all pages are
            // resolved, ensure that the correct location becomes visible on load.
            // (To reduce the risk, in very large and/or slow loading documents,
            //  that the location changes *after* the user has started interacting
            //  with the viewer, wait for either `pagesPromise` or a timeout.)
            await Promise.race([
              pagesPromise,
              new Promise(resolve => {
                setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT);
              }),
            ]);
            if (!initialBookmark && !hash) {
              return;
            }
            if (pdfViewer.hasEqualPageSizes) {
              return;
            }
            this.initialBookmark = initialBookmark;

            // eslint-disable-next-line no-self-assign
            pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;
            // Re-apply the initial document location.
            this.setInitialView(hash);
          })
          .catch(() => {
            // Ensure that the document is always completely initialized,
            // even if there are any errors thrown above.
            this.setInitialView();
          })
          .then(function () {
            // At this point, rendering of the initial page(s) should always have
            // started (and may even have completed).
            // To prevent any future issues, e.g. the document being completely
            // blank on load, always trigger rendering here.
            pdfViewer.update();
          });
      });

      pagesPromise.then(() => {
        this._initializeAutoPrint(pdfDocument, openActionPromise);
      });

      onePageRendered.then(() => {
        pdfDocument.getOutline().then(outline => {
          this.pdfOutlineViewer.render({ outline, pdfDocument });
        });
        pdfDocument.getAttachments().then(attachments => {
          this.pdfAttachmentViewer.render({ attachments });
        });
        // Ensure that the layers accurately reflects the current state in the
        // viewer itself, rather than the default state provided by the API.
        pdfViewer.optionalContentConfigPromise.then(optionalContentConfig => {
          this.pdfLayerViewer.render({ optionalContentConfig, pdfDocument });
        });
        if ("requestIdleCallback" in window) {
          const callback = window.requestIdleCallback(
            () => {
              this._collectTelemetry(pdfDocument);
              this._idleCallbacks.delete(callback);
            },
            { timeout: 1000 }
          );
          this._idleCallbacks.add(callback);
        }
        this._initializeJavaScript(pdfDocument);
      });

      this._initializePageLabels(pdfDocument);
      this._initializeMetadata(pdfDocument);
    },

    /**
     * @private
     */
    async _initializeJavaScript(pdfDocument) {
      if (!AppOptions.get("enableScripting")) {
        return;
      }
      const [objects, calculationOrder, docActions] = await Promise.all([
        pdfDocument.getFieldObjects(),
        pdfDocument.getCalculationOrderIds(),
        pdfDocument.getJSActions(),
      ]);

      if (!objects && !docActions) {
        // No FieldObjects or JavaScript actions were found in the document.
        return;
      }
      if (pdfDocument !== this.pdfDocument) {
        return; // The document was closed while the data resolved.
      }
      const scripting = this.externalServices.createScripting(
        typeof PDFJSDev === "undefined" ||
          PDFJSDev.test("!PRODUCTION || GENERIC || CHROME")
          ? { sandboxBundleSrc: AppOptions.get("sandboxBundleSrc") }
          : null
      );
      // Store a reference to the current scripting-instance, to allow destruction
      // of the sandbox and removal of the event listeners at document closing.
      const internalEvents = new Map(),
        domEvents = new Map();
      this._scriptingInstance = {
        scripting,
        ready: false,
        internalEvents,
        domEvents,
      };

      if (!this.documentInfo) {
        // It should be *extremely* rare for metadata to not have been resolved
        // when this code runs, but ensure that we handle that case here.
        await new Promise(resolve => {
          this.eventBus._on(
            "metadataloaded",
            evt => {
              resolve();
            },
            { once: true }
          );
        });
        if (pdfDocument !== this.pdfDocument) {
          return; // The document was closed while the metadata resolved.
        }
      }
      if (!this._contentLength) {
        // Always waiting for the entire PDF document to be loaded will, most
        // likely, delay sandbox-creation too much in the general case for all
        // PDF documents which are not provided as binary data to the API.
        // Hence we'll simply have to trust that the `contentLength` (as provided
        // by the server), when it exists, is accurate enough here.
        await new Promise(resolve => {
          this.eventBus._on(
            "documentloaded",
            evt => {
              resolve();
            },
            { once: true }
          );
        });
        if (pdfDocument !== this.pdfDocument) {
          return; // The document was closed while the downloadInfo resolved.
        }
      }

      const updateFromSandbox = ({ detail }) => {
        const { id, command, value } = detail;
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
          element.dispatchEvent(new CustomEvent("updatefromsandbox", { detail }));
        } else {
          if (value !== undefined && value !== null) {
            // The element hasn't been rendered yet, use the AnnotationStorage.
            pdfDocument.annotationStorage.setValue(id, value);
          }
        }
      };
      internalEvents.set("updatefromsandbox", updateFromSandbox);

      const visitedPages = new Map();
      const pageOpen = ({ pageNumber, actionsPromise }) => {
        visitedPages.set(
          pageNumber,
          (async () => {
            // Avoid sending, and thus serializing, the `actions` data
            // when the same page is opened several times.
            let actions = null;
            if (!visitedPages.has(pageNumber)) {
              actions = await actionsPromise;

              if (pdfDocument !== this.pdfDocument) {
                return; // The document was closed while the actions resolved.
              }
            }

            ///await this._scriptingInstance?.scripting.dispatchEventInSandbox({ // lwf
            await this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({
              id: "page",
              name: "PageOpen",
              pageNumber,
              actions,
            });
          })()
        );
      };

      const pageClose = async ({ pageNumber }) => {
        const actionsPromise = visitedPages.get(pageNumber);
        if (!actionsPromise) {
          // Ensure that the "pageclose" event was preceded by a "pageopen" event.
          return;
        }
        visitedPages.set(pageNumber, null);

        // Ensure that the "pageopen" event is handled first.
        await actionsPromise;

        if (pdfDocument !== this.pdfDocument) {
          return; // The document was closed while the actions resolved.
        }

        ///await this._scriptingInstance?.scripting.dispatchEventInSandbox({ // lwf
        await this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({
          id: "page",
          name: "PageClose",
          pageNumber,
        });
      };
      internalEvents.set("pageopen", pageOpen);
      internalEvents.set("pageclose", pageClose);

      const dispatchEventInSandbox = ({ detail }) => {
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
            language: navigator.language,
          },
          docInfo: {
            ...this.documentInfo,
            baseURL: this.baseUrl,
            filesize: this._contentLength,
            filename: this._docFilename,
            ///metadata: this.metadata?.getRaw(), // lwf
            metadata: this.metadata && this.metadata.getRaw(),
            ///authors: this.metadata?.get("dc:creator"), // lwf
            authors: this.metadata && this.metadata.get("dc:creator"),
            numPages: pdfDocument.numPages,
            URL: this.url,
            actions: docActions,
          },
        });

        if (this.externalServices.isInAutomation) {
          this.eventBus.dispatch("sandboxcreated", { source: this });
        }
      } catch (error) {
        ///console.error(`_initializeJavaScript: "${error?.message}".`); // lwf
        console.error(`_initializeJavaScript: "${error && error.message}".`);

        this._destroyScriptingInstance();
        return;
      }

      await scripting.dispatchEventInSandbox({
        id: "doc",
        name: "Open",
      });
      await this.pdfViewer.initializeScriptingEvents();

      // Used together with the integration-tests, see the `scriptingReady`
      // getter, to enable awaiting full initialization of the scripting/sandbox.
      // (Defer this slightly, to make absolutely sure that everything is done.)
      Promise.resolve().then(() => {
        if (this._scriptingInstance) {
          this._scriptingInstance.ready = true;
        }
      });
    },

    /**
     * A place to fetch data for telemetry after one page is rendered and the
     * viewer is idle.
     * @private
     */
    async _collectTelemetry(pdfDocument) {
      const markInfo = await this.pdfDocument.getMarkInfo();
      if (pdfDocument !== this.pdfDocument) {
        return; // Document was closed while waiting for mark info.
      }
      ///const tagged = markInfo?.Marked || false; // lwf
      const tagged = markInfo && markInfo.Marked || false;
      this.externalServices.reportTelemetry({
        type: "tagged",
        tagged,
      });
    },

    /**
     * @private
     */
    async _initializeAutoPrint(pdfDocument, openActionPromise) {
      const [openAction, javaScript] = await Promise.all([
        openActionPromise,
        !AppOptions.get("enableScripting") ? pdfDocument.getJavaScript() : null,
      ]);

      if (pdfDocument !== this.pdfDocument) {
        return; // The document was closed while the auto print data resolved.
      }
      let triggerAutoPrint = false;

      ///if (openAction?.action === "Print") { // lwf
      if (openAction && openAction.action === "Print") {
        triggerAutoPrint = true;
      }
      if (javaScript) {
        javaScript.some(js => {
          if (!js) {
            // Don't warn/fallback for empty JavaScript actions.
            return false;
          }
          console.warn("Warning: JavaScript is not supported");
          this._delayedFallback(UNSUPPORTED_FEATURES.javaScript);
          return true;
        });

        if (!triggerAutoPrint) {
          // Hack to support auto printing.
          for (const js of javaScript) {
            if (js && AutoPrintRegExp.test(js)) {
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

    /**
     * @private
     */
    async _initializeMetadata(pdfDocument) {
      const {
        info,
        metadata,
        contentDispositionFilename,
        contentLength,
      } = await pdfDocument.getMetadata();

      if (pdfDocument !== this.pdfDocument) {
        return; // The document was closed while the metadata resolved.
      }
      this.documentInfo = info;
      this.metadata = metadata;
      this._contentDispositionFilename = contentDispositionFilename;
      //this._contentLength ??= contentLength; // See `getDownloadInfo`-call above. // lwf
      this._contentLength ||  (this._contentLength = contentLength);

      // Provides some basic debug information
      console.log(
        `PDF ${pdfDocument.fingerprint} [${info.PDFFormatVersion} ` +
          `${(info.Producer || "-").trim()} / ${(info.Creator || "-").trim()}] ` +
          `(PDF.js: ${version || "-"}` +
          `${this.pdfViewer.enableWebGL ? " [WebGL]" : ""})`
      );

      let pdfTitle;
      const infoTitle = info && info.Title;
      if (infoTitle) {
        pdfTitle = infoTitle;
      }
      const metadataTitle = metadata && metadata.get("dc:title");
      if (metadataTitle) {
        // Ghostscript can produce invalid 'dc:title' Metadata entries:
        //  - The title may be "Untitled" (fixes bug 1031612).
        //  - The title may contain incorrectly encoded characters, which thus
        //    looks broken, hence we ignore the Metadata entry when it
        //    contains characters from the Specials Unicode block
        //    (fixes bug 1605526).
        if (
          metadataTitle !== "Untitled" &&
          !/[\uFFF0-\uFFFF]/g.test(metadataTitle)
        ) {
          pdfTitle = metadataTitle;
        }
      }
      if (pdfTitle) {
        this.setTitle(
          `${pdfTitle} - ${contentDispositionFilename || document.title}`
        );
      } else if (contentDispositionFilename) {
        this.setTitle(contentDispositionFilename);
      }

      if (info.IsXFAPresent && !info.IsAcroFormPresent) {
        console.warn("Warning: XFA is not supported");
        this._delayedFallback(UNSUPPORTED_FEATURES.forms);
      } else if (
        (info.IsAcroFormPresent || info.IsXFAPresent) &&
        !this.pdfViewer.renderInteractiveForms
      ) {
        console.warn("Warning: Interactive form support is not enabled");
        this._delayedFallback(UNSUPPORTED_FEATURES.forms);
      }

      // Telemetry labels must be C++ variable friendly.
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
        formType,
      });

      this.eventBus.dispatch("metadataloaded", { source: this });
    },

    /**
     * @private
     */
    async _initializePageLabels(pdfDocument) {
      const labels = await pdfDocument.getPageLabels();

      if (pdfDocument !== this.pdfDocument) {
        return; // The document was closed while the page labels resolved.
      }
      if (!labels || AppOptions.get("disablePageLabels")) {
        return;
      }
      const numLabels = labels.length;
      if (numLabels !== this.pagesCount) {
        console.error(
          "The number of Page Labels does not match the number of pages in the document."
        );
        return;
      }
      let i = 0;
      // Ignore page labels that correspond to standard page numbering.
      while (i < numLabels && labels[i] === (i + 1).toString()) {
        i++;
      }
      if (i === numLabels) {
        return;
      }
      const { pdfViewer, pdfThumbnailViewer, toolbar } = this;

      pdfViewer.setPageLabels(labels);
      pdfThumbnailViewer.setPageLabels(labels);

      // Changing toolbar page display to use labels and we need to set
      // the label of the current page.
      toolbar.setPagesCount(numLabels, true);
      toolbar.setPageNumber(
        pdfViewer.currentPageNumber,
        pdfViewer.currentPageLabel
      );
    },

    /**
     * @private
     */
    _initializePdfHistory({ fingerprint, viewOnLoad, initialDest = null }) {
      if (this.isViewerEmbedded || AppOptions.get("disableHistory")) {
        // The browsing history is only enabled when the viewer is standalone,
        // i.e. not when it is embedded in a web page.
        return;
      }
      this.pdfHistory.initialize({
        fingerprint,
        resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
        updateUrl: AppOptions.get("historyUpdateUrl"),
      });

      if (this.pdfHistory.initialBookmark) {
        this.initialBookmark = this.pdfHistory.initialBookmark;

        this.initialRotation = this.pdfHistory.initialRotation;
      }

      // Always let the browser history/document hash take precedence.
      if (
        initialDest &&
        !this.initialBookmark &&
        viewOnLoad === ViewOnLoad.UNKNOWN
      ) {
        this.initialBookmark = JSON.stringify(initialDest);
        // TODO: Re-factor the `PDFHistory` initialization to remove this hack
        // that's currently necessary to prevent weird initial history state.
        this.pdfHistory.push({ explicitDest: initialDest, pageNumber: null });
      }
    },

    /**
     * @private
     */
    async _initializePermissions(pdfDocument) {
      const permissions = await pdfDocument.getPermissions();

      if (pdfDocument !== this.pdfDocument) {
        return; // The document was closed while the permissions resolved.
      }
      if (!permissions || !AppOptions.get("enablePermissions")) {
        return;
      }
      // Currently only the "copy"-permission is supported.
      if (!permissions.includes(PermissionFlag.COPY)) {
        this.appConfig.viewerContainer.classList.add(ENABLE_PERMISSIONS_CLASS);
      }
    },

    /**
     * @private
     */
    _initializeAnnotationStorageCallbacks(pdfDocument) {
      if (pdfDocument !== this.pdfDocument) {
        return;
      }
      const { annotationStorage } = pdfDocument;

      annotationStorage.onSetModified = function () {
        window.addEventListener("beforeunload", beforeUnload);
      };
      annotationStorage.onResetModified = function () {
        window.removeEventListener("beforeunload", beforeUnload);
      };
    },

    setInitialView(
      storedHash,
      { rotation, sidebarView, scrollMode, spreadMode } = {}
    ) {
      const setRotation = angle => {
        if (isValidRotation(angle)) {
          this.pdfViewer.pagesRotation = angle;
        }
      };
      const setViewerModes = (scroll, spread) => {
        if (isValidScrollMode(scroll)) {
          this.pdfViewer.scrollMode = scroll;
        }
        if (isValidSpreadMode(spread)) {
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

      // Ensure that the correct page number is displayed in the UI,
      // even if the active page didn't change during document load.
      this.toolbar.setPageNumber(
        this.pdfViewer.currentPageNumber,
        this.pdfViewer.currentPageLabel
      );
      this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);

      if (!this.pdfViewer.currentScaleValue) {
        // Scale was not initialized: invalid bookmark or scale was not specified.
        // Setting the default one.
        this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
      }
    },

    cleanup() {
      if (!this.pdfDocument) {
        return; // run cleanup when document is loaded
      }
      this.pdfViewer.cleanup();
      this.pdfThumbnailViewer.cleanup();

      // We don't want to remove fonts used by active page SVGs.
      if (this.pdfViewer.renderer !== RendererType.SVG) {
        this.pdfDocument.cleanup();
      }
    },

    forceRendering() {
      this.pdfRenderingQueue.printing = !!this.printService;
      this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible;
      this.pdfRenderingQueue.renderHighestPriority();
    },

    beforePrint() {
      // Given that the "beforeprint" browser event is synchronous, we
      // unfortunately cannot await the scripting event dispatching here.
      ///this._scriptingInstance?.scripting.dispatchEventInSandbox({ // lwf
      this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({
        id: "doc",
        name: "WillPrint",
      });

      if (this.printService) {
        // There is no way to suppress beforePrint/afterPrint events,
        // but PDFPrintService may generate double events -- this will ignore
        // the second event that will be coming from native window.print().
        return;
      }

      if (!this.supportsPrinting) {
        this.l10n
          .get(
            "printing_not_supported",
            null,
            "Warning: Printing is not fully supported by this browser."
          )
          .then(printMessage => {
            this.error(printMessage);
          });
        return;
      }

      // The beforePrint is a sync method and we need to know layout before
      // returning from this method. Ensure that we can get sizes of the pages.
      if (!this.pdfViewer.pageViewsReady) {
        this.l10n
          .get(
            "printing_not_ready",
            null,
            "Warning: The PDF is not fully loaded for printing."
          )
          .then(notReadyMessage => {
            // eslint-disable-next-line no-alert
            window.alert(notReadyMessage);
          });
        return;
      }

      const pagesOverview = this.pdfViewer.getPagesOverview();
      const printContainer = this.appConfig.printContainer;
      const printResolution = AppOptions.get("printResolution");
      const optionalContentConfigPromise = this.pdfViewer
        .optionalContentConfigPromise;

      const printService = PDFPrintServiceFactory.instance.createPrintService(
        this.pdfDocument,
        pagesOverview,
        printContainer,
        printResolution,
        optionalContentConfigPromise,
        this.l10n
      );
      this.printService = printService;
      this.forceRendering();

      printService.layout();

      this.externalServices.reportTelemetry({
        type: "print",
      });
    },

    afterPrint() {
      // Given that the "afterprint" browser event is synchronous, we
      // unfortunately cannot await the scripting event dispatching here.
      ///this._scriptingInstance?.scripting.dispatchEventInSandbox({ // lwf
      this._scriptingInstance && this._scriptingInstance.scripting.dispatchEventInSandbox({
        id: "doc",
        name: "DidPrint",
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
      // Note that the thumbnail viewer is updated, and rendering is triggered,
      // in the 'rotationchanging' event handler.
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
      const { eventBus, _boundEvents } = this;

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

      if (AppOptions.get("pdfBug")) {
        _boundEvents.reportPageStatsPDFBug = reportPageStatsPDFBug;

        eventBus._on("pagerendered", _boundEvents.reportPageStatsPDFBug);
        eventBus._on("pagechanging", _boundEvents.reportPageStatsPDFBug);
      }
      if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
        eventBus._on("fileinputchange", webViewerFileInputChange);
        eventBus._on("openfile", webViewerOpenFile);
      }
    },

    bindWindowEvents() {
      const { eventBus, _boundEvents } = this;

      _boundEvents.windowResize = () => {
        eventBus.dispatch("resize", { source: window });
      };
      _boundEvents.windowHashChange = () => {
        eventBus.dispatch("hashchange", {
          source: window,
          hash: document.location.hash.substring(1),
        });
      };
      _boundEvents.windowBeforePrint = () => {
        eventBus.dispatch("beforeprint", { source: window });
      };
      _boundEvents.windowAfterPrint = () => {
        eventBus.dispatch("afterprint", { source: window });
      };
      _boundEvents.windowUpdateFromSandbox = event => {
        eventBus.dispatch("updatefromsandbox", {
          source: window,
          detail: event.detail,
        });
      };

      window.addEventListener("visibilitychange", webViewerVisibilityChange);
      window.addEventListener("wheel", webViewerWheel, { passive: false });
      window.addEventListener("touchstart", webViewerTouchStart, {
        passive: false,
      });
      window.addEventListener("click", webViewerClick);
      window.addEventListener("keydown", webViewerKeyDown);
      window.addEventListener("keyup", webViewerKeyUp);
      window.addEventListener("resize", _boundEvents.windowResize);
      window.addEventListener("hashchange", _boundEvents.windowHashChange);
      window.addEventListener("beforeprint", _boundEvents.windowBeforePrint);
      window.addEventListener("afterprint", _boundEvents.windowAfterPrint);
      window.addEventListener(
        "updatefromsandbox",
        _boundEvents.windowUpdateFromSandbox
      );
    },

    unbindEvents() {
      const { eventBus, _boundEvents } = this;

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
      if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
        eventBus._off("fileinputchange", webViewerFileInputChange);
        eventBus._off("openfile", webViewerOpenFile);
      }

      _boundEvents.beforePrint = null;
      _boundEvents.afterPrint = null;
    },

    unbindWindowEvents() {
      const { _boundEvents } = this;

      window.removeEventListener("visibilitychange", webViewerVisibilityChange);
      window.removeEventListener("wheel", webViewerWheel, { passive: false });
      window.removeEventListener("touchstart", webViewerTouchStart, {
        passive: false,
      });
      window.removeEventListener("click", webViewerClick);
      window.removeEventListener("keydown", webViewerKeyDown);
      window.removeEventListener("keyup", webViewerKeyUp);
      window.removeEventListener("resize", _boundEvents.windowResize);
      window.removeEventListener("hashchange", _boundEvents.windowHashChange);
      window.removeEventListener("beforeprint", _boundEvents.windowBeforePrint);
      window.removeEventListener("afterprint", _boundEvents.windowAfterPrint);
      window.removeEventListener(
        "updatefromsandbox",
        _boundEvents.windowUpdateFromSandbox
      );

      _boundEvents.windowResize = null;
      _boundEvents.windowHashChange = null;
      _boundEvents.windowBeforePrint = null;
      _boundEvents.windowAfterPrint = null;
      _boundEvents.windowUpdateFromSandbox = null;
    },

    accumulateWheelTicks(ticks) {
      // If the scroll direction changed, reset the accumulated wheel ticks.
      if (
        (this._wheelUnusedTicks > 0 && ticks < 0) ||
        (this._wheelUnusedTicks < 0 && ticks > 0)
      ) {
        this._wheelUnusedTicks = 0;
      }
      this._wheelUnusedTicks += ticks;
      const wholeTicks =
        Math.sign(this._wheelUnusedTicks) *
        Math.floor(Math.abs(this._wheelUnusedTicks));
      this._wheelUnusedTicks -= wholeTicks;
      return wholeTicks;
    },

    /**
     * Used together with the integration-tests, to enable awaiting full
     * initialization of the scripting/sandbox.
     */
    get scriptingReady() {
      ///return this._scriptingInstance?.ready || false; // lwf
      return this._scriptingInstance && this._scriptingInstance.ready || false;
    },
  };

  let validateFileURL;
  if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
    const HOSTED_VIEWER_ORIGINS = [
      "null",
      "http://mozilla.github.io",
      "https://mozilla.github.io",
    ];
    validateFileURL = function (file) {
      if (file === undefined) {
        return;
      }
      try {
        const viewerOrigin = new URL(window.location.href).origin || "null";
        if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
          // Hosted or local viewer, allow for any file locations
          return;
        }
        const { origin, protocol } = new URL(file, window.location.href);
        // Removing of the following line will not guarantee that the viewer will
        // start accepting URLs from foreign origin -- CORS headers on the remote
        // server must be properly configured.
        // IE10 / IE11 does not include an origin in `blob:`-URLs. So don't block
        // any blob:-URL. The browser's same-origin policy will block requests to
        // blob:-URLs from other origins, so this is safe.
        if (origin !== viewerOrigin && protocol !== "blob:") {
          throw new Error("file origin does not match viewer's");
        }
      } catch (ex) {
        const message = ex && ex.message;
        PDFViewerApplication.l10n
          .get("loading_error", null, "An error occurred while loading the PDF.")
          .then(loadingErrorMessage => {
            PDFViewerApplication.error(loadingErrorMessage, { message });
          });
        throw ex;
      }
    };
  }

  async function loadFakeWorker() {
    if (!GlobalWorkerOptions.workerSrc) {
      GlobalWorkerOptions.workerSrc = AppOptions.get("workerSrc");
    }
    if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION")) {
      window.pdfjsWorker = await import("pdfjs/core/worker.js");
      return undefined;
    }
    return loadScript(PDFWorker.getWorkerSrc());
  }

  function loadAndEnablePDFBug(enabledTabs) {
    const appConfig = PDFViewerApplication.appConfig;
    return loadScript(appConfig.debuggerScriptPath).then(function () {
      PDFBug.enable(enabledTabs);
      PDFBug.init({ OPS }, appConfig.mainContainer);
    });
  }

  function reportPageStatsPDFBug({ pageNumber }) {
    if (typeof Stats === "undefined" || !Stats.enabled) {
      return;
    }
    const pageView = PDFViewerApplication.pdfViewer.getPageView(
      /* index = */ pageNumber - 1
    );
    const pageStats = pageView && pageView.pdfPage && pageView.pdfPage.stats;
    if (!pageStats) {
      return;
    }
    Stats.add(pageNumber, pageStats);
  }

  function webViewerInitialized() {
    const appConfig = PDFViewerApplication.appConfig;
    let file;
    if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
      const queryString = document.location.search.substring(1);
      const params = parseQueryString(queryString);
      file = "file" in params ? params.file : AppOptions.get("defaultUrl");
      validateFileURL(file);
    } else if (PDFJSDev.test("MOZCENTRAL")) {
      file = window.location.href;
    } else if (PDFJSDev.test("CHROME")) {
      file = AppOptions.get("defaultUrl");
    }

    if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
      const fileInput = document.createElement("input");
      fileInput.id = appConfig.openFileInputName;
      fileInput.className = "fileInput";
      fileInput.setAttribute("type", "file");
      fileInput.oncontextmenu = noContextMenuHandler;
      document.body.appendChild(fileInput);

      if (
        !window.File ||
        !window.FileReader ||
        !window.FileList ||
        !window.Blob
      ) {
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
          fileInput: evt.target,
        });
      });

      // Enable dragging-and-dropping a new PDF file onto the viewerContainer.
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
          fileInput: evt.dataTransfer,
        });
      });
    } else {
      appConfig.toolbar.openFile.setAttribute("hidden", "true");
      appConfig.secondaryToolbar.openFileButton.setAttribute("hidden", "true");
    }

    if (!PDFViewerApplication.supportsDocumentFonts) {
      AppOptions.set("disableFontFace", true);
      PDFViewerApplication.l10n
        .get(
          "web_fonts_disabled",
          null,
          "Web fonts are disabled: unable to use embedded PDF fonts."
        )
        .then(msg => {
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

    appConfig.mainContainer.addEventListener(
      "transitionend",
      function (evt) {
        if (evt.target === /* mainContainer */ this) {
          PDFViewerApplication.eventBus.dispatch("resize", { source: this });
        }
      },
      true
    );

    try {
      webViewerOpenFileViaURL(file);
    } catch (reason) {
      PDFViewerApplication.l10n
        .get("loading_error", null, "An error occurred while loading the PDF.")
        .then(msg => {
          PDFViewerApplication.error(msg, reason);
        });
    }
  }

  let webViewerOpenFileViaURL;
  if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
    webViewerOpenFileViaURL = function (file) {
      if (file && file.lastIndexOf("file:", 0) === 0) {
        // file:-scheme. Load the contents in the main thread because QtWebKit
        // cannot load file:-URLs in a Web Worker. file:-URLs are usually loaded
        // very quickly, so there is no need to set up progress event listeners.
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
  } else if (PDFJSDev.test("MOZCENTRAL || CHROME")) {
    webViewerOpenFileViaURL = function (file) {
      PDFViewerApplication.setTitleUsingUrl(file);
      PDFViewerApplication.initPassiveLoading();
    };
  } else {
    webViewerOpenFileViaURL = function (file) {
      if (file) {
        throw new Error("Not implemented: webViewerOpenFileViaURL");
      }
    };
  }

  function webViewerResetPermissions() {
    const { appConfig } = PDFViewerApplication;
    if (!appConfig) {
      return;
    }
    // Currently only the "copy"-permission is supported.
    appConfig.viewerContainer.classList.remove(ENABLE_PERMISSIONS_CLASS);
  }

  function webViewerPageRendered({ pageNumber, timestamp, error }) {
    // If the page is still visible when it has finished rendering,
    // ensure that the page number input loading indicator is hidden.
    if (pageNumber === PDFViewerApplication.page) {
      PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
    }

    // Use the rendered page to set the corresponding thumbnail image.
    if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
      const pageView = PDFViewerApplication.pdfViewer.getPageView(
        /* index = */ pageNumber - 1
      );
      const thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(
        /* index = */ pageNumber - 1
      );
      if (pageView && thumbnailView) {
        thumbnailView.setImage(pageView);
      }
    }

    if (error) {
      PDFViewerApplication.l10n
        .get(
          "rendering_error",
          null,
          "An error occurred while rendering the page."
        )
        .then(msg => {
          PDFViewerApplication.error(msg, error);
        });
    }

    PDFViewerApplication.externalServices.reportTelemetry({
      type: "pageInfo",
      timestamp,
    });
    // It is a good time to report stream and font types.
    PDFViewerApplication.pdfDocument.getStats().then(function (stats) {
      PDFViewerApplication.externalServices.reportTelemetry({
        type: "documentStats",
        stats,
      });
    });
  }

  function webViewerPageMode({ mode }) {
    // Handle the 'pagemode' hash parameter, see also `PDFLinkService_setHash`.
    let view;
    switch (mode) {
      case "thumbs":
        view = SidebarView.THUMBS;
        break;
      case "bookmarks":
      case "outline": // non-standard
        view = SidebarView.OUTLINE;
        break;
      case "attachments": // non-standard
        view = SidebarView.ATTACHMENTS;
        break;
      case "layers": // non-standard
        view = SidebarView.LAYERS;
        break;
      case "none":
        view = SidebarView.NONE;
        break;
      default:
        console.error('Invalid "pagemode" hash parameter: ' + mode);
        return;
    }
    PDFViewerApplication.pdfSidebar.switchView(view, /* forceOpen = */ true);
  }

  function webViewerNamedAction(evt) {
    // Processing a couple of named actions that might be useful, see also
    // `PDFLinkService.executeNamedAction`.
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
    PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled =
      PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;

    const store = PDFViewerApplication.store;
    if (store && PDFViewerApplication.isInitialViewSet) {
      // Only update the storage when the document has been loaded *and* rendered.
      store.set("sidebarView", evt.view).catch(function () {});
    }
  }

  function webViewerUpdateViewarea(evt) {
    const location = evt.location,
      store = PDFViewerApplication.store;

    if (store && PDFViewerApplication.isInitialViewSet) {
      store
        .setMultiple({
          page: location.pageNumber,
          zoom: location.scale,
          scrollLeft: location.left,
          scrollTop: location.top,
          rotation: location.rotation,
        })
        .catch(function () {
          /* unable to write to storage */
        });
    }
    const href = PDFViewerApplication.pdfLinkService.getAnchorUrl(
      location.pdfOpenParams
    );
    PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
    PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;

    // Show/hide the loading indicator in the page number input element.
    const currentPage = PDFViewerApplication.pdfViewer.getPageView(
      /* index = */ PDFViewerApplication.page - 1
    );
    const loading =
      (currentPage && currentPage.renderingState) !== RenderingStates.FINISHED;
    PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
  }

  function webViewerScrollModeChanged(evt) {
    const store = PDFViewerApplication.store;
    if (store && PDFViewerApplication.isInitialViewSet) {
      // Only update the storage when the document has been loaded *and* rendered.
      store.set("scrollMode", evt.mode).catch(function () {});
    }
  }

  function webViewerSpreadModeChanged(evt) {
    const store = PDFViewerApplication.store;
    if (store && PDFViewerApplication.isInitialViewSet) {
      // Only update the storage when the document has been loaded *and* rendered.
      store.set("spreadMode", evt.mode).catch(function () {});
    }
  }

  function webViewerResize() {
    const { pdfDocument, pdfViewer } = PDFViewerApplication;
    if (!pdfDocument) {
      return;
    }
    const currentScaleValue = pdfViewer.currentScaleValue;
    if (
      currentScaleValue === "auto" ||
      currentScaleValue === "page-fit" ||
      currentScaleValue === "page-width"
    ) {
      // Note: the scale is constant for 'page-actual'.
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
  if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
    webViewerFileInputChange = function (evt) {
      if (
        PDFViewerApplication.pdfViewer &&
        PDFViewerApplication.pdfViewer.isInPresentationMode
      ) {
        return; // Opening a new PDF file isn't supported in Presentation Mode.
      }
      const file = evt.fileInput.files[0];

      if (!viewerCompatibilityParams.disableCreateObjectURL) {
        let url = URL.createObjectURL(file);
        if (file.name) {
          url = { url, originalUrl: file.name };
        }
        PDFViewerApplication.open(url);
      } else {
        PDFViewerApplication.setTitleUsingUrl(file.name);
        // Read the local file into a Uint8Array.
        const fileReader = new FileReader();
        fileReader.onload = function webViewerChangeFileReaderOnload(event) {
          const buffer = event.target.result;
          PDFViewerApplication.open(new Uint8Array(buffer));
        };
        fileReader.readAsArrayBuffer(file);
      }

      // URL does not reflect proper document location - hiding some icons.
      const appConfig = PDFViewerApplication.appConfig;
      appConfig.toolbar.viewBookmark.setAttribute("hidden", "true");
      appConfig.secondaryToolbar.viewBookmarkButton.setAttribute(
        "hidden",
        "true"
      );
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
    PDFViewerApplication.downloadOrSave({ sourceEventType: "download" });
  }
  function webViewerSave() {
    PDFViewerApplication.downloadOrSave({ sourceEventType: "save" });
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
    // Note that for `<input type="number">` HTML elements, an empty string will
    // be returned for non-number inputs; hence we simply do nothing in that case.
    if (evt.value !== "") {
      PDFViewerApplication.pdfLinkService.goToPage(evt.value);
    }

    // Ensure that the page number input displays the correct value, even if the
    // value entered by the user was invalid (e.g. a floating point number).
    if (
      evt.value !== pdfViewer.currentPageNumber.toString() &&
      evt.value !== pdfViewer.currentPageLabel
    ) {
      PDFViewerApplication.toolbar.setPageNumber(
        pdfViewer.currentPageNumber,
        pdfViewer.currentPageLabel
      );
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
      findPrevious: evt.findPrevious,
    });
  }

  function webViewerFindFromUrlHash(evt) {
    PDFViewerApplication.findController.executeCommand("find", {
      query: evt.query,
      phraseSearch: evt.phraseSearch,
      caseSensitive: false,
      entireWord: false,
      highlightAll: true,
      findPrevious: false,
    });
  }

  function webViewerUpdateFindMatchesCount({ matchesCount }) {
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
    rawQuery,
  }) {
    if (PDFViewerApplication.supportsIntegratedFind) {
      PDFViewerApplication.externalServices.updateFindControlState({
        result: state,
        findPrevious: previous,
        matchesCount,
        rawQuery,
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
    // Ensure that the active page doesn't change during rotation.
    PDFViewerApplication.pdfViewer.currentPageNumber = evt.pageNumber;
  }

  function webViewerPageChanging({ pageNumber, pageLabel }) {
    PDFViewerApplication.toolbar.setPageNumber(pageNumber, pageLabel);
    PDFViewerApplication.secondaryToolbar.setPageNumber(pageNumber);

    if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
      PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(pageNumber);
    }
  }

  function webViewerVisibilityChange(evt) {
    if (document.visibilityState === "visible") {
      // Ignore mouse wheel zooming during tab switches (bug 1503412).
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
      supportedMouseWheelZoomModifierKeys,
    } = PDFViewerApplication;

    if (pdfViewer.isInPresentationMode) {
      return;
    }

    if (
      (evt.ctrlKey && supportedMouseWheelZoomModifierKeys.ctrlKey) ||
      (evt.metaKey && supportedMouseWheelZoomModifierKeys.metaKey)
    ) {
      // Only zoom the pages, not the entire viewer.
      evt.preventDefault();
      // NOTE: this check must be placed *after* preventDefault.
      if (zoomDisabledTimeout || document.visibilityState === "hidden") {
        return;
      }

      const previousScale = pdfViewer.currentScale;

      const delta = normalizeWheelEventDirection(evt);
      let ticks = 0;
      if (
        evt.deltaMode === WheelEvent.DOM_DELTA_LINE ||
        evt.deltaMode === WheelEvent.DOM_DELTA_PAGE
      ) {
        // For line-based devices, use one tick per event, because different
        // OSs have different defaults for the number lines. But we generally
        // want one "clicky" roll of the wheel (which produces one event) to
        // adjust the zoom by one step.
        if (Math.abs(delta) >= 1) {
          ticks = Math.sign(delta);
        } else {
          // If we're getting fractional lines (I can't think of a scenario
          // this might actually happen), be safe and use the accumulator.
          ticks = PDFViewerApplication.accumulateWheelTicks(delta);
        }
      } else {
        // pixel-based devices
        const PIXELS_PER_LINE_SCALE = 30;
        ticks = PDFViewerApplication.accumulateWheelTicks(
          delta / PIXELS_PER_LINE_SCALE
        );
      }

      if (ticks < 0) {
        PDFViewerApplication.zoomOut(-ticks);
      } else if (ticks > 0) {
        PDFViewerApplication.zoomIn(ticks);
      }

      const currentScale = pdfViewer.currentScale;
      if (previousScale !== currentScale) {
        // After scaling the page via zoomIn/zoomOut, the position of the upper-
        // left corner is restored. When the mouse wheel is used, the position
        // under the cursor should be restored instead.
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
      // Disable touch-based zooming, because the entire UI bits gets zoomed and
      // that doesn't look great. If we do want to have a good touch-based
      // zooming experience, we need to implement smooth zoom capability (probably
      // using a CSS transform for faster visual response, followed by async
      // re-rendering at the final zoom level) and do gesture detection on the
      // touchmove events to drive it. Or if we want to settle for a less good
      // experience we can make the touchmove events drive the existing step-zoom
      // behaviour that the ctrl+mousewheel path takes.
      evt.preventDefault();
    }
  }

  function webViewerClick(evt) {
    // Avoid triggering the fallback bar when the user clicks on the
    // toolbar or sidebar.
    if (
      PDFViewerApplication.triggerDelayedFallback &&
      PDFViewerApplication.pdfViewer.containsElement(evt.target)
    ) {
      PDFViewerApplication.triggerDelayedFallback();
    }

    if (!PDFViewerApplication.secondaryToolbar.isOpen) {
      return;
    }
    const appConfig = PDFViewerApplication.appConfig;
    if (
      PDFViewerApplication.pdfViewer.containsElement(evt.target) ||
      (appConfig.toolbar.container.contains(evt.target) &&
        evt.target !== appConfig.secondaryToolbar.toggleButton)
    ) {
      PDFViewerApplication.secondaryToolbar.close();
    }
  }

  function webViewerKeyUp(evt) {
    if (evt.keyCode === 9) {
      // The user is tabbing into the viewer. Trigger the fallback bar if it has
      // not already been displayed.
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
    const cmd =
      (evt.ctrlKey ? 1 : 0) |
      (evt.altKey ? 2 : 0) |
      (evt.shiftKey ? 4 : 0) |
      (evt.metaKey ? 8 : 0);

    const pdfViewer = PDFViewerApplication.pdfViewer;
    const isViewerInPresentationMode =
      pdfViewer && pdfViewer.isInPresentationMode;

    // First, handle the key bindings that are independent whether an input
    // control is selected or not.
    if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
      // either CTRL or META key with optional SHIFT.
      switch (evt.keyCode) {
        case 70: // f
          if (!PDFViewerApplication.supportsIntegratedFind && !evt.shiftKey) {
            PDFViewerApplication.findBar.open();
            handled = true;
          }
          break;
        case 71: // g
          if (!PDFViewerApplication.supportsIntegratedFind) {
            const findState = PDFViewerApplication.findController.state;
            if (findState) {
              PDFViewerApplication.findController.executeCommand("findagain", {
                query: findState.query,
                phraseSearch: findState.phraseSearch,
                caseSensitive: findState.caseSensitive,
                entireWord: findState.entireWord,
                highlightAll: findState.highlightAll,
                findPrevious: cmd === 5 || cmd === 12,
              });
            }
            handled = true;
          }
          break;
        case 61: // FF/Mac '='
        case 107: // FF '+' and '='
        case 187: // Chrome '+'
        case 171: // FF with German keyboard
          if (!isViewerInPresentationMode) {
            PDFViewerApplication.zoomIn();
          }
          handled = true;
          break;
        case 173: // FF/Mac '-'
        case 109: // FF '-'
        case 189: // Chrome '-'
          if (!isViewerInPresentationMode) {
            PDFViewerApplication.zoomOut();
          }
          handled = true;
          break;
        case 48: // '0'
        case 96: // '0' on Numpad of Swedish keyboard
          if (!isViewerInPresentationMode) {
            // keeping it unhandled (to restore page zoom to 100%)
            setTimeout(function () {
              // ... and resetting the scale after browser adjusts its scale
              PDFViewerApplication.zoomReset();
            });
            handled = false;
          }
          break;

        case 38: // up arrow
          if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
            PDFViewerApplication.page = 1;
            handled = true;
            ensureViewerFocused = true;
          }
          break;
        case 40: // down arrow
          if (
            isViewerInPresentationMode ||
            PDFViewerApplication.page < PDFViewerApplication.pagesCount
          ) {
            PDFViewerApplication.page = PDFViewerApplication.pagesCount;
            handled = true;
            ensureViewerFocused = true;
          }
          break;
      }
    }

    if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC || CHROME")) {
      const { eventBus } = PDFViewerApplication;

      // CTRL or META without shift
      if (cmd === 1 || cmd === 8) {
        switch (evt.keyCode) {
          case 83: // s
            eventBus.dispatch("download", { source: window });
            handled = true;
            break;

          case 79: // o
            if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
              eventBus.dispatch("openfile", { source: window });
              handled = true;
            }
            break;
        }
      }
    }

    // CTRL+ALT or Option+Command
    if (cmd === 3 || cmd === 10) {
      switch (evt.keyCode) {
        case 80: // p
          PDFViewerApplication.requestPresentationMode();
          handled = true;
          break;
        case 71: // g
          // focuses input#pageNumber field
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

    // Some shortcuts should not get handled if a control/input element
    // is selected.
    const curElement = getActiveOrFocusedElement();
    const curElementTagName = curElement && curElement.tagName.toUpperCase();
    if (
      curElementTagName === "INPUT" ||
      curElementTagName === "TEXTAREA" ||
      curElementTagName === "SELECT" ||
      (curElement && curElement.isContentEditable)
    ) {
      // Make sure that the secondary toolbar is closed when Escape is pressed.
      if (evt.keyCode !== /* Esc = */ 27) {
        return;
      }
    }

    // No control key pressed at all.
    if (cmd === 0) {
      let turnPage = 0,
        turnOnlyIfPageFit = false;
      switch (evt.keyCode) {
        case 38: // up arrow
        case 33: // pg up
          // vertical scrolling using arrow/pg keys
          if (pdfViewer.isVerticalScrollbarEnabled) {
            turnOnlyIfPageFit = true;
          }
          turnPage = -1;
          break;
        case 8: // backspace
          if (!isViewerInPresentationMode) {
            turnOnlyIfPageFit = true;
          }
          turnPage = -1;
          break;
        case 37: // left arrow
          // horizontal scrolling using arrow keys
          if (pdfViewer.isHorizontalScrollbarEnabled) {
            turnOnlyIfPageFit = true;
          }
        /* falls through */
        case 75: // 'k'
        case 80: // 'p'
          turnPage = -1;
          break;
        case 27: // esc key
          if (PDFViewerApplication.secondaryToolbar.isOpen) {
            PDFViewerApplication.secondaryToolbar.close();
            handled = true;
          }
          if (
            !PDFViewerApplication.supportsIntegratedFind &&
            PDFViewerApplication.findBar.opened
          ) {
            PDFViewerApplication.findBar.close();
            handled = true;
          }
          break;
        case 40: // down arrow
        case 34: // pg down
          // vertical scrolling using arrow/pg keys
          if (pdfViewer.isVerticalScrollbarEnabled) {
            turnOnlyIfPageFit = true;
          }
          turnPage = 1;
          break;
        case 13: // enter key
        case 32: // spacebar
          if (!isViewerInPresentationMode) {
            turnOnlyIfPageFit = true;
          }
          turnPage = 1;
          break;
        case 39: // right arrow
          // horizontal scrolling using arrow keys
          if (pdfViewer.isHorizontalScrollbarEnabled) {
            turnOnlyIfPageFit = true;
          }
        /* falls through */
        case 74: // 'j'
        case 78: // 'n'
          turnPage = 1;
          break;

        case 36: // home
          if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
            PDFViewerApplication.page = 1;
            handled = true;
            ensureViewerFocused = true;
          }
          break;
        case 35: // end
          if (
            isViewerInPresentationMode ||
            PDFViewerApplication.page < PDFViewerApplication.pagesCount
          ) {
            PDFViewerApplication.page = PDFViewerApplication.pagesCount;
            handled = true;
            ensureViewerFocused = true;
          }
          break;

        case 83: // 's'
          PDFViewerApplication.pdfCursorTools.switchTool(CursorTool.SELECT);
          break;
        case 72: // 'h'
          PDFViewerApplication.pdfCursorTools.switchTool(CursorTool.HAND);
          break;

        case 82: // 'r'
          PDFViewerApplication.rotatePages(90);
          break;

        case 115: // F4
          PDFViewerApplication.pdfSidebar.toggle();
          break;
      }

      if (
        turnPage !== 0 &&
        (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === "page-fit")
      ) {
        if (turnPage > 0) {
          pdfViewer.nextPage();
        } else {
          pdfViewer.previousPage();
        }
        handled = true;
      }
    }

    // shift-key
    if (cmd === 4) {
      switch (evt.keyCode) {
        case 13: // enter key
        case 32: // spacebar
          if (
            !isViewerInPresentationMode &&
            pdfViewer.currentScaleValue !== "page-fit"
          ) {
            break;
          }
          if (PDFViewerApplication.page > 1) {
            PDFViewerApplication.page--;
          }
          handled = true;
          break;

        case 82: // 'r'
          PDFViewerApplication.rotatePages(-90);
          break;
      }
    }

    if (!handled && !isViewerInPresentationMode) {
      // 33=Page Up  34=Page Down  35=End    36=Home
      // 37=Left     38=Up         39=Right  40=Down
      // 32=Spacebar
      if (
        (evt.keyCode >= 33 && evt.keyCode <= 40) ||
        (evt.keyCode === 32 && curElementTagName !== "BUTTON")
      ) {
        ensureViewerFocused = true;
      }
    }

    if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
      // The page container is not focused, but a page navigation key has been
      // pressed. Change the focus to the viewer container to make sure that
      // navigation by keyboard works as expected.
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

  /**
   * Converts API PageLayout values to the format used by `PDFViewer`.
   * NOTE: This is supported to the extent that the viewer implements the
   *       necessary Scroll/Spread modes (since SinglePage, TwoPageLeft,
   *       and TwoPageRight all suggests using non-continuous scrolling).
   * @param {string} mode - The API PageLayout value.
   * @returns {number} A value from {SpreadMode}.
   */
  function apiPageLayoutToSpreadMode(layout) {
    switch (layout) {
      case "SinglePage":
      case "OneColumn":
        return SpreadMode.NONE;
      case "TwoColumnLeft":
      case "TwoPageLeft":
        return SpreadMode.ODD;
      case "TwoColumnRight":
      case "TwoPageRight":
        return SpreadMode.EVEN;
    }
    return SpreadMode.NONE; // Default value.
  }

  /**
   * Converts API PageMode values to the format used by `PDFSidebar`.
   * NOTE: There's also a "FullScreen" parameter which is not possible to support,
   *       since the Fullscreen API used in browsers requires that entering
   *       fullscreen mode only occurs as a result of a user-initiated event.
   * @param {string} mode - The API PageMode value.
   * @returns {number} A value from {SidebarView}.
   */
  function apiPageModeToSidebarView(mode) {
    switch (mode) {
      case "UseNone":
        return SidebarView.NONE;
      case "UseThumbs":
        return SidebarView.THUMBS;
      case "UseOutlines":
        return SidebarView.OUTLINE;
      case "UseAttachments":
        return SidebarView.ATTACHMENTS;
      case "UseOC":
        return SidebarView.LAYERS;
    }
    return SidebarView.NONE; // Default value.
  }

  /* Abstract factory for the print service. */
  const PDFPrintServiceFactory = {
    instance: {
      supportsPrinting: false,
      createPrintService() {
        throw new Error("Not implemented: createPrintService");
      },
    },
  };

  return {
    DefaultExternalServices,
    PDFPrintServiceFactory,
    PDFViewerApplication,
  };

});
define('skylark-pdfjs-viewer/preferences',[

  "./app_options"
],function(app_options){
  /* Copyright 2013 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { AppOptions, OptionKind } =  app_options;

  /**
   * BasePreferences - Abstract base class for storing persistent settings.
   *   Used for settings that should be applied to all opened documents,
   *   or every time the viewer is loaded.
   */
  class BasePreferences {
    constructor() {
      if (this.constructor === BasePreferences) {
        throw new Error("Cannot initialize BasePreferences.");
      }
      Object.defineProperty(this, "defaults", {
        value: Object.freeze(
          typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION")
            ? AppOptions.getAll(OptionKind.PREFERENCE)
            : PDFJSDev.json("$ROOT/build/default_preferences.json")
        ),
        writable: false,
        enumerable: true,
        configurable: false,
      });
      this.prefs = Object.assign(Object.create(null), this.defaults);

      this._initializedPromise = this._readFromStorage(this.defaults).then(
        prefs => {
          if (!prefs) {
            return;
          }
          for (const name in prefs) {
            const defaultValue = this.defaults[name],
              prefValue = prefs[name];
            // Ignore preferences not present in, or whose types don't match,
            // the default values.
            if (
              defaultValue === undefined ||
              typeof prefValue !== typeof defaultValue
            ) {
              continue;
            }
            this.prefs[name] = prefValue;
          }
        }
      );
    }

    /**
     * Stub function for writing preferences to storage.
     * @param {Object} prefObj The preferences that should be written to storage.
     * @returns {Promise} A promise that is resolved when the preference values
     *                    have been written.
     */
    async _writeToStorage(prefObj) {
      throw new Error("Not implemented: _writeToStorage");
    }

    /**
     * Stub function for reading preferences from storage.
     * @param {Object} prefObj The preferences that should be read from storage.
     * @returns {Promise} A promise that is resolved with an {Object} containing
     *                    the preferences that have been read.
     */
    async _readFromStorage(prefObj) {
      throw new Error("Not implemented: _readFromStorage");
    }

    /**
     * Reset the preferences to their default values and update storage.
     * @returns {Promise} A promise that is resolved when the preference values
     *                    have been reset.
     */
    async reset() {
      await this._initializedPromise;
      this.prefs = Object.assign(Object.create(null), this.defaults);
      return this._writeToStorage(this.defaults);
    }

    /**
     * Set the value of a preference.
     * @param {string} name The name of the preference that should be changed.
     * @param {boolean|number|string} value The new value of the preference.
     * @returns {Promise} A promise that is resolved when the value has been set,
     *                    provided that the preference exists and the types match.
     */
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
          throw new Error(
            `Set preference: "${value}" is a ${valueType}, ` +
              `expected a ${defaultType}.`
          );
        }
      } else {
        if (valueType === "number" && !Number.isInteger(value)) {
          throw new Error(`Set preference: "${value}" must be an integer.`);
        }
      }
      this.prefs[name] = value;
      return this._writeToStorage(this.prefs);
    }

    /**
     * Get the value of a preference.
     * @param {string} name The name of the preference whose value is requested.
     * @returns {Promise} A promise resolved with a {boolean|number|string}
     *                    containing the value of the preference.
     */
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

    /**
     * Get the values of all preferences.
     * @returns {Promise} A promise that is resolved with an {Object} containing
     *                    the values of all preferences.
     */
    async getAll() {
      await this._initializedPromise;
      return Object.assign(Object.create(null), this.defaults, this.prefs);
    }
  }

  return { BasePreferences };
});
define('skylark-pdfjs-viewer/download_manager',[
  "skylark-pdfjs-display",
  "./pdfjs_dev",
  "./viewer_compatibility"
],function(
  pdfjsLib,
  PDFJSDev,
  viewer_compatibility
){


  /* Copyright 2013 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { createObjectURL, createValidAbsoluteUrl } = pdfjsLib;
  const { viewerCompatibilityParams } = viewer_compatibility;

  if (typeof PDFJSDev !== "undefined" && !PDFJSDev.test("CHROME || GENERIC")) {
    throw new Error(
      'Module "pdfjs-web/download_manager" shall not be used ' +
        "outside CHROME and GENERIC builds."
    );
  }

  function download(blobUrl, filename) {
    const a = document.createElement("a");
    if (!a.click) {
      throw new Error('DownloadManager: "a.click()" is not supported.');
    }
    a.href = blobUrl;
    a.target = "_parent";
    // Use a.download if available. This increases the likelihood that
    // the file is downloaded instead of opened by another PDF plugin.
    if ("download" in a) {
      a.download = filename;
    }
    // <a> must be in the document for recent Firefox versions,
    // otherwise .click() is ignored.
    (document.body || document.documentElement).appendChild(a);
    a.click();
    a.remove();
  }

  class DownloadManager {
    downloadUrl(url, filename) {
      if (!createValidAbsoluteUrl(url, "http://example.com")) {
        return; // restricted/invalid URL
      }
      download(url + "#pdfjs.action=download", filename);
    }

    downloadData(data, filename, contentType) {
      const blobUrl = createObjectURL(
        data,
        contentType,
        viewerCompatibilityParams.disableCreateObjectURL
      );
      download(blobUrl, filename);
    }

    /**
     * @param sourceEventType {string} Used to signal what triggered the download.
     *   The version of PDF.js integrated with Firefox uses this to to determine
     *   which dialog to show. "save" triggers "save as" and "download" triggers
     *   the "open with" dialog.
     */
    download(blob, url, filename, sourceEventType = "download") {
      if (viewerCompatibilityParams.disableCreateObjectURL) {
        // URL.createObjectURL is not supported
        this.downloadUrl(url, filename);
        return;
      }
      const blobUrl = URL.createObjectURL(blob);
      download(blobUrl, filename);
    }
  }

  return { DownloadManager };
});
define('skylark-pdfjs-viewer/l10n',[],function(){
  /**
   * Copyright (c) 2011-2013 Fabien Cazenave, Mozilla.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to
   * deal in the Software without restriction, including without limitation the
   * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
   * sell copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
   * IN THE SOFTWARE.
   */
  /*
    Additional modifications for PDF.js project:
      - Disables language initialization on page loading.
      - Disables document translation on page loading.
      - Removes consoleWarn and consoleLog and use console.log/warn directly.
      - Removes window._ assignment.
      - Remove compatibility code for OldIE.
      - Replaces `String.prototype.substr()` with `String.prototype.substring()`.
      - Removes `fireL10nReadyEvent` since the "localized" event it dispatches
        is unused and may clash with an identically named event in the viewer.
  */

  /*jshint browser: true, devel: true, es5: true, globalstrict: true */
  'use strict';

  return document.webL10n = (function(window, document, undefined) {
    var gL10nData = {};
    var gTextData = '';
    var gTextProp = 'textContent';
    var gLanguage = '';
    var gMacros = {};
    var gReadyState = 'loading';


    /**
     * Synchronously loading l10n resources significantly minimizes flickering
     * from displaying the app with non-localized strings and then updating the
     * strings. Although this will block all script execution on this page, we
     * expect that the l10n resources are available locally on flash-storage.
     *
     * As synchronous XHR is generally considered as a bad idea, we're still
     * loading l10n resources asynchronously -- but we keep this in a setting,
     * just in case... and applications using this library should hide their
     * content until the `localized' event happens.
     */

    var gAsyncResourceLoading = true; // read-only


    /**
     * DOM helpers for the so-called "HTML API".
     *
     * These functions are written for modern browsers. For old versions of IE,
     * they're overridden in the 'startup' section at the end of this file.
     */

    function getL10nResourceLinks() {
      return document.querySelectorAll('link[type="application/l10n"]');
    }

    function getL10nDictionary() {
      var script = document.querySelector('script[type="application/l10n"]');
      // TODO: support multiple and external JSON dictionaries
      return script ? JSON.parse(script.innerHTML) : null;
    }

    function getTranslatableChildren(element) {
      return element ? element.querySelectorAll('*[data-l10n-id]') : [];
    }

    function getL10nAttributes(element) {
      if (!element)
        return {};

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
      return { id: l10nId, args: args };
    }

    function xhrLoadText(url, onSuccess, onFailure) {
      onSuccess = onSuccess || function _onSuccess(data) {};
      onFailure = onFailure || function _onFailure() {};

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, gAsyncResourceLoading);
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType('text/plain; charset=utf-8');
      }
      xhr.onreadystatechange = function() {
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

      // in Firefox OS with the app:// protocol, trying to XHR a non-existing
      // URL will raise an exception here -- hence this ugly try...catch.
      try {
        xhr.send(null);
      } catch (e) {
        onFailure();
      }
    }


    /**
     * l10n resource parser:
     *  - reads (async XHR) the l10n resource matching `lang';
     *  - imports linked resources (synchronously) when specified;
     *  - parses the text data (fills `gL10nData' and `gTextData');
     *  - triggers success/failure callbacks when done.
     *
     * @param {string} href
     *    URL of the l10n resource to parse.
     *
     * @param {string} lang
     *    locale (language) to parse. Must be a lowercase string.
     *
     * @param {Function} successCallback
     *    triggered when the l10n resource has been successfully parsed.
     *
     * @param {Function} failureCallback
     *    triggered when the an error has occurred.
     *
     * @return {void}
     *    uses the following global variables: gL10nData, gTextData, gTextProp.
     */

    function parseResource(href, lang, successCallback, failureCallback) {
      var baseURL = href.replace(/[^\/]*$/, '') || './';

      // handle escaped characters (backslashes) in a string
      function evalString(text) {
        if (text.lastIndexOf('\\') < 0)
          return text;
        return text.replace(/\\\\/g, '\\')
                   .replace(/\\n/g, '\n')
                   .replace(/\\r/g, '\r')
                   .replace(/\\t/g, '\t')
                   .replace(/\\b/g, '\b')
                   .replace(/\\f/g, '\f')
                   .replace(/\\{/g, '{')
                   .replace(/\\}/g, '}')
                   .replace(/\\"/g, '"')
                   .replace(/\\'/g, "'");
      }

      // parse *.properties text data into an l10n dictionary
      // If gAsyncResourceLoading is false, then the callback will be called
      // synchronously. Otherwise it is called asynchronously.
      function parseProperties(text, parsedPropertiesCallback) {
        var dictionary = {};

        // token expressions
        var reBlank = /^\s*|\s*$/;
        var reComment = /^\s*#|^\s*$/;
        var reSection = /^\s*\[(.*)\]\s*$/;
        var reImport = /^\s*@import\s+url\((.*)\)\s*$/i;
        var reSplit = /^([^=\s]*)\s*=\s*(.+)$/; // TODO: escape EOLs with '\'

        // parse the *.properties file into an associative array
        function parseRawLines(rawText, extendedSyntax, parsedRawLinesCallback) {
          var entries = rawText.replace(reBlank, '').split(/[\r\n]+/);
          var currentLang = '*';
          var genericLang = lang.split('-', 1)[0];
          var skipLang = false;
          var match = '';

          function nextEntry() {
            // Use infinite loop instead of recursion to avoid reaching the
            // maximum recursion limit for content with many lines.
            while (true) {
              if (!entries.length) {
                parsedRawLinesCallback();
                return;
              }
              var line = entries.shift();

              // comment or blank line?
              if (reComment.test(line))
                continue;

              // the extended syntax supports [lang] sections and @import rules
              if (extendedSyntax) {
                match = reSection.exec(line);
                if (match) { // section start?
                  // RFC 4646, section 4.4, "All comparisons MUST be performed
                  // in a case-insensitive manner."

                  currentLang = match[1].toLowerCase();
                  skipLang = (currentLang !== '*') &&
                      (currentLang !== lang) && (currentLang !== genericLang);
                  continue;
                } else if (skipLang) {
                  continue;
                }
                match = reImport.exec(line);
                if (match) { // @import rule?
                  loadImport(baseURL + match[1], nextEntry);
                  return;
                }
              }

              // key-value pair
              var tmp = line.match(reSplit);
              if (tmp && tmp.length == 3) {
                dictionary[tmp[1]] = evalString(tmp[2]);
              }
            }
          }
          nextEntry();
        }

        // import another *.properties file
        function loadImport(url, callback) {
          xhrLoadText(url, function(content) {
            parseRawLines(content, false, callback); // don't allow recursive imports
          }, function () {
            console.warn(url + ' not found.');
            callback();
          });
        }

        // fill the dictionary
        parseRawLines(text, true, function() {
          parsedPropertiesCallback(dictionary);
        });
      }

      // load and parse l10n data (warning: global variables are used here)
      xhrLoadText(href, function(response) {
        gTextData += response; // mostly for debug

        // parse *.properties text data into an l10n dictionary
        parseProperties(response, function(data) {

          // find attribute descriptions, if any
          for (var key in data) {
            var id, prop, index = key.lastIndexOf('.');
            if (index > 0) { // an attribute has been specified
              id = key.substring(0, index);
              prop = key.substring(index + 1);
            } else { // no attribute: assuming text content by default
              id = key;
              prop = gTextProp;
            }
            if (!gL10nData[id]) {
              gL10nData[id] = {};
            }
            gL10nData[id][prop] = data[key];
          }

          // trigger callback
          if (successCallback) {
            successCallback();
          }
        });
      }, failureCallback);
    }

    // load and parse all resources for the specified locale
    function loadLocale(lang, callback) {
      // RFC 4646, section 2.1 states that language tags have to be treated as
      // case-insensitive. Convert to lowercase for case-insensitive comparisons.
      if (lang) {
        lang = lang.toLowerCase();
      }

      callback = callback || function _callback() {};

      clear();
      gLanguage = lang;

      // check all <link type="application/l10n" href="..." /> nodes
      // and load the resource files
      var langLinks = getL10nResourceLinks();
      var langCount = langLinks.length;
      if (langCount === 0) {
        // we might have a pre-compiled dictionary instead
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
        // early way out
        gReadyState = 'complete';
        return;
      }

      // start the callback when all resources are loaded
      var onResourceLoaded = null;
      var gResourceCount = 0;
      onResourceLoaded = function() {
        gResourceCount++;
        if (gResourceCount >= langCount) {
          callback();
          gReadyState = 'complete';
        }
      };

      // load all resource files
      function L10nResourceLink(link) {
        var href = link.href;
        // Note: If |gAsyncResourceLoading| is false, then the following callbacks
        // are synchronously called.
        this.load = function(lang, callback) {
          parseResource(href, lang, callback, function() {
            console.warn(href + ' not found.');
            // lang not found, used default resource instead
            console.warn('"' + lang + '" resource not found');
            gLanguage = '';
            // Resource not loaded, but we still need to call the callback.
            callback();
          });
        };
      }

      for (var i = 0; i < langCount; i++) {
        var resource = new L10nResourceLink(langLinks[i]);
        resource.load(lang, onResourceLoaded);
      }
    }

    // clear all l10n data
    function clear() {
      gL10nData = {};
      gTextData = '';
      gLanguage = '';
      // TODO: clear all non predefined macros.
      // There's no such macro /yet/ but we're planning to have some...
    }


    /**
     * Get rules for plural forms (shared with JetPack), see:
     * http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
     * https://github.com/mozilla/addon-sdk/blob/master/python-lib/plural-rules-generator.p
     *
     * @param {string} lang
     *    locale (language) used.
     *
     * @return {Function}
     *    returns a function that gives the plural form name for a given integer:
     *       var fun = getPluralRules('en');
     *       fun(1)    -> 'one'
     *       fun(0)    -> 'other'
     *       fun(1000) -> 'other'.
     */

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

      // utility functions for plural rules methods
      function isIn(n, list) {
        return list.indexOf(n) !== -1;
      }
      function isBetween(n, start, end) {
        return start <= n && n <= end;
      }

      // list of all plural rules methods:
      // map an integer to the plural form name to use
      var pluralRules = {
        '0': function(n) {
          return 'other';
        },
        '1': function(n) {
          if ((isBetween((n % 100), 3, 10)))
            return 'few';
          if (n === 0)
            return 'zero';
          if ((isBetween((n % 100), 11, 99)))
            return 'many';
          if (n == 2)
            return 'two';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '2': function(n) {
          if (n !== 0 && (n % 10) === 0)
            return 'many';
          if (n == 2)
            return 'two';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '3': function(n) {
          if (n == 1)
            return 'one';
          return 'other';
        },
        '4': function(n) {
          if ((isBetween(n, 0, 1)))
            return 'one';
          return 'other';
        },
        '5': function(n) {
          if ((isBetween(n, 0, 2)) && n != 2)
            return 'one';
          return 'other';
        },
        '6': function(n) {
          if (n === 0)
            return 'zero';
          if ((n % 10) == 1 && (n % 100) != 11)
            return 'one';
          return 'other';
        },
        '7': function(n) {
          if (n == 2)
            return 'two';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '8': function(n) {
          if ((isBetween(n, 3, 6)))
            return 'few';
          if ((isBetween(n, 7, 10)))
            return 'many';
          if (n == 2)
            return 'two';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '9': function(n) {
          if (n === 0 || n != 1 && (isBetween((n % 100), 1, 19)))
            return 'few';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '10': function(n) {
          if ((isBetween((n % 10), 2, 9)) && !(isBetween((n % 100), 11, 19)))
            return 'few';
          if ((n % 10) == 1 && !(isBetween((n % 100), 11, 19)))
            return 'one';
          return 'other';
        },
        '11': function(n) {
          if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14)))
            return 'few';
          if ((n % 10) === 0 ||
              (isBetween((n % 10), 5, 9)) ||
              (isBetween((n % 100), 11, 14)))
            return 'many';
          if ((n % 10) == 1 && (n % 100) != 11)
            return 'one';
          return 'other';
        },
        '12': function(n) {
          if ((isBetween(n, 2, 4)))
            return 'few';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '13': function(n) {
          if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14)))
            return 'few';
          if (n != 1 && (isBetween((n % 10), 0, 1)) ||
              (isBetween((n % 10), 5, 9)) ||
              (isBetween((n % 100), 12, 14)))
            return 'many';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '14': function(n) {
          if ((isBetween((n % 100), 3, 4)))
            return 'few';
          if ((n % 100) == 2)
            return 'two';
          if ((n % 100) == 1)
            return 'one';
          return 'other';
        },
        '15': function(n) {
          if (n === 0 || (isBetween((n % 100), 2, 10)))
            return 'few';
          if ((isBetween((n % 100), 11, 19)))
            return 'many';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '16': function(n) {
          if ((n % 10) == 1 && n != 11)
            return 'one';
          return 'other';
        },
        '17': function(n) {
          if (n == 3)
            return 'few';
          if (n === 0)
            return 'zero';
          if (n == 6)
            return 'many';
          if (n == 2)
            return 'two';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '18': function(n) {
          if (n === 0)
            return 'zero';
          if ((isBetween(n, 0, 2)) && n !== 0 && n != 2)
            return 'one';
          return 'other';
        },
        '19': function(n) {
          if ((isBetween(n, 2, 10)))
            return 'few';
          if ((isBetween(n, 0, 1)))
            return 'one';
          return 'other';
        },
        '20': function(n) {
          if ((isBetween((n % 10), 3, 4) || ((n % 10) == 9)) && !(
              isBetween((n % 100), 10, 19) ||
              isBetween((n % 100), 70, 79) ||
              isBetween((n % 100), 90, 99)
              ))
            return 'few';
          if ((n % 1000000) === 0 && n !== 0)
            return 'many';
          if ((n % 10) == 2 && !isIn((n % 100), [12, 72, 92]))
            return 'two';
          if ((n % 10) == 1 && !isIn((n % 100), [11, 71, 91]))
            return 'one';
          return 'other';
        },
        '21': function(n) {
          if (n === 0)
            return 'zero';
          if (n == 1)
            return 'one';
          return 'other';
        },
        '22': function(n) {
          if ((isBetween(n, 0, 1)) || (isBetween(n, 11, 99)))
            return 'one';
          return 'other';
        },
        '23': function(n) {
          if ((isBetween((n % 10), 1, 2)) || (n % 20) === 0)
            return 'one';
          return 'other';
        },
        '24': function(n) {
          if ((isBetween(n, 3, 10) || isBetween(n, 13, 19)))
            return 'few';
          if (isIn(n, [2, 12]))
            return 'two';
          if (isIn(n, [1, 11]))
            return 'one';
          return 'other';
        }
      };

      // return a function that gives the plural form name for a given integer
      var index = locales2rules[lang.replace(/-.*$/, '')];
      if (!(index in pluralRules)) {
        console.warn('plural form unknown for [' + lang + ']');
        return function() { return 'other'; };
      }
      return pluralRules[index];
    }

    // pre-defined 'plural' macro
    gMacros.plural = function(str, param, key, prop) {
      var n = parseFloat(param);
      if (isNaN(n))
        return str;

      // TODO: support other properties (l20n still doesn't...)
      if (prop != gTextProp)
        return str;

      // initialize _pluralRules
      if (!gMacros._pluralRules) {
        gMacros._pluralRules = getPluralRules(gLanguage);
      }
      var index = '[' + gMacros._pluralRules(n) + ']';

      // try to find a [zero|one|two] key if it's defined
      if (n === 0 && (key + '[zero]') in gL10nData) {
        str = gL10nData[key + '[zero]'][prop];
      } else if (n == 1 && (key + '[one]') in gL10nData) {
        str = gL10nData[key + '[one]'][prop];
      } else if (n == 2 && (key + '[two]') in gL10nData) {
        str = gL10nData[key + '[two]'][prop];
      } else if ((key + index) in gL10nData) {
        str = gL10nData[key + index][prop];
      } else if ((key + '[other]') in gL10nData) {
        str = gL10nData[key + '[other]'][prop];
      }

      return str;
    };


    /**
     * l10n dictionary functions
     */

    // fetch an l10n object, warn if not found, apply `args' if possible
    function getL10nData(key, args, fallback) {
      var data = gL10nData[key];
      if (!data) {
        console.warn('#' + key + ' is undefined.');
        if (!fallback) {
          return null;
        }
        data = fallback;
      }

      /** This is where l10n expressions should be processed.
        * The plan is to support C-style expressions from the l20n project;
        * until then, only two kinds of simple expressions are supported:
        *   {[ index ]} and {{ arguments }}.
        */
      var rv = {};
      for (var prop in data) {
        var str = data[prop];
        str = substIndexes(str, args, key, prop);
        str = substArguments(str, args, key);
        rv[prop] = str;
      }
      return rv;
    }

    // replace {[macros]} with their values
    function substIndexes(str, args, key, prop) {
      var reIndex = /\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/;
      var reMatch = reIndex.exec(str);
      if (!reMatch || !reMatch.length)
        return str;

      // an index/macro has been found
      // Note: at the moment, only one parameter is supported
      var macroName = reMatch[1];
      var paramName = reMatch[2];
      var param;
      if (args && paramName in args) {
        param = args[paramName];
      } else if (paramName in gL10nData) {
        param = gL10nData[paramName];
      }

      // there's no macro parser yet: it has to be defined in gMacros
      if (macroName in gMacros) {
        var macro = gMacros[macroName];
        str = macro(str, param, key, prop);
      }
      return str;
    }

    // replace {{arguments}} with their values
    function substArguments(str, args, key) {
      var reArgs = /\{\{\s*(.+?)\s*\}\}/g;
      return str.replace(reArgs, function(matched_text, arg) {
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

    // translate an HTML element
    function translateElement(element) {
      var l10n = getL10nAttributes(element);
      if (!l10n.id)
        return;

      // get the related l10n object
      var data = getL10nData(l10n.id, l10n.args);
      if (!data) {
        console.warn('#' + l10n.id + ' is undefined.');
        return;
      }

      // translate element (TODO: security checks?)
      if (data[gTextProp]) { // XXX
        if (getChildElementCount(element) === 0) {
          element[gTextProp] = data[gTextProp];
        } else {
          // this element has element children: replace the content of the first
          // (non-empty) child textNode and clear other child textNodes
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
          // if no (non-empty) textNode is found, insert a textNode before the
          // first element child.
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

    // webkit browsers don't currently support 'children' on SVG elements...
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

    // translate an HTML subtree
    function translateFragment(element) {
      element = element || document.documentElement;

      // check all translatable children (= w/ a `data-l10n-id' attribute)
      var children = getTranslatableChildren(element);
      var elementCount = children.length;
      for (var i = 0; i < elementCount; i++) {
        translateElement(children[i]);
      }

      // translate element itself if necessary
      translateElement(element);
    }

    return {
      // get a localized string
      get: function(key, args, fallbackString) {
        var index = key.lastIndexOf('.');
        var prop = gTextProp;
        if (index > 0) { // An attribute has been specified
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

      // debug
      getData: function() { return gL10nData; },
      getText: function() { return gTextData; },

      // get|set the document language
      getLanguage: function() { return gLanguage; },
      setLanguage: function(lang, callback) {
        loadLocale(lang, function() {
          if (callback)
            callback();
        });
      },

      // get the direction (ltr|rtl) of the current language
      getDirection: function() {
        // http://www.w3.org/International/questions/qa-scripts
        // Arabic, Hebrew, Farsi, Pashto, Urdu
        var rtlList = ['ar', 'he', 'fa', 'ps', 'ur'];
        var shortCode = gLanguage.split('-', 1)[0];
        return (rtlList.indexOf(shortCode) >= 0) ? 'rtl' : 'ltr';
      },

      // translate an element or document fragment
      translate: translateFragment,

      // this can be used to prevent race conditions
      getReadyState: function() { return gReadyState; },
      ready: function(callback) {
        if (!callback) {
          return;
        } else if (gReadyState == 'complete' || gReadyState == 'interactive') {
          window.setTimeout(function() {
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
  }) (window, document);

});
define('skylark-pdfjs-viewer/genericl10n',[
  "./l10n"
],function(webL10n){
  /* Copyright 2017 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */


  //const webL10n = document.webL10n;

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

  return { GenericL10n };
});
define('skylark-pdfjs-viewer/generic_scripting',[
  "skylark-pdfjs-display"
],function(pdfjsLib){
  /* Copyright 2020 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { loadScript } = pdfjsLib;

  class GenericScripting {
    constructor(sandboxBundleSrc) {
      this._ready = loadScript(
        sandboxBundleSrc,
        /* removeScriptElement = */ true
      ).then(() => {
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

  return { GenericScripting };
});
define('skylark-pdfjs-viewer/genericcom',[
  "./pdfjs_dev",
  "./app",
  "./preferences",
  "./download_manager",
  "./genericl10n",
  "./generic_scripting"
],function(
  PDFJSDev,
  app,
  preferences,
  download_manager,
  genericl10n,
  generic_scripting
){
  /* Copyright 2017 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { DefaultExternalServices, PDFViewerApplication } = app;
  const { BasePreferences } = preferences;
  const { DownloadManager } = download_manager;
  const { GenericL10n } = genericl10n;
  const { GenericScripting } = generic_scripting;

  if (typeof PDFJSDev !== "undefined" && !PDFJSDev.test("GENERIC")) {
    throw new Error(
      'Module "pdfjs-web/genericcom" shall not be used outside ' +
        "GENERIC build."
    );
  }

  const GenericCom = {};

  class GenericPreferences extends BasePreferences {
    async _writeToStorage(prefObj) {
      localStorage.setItem("pdfjs.preferences", JSON.stringify(prefObj));
    }

    async _readFromStorage(prefObj) {
      return JSON.parse(localStorage.getItem("pdfjs.preferences"));
    }
  }

  class GenericExternalServices extends DefaultExternalServices {
    static createDownloadManager(options) {
      return new DownloadManager();
    }

    static createPreferences() {
      return new GenericPreferences();
    }

    static createL10n({ locale = "en-US" }) {
      return new GenericL10n(locale);
    }

    static createScripting({ sandboxBundleSrc }) {
      return new GenericScripting(sandboxBundleSrc);
    }
  }
  PDFViewerApplication.externalServices = GenericExternalServices;

  return { GenericCom };
});
define('skylark-pdfjs-viewer/pdf_print_service',[
  "./ui_utils",
  "./app",
  "./viewer_compatibility"
],function(ui_utils,app,viewer_compatibility){
  /* Copyright 2016 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

    const { CSS_UNITS, NullL10n } = ui_utils;
    const { PDFPrintServiceFactory, PDFViewerApplication } = app;
    const { viewerCompatibilityParams } = viewer_compatibility;

    let activeService = null;
    let overlayManager = null;

    // Renders the page to the canvas of the given print service, and returns
    // the suggested dimensions of the output page.
    function renderPage(
      activeServiceOnEntry,
      pdfDocument,
      pageNumber,
      size,
      printResolution,
      optionalContentConfigPromise
    ) {
      const scratchCanvas = activeService.scratchCanvas;

      // The size of the canvas in pixels for printing.
      const PRINT_UNITS = printResolution / 72.0;
      scratchCanvas.width = Math.floor(size.width * PRINT_UNITS);
      scratchCanvas.height = Math.floor(size.height * PRINT_UNITS);

      // The physical size of the img as specified by the PDF document.
      const width = Math.floor(size.width * CSS_UNITS) + "px";
      const height = Math.floor(size.height * CSS_UNITS) + "px";

      const ctx = scratchCanvas.getContext("2d");
      ctx.save();
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
      ctx.restore();

      return pdfDocument
        .getPage(pageNumber)
        .then(function (pdfPage) {
          const renderContext = {
            canvasContext: ctx,
            transform: [PRINT_UNITS, 0, 0, PRINT_UNITS, 0, 0],
            viewport: pdfPage.getViewport({ scale: 1, rotation: size.rotation }),
            intent: "print",
            annotationStorage: pdfDocument.annotationStorage,
            optionalContentConfigPromise,
          };
          return pdfPage.render(renderContext).promise;
        })
        .then(function () {
          return {
            width,
            height,
          };
        });
    }

    function PDFPrintService(
      pdfDocument,
      pagesOverview,
      printContainer,
      printResolution,
      optionalContentConfigPromise = null,
      l10n
    ) {
      this.pdfDocument = pdfDocument;
      this.pagesOverview = pagesOverview;
      this.printContainer = printContainer;
      this._printResolution = printResolution || 150;
      this._optionalContentConfigPromise =
        optionalContentConfigPromise || pdfDocument.getOptionalContentConfig();
      this.l10n = l10n || NullL10n;
      this.currentPage = -1;
      // The temporary canvas where renderPage paints one page at a time.
      this.scratchCanvas = document.createElement("canvas");
    }

    PDFPrintService.prototype = {
      layout() {
        this.throwIfInactive();

        const body = document.querySelector("body");
        body.setAttribute("data-pdfjsprinting", true);

        const hasEqualPageSizes = this.pagesOverview.every(function (size) {
          return (
            size.width === this.pagesOverview[0].width &&
            size.height === this.pagesOverview[0].height
          );
        }, this);
        if (!hasEqualPageSizes) {
          console.warn(
            "Not all pages have the same size. The printed " +
              "result may be incorrect!"
          );
        }

        // Insert a @page + size rule to make sure that the page size is correctly
        // set. Note that we assume that all pages have the same size, because
        // variable-size pages are not supported yet (e.g. in Chrome & Firefox).
        // TODO(robwu): Use named pages when size calculation bugs get resolved
        // (e.g. https://crbug.com/355116) AND when support for named pages is
        // added (http://www.w3.org/TR/css3-page/#using-named-pages).
        // In browsers where @page + size is not supported (such as Firefox,
        // https://bugzil.la/851441), the next stylesheet will be ignored and the
        // user has to select the correct paper size in the UI if wanted.
        this.pageStyleSheet = document.createElement("style");
        const pageSize = this.pagesOverview[0];
        this.pageStyleSheet.textContent =
          // "size:<width> <height>" is what we need. But also add "A4" because
          // Firefox incorrectly reports support for the other value.
          "@supports ((size:A4) and (size:1pt 1pt)) {" +
          "@page { size: " +
          pageSize.width +
          "pt " +
          pageSize.height +
          "pt;}" +
          "}";
        body.appendChild(this.pageStyleSheet);
      },

      destroy() {
        if (activeService !== this) {
          // |activeService| cannot be replaced without calling destroy() first,
          // so if it differs then an external consumer has a stale reference to
          // us.
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
            return; // overlay was already closed
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
          renderPage(
            this,
            this.pdfDocument,
            /* pageNumber = */ index + 1,
            this.pagesOverview[index],
            this._printResolution,
            this._optionalContentConfigPromise
          )
            .then(this.useRenderedPage.bind(this))
            .then(function () {
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
        if (
          "toBlob" in scratchCanvas &&
          !viewerCompatibilityParams.disableCreateObjectURL
        ) {
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
          // Push window.print in the macrotask queue to avoid being affected by
          // the deprecation of running print() code in a microtask, see
          // https://github.com/mozilla/pdf.js/issues/7547.
          setTimeout(() => {
            if (!this.active) {
              resolve();
              return;
            }
            print.call(window);
            // Delay promise resolution in case print() was not synchronous.
            setTimeout(resolve, 20); // Tidy-up.
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
      },
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
          return; // eslint-disable-line no-unsafe-finally
        }
        const activeServiceOnEntry = activeService;
        activeService
          .renderPages()
          .then(function () {
            return activeServiceOnEntry.performPrint();
          })
          .catch(function () {
            // Ignore any error messages.
          })
          .then(function () {
            // aborts acts on the "active" print request, so we need to check
            // whether the print request (activeServiceOnEntry) is still active.
            // Without the check, an unrelated print request (created after aborting
            // this print request while the pages were being generated) would be
            // aborted.
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
      const progress = Math.round((100 * index) / total);
      const progressBar = progressContainer.querySelector("progress");
      const progressPerc = progressContainer.querySelector(".relative-progress");
      progressBar.value = progress;
      l10n.get("print_progress_percent", { progress }, progress + "%").then(msg => {
        progressPerc.textContent = msg;
      });
    }

    window.addEventListener(
      "keydown",
      function (event) {
        // Intercept Cmd/Ctrl + P in all browsers.
        // Also intercept Cmd/Ctrl + Shift + P in Chrome and Opera
        if (
          event.keyCode === /* P= */ 80 &&
          (event.ctrlKey || event.metaKey) &&
          !event.altKey &&
          (!event.shiftKey || window.chrome || window.opera)
        ) {
          window.print();

          // The (browser) print dialog cannot be prevented from being shown in
          // IE11.
          event.preventDefault();
          if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
          } else {
            event.stopPropagation();
          }
        }
      },
      true
    );

    if ("onbeforeprint" in window) {
      // Do not propagate before/afterprint events when they are not triggered
      // from within this polyfill. (FF / Chrome 63+).
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
        overlayManager = PDFViewerApplication.overlayManager;
        if (!overlayManager) {
          throw new Error("The overlay manager has not yet been initialized.");
        }

        overlayPromise = overlayManager.register(
          "printServiceOverlay",
          document.getElementById("printServiceOverlay"),
          abort,
          true
        );
        document.getElementById("printCancel").onclick = abort;
      }
      return overlayPromise;
    }

    PDFPrintServiceFactory.instance = {
      supportsPrinting: true,

      createPrintService(
        pdfDocument,
        pagesOverview,
        printContainer,
        printResolution,
        optionalContentConfigPromise,
        l10n
      ) {
        if (activeService) {
          throw new Error("The print service is created and active.");
        }
        activeService = new PDFPrintService(
          pdfDocument,
          pagesOverview,
          printContainer,
          printResolution,
          optionalContentConfigPromise,
          l10n
        );
        return activeService;
      },
    };

    return { PDFPrintService };
});
define('skylark-pdfjs-viewer/viewer',[
  "./pdfjs_dev",
  "./app_options",
  "./app",
  "./genericcom",
  "./pdf_print_service"
],function(
  PDFJSDev,
  app_options,
  app
){
  /* Copyright 2016 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { AppOptions } = app_options;
  const { PDFViewerApplication } = app;

  /* eslint-disable-next-line no-unused-vars */
  const pdfjsVersion =
    typeof PDFJSDev !== "undefined" ? PDFJSDev.eval("BUNDLE_VERSION") : void 0;
  /* eslint-disable-next-line no-unused-vars */
  const pdfjsBuild =
    typeof PDFJSDev !== "undefined" ? PDFJSDev.eval("BUNDLE_BUILD") : void 0;

  window.PDFViewerApplication = PDFViewerApplication;
  window.PDFViewerApplicationOptions = AppOptions;

  if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("CHROME")) {
    var defaultUrl; // eslint-disable-line no-var

    (function rewriteUrlClosure() {
      // Run this code outside DOMContentLoaded to make sure that the URL
      // is rewritten as soon as possible.
      const queryString = document.location.search.slice(1);
      const m = /(^|&)file=([^&]*)/.exec(queryString);
      defaultUrl = m ? decodeURIComponent(m[2]) : "";

      // Example: chrome-extension://.../http://example.com/file.pdf
      const humanReadableUrl = "/" + defaultUrl + location.hash;
      history.replaceState(history.state, "", humanReadableUrl);
      if (top === window) {
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage("showPageAction");
      }
    })();
  }

  //TODO : checking
  ///if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("MOZCENTRAL")) {
  ///  require("./firefoxcom.js");
  ///  require("./firefox_print_service.js");
  ///}
  ///if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("GENERIC")) {
  ///  require("./genericcom.js");
  ///}
  ///if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("CHROME")) {
  ///  require("./chromecom.js");
  ///}
  ///if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("CHROME || GENERIC")) {
  ///  require("./pdf_print_service.js");
  ///}

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
        viewBookmark: document.getElementById("viewBookmark"),
      },
      secondaryToolbar: {
        toolbar: document.getElementById("secondaryToolbar"),
        toggleButton: document.getElementById("secondaryToolbarToggle"),
        toolbarButtonContainer: document.getElementById(
          "secondaryToolbarButtonContainer"
        ),
        presentationModeButton: document.getElementById(
          "secondaryPresentationMode"
        ),
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
        documentPropertiesButton: document.getElementById("documentProperties"),
      },
      fullscreen: {
        contextFirstPage: document.getElementById("contextFirstPage"),
        contextLastPage: document.getElementById("contextLastPage"),
        contextPageRotateCw: document.getElementById("contextPageRotateCw"),
        contextPageRotateCcw: document.getElementById("contextPageRotateCcw"),
      },
      sidebar: {
        // Divs (and sidebar button)
        outerContainer: document.getElementById("outerContainer"),
        viewerContainer: document.getElementById("viewerContainer"),
        toggleButton: document.getElementById("sidebarToggle"),
        // Buttons
        thumbnailButton: document.getElementById("viewThumbnail"),
        outlineButton: document.getElementById("viewOutline"),
        attachmentsButton: document.getElementById("viewAttachments"),
        layersButton: document.getElementById("viewLayers"),
        // Views
        thumbnailView: document.getElementById("thumbnailView"),
        outlineView: document.getElementById("outlineView"),
        attachmentsView: document.getElementById("attachmentsView"),
        layersView: document.getElementById("layersView"),
        // View-specific options
        outlineOptionsContainer: document.getElementById(
          "outlineOptionsContainer"
        ),
        currentOutlineItemButton: document.getElementById("currentOutlineItem"),
      },
      sidebarResizer: {
        outerContainer: document.getElementById("outerContainer"),
        resizer: document.getElementById("sidebarResizer"),
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
        findNextButton: document.getElementById("findNext"),
      },
      passwordOverlay: {
        overlayName: "passwordOverlay",
        container: document.getElementById("passwordOverlay"),
        label: document.getElementById("passwordText"),
        input: document.getElementById("password"),
        submitButton: document.getElementById("passwordSubmit"),
        cancelButton: document.getElementById("passwordCancel"),
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
          linearized: document.getElementById("linearizedField"),
        },
      },
      errorWrapper: {
        container: document.getElementById("errorWrapper"),
        errorMessage: document.getElementById("errorMessage"),
        closeButton: document.getElementById("errorClose"),
        errorMoreInfo: document.getElementById("errorMoreInfo"),
        moreInfoButton: document.getElementById("errorShowMore"),
        lessInfoButton: document.getElementById("errorShowLess"),
      },
      printContainer: document.getElementById("printContainer"),
      openFileInputName: "fileInput",
      debuggerScriptPath: "./debugger.js",
    };
  }

  function webViewerLoad() {
    const config = getViewerConfiguration();
    if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION")) {
        PDFViewerApplication.run(config);
    } else {
      if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("CHROME")) {
        AppOptions.set("defaultUrl", defaultUrl);
      }

      if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("GENERIC")) {
        // Give custom implementations of the default viewer a simpler way to
        // set various `AppOptions`, by dispatching an event once all viewer
        // files are loaded but *before* the viewer initialization has run.
        const event = document.createEvent("CustomEvent");
        event.initCustomEvent("webviewerloaded", true, true, {
          source: window,
        });
        try {
          // Attempt to dispatch the event at the embedding `document`,
          // in order to support cases where the viewer is embedded in
          // a *dynamically* created <iframe> element.
          parent.document.dispatchEvent(event);
        } catch (ex) {
          // The viewer could be in e.g. a cross-origin <iframe> element,
          // fallback to dispatching the event at the current `document`.
          console.error(`webviewerloaded: ${ex}`);
          document.dispatchEvent(event);
        }
      }

      PDFViewerApplication.run(config);
    }
  }


  function init() {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      webViewerLoad();
    } else {
      document.addEventListener("DOMContentLoaded", webViewerLoad, true);
    }    
  }


  return { 
    init,
    PDFViewerApplication, 
    PDFViewerApplicationOptions : AppOptions  
  };
});
define('skylark-pdfjs-viewer/main',[
	"./viewer"	
],function(viewer){
	return viewer;
});
define('skylark-pdfjs-viewer', ['skylark-pdfjs-viewer/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-pdfjs-viewer.js.map
