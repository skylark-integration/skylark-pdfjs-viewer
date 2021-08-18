/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./pdfjs_dev"],function(e){const t=Object.create(null);if(void 0===e||e.test("GENERIC")){const e="undefined"!=typeof navigator&&navigator.userAgent||"",a="undefined"!=typeof navigator&&navigator.platform||"",i="undefined"!=typeof navigator&&navigator.maxTouchPoints||1,n=/Android/.test(e),o=/\b(iPad|iPhone|iPod)(?=;)/.test(e)||"MacIntel"===a&&i>1;/CriOS/.test(e)&&(t.disableCreateObjectURL=!0),(o||n)&&(t.maxCanvasPixels=5242880)}return{viewerCompatibilityParams:Object.freeze(t)}});
//# sourceMappingURL=sourcemaps/viewer_compatibility.js.map
