class Book extends Tree {
  constructor(x, y, radius, texture) {
    this.x = x;
    this.y = y;
    this.texture = texture;
    this.radius = radius;

    this.maxHealth = 100;
    this.health = this.maxHealth;
  }

  collide(object) {
    let d = dist(this.x, this.y, object.x, object.y);
    let dx = object.x - this.x;
    let dy = object.y - this.y;
    let angle = atan2(dy, dx);
    if (d < this.radius + object.radius / 2) {
      this.x -= random(1, 2) / 3.5 * Math.cos(angle);
      this.y -= random(1, 2) / 3.5 * Math.sin(angle);
    }
  }

  reset() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.health = this.maxHealth;
  }
}
