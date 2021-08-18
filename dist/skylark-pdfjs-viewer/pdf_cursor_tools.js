/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./ui_utils","./grab_to_pan"],function(t,e){const{GrabToPan:s}=e,{PresentationModeState:o}=t,i={SELECT:0,HAND:1,ZOOM:2};return{CursorTool:i,PDFCursorTools:class{constructor({container:t,eventBus:e,cursorToolOnLoad:o=i.SELECT}){this.container=t,this.eventBus=e,this.active=i.SELECT,this.activeBeforePresentationMode=null,this.handTool=new s({element:this.container}),this._addEventListeners(),Promise.resolve().then(()=>{this.switchTool(o)})}get activeTool(){return this.active}switchTool(t){if(null!==this.activeBeforePresentationMode)return;if(t===this.active)return;const e=()=>{switch(this.active){case i.SELECT:break;case i.HAND:this.handTool.deactivate();break;case i.ZOOM:}};switch(t){case i.SELECT:e();break;case i.HAND:e(),this.handTool.activate();break;case i.ZOOM:default:return void console.error(`switchTool: "${t}" is an unsupported value.`)}this.active=t,this._dispatchEvent()}_dispatchEvent(){this.eventBus.dispatch("cursortoolchanged",{source:this,tool:this.active})}_addEventListeners(){this.eventBus._on("switchcursortool",t=>{this.switchTool(t.tool)}),this.eventBus._on("presentationmodechanged",t=>{switch(t.state){case o.CHANGING:break;case o.FULLSCREEN:{const t=this.active;this.switchTool(i.SELECT),this.activeBeforePresentationMode=t;break}case o.NORMAL:{const t=this.activeBeforePresentationMode;this.activeBeforePresentationMode=null,this.switchTool(t);break}}})}}}});
//# sourceMappingURL=sourcemaps/pdf_cursor_tools.js.map
