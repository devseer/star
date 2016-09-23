/* === DEFAULTS ===*/
var SpriteSource = function() {
	Rect.call(this, 0, 0, 16, 16);
};

var SpriteDraw = function() {
	Rect.call(this, 0, 0, 32, 32);
};

var ScreenSize = function() {
	Rect.call(this, 0, 0, 256, 256);
};

var ScreenFill = function(color) {
	Poly.call(this, 0, 0, 256, 256, color);
};

var InnerBound = function() {
	Rect.call(this, 0, 0, 240, 240);
};

var OuterBound = function() {
	Rect.call(this, -32, -32, 288, 288);
};

var Dot = function(color) {
	Poly.call(this, 0, 0, 1, 1, color);
};

