 class Player {
    constructor(gameAction, canv) {
      this.body = new Image();
      this.body.src = "./assets/helikopter_yellow.png";
      this.canv = canv;
      this.gameAction = gameAction;

      this.width = this.body.width;
      this.height = this.body.height;

      this.x = this.canv.width/2 - this.body.width/2;
      this.y = this.canv.height  - this.height - 20;

      this.xSpeed = this.canv.width*0.75;
      this.ySpeed = -100;

      this.rotation = 0;
      this.rotationSpeed = 20 * 1000;
    }

    getWidth() {
      return this.width;
    }

    getCenterX() {
      return this.x + this.body.width/2;
    }

    getTopY() {
      return this.y;
    }

    getBottomY() {
      return this.y + this.height;
    }

    update(dt, worldSpeed) {
      //Move left-right
      if (this.gameAction.moveX > 0) {
        this.x += this.xSpeed * dt * worldSpeed;
      } else if (this.gameAction.moveX < 0) {
        this.x -= this.xSpeed * dt * worldSpeed;
      }

      //Move up-down
      if (this.gameAction.moveY > 0) {
        this.y += this.ySpeed * dt * worldSpeed;
      } else if (this.gameAction.moveY < 0) {
        this.y -= this.ySpeed * dt * worldSpeed;
      }

      //If outside left side
      if(this.x <= 0) {
        this.x = 0;
      }

      //If outside right side
      if(this.x >= this.canv.width - this.body.width ) {
        this.x = this.canv.width - this.body.width;
      }

      //If outisde bottom side
      if(this.getBottomY() > this.canv.height) {
        this.y = this.canv.height - this.height;
      }

      //If outside top side
      if(this.getTopY() <= 0) {
        this.y = 0;
      }

      this.rotation =
        (this.rotation +
          (dt * this.rotationSpeed * worldSpeed * Math.PI) / 180) %
        360;
    }

    draw(ctx) {
      ctx.drawImage(this.body, 0, 0, this.body.width, this.body.height, this.x, this.y, this.body.width, this.body.height);
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