/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-pdfjs-display"],function(a){const{loadScript:n}=a;return{GenericScripting:class{constructor(a){this._ready=n(a,!0).then(()=>window.pdfjsSandbox.QuickJSSandbox())}async createSandbox(a){(await this._ready).create(a)}async dispatchEventInSandbox(a){(await this._ready).dispatchEvent(a)}async destroySandbox(){(await this._ready).nukeSandbox()}}}});
//# sourceMappingURL=sourcemaps/generic_scripting.js.map
