import Phaser from 'phaser';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {}

  preload() {
    // this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.atlas("boy", "assets/boy/boysprite.png", "assets/boy/boy.json")
  }

  create(data) {
    // this.add.image(400, 300, 'logo');
    this.boy = this.add.sprite(200, 500, 'boy');
     let frameNames = this.textures.get('boy').getFrameNames();
     console.log(frameNames);
     //running animation
    this.makeAnims();
    this.boy.play('run');


    // this.boy.play('jump');

  }
  makeAnims(){
    //run
        this.anims.create({
      key: 'run',
      frames: [
        {
        key: 'boy',
        frame: 'boyRun1.png'
        }, {
        key: 'boy',
        frame: 'boyRun2.png'
      }, {
        key: 'boy',
        frame: 'boyRun3.png'
      }, {
        key: 'boy',
        frame: 'boyRun4.png'
      }
    ],
      frameRate: 8,
      repeat: -1
    })
    //jump
    this.anims.create({
      key: 'jump',
      frames: [
        {
        key: 'boy',
        frame: 'boyRun1.png'
        }
    ],
      frameRate: 1,
      repeat: -1
    })
  }

  update(time, delta) {}
}


export default Game;
