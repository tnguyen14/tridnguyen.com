module.exports = {
	prod: {
		options: {
			baseUrl: '.',
			mainConfigFile: 'js/config.js',
			name: 'components/almond/almond',
			insertRequire: ['js/app'],
			out: '<%= buildPath %>/js/app.js',
			optimize: 'uglify2',
			generateSourceMaps: true,
			preserveLicenseComments: false,
		}
	}
}