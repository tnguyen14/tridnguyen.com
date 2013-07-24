/* get all data contents
 * store them as a humongous JSON file
 */
'use strict';

module.exports = function (grunt) {
	var fs = require('fs'),
		path = require('path'),
		jsYAML = require('js-yaml'),
		marked = require('marked'),
		moment = require('moment'),
		_ = grunt.util._;

	// log colors
	var red   = '\u001b[31m',
		blue  = '\u001b[34m',
		green = '\u001b[32m',
		reset = '\u001b[0m';


	/* convert new line characters to html linebreaks
	 * inspired by nl2br function from php.js
	 * https://github.com/kvz/phpjs/blob/master/functions/strings/nl2br.js
	 * @param {String} str
	 * @return {String}
	*/
	var nl2br = function(str) {
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>');
	}

	// parse JSON and markdown content
	var parseContent = function(filepath, options) {
		var ext = path.extname(filepath),
			basename = path.basename(filepath),
			// remove 'contents' from path
			content;

		// Ignore draft posts (_) and dotfiles
		if (basename[0] === '_' || basename[0] === '.') {
			return;
		}

		// get the JSON files
		if (ext === '.json') {
			content = grunt.file.readJSON(filepath);

		// parse markdown files
		// with some inspiration from https://github.com/ChrisWren/grunt-pages/blob/master/tasks/index.js
		} else if (ext === '.md') {
			var fileContent = grunt.file.read(filepath);

			// set options for marked
			if (options && options.markdown) {
				marked.setOptions(options.markdown);
			}

			try {
				var sections = fileContent.split('---');
				// YAML frontmatter is the part in between the 2 '---'
				content = jsYAML.safeLoad(sections[1]);

				// get to the markdown part
				sections.shift();
				sections.shift();

				// convert markdown data to html
				var markdown = marked(sections.join('---'));
				// convert new line characters to html line breaks
				markdown = nl2br(markdown);

				// content['markdown'] = markdown;
				content['markdonw'] = '';

			} catch (e) {
				grunt.fail.fatal(e + ' .Failed to parse markdown data from ' + filepath);
			}
		}

		// add support for date using moment.js http://momentjs.com/
		if (content) {
			if(!content.date) {
				content.date = fs.statSync(filepath).ctime;
			}
			// if date isn't already a moment type, convert it to momentjs
			if (!moment.isMoment(content.date)) {
				var mDate = moment(content.date);
				// check if the string is a valid date format http://momentjs.com/docs/#/parsing/string/
				if (mDate.isValid()) {
					content.date = mDate;
				} else {
					grunt.log.writeln('The date used in ' + filepath + ' is not supported.');
				}
			}
		}
		return content;
	};

	// inspired from grunt.file.recurse function https://github.com/gruntjs/grunt/blob/master/lib/grunt/file.js
	var getDataRecurse = function(rootdir, data, subdir) {
		var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
		fs.readdirSync(abspath).forEach(function(filename){
			var filepath = path.join(abspath, filename);
			if (fs.statSync(filepath).isDirectory()) {
				data[filename] = {};
				getDataRecurse(rootdir, data[filename], path.join(subdir || '', filename || ''));
			} else {
				data[filename] = parseContent(filepath);
			}
		});
	};

	grunt.registerMultiTask('import_contents', 'import all JSON and MD files', function () {
		var options = this.options({
			baseDir: 'contents',
			config: 'config.json',
			markdown: {
				breaks: true,
				smartLists: true,
				smartypants: true
			}
		});

		// global config
		var config = grunt.file.readJSON(options.config)

		grunt.verbose.writeflags(options, 'Options');

		// Content Tree
		var contentTree = {};
		this.files.forEach(function (f) {
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
				var dirname = path.dirname(filepath),
					directories = dirname.split(path.sep),
					basename = path.basename(filepath),
					relpath = path.relative(options.baseDir, filepath),
					content = {};

				content = parseContent(filepath, options);

				// add filepath property if not specified
				if (!content.filepath) {
					content.filepath = relpath;
				}

				// start at the top of the content tree
				var currentDir = contentTree;

				// iterate through the directory path
				for (var obj in directories) {
					// if the directory doesn't exist yet, create an empty object in the content tree
					if (!currentDir[directories[obj]]) {
						currentDir = currentDir[directories[obj]] = {};
					// if the directory already exists, move into a deeper level
					} else {
						currentDir = currentDir[directories[obj]];
					}
				}
				// once the deepest directory level is reached, put new content on the Content Tree
				currentDir[basename] = content;

			});

			// Pagination

			// convert an object of objects into array of objects
			// @param {Object}
			// @return {Array}
			var objToArray = function(obj) {
				var array = [];
				_(obj).forEach(function(value, key) {
					var el = {};
					// if we're not at the post level yet, go deeper
					if (!value.hasOwnProperty('template')) {
						for (var prop in value) {
							el[key] = value[prop];
						}
					} else {
						el[key] = value;
					}
					array.push(el);
				});
				return array;
			}

			// sort array by keys
			// default to date
			var sortArrayByKey = function(array, key) {
				array.sort(function(a,b) {
					var sortKey = (key) ? key : 'date',
						aKey,
						bKey,
						compareResult;

					if (a.hasOwnProperty(sortKey)) {
						aKey = a[sortKey];
						bKey = b[sortKey];
					} else {
						// Dig deeper for sortKey property
						for (var prop in a) {
							aKey = a[prop][sortKey];
						}
						for (var prop in b) {
							bKey = b[prop][sortKey];
						}
					}

					switch (sortKey) {
						case 'date':
							var aDate = moment(aKey),
								bDate = moment(bKey);
							if (aDate.isBefore(bDate)) {
								compareResult = 1;
							} else if (aDate.isSame(bDate)) {
								compareResult = 0;
							} else if (aDate.isAfter(bDate)) {
								compareResult = -1;
							}
							break;
						default:
							compareResult = aKey - bKey;
					}
					return compareResult;
				});
			}

			var paginate = function(dir, key, options) {
				var archive = {},
					posts = [];

				// keeping it short
				var postPerPage = options.postPerPage,
					template = options.template,
					title = options.title,
					orderBy = options.orderby;

				// convert content to array to calculate length
				posts = objToArray(dir);

				console.log(blue);
				console.log(posts[9]);
				console.log(reset);

				// sorting
				sortArrayByKey(posts, orderBy);

				var numPages = Math.ceil(posts.length / postPerPage);

				// set up each archive page
				for (var pageNum = 1; pageNum <= numPages; pageNum++) {
					archive[pageNum] = {};
					var archivePage = archive[pageNum]['index.html'] = {};
					// add template so it gets rendered
					archivePage.template = template;
					// a title as well
					archivePage.title = title;
					// initialize empty posts object
					archivePage.posts = {};
					// add correct filepath
					archivePage.filepath = path.join(key, pageNum.toString(), 'index.html');
				}

				// put posts into each archive page
				for (var i = 0; i < posts.length; i++){
					var pageNum = Math.ceil((i+1)/ postPerPage);
					var archivePage = archive[pageNum]['index.html'];
					_.extend(archivePage['posts'], posts[i]);
				}

				// copy object 1 to index.html
				archive['index.html'] = archive['1']['index.html'];
				archive['index.html'].filepath = path.join(key, 'index.html');

				return archive;
			};

			// Get pagination options from Gruntfile.js
			var paginateOptions = {};
			_(options.paginate).forEach(function(opt){
				// make the directory the key, so easier to access options
				paginateOptions[opt.dir] = {
					postPerPage: opt.postPerPage,
					template: opt.template,
					title: opt.title,
					orderBy: opt.orderby
				}
			});

			// paginate if something is specified
			if (!_.isEmpty(paginateOptions)) {
				// store all directories' archives
				var archives = {};
				// iterate through global content object
				// only support archive at top level
				_(contentTree.contents).forEach(function(dir, key) {
					if ( paginateOptions.hasOwnProperty(key) ) {
						var archive = paginate(dir, key, paginateOptions[key]);
						_.extend(contentTree.contents[key], archive);
					}
				});
			}

			grunt.file.write(f.dest, JSON.stringify(contentTree, null, '\t'));
		});
	});
};