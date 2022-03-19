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

  move() {
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);

    if (this.vx < 0) {
      this.faceLeft = true;
    } else if (this.vx > 0) {
      this.faceLeft = false;
    }

    this.health -= this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);

    this.x += this.vx;
    this.y += this.vy;

    this.tx += 0.01;
    this.ty += 0.01;

    this.handleWrapping();

    if (this.health <= 0) {
      this.reset();
    }
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

  handleWrapping() {
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }

    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  handleEating(prey) {
    let d = dist(this.x, this.y, prey.x, prey.y);
    let dx = prey.x - this.x;
    let dy = prey.y - this.y;
    let angle = atan2(dy, dx);
    if (d < 50) {
      if (d <= 45) {
        // move away from the adversary!
        prey.x += prey.speed / 3.5 * Math.cos(angle);
        prey.y += prey.speed / 3.5 * Math.sin(angle);
      }
      // approach the prey
      this.x = lerp(this.x, prey.x, 0.025);
      this.y = lerp(this.y, prey.y, 0.025);

      if (d < this.radius + prey.radius) {
        this.health += this.healthGainPerEat;
        this.health = constrain(this.health, 0, this.maxHealth);
        prey.health -= this.healthGainPerEat;
        if (prey.health < prey.maxHealth / 2) {
          if (prey.speed > prey.originalSpeed / 4) {
            prey.speed = prey.speed / 2;
          }
        }

        if (prey.health <= 0) {
          prey.reset();
        }
      }
    } else {
      prey.speed = prey.originalSpeed;
    }
  }

  hunting(character) {
    let d = dist(this.x, this.y, character.x, character.y);
    if (d < 150) {
      if (this.health > this.maxHealth / 2) {
        this.x = lerp(this.x, character.x, 0.025);
        this.y = lerp(this.y, character.y, 0.025);
      }

      if (d < this.radius + character.radius) {
        this.health += (this.healthGainPerEat);
        this.health = constrain(this.health, 0, this.maxHealth);

        character.health -= 0.75;
      }
    }
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
