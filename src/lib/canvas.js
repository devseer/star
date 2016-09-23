var Canvas = function(elementId, mode, smoothing) {
	this.cvs = document.getElementById(elementId);
	this.ctx = this.cvs.getContext(mode);
	this.ctx.imageSmoothingEnabled = smoothing;
};