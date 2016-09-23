var Control = function(bound, sx, sy) {
	this.bound = bound || new Rect();
	this.position = new Vector(0, 0);
	this.velocity = new Vector(0, 0);
	this.speed = new Vector(sx || 1, sy || 1);

	this.update = function(obj) {
		this.position.x += this.velocity.x * this.speed.x;
		this.position.y += this.velocity.y * this.speed.y;
	};
};