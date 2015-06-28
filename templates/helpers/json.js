'use strict';

var Handlebars = require('handlebars');

/**
 * @description convert object into JSON string
 * @param object to be stringified
 **/

function json (object) {
	return JSON.stringify(object);
}
Handlebars.registerHelper('json', json);
