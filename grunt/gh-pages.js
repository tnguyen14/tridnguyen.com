module.exports = {
	prod: {
		options: {
			base: '<%= buildPath %>',
			branch: 'master',
			repo: 'git@github.com:tnguyen14/tnguyen14.github.io.git'
		},
		src: ['**/*']
	}
}