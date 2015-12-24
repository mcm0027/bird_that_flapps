var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function() {
  console.log("drawing a bird");
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;