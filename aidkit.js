class AidKit {
    constructor(images) {
        this.asset = images.get('aidkit');

        this.width = this.asset.width;
        this.height = this.asset.height;

        this.x = 0;
        this.y = -this.asset.height;
        this.ySpeed = 100;
    }

    getWidth() {
        return this.asset.width;
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

    update(dt, worldSpeed) {
        this.y += this.ySpeed * dt * worldSpeed;
    }

    draw(ctx) {
        ctx.drawImage(this.asset, 0, 0, this.asset.width, this.asset.height, this.x, this.y, this.asset.width, this.asset.height);
    }
}