require.config({
	baseUrl: '/',
	deps: ['js/app'],

	paths: {
		text: 'components/requirejs-plugins/lib/text',
		json: 'components/requirejs-plugins/src/json',
		handlebars: 'components/handlebars/handlebars',
		hbs: 'components/require-handlebars-plugin/hbs',
		jquery: 'components/jquery/jquery.min',
		prism: 'js/lib/prism',
		validation: 'components/jquery.validation/jquery.validate',
		bxslider: 'components/bxslider/jquery.bxSlider.min',
		fancybox: 'components/fancybox/source/jquery.fancybox.pack'
	},

	// load non-amd dependencies
	shim: {
		jquery: {
			exports: 'jQuery'
		},
		handlebars: {
			exports: 'Handlebars'
		},
		prism: {
			exports: 'Prism'
		},
		validation: {
			deps: ['jquery']
		},
		bxslider: {
			deps: ['jquery']
		},
		fancybox: {
			deps: ['jquery']
		}
	},

	hbs: {
		partialsUrl: 'templates/partials'
	},

	// Remove these modules from the final build
	stubModules: ['text', 'json']
});