document.addEventListener('keydown', pressedKey);
document.addEventListener('keyup', releasedKey);
window.addEventListener("deviceorientation", handleOrientation, true);

var canv = document.getElementById("canvas");
canv.addEventListener("touchstart", handleStart, false);
canv.addEventListener("touchend", handleEnd, false);

class GameAction {
    constructor() {
        this.moveX = 0;
        this.moveY = 0;
        this.shoot = 0;
    }
}

var gameAction = new GameAction();

function pressedKey(event) {
    if (event.keyCode === 87 /* w */ ) {
        gameAction.moveY = 1;
    }
    if (event.keyCode === 68 /* d */ ) {
        gameAction.moveX = 1;
    }
    if (event.keyCode === 83 /* s */ ) {
        gameAction.moveY = -1;
    }
    if (event.keyCode === 65 /* a */ ) {
        gameAction.moveX = -1;
    }
    if (event.keyCode === 32 /* space */ ) {
        gameAction.shoot = 1;
    }
}

function releasedKey(event) {
    if (event.keyCode === 87 /* w */ && gameAction.moveY === 1) {
        gameAction.moveY = 0;
    }
    if ((event.keyCode === 68 /* d */ ) && gameAction.moveX === 1) {
        gameAction.moveX = 0;
    }
    if (event.keyCode === 83 /* s */ && gameAction.moveY === -1) {
        gameAction.moveY = 0;
    }
    if ((event.keyCode === 65 /* a */ ) && gameAction.moveX === -1) {
        gameAction.moveX = 0;
    }
}

function handleOrientation(event) {
    if (-5 <= event.gamma && event.gamma <= 5) {
        gameAction.moveX = 0;
    } else if (event.gamma <= -15 && event.gamma <= -5) {
        gameAction.moveX = Math.round(event.gamma*10 + 5) / 100; // Left - Right
    } else if (event.gamma <= 5 && event.gamma <= 15) {
        gameAction.moveX = Math.round(event.gamma*10 - 5) / 100; // Left - Right
    } else if (event.gamma > 15) {
        gameAction.moveX = 1;
    } else if (event.gamma < 15) {
        gameAction.moveX = -1;
    }
    // gameAction.moveX = Math.round(event.gamma); 
    // gameAction.moveY = -Math.round(event.beta);
}

function handleStart(event) {
    event.preventDefault();
    gameAction.shoot = 1;
}

function handleEnd(event) {
    event.preventDefault();
    gameAction.shoot = 0;
}