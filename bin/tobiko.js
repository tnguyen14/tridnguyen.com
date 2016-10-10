const tobiko = require('tobiko');

tobiko({
	contentsDir: 'contents',
	config: 'config.json',
	outDir: 'dist',
	handlebars: {
		templatesDir: 'templates',
		partialsDir: 'templates/partials',
		helpersDir: 'templates/helpers'
	},
	plugins: {
		wordpress: {
			apiRoot: 'https://tridnguyen.wpengine.com/wp-json/wp/v2',
			contents: [{
				postType: 'posts',
				folder: 'articles',
				template: 'article.hbs'
			}]
		},
		archive: {
			articles: {
				postsPerPage: 4,
				title: 'Articles',
				template: 'articles.hbs'
			}
		}
	}
});
