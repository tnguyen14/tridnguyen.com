module.exports = function(grunt){
	return {
		options: {
			base: '<%= buildPath %>'
		},
		dev: {
			options: {
				port: '<%= port %>'
			}
		},
		prod: {
			options: {
				keepalive: true,
			}
		}
	}
}