class Background {
    constructor(images, canv) {
        this.canv = canv;
        this.backgrounds = [];

        var background = images.get('background');
        var background2 = images.get('background_2');

        this.backgrounds.push(background);
        this.backgrounds.push(background2);

        this.y = 0;
        this.ySpeed = this.canv.height * 0.05;
    }

    update(dt, worldSpeed) {
        this.y += this.ySpeed * dt * worldSpeed;
        if (this.y >= this.backgrounds[0].height) {
            this.y = 0;
            var temp = this.backgrounds[0];
            this.backgrounds[0] = this.backgrounds[1];
            this.backgrounds[1] = temp;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.backgrounds[0], 0, 0, this.backgrounds[0].width, this.backgrounds[0].height, 0, this.y, this.canv.width, this.backgrounds[0].height);
        ctx.drawImage(this.backgrounds[1], 0, 0, this.backgrounds[1].width, this.backgrounds[1].height, 0, -this.backgrounds[1].height + 1 + this.y, this.canv.width, this.backgrounds[1].height);
    }
}