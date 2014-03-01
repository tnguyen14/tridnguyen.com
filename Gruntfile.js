'use strict';

module.exports = function(grunt) {
	var path = require('path'),
		config = grunt.file.readJSON('grunt/config.json');
	// load local tasks
	grunt.loadTasks('grunt/tasks');
	// display execution time of grunt tasks
	require('time-grunt')(grunt);
	// load all grunt configs
	require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), 'grunt/config'),
		config: config
	});
}