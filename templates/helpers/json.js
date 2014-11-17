/**
 * @description convert object into JSON string
 * @param object to be stringified
 **/

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['hbs/handlebars'], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(require('handlebars'));
	} else {
		// Browser globals (root is window)
		root.returnExports = factory();
  }
}(this, function (Handlebars) {

	// Just return a value to define the module export.
	// This example returns an object, but the module
	// can return a function as the exported value.
	function json (object, options) {
		return JSON.stringify(object);
	};
	Handlebars.registerHelper('json', json);
	return json;
}));