class Bullet {
    constructor(images, startX, startY) {
        this.image = images.get('bullet');

        this.updateSize();

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

    updateSize() {
        this.width = window.innerWidth / 50;
        this.height = this.image.height/this.image.width * this.width;
    }

    update(dt, worldSpeed) {
        this.updateSize();
        this.y += this.ySpeed * dt * worldSpeed;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.width, this.height);
    }
}