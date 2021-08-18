/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./pdfjs_dev","./ui_utils","./annotation_layer_builder","./text_layer_builder","./pdf_link_service","./download_manager","./genericl10n","./pdf_find_controller","./pdf_history","./pdf_page_view","./pdf_single_page_viewer","./pdf_viewer"],function(e,r,n,i,a,t,l,o,d,D,_,L){const{AnnotationLayerBuilder:u,DefaultAnnotationLayerFactory:F}=n,{DefaultTextLayerFactory:P,TextLayerBuilder:y}=i,{EventBus:c,NullL10n:g,ProgressBar:f}=r,{PDFLinkService:s,SimpleLinkService:v}=a,{DownloadManager:w}=t,{GenericL10n:p}=l,{PDFFindController:B}=o,{PDFHistory:S}=d,{PDFPageView:V}=D,{PDFSinglePageViewer:k}=_,{PDFViewer:x}=L;e.eval("BUNDLE_VERSION"),e.eval("BUNDLE_BUILD");return{AnnotationLayerBuilder:u,DefaultAnnotationLayerFactory:F,DefaultTextLayerFactory:P,DownloadManager:w,EventBus:c,GenericL10n:p,NullL10n:g,PDFFindController:B,PDFHistory:S,PDFLinkService:s,PDFPageView:V,PDFSinglePageViewer:k,PDFViewer:x,ProgressBar:f,SimpleLinkService:v,TextLayerBuilder:y}});
//# sourceMappingURL=sourcemaps/pdf_viewer.component.js.map
