const Phaser = require('phaser');
const serialRead = require('../serialRead');
//Import "Actors"
const handPromt = require('../handPromt');

let success = 0;
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
   create(){ 
    success = 0;
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
    this.counter = 0;
    this.handPromts = []; // an array of objects we can call from later
    this.randomInt = -1;
    this.prevInt = -1;
    for(let i = 0; i < 4; i++) { // create 4 promts on screen at a time
      if(i == 0 || i == 3){ // if the first or last hand prompt
        while(this.randomInt == -1 || this.randomInt == this.prevInt || this.randomInt == 3){ // can't be a closed hand gesture or be the same as the last gesture
          this.randomInt = getRandomInt(3);
        }
      }
      else{ // hand prompts in the middle
        this.randomInt = getRandomInt(3);
        while(this.randomInt == this.prev){ // can't be a repeat of the last hand gesture
        this.randomInt = getRandomInt(3);
        }
      }
      this.handPromts.push(new handPromt(i, this.randomInt)); // create an array with data on each handPrompt object
      const currentPrompt = document.getElementById("prompt"+i);
      console.log("current prompt: " +currentPrompt, "prompt"+i, this.randomInt);
      if(this.randomInt == 0){ // This and the below lines changes the image based on the random number
        currentPrompt.querySelector('img').src = "./open.png";
        console.log('set source 0');
      }
      if(this.randomInt == 1){
        currentPrompt.querySelector('img').src = "./indexDown.png";
        console.log('set source 1');
      }
      if(this.randomInt == 2){
        currentPrompt.querySelector('img').src =  "./middleDown.png";
        console.log('set source 2');
      }
      if(this.randomInt == 3){
        currentPrompt.querySelector('img').src =  "./closed.png";
        console.log('set source 3');
      }
      currentPrompt.classList.remove('hidden'); // make the prompts visable
      this.prevInt = this.randomInt; // after adding handPrompt we set it to previous and do the loop again
      }
    }

onSerialMessage(msg){
  //console.log(msg);
  this.serialMsg = msg;
}

 update(_, deltaTime) {
    console.log("Success = " + success);
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

      if(this.handPromts[success].position == 0 && handValues[0] == 0 && handValues[1] == 0){ // position 0 | all fingers open
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 1 && handValues[0] == 1 && handValues[1] == 0){ // position 1 | index finger down
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 2 && handValues[0] == 0 && handValues[1] == 1){ // position 2 | middle finger down
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      } else if(this.handPromts[success].position == 3 && handValues[0] == 1 && handValues[1] == 1){ // position 3 | index + middle finger down
        this.handPromts[success].deactivate();
        document.getElementById("prompt"+success).classList.add('hidden');
        success++;
      }
    }

    // TO DO!!!
    // not sure how to change this
    //this.handPromts.forEach((b) => {b.update(deltaTime, this.keys); });

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
    timer -= deltaTime/30;
    console.log(timer);
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
      this.scene.start('GameOver');
    }

    this.handPromts.forEach((b) => { b.draw(this.graphics); });
    if(success == 4){
      over = true;
      this.overlay.classList.add('hidden');
      //this.scene.start('GameOver');
      //this.overlay = document.querySelector('#game-win');
      // Ever time this scene begins
      //this.overlay.classList.remove('hidden');
      this.scene.start('GameWin');
    }
}}

module.exports = MainScene;