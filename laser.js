class Laser {
    constructor(image, startX, startY, canv) {
        this.image = image;
        this.canv = canv;

        this.updateSize();

        this.x = startX - this.width/2;
        this.y = startY;
        this.ySpeed = -this.canv.height * 0.95;
    }

    setMoveToBottom() {
        this.ySpeed = -this.ySpeed / 2;
    }

    getTopY() {
        return this.y;
    }

    getBottomY() {
        return this.y + this.height;
    }

    updateSize() {
        this.width = this.canv.width / 30;
        this.height = this.image.height / this.image.width * this.width;
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