module.exports = {
	options : {
		baseDir: 'contents',
		config : 'config.json',
		markdown: {
			gfm: true,
			breaks: true,
			smartLists: true,
			smartypants: true,
			langPrefix: 'language-'
		}
	},
	all: {
		src: 'contents/**/*.{json,md}',
		dest: 'build/data.json'
	}
}