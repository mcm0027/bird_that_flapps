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