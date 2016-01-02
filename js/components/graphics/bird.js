var BirdGraphicsComponent = function(entity, radius) {
  this.entity = entity;
  this.radius = radius;
  this.image = new Image();
  this.image.src = './img/paint-bird-down.png';
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var image = document.getElementById("source");
  var width = this.radius * 4;
  var height = width;
  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.arc(0, 0, this.radius, 0, 2 * Math.PI);
  context.fillStyle = "rgba(255, 255, 255, 0)";
  context.fill();
  context.closePath();
  context.drawImage(this.image,-.045 , -.05, width, height);
  context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;