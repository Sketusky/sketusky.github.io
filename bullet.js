class Bullet {
    constructor(images, startX, startY) {
        this.image = images.get('bullet');

        this.updateSize();

        this.x = startX;
        this.y = startY;
        this.ySpeed = -window.innerHeight*0.95;
    }

    setMoveToBottom() {
        this.ySpeed = -this.ySpeed/2;
    }

    getTopY() {
        return this.y;
    }

    getBottomY() {
        return this.y + this.height;
    }

    updateSize() {
        this.width = window.innerWidth / 50;
        this.height = this.image.height/this.image.width * this.width;
    }

    update(dt, worldSpeed) {
        this.ySpeed *= 1.03;
        this.updateSize();
        this.y += this.ySpeed * dt * worldSpeed;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height);
    }
}