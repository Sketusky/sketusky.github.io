class AidKit {
    constructor(images, canv) {
        this.image = images.get('aidkit');
        this.canv = canv;
        this.updateSize();

        this.x = 0;
        this.y = -this.image.height;
        this.ySpeed = this.canv.height * 0.10;
        this.rotation = 0;
    }

    getWidth() {
        return this.image.width;
    }

    getCenterX() {
        return this.x + this.width / 2;
    }

    setX(x) {
        this.x = x;
    }

    getTopY() {
        return this.y;
    }

    getCenterY() {
        return this.y + this.height / 2;
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
        this.rotation++;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI / 180 * this.rotation);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, - this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}