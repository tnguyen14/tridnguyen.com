'use strict';

var Handlebars = require('handlebars');

function getPage (page, options) {
	/* jshint validthis:true */
	return options.fn(this[page]['index.html']);
}
Handlebars.registerHelper(getPage);
