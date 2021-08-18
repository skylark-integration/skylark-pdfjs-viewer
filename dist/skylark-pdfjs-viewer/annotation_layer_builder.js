/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-pdfjs-display","./ui_utils","./pdf_link_service"],function(e,t,i){const{AnnotationLayer:n}=e,{NullL10n:a}=t,{SimpleLinkService:s}=i;class r{constructor({pageDiv:e,pdfPage:t,linkService:i,downloadManager:n,annotationStorage:s=null,imageResourcesPath:r="",renderInteractiveForms:o=!0,l10n:l=a,enableScripting:d=!1,hasJSActionsPromise:h=null,mouseState:c=null}){this.pageDiv=e,this.pdfPage=t,this.linkService=i,this.downloadManager=n,this.imageResourcesPath=r,this.renderInteractiveForms=o,this.l10n=l,this.annotationStorage=s,this.enableScripting=d,this._hasJSActionsPromise=h,this._mouseState=c,this.div=null,this._cancelled=!1}render(e,t="display"){return Promise.all([this.pdfPage.getAnnotations({intent:t}),this._hasJSActionsPromise]).then(([t,i=!1])=>{if(this._cancelled)return;if(0===t.length)return;const a={viewport:e.clone({dontFlip:!0}),div:this.div,annotations:t,page:this.pdfPage,imageResourcesPath:this.imageResourcesPath,renderInteractiveForms:this.renderInteractiveForms,linkService:this.linkService,downloadManager:this.downloadManager,annotationStorage:this.annotationStorage,enableScripting:this.enableScripting,hasJSActions:i,mouseState:this._mouseState};this.div?n.update(a):(this.div=document.createElement("div"),this.div.className="annotationLayer",this.pageDiv.appendChild(this.div),a.div=this.div,n.render(a),this.l10n.translate(this.div))})}cancel(){this._cancelled=!0}hide(){this.div&&this.div.setAttribute("hidden","true")}}return{AnnotationLayerBuilder:r,DefaultAnnotationLayerFactory:class{createAnnotationLayerBuilder(e,t,i=null,n="",o=!0,l=a,d=!1,h=null,c=null){return new r({pageDiv:e,pdfPage:t,imageResourcesPath:n,renderInteractiveForms:o,linkService:new s,l10n:l,annotationStorage:i,enableScripting:d,hasJSActionsPromise:h,mouseState:c})}}}});
//# sourceMappingURL=sourcemaps/annotation_layer_builder.js.map
