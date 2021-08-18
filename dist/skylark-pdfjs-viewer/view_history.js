/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./pdfjs_dev"],function(i){const t=20;return{ViewHistory:class{constructor(i,e=t){this.fingerprint=i,this.cacheSize=e,this._initializedPromise=this._readFromStorage().then(i=>{const t=JSON.parse(i||"{}");let e=-1;if(Array.isArray(t.files)){for(;t.files.length>=this.cacheSize;)t.files.shift();for(let i=0,s=t.files.length;i<s;i++)if(t.files[i].fingerprint===this.fingerprint){e=i;break}}else t.files=[];-1===e&&(e=t.files.push({fingerprint:this.fingerprint})-1),this.file=t.files[e],this.database=t})}async _writeToStorage(){const t=JSON.stringify(this.database);void 0!==i&&i.test("MOZCENTRAL")?sessionStorage.setItem("pdfjs.history",t):localStorage.setItem("pdfjs.history",t)}async _readFromStorage(){return void 0!==i&&i.test("MOZCENTRAL")?sessionStorage.getItem("pdfjs.history"):localStorage.getItem("pdfjs.history")}async set(i,t){return await this._initializedPromise,this.file[i]=t,this._writeToStorage()}async setMultiple(i){await this._initializedPromise;for(const t in i)this.file[t]=i[t];return this._writeToStorage()}async get(i,t){await this._initializedPromise;const e=this.file[i];return void 0!==e?e:t}async getMultiple(i){await this._initializedPromise;const t=Object.create(null);for(const e in i){const s=this.file[e];t[e]=void 0!==s?s:i[e]}return t}}}});
//# sourceMappingURL=sourcemaps/view_history.js.map
