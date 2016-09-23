var StarField = function() {
	this.system = {
		field: new Field(Star, 10, 100, new OuterBound)
	};
};
StarField.prototype = new Entity();