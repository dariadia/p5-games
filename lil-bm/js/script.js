let player1;
let player2;
let player1_texture;
let player2_texture;

let singlePlayer = true;

const NUM_TREES = 7;

const NUM_TYPE_ONE = 15;
const NUM_TYPE_TWO = 20;
const NUM_TYPE_BOOK_ONE = 21;
const NUM_TYPE_BOOK_TWO = 23;
const NUM_TYPE_BOOK_THREE = 29;
const NUM_HEARTS = [NUM_TYPE_ONE, NUM_TYPE_TWO, NUM_TYPE_BOOK_ONE, NUM_TYPE_BOOK_TWO, NUM_TYPE_BOOK_THREE];

let playing = false;
let gameOver = false;

let bestScore = 0;
let totalScore = 0;
let runOnce = true;


const MORNING_1 = '#ff5f6d', MORNING_2 = '#ffc371';
const DAY_1 = '#00b09b', DAY_2 = '#96c93d';
const NIGHT_1 = '#0f2027', NIGHT_2 = '#203a43';
const SELECTED = "#ffd342";

const SEASONS = [[MORNING_1, MORNING_2], [DAY_1, DAY_2], [NIGHT_1, NIGHT_2]]; 
let currentSeason;

let TreesPosX = [];
let TreesPosY = [];

let campfirePosX = 0;
let campfirePosY = 0;

const RULES = `Collect hearts and read books to boost your health.`

const STARTOVER = `You may be dead, but your soul lives on.\nYou can start over again.`

let sunflower;
let tree;

let bookType1;
let bookType2;
let bookType3;
let bookType4;
let bookType5;
let bookType6;
let bookType7;
let bookType8;

let trees = [];
let hearts = [];
let players = [];

let music = [];
let scoreSound;

let scoredSoundType1;
let scoredSoundType2;
let newRecordSound;
let noNewRecordSound;

let playOnce = true;
const IMAGE_PATH = "/lil-bm/assets/sprites"
const SOUNDS_PATH = "/lil-bm/assets/sounds"

function preload() {
  bmRight = loadImage(`${IMAGE_PATH}/bm-right.png`);
  bmLeft = loadImage(`${IMAGE_PATH}/bm-left.png`);
  bmOriginalsRight = loadImage(`${IMAGE_PATH}/bm-originals-right.png`);
  bmOriginalsLeft = loadImage(`${IMAGE_PATH}/bm-originals-left.png`);

  bookType1 = loadImage(`${IMAGE_PATH}/book-1.png`);
  bookType2 = loadImage(`${IMAGE_PATH}/book-2.png`);
  bookType3 = loadImage(`${IMAGE_PATH}/book-3.png`);
  bookType4 = loadImage(`${IMAGE_PATH}/book-4.png`);
  bookType5 = loadImage(`${IMAGE_PATH}/book-5.png`);
  bookType6 = loadImage(`${IMAGE_PATH}/book-6.png`);
  bookType7 = loadImage(`${IMAGE_PATH}/book-7.png`);
  bookType8 = loadImage(`${IMAGE_PATH}/book-8.png`);

  sunflower = loadImage(`${IMAGE_PATH}/sunflower.png`);
  tree = loadImage(`${IMAGE_PATH}/tree.png`);

  heartType1 = loadImage(`${IMAGE_PATH}/heart-1.png`);
  heartType2 = loadImage(`${IMAGE_PATH}/heart-5.png`);
  heartType3 = loadImage(`${IMAGE_PATH}/heart-4.png`);
  heartType4 = loadImage(`${IMAGE_PATH}/heart-3.png`);

  morningMusic  = loadSound(`${SOUNDS_PATH}/morning.mp3`);
  dayMusic = loadSound(`${SOUNDS_PATH}/day.mp3`);
  nightMusic = loadSound(`${SOUNDS_PATH}/night.mp3`);
  scoreSound = loadSound(`${SOUNDS_PATH}/score.mp3`);
 
  music = [morningMusic, dayMusic, nightMusic];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  textStyle(BOLD);
  imageMode(CENTER);
  rectMode(CENTER);
  noStroke();

  currentSeason = int(random(0, 3)); 
  randomizeTreesPos(); 

  setupBG();

  append(players, bmLeft);
  append(players, bmRight);
  append(players, bmOriginalsLeft);
  append(players, bmOriginalsRight);

  setupPlayer();
  player1 = new Character(100, 100, 2, 30, player1_texture, player1_texture_flipped, 87, 83, 65, 68, 70);

  setUpHearts();
}

