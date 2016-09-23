/* === STRUCTS === */
var Rect = function(x, y, w, h) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 0;
	this.h = h || 0;
};

var Poly = function(x, y, w, h, color) {
	this.color = color;
	Rect.call(this, x, y, w, h);
};

var Vector = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};
var Canvas = function(elementId, mode, smoothing) {
	this.cvs = document.getElementById(elementId);
	this.ctx = this.cvs.getContext(mode);
	this.ctx.imageSmoothingEnabled = smoothing;
};
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
var Control = function(bound, sx, sy) {
	this.bound = bound || new Rect();
	this.position = new Vector(0, 0);
	this.velocity = new Vector(0, 0);
	this.speed = new Vector(sx || 1, sy || 1);

	this.update = function(obj) {
		this.position.x += this.velocity.x * this.speed.x;
		this.position.y += this.velocity.y * this.speed.y;
	};
};
var Entity = function() {
	this.system = {};

	this.update = function(obj) {
		for (var i in this.system) {
			this.system[i].update && this.system[i].update(obj, this.system);
		}
	};
};
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
var Input = function(xp, xn, yp, yn) {
	this.update = function(obj, entity) {
		entity.control.velocity.x = 0;
		entity.control.velocity.y = 0;

		if (obj.keys.state[xp]) entity.control.velocity.x = 1;
		if (obj.keys.state[xn]) entity.control.velocity.x = -1;
		if (obj.keys.state[yp]) entity.control.velocity.y = 1;
		if (obj.keys.state[yn]) entity.control.velocity.y = -1;
	};
};

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

var Polygon = function(poly) {
	this.poly = poly || new Poly();

	this.update = function(obj) {
		obj.screen.system.canvas.ctx.fillStyle = this.poly.color;
		obj.screen.system.canvas.ctx.fillRect(this.poly.x, this.poly.y, this.poly.w, this.poly.h);
	};
};
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
var Sprite = function(image) {
	this.image = new Image();
	this.image.src = image;
	this.source = new Rect();
	this.draw = new Rect();

	this.update = function(obj) {
		obj.screen.system.canvas.ctx.drawImage(
			this.image,
			this.source.x, this.source.y, this.source.w, this.source.h,
			this.draw.x, this.draw.y, this.draw.w, this.draw.h
		);
	};
};
var Text = function(x, y, color, source) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.source = source;

	this.update = function(obj) {
		obj.screen.system.canvas.ctx.fillStyle = color;
		obj.screen.system.canvas.ctx.fillText(this.source(), x, y);
	};
};
/* === DEFAULTS ===*/
var SpriteSource = function() {
	Rect.call(this, 0, 0, 16, 16);
};

var SpriteDraw = function() {
	Rect.call(this, 0, 0, 32, 32);
};

var ScreenSize = function() {
	Rect.call(this, 0, 0, 256, 256);
};

var ScreenFill = function(color) {
	Poly.call(this, 0, 0, 256, 256, color);
};

var InnerBound = function() {
	Rect.call(this, 0, 0, 240, 240);
};

var OuterBound = function() {
	Rect.call(this, -32, -32, 288, 288);
};

var Dot = function(color) {
	Poly.call(this, 0, 0, 1, 1, color);
};


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
var AsteroidField = function() {
	this.system = {
		field: new Field(Asteroid, 200, 10, new OuterBound)
	};
};
AsteroidField.prototype = new Entity();
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
var Screen = function() {
	this.system = {
		polygon: new Polygon(new ScreenFill('#222')),
		canvas: new Canvas('game', '2d', false)
	};
};
Screen.prototype = new Entity();
var Star = function() {
	this.system = {
		control: new Control(5, 5),
		movement: new Movement(),
		polygon: new Polygon(new Dot('#ccc'))
	};

	FromEdge.call(this, this.system.control, new OuterBound(), -1, 0);
};
Star.prototype = new Entity();
var StarField = function() {
	this.system = {
		field: new Field(Star, 10, 100, new OuterBound)
	};
};
StarField.prototype = new Entity();
var Game = function() {
	this.obj = {
		screen: new Screen(),
		player: new Player(),
		keys: new Keys(),
		starfield: new StarField(),
		asteroidfield: new AsteroidField(),
		scoring: new Scoring()
	};

	this.main = function(ref) {
		for (var o in ref.obj) {
			ref.obj[o].update && ref.obj[o].update(ref.obj);
		}

		requestAnimationFrame(function() { ref.main(ref) });
	};

	this.main(this);
};

var g = new Game();