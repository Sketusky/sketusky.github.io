class Bullet {
    constructor(startX, startY) {
        this.body = new Image();
        this.body.src = "./assets/bullet.png";

        this.x = startX;
        this.y = startY;
        this.xSpeed = 200;
        this.ySpeed = -300;
    }

    getTopY() {
        return this.y;
    }

    getBottomY() {
        return this.y + this.height;
    }

    update(dt, worldSpeed) {
        this.y += this.ySpeed * dt * worldSpeed;
    }

    draw(ctx) {
        ctx.drawImage(this.body, 0, 0, this.body.width, this.body.height, this.x, this.y, this.body.width, this.body.height);
    }
}