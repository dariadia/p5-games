const backgroundColour = '#1A202C'
let rainbow
let pooratNaLes
let dragons
let crowander
let monster
let giant
let male
let donkey

function setup() {
  createCanvas(windowWidth, windowHeight);
  soundFormats('mp3', 'ogg');
  rainbow = loadSound('assets/rainbow.mp3');
  pooratNaLes = loadSound('assets/poorat-na-les.mp3');
  dragons = loadSound('assets/dragons.mp3');
  crowander = loadSound('assets/crowander.mp3');
  monster = loadSound('assets/monster.mp3');
  giant = loadSound('assets/giant.mp3');
  male = loadSound('assets/male.mp3');
  donkey = loadSound('assets/donkey.mp3');
  noStroke();
  textSize(15);
  background(backgroundColour);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  fill('grey');
  text('Press any key to add a tree. Press numbers so play music. Press backspace to delete all.', 30, 30);
}

function drawTree(x, y){
  push();
  translate(x, y);

  // Draw the shape as a series of vertices.
  beginShape();
  // Vertices of tree are defined relative to (0, 0) point
  vertex(0, -140);
  vertex(-40, -60);
  vertex(-20, -60);
  vertex(-80, 10);
  vertex(-40, 10);
  vertex(-110, 100);
  vertex(-20, 100);
  vertex(-20, 140);
  vertex(20, 140);
  vertex(20, 100);
  vertex(110, 100);
  vertex(40, 10);
  vertex(80, 10);
  vertex(20, -60);
  vertex(40, -60);
  endShape(CLOSE);

  pop();
}

function keyPressed() {
  const pressed = key.charCodeAt(0)
  if (pressed === 66) {
    background(backgroundColour);
  } else if ([49,50,51,52,53,54,55,56,57].includes(pressed)) {
    switch (pressed) {
      // 1
      case 49:
        if (rainbow.isPlaying()) {
          rainbow.stop();
        } else {
          rainbow.play();
        }
        break;
      // 2
      case 50:
        if (pooratNaLes.isPlaying()) {
          pooratNaLes.stop();
        } else {
          pooratNaLes.play();
        }
        break;
      // 3
      case 51:
        if (dragons.isPlaying()) {
          dragons.stop();
        } else {
          dragons.play();
        }
        break;
      // 4
      case 52:
        if (crowander.isPlaying()) {
          crowander.stop();
        } else {
          crowander.play();
        }
        break;
      // 5
      case 53:
        if (monster.isPlaying()) {
          monster.stop();
        } else {
          monster.play();
        }
        break;
      // 6
      case 54:
        if (giant.isPlaying()) {
          giant.stop();
        } else {
          giant.play();
        }
        break;
      // 7
      case 55:
        if (male.isPlaying()) {
          male.stop();
        } else {
          male.play();
        }
        break;
      // 8
      case 56:
        if (donkey.isPlaying()) {
          donkey.stop();
        } else {
          donkey.play();
        }
        break;
      default: null
    }
  } else {
    fill(random(140, 170), 100, random(50, 80));
	  drawTree(random(windowWidth), random(windowWidth));
  }
}
