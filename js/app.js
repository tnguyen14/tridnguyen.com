/* global page, jQuery */

var $ = jQuery;

require('fancybox')($);

$(document).ready(function () {
	$('#contact').on('submit', function (e) {
		e.preventDefault();
		var $form = $(this);
		var $button = $form.find('input[type="submit"]');
		// disable button to prevent double click
		$button.prop('disabled', true);
		$.ajax({
			url: 'https://api.tridnguyen.com/forms/52e49f41dd1cae0200000002',
			data: $form.serialize(),
			type: 'POST',
			success: function () {
				$form.html('<p>Thank you! Your message has been received. I will be in touch shortly.</p>');
			},
			error: function (error) {
				if (error) {
					$button.prop('disabled', false);
				}
			}
		});
	});
});
