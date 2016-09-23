/* === STRUCTS === */
var Rect = function(x, y, w, h) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 0;
	this.h = h || 0;
};

var Poly = function(x, y, w, h, color) {
	this.color = color;
	Rect.call(this, x, y, w, h);
};

var Vector = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};