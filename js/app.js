define(function (require) {

	var config = require('json!config.json'),
		$ = require('jquery');

	require('validation');
	require('bxslider');
	require('fancybox');

	var articleTemplate = require('hbs!templates/partials/article'),
		feedTemplate = require('hbs!templates/partials/feed');

	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	var currentPage = +getParameterByName('page') || 1;

	// get all the posts for the current page
	// baed on posts_per_page
	var getPosts = function () {
		$.ajax('http://tringuyen.dev/wp-json/posts', {
			data: {
				filter: {
					posts_per_page: getParameterByName('posts_per_page') || 5
				},
				page: currentPage
			},
			success: function (data) {
				$('.main-content').append(feedTemplate({
					posts: data,
					prevPage: (data.length === 0) ? undefined : currentPage + 1, // if receive no more posts, do not go back any further
					nextPage: (currentPage === 1) ? undefined : currentPage - 1
				}));
			}
		});
	}

	var getPost = function (slug) {
		if (!slug) { return; }
		$.ajax('http://tringuyen.dev/wp-json/posts', {
			data: {
				filter: {
					name: slug
				}
			},
			success: function (data) {
				$('.main-content').append(articleTemplate(data[0]));
			}
		});
	}

	$(document).ready(function () {
		switch (page.context) {
			case 'main':
				getPosts();
				break;
			case 'post':
				getPost(page.slug);
				break;
		}
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