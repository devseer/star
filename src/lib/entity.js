var Entity = function() {
	this.system = {};

	this.update = function(obj) {
		for (var i in this.system) {
			this.system[i].update && this.system[i].update(obj, this.system);
		}
	};
};