module.exports = {
	dev: {
		src: 'js/app.js',
		dest: '<%= buildPath %>/js/app.js'
	},
	devWatch: {
		src: 'js/app.js',
		dest: '<%= buildPath %>/js/app.js',
		options: {
			watch: true
		}
	}
};