var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(position, size, col, pos) {
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.x = position.x;
  physics.position.y = position.y;
  physics.acceleration.x = -0.5;

  var graphics = new graphicsComponent.PipeGraphicsComponent(this, size, pos); 
  var collision = new collisionComponent.RectCollisionComponent(this, size);
  collision.onCollision = this.onCollision.bind(this);
  graphics.color = col;
  
  this.components = {
    physics: physics,
    graphics: graphics,
    collision: collision
  };
};

Pipe.prototype.onCollision = function(entity) {
  console.log("Pipe collided with entity:", entity);
  console.log("test");
};

exports.Pipe = Pipe;