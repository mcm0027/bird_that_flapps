var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipes');
var bird = require('./entities/bird');
var pipe =require('./entities/pipe');


var FlappyBird = function() {
  this.entities = [new bird.Bird()];
  this.pipes = new pipeSystem.PipeSystem(this.entities);
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.pipes.run();
  this.graphics.run();
  this.physics.run();
  this.input.run();
};

exports.FlappyBird = FlappyBird;