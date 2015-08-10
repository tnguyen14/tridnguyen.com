'use strict';

function getPage (page, options) {
	/* jshint validthis:true */
	return options.fn(this[page]['index.html']);
}
module.exports = getPage;
