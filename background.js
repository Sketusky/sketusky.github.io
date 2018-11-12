class Background {
    constructor() {
        this.backgrounds = [];
        
        var background = new Image();
        background.src = "./assets/background_360.png";

        var background2 = new Image();
        background2.src = "./assets/background_2_360.png";

        this.backgrounds.push(background);
        this.backgrounds.push(background2);

        this.y = 0;
        this.ySpeed = 30;
    }

    update(dt, worldSpeed) {
        this.y += this.ySpeed * dt * worldSpeed;
        if(this.y >= this.backgrounds[0].height) {
            this.y = 0;
            var temp = this.backgrounds[0];
            this.backgrounds[0] = this.backgrounds[1];
            this.backgrounds[1] = temp;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.backgrounds[0], 0, 0, this.backgrounds[0].width, this.backgrounds[0].height, 0, this.y, this.backgrounds[0].width, this.backgrounds[0].height);
        ctx.drawImage(this.backgrounds[1], 0, 0, this.backgrounds[1].width, this.backgrounds[1].height, 0, -this.backgrounds[0].height + 1 + this.y, this.backgrounds[1].width, this.backgrounds[1].height);
    }
}