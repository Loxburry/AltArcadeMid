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
        while(randomInt == -1 || this.randomInt == this.prevInt || this.randomInt == 3){ // can't be a closed hand gesture or be the same as the last gesture
          this.randomInt = getRandomInt(3);
        }
      }
      else{ // hand prompts in the middle
        this.randomInt = getRandomInt(3);
        while(this.randomInt == this.prev){ // can't be a repeat of the last hand gesture
        this.randomInt = getRandomInt(3);
        }
      }
      this.handPromts.push(new handPromt(i, this.randomInt));
      prevInt = randomInt; // after adding handPrompt we set it to previous and do the loop again
      }
    }

onSerialMessage(msg){
  console.log(msg);
  this.serialMsg = msg;
}

 update(_, deltaTime) {
    console.log("Success = " + success);
    // do I need to call the onSerialMessage function here before I update the value of handValues?
    handValues = this.serialMsg.split(':'); // update the position of the fingers
    // Finger Position
    // 0 all fingers open
    // 1 index finger down
    // 2 middle down 
    // 3 index + middle down

    // Hand Values
    // 0 index finger
    // 1 middle finger

    // success is the index/position of the handPrompt 
    if(this.handPromts[success].position == 0 && this.handValues[0] == 0 && this.handValues[1] == 0){ // position 0 | all fingers open
      this.handPromts[success].deactivate();
      success++;
    }

    if(this.handPrompts[success].position == 1 && this.handValues[0] == 1 && this.handValues[1] == 0){ // position 1 | index finger down
      this.handPromts[success].deactivate();
      success++;
    }

    if(this.handPrompts[success].position == 1 && this.handValues[0] == 0 && this.handValues[1] == 1){ // position 2 | middle finger down
      this.handPromts[success].deactivate();
      success++;
    }

    if(this.handPrompts[success].position == 1 && this.handValues[0] == 1 && this.handValues[1] == 1){ // position 3 | index + middle finger down
      this.handPromts[success].deactivate();
      success++;
    }

    // TO DO!!!
    // not sure how to change this
    this.handPromts.forEach((b) => {b.update(deltaTime, this.keys); });

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
    timer -= deltaTime/10;
    console.log(timer);
    if(timer <= 0){
      //code here handles what happens when player runs out of time
      timer = timeLimit;
      over = true;
      this.overlay.classList.add('hidden');
      //this.scene.start('GameOver');
      this.overlay = document.querySelector('#game-lose');
      // Ever time this scene begins
      this.overlay.classList.remove('hidden');
    }

    this.handPromts.forEach((b) => { b.draw(this.graphics); });
    if(success == 4){
      over = true;
      this.overlay.classList.add('hidden');
      //this.scene.start('GameOver');
      this.overlay = document.querySelector('#game-win');
      // Ever time this scene begins
      this.overlay.classList.remove('hidden');
    }
}}

module.exports = MainScene;