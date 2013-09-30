define(function (require) {

	var config = require('json!config.json'),
		$ = require('jquery'),
		Prism = require('prism');

	require('validation');
	require('bxslider');
	require('fancybox');

	$(document).ready(function(){
		Prism.highlightAll();
		$('#contact input[type="submit"]').click(function(){
			var $form = $('#contact');
			$form.validate({
				rules: {
					name: "required",
					message: "required",
					email: {
						required: true,
						email: true
					}
				}
			})
			if ($form.valid()) {
				$.ajax({
					url: "http://inspired-forms.herokuapp.com/forms/1",
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
			}
			return false;
		});

		// works
		$(".feature-images").each(function(){
			$(this).bxSlider({
				'prevText': '',
				'nextText': ''
			});
		});

		$(".fancybox").fancybox();

		$(".work-viewer").each(function() {
			$(this).addClass('visuallyhidden');
		});

		$(".work-single").click(function() {
			var slug = $(this).data('work');
			$(".work-viewer").each(function() {
				if ($(this).data('work') === slug) {
					$(this).addClass('active').removeClass('visuallyhidden');
				} else {
					$(this).removeClass('active').addClass('visuallyhidden');
				}
			})
		});
		$(".closeicon").click(function() {
			$(".work-viewer").each(function() {
				$(this).removeClass('active').addClass('visuallyhidden');
			})
		})
	});
});