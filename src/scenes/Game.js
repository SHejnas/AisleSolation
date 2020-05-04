import Phaser from 'phaser';






let  boy, platforms






class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {}
//PRELOAD*************************
  preload() {
    // this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.atlas('boy', 'assets/boy/boysprite.png', 'assets/boy/boy.json')
    this.load.image('floor', 'assets/floor.png')
    this.load.image('backGround', 'assets/pegboard.png')
  }


//CREATE***************************

  create(data) {// this.add.image(400, 300, 'logo');
  //create pegboard background
    this.add.image(195, 195, 'backGround')
    this.add.image(195, 410, 'backGround')
    this.add.image(585, 195, 'backGround')
    this.add.image(585, 410, 'backGround')
    this.add.image(957, 195, 'backGround')
    this.add.image(957, 410, 'backGround')


 //load floor
      platforms = this.physics.add.staticGroup();
      platforms.create(400, 580, 'floor')
      platforms.create(1000, 450, 'floor')
      platforms.create(-100, 367, 'floor')
       //floor = this.createFloor(130, 139, 'shelf', 'label1', 'label2')
      // floor.setAllowGravity(false);
      // platforms.add(floor)

  //load boy
    boy = this.physics.add.sprite(200, 490, 'boy');
      boy.displayHeight = 100;
      boy.scaleX = boy.scaleY;
    boy.setCollideWorldBounds(true)
    this.physics.add.collider(boy, platforms);

  //get boy frames
    //this.textures.get('boy').getFrameNames();

  //call animation maker func
    this.makeAnims();

  //running
    //this.boy.play('run');

  //jumping
    // this.boy.play('jump');




  }

//UPDATE***************************
  update(time, delta) {}


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
      }
    ],
      frameRate: 8,
      repeat: -1
    });
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
    });
  }


}
export default Game;
