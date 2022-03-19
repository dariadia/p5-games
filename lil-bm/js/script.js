let player1;
let player2;
let player1_texture;
let player2_texture;

let singlePlayer = true;

const NUM_TREE = 10;
let num_plant = 100;

const NUM_RABBIT = 20;
const NUM_BOAR = 10;
const NUM_ZEBRA = 10;
const NUM_ANTELOPE = 10;
const NUM_BISON = 10;
const NUM_ANIMALS = [NUM_RABBIT, NUM_BOAR, NUM_ZEBRA, NUM_ANTELOPE, NUM_BISON];

let num_adversary = 1;

let playing = false;
let gameOver = false;

let bestScore = 0;
let totalScore = 0;
let runOnce = true;

const SELECTED = "#ffd342";
const SPRING = "#a0cc83";
const SUMMER = "#61a65b";
const FALL = "#dbbf72";
const WINTER = "#a8bab4";
const SEASONS = [SPRING, SUMMER, FALL, WINTER]; 
let currentSeason;

let TreesPosX = [];
let TreesPosY = [];

let PlantsPosX = [];
let PlantsPosY = [];

let campfirePosX = 0;
let campfirePosY = 0;

const RULES = "You are the predator of the Earth." +
  "\nYou are constantly hungry so you must feast." +
  "\nEat as much prey as you can before adversarys hunt you down." +
  "\n(eat the red mushroom to boost your chance of survival)";

const STARTOVER = "This is not the end." +
  "\nYou may be dead, but your race lives on." +
  "\nYou can start over again.";

let rabbit_white;
let rabbit_brown;
let boar;
let zebra;
let antelope;
let bison;
let lion;
let wolf;
let leopard;
let adversary;
let rabbit_white_flipped;
let rabbit_brown_flipped;
let boar_flipped;
let zebra_flipped;
let antelope_flipped;
let bison_flipped;
let lion_flipped;
let wolf_flipped;
let leopard_flipped;
let adversary_flipped;

let tree_spring;
let tree_summer;
let tree_fall;
let tree_winter;

let plant_spring;
let plant_summer;
let plant_fall;
let plant_winter;

let mushroomTexture;
let camp;

let trees = [];
let plants = [];
let prey = [];
let players = [];
let predatorPro = [];

let spring_bg;
let summer_bg;
let fall_bg;
let winter_bg;
let bg_music = [];
let eaten_sound;
let scored_sound;
let scored_sound_1;
let newRecord_sound;
let noNewRecord_sound;

let playOnce = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  textStyle(BOLD);
  imageMode(CENTER);
  rectMode(CENTER);
  noStroke();

  mushroom = new Mushroom(random(0, width), random(0, height), 30, mushroomTexture);
  currentSeason = int(random(0, 4)); 
  randomizeTreesPos(); 
  randomizePlantsPos(); 

  setupBG();

  append(players, lion);
  append(players, wolf);
  append(players, leopard);
  append(players, lion_flipped);
  append(players, wolf_flipped);
  append(players, leopard_flipped);
  setupPlayer(); // randomly set textures for players
  // create player1 object
  player1 = new Character(100, 100, 2, 30, player1_texture, player1_texture_flipped, 87, 83, 65, 68, 70);

  setUpPrey();
  setupadversary();
}

function setupPlayer() {
  let randomIndex = int(random(0, 3));
  player1_texture = players[randomIndex];
  player1_texture_flipped = players[randomIndex + 3];
  randomIndex = int(random(0, 3));
  player2_texture = players[randomIndex];
  player2_texture_flipped = players[randomIndex + 3];
}


function setupBG() {
  trees = [];
  plants = [];
  num_plant = 100; 

  if (currentSeason === 0) {

    for (let i = 0; i < NUM_TREE; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, tree_spring);
      trees.push(treeObj);
    }
  
    for (let j = 0; j < num_plant; j++) {
      let plantObj = new Plant(PlantsPosX[j], PlantsPosY[j], 30, plant_spring);
      plants.push(plantObj);
    }

  } else if (currentSeason === 1) {
    for (let i = 0; i < NUM_TREE; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, tree_summer);
      trees.push(treeObj);
    }
    for (let j = 0; j < num_plant; j++) {
      let plantObj = new Plant(PlantsPosX[j], PlantsPosY[j], 30, plant_summer);
      plants.push(plantObj);
    }

  } else if (currentSeason === 2) {
    for (let i = 0; i < NUM_TREE; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, tree_fall);
      trees.push(treeObj);
    }
    for (let j = 0; j < num_plant; j++) {
      let plantObj = new Plant(PlantsPosX[j], PlantsPosY[j], 30, plant_fall);
      plants.push(plantObj);
    }

  } else if (currentSeason === 3) {
    num_plant = 50;
    for (let i = 0; i < NUM_TREE; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, tree_winter);
      trees.push(treeObj);
    }
    for (let j = 0; j < num_plant; j++) {
      let plantObj = new Plant(PlantsPosX[j], PlantsPosY[j], 30, plant_winter);
      plants.push(plantObj);
    }
  }
}

function drawBG() {
  background(SEASONS[currentSeason]); 
  for (let j = 0; j < plants.length; j++) {
    plants[j].display();
  }

  image(camp, campfirePosX, campfirePosY, 60, 60);

  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
  }
  mushroom.display();

}


