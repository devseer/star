var Keys = function() {
	var ref = this;
	this.state = [];

	document.onkeydown = function(e) {
		ref.state[e.keyCode] = true;
	};

	document.onkeyup = function(e) {
		ref.state[e.keyCode] = false;
	};
};