class Battery {
    constructor(startX, startY) {
        this.body = new Image();
        this.body.src = "./assets/battery_360.png";

        this.x = startX;
        this.y = startY;
        this.level = 0;
    }

    update(level) {
        this.level = level;
    }

    draw(ctx) {
        ctx.drawImage(this.body, this.level*this.body.width/5, 0, this.body.width/5, this.body.height, this.x - this.body.width/5 - 5, this.y - this.body.height - 5, this.body.width/5, this.body.height);
    }
}