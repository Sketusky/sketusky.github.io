var canv;
var ctx;
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
    };

    this.stop = function () {
        this.sound.pause();
    };
}

var healthLostSound = new sound("./assets/healthlost.mp3");
var healthGainSound = new sound("./assets/healthgain.mp3");
var gameOverSound = new sound("./assets/gameover.mp3");
var laserSound = new sound("./assets/laser.wav");
var laserSound2 = new sound("./assets/laser3.mp3");
var spaceSound = new sound("./assets/space.mp3");
var gameAction;

function safeView() {
    ctx.canvas.height = window.innerHeight;

    if (window.innerWidth > innerHeight) {
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerHeight / 16 * 9;
    } else {
        ctx.canvas.width = window.innerWidth;
    }
}

function startGame() {
    canv = undefined;
    ctx = undefined;
    gameAction = undefined;

    canv = document.getElementById("canvas");
    ctx = canv.getContext("2d");
    window.addEventListener("deviceorientation", handleOrientation, true);

    safeView();

    document.addEventListener('keydown', pressedKey);
    document.addEventListener('keyup', releasedKey);

    canv.addEventListener("touchstart", handleStart, false);
    canv.addEventListener("touchend", handleEnd, false);

    canvas.addEventListener('click', handleStart, false);
    gameAction = new GameAction();

    var worldSpeed = 1.0 / 1000.0;

    var score = 0;
    var healthLevel = 5;
    var aidkits = [];
    var enemies = [];
    var lasers = [];
    var enemyLasers = [];
    var player = new Player(images, gameAction, canv);
    var background = new Background(images, canv);
    var battery = new Battery(images, canv.width, canv.height, canv);

    

    function enemyPlayerCollisionDetect() {
        for (i = 0; i < enemies.length; i++) {
            if (enemies[i].getHit() === false && enemies[i].getTopY() < player.getTopY() && player.getTopY() < enemies[i].getBottomY() &&
                (enemies[i].getStartX() < player.getStartX() && player.getStartX() < enemies[i].getEndX() ||
                    enemies[i].getStartX() < player.getEndX() && player.getEndX() < enemies[i].getEndX() ||
                    enemies[i].getStartX() < player.getCenterX() && player.getCenterX() < enemies[i].getEndX())) {

                enemies[i].setHit();
                player.playerHit();
                healthLevel--;
                healthLostSound.play();
                break;
            }
        }
    }

    function enemyBulletCollisionDetect() {
        for (var i = 0; i < lasers.length; i++) {
            for (var j = 0; j < enemies.length; j++) {
                if (enemies[j].getHit() === false && enemies[j].getTopY() <= lasers[i].getTopY() && lasers[i].y <= enemies[j].getBottomY() &&
                    enemies[j].getStartX() <= lasers[i].x && lasers[i].x <= enemies[j].x + enemies[j].width) {
                    lasers.splice(i, 1);
                    // enemies.splice(j, 1);
                    enemies[j].setHit();
                    score++;
                    break;
                }
            }
        }
    }

    function playerBulletCollisionDetect() {
        for (var i = 0; i < enemyLasers.length; i++) {
            if (player.getTopY() <= enemyLasers[i].getTopY() && enemyLasers[i].y <= player.getBottomY() &&
                player.getStartX() <= enemyLasers[i].x && enemyLasers[i].x <= player.x + player.getWidth()) {
                enemyLasers.splice(i, 1);
                player.playerHit();
                healthLevel--;
                healthLostSound.play();
                break;
            }
        }
    }

    function aidKitCollisionDetect() {
        for (i = 0; i < aidkits.length; i++) {
            if (aidkits[i].getCenterY() <= player.getBottomY() && player.y <= aidkits[i].getCenterY() &&
                player.x <= aidkits[i].getCenterX() && aidkits[i].getCenterX() <=  player.getEndX()) {
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
            if (enemies[j].getHit() === false && enemies[j].getBottomY() >= canv.height) {
                enemies.splice(j, 1);
                player.playerHit();
                healthLevel--;
                // healthLostSound.play();
            }
        }
    }

    function enemyCollisionDetectWithBorderDie() {
        for (j = 0; j < enemies.length; j++) {
            if (enemies[j].getHit() === true && (enemies[j].x >= canv.width || enemies[j].x < -enemies.getWidth)) {
                enemies.splice(j, 1);
            }
        }
    }

    function spawnAidKit() {
        if (healthLevel + aidkits.length < 5) {
            var aidkit = new AidKit(images, canv);
            var x = Math.floor(Math.random() * (canv.width - aidkit.getWidth()));
            aidkit.setX(x);
            aidkits.push(aidkit);
        }
    }

    function generateEnemyXNotInLine(rows, x) {
        for (var i = 0; i < rows; i++) {
            while (enemies.length > i && Math.floor(enemies[enemies.length - (i + 1)].x) === Math.floor(x)) {
                x = enemies[0].width * Math.floor(Math.random() * (this.canv.width / enemies[0].width));
            }
            return x;
        }
    }

    function spawnEnemy() {
        if (enemies.length < 9) {
            var enemy = new Enemy(images, canv);
            var x = enemy.width * Math.floor(Math.random() * (this.canv.width / enemy.width));
            x = generateEnemyXNotInLine(4, x);
            enemy.setX(x);
            enemies.push(enemy);
        }
    }

    function spawnRandomEnemyShoot() {
        var randomEnemy = enemies[Math.floor((Math.random() * enemies.length))];
        if(randomEnemy.getHit() === false) {
            var enemyBullet = new Laser(images.get('enemy_laser'), randomEnemy.getCenterX(), randomEnemy.getBottomY(), canv);
            enemyBullet.setMoveToBottom();
            enemyLasers.push(enemyBullet);
            laserSound2.play();
        }
    }

    var lastBulletSpawnTime = 0;

    function spawnBullet() {
        var nowTime = window.performance.now();
        if (nowTime - lastBulletSpawnTime > 400) {
            lastBulletSpawnTime = nowTime;
            var bullet = new Laser(images.get('laser'), player.getCenterX(), player.getTopY() + 20, canv);
            lasers.push(bullet);
            laserSound.stop();
            laserSound.play();
        }
    }

    function drawDebug(ctx) {
        ctx.save();

        ctx.font = "20pt Calibri";
        ctx.fillStyle = "yellow";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        ctx.textAlign = "right";
        ctx.fillText("20:40 06.01.2019", canv.width - 20, 30);

        ctx.restore();
    }

    function drawGameOver(ctx) {
        ctx.save();

        ctx.font = "24pt Verdana";
        ctx.fillStyle = "white";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        ctx.textAlign = "center";
        ctx.fillText("GameOver", canv.width / 2, canv.height / 2);

        ctx.restore();
    }

    function drawPlayAgain(ctx) {
        ctx.save();

        ctx.font = "24pt Verdana";
        ctx.fillStyle = "white";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        ctx.textAlign = "center";
        ctx.fillText("Click to play again!", canv.width / 2, canv.height / 2 - 100);

        ctx.restore();
    }

    function drawScore(ctx) {
        ctx.save();

        ctx.font = "20pt Verdana";
        ctx.fillStyle = "#48D1CC";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 3;
        ctx.fillText("Score " + score, 10, 30);

        ctx.restore();
    }

    function drawScoreList(ctx, scores) {

        var startPoint = 30;

        ctx.save();

            ctx.font = "22pt Arial";
            ctx.fillStyle = "purple";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 3;
            ctx.textAlign = "center";
            ctx.fillText("Top 10 scores", canv.width / 2, canv.height / 2 + startPoint + i*30);

        ctx.restore();

        for(var i=0; i < scores.length; i++) {
            ctx.save();

            ctx.font = "24pt Arial";
            ctx.fillStyle = "orange";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 3;
            ctx.textAlign = "center";
            ctx.fillText((i+1) + ". " + scores[i], canv.width / 2, canv.height / 2 + startPoint + (i+1)*35);

            ctx.restore();
        }
        
    }

    var lastEnemySpawnTime = 0;
    var lastRandomEnemyShoot = 0;
    var lastSpawnAidKit = 0;

    var game = {
        update: function (dt) {
            safeView();
            spaceSound.play();
            var nowTime = performance.now();
            if (nowTime - lastEnemySpawnTime > (700 + enemies.length * 100)) {
                lastEnemySpawnTime = nowTime;
                spawnEnemy();
            }

            if (nowTime - lastRandomEnemyShoot > 3000) {
                lastRandomEnemyShoot = nowTime;
                spawnRandomEnemyShoot();
            }

            if (nowTime - lastSpawnAidKit > 8000) {
                lastSpawnAidKit = nowTime;
                spawnAidKit();
            }

            background.update(dt, worldSpeed);
            enemies.forEach(enemy => {
                enemy.update(dt, worldSpeed);
            });
            player.update(dt, worldSpeed);
            lasers.forEach(function (bullet, index, object) {
                bullet.update(dt, worldSpeed);
                if (bullet.y < 0) {
                    object.splice(index, 1);
                }
            });

            enemyLasers.forEach(function (bullet, index, object) {
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
            enemyCollisionDetectWithBorderDie();

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

            lasers.forEach(bullet => {
                bullet.draw(ctx);
            });

            enemyLasers.forEach(bullet => {
                bullet.draw(ctx);
            });

            enemies.forEach(enemy => {
                enemy.draw(ctx);
            });

            battery.draw(ctx);
            player.draw(ctx);

            drawScore(ctx);

            if (healthLevel <= 1) {
                drawGameOver(ctx);
                drawPlayAgain(ctx);

                gameOverSound.play();
                spaceSound.stop();
            }
            // drawDebug(ctx);
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
        } else {
            gameAction.over = true;
            const http = new XMLHttpRequest();
            url='http://vps618142.ovh.net:3333/?score=' + score;
            http.open("GET", url);
            http.send();
            http.onreadystatechange=(e)=>{
                drawScoreList(ctx, JSON.parse(http.responseText));
                console.log();
            }
        }
    }
    mainLoop();
}
