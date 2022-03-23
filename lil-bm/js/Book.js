// Book
// can be collected by Character (player)

class Book {
  constructor(x, y, radius, texture) {
    this.x = x;
    this.y = y;
    this.health = radius; 
    this.texture = texture;
    this.radius = radius;
  }

  collide(object) {
    let d = dist(this.x, this.y, object.x, object.y);
    let dx = object.x - this.x;
    let dy = object.y - this.y;
    let angle = atan2(dy, dx);
    if (d < this.radius + object.radius / 2) {
      this.x -= random(1, 2) / 3.5 * Math.cos(angle);
      this.y -= random(1, 2)/ 3.5 * Math.sin(angle);
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

  display() {
    push();
    rectMode(CORNER);
    noStroke();
    imageMode(CENTER);

    image(this.texture, this.x, this.y, this.radius, this.radius);
    pop();
  }

  reset() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.health = this.radius;
  }
}
