const backgroundColour = '#1A202C'

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(backgroundColour);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {}

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
  if (key.charCodeAt(0) === 66) {
    background(backgroundColour);
  } else {
    fill(random(140, 170), 100, random(50, 80));
  
	drawTree(random(windowWidth), random(windowWidth));
  }
}
