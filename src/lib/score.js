var Score = function(before, after, begin) {
	this.before = before;
	this.after = after;
	this.total = begin || 0;
	this.out = '';

	this.increment = true;
	this.amount = 1;
	this.delay = 100;

	this.update = function() {
		this.out = this.before + this.total + this.after;
		if (this.increment) {
			this.increment = false;
			this.total += this.amount;

			var ref = this;
			setTimeout(function() { ref.increment = true; }, this.delay);
		}
	};
};