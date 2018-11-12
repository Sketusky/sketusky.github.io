 class Enemy {
    constructor() {
      this.alien = new Image();
      this.alien.src = "./assets/alien.png";
      
      this.width = this.alien.width;
      this.height = this.alien.height;

      this.x = 0;
      this.y = -this.alien.height;
      this.ySpeed = 75;
    }

    getWidth() {
      return this.alien.width;
    }

    setX(x) {
      this.x = x;
    }

    update(dt, worldSpeed) {
      // this.x += this.xSpeed * dt * worldSpeed;
      this.y += this.ySpeed * dt * worldSpeed;
      // this.rotation =
      //   (this.rotation +
      //     (dt * this.rotationSpeed * worldSpeed * Math.PI) / 180) %
      //   360;
    }

    draw(ctx) {
      // ctx.drawImage(this.alien, 0, 0, this.alien.width, this.alien.height, this.x - this.alien.width/2, this.y - this.alien.height, this.alien.width, this.alien.height);

      ctx.drawImage(this.alien, 0, 0, this.alien.width, this.alien.height, this.x, this.y - this.alien.height, this.alien.width, this.alien.height);
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