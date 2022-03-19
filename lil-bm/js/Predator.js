// Predator aka adversary
// computer-controlled
// Will eat prey && hunt player's character
// Can be hurt by the player as well

class Predator {
  constructor(x, y, speed, radius, texture, texture_flipped) {
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;

    this.tx = random(0, 1000); 
    this.ty = random(0, 1000); 

    this.maxHealth = radius;
    this.health = this.maxHealth;
    this.texture = texture;
    this.texture_flipped = texture_flipped;
    this.faceLeft = true;

    this.healthLossPerMove = 0.05;
    this.healthGainPerEat = 0.3;

    this.radius = radius;
    this.campfirePosX = x;
    this.campfirePosY = y;
  }



  display(inGame) {
    push();
    fill(255);
    imageMode(CENTER);
    rectMode(CORNER);
    if (this.faceLeft) {
      image(this.texture, this.x, this.y, this.radius * 2, this.radius * 2);
    } else {
      image(this.texture_flipped, this.x, this.y, this.radius * 2, this.radius * 2);
    }

    if (inGame) {
      fill(100);
      rect(this.x - this.radius, this.y - 40, this.radius * 2, 5);
      fill(255, 0, 0);
      rect(this.x - this.radius, this.y - 40, this.health * 2, 5);
    }
    pop();
  }

  reset() {
    this.x = this.campfirePosX;
    this.y = this.campfirePosY;

    this.health = this.maxHealth;
  }
}
