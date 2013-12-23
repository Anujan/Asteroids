(function(Asteroids) {
  function Game(ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship(Game.DIM_X / 2, Game.DIM_Y / 2, 0, 0);
    this.timer = null;
    this.bullets = [];
    this.points = 0;
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;

  Game.prototype.addAsteroids = function() {
    var numAsteroids = 15;
    var asteroids = [];
    for (var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
    return asteroids;
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    var self = this;
    this.asteroids.forEach(function (ast) {
      ast.draw(self.ctx);
    });

    this.ship.draw(this.ctx);

    this.bullets.forEach(function (bullet) {
      bullet.draw(this.ctx);
    });
  };

  Game.prototype.move = function() {
    this.asteroids.forEach(function (ast) {
      ast.move();
    });

    this.ship.move();

    this.bullets.forEach(function (bullet) {
      bullet.move();
    });
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    if (this.checkCollisions()) {
      this.stop();
      alert("Game over!!");
    }
    this.outOfBounds();
  };

  Game.prototype.start = function() {
    this.timer = setInterval(this.step.bind(this), 30);
    this.bindKeyHandlers();
  };

  Game.prototype.stop = function() {
    clearInterval(this.timer);
  }

  Game.prototype.checkCollisions = function() {
    var collided = false;
    var ship = this.ship;
    this.asteroids.forEach(function (ast) {
      if (ast.isCollidedWith(ship)) {
        collided = true;
      }
    });

    return collided;
  }

  Game.prototype.fireBullet = function() {
    if (this.bullets.length > 10) {
      return;
    }
    var bullet = this.ship.fireBullet();
    if (bullet) {
      bullet.game = this;
      this.bullets.push(bullet);
    }
  }

  Game.prototype.outOfBounds = function() {
    var objs = this.bullets.concat(this.asteroids).concat([this.ship]);
    objs.forEach(function (el) {
      el.fixPosition();
    });
  }

  Game.prototype.removeBullet = function (bullet) {
    var index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

  Game.prototype.removeAsteroid = function (asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
    this.points += 100;
  }

  Game.prototype.bindKeyHandlers = function () {
    var self = this;
    key('up, left, right, down', function (e, handler) {
      var key = handler.shortcut;
      var y = handler.shortcut == "up" ? -1 : (handler.shortcut == 'down' ? 1 : 0);
      var x = handler.shortcut == "right" ? 1 : (handler.shortcut == 'left' ? -1 : 0);
      self.ship.power(x, y);
    });
    key('space', self.fireBullet.bind(self));
  }

  Asteroids.Game = Game;
})(Asteroids);