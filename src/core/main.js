var Game = function() {
	this.obj = {
		screen: new Screen(),
		player: new Player(),
		keys: new Keys(),
		starfield: new StarField(),
		asteroidfield: new AsteroidField(),
		scoring: new Scoring()
	};

	this.main = function(ref) {
		for (var o in ref.obj) {
			ref.obj[o].update && ref.obj[o].update(ref.obj);
		}

		requestAnimationFrame(function() { ref.main(ref) });
	};

	this.main(this);
};

var g = new Game();