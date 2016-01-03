
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