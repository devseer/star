var Screen = function() {
	this.system = {
		polygon: new Polygon(new ScreenFill('#222')),
		canvas: new Canvas('game', '2d', false)
	};
};
Screen.prototype = new Entity();