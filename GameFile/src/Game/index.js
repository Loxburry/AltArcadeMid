// Import outside libraries
const Phaser = require('phaser');
const StartScreen = require('./Scenes/Startscreen');
const MainScene = require('./Scenes/MainScene');
const GameWin = require('./Scenes/GameWin');
const GameOver = require('./Scenes/GameOver');
const serialRead = require('./serialRead.js');

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [StartScreen, MainScene, GameOver, GameWin]
};


// fire bullet 


// Global Phaser Vars
let game;



  // Always clear at the top of update
 


/* We are changin the scene from a single object to an array of multiple scene objects
There is no need for this anymore
phaserConfig.scene = {
  create: create,
  update: update
} */
  
// Exported Module so game can be initialized elseware
const GameManager = {
  init: () => {
    // compare with gitHub code
    serialRead.openPort(p => p.serialNumber == "5&350590a7&0&5", '-'); // initilize connection with arduino
    // Kenny's BlackBoard serial number: 5&350590a7&0&5
                 // Glove serial number: 5&350590a7&0&5
          // Willies' Uno serial number: 557353233353518091A2
    game = new Phaser.Game(phaserConfig);
  },
};

module.exports = GameManager;
