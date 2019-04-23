const Phaser = require('phaser');
const serialRead = require('../serialRead');

class StartScreen extends Phaser.Scene {
   constructor() { 
    super('Startscreen'); 
    serialRead.addListener(this.onSerialMessage.bind(this));
    // takes the below function and attaches it to the serial port
   }
   preload(){
       this.load.audio('start',['./start.mp3']);
       this.load.audio('index',['./Low.mp3']);
       this.load.audio('middle',['./Med_Low.mp3']);
       this.load.audio('ring',['./Med_High.mp3']);
       this.load.audio('pinkie',['./High.mp3']);
       this.load.audio('titleTheme',['./titleTheme.mp3']);
   }
   create(){ // HTML user interface, generate array of bullets
    this.overlay = document.querySelector('#start-screen');
    // Ever time this scene begins
    this.overlay.classList.remove('hidden'); // initialize the title prompt as not hidden
    // removes the hidden class from start-screen
    this.serialMsg = ''; 
    // looping bg music
    this.sound.play('titleTheme', {loop: true, volume: 0.8});
   // this.sound.play('soundtrack', { loop: true });
   }

   onSerialMessage(msg){
       //console.log(msg); // print out message
       this.serialMsg = msg; // storing serialMsg to access it in the update function
   }

   update(totalTime, deltaTime){ // optional use of time, weren't using these
    // 0 open finger, 1 closed
    // 0:1:1:0-
    const handValues = this.serialMsg.split(':');
    if(handValues[0] == 1 && handValues[1] == 1 && handValues[2] == 1 && handValues[3] == 1){ // all fingers are closed
        this.sound.play('start', { volume: 0.5 });// set volume between 0 and 1
        this.overlay.classList.add('hidden');
        this.scene.start('MainScene');
    }
    // one button continue code
    // if(handValues[0] == 1){
    //     this.sound.play('start', { volume: 0.5 });// set volume between 0 and 1
    //     this.overlay.classList.add('hidden');
    //     this.scene.start('MainScene');
    // }
    
   }
}

module.exports = StartScreen;