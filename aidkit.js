class AidKit {
    constructor(images, canv) {
        this.image = images.get('aidkit');
        this.canv = canv;
        this.updateSize();

        this.x = 0;
        this.y = -this.image.height;
        this.ySpeed = this.canv.height * 0.10;
    }

    getWidth() {
        return this.image.width;
    }

    setX(x) {
        this.x = x;
    }

    getTopY() {
        return this.y;
    }

    getBottomY() {
        return this.y + this.height;
    }

    updateSize() {
        this.width = this.canv.width / 8;
        this.height = this.image.height / this.image.width * this.width;
    }

    update(dt, worldSpeed) {
        this.y += this.ySpeed * dt * worldSpeed;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height);
    }
}