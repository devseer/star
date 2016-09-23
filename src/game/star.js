var Star = function() {
	this.system = {
		control: new Control(5, 5),
		movement: new Movement(),
		polygon: new Polygon(new Dot('#ccc'))
	};

	FromEdge.call(this, this.system.control, new OuterBound(), -1, 0);
};
Star.prototype = new Entity();