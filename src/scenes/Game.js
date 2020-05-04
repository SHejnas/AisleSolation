import Phaser from "phaser";
import Laser from "../utils/lazer";
let boy,
  platforms,
  up,
  down,
  left,
  right,
  tp,
  colls,
  sani,
  collectSoap,
  zombie,
  armed,
  laser,
  win,
  lose;

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.collectSoap = this.collectSoap.bind(this);
    this.collectTP = this.collectTP.bind(this);
    // this.fireLaser = this.fireLaser.bind(this);
    // this.hit = this.hit.bind(this);
  }

  init(data) {}
  //PRELOAD*************************
  preload() {
    // this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.atlas("boy", "assets/boy/boysprite.png", "assets/boy/boy.json");
    this.load.image("floor", "assets/floor.png");
    this.load.image("backGround", "assets/pegboard.png");
    this.load.image("Tp", "assets/tp1.png");
    this.load.image("sani", "assets/bottle.png");
    this.load.image("zombie", "assets/zombie.png");
    this.load.image("laser", "assets/blueLazer.png");
    this.load.image("win", "assets/winScreen.png");
    this.load.image("lose", "assets/youDied.png");
  }

  //CREATE***************************

  create(data) {
    this.createBackground();
    this.platformMachine();

    //load boy
    boy = this.physics.add.sprite(100, 490, "boy");
    boy.scaleX = boy.scaleY = 0.5;
    boy.setCollideWorldBounds(true);
    this.physics.add.collider(boy, platforms);

    //create zombies
    zombie = this.physics.add.sprite(400, 100, "zombie");
    this.physics.add.collider(zombie, platforms);

    //make collectables group
    colls = this.physics.add.group();

    this.physics.add.collider(colls, platforms);
    // this.physics.add.collider(colls, boy);
    //load ToiletPaper
    this.tpMachine();

    sani = this.physics.add.sprite(725, 490, "sani");
    colls.add(sani);
    sani.scaleX = sani.scaleY = 0.15;
    this.physics.add.overlap(boy, sani, this.collectSoap, null, this);
    this.physics.add.overlap(boy, tp, this.collectTP, null, this);
    this.physics.add.overlap(boy, zombie, this.lose, null, this);

    this.makeAnims();

    this.controller();
  }

  //UPDATE***************************
  update(time, delta) {
    this.movement();
  }

  lose(boy, zombie) {
    boy.disableBody(true, true);
    lose = this.add.image(400, 300, "lose");
    lose.scale = 0.4;
  }

  collectTP(boy, tp) {
    tp.disableBody(true, true);
    this.add.image(400, 300, "win");
  }
  collectSoap(boy, soap) {
    sani.disableBody(true, true);
    boy.armed = true;
  }

  makeAnims() {
    this.anims.create({
      key: "idle",
      frames: [{ key: "boy", frame: "boyIdle.png" }],
    });
    //run
    this.anims.create({
      key: "run",
      frames: [
        {
          key: "boy",
          frame: "boyRun1.png",
        },
        {
          key: "boy",
          frame: "boyRun2.png",
        },
      ],
      frameRate: 8,
      repeat: -1,
    });
    //jump
    this.anims.create({
      key: "jump",
      frames: [
        {
          key: "boy",
          frame: "boyRun1.png",
        },
      ],
      frameRate: 1,
      repeat: -1,
    });
  }
  //create pegboard background
  createBackground() {
    this.add.image(195, 195, "backGround");
    this.add.image(195, 410, "backGround");
    this.add.image(585, 195, "backGround");
    this.add.image(585, 410, "backGround");
    this.add.image(957, 195, "backGround");
    this.add.image(957, 410, "backGround");
  }
  controller() {
    up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
  movement() {
    if (up.isDown && boy.body.touching.down) {
      boy.play("jump");
      boy.setVelocityY(-400);
    }
    if (right.isDown) {
      boy.setFlipX(false);
      boy.facingLeft = false;
      boy.setVelocityX(160);
    }
    if (left.isDown) {
      // boy.play("run");
      boy.setFlipX(true);
      boy.facingLeft = true;
      boy.setVelocityX(-160);
    }
    if (down.isDown && boy.armed) {
      // boy.play("run");
    }

    if (left.isUp && right.isUp && up.isUp) {
      boy.play("idle");
      boy.setVelocityX(0);
    }
    if (boy.body.velocity.x !== 0) {
      boy.play("run");
    }
  }
  tpMachine() {
    tp = colls.create(750, 55, "Tp");
    tp.scale = 0.25;
    tp.setBounceY(1);
  }
  platformMachine() {
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, "floor");
    platforms.create(1000, 450, "floor");
    platforms.create(-100, 367, "floor");
    platforms.create(600, 225, "floor");
    platforms.create(-400, 100, "floor");
    platforms.create(1000, 100, "floor");
  }
}
export default Game;
