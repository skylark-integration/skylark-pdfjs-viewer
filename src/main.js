define([
	"skylark-langx/skylark",
	"./viewer"
],function(skylark,viewer) {
	return skylark.attach("intg.pdfjs.viewer",viewer);
})