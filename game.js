window.onload = function () {
    var canv = document.getElementById("canvas");
    var ctx = canv.getContext("2d");
    var worldSpeed = 1.0 / 1000.0;

    var score = 0;
    var lives = 0;
    var enemies = [];
    var bullets = [];
    var player = new Player(gameAction, canv);
    var background = new Background(canv);

    function collisionDetect() {
        for(i=0; i < bullets.length; i++) {
            for(j=0; j < enemies.length; j++) {
                if(enemies[j].y <= bullets[i].y && bullets[i].y <= enemies[j].y + enemies[j].height
                    && enemies[j].x <= bullets[i].x && bullets[i].x <= enemies[j].x + enemies[j].width) {
                    console.log("collision!");
                    bullets.splice(i, 1);
                    enemies.splice(j, 1);
                    score++;
                    break;
                }
            }
        }
    }
    function spawnEnemy() {
        if (enemies.length < 25) {
            var enemy = new Enemy();
            var x = Math.floor(Math.random() * (canv.width - enemy.getWidth()));
            // if(enemies.length > 0) {
            //     x1 = Math.floor(Math.random() * (enemies[enemies.length-1] - enemy.getWidth()));
            //     x2 = Math.floor(Math.random() * (canv.width - enemy.getWidth()) + enemies[enemies.length-1] - enemy.getWidth());
            //     if(Math.floor(Math.random() * 1)) {
            //         x = x1;
            //     } else {
            //         x = x2;
            //     }
            // }
            // while(enemies.length > 0 && enemies[enemies.length-1].x + 2*enemies[enemies.length-1].width <= x && x <= enemies[enemies.length-1].x + 2*enemies[enemies.length-1].width) {
            //     x = Math.floor(Math.random() * (canv.width - enemy.getWidth()));
            // }
            enemy.setX(x);
            enemies.push(enemy);
        }
    }

    var lastBulletSpawnTime = 0;
    function spawnBullet() {
        var nowTime = window.performance.now();
        if (nowTime - lastBulletSpawnTime > 250) {
            lastBulletSpawnTime = nowTime;
            var bullet = new Bullet(player.getCenterX(), player.getTopY() + 20);
            bullets.push(bullet);
        }
    }

    var game = {
        update: function (dt) {
            background.update(dt, worldSpeed);
            enemies.forEach(enemy => {
                enemy.update(dt, worldSpeed);
            });
            player.update(dt, worldSpeed);
            bullets.forEach(function (bullet, index, object) {
                bullet.update(dt, worldSpeed);
                
                if(bullet.y < 0) {
                    object.splice(index, 1);
                }
            });
            
            if(gameAction.shoot === 1) {
                spawnBullet();
                gameAction.shoot = 0;
            }
            collisionDetect();
        },
        draw: function () {
            ctx.clearRect(0, 0, canv.width, canv.height);
            background.draw(ctx);
            bullets.forEach(bullet => {
                bullet.draw(ctx);
            });

            enemies.forEach(enemy => {
                enemy.draw(ctx);
            });

            player.draw(ctx);

            ctx.save();

            ctx.font = "20pt Comic Sans MS";
            ctx.fillStyle = "yellow";
            // ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 3;
            ctx.fillText("Score " + score, 10, 30); 


            ctx.restore();

            ctx.save();

            ctx.font = "22pt Comic Sans MS";
            ctx.fillStyle = "yellow";
            // ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 3;
            ctx.textAlign="right";
            ctx.fillText("Lives " + lives, canv.width - 10, 30); 


            ctx.restore();

            // if(gameAction.shoot === 1) {
            //     this.bullet = new Image();
            //     this.bullet.src = "./bullet.png";
            //     ctx.drawImage(this.bullet, 0, 0, this.bullet.width, this.bullet.height, canv.width/2, canv.height/2, this.bullet.width/2, this.bullet.height/2);
            //     gameAction.shoot = 0;
            // }
        }
    };

    function handleStart(event) {
        event.preventDefault();
        var touches = event.changedTouches;
        console.log("x:" + touches[0].clientX + " y:" + touches[0].clientY);
        console.log("Handle start");
        player.setXMovePosition(touches[0].clientX);
    }

    function handleEnd(event) {
        event.preventDefault();
        var touches = event.changedTouches;
        console.log("x:" + touches[0].clientX + " y:" + touches[0].clientY);
        console.log("Handle end");
    }

    function handleCancel(event) {
        event.preventDefault();
        var touches = event.changedTouches;
        console.log("x:" + touches[0].clientX + " y:" + touches[0].clientY);
        console.log("Handle cancel");
    }

    function handleMove(event) {
        event.preventDefault();
        var touches = event.changedTouches;
        console.log("x:" + touches[0].clientX + " y:" + touches[0].clientY);
        console.log("Handle move");
    }

    canv.addEventListener("touchstart", handleStart, false);
    canv.addEventListener("touchend", handleEnd, false);
    canv.addEventListener("touchcancel", handleCancel, false);
    canv.addEventListener("touchmove", handleMove, false);

    const FPS = 90;
    var lastFrame = 0;
    var frameIntervalUpdate = 1000.0 / FPS;
    var delta = 0;
    var updateGraphics = true;

    function mainLoop() {
        var currentTime = performance.now();
        delta += currentTime - lastFrame;
        lastFrame = currentTime;
        while (delta >= frameIntervalUpdate) {
            game.update(frameIntervalUpdate);
            delta -= frameIntervalUpdate;
            updateGraphics = true;
        }

        if (updateGraphics === true) {
            game.draw(delta);
            updateGraphics = false;
        }
        window.requestAnimationFrame(mainLoop);
    }
    setInterval(spawnEnemy, 1000);
    mainLoop();
};