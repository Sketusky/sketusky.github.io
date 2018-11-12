class Bullet {
    constructor(startX, startY) {
        this.body = new Image();
        this.body.src = "./assets/bullet.png";

        this.x = startX;
        this.y = startY;
        this.xSpeed = 200;
        this.ySpeed = -300;
    }

    update(dt, worldSpeed) {
        this.y += this.ySpeed * dt * worldSpeed;
    }

    draw(ctx) {
        ctx.drawImage(this.body, 0, 0, this.body.width, this.body.height, this.x - this.body.width/2, this.y - this.body.height, this.body.width, this.body.height);
    }
}