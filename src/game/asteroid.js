var Asteroid = function() {
	this.system = {
		control: new Control(2, 2),
		movement: new Movement(),
		sprite: new Sprite('bin/img/img.png'),
		collision: new Collision([{target: 'player', call: 'score'}], function(obj, entity) {
			obj.scoring.reset();
		})
	};

	this.system.sprite.source = new SpriteSource();
	this.system.sprite.draw = new SpriteDraw();
	this.system.sprite.source.x = this.system.sprite.source.w;

	FromEdge.call(this, this.system.control, new OuterBound(), -1, 0);
};
Asteroid.prototype = new Entity();