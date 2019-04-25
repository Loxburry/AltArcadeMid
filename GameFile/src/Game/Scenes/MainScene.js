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
    this.load.audio('mellowDefeat', ['./sound/mellowScream.wav']);
    this.load.audio('fishDefeat', ['./sound/fishScream.wav']);
    this.load.audio('oniDefeat', ['./sound/oniScream.wav']);
    this.load.audio('redDefeat', ['./sound/redScream.wav']);
    this.load.audio('octoDefeat', ['./sound/octScream.wav']);
    this.load.audio('willieDefeat', ['./sound/willieScream.wav']);

    // add bg music 
    }
   create(){ 
    defeated = 0;
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
    this.overlay = document.querySelector('#demon0');
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
      if(this.randomInt == 0){ // change the img src tage to the correct image based on the random number
        currentPrompt.querySelector('img').src = "./img/1000.png";
      }
      if(this.randomInt == 1){ 
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
      currentPrompt.classList.remove('hidden'); // make the prompt visable
      this.prev = this.randomInt; // after adding handPrompt we set it to previous and do the loop again
    }
    }

onSerialMessage(msg){
  //console.log(msg);
  this.serialMsg = msg;
}

 update(_, deltaTime) {
    const handValues = this.serialMsg.split(':'); // update the position of the fingers
    // recieves info back from Arduino in this format 0:0:0:0-
    // 1 = finger down
    // 0 = open finger
    // : = seperates the packet into fingers
    // - = end of packet
    if (success !== 4) { // if there is a hand prompt remaining
      if(this.handPromts[success].position == 0 && handValues[0] == 1 && handValues[1] == 0 && handValues[2] == 0 && handValues[3] == 0){
        this.handPromts[success].deactivate(); // check if current hand prompt is this one and the player matched it
        document.getElementById("prompt"+success).classList.add('hidden'); // hide the prompt
        success++; // move to the next prompt
      } else if(this.handPromts[success].position == 1 && handValues[0] == 0 && handValues[1] == 1 && handValues[2] == 0 && handValues[3] == 0){
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 2 && handValues[0] == 0 && handValues[1] == 0 && handValues[2] == 1 && handValues[3] == 0){
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
    //this builds the timer
    this.graphics.clear();
    if(over == false){ // hide or show the timer
      this.graphics.save();
    if(defeated == 0){ // change the color of the timer based on the current demon
        this.graphics = this.add.graphics({
          fillStyle: { color: 0xD9CD23},
        });
      }
      if(defeated == 1){
        this.graphics = this.add.graphics({
          fillStyle: { color: 0x8FDFBC},
      });
    }
    if(defeated == 2){
        this.graphics = this.add.graphics({
          fillStyle: { color: 0xFF9D2E},
      });
    }
      if(defeated == 3){
        this.graphics = this.add.graphics({
          fillStyle: { color: 0xE75D5D},
      });
      }
      if(defeated == 4){
        this.graphics = this.add.graphics({
          fillStyle: { color: 0xAF79D5},
      });
      }
      if(defeated == 5){
        this.graphics = this.add.graphics({
          fillStyle: { color: 0xFE0002},
      });
      }
      this.graphics.fillRect(575, 390, -timer, 20); // emptying timer
      this.graphics.strokeRect(575, 390, -350, 20); // timer outline
      this.graphics.restore();
      this.graphics.save();
    }

    //timer change over time
    timer -= deltaTime/30; // 100 is the rate of timer drain
    if(timer <= 0){ // time is up
      over = true; // hide the timer
      this.overlay.classList.add('hidden'); // hide current demon
      document.getElementById("prompt0").classList.add('hidden'); // hide all prompts 
      document.getElementById("prompt1").classList.add('hidden');
      document.getElementById("prompt2").classList.add('hidden');
      document.getElementById("prompt3").classList.add('hidden');
      for(this.i = 0; this.i < 5; this.i++){ // hide all the candles
        document.getElementById("candel"+this.i).classList.add('hidden');
      }
      this.scene.start('GameOver');
    }

    this.handPromts.forEach((b) => { b.draw(this.graphics); }); // not sure if I need this
    if(success == 4){ // finished all the prompts, ignite a candle!
      candel++; // change for debugging
      if(candel == 1){
        this.sound.play('candle', {volume: 0.8}); // sound feed back
        this.c2 = document.querySelector('#candel2');
        this.c2.classList.remove('hidden'); // the candle appears
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden'); // unhide the prompts
        }
        timer = 300;
        success = 0; // reset prompt progress
      }
      if(candel == 2){
        this.sound.play('candle', {volume: 0.8});
        this.c3 = document.querySelector('#candel3');
        this.c3.classList.remove('hidden');
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden');
        }
        timer = 275;
        success = 0;
      }
      if(candel == 3){
        this.sound.play('candle', {volume: 0.8});
        this.c0 = document.querySelector('#candel0');
        this.c0.classList.remove('hidden');
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden');
        }
        timer = 250;
        success = 0;
      }
      if(candel == 4){
        this.sound.play('candle', {volume: 0.8});
        this.c4 = document.querySelector('#candel4');
        this.c4.classList.remove('hidden');
        for(this.i = 0; this.i < 4; this.i++){
          document.getElementById("prompt"+this.i).classList.remove('hidden');
        }
        timer = 200;
        success = 0
      }
      if(candel == 5){ // All 5 candles are lit!
        this.sound.play('candle', {volume: 0.8});
        this.c1 = document.querySelector('#candel1');
        this.c1.classList.remove('hidden');
        over = true; // hide the timer
        timer = 350; // feed the timer
        if(defeated == 0){ // Mellow defeat scream
          this.sound.play('mellowDefeat', {volume: .8});
        }
        if(defeated == 1){ // fish
          this.sound.play('fishDefeat', {volume: .8});
        }
        if(defeated == 2){ // oni 
          this.sound.play('oniDefeat', {volume: 2});
        }
        if(defeated == 3){ // red
          this.sound.play('redDefeat', {volume: 2.5});
        }
        if(defeated == 4){ // oct
          this.sound.play('octoDefeat', {volume: 1.5});
        }
        if(defeated == 5){ // Willie
          this.sound.play('willieDefeat', {volume: 2});
        }
        // hurt animation
        // figure out screen shake
        defeated++; // change for debugging
        over = false; // show timer
        candel = 0; // reset candle progress
        success = 0; // reset prompt progress
        for(this.i = 0; this.i < 5; this.i++){ // hide all the candels
          document.getElementById("candel"+this.i).classList.add('hidden');
        }
        this.overlay.classList.add('hidden'); // hide current demon
        if(defeated !=6 ){ // this wasn't the last demon
          this.overlay = document.querySelector('#demon'+defeated); // select next demon
          //this.handPromts = refreshPrompts(this.handPromts); // shuffle up hand prompts for the next demon
          for(let i = 0; i < 4; i++){
            this.handPromts.pop(); // create an array with data on each handPrompt object
          }
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
            if(this.randomInt == 0){ // change the img src tage to the correct image based on the random number
              currentPrompt.querySelector('img').src = "./img/1000.png";
            }
            if(this.randomInt == 1){ 
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
            currentPrompt.classList.remove('hidden'); // make the prompt visable
            this.prev = this.randomInt; // after adding handPrompt we set it to previous and do the loop again
          }
          this.overlay.classList.remove('hidden'); // show next demon
          for(this.i = 0; this.i < 4; this.i++){
            document.getElementById("prompt"+this.i).classList.remove('hidden'); // show all prompts
          }
        } 
      }
      if(defeated == 6){ // all demons defeated
        over = true; // hide timer
        this.overlay.classList.add('hidden'); // hide demon
        for(this.i = 0; this.i < 5; this.i++){
          document.getElementById("candel"+this.i).classList.add('hidden'); // make candels disapear
        }
        this.scene.start('GameWin'); // go to win screen
      }
    }
     // finger down sound
  if(handValues[0] == 1 && !this.wasIndexLastFrameDown){
  this.sound.play('index', {volume: 0.34});
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