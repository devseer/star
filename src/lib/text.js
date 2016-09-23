var Text = function(x, y, color, source) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.source = source;

	this.update = function(obj) {
		obj.screen.system.canvas.ctx.fillStyle = color;
		obj.screen.system.canvas.ctx.fillText(this.source(), x, y);
	};
};