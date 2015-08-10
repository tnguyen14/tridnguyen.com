'use strict';

function isEqual (a, b, options) {
	/* jshint validthis:true */
	if (a === b) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
}
module.exports = isEqual;
