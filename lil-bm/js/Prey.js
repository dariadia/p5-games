// Prey
// moves around and can be consumed by Character (player) and Predator (adversary)
// will consume Plant objects

class Prey {
  constructor(x, y, speed, radius, texture, texture_flipped) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;
    this.originalSpeed = speed;
    this.speed = this.originalSpeed;

    this.tx = random(0, 1000); 
    this.ty = random(0, 1000);

    this.maxHealth = radius;
    this.health = this.maxHealth; 
    this.healthLossPerMove = 0.01;
    this.healthGainPerEat = 0.025;

    this.texture = texture;
    this.texture_flipped = texture_flipped;
    this.faceLeft = true;
    this.radius = radius;
  }

  move() {
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    if (this.vx < 0) {
      this.faceLeft = true;
    }
    if (this.vx > 0) {
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

  handleEating(plant) {
    let d = dist(this.x, this.y, plant.x, plant.y);

    if (d < 100 && this.health <= this.maxHealth / 2) {
      this.x = lerp(this.x, plant.x, 0.01);
      this.y = lerp(this.y, plant.y, 0.01);
    }

    if (d < this.radius + plant.radius) {
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);

      plant.health -= this.healthGainPerEat;

      if (plant.health <= 0) {
        plant.reset();
      }
    }

  }

  display(inGame) {
    push();
    rectMode(CORNER);
    noStroke();
    imageMode(CENTER);

    if (this.faceLeft) {
      image(this.texture, this.x, this.y, this.radius * 2, this.radius * 2);
    } else {
      image(this.texture_flipped, this.x, this.y, this.radius * 2, this.radius * 2);
    }

    if (inGame) {
      fill(100);
      rect(this.x - this.radius, this.y - 40, this.radius * 2, 5);
      fill(0, 255, 0); // green
      rect(this.x - this.radius, this.y - 40, this.health * 2, 5);
    }
    pop();
  }

  reset() {
    this.x = random(0, width);
    this.y = random(0, height);

    this.speed = this.originalSpeed;
    this.health = this.maxHealth;
  }
}
