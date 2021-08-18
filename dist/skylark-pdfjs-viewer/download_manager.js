/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-pdfjs-display","./pdfjs_dev","./viewer_compatibility"],function(e,o,a){const{createObjectURL:d,createValidAbsoluteUrl:t}=e,{viewerCompatibilityParams:n}=a;if(void 0!==o&&!o.test("CHROME || GENERIC"))throw new Error('Module "pdfjs-web/download_manager" shall not be used outside CHROME and GENERIC builds.');function l(e,o){const a=document.createElement("a");if(!a.click)throw new Error('DownloadManager: "a.click()" is not supported.');a.href=e,a.target="_parent","download"in a&&(a.download=o),(document.body||document.documentElement).appendChild(a),a.click(),a.remove()}return{DownloadManager:class{downloadUrl(e,o){t(e,"http://example.com")&&l(e+"#pdfjs.action=download",o)}downloadData(e,o,a){l(d(e,a,n.disableCreateObjectURL),o)}download(e,o,a,d="download"){n.disableCreateObjectURL?this.downloadUrl(o,a):l(URL.createObjectURL(e),a)}}}});
//# sourceMappingURL=sourcemaps/download_manager.js.map
