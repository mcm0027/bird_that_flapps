var PipeGraphicsComponent = function(entity, size, pos) {
  this.entity = entity;
  this.size = size;
  this.image1 = new Image();
  this.image1.src = './img/pipe1.png';
  this.image2 = new Image();
  this.image2.src = './img/pipe2.png';
  this.pos = pos;
};

PipeGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  var color = this.entity.components.graphics.color;

//    context.save();
//    context.translate(position.x, position.y);
//    context.beginPath();
//    context.fillRect(1.2,.2, 0.1, 0.5);
//    context.fill();
//    context.closePath();
//    context.restore();

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.fillStyle=color;
  context.fillRect(-this.size.x*.5, -this.size.y*.5, this.size.x, this.size.y);
  context.fill();
//  context.strokeStyle = '#ffffff';
//  context.strokeRect(1, 1, .01, .05);
  context.closePath();
  if (this.pos === "T"){
    context.drawImage(this.image1, -this.size.x*.5, -this.size.y*.5, this.size.x, this.size.y);
  } else {
    context.drawImage(this.image2, -this.size.x*.5, -this.size.y*.5, this.size.x, this.size.y);
  };
  context.restore();

};

exports.PipeGraphicsComponent = PipeGraphicsComponent;