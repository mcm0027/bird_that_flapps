(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
  this.entity = entity;
  this.radius = radius;
  this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
  if (entity.components.collision.type == 'circle') {
    return this.collideCircle(entity);
  }
  else if (entity.components.collision.type == 'rect') {
    return this.collideRect(entity);
  }
  return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;

  var radiusA = this.radius;
  var radiusB = entity.components.collision.radius;

  var diff = {x: positionA.x - positionB.x,
              y: positionA.y - positionB.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  var radiusSum = radiusA + radiusB;

  return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
  var clamp = function(value, low, high) {
    if (value < low) {
      return low;
    }
    if (value > high) {
      return high;
    }
    return value;
  };

  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;
  var sizeB = entity.components.collision.size;

  var closest = {
    x: clamp(positionA.x, positionB.x - sizeB.x / 2,
             positionB.x + sizeB.x / 2),
    y: clamp(positionA.y, positionB.y - sizeB.y / 2,
             positionB.y + sizeB.y / 2)
  };


  var radiusA = this.radius;

  var diff = {x: positionA.x - closest.x,
              y: positionA.y - closest.y};

  var distanceSquared = diff.x * diff.x + diff.y * diff.y;
  return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;
},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
  this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
  if (entity.components.collision.type == 'circle') {
    return this.collideCircle(entity);
  }
  else if (entity.components.collision.type == 'rect') {
    return this.collideRect(entity);
  }
  return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
  return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
  var positionA = this.entity.components.physics.position;
  var positionB = entity.components.physics.position;

  var sizeA = this.size;
  var sizeB = entity.components.collision.size;

  var leftA = positionA.x - sizeA.x / 2;
  var rightA = positionA.x + sizeA.x / 2;
  var bottomA = positionA.y - sizeA.y / 2;
  var topA = positionA.y + sizeA.y / 2;

  var leftB = positionB.x - sizeB.x / 2;
  var rightB = positionB.x + sizeB.x / 2;
  var bottomB = positionB.y - sizeB.y / 2;
  var topB = positionB.y + sizeB.y / 2;

  return !(leftA > rightB || leftB > rightA ||
           bottomA > topB || bottomB > topA);
};


