var Asteroids = Asteroids || {};
(function (root) {
  function MovingObject(posX, posY, velX, velY, radius, color) {
    var args = Array.prototype.slice.call(arguments);
    args = _.flatten(args); //Allow passing of arrays for pos and vel
    this.posX = args[0];
    this.posY = args[1];
    this.velX = args[2];
    this.velY = args[3];
    this.radius = args[4];
    this.color = args[5];
  }

  MovingObject.prototype.move = function() {
    this.posX += Math.floor(this.velX);
    this.posY += Math.floor(Math.random() * this.velY * Math.random() * 10);
  };

  MovingObject.prototype.fixPosition = function() {
    if (this.posX > Asteroids.Game.DIM_X) {
      this.posX = 0;
    } else if (this.posX < 0) {
      this.posX = Asteroids.Game.DIM_X;
    }
    if (this.posY > Asteroids.Game.DIM_Y) {
      this.posY = 0;
    } else if (this.posY < 0) {
      this.posY = Asteroids.Game.DIM_Y;
    }
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };

  MovingObject.prototype.isCollidedWith = function(other) {
    var len = Math.pow(other.posX - this.posX, 2) + Math.pow(other.posY - this.posY, 2);
    var euclideanDistance = Math.sqrt(len);
    return euclideanDistance < (this.radius + other.radius);
  };

  root.MovingObject = MovingObject;
})(Asteroids);