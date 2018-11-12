document.addEventListener('keydown', pressedKey);
document.addEventListener('keyup', releasedKey);
window.addEventListener("deviceorientation", orientationChanged, true);

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
    if (event.keyCode === 32 /* space */) {
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

function orientationChanged (event) {
    gameAction.moveX = Math.round(event.gamma); // Left - Right
    gameAction.moveY = Math.round(event.beta); // Forward - Backward
}