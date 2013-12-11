---
title: Meteor and Bower
author: tri-nguyen
date: 2013-12-10
template: article.hbs
---

I have been using [Meteor.js](http://meteor.com) for one of my projects in the past few months. After working with WordPress and the LAMP stack for a while, I quite welcome the new and refreshing environment Meteor has to offer.

When I first started with Meteor, the one thing I sorely missed from building other web apps was the ability to use [`bower`](http://bower.io) to manage front-end dependencies. I have come to rely on `bower` to get me the latest copies of libraries and put them in a consistent place. Meteor, however, has its own way of managing packages and isn't fully compatible with `bower` right off the bat.

After some digging around on StackOverflow and jumping on the IRC channel, I figured that there was no perfect way to integrate this. So I decided to create a little hack to make bower works with Meteor. The package that sparked my desire to make this work was `bootstrap`. I posted [an earlier version of this post](http://stackoverflow.com/questions/18110976/use-twitter-bootstrap-3-rc1-with-meteor/18112473#18112473) on StackOverflow.

### Where to put `bower_components`?

This was the first question I had to answer. Since Meteor automatically package any `.css` and `.js` files in the `client` folder and serve them, `client` is not a good idea to put these dependencies, as they most likely have a bloated number of files that you don't actually need.

I found `public` to be a good place to keep these files, since "Meteor server will serve any files under the `public` directory".

```json
{
  "directory": "public/bower_components"
}
```

### How to use these assets?
Any static files (`.css`, `.jpg`, `.png`, `.svg` and so on) can be sourced like this:

```html
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"/>
```

`less` files can also be included in your authored `less` code as well:

```less
@import "public/bower_components/bootstrap/less/bootstrap.less";
```
Notice the path above include the `public` folder.

#### Explicitly declare files to be included on the client
While the above method for static files works fine locally and on sites deployed to meteor.com, it fails when the app is deployed to heroku. Furthermore, it would not work for JavaScript files since Meteor templates do not execute any `<script>` tags in the body the way one would expect.

In order to overcome these challenges, I use a small hack.

- Create a package whose job is solely to serve any static files from bower components.

```sh
 ❯ tree packages
packages
└── bower-dependencies
    └── package.js
```
- In `package.js`, declare any static assets that you'd like to use on the client

```js
Package.describe({
	summary: "Load bower dependencies."
});

Package.on_use(function(api) {
	// bootstrap
	api.add_files(['../../public/bower_components/bootstrap/dist/js/bootstrap.min.js'], 'client');
	api.add_files([
		'../../public/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
		'../../public/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
		'../../public/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
		'../../public/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'
	], 'client');
	// ladda-bootstrap
	api.add_files([
		'../../public/bower_components/ladda-bootstrap/dist/ladda-themeless.min.css',
		'../../public/bower_components/ladda-bootstrap/dist/spin.min.js',
		'../../public/bower_components/ladda-bootstrap/dist/ladda.min.js'
	], 'client');
});
```
This will make the static assets available at the proper URL. For example, to use the glyphicon fonts in this case, the URL would be `/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot`.

This package will also serve any JavaScript and CSS files automatically, as they are gathered and bundled by Meteor before serving.

### Install bower dependencies when deployed to Heroku
Since using `bower` is not a very popular pattern among Meteor developers, bower dependencies are usually left out on deployment because the `bower_components` folder is usually `gitignor`-ed and thus not included in the source code.

When deploying my app to heroku, I use this [`heroku-buildpack-meteorite`](https://github.com/oortcloud/heroku-buildpack-meteorite). In order to make bower works, I added the following lines of code after packages are installed and before the meteor bundle is built:

```sh
echo "Installing bower" | indent
run_npm "install bower -g"
echo "Bower installed" | indent
echo "Installing bower dependencies" | indent
HOME="$BUILD_DIR" bower install |indent
```
This code is submitted as a [pull request](https://github.com/oortcloud/heroku-buildpack-meteorite/pull/28/files), but I also [maintain a fork](https://github.com/tnguyen14/heroku-buildpack-meteorite) that has this added support for bower.

### Conclusions
I hope my solution will be useful for people who would like to stay with `bower` for front-end package management in the Meteor world. I am aware that Meteor and Meteorite projects have official support for many important packages, including `bootstrap` used in this example. However, depending on those packages add a layer of delay into your workflow, as updates will not be as quick as the original. This was true for me back in September when I wanted to use Bootstrap 3 as it was released to the public. Meteor did not have support for it until much later. It is for good reason - they want to make sure things are stable and safe before pushing out an update, and probaly want to time it with their release cycle as well. However, as developers, sometimes we get itchy and want to take new things still under development out for an early ride. That is what `bower` is there for, so why not use it, right?