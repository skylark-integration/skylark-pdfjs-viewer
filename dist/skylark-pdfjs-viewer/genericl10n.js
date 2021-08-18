/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./l10n"],function(t){return{GenericL10n:class{constructor(e){this._lang=e,this._ready=new Promise((a,n)=>{t.setLanguage(e,()=>{a(t)})})}async getLanguage(){return(await this._ready).getLanguage()}async getDirection(){return(await this._ready).getDirection()}async get(t,e,a){return(await this._ready).get(t,e,a)}async translate(t){return(await this._ready).translate(t)}}}});
//# sourceMappingURL=sourcemaps/genericl10n.js.map
