/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./ui_utils","./pdf_thumbnail_view","./pdf_rendering_queue"],function(e,t,i){const{getVisibleElements:s,isValidRotation:n,NullL10n:a,scrollIntoView:r,watchScroll:l}=e,{PDFThumbnailView:h,TempImageFactory:o}=t,{RenderingStates:u}=i,g=-19,c="selected";return{PDFThumbnailViewer:class{constructor({container:e,eventBus:t,linkService:i,renderingQueue:s,l10n:n=a}){this.container=e,this.linkService=i,this.renderingQueue=s,this.l10n=n,this.scroll=l(this.container,this._scrollUpdated.bind(this)),this._resetView(),t._on("optionalcontentconfigchanged",()=>{this._setImageDisabled=!0})}_scrollUpdated(){this.renderingQueue.renderHighestPriority()}getThumbnail(e){return this._thumbnails[e]}_getVisibleThumbs(){return s({scrollEl:this.container,views:this._thumbnails})}scrollThumbnailIntoView(e){if(!this.pdfDocument)return;const t=this._thumbnails[e-1];if(!t)return void console.error('scrollThumbnailIntoView: Invalid "pageNumber" parameter.');e!==this._currentPageNumber&&(this._thumbnails[this._currentPageNumber-1].div.classList.remove(c),t.div.classList.add(c));const i=this._getVisibleThumbs(),s=i.views.length;if(s>0){const n=i.first.id,a=s>1?i.last.id:n;let l=!1;e<=n||e>=a?l=!0:i.views.some(function(t){return t.id===e&&(l=t.percent<100,!0)}),l&&r(t.div,{top:g})}this._currentPageNumber=e}get pagesRotation(){return this._pagesRotation}set pagesRotation(e){if(!n(e))throw new Error("Invalid thumbnails rotation angle.");if(this.pdfDocument&&this._pagesRotation!==e){this._pagesRotation=e;for(let t=0,i=this._thumbnails.length;t<i;t++)this._thumbnails[t].update(e)}}cleanup(){for(let e=0,t=this._thumbnails.length;e<t;e++)this._thumbnails[e]&&this._thumbnails[e].renderingState!==u.FINISHED&&this._thumbnails[e].reset();o.destroyCanvas()}_resetView(){this._thumbnails=[],this._currentPageNumber=1,this._pageLabels=null,this._pagesRotation=0,this._optionalContentConfigPromise=null,this._pagesRequests=new WeakMap,this._setImageDisabled=!1,this.container.textContent=""}setDocument(e){if(this.pdfDocument&&(this._cancelRendering(),this._resetView()),this.pdfDocument=e,!e)return;const t=e.getPage(1),i=e.getOptionalContentConfig();t.then(t=>{this._optionalContentConfigPromise=i;const s=e.numPages,n=t.getViewport({scale:1}),a=()=>this._setImageDisabled;for(let e=1;e<=s;++e){const t=new h({container:this.container,id:e,defaultViewport:n.clone(),optionalContentConfigPromise:i,linkService:this.linkService,renderingQueue:this.renderingQueue,checkSetImageDisabled:a,disableCanvasToImageConversion:!1,l10n:this.l10n});this._thumbnails.push(t)}const r=this._thumbnails[0];r&&r.setPdfPage(t),this._thumbnails[this._currentPageNumber-1].div.classList.add(c)}).catch(e=>{console.error("Unable to initialize thumbnail viewer",e)})}_cancelRendering(){for(let e=0,t=this._thumbnails.length;e<t;e++)this._thumbnails[e]&&this._thumbnails[e].cancelRendering()}setPageLabels(e){if(this.pdfDocument){e?Array.isArray(e)&&this.pdfDocument.numPages===e.length?this._pageLabels=e:(this._pageLabels=null,console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.")):this._pageLabels=null;for(let e=0,t=this._thumbnails.length;e<t;e++){const t=this._pageLabels&&this._pageLabels[e];this._thumbnails[e].setPageLabel(t)}}}_ensurePdfPageLoaded(e){if(e.pdfPage)return Promise.resolve(e.pdfPage);if(this._pagesRequests.has(e))return this._pagesRequests.get(e);const t=this.pdfDocument.getPage(e.id).then(t=>(e.pdfPage||e.setPdfPage(t),this._pagesRequests.delete(e),t)).catch(t=>{console.error("Unable to get page for thumb view",t),this._pagesRequests.delete(e)});return this._pagesRequests.set(e,t),t}forceRendering(){const e=this._getVisibleThumbs(),t=this.renderingQueue.getHighestPriority(e,this._thumbnails,this.scroll.down);return!!t&&(this._ensurePdfPageLoaded(t).then(()=>{this.renderingQueue.renderView(t)}),!0)}}}});
//# sourceMappingURL=sourcemaps/pdf_thumbnail_viewer.js.map
