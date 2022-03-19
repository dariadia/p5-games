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

function displayScore(player1, player2) {
  push();
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(64);
  let prevScore = totalScore;
  if (singlePlayer) {
    totalScore = int(player1.score);
    text(totalScore, width / 2, 50);
  } else {
    totalScore = int(player1.score + player2.score);
    text(totalScore, width / 2, 50);
  }

  if (prevScore < totalScore) {
    runOnce = true;
  }

  if (mushroom.inEffect) {
    textSize(32);
    fill(random(56, 255), random(56, 255), random(56, 255)); 
    if (mushroom.effectId === 0) {
      text("SUPER RUNNER", width / 2, 100); 
    } else {
      text("SUPER HUNTER", width / 2, 100); 
    }
  }
  pop();
}

function checkScore() {
  if (totalScore % 10 === 0 && totalScore >= 10 && runOnce) {
    addadversary();
    if (totalScore % 20 === 0 && totalScore >= 20) {
      nextSeason();
    }
    runOnce = false;
  }
}

function checkEatingMushroom(player) {
  let d = dist(player.x, player.y, mushroom.x, mushroom.y); 
  let playerId = 0;
  let p = 0;
  if (d < player.radius + 15) {
    if (player.sprintKey === 70) {
      playerId = 1;
    } else {
      playerId = 2;
    }
    if (!mushroom.inEffect) {
      if (!eaten_sound.isPlaying()) {
        eaten_sound.setVolume(0.35);
        eaten_sound.play();
      }
      mushroom.reset();
      p = random(0, 1);
      if (p < 0.5) {
        player.speed *= 2;
        mushroom.effectId = 0;
      } else {
        player.healthGainPerEat *= 2;
        mushroom.effectId = 1;
      }
      mushroom.inEffect = true;
      mushroom.effectPlayerId = playerId;
      mushroom.prevScore = totalScore; 
    }
  }
}

function removeMushroomEffect() {
  if (mushroom.prevScore === totalScore - 5 && mushroom.inEffect) {
    mushroom.inEffect = false;
    if (mushroom.effectPlayerId === 1) {
      player1.speed = player1.originalSpeed;
      player1.healthGainPerEat = player1.originalHealthPerEat;
    } else if (mushroom.effectPlayerId === 2) {
      player2.speed = player2.originalSpeed;
      player2.healthGainPerEat = player2.originalHealthPerEat;
    }
  }
}

function checkGameOver() {
  if (singlePlayer) {
    if (player1.dead) {
      gameOver = true;
      mushroom.inEffect = false; 
    }
  } else {
    if (player1.dead && player2.dead) {
      gameOver = true;
      mushroom.inEffect = false;
    }
  }
}

function showMainMenu() {
  push();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  text(RULES, width / 2, height / 2 - 150); // rules
  textSize(128);
  text("E A R T H", width / 2, height / 2); // title
  textSize(32);

  textAlign(RIGHT, CENTER);
  text("play as one", width / 2 - 100, height / 2 + 120);
  text("WASD KEYS\nF to sprint", width / 2 - 100, height / 2 + 190);

  textAlign(LEFT, CENTER);
  text("play as two", width / 2 + 100, height / 2 + 120);
  text("ARROWKEYS\nL to sprint", width / 2 + 100, height / 2 + 190);

  fill(255, 100);
  ellipse(100, 100, 120);
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(255);
  text("YOU ARE HERE", 100, 175);
  image(player1_texture, 100, 100, player1.radius * 2, player1.radius * 2);
  pop();

  checkMainMenuButtons();
}

function checkMainMenuButtons() {
  push();
  noStroke();
  textSize(32);

  if (mouseX < width / 2) {
    fill(SELECTED);
    textAlign(RIGHT, CENTER);
    text("play as one", width / 2 - 100, height / 2 + 120);
    fill(255);
    textAlign(LEFT, CENTER);
    text("play as two", width / 2 + 100, height / 2 + 120);
    if (mouseIsPressed) {
      playing = true;
      singlePlayer = true;
    }
  } else {
    fill(255, 100);
    ellipse(width - 100, 100, 120);
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(255);
    text("YOU ARE HERE", width - 100, 175);
    image(player2_texture, width - 100, 100, player1.radius * 2, player1.radius * 2);
    fill(255);
    textSize(32);
    textAlign(RIGHT, CENTER);
    text("play as one", width / 2 - 100, height / 2 + 120);
    fill(SELECTED);
    textAlign(LEFT, CENTER);
    text("play as two", width / 2 + 100, height / 2 + 120);
    if (mouseIsPressed) {
      playing = true;
      singlePlayer = false;
      player2 = new Predator(width - 100, 100, 2, 30, player2_texture, player2_texture_flipped, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 76);
      addadversary();
    }
  }
  pop();
}


function displayGameOver() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(64);

  if (bestScore < totalScore) {
    fill(SELECTED);
    text("YOU GOT A NEW RECORD!", width / 2, height / 2 - 200);
    textSize(64);
    text(totalScore, width / 2, 50);
    textSize(32);
    fill(255);
    text("YOUR PREV BEST SCORE: " + bestScore, width / 2, height / 2 - 150);

    if (!newRecord_sound.isPlaying() && playOnce) {
      newRecord_sound.setVolume(0.2);
      newRecord_sound.play();
      playOnce = false;
    }

  } else {
    fill(SELECTED);
    text("YOU CAN DO BETTER!", width / 2, height / 2 - 200);
    textSize(64);
    text(totalScore, width / 2, 50);
    textSize(32);
    fill(255);
    text("YOUR BEST SCORE: " + bestScore, width / 2, height / 2 - 150);

    if (!noNewRecord_sound.isPlaying() && playOnce) {
      noNewRecord_sound.setVolume(0.2);
      noNewRecord_sound.play();
      playOnce = false;
    }
  }

  fill(255, 100);
  ellipse(100, 100, 120);
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(255);
  text("YOU ARE HERE", 100, 175);
  image(player1_texture, 100, 100, player1.radius * 2, player1.radius * 2);
  fill(255);
  textSize(32);
  text(STARTOVER, width / 2, height / 2 - 25); // game over msg
  textSize(32);
  textAlign(RIGHT, CENTER);
  text("play as one", width / 2 - 100, height / 2 + 100);
  text("WASD KEYS\nF to sprint", width / 2 - 100, height / 2 + 190);
  textAlign(LEFT, CENTER);
  text("play as two", width / 2 + 100, height / 2 + 100);
  text("ARROWKEYS\nL to sprint", width / 2 + 100, height / 2 + 190);
  pop();

  checkGameOverButtons();
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
