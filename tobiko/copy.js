module.exports = {
	build: {
		files: [
			{expand: true, src: ['CNAME'], dest: '<%= buildPath %>/'},
			{expand: true, cwd: 'components', src: ['fancybox/source/**/*'], dest: '<%= buildPath %>/components'},
			{expand: true, cwd: 'sass', src: 'assets/**/*', dest: '<%= buildPath %>/css/'},
			{expand: true, cwd: 'js/lib', src: '**/*', dest: '<%= buildPath %>/js/lib'},
			// all images by default
			{expand: true, cwd: 'contents', src: '**/*.{jpg,png,svg}', dest: '<%= buildPath %>'}
		]
	}
};