module.exports = {
	dev: {
		options: {
			port: '<%= port %>',
			middleware: function(connect, options) {
				return [
					// serve files in /dist as if they were in the root.
					connect.static(__dirname + '/build/www'),
					// but serve everything else from the root
					connect.static(__dirname)
				];
			}
		}
	},
	prod: {
		options: {
			base: '<%= buildPath %>',
			keepalive: true,
		}
	}
}