exports.RectCollisionComponent = RectCollisionComponent;
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){


var PhysicsComponent = function(entity) {
  this.entity = entity;
  
  this.position = {
    x: 0,
    y: 0
  };
  
  this.velocity = {
    x:0,
    y:0
  };
  
  this.acceleration = {
    x:0,
    y:0
  };
  
};

PhysicsComponent.prototype.update = function(delta) {
  this.velocity.x += this.acceleration.x * delta;
  this.velocity.y += this.acceleration.y * delta;
  
  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],6:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");
var graphicsSystem = require("../systems/graphics")

var Bird = function() {
  var radius = 0.04;
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.y = 0.5;
  physics.position.x = -0.35;
  physics.acceleration.y = -1.2;
  
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
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":5,"../systems/graphics":11}],7:[function(require,module,exports){
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
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":5}],8:[function(require,module,exports){
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
  

  
  this.entities[0].components.collision.onCollision = () => {
    console.log(this.entities[1]);
    this.graphics.pause();
    $(".logo").show("slow");
    $("#score").hide();
    window.clearInterval(scoreCount);
    document.getElementById("score").innerHTML = "Wow, your score is: " + score;
    document.getElementById("score").style.top = "45%";
    document.getElementById("score").style.color = "#fff";
    $("#score").show("slow");
  };
  for (var i =0; i < this.entities.length; i++) {
    console.log(this.entities[i]);
  }
  
  score = 0;
  var scoreCount = function(){};
  scoreCount = window.setInterval((function(){score = score+10; document.getElementById("score").innerHTML = score;}), 400000 /60);
  
  this.input.reset = () => {
    location.reload();
  }
};


FlappyBird.prototype.run = function() {
  this.pipes.run();
  this.graphics.run();
  this.physics.run();
  this.input.run();
};




exports.FlappyBird = FlappyBird;
},{"./entities/bird":6,"./entities/pipe":7,"./systems/graphics":11,"./systems/input":12,"./systems/physics":13,"./systems/pipes":14}],9:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new flappyBird.FlappyBird();
  app.run();
});
},{"./flappy_bird":8}],10:[function(require,module,exports){
var CollisionSystem = function(entities) {
  this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
  for (var i=0; i<this.entities.length; i++) {
    var entityA = this.entities[i];
    if (!'collision' in entityA.components) {
      continue;
    }

    for (var j=i+1; j<this.entities.length; j++) {
      var entityB = this.entities[j];
      if (!'collision' in entityB.components) {
        continue;
      }

      if (!entityA.components.collision.collidesWith(entityB)) {
        continue;
      }

      if (entityA.components.collision.onCollision) {
        entityA.components.collision.onCollision(entityB);
      }

      if (entityB.components.collision.onCollision) {
        entityB.components.collision.onCollision(entityA);
      }
    }
  }
};

exports.CollisionSystem = CollisionSystem;
},{}],11:[function(require,module,exports){
var GraphicsSystem = function (entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  this.context = this.canvas.getContext('2d');
  this.paused = true;

};

GraphicsSystem.prototype.run = function () {
  window.requestAnimationFrame(this.tick.bind(this));
  this.paused = false;
};

GraphicsSystem.prototype.pause = function () {
  this.paused = true;
};

GraphicsSystem.prototype.reset = function () {
  this.paused = false;
};

GraphicsSystem.prototype.tick = function () {
  if (this.canvas.width != this.canvas.offsetWidth ||
    this.canvas.height != this.canvas.offsetHeight) {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.context.save();
  this.context.translate(this.canvas.width / 2, this.canvas.height);
  this.context.scale(this.canvas.height, -this.canvas.height);


  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];
    if (!'graphics' in entity.components) {
      continue;
    }
    entity.components.graphics.draw(this.context);
  }

  this.context.restore();
  
  if(!this.paused) {
    window.requestAnimationFrame(this.tick.bind(this));
  };
};

exports.GraphicsSystem = GraphicsSystem;
},{}],12:[function(require,module,exports){

var InputSystem = function(entities) {
  this.entities = entities;

  // Canvas is where we get input from
  this.canvas = document.getElementById('main-canvas');
  this.reset = document.getElementById('reset');
  this.document = document;
};

InputSystem.prototype.run = function() {
  this.document.addEventListener('click', this.onClick.bind(this));
};

var clicks = 0;

InputSystem.prototype.onClick = function() {
  var bird = this.entities[0];
  if (clicks === 0) {
    $(".logo").hide("slow");
  };
  clicks++;
  bird.components.physics.velocity.y = 0.7;
  bird.components.graphics.image.src = './img/paint-bird-up.png'
  setTimeout(function(){ bird.components.graphics.image.src = './img/paint-bird-down.png' ; }, 300);
  
};

InputSystem.prototype.reset = function() {
  this.reset.addEventListener('click', this.resetGame.bind(this));
};

InputSystem.prototype.resetGame = function() {
  console.log("reset");
};

exports.InputSystem = InputSystem;
},{}],13:[function(require,module,exports){
var collisionSystem = require ("./collision");

var PhysicsSystem = function(entities) {
  this.entities = entities;
  this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
  window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function() {
  for (var i=0; i<this.entities.length; i++) {
    var entity = this.entities[i];
    if (!'physics' in entity.components) {
      continue;
    }
    entity.components.physics.update(1/60);
  }
  this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":10}],14:[function(require,module,exports){
var pipe = require('../entities/pipe');


var PipeSystem = function(entities) {
  this.entities = entities;
};


PipeSystem.prototype.run = function() {
  // Run the update loop
  window.setInterval(this.tick.bind(this), 300000 /60);
  console.log(this);

};

PipeSystem.prototype.tick = function() {
  var width = 0.1;
  var gap = (Math.floor(Math.random()*10)/20)+.27; 
  var height = (1 - gap)/2;
  var position = {
    x: 2 - width*.5,
    y: 1 - height*.5
  }
  
  var size = {
    x: width,
    y: height
  }

  this.entities.push(new pipe.Pipe(position, size, "#333", "T"));
  
  
  var position = {
    x: 2 - width*.5,
    y: 0 + height*.5
  }

  var size = {
    x: width,
    y: height
  }
  this.entities.push(new pipe.Pipe(position, size, "#777", "B"));
};

exports.PipeSystem = PipeSystem;
},{"../entities/pipe":7}]},{},[9]);
