const backgroundColour = '#1A202C'
let rainbow
let pooratNaLes

function setup() {
  createCanvas(windowWidth, windowHeight);
  soundFormats('mp3', 'ogg');
  rainbow = loadSound('assets/rainbow.mp3');
  pooratNaLes = loadSound('assets/poorat-na-les.mp3');
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
      case 49:
        if (rainbow.isPlaying()) {
          rainbow.stop();
        } else {
          rainbow.play();
        }
        break;
      case 50:
        if (pooratNaLes.isPlaying()) {
          pooratNaLes.stop();
        } else {
          pooratNaLes.play();
        }
        break;
      default: null
    }
  } else {
    fill(random(140, 170), 100, random(50, 80));
	  drawTree(random(windowWidth), random(windowWidth));
  }
}
