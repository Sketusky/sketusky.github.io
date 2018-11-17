class Bullet {
    constructor(images, startX, startY) {
        this.body = images.get('bullet');

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