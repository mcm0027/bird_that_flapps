var PhysicsSystem = function(entities) {

};

PhysicsSystem.prototype.run = function() {
  window.setInterval(this.tick.bind(this), 1000 /60);
};
