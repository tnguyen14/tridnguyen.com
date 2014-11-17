
---
title: 'Introducing Tobiko'
author: tri-nguyen
template: article.hbs
date: 2014-11-16
filepath: 'articles/introducing-tobiko/index.md'
---

About a year and a half ago, amidst the hype of static sites, I attempted to convert my WordPress blog over to a static blog. The advantages were clear to me as a developer: much faster performance, authoring in markdown, source-controlled content out of the box, easy and free hosting with Github Pages, and the list goes on. This was the motivation for [tobiko](https://github.com/tnguyen14/tobiko), a Grunt-based static site generator - a tool I wrote that I thought would be useful for other developers out there.

### Existing static site generators
The path to tobiko where it is today was not always straight forward however. I did not want to reinvent the wheels initially, and tried out a few different static site generators out there.

I began with the obvious choice - Octopress powered by Jekyll. There was (and still is) a lot of enthusiasm about Jekyll in the open source community, and I believe that is so for good reasons. However, at this time period, I started to write a lot more JavaScript in the browser as well as node, and for some reason Ruby and its tool chain never really clicked for me. I had a lot of issues setting Octopress up and deploying properly, most likely due to my own shortcoming, despite having taken an intro to Ruby course on Codeacademy a few months prior.

As node was already a huge and growing community back then, there were a few contenders of static site generator written in node as well. Most notably was [wintersmith](http://wintersmith.io/), which I thought was very cool. I tried it out and even wrote [a plugin](https://github.com/tnguyen14/wintersmith-handlebars) for it. Nonetheless, I ended up parting ways with wintersmith as well. The tool was authored mostly in Coffeescript, which did not appeal to me, and the whole plugin architecture seemed confusing.

### Grunt - a proven build tool
At the same time, Grunt was quickly becoming very popular as a mainstream build tool with a great community around it. And I thought the whole idea of a static site generator fits in very well with a build tool ecosystem. So I created [tobiko](https://github.com/tnguyen14/tobiko) - a Grunt-based static site generator.

### Main features
I wanted tobiko to be based on a stack that I would like to work with. Here are a few highlights:
- tobiko itself is a glorified grunt plugin, which features 2 main task - parsing content and generating html pages.
- Content can be written in either Markdown (with YAML frontmatter) or JSON.
- Templates are written in Handlebars by default.
- Styles are written in SCSS by default.
- JavaScript uses RequireJS to support AMD syntax.
- Site and project configurations are stored in JSON files that can be overwritten based on the environment (`dev` vs `prod`).
- Content can be nested indefinitely in the traditional file system. HTML pages reflect that nesting structure. That path however can be overwritten as desired.
- Pagination and archives.
- Image compression with responsive image support by generating multiple image resolutions on build.
- Deployment to Github Pages or any static server with `rsync`.

### Yeoman generator
If these features are enough to intrigue you, I'd encourage you to try tobiko out. I've also written a [Yeoman generator](https://github.com/tnguyen14/generator-tobiko) for tobiko, so that you can set up all the directory structure and grunt tasks within a minute or two. The whole idea is to scaffold and deploy a simple static site within a matter of minutes.

### Roadmap
I have used tobiko to create a few sites so far with very satisfying results. I think that something like tobiko can be very useful for a simple business site, personal blog or even a style guide for larger projects. It is definitely meant for developers who know their way around code and JavaScript, and who enjoy writing content in Markdown.

In the course of using tobiko, I have found a few areas for improvement as well as possible ways to expand the project. Here are some ideas of what I'd like to do with it next (without selling too much vaporware):

- Create a gulp-based version. File systems are great, but streams can speed up the build process many times over.
- Add more tests to make the tasks more stable.
- Support for browserify/ CommonJS syntax for JavaScript.
- Support for other templating engines.

If you take a look at tobiko (which is by itself pretty simple) and think you can help out with these items, please feel free to file an issue or send a pull request.

Thanks very much for reading this far, and if I've got you somewhat convinced, definitely give [tobiko](https://github.com/tnguyen14/tobiko) and [generator-tobiko](https://github.com/tnguyen14/generator-tobiko) a try!