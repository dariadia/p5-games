// Character
// is controlled by the player
// collects hearts and books

class Character {
  constructor(x, y, speed, radius, texture, texture_flipped, upKey, downKey, leftKey, rightKey, sprintKey) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;
    this.originalSpeed = speed;
    this.speed = this.originalSpeed;
    this.speedUp = 2; // on sprinting

    this.radius = radius;
    // Health
    this.maxHealth = this.radius;
    this.health = this.maxHealth;
    this.healthLossPerMove = 0.15;
    this.originalHealthPerEat = 0.3;
    this.healthGainPerEat = this.originalHealthPerEat;
    // skins
    this.texture = texture;
    this.texture_flipped = texture_flipped;
    this.faceLeft = true;

    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey;

    this.sprinting = false;

    this.score = 0;
    this.dead = false;
  }

  handleInput() {
    if (keyIsDown(this.sprintKey)) {
      this.sprinting = true;
      if (keyIsDown(this.leftKey)) {
        this.faceLeft = true;
        this.vx = -this.speed * this.speedUp;
      } else if (keyIsDown(this.rightKey)) {
        this.faceLeft = false;
        this.vx = this.speed * this.speedUp;
      } else {
        this.vx = 0;
      }
      if (keyIsDown(this.upKey)) {
        this.vy = -this.speed * this.speedUp;
      } else if (keyIsDown(this.downKey)) {
        this.vy = this.speed * this.speedUp;
      } else {
        this.vy = 0;
      }
    } else {
      this.sprinting = false;
      if (keyIsDown(this.leftKey)) {
        this.faceLeft = true;
        this.vx = -this.speed;
      } else if (keyIsDown(this.rightKey)) {
        this.faceLeft = false;
        this.vx = this.speed;
      } else {
        this.vx = 0;
      }

      if (keyIsDown(this.upKey)) this.vy = -this.speed;
      else if (keyIsDown(this.downKey)) this.vy = this.speed;
      else this.vy = 0;
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    this.health -= this.healthLossPerMove;
    if (this.sprinting) {
      this.health -= this.healthLossPerMove * 1.5;
    }
    this.health = constrain(this.health, 0, this.maxHealth);

    if (this.health <= 0) {
      this.dead = true;
    }

    this.handleWrapping();
  }

  collide(object) {
    let d = dist(this.x, this.y, object.x, object.y);
    let dx = object.x - this.x;
    let dy = object.y - this.y;
    let angle = atan2(dy, dx);
    if (d < this.radius + object.radius / 2) {
      this.x -= this.speed / 3.5 * Math.cos(angle);
      this.y -= this.speed / 3.5 * Math.sin(angle);
    }
  }


  // Checks if gone off the canvas && wraps to the other side
  handleWrapping() {
    if (this.x < 0) this.x += width;
    else if (this.x > width) this.x -= width;

    if (this.y < 0) this.y += height;
    else if (this.y > height) this.y -= height;
  }

  handleEating(object, type = 'book') {
    let d = dist(this.x, this.y, object.x, object.y);
    let dx = object.x - this.x;
    let dy = object.y - this.y;
    let angle = atan2(dy, dx);

    if (d <= 100 && !this.dead) {
      object.x += object.speed / 3.5 * Math.cos(angle);
      object.y += object.speed / 3.5 * Math.sin(angle);

      if (d < this.radius + object.radius) {
        this.health += 
          type === 'book' 
            ? this.healthGainPerEat 
            : this.healthGainPerEat * 1.5;
        this.health = constrain(this.health, 0, this.maxHealth);
        object.health = 0

        // scored_sound.setVolume(0.2);
        // scored_sound.play();

        object.reset();
        this.score += 0.5; 
        if (this.score % 10 === 0 && this.score >= 10) {
          this.healthLossPerMove -= 0.005;
          this.healthLossPerMove = constrain(this.healthLossPerMove, 0.1, 0.15)
        }
      }
    }
  }

  display() {
    push();
    rectMode(CORNER);
    imageMode(CENTER);
    noStroke();

    if (!this.dead) {
      if (this.faceLeft) {
        image(this.texture, this.x, this.y, this.radius * 2, this.radius * 2);
      } else {
        image(this.texture_flipped, this.x, this.y, this.radius * 2, this.radius * 2);
      }

      fill(100);
      rect(this.x - this.radius, this.y - 40, this.radius * 2, 5);
      fill(255); 
      rect(this.x - this.radius, this.y - 40, this.health * 2, 5);
    }
    pop();
  }
}
