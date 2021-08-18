define([],function(){
	function evalInScope(js, contextAsScope) {
	    //# Return the results of the in-line anonymous function we .call with the passed context
	    return function() { with(this) { return eval(js); }; }.call(contextAsScope);
	}


	var DEFINES = {
	  BUNDLE_VERSION : "2.7.570",
	  BUNDLE_BUILD : 0,
	  PRODUCTION: true,
	  SKIP_BABEL: true,
	  TESTING: false,
	  // The main build targets:
	  GENERIC: true,
	  MOZCENTRAL: false,
	  CHROME: false,
	  MINIFIED: false,
	  COMPONENTS: false,
	  LIB: false,
	  IMAGE_DECODERS: false,
	};


	return   {
		DEFINES,

		eval(s) {
			return evalInScope(s,DEFINES);
		},


		test(s) {
			return !!evalInScope(s,DEFINES);

		}


	}

});