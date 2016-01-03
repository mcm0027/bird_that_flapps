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