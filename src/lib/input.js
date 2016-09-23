var Input = function(xp, xn, yp, yn) {
	this.update = function(obj, entity) {
		entity.control.velocity.x = 0;
		entity.control.velocity.y = 0;

		if (obj.keys.state[xp]) entity.control.velocity.x = 1;
		if (obj.keys.state[xn]) entity.control.velocity.x = -1;
		if (obj.keys.state[yp]) entity.control.velocity.y = 1;
		if (obj.keys.state[yn]) entity.control.velocity.y = -1;
	};
};
