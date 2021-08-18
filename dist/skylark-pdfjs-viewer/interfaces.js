/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define([],function(){return{IL10n:class{async getLanguage(){}async getDirection(){}async get(e,t,a){}async translate(e){}},IPDFAnnotationLayerFactory:class{createAnnotationLayerBuilder(e,t,a=null,n="",s=!0,r,i=!1,g=null,l=null){}},IPDFHistory:class{initialize({fingerprint:e,resetHistory:t=!1,updateUrl:a=!1}){}reset(){}push({namedDest:e=null,explicitDest:t,pageNumber:a}){}pushPage(e){}pushCurrentPosition(){}back(){}forward(){}},IPDFLinkService:class{get pagesCount(){}get page(){}set page(e){}get rotation(){}set rotation(e){}get externalLinkEnabled(){}set externalLinkEnabled(e){}async goToDestination(e){}goToPage(e){}getDestinationHash(e){}getAnchorUrl(e){}setHash(e){}executeNamedAction(e){}cachePageRef(e,t){}isPageVisible(e){}isPageCached(e){}},IPDFTextLayerFactory:class{createTextLayerBuilder(e,t,a,n=!1,s){}},IRenderableView:class{get renderingId(){}get renderingState(){}draw(){}resume(){}}}});
//# sourceMappingURL=sourcemaps/interfaces.js.map