function setUpHearts() {
  hearts = []; 
  for (let i = 0; i < 5; i++) {
    let num_heart = NUM_HEARTS[i]; 
    let heart_id = i;
    for (let j = 0; j < num_heart; j++) {
      let heartX = random(0, width);
      let heartY = random(0, height);
      let heartSpeed = 0;
      let heartRadius = 0;
      let texture;
      let texture_flipped;

      if (heart_id === 0) {
        heartSpeed = random(3, 4);
        heartRadius = random(10, 15);

        if (currentSeason === 0) {
          texture = heartType4;
          texture_flipped = heartType4;
        } else if (currentSeason === 1) {
          texture = heartType3;
          texture_flipped = heartType3;
        } else {
          texture = heartType2;
          texture_flipped = heartType2;
        }

      } else if (heart_id === 1) {
        heartSpeed = random(1, 2);
        heartRadius = random(20, 25);
        texture = heartType1;
        texture_flipped = heartType1;
      } else if (heart_id === 2) {
        heartSpeed = 0;
        heartRadius = 0;

        if (currentSeason === 0) {
          texture = bookType1;
          texture_flipped = bookType1;
        } else if (currentSeason === 1) {
          texture = bookType2;
          texture_flipped = bookType2;
        } else {
          texture = bookType4;
          texture_flipped = bookType4;
        }
      } else if (heart_id === 2) {
        heartSpeed = 0;
        heartRadius = 0;

        if (currentSeason === 0) {
          texture = bookType3;
          texture_flipped = bookType3;
        } else if (currentSeason === 1) {
          texture = bookType5;
          texture_flipped = bookType5;
        } else {
          texture = bookType7;
          texture_flipped = bookType7;
        }
      } else if (heart_id === 2) {
        heartSpeed = 0;
        heartRadius = 0;

        if (currentSeason === 0 || currentSeason === 1) {
          texture = bookType6;
          texture_flipped = bookType6;
        } else {
          texture = bookType8;
          texture_flipped = bookType8;
        }
      }
      let heartObj = new Heart(heartX, heartY, heartSpeed, heartRadius, texture, texture_flipped);
      hearts.push(heartObj);
    }
  }
}

function setupPlayer() {
  player1_texture = players[0];
  player1_texture_flipped = players[1];
  player2_texture = players[2];
  player2_texture_flipped = players[3];
}


function setupBG() {
  trees = [];

  if (currentSeason === 0 || currentSeason === 1) {
    for (let i = 0; i < NUM_TREES; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, sunflower);
      trees.push(treeObj);
    }
  } else if (currentSeason === 2) {
    for (let i = 0; i < NUM_TREES; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, tree);
      trees.push(treeObj);
    }
  }
}

