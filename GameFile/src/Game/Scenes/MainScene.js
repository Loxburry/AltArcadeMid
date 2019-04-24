const Phaser = require('phaser');
const serialRead = require('../serialRead');
//Import "Actors"
const handPromt = require('../handPromt');

let success = 0;
let candel = 0;
let defeated = 0;
let timeLimit = 350;
let timer = 350;
let over = false;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class MainScene extends Phaser.Scene {
   constructor() { 
    super('MainScene'); 
    serialRead.addListener(this.onSerialMessage.bind(this));
   }
   preload(){
    this.load.audio('index',['./sound/Low.mp3']);
    this.load.audio('middle',['./sound/Med_Low.mp3']);
    this.load.audio('ring',['./sound/Med_High.mp3']);
    this.load.audio('pinkie',['./sound/High.mp3']);
    this.load.audio('candle',['./sound/ignite.mp3']);
    // add bg music 
    }
   create(){ 
    success = 0;
    candel = 0;
    timeLimit = 350;
    timer = 350;
    over = false;
    this.didFirstSpawn = false;
    this.graphics = this.add.graphics({
        fillStyle: { color: 0xeeeeee },
        lineStyle: { width: 4, color: 0xffffff },
      });
    this.overlay = document.querySelector('#demon');
    // Ever time this scene begins
    this.overlay.classList.remove('hidden');
    this.handPromts = []; // an array of objects we can call from later
    this.randomInt = -1;
    this.prev = -1;
    this.first;
    for(let i = 0; i < 4; i++) { // create 4 promts on screen at a time
        this.randomInt = getRandomInt(12);
        while(this.randomInt == this.prev || (i == 0 && this.randomInt == 0) || (i== 3 && this.randomInt == this.first)){ 
        // can't repeat the last hand gesture, can't have the first gesture be a point, can't have the last gesture be the same as the first
        this.randomInt = getRandomInt(12);
        }
        if(i == 0){
          this.first = this.randomInt;
        }
      this.handPromts.push(new handPromt(i, this.randomInt)); // create an array with data on each handPrompt object
      const currentPrompt = document.getElementById("prompt"+i);
      //console.log("current prompt: " +currentPrompt, "prompt"+i, this.randomInt);
      if(this.randomInt == 0){ // index only
        currentPrompt.querySelector('img').src = "./img/1000.png";
      }
      if(this.randomInt == 1){ // middle only
        currentPrompt.querySelector('img').src =  "./img/0100.png";
      }
      if(this.randomInt == 2){
        currentPrompt.querySelector('img').src =  "./img/0010.png";
      }
      if(this.randomInt == 3){
        currentPrompt.querySelector('img').src =  "./img/0001.png";
      }
      if(this.randomInt == 4){
        currentPrompt.querySelector('img').src =  "./img/1100.png";
      }
      if(this.randomInt == 5){
        currentPrompt.querySelector('img').src =  "./img/1010.png";
      }
      if(this.randomInt == 6){
        currentPrompt.querySelector('img').src =  "./img/1001.png";
      }
      if(this.randomInt == 7){
        currentPrompt.querySelector('img').src =  "./img/0110.png";
      }
      if(this.randomInt == 8){
        currentPrompt.querySelector('img').src =  "./img/0101.png";
      }
      if(this.randomInt == 9){
        currentPrompt.querySelector('img').src =  "./img/0011.png";
      }
      if(this.randomInt == 10){
        currentPrompt.querySelector('img').src =  "./img/1110.png";
      }
      if(this.randomInt == 11){
        currentPrompt.querySelector('img').src =  "./img/1101.png";
      }
      if(this.randomInt == 12){
        currentPrompt.querySelector('img').src =  "./img/1011.png";
      }
      currentPrompt.classList.remove('hidden'); // make the prompts visable
      this.prev = this.randomInt; // after adding handPrompt we set it to previous and do the loop again
    }
    }

onSerialMessage(msg){
  //console.log(msg);
  this.serialMsg = msg;
}

 update(_, deltaTime) {
    //console.log("Success = " + success);
    // do I need to call the onSerialMessage function here before I update the value of handValues?
    const handValues = this.serialMsg.split(':'); // update the position of the fingers
    // Finger Position
    // 0 all fingers open
    // 1 index finger down
    // 2 middle down 
    // 3 index + middle down

    // Hand Values
    // 0 index finger
    // 1 middle finger

    // success is the index/position of the handPrompt
    if (success !== 4) {

      if(this.handPromts[success].position == 0 && handValues[0] == 1 && handValues[1] == 0 && handValues[2] == 0 && handValues[3] == 0){ // position 0 | all fingers open
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        // make candel appear later
        success++;
      } else if(this.handPromts[success].position == 1 && handValues[0] == 0 && handValues[1] == 1 && handValues[2] == 0 && handValues[3] == 0){ // position 1 | index finger down
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 2 && handValues[0] == 0 && handValues[1] == 0 && handValues[2] == 1 && handValues[3] == 0){ // position 2 | middle finger down
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 3 && handValues[0] == 0 && handValues[1] == 0 && handValues[2] == 0 && handValues[3] == 1){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 4 && handValues[0] == 1 && handValues[1] == 1 && handValues[2] == 0 && handValues[3] == 0){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 5 && handValues[0] == 1 && handValues[1] == 0 && handValues[2] == 1 && handValues[3] == 0){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 6 && handValues[0] == 1 && handValues[1] == 0 && handValues[2] == 0 && handValues[3] == 1){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 7 && handValues[0] == 0 && handValues[1] == 1 && handValues[2] == 1 && handValues[3] == 0){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 8 && handValues[0] == 0 && handValues[1] == 1 && handValues[2] == 0 && handValues[3] == 1){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 9 && handValues[0] == 0 && handValues[1] == 0 && handValues[2] == 1 && handValues[3] == 1){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 10 && handValues[0] == 1 && handValues[1] == 1 && handValues[2] == 1 && handValues[3] == 0){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 11 && handValues[0] == 1 && handValues[1] == 1 && handValues[2] == 0 && handValues[3] == 1){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 12 && handValues[0] == 1 && handValues[1] == 0 && handValues[2] == 1 && handValues[3] == 1){ 
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      }
    }


    //builds the timer
    this.graphics.clear();
    if(over == false){
      this.graphics.save();
      this.graphics.fillRect(575, 390, -timer, 20);
      this.graphics.strokeRect(575, 390, -350, 20);
      this.graphics.restore();
      this.graphics.save();
    }

    //timer change over time
    timer -= deltaTime/100; // change this for difficulty
    //console.log(timer);
    if(timer <= 0){
      //code here handles what happens when player runs out of time
      timer = timeLimit;
      over = true;
      this.overlay.classList.add('hidden');
      document.getElementById("prompt0").classList.add('hidden');
      document.getElementById("prompt1").classList.add('hidden');
      document.getElementById("prompt2").classList.add('hidden');
      document.getElementById("prompt3").classList.add('hidden');
      //this.scene.start('GameOver');
      //this.overlay = document.querySelector('#game-lose');
      
      // Ever time this scene begins
      //this.overlay.classList.remove('hidden');
      over = true;
      this.overlay.classList.add('hidden');
      for(this.i = 0; this.i < 5; this.i++){
        document.getElementById("candel"+this.i).classList.add('hidden');
      }
      this.scene.start('GameOver');
    }

    this.handPromts.forEach((b) => { b.draw(this.graphics); });
    if(success == 4){ // ignite a candel
      candel++; // change for debuging
      if(candel == 1){
        this.sound.play('candle', {volume: 0.8});
        this.c2 = document.querySelector('#candel2');
        this.c2.classList.remove('hidden');
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden');
        }
        success = 0;
      }
      if(candel == 2){
        this.sound.play('candle', {volume: 0.8});
        this.c3 = document.querySelector('#candel3');
        this.c3.classList.remove('hidden');
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden');
        }
        success = 0;
      }
      if(candel == 3){
        this.sound.play('candle', {volume: 0.8});
        this.c0 = document.querySelector('#candel0');
        this.c0.classList.remove('hidden');
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden');
        }
        success = 0;
      }
      if(candel == 4){
        this.sound.play('candle', {volume: 0.8});
        this.c4 = document.querySelector('#candel4');
        this.c4.classList.remove('hidden');
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden');
        }
        success = 0
      }
      if(candel == 5){
        this.c1 = document.querySelector('#candel1');
        this.c1.classList.remove('hidden');
        over = true;
        // figure out delay function
        // figure out screen shake
        defeated++;
        over = false;
        timer = 300;
        candel = 0;
        success = 0;
        for(this.i = 0; this.i < 5; this.i++){
          document.getElementById("candel"+this.i).classList.add('hidden');
        }
        this.overlay.classList.add('hidden');
        this.overlay = document.querySelector('#demon2');
        // Ever time this scene begins
        this.overlay.classList.remove('hidden');
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden');
        }
      }
      if(defeated == 2){
        over = true;
        this.overlay.classList.add('hidden');
        for(this.i = 0; this.i < 5; this.i++){
          document.getElementById("candel"+this.i).classList.add('hidden');
        }
        document.getElementById("prompt0").classList.add('hidden');
        document.getElementById("prompt1").classList.add('hidden');
        document.getElementById("prompt2").classList.add('hidden');
        document.getElementById("prompt3").classList.add('hidden');
        this.scene.start('GameWin');
      }


    }

     // finger down sound
     if(handValues[0] == 1 && !this.wasIndexLastFrameDown){
      this.sound.play('index', {volume: 0.34});
    //  console.log("playing sound");
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
}
}

module.exports = MainScene;