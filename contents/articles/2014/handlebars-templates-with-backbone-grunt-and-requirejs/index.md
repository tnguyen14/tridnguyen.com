
---
title: 'Handlebars templates with Backbone, grunt.js and RequireJS'
author: tri-nguyen
template: article.hbs
date: 2014-03-31
filepath: 'articles/handlebars-templates-with-backbone-grunt-and-requirejs/index.md'
---

Integrating Handlebars templates in modern web development workflow has been crucial in helping me organize my code neatly and maintain sanity. I want to achieve a few things:

- avoid the `<script>` tags to take advantage of syntax highlighting,
- break large templates into smaller files that can be managed and reused (componentized),
- automatically compiles and ready for use, and
- namespaced with file names as template names.

In a current Backbone.js application at work, which is set up with [grunt](gruntjs.com) and [RequireJS](requirejs.org) (you can find a similar set up with the default [yeoman backbone generator](https://github.com/yeoman/generator-backbone/)), I have found the following set up to meet most of these goals.

I can use the templates with RequireJS in the views like so:

```js
// viewOne.js

// I use commonjs syntax with require
// http://requirejs.org/docs/whyamd.html#sugar
var Templates = require('templates');
var viewTemplate = Templates.viewOne;
var html = viewTemplate({data: 'test'});
```

The template directories look something like this

```sh
app/templates/
├── viewOne.hbs
├── viewTwo.hbs
├── viewThree.hbs
├── ...
└── viewTwentyThree.hbs

0 directories, 23 files
```

I use [`grunt-contrib-handlebars`](https://github.com/gruntjs/grunt-contrib-handlebars) to compile the templates. Here's the Gruntfile.js config for local development:

```js
handlebars: {
	compile: {
		options: {
			amd: true,
			namespace: 'Templates',
			partialsUseNamespace: true,
			processName: function(filePath) {
				var file = filePath.replace(/.*\/(\w+)\.hbs/, '$1');
				return file;
			}
		},
		files:{
			'.tmp/scripts/templates.js': ['<%= yeoman.app %>/templates/*.hbs']
		}
	}
}
```

The above code does a few things. More detailed explanation of what each `options` does can be found on the plugin github page.

- The `processName` function takes the files and use their name as the template name.
- With `partialsUseNamespace` turned on, you can use partials both within your template as `> partial` or through the global `Templates` object.

In the build step for deployment, instead of just outputing the compiled templates into the `.tmp` folder, RequireJS can put Templates in the optimized javascript with the following Grunt task config (note the `paths` option):

```js
requirejs: {
	dist: {
		options: {
			baseUrl: '<%= yeoman.app %>/scripts',
			optimize: 'none',
			paths: {
				'templates': '../../.tmp/scripts/templates'
			}
		}
	}
}
```

This simple set up has allowed me to rapidly develop a complex apps by breaking down complex templates into small reusuable components and use them liberally anywhere with RequireJS, yet keep the built JavaScript minimal and compressed. I hope it will be useful for others who might be looking for a similar solution. If you find this useful or would like to suggest an improvement, please leave a comment.