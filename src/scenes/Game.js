import Phaser from 'phaser';
import AlignGrid from '../utils/grid'
class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {}
//PRELOAD*************************
  preload() {
    // this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.atlas("boy", "assets/boy/boysprite.png", "assets/boy/boy.json")
    this.load.image("floor", "assets/floor.png")
    this.load.image("label1", "assets/bricks/labelBrick1.png")
    this.load.image("label2", "assets/bricks/labelBrick2.png")
    this.load.image("shelf", "assets/bricks/shelfBrick.png")
    this.load.image("backGround", "assets/bricks/bgBrick1.png")
  }
//CREATE***************************
  create(data) {// this.add.image(400, 300, 'logo');
    this.floorGroup = this.physics.add.group();



        //grid util*********************take out for deploy*********************
    this.aGrid = new AlignGrid({scene: this, rows: 14, cols: 10})
    this.aGrid.show();
    this.aGrid.showNumbers();

 //load floor
    let floor = this.createFloor(130, 139, 'shelf')
    floor.setImmovable()
  //load boy
    this.boy = this.physics.add.sprite(200, 490, 'boy');
    this.boy.displayHeight = 100;
    this.boy.scaleX = this.boy.scaleY;

  //get boy frames
    //this.textures.get('boy').getFrameNames();

  //call animation maker func
    this.makeAnims();

  //running
    //this.boy.play('run');

  //jumping
    // this.boy.play('jump');



  this.physics.add.collider(this.boy, this.floorGroup)
  }

//UPDATE***************************
  update(time, delta) {}


  placeBrick(pos, key){
    let brick = this.physics.add.sprite(0, 0, key);
    this.aGrid.placeAtIndex(pos, brick);
    this.floorGroup.add(brick);
    brick.setImmovable();

  }
  createFloor(fromPos, toPos, key){
    for (let i = fromPos; i < toPos + 1; i++) {
      if ((Math.random() * 10) === 9){
        key = 'label2';
      } else if (Math.random() * 10 === 2 ){
        key = 'lable1';
      }

      this.placeBrick(i, key);

    }
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
