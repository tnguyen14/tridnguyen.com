// step into an object
// @param: steps equals the number of levels to go depeer in the object
var step = function(steps, options) {
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			if (steps === 1) {
				return options.fn(this[key]);
			} else {
				step(steps-1);
			}
		}
	}
};

module.exports = step;

