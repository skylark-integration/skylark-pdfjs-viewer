/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-pdfjs-display","./ui_utils","./base_viewer"],function(e,t,i){const{ScrollMode:s,SpreadMode:r}=t,{BaseViewer:n}=i,{shadow:o}=e;return{PDFViewer:class extends n{get _viewerElement(){return o(this,"_viewerElement",this.viewer)}_scrollIntoView({pageDiv:e,pageSpot:t=null,pageNumber:i=null}){if(!t&&!this.isInPresentationMode){const i=e.offsetLeft+e.clientLeft,s=i+e.clientWidth,{scrollLeft:r,clientWidth:n}=this.container;(this._isScrollModeHorizontal||i<r||s>r+n)&&(t={left:0,top:0})}super._scrollIntoView({pageDiv:e,pageSpot:t,pageNumber:i})}_getVisiblePages(){return this.isInPresentationMode?this._getCurrentVisiblePage():super._getVisiblePages()}_updateHelper(e){if(this.isInPresentationMode)return;let t=this._currentPageNumber,i=!1;for(const n of e){if(n.percent<100)break;if(n.id===t&&this._scrollMode===s.VERTICAL&&this._spreadMode===r.NONE){i=!0;break}}i||(t=e[0].id),this._setCurrentPageNumber(t)}}}});
//# sourceMappingURL=sourcemaps/pdf_viewer.js.map
