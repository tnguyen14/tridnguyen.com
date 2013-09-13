define(function (require) {

	var config = require('json!config.json'),
		$ = require('jquery'),
		Prism = require('prism');

	$(document).ready(function(){
		Prism.highlightAll();
		$('#contact input[type="submit"]').click(function(){
			return false;
		});
	});
});