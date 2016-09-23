var Player = function() {
	this.system = {
		input: new Input(39, 37, 40, 38),
		control: new Control(new InnerBound(), 3, 3),
		movement: new Movement(),
		sprite: new Sprite('bin/img/img.png')
	};

	this.system.sprite.source = new SpriteSource();
	this.system.sprite.draw = new SpriteDraw();
};
Player.prototype = new Entity();