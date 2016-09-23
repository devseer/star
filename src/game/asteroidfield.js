var AsteroidField = function() {
	this.system = {
		field: new Field(Asteroid, 200, 10, new OuterBound)
	};
};
AsteroidField.prototype = new Entity();