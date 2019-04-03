const Phaser = require('phaser');
const serialRead = require('../serialRead');

class StartScreen extends Phaser.Scene {
   constructor() { 
    super('StarScreen'); 
    serialRead.addListener(this.onSerialMessage.bind(this));
    // takes the below function and attaches it to the serial port
   }
   create(){ // HTML user interface, generate array of bullets
    this.overlay = document.querySelector('#start-screen');
    // Ever time this scene begins
    this.overlay.classList.remove('hidden'); // initialize the title prompt as not hidden
    // removes the hidden class from start-screen
    this.serialMsg = ''; 
   }

   onSerialMessage(msg){
       console.log(msg); // print out message
       this.serialMsg = msg; // storing serialMsg to access it in the update function
   }

   update(totalTime, deltaTime){ // optional use of time, weren't using these
    // 0 open finger, 1 closed
    // 0:1:1:0-
    handValues = this.serialMsg.split(':');
    if(handValues[0] == 1 && handValues[1] == 1){ // all fingers are closed
        this.overlay.classList.add('hidden');
        this.scene.start('MainScene');
    }
   }
}

module.exports = StartScreen;