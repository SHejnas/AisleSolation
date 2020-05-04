import Phaser from 'phaser';






let  boy, platforms, up, down, left, right, tp, colls, sani, collect;






class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {}
//PRELOAD*************************
  preload() {
    // this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.atlas('boy', 'assets/boy/boysprite.png', 'assets/boy/boy.json');
    this.load.image('floor', 'assets/floor.png');
    this.load.image('backGround', 'assets/pegboard.png');
    this.load.image('Tp', 'assets/tp1.png');
    this.load.image('sani', 'assets/bottle.png');
  }


//CREATE***************************

  create(data) {


    this.createBackground();
    this.platformMachine();


  //load boy
    boy = this.physics.add.sprite(100, 490, 'boy');
    boy.scaleX = boy.scaleY = 0.5;
    boy.setCollideWorldBounds(true);
    this.physics.add.collider(boy, platforms);


    //make collectables group
    colls = this.physics.add.group();

    this.physics.add.collider(colls, platforms);
    // this.physics.add.collider(colls, boy);



    sani = colls.create(725, 490, 'sani')
    sani.scaleX = sani.scaleY = 0.15;




    //load ToiletPaper
    this.tpMachine();

    this.makeAnims();

    this.controller()
    }

//UPDATE***************************
  update(time, delta) {
    if (up.isDown && boy.body.touching.down){
      boy.play('jump')
      boy.setVelocityY(-400)
    }
    if (right.isDown){
      boy.play('run')
      boy.setFlipX(false)
      boy.setVelocityX(160)
    }
    if (left.isDown){
      boy.play('run')
      boy.setFlipX(true)
      boy.setVelocityX(-160)
    }
    if (left.isUp && right.isUp && up.isUp){
      boy.play('idle')
      boy.setVelocityX(0)
    }
    this.physics.add.overlap(boy, sani, collect, null, this);
  }

  collect(boy, coll){
    coll.disableBody(true, true)

  }

  makeAnims(){
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'boy',
            frame: 'boyIdle.png'
          }],
    })
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
      repeat: 1
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
 //create pegboard background
 createBackground () {
  this.add.image(195, 195, 'backGround')
  this.add.image(195, 410, 'backGround')
  this.add.image(585, 195, 'backGround')
  this.add.image(585, 410, 'backGround')
  this.add.image(957, 195, 'backGround')
  this.add.image(957, 410, 'backGround')
 }
 controller(){
 up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
 down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
 left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
 right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
 }
 tpMachine(){
  tp = colls.create(750, 55, 'Tp');
  tp.scale = 0.25;
  tp.setBounceY(1);
 }
 platformMachine(){
 platforms = this.physics.add.staticGroup();
 platforms.create(400, 580, 'floor');
 platforms.create(1000, 450, 'floor');
 platforms.create(-100, 367, 'floor');
 platforms.create(600, 225, 'floor');
 platforms.create(-400, 100, 'floor');
 platforms.create(1000, 100, 'floor');
}
}
export default Game;
