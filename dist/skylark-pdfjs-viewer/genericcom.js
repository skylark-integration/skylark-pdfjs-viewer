/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./pdfjs_dev","./app","./preferences","./download_manager","./genericl10n","./generic_scripting"],function(e,r,n,t,a,c){const{DefaultExternalServices:s,PDFViewerApplication:i}=r,{BasePreferences:o}=n,{DownloadManager:l}=t,{GenericL10n:d}=a,{GenericScripting:g}=c;if(void 0!==e&&!e.test("GENERIC"))throw new Error('Module "pdfjs-web/genericcom" shall not be used outside GENERIC build.');class p extends o{async _writeToStorage(e){localStorage.setItem("pdfjs.preferences",JSON.stringify(e))}async _readFromStorage(e){return JSON.parse(localStorage.getItem("pdfjs.preferences"))}}return i.externalServices=class extends s{static createDownloadManager(e){return new l}static createPreferences(){return new p}static createL10n({locale:e="en-US"}){return new d(e)}static createScripting({sandboxBundleSrc:e}){return new g(e)}},{GenericCom:{}}});
//# sourceMappingURL=sourcemaps/genericcom.js.map
