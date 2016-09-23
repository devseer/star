var Collision = function(arr, call) {
	this.arr = arr;
	this.call = call;

	this.update = function(obj, entity) {
		var target, item, 
			body = entity.control,
			lw = entity.polygon ? entity.polygon.poly.w : entity.sprite.draw.w,
			lh = entity.polygon ? entity.polygon.poly.h : entity.sprite.draw.h;

		for (var i in this.arr) {
			target = obj[this.arr[i].target];
			if (target) {
				item = target.system.control;

				if (item.position.x > body.position.x && item.position.y > body.position.y
					&& item.position.x < body.position.x + lw && item.position.y < body.position.y + lh) {
					this.call(obj, entity);
				}
			}
		}
	};
};