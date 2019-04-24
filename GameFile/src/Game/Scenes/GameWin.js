const Phaser = require('phaser');
const serialRead = require('../serialRead');

class GameWin extends Phaser.Scene {
   constructor() { 
    super('GameWin'); 
    serialRead.addListener(this.onSerialMessage.bind(this));
   }
   create(){ // HTML user interface, generate array of bullets
    this.overlay = document.querySelector('#game-win');
    // Ever time this scene begins
    this.overlay.classList.remove('hidden'); // initialize the title prompt as not hidden
    // removes the hidden class from game-screen

   }
   onSerialMessage(msg){
    //console.log(msg); // print out message
    this.serialMsg = msg; // storing serialMsg to access it in the update function
    }

   update(totalTime, deltaTime){ // optional use of time, weren't using these
   // TO DO: change key press to finger position

   const handValues = this.serialMsg.split(':');
   // finger down sound
   if(handValues[0] == 1 && !this.wasIndexLastFrameDown){
    this.sound.play('index', {volume: 0.34});
    console.log("playing sound");
}
if(handValues[1] == 1 && !this.wasMiddleLastFrameDown){ 
    this.sound.play('middle', {volume: 0.34});
}    
if(handValues[2] == 1 && !this.wasRingLastFrameDown){ 
    this.sound.play('ring', {volume: 0.34});
}    
if(handValues[3] == 1 && !this.wasPinkyLastFameDown){
    this.sound.play('pinkie', {volume: 0.34});
}
// update for last frame down
if(handValues[0] == 1){
    this.wasIndexLastFrameDown = true;
    console.log("finger is down");
}
else{
    this.wasIndexLastFrameDown = false;
    console.log("finger is up");
}

if(handValues[1] == 1){
    this.wasMiddleLastFrameDown = true;
}
else{
    this.wasMiddleLastFrameDown = false;
}
if(handValues[2] == 1){
    this.wasRingLastFrameDown = true;
}
else{
    this.wasRingLastFrameDown = false;
}
if(handValues[3] == 1){
    this.wasPinkyLastFameDown = true;
}
else{
    this.wasPinkyLastFameDown = false;
}
    if(handValues[0] == 1 && handValues[1] == 1 && handValues[2] == 1 && handValues[3] == 1){ // all fingers are closed
        this.overlay.classList.add('hidden');
        this.scene.start('Startscreen'); // transition to start scene
    }
   // Hi Willie! From Me~ Kenny
   }
}

module.exports = GameWin;