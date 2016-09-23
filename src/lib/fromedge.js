var FromEdge = function(ctrl, bound, vx, vy) {
	if (vx !== 0) {
		ctrl.position.x = vx > 0 ? bound.x : bound.w;
		ctrl.position.y = Math.floor(Math.random() * bound.h);
		ctrl.velocity.x = vx;
	}
	if (vy !== 0) {
		ctrl.position.y = vy > 0 ? bound.y : bound.h;
		ctrl.position.x = Math.floor(Math.random() * bound.w);
		ctrl.velocity.y = vy;
	}
};