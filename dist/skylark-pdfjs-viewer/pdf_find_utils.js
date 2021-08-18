/**
 * skylark-pdfjs-viewer - A version of video.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define([],function(){const T={SPACE:0,ALPHA_LETTER:1,PUNCT:2,HAN_LETTER:3,KATAKANA_LETTER:4,HIRAGANA_LETTER:5,HALFWIDTH_KATAKANA_LETTER:6,THAI_LETTER:7};return{CharacterType:T,getCharacterType:function(A){return function(T){return T<11904}(A)?function(T){return 0==(65408&T)}(A)?function(T){return 32===T||9===T||13===T||10===T}(A)?T.SPACE:function(T){return T>=97&&T<=122||T>=65&&T<=90}(A)||function(T){return T>=48&&T<=57}(A)||95===A?T.ALPHA_LETTER:T.PUNCT:function(T){return 3584==(65408&T)}(A)?T.THAI_LETTER:160===A?T.SPACE:T.ALPHA_LETTER:function(T){return T>=13312&&T<=40959||T>=63744&&T<=64255}(A)?T.HAN_LETTER:function(T){return T>=12448&&T<=12543}(A)?T.KATAKANA_LETTER:function(T){return T>=12352&&T<=12447}(A)?T.HIRAGANA_LETTER:function(T){return T>=65376&&T<=65439}(A)?T.HALFWIDTH_KATAKANA_LETTER:T.ALPHA_LETTER}}});
//# sourceMappingURL=sourcemaps/pdf_find_utils.js.map
