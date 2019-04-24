const Phaser = require('phaser');
const serialRead = require('../serialRead');

class StartScreen extends Phaser.Scene {
   constructor() { 
    super('Startscreen'); 
    serialRead.addListener(this.onSerialMessage.bind(this));
    // takes the below function and attaches it to the serial port
   }
   preload(){
       this.load.audio('start',['./sound/start.mp3']);
       this.load.audio('index',['./sound/Low.mp3']);
       this.load.audio('middle',['./sound/Med_Low.mp3']);
       this.load.audio('ring',['./sound/Med_High.mp3']);
       this.load.audio('pinkie',['./sound/High.mp3']);
       this.load.audio('titleTheme',['./sound/titleTheme.mp3']);
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
   this.wasIndexLastFrameDown = false; // initialize all fingers as not down last frame
   this.wasMiddleLastFrameDown = false;
   this.wasRingLastFrameDown = false;
   this.wasPinkyLastFameDown = false;
   }

   onSerialMessage(msg){
       //console.log(msg); // print out message
       this.serialMsg = msg; // storing serialMsg to access it in the update function
   }

   update(totalTime, deltaTime){ // optional use of time, weren't using these
    // 0 open finger, 1 closed
    // 0:1:1:0-
    const handValues = this.serialMsg.split(':');


    // finger down sound
    if(handValues[0] == 1 && !this.wasIndexLastFrameDown){
        this.sound.play('index', {volume: 0.34});
       // console.log("playing sound");
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
       // console.log("finger is down");
    }
    else{
        this.wasIndexLastFrameDown = false;
        //console.log("finger is up");
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


    if(handValues[0] == 0 && handValues[1] == 1 && handValues[2] == 1 && handValues[3] == 1){ // all fingers are closed
        this.sound.play('start', { volume: 0.8 });// set volume between 0 and 1
        this.overlay.classList.add('hidden');
        this.scene.start('MainScene');
    }
    //   might need to turn off 
    // this.sound.play('titleTheme', {loop: true, volume: 0.8});
    // when transitioning
   }
}

module.exports = StartScreen;