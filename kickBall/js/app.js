var ball;

function setup() {
  createCanvas(500, 500);
  background(220);

  ball = new Ball();
}

function draw() {
  background(220);
  ball.update();
  ball.show();

  if (mouseIsPressed) {
    var mouse = createVector(mouseX, mouseY);
    if (ball.pos.dist(mouse) < ball.r) {
      ball.vel.mult(0);
    }
    stroke(255, 0, 0);
    strokeWeight(3);
    line(mouseX, mouseY, ball.pos.x, ball.pos.y);
  }
}

function mouseReleased() {
  var mouse = createVector(mouseX, mouseY);
  var click = p5.Vector.sub(ball.pos, mouse);
  click.mult(0.1);
  ball.applyForce(click);
}

function Ball() {
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(0);
  this.acc = createVector(0);
  this.r = 50;
  this.c = color(0);

  this.update = function () {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.mult(0);
    this.vel.mult(0.95);

    this.bounce();
  };

  this.applyForce = function (force) {
    this.acc = force;
  };

  this.show = function () {
    fill(this.c);
    stroke(this.c);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };

  this.bounce = function () {
    if (this.pos.x - this.r <= 0 || width <= this.pos.x + this.r) {
      this.vel.x = this.vel.x * -1;
    }
    if (this.pos.y - this.r <= 0 || height <= this.pos.y + this.r) {
      this.vel.y = this.vel.y * -1;
    }
  };
}
