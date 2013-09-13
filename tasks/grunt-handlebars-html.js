/* grunt-handlebars-html task
 * compile handlebars templates to static HTML
 */

'use strict';

module.exports = function (grunt) {
	var fs = require('fs'),
		path = require('path'),
		moment = require('moment'),
		Handlebars = require('handlebars'),
		_ = grunt.util._;

	// log colors
	var red   = '\u001b[31m',
		blue  = '\u001b[34m',
		green = '\u001b[32m',
		reset = '\u001b[0m';

	// site config
	var config = grunt.file.readJSON('./config.json'),
		config_dev = (grunt.file.exists('./config-dev.json')) ? grunt.file.readJSON('./config-dev.json') : {};

	// config_dev will overwrite config
	config_dev = _.extend(config, config_dev);

	// Grunt task!
	grunt.registerMultiTask('handlebars_html', 'write templates to html', function () {
		var options = this.options({
			partialDir: 'app/templates/partials',
			helperDir: 'app/templates/helpers'
		});

		// register helpers
		if (fs.existsSync(options.helperDir)) {
			// read helper directory and save all filenames
			var helpers = fs.readdirSync(options.helperDir);
			// register helper with their filename as helper name
			helpers.forEach(function (h) {
				var ext = path.extname(h),
					basename = path.basename(h, ext),
					filepath = path.resolve(options.helperDir, h);
				Handlebars.registerHelper(basename, require(filepath));
			});
		}

		// register partials
		if (fs.existsSync(options.partialDir)) {
			// read partial directory and save all filenames
			var partials = fs.readdirSync(options.partialDir);
			// register helper with their filename as helper name
			partials.forEach(function (p) {
				var ext = path.extname(p),
					basename = path.basename(p, ext),
					filepath = path.resolve(options.partialDir, p),
					partial = grunt.file.read(filepath);
				Handlebars.registerPartial(basename, partial);
			});
		}

		this.files.forEach(function (f) {
			var path = require('path'),
				templates = {},
				env = grunt.task.current.target,
				data = grunt.file.readJSON(f.data);
			// filter out files that doesn't exist
			f.src.filter(function (filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			})
			.forEach(function (filepath) {
				var basename = path.basename(filepath),
					src = grunt.file.read(filepath);

				templates[basename] = Handlebars.compile(src);
			});

			// recursively go through content and display the ones with a template
			var renderContent = function(contents) {
				_(contents).forEach(function (content, key, collections) {
					// if the file has a template property -> render it
					if (content.template) {
						if (templates[content.template]) {
							// expose env and config to content
							content.env = env;
							// use config_dev if in dev environment
							config = (env === 'dev') ? config_dev : config;

							// pass in the whole collections to make other sibling contents available
							collections.content = content;
							collections.config = config;
							var html = templates[content.template](collections);

							// if a filepath is specified, use that instead (it should be after contents are imported)
							// otherwise, use filename as path
							var filepath = (content.filepath) ? content.filepath : key;
							var ext = path.extname(filepath),
								dirname = path.dirname(filepath),
								basename = path.basename(filepath, ext);

							// remove the dot in dirname, add the trailing slash where appropriate
							if (dirname === '.') {
								dirname = '';
							}
							// write the compiled html to file
							var outpath = path.join(f.dest, dirname, basename + '.html');
							grunt.file.write(outpath, html);
							grunt.log.writeln('"' + outpath + '" was created.');
						} else {
							grunt.log.writeln('Could not find template ' + content.template + ' for ' + key);
						}
					} else {
						// Keep going deeper into the content tree if there is more
						if (_.isObject(content)) {
							renderContent(content);
						} else {
							return;
						}
					}
				});
			};

			// render all the contents
			renderContent(data.contents);

		});
	});

};