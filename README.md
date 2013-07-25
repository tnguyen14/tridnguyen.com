# tobiko
### node.js static site generator using grunt

## 1. How to use
This generator app is driven by [grunt.js](http://gruntjs.com), which means that it is highly customizable to suit your developer needs. Be sure to take a look at [Gruntfile.js](https://github.com/tnguyen14/tobiko/blob/master/Gruntfile.js).

### Install
1. Run `git clone` to download the app.
2. Run `npm install`
3. Run `bower install`

### Getting started
1. To get the basic site, copy `example` folder to root folder.
```sh
$ cp example/ ./
```
2. Run `grunt` to generate preview, build and deploy your website.
- By default, running `grunt` will run `grunt dev`.
- Other grunt options include `grunt build` and `grunt deploy`

### config.json
High level, site-wide configurations can be specified in `config.json`.

## 2. Contents
*This section explains the inner working of the [`import_contents` Grunt task](https://github.com/tnguyen14/tobiko/blob/master/tasks/grunt-import-contents.js).*

By default, the site contents will be in the `contents` folder. This option could be changed in `Gruntfile.js`, under `import_contents` task.

Content can be written in `json` and `markdown` with `yaml` [frontmatter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter).

All contents are written to `data.json` in the `build` directory.
The structure of the `contents` directory will be reflected in the final static directory.

#### Nesting
In any directory, a file's sibling files and directories are available in the template to access. This is a convenient and structural way to store and organize data, instead of dumping everything into a JSON file.

For example, for this file structure
```
contents
├── index.json
└── cars
    ├── 1.tesla.json
    ├── 2.ford.json
    ├── 3.volve.json
    ├── 4.honda.json
    ├── 5.toyota.json
    └── accessories
        └── spoiler.json
```

If you're writing the template for `index.json`, its own content is available through the `content` variable.
```html
  <h1>{{content.title}}</h1>
```
And `cars` are also available as
```html
  <ul>
  {{#each cars}}
  	<li><h2>{{title}}</h2></li>
  {{/each}}
  </ul>

  <div class="spoiler">
   {{cars.accessories["spoiler.json"]}}
  </div>
```

#### Filepath
By default, the path of the page is its directory structure.
For example, the page `contents/articles/06/a-new-day.json` will have the URL `http://localhost/articles/06/a-new-day.json`.

However, each page's path can be overwritten by a `filepath` property.
Example:
```js
{
	filepath: "articles/archives/some-post.md"
}
```

This could be useful as a way to order files in a directory structure.
In the cars example above:
```
contents
├── index.json
└── cars
    ├── 1.tesla.json
    ├── 2.ford.json
    ├── 3.volve.json
    ├── 4.honda.json
    ├── 5.toyota.json
    └── accessories
        └── spoiler.json
```

In order to avoid the number 1, 2, 3 etc. appear in these car's URL, they could have a custom `filepath` property, such as `contents/cars/tesla.json`.

#### Date
Post or page date is supported by declaring property `date` in JSON or YAML. Any [ISO-8601 string formats](http://momentjs.com/docs/#/parsing/string/) for date is supported.

By default, a file without a `date` specified will have the `date` value of when the file was created. (To be more exact, it will have the [`ctime`][1] value when `grunt` is first run).

[1]: http://en.wikipedia.org/wiki/Atime_(Unix)#ctime

See [momentjs](http://momentjs.com) for more information about the date format.

#### Pagination and Archives
A directory with a big number of posts could be configured to paginate. The paginated pages are called *archives*.
The option for enabling pagination can be added in `Gruntfile.js` under `import_contents` task. For example:
```js
  import_contents: {
    options : {
      paginate: [
        {dir: 'articles', orderBy: 'date', postPerPage: 4, template: 'archive.hbs', title: 'Articles'}
      ]
    }
  }
```
Each object in the `paginate` option represents a directory to be paginated. The options for each directory are:
* `dir`: (string) directory name
* `orderby`: (number/ date) how to order the posts in the archives. Default to [date](#date)
* `postPerPage`: (number) number of posts to be displayed per archive page
* `template`: (string) the template used to display these archive pages
* `title`: (string) title of these archive pages (this will be made available to use in template as `content.title`)

## 3. Templates
*This section explains the inner working of the [`handlebars_html` Grunt task](https://github.com/tnguyen14/tobiko/blob/master/tasks/grunt-handlebars-html.js).*

By default tobiko uses [Handlebars](http://handlebarsjs.com) as its templating engine. However, if you want to use a different templating engine, you can easily do so by plugging in a different `grunt` task that would compile your templating engine of choice.
*Note: true to a static site generator, all compiled templates need to be in `.html` formats*

Helpers and Partials are supported. They can be stored under `helpers` and `partials` directories under `templates`. These directory names of course can be changed in `Gruntfile.js`.

#### Template declaration
Each page specifies a template that it uses, either as a JSON property or YAML frontmmatter.

Example:
```js
// JSON declaration
{
  template: "index.hbs"
}
```

```markdown
<!-- YAML Frontmatter -->
---
template: "archive.hbs"
---
```

If a file doesn't specify a template, its data is available to be used in the ContentTree but will not be rendered.

#### Using content in template

A file's content is available in the template under the `content` variable. Other sub-directories included in the same directory is accessible in the template with [nesting](#nesting).

#### Template in archive pages
The posts in each archive page is accessible in the template file under `content` property, similar to a regular file. See [example](https://github.com/tnguyen14/tobiko/blob/master/example/templates/archive.hbs).

## Issues/ Requests
Any issues, questions or feature requests could be created under [Github Issues](https://github.com/tnguyen14/tobiko/issues).
