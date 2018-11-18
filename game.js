window.onload = function () {
    preLoadImages(function () {
        startGame();
    });
};

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function startGame() {
    console.log("GameStarted");
    var canv = document.getElementById("canvas");
    var ctx = canv.getContext("2d");
    safeView();

    var healthLostSound = new sound("./assets/healthlost.mp3");
    var healthGainSound = new sound("./assets/healthgain.mp3");
    var gameOverSound = new sound("./assets/gameover.mp3");
    var laserSound = new sound("./assets/laser.wav");
    var laserSound2 = new sound("./assets/laser2.wav");
    var spaceSound = new sound("./assets/space.mp3");

    var worldSpeed = 1.0 / 1000.0;

    var score = 0;
    var healthLevel = 5;
    var aidkits = [];
    var enemies = [];
    var bullets = [];
    var enemyBullets = [];
    var player = new Player(images, gameAction, canv);
    var background = new Background(images, canv);
    var battery = new Battery(images, canv.width, canv.height, canv);

    function safeView() {
        ctx.canvas.height = window.innerHeight;

        if (window.innerWidth > innerHeight) {
            ctx.canvas.height = window.innerHeight;
            ctx.canvas.width = window.innerHeight / 16 * 9;
        } else {
            ctx.canvas.width = window.innerWidth;
        }
    }

    function enemyPlayerCollisionDetect() {
        for (i = 0; i < enemies.length; i++) {
            if (enemies[i].getTopY() < player.getTopY() && player.getTopY() < enemies[i].getBottomY() &&
                (enemies[i].getStartX() < player.getStartX() && player.getStartX() < enemies[i].getEndX() ||
                    enemies[i].getStartX() < player.getEndX() && player.getEndX() < enemies[i].getEndX() ||
                    enemies[i].getStartX() < player.getCenterX() && player.getCenterX() < enemies[i].getEndX())) {

                enemies.splice(i, 1);
                healthLevel--;
                healthLostSound.play();
                break;
            }
        }
    }

    function enemyBulletCollisionDetect() {
        for (var i = 0; i < bullets.length; i++) {
            for (var j = 0; j < enemies.length; j++) {
                if (enemies[j].getTopY() <= bullets[i].getTopY() && bullets[i].y <= enemies[j].getBottomY() &&
                    enemies[j].getStartX() <= bullets[i].x && bullets[i].x <= enemies[j].x + enemies[j].width) {
                    console.log("collision!");
                    bullets.splice(i, 1);
                    enemies.splice(j, 1);
                    score++;
                    break;
                }
            }
        }
    }

    function playerBulletCollisionDetect() {
        for (var i = 0; i < enemyBullets.length; i++) {
            if (player.getTopY() <= enemyBullets[i].getTopY() && enemyBullets[i].y <= player.getBottomY() &&
                player.getStartX() <= enemyBullets[i].x && enemyBullets[i].x <= player.x + player.getWidth()) {
                enemyBullets.splice(i, 1);
                healthLevel--;
                healthLostSound.play();
                break;
            }
        }
    }

    function aidKitCollisionDetect() {
        for (i = 0; i < aidkits.length; i++) {
            if (aidkits[i].getTopY() <= player.y && player.y <= aidkits[i].getBottomY()) {
                aidkits.splice(i, 1);
                if (healthLevel < 5) {
                    healthLevel++;
                    healthGainSound.play();
                }
            }
        }
    }

    function enemyCollisionDetectWithBorder() {
        for (j = 0; j < enemies.length; j++) {
            if (enemies[j].getBottomY() >= canv.height) {
                enemies.splice(j, 1);
                healthLevel--;
                healthLostSound.play();
            }
        }
    }

    function spawnAidKit() {
        if (healthLevel < 5) {
            var aidkit = new AidKit(images, canv);
            var x = Math.floor(Math.random() * (canv.width - aidkit.getWidth()));
            aidkit.setX(x);
            aidkits.push(aidkit);
        }
    }

    function spawnEnemy() {
        if (enemies.length < 9) {
            var enemy = new Enemy(images, canv);
            var x = enemy.width * Math.floor(Math.random() * (this.canv.width / enemy.width));
            enemy.setX(x);
            enemies.push(enemy);
        }
    }

    function spawnRandomEnemyShoot() {
        var randomEnemy = enemies[Math.floor((Math.random() * enemies.length))];
        var enemyBullet = new Bullet(images, randomEnemy.getCenterX(), randomEnemy.getBottomY(), canv);
        enemyBullet.setMoveToBottom();
        enemyBullets.push(enemyBullet);
        laserSound2.play();
    }

    var lastBulletSpawnTime = 0;

    function spawnBullet() {
        var nowTime = window.performance.now();
        if (nowTime - lastBulletSpawnTime > 500) {
            lastBulletSpawnTime = nowTime;
            var bullet = new Bullet(images, player.getCenterX(), player.getTopY() + 20, canv);
            bullets.push(bullet);
            laserSound.play();
        }
    }

    var lastEnemySpawnTime = 0;
    var game = {
        update: function (dt) {
            safeView();
            spaceSound.play();
            if (performance.now() - lastEnemySpawnTime > (1000 + enemies.length * 100)) {
                lastEnemySpawnTime = performance.now();
                spawnEnemy();
            }


            background.update(dt, worldSpeed);
            enemies.forEach(enemy => {
                enemy.update(dt, worldSpeed);
            });
            player.update(dt, worldSpeed);
            bullets.forEach(function (bullet, index, object) {
                bullet.update(dt, worldSpeed);
                if (bullet.y < 0) {
                    object.splice(index, 1);
                }
            });

            enemyBullets.forEach(function (bullet, index, object) {
                bullet.update(dt, worldSpeed);
                if (bullet.y > this.canv.height) {
                    object.splice(index, 1);
                }
            });

            if (gameAction.shoot === 1) {
                spawnBullet();
                gameAction.shoot = 0;
            }

            enemyBulletCollisionDetect();
            enemyCollisionDetectWithBorder();
            playerBulletCollisionDetect();
            enemyPlayerCollisionDetect();

            battery.update(5 - healthLevel);

            aidkits.forEach(aidkit => {
                aidkit.update(dt, worldSpeed);
            });
            aidKitCollisionDetect();
        },
        draw: function () {
            ctx.clearRect(0, 0, canv.width, canv.height);
            background.draw(ctx);

            aidkits.forEach(aidkit => {
                aidkit.draw(ctx);
            });

            bullets.forEach(bullet => {
                bullet.draw(ctx);
            });

            enemyBullets.forEach(bullet => {
                bullet.draw(ctx);
            });

            enemies.forEach(enemy => {
                enemy.draw(ctx);
            });

            battery.draw(ctx);

            player.draw(ctx);

            ctx.save();

            ctx.font = "20pt Calibri";
            ctx.fillStyle = "yellow";
            // ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 3;
            ctx.fillText("Score " + score, 10, 30);

            ctx.restore();

            if (healthLevel <= 1) {
                ctx.save();

                ctx.font = "22pt Verdana";
                ctx.fillStyle = "white";
                ctx.shadowColor = "black";
                ctx.shadowBlur = 3;
                ctx.textAlign = "center";
                ctx.fillText("GameOver", canv.width / 2, canv.height / 2);

                ctx.restore();

                gameOverSound.play();
            }


            ctx.save();

            ctx.font = "20pt Calibri";
            ctx.fillStyle = "yellow";
            // ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 3;
            ctx.textAlign = "right";
            ctx.fillText("15:39 18.11.2018", canv.width - 20, 30);

            ctx.restore();

        }
    };

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
        if (healthLevel > 1) {
            window.requestAnimationFrame(mainLoop);
        }
    }
    setInterval(spawnAidKit, 5000);
    setInterval(spawnRandomEnemyShoot, 5500);
    mainLoop();
}