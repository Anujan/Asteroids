(function(Asteroids) {
  function Ship(posX, posY, velX, velY) {
    var args = Array.prototype.slice.call(arguments);
    args.push(Ship.RADIUS);
    args.push(Ship.COLOR);
    Asteroids.MovingObject.apply(this, args);
    this.img = new Image(70, 70);
    this.img.src = 'ship.png';
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 45;
  Ship.COLOR = '#AAAA00';

  Ship.prototype.power = function(x, y) {
    this.velX += x;
    this.velY += y;
  }

  Ship.prototype.fireBullet = function() {
    if (this.velX === 0 && this.velY === 0) {
      return null;
    }
    var pos = [Ship.RADIUS + this.posX, Ship.RADIUS + this.posY];
    var speed = Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2));
    var vel = [10 * (this.velX / speed), 10 * (this.velY / speed)];
    return new Asteroids.Bullet(pos, vel);
  }

  Asteroids.Ship = Ship;

})(Asteroids)