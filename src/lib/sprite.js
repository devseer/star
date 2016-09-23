var Sprite = function(image) {
	this.image = new Image();
	this.image.src = image;
	this.source = new Rect();
	this.draw = new Rect();

	this.update = function(obj) {
		obj.screen.system.canvas.ctx.drawImage(
			this.image,
			this.source.x, this.source.y, this.source.w, this.source.h,
			this.draw.x, this.draw.y, this.draw.w, this.draw.h
		);
	};
};