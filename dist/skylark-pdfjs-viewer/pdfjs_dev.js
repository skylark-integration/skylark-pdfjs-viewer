/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define([],function(){function evalInScope(js,contextAsScope){return function(){with(this)return eval(js)}.call(contextAsScope)}var DEFINES={BUNDLE_VERSION:"2.7.570",BUNDLE_BUILD:0,PRODUCTION:!0,SKIP_BABEL:!0,TESTING:!1,GENERIC:!0,MOZCENTRAL:!1,CHROME:!1,MINIFIED:!1,COMPONENTS:!1,LIB:!1,IMAGE_DECODERS:!1};return{DEFINES:DEFINES,eval:E=>evalInScope(E,DEFINES),test:E=>!!evalInScope(E,DEFINES)}});
//# sourceMappingURL=sourcemaps/pdfjs_dev.js.map
