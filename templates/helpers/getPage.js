module.exports = function(page, options) {
	return options.fn(this[page]['index.html']);
}
