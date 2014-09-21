
---
title: 'Use aliasify to include configurations into your web application'
author: tri-nguyen
template: article.hbs
date: 2014-09-20
filepath: 'articles/aliasify-config/index.md'
---

As I build more web applications, one problem that I keep running into is how to include application configurations into the application source code.

### What do I mean by configurations?
They include application-specific settings such as the application name, API URL, debug mode etc. These are metadata to the application, similar to the metadata contained in `package.json` for a Node module.

As I develop most of my applications locally, some of these settings will differ when the application is served on localhost versus when served in production. For eg., I usualy use a staging API server for local development and then a production server for deployment.

### I could certainly hardcode these settings into the source code right?
The fact that I need 2 (or more) environment-specific versions of these settings make them difficult to be hardcoded. Furthermore, as a developer, I feel a little "dirty" when I hardcode these settings. Ideally, they should be declared in a JSON file somewhere, just like `package.json`.

### There must be other solutions out there!
Surprisingly, there isn't a good straight forward solution out there, as far as I know (if you know of one, please leave a comment). Here are a few worth mentioning:

One can follow the approach outlined by Addy Osmani in [making environment-specific builds with build tools](http://addyosmani.com/blog/environment-specific-builds-with-grunt-gulp-or-broccoli/) and use some sort of string replacement plugin. However, this will introduce some 'not-so-pretty' delimiters in the codebase, such as `@@foo` used by grunt-replace.

Henrik Joreteg's [clientconfig](https://github.com/HenrikJoreteg/clientconfig) is another elegant solution and very close to what I have in mind, however it relies on a server component to set all the configurations in a cookie. This is not a hard requirement, but is not feasible for a static site running on a simple file server (such as Github Pages) like this blog.

### Another attempt at solving this problem
If you are using [browserify](https://github.com/substack/node-browserify) to bundle your JavaScript code, this might be a good solution for you.

Using [aliasify](https://github.com/benbria/aliasify), you can require your config, which is declared in a `config.json` file like this:

```json
{
	"API_URL": "http://example_server.com/api",
	"env": "development"
}
```

```js
var config = require('config');

console.log(config.API_URL); //prines out API_URL
if (config.env === 'development') {
	// do something specifically in development mode
}
```

To declare this transformation, you can add the following section to `package.json`:
```json
{
	 "aliasify": {
		aliases: {
			"config": "./config.json"
		}
	}
}
```

Pretty simple, right?

### Environment-specific configs
We can make this even better, by allowing for environment-sepcific configs. To do that, I recommend using a build tool like grunt or gulp. I am sure there is probably a way to do it with just the simple browserify command line interface, but using browserify programmatically makes things a lot easier.

Here's an example of how I am using this in a recent project:

```js
// gulpfile.js

// enable development mode
var dev = false;
gulp.task('enable-dev-mode', function () {
	dev = true;
});

gulp.task('scripts', function () {
	// set up browserify bundle in here
	// see https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md

	// aliasify config
	var aliasify = require('aliasify').configure({
		aliases: {
			'config': './config' + (dev ? '.dev' : '') + '.json'
		},
		configDir: __dirname
	})
	bundler.transform(aliasify);
});
```
In this approach, aliasify will automatically use `config.dev.json` for development environment and `config.json` for production one.

A similar approach could be taken when using [`grunt-browserify`](https://github.com/jmreidy/grunt-browserify). In fact, it is probably easier to do environment-specific stuff with grunt due to its ability to declare a task target.

There you have it, a simple approach to accessing environment configuations in your project that is made possible by browserify.

### What's bad, what's good, what could be better?

This solution's downside is relying on browserify (and possibly a build system), which might not be applicable for an older project. If you use RequireJS/AMD, I imagine it'd be similarly easy to include such a config file using the [JSON plugin](https://github.com/millermedeiros/requirejs-plugins).

One possible improvement to this solution is allowing the ability to cascade configs across environment.  For example:

In `config.json`
```json
{
	"appName": "FooBar",
	"apiUrl": "http://foobar.com/api"
}
```
And then `config.dev.json` just "extend" it without redeclaring common configs:
```json
{
	"apiUrl": "http://localhost:3000"
}
```

This is currently not possible with using aliasify. I have implemented a similar version of this as a grunt task for [tobiko](https://github.com/tnguyen14/tobiko#configjson), but it's not polished enough to be used by others yet. I will update this space if and when this becomes available.
