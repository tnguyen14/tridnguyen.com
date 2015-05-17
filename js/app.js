/* global define, page */
define(function (require) {
	'use strict';
	var config = require('json!config.json');
	var configDev = require('json!config-dev.json');
	var $ = require('jquery');
	var _ = require('lodash');

	require('validation');
	require('bxslider');
	require('fancybox');

	if (page.env === 'dev') {
		_.extend(config, configDev);
	}

	$(document).ready(function () {
		$('#contact input[type="submit"]').on('click', function (e) {
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
					success: function () {
						$form.html('<p>Thank you! Your message has been received. I will be in touch shortly.</p>');
					},
					error: function(error) {
						if (error) {
							$(e.target).prop('disabled', false);
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
		});
	});
});