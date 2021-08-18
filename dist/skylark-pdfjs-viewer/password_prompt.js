/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-pdfjs-display","./ui_utils"],function(t,e){const{NullL10n:s}=e,{PasswordResponses:i}=t;return{PasswordPrompt:class{constructor(t,e,i=s){this.overlayName=t.overlayName,this.container=t.container,this.label=t.label,this.input=t.input,this.submitButton=t.submitButton,this.cancelButton=t.cancelButton,this.overlayManager=e,this.l10n=i,this.updateCallback=null,this.reason=null,this.submitButton.addEventListener("click",this.verify.bind(this)),this.cancelButton.addEventListener("click",this.close.bind(this)),this.input.addEventListener("keydown",t=>{13===t.keyCode&&this.verify()}),this.overlayManager.register(this.overlayName,this.container,this.close.bind(this),!0)}open(){this.overlayManager.open(this.overlayName).then(()=>{let t;this.input.focus(),(t=this.reason===i.INCORRECT_PASSWORD?this.l10n.get("password_invalid",null,"Invalid password. Please try again."):this.l10n.get("password_label",null,"Enter the password to open this PDF file.")).then(t=>{this.label.textContent=t})})}close(){this.overlayManager.close(this.overlayName).then(()=>{this.input.value=""})}verify(){const t=this.input.value;t&&t.length>0&&(this.close(),this.updateCallback(t))}setUpdateCallback(t,e){this.updateCallback=t,this.reason=e}}}});
//# sourceMappingURL=sourcemaps/password_prompt.js.map
