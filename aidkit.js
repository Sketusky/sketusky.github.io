class AidKit {
    constructor(images) {
        this.image = images.get('aidkit');
        this.updateSize();

        this.x = 0;
        this.y = -this.image.height;
        this.ySpeed = 75;
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
        this.width = window.innerWidth / 8;
        this.height = this.image.height/this.image.width * this.width;
    }

    update(dt, worldSpeed) {
        this.y += this.ySpeed * dt * worldSpeed;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height);

        ctx.save();

        ctx.font = "12pt Verdana";
        ctx.fillStyle = "white";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        ctx.textAlign = "center";
        ctx.fillText("AidKit", this.x, this.y);

        ctx.restore();
    }
}