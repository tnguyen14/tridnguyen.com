define(function (require) {

	var config = require('json!config.json'),
		$ = require('jquery');

	require('validation');
	require('bxslider');
	require('fancybox');

	$(document).ready(function(){
		$("#contact input[type='submit']").on('click', function (e) {
			e.preventDefault();
			var $form = $('#contact');
			$form.validate({
				rules: {
					name: 'required',
					message: 'required',
					email: {
						required: true,
						email: true
					}
				}
			});
			if ($form.valid()) {
				// disable button to prevent double click
				$(e.target).prop('disabled', true);
				$.ajax({
					url: 'http://inspired-forms.herokuapp.com/forms/52e49f41dd1cae0200000002',
					data: $form.serialize(),
					type: 'POST',
					success: function(data, status){
						console.log(data);
						$form.html('<p>Thank you! Your message has been received. I will be in touch shortly.</p>');
					},
					error: function(error) {
						if (error) {
							$(e.target).prop('disabled', false);
							console.log(error);
						}
					}
				});
			}
		});

		// works
		$('.feature-images').each(function(){
			$(this).bxSlider({
				'prevText': '',
				'nextText': ''
			});
		});

		$('.fancybox').fancybox();

		$('.work-viewer').each(function() {
			$(this).addClass('visuallyhidden');
		});

		var $viewers = $('.work-viewer');

		$('.work-single').click(function() {
			var slug = $(this).data('work'),
				$viewer = $('#' + slug);

			$('.work-single').not(this).removeClass('active');
			$(this).addClass('active');

			$viewers.not('#' + slug).removeClass('active').addClass('visuallyhidden');
			$viewer.toggleClass('active').toggleClass('visuallyhidden');
		});
		$('.closeicon').click(function() {
			$viewers.removeClass('active').addClass('visuallyhidden');

		})
	});
});