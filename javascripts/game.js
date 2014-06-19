
	
	var player = {
	  color: "#00A",
	  x: 50,
	  y: 270,
	  width: 20,
	  height: 30,
	  draw: function() {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);
	  }
	};

	var playerBullets = [];
	
	function Bullet(I) {
	  I.active = true;

	  I.xVelocity = 0;
	  I.yVelocity = -I.speed;
	  I.width = 3;
	  I.height = 3;
	  I.color = "#000";

	  I.inBounds = function() {
		return I.x >= 0 && I.x <= CANVAS_WIDTH &&
		  I.y >= 0 && I.y <= CANVAS_HEIGHT;
	  };

	  I.draw = function() {
		canvas.fillStyle = this.color;
		canvas.fillRect(this.x, this.y, this.width, this.height);
	  };
	  
	  I.update = function() {
		I.x += I.xVelocity;
		I.y += I.yVelocity;

		I.active = I.active && I.inBounds();
	  };

	  I.explode = function() {
		this.active = false;
		// Extra Credit: Add an explosion graphic
	  };

	  return I;
	}

	enemies = [];

	function Enemy(I) {
	  I = I || {};

	  I.active = true;
	  I.age = Math.floor(Math.random() * 128);
	  
	  I.color = "#A2B";

	  I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
	  I.y = 0;
	  I.xVelocity = 0
	  I.yVelocity = 2;

	  I.width = 32;
	  I.height = 32;

	  I.inBounds = function() {
		return I.x >= 0 && I.x <= CANVAS_WIDTH &&
		  I.y >= 0 && I.y <= CANVAS_HEIGHT;
	  };

	  I.sprite = Sprite("enemy");

	  I.draw = function() {
		this.sprite.draw(canvas, this.x, this.y);
	  };

	  I.update = function() {
		I.x += I.xVelocity;
		I.y += I.yVelocity;

		I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);

		I.age++;

		I.active = I.active && I.inBounds();
	  };

	  I.explode = function() {
		Sound.play("explosion");

		this.active = false;
		// Extra Credit: Add an explosion graphic
	  };

	  return I;
	};
	
	
	player.shoot = function() {
	  Sound.play("shoot");

	  var bulletPosition = this.midpoint();

	  playerBullets.push(Bullet({
		speed: 5,
		x: bulletPosition.x,
		y: bulletPosition.y
	  }));
	};

	player.midpoint = function() {
	  return {
		x: this.x + this.width/2,
		y: this.y + this.height/2
	  };
	};
	
	function collides(a, b) {
	  return a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y;
	}

	function handleCollisions() {
	  playerBullets.forEach(function(bullet) {
		enemies.forEach(function(enemy) {
		  if(collides(bullet, enemy)) {
			enemy.explode();
			bullet.active = false;
		  }
		});
	  });

	  enemies.forEach(function(enemy) {
		if(collides(enemy, player)) {
		  enemy.explode();
		  player.explode();
		}
	  });
	}

	player.explode = function() {
	  this.active = false;
	  // Extra Credit: Add an explosion graphic and then end the game
	};

	player.sprite = Sprite("player");

	player.draw = function() {
	  this.sprite.draw(canvas, this.x, this.y);
	};