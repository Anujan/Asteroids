(function(Asteroids) {
  function Bullet(posX, posY, velX, velY) {
    var args = Array.prototype.slice.call(arguments);
    args.push(Bullet.RADIUS);
    args.push(Bullet.COLOR);
    Asteroids.MovingObject.apply(this, args);
    this.game = null;
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.RADIUS = 1;
  Bullet.COLOR = '#FF0000';

  Bullet.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);
    this.hitAsteroids();
  }

  Bullet.prototype.fixPosition = function() {
    if (this.posX > this.game.DIM_X || this.posX < 0
      || this.posY > this.game.DIM_Y || this.posY < 0) {
      this.game.removeBullet(this);
    }
  }

  Bullet.prototype.hitAsteroids = function() {
    var self = this;
    this.game.asteroids.forEach(function(el) {
      if (self.isCollidedWith(el)) {
        self.game.removeBullet(self);
        self.game.removeAsteroid(el);
      }
    });
  }

  Asteroids.Bullet = Bullet;

})(Asteroids)