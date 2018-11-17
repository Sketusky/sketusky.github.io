class Battery {
    constructor(images, startX, startY) {
        this.image = images.get('battery');
        this.updateSize();

        this.x = startX;
        this.y = startY;
        this.level = 0;
    }

    updateSize() {
        this.width = window.innerWidth / 11.25;
        this.height = this.image.height/this.image.width*5 * this.width;
    }

    update(level) {
        this.updateSize();
        this.level = level;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.level * this.image.width / 5, 0, this.image.width / 5, this.image.height, this.x - this.width - 3, this.y - this.height - 3, this.width, this.height);
    }
}