var Field = function(type, delay, limit, rect) {
	this.type = type;
	this.limit = limit || 1;
	this.list = [];
	this.spawn = true;
	this.delay = delay || 200;
	this.clip = true;
	this.rect = rect;
	
	this.update = function(obj, entity) {
		if (this.spawn) {
			if (this.list.length < this.limit) {
				this.list.push(new this.type());
			}

			var ref = this;
			this.spawn = false;
			setTimeout(function() { ref.spawn = true; }, this.delay);
		}


		var clipping = [];

		for (var i in this.list) {
			this.list[i].update(obj, entity);

			if (this.clip) {
				var p = this.list[i].system.control.position;

				if (p.x < this.rect.x || p.x > this.rect.w || p.y < this.rect.y || p.y > this.rect.h) {
					clipping.push(i);
				}
			}
		}

		for (var i in clipping) {
			this.list.splice(clipping[i], 1);
		}
	};
};
Field.prototype = new Entity();