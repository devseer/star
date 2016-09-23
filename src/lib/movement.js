var Movement = function() {
	this.update = function(obj, entity) {
		if (entity.sprite) {
			entity.sprite.draw.x = entity.control.position.x;
			entity.sprite.draw.y = entity.control.position.y;
		}

		if (entity.polygon) {
			entity.polygon.poly.x = entity.control.position.x;
			entity.polygon.poly.y = entity.control.position.y;
		}
	};
};
