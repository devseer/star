var Polygon = function(poly) {
	this.poly = poly || new Poly();

	this.update = function(obj) {
		obj.screen.system.canvas.ctx.fillStyle = this.poly.color;
		obj.screen.system.canvas.ctx.fillRect(this.poly.x, this.poly.y, this.poly.w, this.poly.h);
	};
};