'use strict';

var Handlebars = require('handlebars');

function isEqual (a, b, options) {
	/* jshint validthis:true */
	if (a === b) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
}
Handlebars.registerHelper('isEqual', isEqual);