function nextSeason() {
  currentSeason += 1;
  if (currentSeason > 3) {
    currentSeason = 0;
  }
  setupBG(); 
}


function draw() {
  drawBG(); 
  if (!playing && !gameOver) {
    for (let i = 0; i < prey.length; i++) {
      prey[i].move();
      prey[i].display(playing);
      predatorPro[0].handleEating(prey[i]);

      for (let j = 0; j < num_plant; j++) {
        prey[i].handleEating(plants[j]);
      }

      for (let j = 0; j < NUM_TREE; j++) {
        prey[i].collide(trees[j]);
      }
    }

    for (let j = 0; j < predatorPro.length; j++) {
      predatorPro[j].move();
      predatorPro[j].display(playing);
      for (let k = 0; k < NUM_TREE; k++) {
        predatorPro[j].collide(trees[k]);
      }
    }

    fill(0, 50);
    rect(width / 2, height / 2, width, height);
    showMainMenu();

  } else if (playing) {
    if (!bg_music[currentSeason].isPlaying()) {
      if (currentSeason === 0) {
        bg_music[3].setVolume(0);
      } else {
        bg_music[(currentSeason - 1)].setVolume(0);
      }
      bg_music[currentSeason].setVolume(0.2);
      bg_music[currentSeason].play();
    }
    checkGameOver();
    checkScore();

    for (let i = 0; i < prey.length; i++) {
      prey[i].move();
      prey[i].display(playing);
      for (let j = 0; j < num_plant; j++) {
        prey[i].handleEating(plants[j]);
      }

      for (let j = 0; j < NUM_TREE; j++) {
        prey[i].collide(trees[j]);
      }

      if (!player1.dead) {
        player1.handleEating(prey[i]);
      }
      if (!singlePlayer) {
        if (!player2.dead) {
          player2.handleEating(prey[i]);
        }
      }
      for (let j = 0; j < num_adversary; j++) {
        predatorPro[j].handleEating(prey[i]);
      }
    }

    for (let j = 0; j < num_adversary; j++) {
      predatorPro[j].move();
      predatorPro[j].display(playing);

      for (let k = 0; k < NUM_TREE; k++) {
        predatorPro[j].collide(trees[k]);
      }
      if (!player1.dead) {
        predatorPro[j].hunting(player1);
        player1.attacking(predatorPro[j]);
      }
      if (!singlePlayer) {
        if (!player2.dead) {
          predatorPro[j].hunting(player2);
          player2.attacking(predatorPro[j]);
        }
      }
    }

    if (singlePlayer) {
      displayScore(player1, null); 
      if (!player1.dead) {
        player1.handleInput();
        player1.move();
        for (let k = 0; k < NUM_TREE; k++) {
          player1.collide(trees[k]);
        }
      }
      player1.display();
      checkEatingMushroom(player1); 
      removeMushroomEffect(); 
    } else {
      displayScore(player1, player2);
      if (!player1.dead) {
        player1.handleInput();
        player1.move();
        for (let k = 0; k < NUM_TREE; k++) {
          player1.collide(trees[k]);
        }
      }
      if (!player2.dead) {
        player2.handleInput();
        player2.move();
        for (let k = 0; k < NUM_TREE; k++) {
          player2.collide(trees[k]);
        }
      }

      player1.display();
      player2.display();
      checkEatingMushroom(player1);
      checkEatingMushroom(player2);
      removeMushroomEffect();
    }

    if (gameOver) {
      fill(0, 50);
      rect(width / 2, height / 2, width, height);
      displayGameOver();
    }
  }

}

function checkGameOverButtons() {
  push();
  textSize(32);
  fill(255);
  if (mouseX < width / 2) {
    textAlign(RIGHT, CENTER);
    fill(SELECTED);
    text("play as one", width / 2 - 100, height / 2 + 100);
    fill(255);
    textAlign(LEFT, CENTER);
    text("play as two", width / 2 + 100, height / 2 + 100);
 
    if (mouseIsPressed) {
      background(100);
      if (bestScore < totalScore) {
        bestScore = totalScore;
      }

      player1 = new Predator(100, 100, 2, 30, player1_texture, player1_texture_flipped, 87, 83, 65, 68, 70);
      num_adversary = 1;
      setUpPrey(); 
      setupadversary();
      gameOver = false;
      singlePlayer = true;

      playOnce = true;
    }
  } else {
    fill(255, 100);
    ellipse(width - 100, 100, 120);
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(255);
    text("YOU ARE HERE", width - 100, 175);
    image(player2_texture, width - 100, 100, player1.radius * 2, player1.radius * 2);
    textSize(32);
    textAlign(RIGHT, CENTER);
    text("play as one", width / 2 - 100, height / 2 + 100);
    fill(SELECTED);
    textAlign(LEFT, CENTER);
    text("play as two", width / 2 + 100, height / 2 + 100);
    if (mouseIsPressed) {
      if (bestScore < totalScore) {
        bestScore = totalScore;
      }
      player1 = new Character(100, 100, 2, 30, player1_texture, player1_texture_flipped, 87, 83, 65, 68, 70);
      player2 = new Character(width - 100, 100, 2, 30, player2_texture, player2_texture_flipped, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 76);
      num_adversary = 2;
      setUpPrey();
      setupadversary();
      gameOver = false;
      singlePlayer = false;

      playOnce = true;
    }
  }
  pop();
}
