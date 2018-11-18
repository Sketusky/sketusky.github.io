class Enemy {
  constructor(images, canv) {
    this.image = images.get('alien');
    this.canv = canv;
    this.updateSize();

    this.x = 0;
    this.y = -this.image.height;
    this.ySpeed = this.canv.height * 0.2;
  }

  getWidth() {
    return this.width;
  }

  setX(x) {
    this.x = x;
  }

  getCenterX() {
    return this.x + this.width / 2;
  }

  getStartX() {
    return this.x;
  }

  getEndX() {
    return this.x + this.width;
  }

  getTopY() {
    return this.y;
  }

  getBottomY() {
    return this.y + this.height;
  }

  updateSize() {
    this.width = this.canv.width / 5;
    this.height = this.image.height / this.image.width * this.width;
  }

  update(dt, worldSpeed) {
    this.updateSize();
    // this.x += this.xSpeed * dt * worldSpeed;
    this.y += this.ySpeed * dt * worldSpeed;
    // this.rotation =
    //   (this.rotation +
    //     (dt * this.rotationSpeed * worldSpeed * Math.PI) / 180) %
    //   360;
  }

  draw(ctx) {
    ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height);
    // ctx.save();
    // ctx.translate(this.x, this.y);

    // ctx.beginPath();
    // ctx.strokeStyle = "blue";
    // ctx.rect(0, 0, 150, 80);
    // ctx.stroke();

    // ctx.restore();

    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.fillStyle = this.fillStyle;
    // ctx.translate(0 + this.width / 2.0, 0 + this.height / 2.0);
    // ctx.rotate((this.rotation * Math.PI) / 180.0);
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.restore();

    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.fillStyle = this.fillStyle;
    // ctx.translate(0 + this.width / 2.0, 0 + this.height / 2.0);
    // ctx.rotate(((this.rotation + 90) * Math.PI) / 180.0);
    // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.restore();
  }
}