'use strict';

var Handlebars = require('handlebars');

// step into an object
// @param steps equals the number of levels to go depeer in the object
function step (steps, options) {
	/* jshint validthis:true */
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			if (steps === 1) {
				return options.fn(this[key]);
			} else {
				step(steps - 1);
			}
		}
	}
}
Handlebars.registerHelper('step', step);
