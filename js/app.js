define(function (require) {

	var config = require('json!config.json'),
		$ = require('jquery');

	console.log(config);

	$(document).ready(function(){
		$('#contact input[type="submit"]').click(function(){
			return false;
		})
	});
});