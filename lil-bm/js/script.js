const HEART = 'heart'
const BOOK = 'book'

let player1;
let player2;
let player1_texture;
let player2_texture;

let singlePlayer = true;

const NUM_TREES = 10;
let NUM_BOOKS = 100;

const NUM_TYPE_ONE = 20;
const NUM_TYPE_TWO = 30;
const NUM_HEARTS = [NUM_TYPE_ONE, NUM_TYPE_TWO];

let playing = false;
let gameOver = false;

let bestScore = 0;
let totalScore = 0;
let runOnce = true;

const SELECTED = "#ffd342";
const MORNING = "#a0cc83";
const DAY = "#61a65b";
const NIGHT = "#dbbf72";
const SEASONS = [MORNING, DAY, NIGHT]; 
let currentSeason;

let SunflowerPosX = [];
let SunflowerPosY = [];

let BooksPosX = [];
let BooksPosY = [];

let campfirePosX = 0;
let campfirePosY = 0;

const RULES = `TODO, eat this, collect that`

const STARTOVER = `You may be dead, but your race lives on
  You can start over again.`

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
let books = [];
let hearts = [];
let players = [];

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
const IMAGE_PATH = "assets/sprites"

function preload() {
  bmRight = loadImage(`${IMAGE_PATH}/bm-right.png`);
  bmLeft = loadImage(`${IMAGE_PATH}/bm-left.png`);
  bmOriginalsRight = loadImage(`${IMAGE_PATH}/bm-originals-right.png`);
  bmOriginalsLeft = loadImage(`${IMAGE_PATH}/bm-originals-left.png`);

  bookVersion1 = loadImage(`${IMAGE_PATH}/book-1.png`);
  bookVersion2 = loadImage(`${IMAGE_PATH}/book-2.png`);
  bookVersion3 = loadImage(`${IMAGE_PATH}/book-3.png`);
  bookVersion4 = loadImage(`${IMAGE_PATH}/book-4.png`);
  bookVersion5 = loadImage(`${IMAGE_PATH}/book-5.png`);
  bookVersion6 = loadImage(`${IMAGE_PATH}/book-6.png`);
  bookVersion7 = loadImage(`${IMAGE_PATH}/book-7.png`);
  bookVersion8 = loadImage(`${IMAGE_PATH}/book-8.png`);

  sunflower = loadImage(`${IMAGE_PATH}/sunflower.png`);
  tree = loadImage(`${IMAGE_PATH}/tree.png`);

  heartType1 = loadImage(`${IMAGE_PATH}/heart-1.png`);
  heartType2 = loadImage(`${IMAGE_PATH}/heart-5.png`);
  heartType3 = loadImage(`${IMAGE_PATH}/heart-3.png`);
  heartType4 = loadImage(`${IMAGE_PATH}/heart-4.png`);

  spring_bg = loadSound("assets/sounds/Spring.mp3");
  summer_bg = loadSound("assets/sounds/Summer.mp3");
  fall_bg = loadSound("assets/sounds/Fall.mp3");
  winter_bg = loadSound("assets/sounds/Winter.mp3");
  bg_music = [spring_bg, summer_bg, fall_bg, winter_bg];
  eaten_sound = loadSound("assets/sounds/Eaten.mp3");
  scored_sound = loadSound("assets/sounds/Scored.mp3");
  scored_sound_1 = loadSound("assets/sounds/Man_Killed.mp3");
  newRecord_sound = loadSound("assets/sounds/Lion_Roar.mp3");
  noNewRecord_sound = loadSound("assets/sounds/Wolf_Cry.mp3");
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
  randomizeBooksPos(); 

  setupBG();

  append(players, bmOriginalsRight);
  append(players, bmOriginalsLeft);
  append(players, bmRight);
  append(players, bmLeft);
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
      }
      let heartObj = new Heart(heartX, heartY, heartSpeed, heartRadius, texture, texture_flipped);
      hearts.push(heartObj);
    }
  }
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
  books = [];
  num_book = 100; 

  if (currentSeason === 0) {
    for (let i = 0; i < NUM_TREES; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, sunflower);
      trees.push(treeObj);
    }
  
    for (let j = 0; j < Math.floor(num_book / 2); j++) {
      let bookObj1 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType1);
      let bookObj2 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType3);
      let bookObj3 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType6);
      books.concat(bookObj1, bookObj2, bookObj3);
    }

  } else if (currentSeason === 1) {
    for (let i = 0; i < NUM_TREES; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, sunflower);
      trees.push(treeObj);
    }
    for (let j = 0; j < Math.floor(num_book / 2); j++) {
      let bookObj1 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType2);
      let bookObj2 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType5);
      let bookObj3 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType6);
      books.concat(bookObj1, bookObj2, bookObj3);
    }

  } else if (currentSeason === 2) {
    for (let i = 0; i < NUM_TREES; i++) {
      let treeObj = new Tree(TreesPosX[i], TreesPosY[i], 60, tree);
      trees.push(treeObj);
    }
    for (let j = 0; j < Math.floor(num_book / 2); j++) {
      let bookObj1 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType4);
      let bookObj2 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType7);
      let bookObj3 = new Book(BooksPosX[j], BooksPosY[j], 30, bookType8);
      books.concat(bookObj1, bookObj2, bookObj3);
    }

  }
}

function drawBG() {
  background(SEASONS[currentSeason]); 
  for (let j = 0; j < books.length; j++) {
    books[j].display();
  }

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

function randomizeBooksPos() {
  for (let i = 0; i < num_book; i++) {
    BooksPosX[i] = random(0, width);
    BooksPosY[i] = random(0, height);
  }
}

function draw() {
  drawBG(); 
  if (!playing && !gameOver) {
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].move();
      hearts[i].display(playing);

      for (let j = 0; j < NUM_TREES; j++) {
        hearts[i].collide(trees[j]);
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

    for (let i = 0; i < hearts.length; i++) {
      hearts[i].move();
      hearts[i].display(playing);

      for (let j = 0; j < NUM_TREES; j++) {
        hearts[i].collide(trees[j]);
      }

      if (!player1.dead) {
        player1.handleEating(hearts[i], HEART);
      }
      if (!singlePlayer) {
        if (!player2.dead) {
          player2.handleEating(hearts[i], HEART);
        }
      }
    }

    for (let i = 0; i < books.length; i++) {
      books[i].move();
      books[i].display(playing);

      for (let j = 0; j < NUM_TREES; j++) {
        books[i].collide(trees[j]);
      }

      if (!player1.dead) {
        player1.handleEating(books[i], BOOK);
      }
      if (!singlePlayer) {
        if (!player2.dead) {
          player2.handleEating(books[i], BOOK);
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
      player2 = new Character(width - 100, 100, 2, 30, player2_texture, player2_texture_flipped, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 76);

      setUpHearts();
      gameOver = false;
      singlePlayer = false;

      playOnce = true;
    }
  }
  pop();
}
