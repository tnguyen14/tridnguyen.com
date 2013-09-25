define(function (require) {

	var config = require('json!config.json'),
		$ = require('jquery'),
		Prism = require('prism');

	$(document).ready(function(){
		Prism.highlightAll();
		$('#contact input[type="submit"]').click(function(){
			var $form = $('#contact');
			$.ajax({
				url: "http://localhost:3000/forms/2",
				data: $form.serialize(),
				type: "POST",
				success: function(data, status){
					console.log(data);
					$form.html('Thank you! Your message has been received.');
				},
				error: function(error) {
					if (error) {
						console.log(error);
					}
				}
			});
			return false;
		});
	});
});