function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(color(c1), color(c2), inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function drawBG() {
  setGradient(0, 0, width, height, ...SEASONS[currentSeason]);

  for (let i = 0; i < trees.length; i++) {
    trees[i].display();
  }
}


function nextSeason() {
  currentSeason += 1;
  if (currentSeason > 2) currentSeason = 0;
  setupBG(); 
}

function randomizeTreesPos() {
  for (let i = 0; i < NUM_TREES; i++) {
    TreesPosX[i] = random(0, width);
    TreesPosY[i] = random(0, height);
  }
}

function draw() {
  drawBG(); 
  if (!playing && !gameOver) {
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].move();
      hearts[i].display();

      for (let j = 0; j < NUM_TREES; j++) {
        hearts[i].collide(trees[j]);
      }
    }

    fill(0, 50);
    rect(width / 2, height / 2, width, height);
    showMainMenu();

  } else if (playing) {
    if (!music[currentSeason].isPlaying()) {
      if (currentSeason === 0) {
        music[0].setVolume(0);
      } else {
        music[(currentSeason - 1)].setVolume(0);
      }
      music[currentSeason].setVolume(0.2);
      music[currentSeason].play();
    }
    checkGameOver();
    checkScore();

    for (let i = 0; i < hearts.length; i++) {
      hearts[i].move();
      hearts[i].display();

      for (let j = 0; j < NUM_TREES; j++) {
        hearts[i].collide(trees[j]);
      }

      if (!player1.dead) {
        player1.handleEating(hearts[i]);
      }
      if (!singlePlayer) {
        if (!player2.dead) {
          player2.handleEating(hearts[i]);
        }
      }
    }

    if (singlePlayer) {
      displayScore(player1, null); 
      if (!player1.dead) {
        player1.handleInput();
        player1.move();
        for (let k = 0; k < NUM_TREES; k++) {
          player1.collide(trees[k]);
        }
      }
      player1.display();
    } else {
      displayScore(player1, player2);
      if (!player1.dead) {
        player1.handleInput();
        player1.move();
        for (let k = 0; k < NUM_TREES; k++) {
          player1.collide(trees[k]);
        }
      }
      if (!player2.dead) {
        player2.handleInput();
        player2.move();
        for (let k = 0; k < NUM_TREES; k++) {
          player2.collide(trees[k]);
        }
      }

      player1.display();
      player2.display();
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

  pop();
}

function checkScore() {
  if (totalScore % 10 === 0 && totalScore >= 10 && runOnce) {
    if (totalScore % 20 === 0 && totalScore >= 20) {
      nextSeason();
    }
    runOnce = false;
  }
}

function checkGameOver() {
  if (singlePlayer) {
    if (player1.dead) gameOver = true;
  } else {
    if (player1.dead && player2.dead) gameOver = true;
  }
}

function showMainMenu() {
  push();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  text(RULES, width / 2, height / 2 - 150); // rules
  textSize(64);
  text("LIL' BOOKMATE ADVENTURE", width / 2, height / 2); // title
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
      player2 = new Character(width - 100, 100, 2, 30, player2_texture, player2_texture_flipped, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 76);
    }
  }
  pop();
}


function displayGameOver() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(64);

  if (!scoreSound.isPlaying() && playOnce) {
    scoreSound.setVolume(0.2);
    scoreSound.play();
    playOnce = false;
  }

  if (bestScore < totalScore) {
    fill(SELECTED);
    text("YOU GOT A NEW RECORD!", width / 2, height / 2 - 200);
    textSize(64);
    text(totalScore, width / 2, 50);
    textSize(32);
    fill(255);
    text("YOUR PREV BEST SCORE: " + bestScore, width / 2, height / 2 - 150);
  } else {
    fill(SELECTED);
    text("YOU CAN DO BETTER!", width / 2, height / 2 - 200);
    textSize(64);
    text(totalScore, width / 2, 50);
    textSize(32);
    fill(255);
    text("YOUR BEST SCORE: " + bestScore, width / 2, height / 2 - 150);
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

      player1 = new Character(100, 100, 2, 30, player1_texture, player1_texture_flipped, 87, 83, 65, 68, 70);

      setUpHearts(); 
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
      player2 = new Character(width - 100, 100, 2, 30, player2_texture_flipped, player2_texture, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 76);

      setUpHearts();
      gameOver = false;
      singlePlayer = false;

      playOnce = true;
    }
  }
  pop();
}
