var Scoring = function() {
	var ref = this;

	this.reset = function() {
		this.system.score.total = 0;
	};

	this.system = {
			score: new Score('Score: ', '', 0),
			text: new Text(180, 16, '#fff', function() { return ref.system.score.out; })
	};
};
Scoring.prototype = new Entity();