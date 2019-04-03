class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.isActive = false;// initializing enemies to be asleep
    }
  
  activate(x,y, forwardRot){
      this.x = x;
      this.y = y;
      this.forwardRot = forwardRot;
      this.isActive = true; // arm the bullet  
  }
  
  deactivate(){ // when timer is done and off screen
    this.isActive = false;
  }
  
    update(deltaTime, keys) {// generates stuff every frame
      if(this.isActive){
        const forwardX = -Math.sin(this.forwardRot); // because we are facing down and NOT to the we right we will use SIN instead of COS
        const forwardY = Math.cos(this.forwardRot);
      }
    }
  
    draw(graphics) {
      if(this.isActive){
        graphics.save();
        graphics.translate(this.x, this.y);
        graphics.rotate(this.forwardRot);
        graphics.lineStyle(2, 0x009933, 1.0)
        
        graphics.restore();
      }
    }
  }
  
  module.exports = Enemy;
  