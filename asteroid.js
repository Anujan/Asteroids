(function (Asteroids) {
  function Asteroid(posX, posY, velX, velY) {
    var args = Array.prototype.slice.call(arguments);
    args.push(Asteroid.RADIUS);
    args.push(Asteroid.COLOR);
    Asteroids.MovingObject.apply(this, args);
    this.img = new Image(60, 60);
    this.img.src = 'asteroid.png';
  }

  Asteroid.COLOR = '#FFFFFF';
  Asteroid.RADIUS = 60;

  Asteroids.Asteroid = Asteroid;

  Function.prototype.inherits = function (base) {
    function Surrogate() {};
    Surrogate.prototype = base.prototype;
    this.prototype = new Surrogate();
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroids.Asteroid.randomAsteroid = function(dimX, dimY) {
    var pos = [dimX * Math.random(), dimY * Math.random()];
    pos = pos.map(Math.floor);
    var vel = [Math.random(), Math.random()];
    if (Math.random() < 0.5) {
      vel = vel.map(function(el) {
        return el * (Math.random() + 1);
      });
    }
    return new Asteroid(pos, vel);
  };
})(Asteroids);