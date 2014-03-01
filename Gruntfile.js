'use strict';

module.exports = function(grunt) {
	var config = grunt.file.readJSON('config-dev.json');
	// load local tasks
	grunt.loadTasks('tasks');
	// display execution time of grunt tasks
	require('time-grunt')(grunt);
	// load all grunt configs
	require('load-grunt-config')(grunt, {
		config: config
	});
}