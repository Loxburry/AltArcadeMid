const Phaser = require('phaser');
const serialRead = require('../serialRead');

class GameOver extends Phaser.Scene {
   constructor() { 
    super('GameOver'); 
    serialRead.addListener(this.onSerialMessage.bind(this));
   }
   
   create(){ // HTML user interface, generate array of bullets
    this.overlay = document.querySelector('#game-over');
    // Ever time this scene begins
    this.overlay.classList.remove('hidden'); // initialize the title prompt as not hidden
    // removes the hidden class from game-screen
   }

   onSerialMessage(msg){
    console.log(msg); // print out message
    this.serialMsg = msg; // storing serialMsg to access it in the update function
    }

   update(totalTime, deltaTime){ // optional use of time, weren't using these
   // TO DO: change key press to finger position

   const handValues = this.serialMsg.split(':');
    if(handValues[0] == 1 && handValues[1] == 1){ // all fingers are closed
        this.overlay.classList.add('hidden');
        // make it hidden
        this.scene.start('Startscreen'); // transition to start scene
    }
   }
}

module.exports = GameOver;