// Display date
// @param {String} format of the desired output, see momentjs date format http://momentjs.com/docs/#/displaying/format/
// @param {String|Object} a date string (http://momentjs.com/docs/#/parsing/string/) or momentjs date object
// @return {String} the date string in the desired format

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['components/moment/moment'], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(require('moment'));
	} else {
		// Browser globals (root is window)
		root.returnExports = factory(root.moment);
	}
}(this, function (moment) {
	//use b in some fashion.

	// Just return a value to define the module export.
	// This example returns an object, but the module
	// can return a function as the exported value.
	return function (formatStr, date) {
		var momentDate;
		if (!date) {
			throw new Error('Invalid date param.');
		}
		if ((date && date.data)) {
			momentDate = moment();
		} else {
			// if the date passed in is not a moment type, convert it to moment
			// otherwise use it
			if (!moment.isMoment(date)) {
				momentDate = moment(date);
				// if the date parsing fails
				if (!momentDate.isValid()) {
					throw new Error('The date passed in is invalid');
				}
			} else {
				momentDate = date;
			}
		}

		return momentDate.format(formatStr);
	};
}));
