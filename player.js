class Player {
  constructor(images, gameAction, canv) {
    if(Math.floor(Math.random() * 2) === 0) {
      this.image = images.get('spaceship');
    } else {
      this.image = images.get('spaceship_2');
    }
    this.canv = canv;
    this.updateSize();

    this.canv = canv;
    this.gameAction = gameAction;

    this.x = this.canv.width / 2 - this.width / 2;
    this.y = this.canv.height - this.height - 20;

    this.xSpeed = this.canv.width * 0.75;
    this.ySpeed = -this.canv.height * 0.25;

    this.rotation = 0;
    this.rotationSpeed = 20 * 1000;

    this.counter = 0;
  }

  getWidth() {
    return this.width;
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
    this.width = this.canv.width / 4;
    this.height = this.image.height / this.image.width * this.width;
  }

  playerHit() {
    this.counter = 100;
  }

  update(dt, worldSpeed) {
    this.updateSize();
    //Move left-right
    if (this.gameAction.moveX > 0) {
      this.x += this.xSpeed * dt * worldSpeed * Math.sin(Math.PI * this.gameAction.moveX / 2);
    } else if (this.gameAction.moveX < 0) {
      this.x += this.xSpeed * dt * worldSpeed * Math.sin(Math.PI * this.gameAction.moveX / 2);
    }

    //Move up-down
    if (this.gameAction.moveY > 0) {
      this.y += this.ySpeed * dt * worldSpeed;
    } else if (this.gameAction.moveY < 0) {
      this.y -= this.ySpeed * dt * worldSpeed;
    }

    //If outside left side
    if (this.x <= 0) {
      this.x = 0;
    }

    //If outside right side
    if (this.x >= this.canv.width - this.width) {
      this.x = this.canv.width - this.width;
    }

    //If outisde bottom side
    if (this.getBottomY() > this.canv.height) {
      this.y = this.canv.height - this.height;
    }

    //If outside top side
    if (this.getTopY() <= 0) {
      this.y = 0;
    }

    this.rotation =
      (this.rotation +
        (dt * this.rotationSpeed * worldSpeed * Math.PI) / 180) %
      360;

    if(this.counter > 0) {
      this.counter--;
    }
  }

  draw(ctx) {
    if(this.counter % 10 !== 0) {
    } else {
      ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height);
    }
    // ctx.save();
    // ctx.translate(this.x, this.y);

    // // ctx.beginPath();
    // // ctx.strokeStyle = "blue";
    // // ctx.rect(0, 0, 150, 80);
    // // ctx.stroke();

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