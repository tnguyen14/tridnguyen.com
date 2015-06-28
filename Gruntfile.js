'use strict';

module.exports = function(grunt) {
	var path = require('path'),
		config = grunt.file.readJSON('./tobiko.json');
	// display execution time of grunt tasks
	require('time-grunt')(grunt);
	// load all grunt configs
	require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), 'tobiko'),
		config: config
	});
	grunt.config.set('gh-pages', {
		prod: {
			options: {
				base: '<%= buildPath %>',
				branch: 'master',
				repo: 'git@github.com:tnguyen14/tnguyen14.github.io.git'
			},
			src: ['**/*']
		}
	});
};