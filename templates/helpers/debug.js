'use strict';
var Handlebars = require('handlebars');

function debug (stuff) {
	console.log(stuff);
}
Handlebars.registerHelper('debug', debug);
return debug;
