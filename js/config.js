require.config({
	baseUrl: '/',
	deps: ['js/app'],

	paths: {
		text: 'components/requirejs-plugins/lib/text',
		json: 'components/requirejs-plugins/src/json',
		handlebars: 'components/handlebars/handlebars',
		jquery: 'components/jquery/jquery.min',
		prism: 'js/lib/prism'
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
		}
	},

	// Remove these modules from the final build
	stubModules: ['text', 'json']
});