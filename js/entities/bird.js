var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");

var Bird = function() {
  var radius = 0.04;
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.y = 0.5;
  physics.position.x = -0.5;
  physics.acceleration.y = -2;
  
  var graphics = new graphicsComponent.BirdGraphicsComponent(this, radius);
  var collision = new collisionComponent.CircleCollisionComponent(this, radius);
  collision.onCollision = this.onCollision.bind(this);
  this.components = {
    physics: physics,
    graphics: graphics,
    collision: collision
  };
};

Bird.prototype.onCollision = function(entity) {
  console.log("Bird collided with entity:", entity);
  console.log("test");
};

exports.Bird = Bird;