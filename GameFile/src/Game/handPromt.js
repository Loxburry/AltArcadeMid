const Phaser = require('phaser');

class handPromt {
    constructor(index, pos) {
        this.x = 0;
        this.y = 450;
        //index is a val from 0 to 3, used to determine x position
        this.index = 0;
        //rot is a value from 0 to 3, see the draw function below
        this.position = pos;
        this.isActive = true;

        if(index == 0){
            this.x = 250;
        }
        if(index == 1){
            this.x = 350;
        }
        if(index == 2){
            this.x = 450;
        }
        if(index == 3){
            this.x = 550;
        }

        this.box = [
            new Phaser.Geom.Point(-25, -25),
            new Phaser.Geom.Point(-25, 25),
            new Phaser.Geom.Point(25, 25),
            new Phaser.Geom.Point(25, -25),
            new Phaser.Geom.Point(-25, -25)
        ]
    }

    activate(){
        this.isActive = true;
    }
    
    deactivate(){ 
        this.isActive = false;
    }

    update(deltaTime, keys){
        //connect arrow key and rotation number
        //if correct key and rotation pressed, deactivate arrow        
    }
    
    draw(graphics) {
        if(this.isActive){
            graphics.fillStyle(0xff0000, 1.0);
            graphics.save();
            graphics.translate(this.x, this.y);        

            // include sprites here
            if(this.position == 0){ // all fingers are open
               
            }

            if(this.position == 1){ // index finger down
               
            }
            
            if(this.position == 2){ // middle finger down
                
            }

            if(this.position == 3){ // index + middle down
                
            }

            graphics.save();
            graphics.translate(this.x, this.y);
            graphics.lineStyle(4, 0xff0000, 1.0);
            graphics.strokePoints(this.box);
            graphics.restore();
        }
    }
}

module.exports = handPromt;