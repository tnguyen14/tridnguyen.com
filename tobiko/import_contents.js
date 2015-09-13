module.exports = {
	options: {
		baseDir: 'contents',
		config: 'config.json',
		markdown: {
			gfm: true,
			breaks: true,
			smartLists: true,
			smartypants: true,
			langPrefix: 'language-'
		},
		wordpress: {
			apiRoot: 'http://wp.tridnguyen.com/wp-json/wp/v2',
			contents: [{
				postType: 'posts',
				folder: 'articles',
				template: 'article.hbs'
			}]
		},
		archives: {
			articles: {
				postsPerPage: 4,
				title: 'Articles',
				template: 'articles.hbs'
			}
		}
	},
	all: {
		src: 'contents/**/*.{json,md}',
		dest: 'build/data.json'
	}
};