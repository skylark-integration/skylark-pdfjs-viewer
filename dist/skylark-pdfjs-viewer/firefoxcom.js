/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-pdfjs-display","./pdfjs_dev","./ui_utils","./app","./preferences"],function(e,t,n,s,o){const{DefaultExternalServices:r,PDFViewerApplication:a}=s,{PDFDataRangeTransport:i,shadow:c}=e,{BasePreferences:d}=o,{DEFAULT_SCALE_VALUE:u}=n;if(void 0===t||!t.test("MOZCENTRAL"))throw new Error('Module "./firefoxcom.js" shall not be used outside MOZCENTRAL builds.');class l{static requestSync(e,t){const n=document.createTextNode("");document.documentElement.appendChild(n);const s=document.createEvent("CustomEvent");s.initCustomEvent("pdf.js.message",!0,!1,{action:e,data:t,sync:!0}),n.dispatchEvent(s);const o=s.detail.response;return n.remove(),o}static requestAsync(e,t){return new Promise(n=>{this.request(e,t,n)})}static request(e,t,n=null){const s=document.createTextNode("");n&&s.addEventListener("pdf.js.response",e=>{const t=e.detail.response;e.target.remove(),n(t)},{once:!0}),document.documentElement.appendChild(s);const o=document.createEvent("CustomEvent");o.initCustomEvent("pdf.js.message",!0,!1,{action:e,data:t,sync:!1,responseExpected:!!n}),s.dispatchEvent(o)}}class p{downloadUrl(e,t){l.request("download",{originalUrl:e,filename:t})}downloadData(e,t,n){const s=URL.createObjectURL(new Blob([e],{type:n}));l.requestAsync("download",{blobUrl:s,originalUrl:s,filename:t,isAttachment:!0}).then(e=>{URL.revokeObjectURL(s)})}download(e,t,n,s="download"){const o=URL.createObjectURL(e);l.requestAsync("download",{blobUrl:o,originalUrl:t,filename:n,sourceEventType:s}).then(e=>{e&&console.error("`ChromeActions.download` failed."),URL.revokeObjectURL(o)})}}class g extends d{async _writeToStorage(e){return l.requestAsync("setPreferences",e)}async _readFromStorage(e){const t=await l.requestAsync("getPreferences",e);return JSON.parse(t)}}class f{constructor(e){this.mozL10n=e}async getLanguage(){return this.mozL10n.getLanguage()}async getDirection(){return this.mozL10n.getDirection()}async get(e,t,n){return this.mozL10n.get(e,t,n)}async translate(e){this.mozL10n.translate(e)}}!function(){const e=["find","findagain","findhighlightallchange","findcasesensitivitychange","findentirewordchange","findbarclose"],t=function({type:e,detail:t}){a.initialized&&("findbarclose"!==e?a.eventBus.dispatch("find",{source:window,type:e.substring("find".length),query:t.query,phraseSearch:!0,caseSensitive:!!t.caseSensitive,entireWord:!!t.entireWord,highlightAll:!!t.highlightAll,findPrevious:!!t.findPrevious}):a.eventBus.dispatch(e,{source:window}))};for(const n of e)window.addEventListener(n,t)}(),function(){const e=["zoomin","zoomout","zoomreset"],t=function({type:e,detail:t}){a.initialized&&("zoomreset"===e&&a.pdfViewer.currentScaleValue===u||a.eventBus.dispatch(e,{source:window}))};for(const n of e)window.addEventListener(n,t)}(),window.addEventListener("save",function({type:e,detail:t}){a.initialized&&a.eventBus.dispatch(e,{source:window})});class h extends i{requestDataRange(e,t){l.request("requestDataRange",{begin:e,end:t})}abort(){l.requestSync("abortLoading",null)}}class m{static async createSandbox(e){if(!await l.requestAsync("createSandbox",e))throw new Error("Cannot create sandbox.")}static async dispatchEventInSandbox(e){l.request("dispatchEventInSandbox",e)}static async destroySandbox(){l.request("destroySandbox",null)}}return a.externalServices=class extends r{static updateFindControlState(e){l.request("updateFindControlState",e)}static updateFindMatchesCount(e){l.request("updateFindMatchesCount",e)}static initPassiveLoading(e){let t;window.addEventListener("message",function(n){if(null!==n.source)return void console.warn("Rejected untrusted message from "+n.origin);const s=n.data;if("object"==typeof s&&"pdfjsLoadAction"in s)switch(s.pdfjsLoadAction){case"supportsRangedLoading":t=new h(s.length,s.data,s.done),e.onOpenWithTransport(s.pdfUrl,s.length,t);break;case"range":t.onDataRange(s.begin,s.chunk);break;case"rangeProgress":t.onDataProgress(s.loaded);break;case"progressiveRead":t.onDataProgressiveRead(s.chunk),t.onDataProgress(s.loaded,s.total);break;case"progressiveDone":t&&t.onDataProgressiveDone();break;case"progress":e.onProgress(s.loaded,s.total);break;case"complete":if(!s.data){e.onError(s.errorCode);break}e.onOpenWithData(s.data)}}),l.requestSync("initPassiveLoading",null)}static async fallback(e){return l.requestAsync("fallback",e)}static reportTelemetry(e){l.request("reportTelemetry",JSON.stringify(e))}static createDownloadManager(e){return new p}static createPreferences(){return new g}static createL10n(e){const t=document.mozL10n;return new f(t)}static createScripting(e){return m}static get supportsIntegratedFind(){const e=l.requestSync("supportsIntegratedFind");return c(this,"supportsIntegratedFind",e)}static get supportsDocumentFonts(){const e=l.requestSync("supportsDocumentFonts");return c(this,"supportsDocumentFonts",e)}static get supportedMouseWheelZoomModifierKeys(){const e=l.requestSync("supportedMouseWheelZoomModifierKeys");return c(this,"supportedMouseWheelZoomModifierKeys",e)}static get isInAutomation(){const e=l.requestSync("isInAutomation");return c(this,"isInAutomation",e)}},document.mozL10n.setExternalLocalizerServices({getLocale:()=>l.requestSync("getLocale",null),getStrings:e=>l.requestSync("getStrings",e)}),{DownloadManager:p,FirefoxCom:l}});
//# sourceMappingURL=sourcemaps/firefoxcom.js.map
