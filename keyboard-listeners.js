

class GameAction {
    constructor() {
        this.moveX = 0;
        this.moveY = 0;
        this.shoot = 0;
        this.over = false;
    }
}


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
        if(gameAction.over === true) {
            gameAction.over = false;
            startGame();
        }
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
    gameAction.moveX = Math.round(event.gamma);
    if (-2 <= event.gamma && event.gamma <= 2) {
        gameAction.moveX = 0;
    } else if (event.gamma <= -10 && event.gamma <= 10) {
        gameAction.moveX = Math.round(event.gamma) / 10; // Left - Right
    } else if (event.gamma > 10) {
        gameAction.moveX = 1;
    } else if (event.gamma < 10) {
        gameAction.moveX = -1;
    }
    // gameAction.moveX = Math.round(event.gamma); 
    // gameAction.moveY = -Math.round(event.beta);
}

function handleStart(event) {
    event.preventDefault();
    if(gameAction.over === true) {
        console.log("rect");
        startGame();
    } else {
        gameAction.shoot = 1;
    }

}

function handleEnd(event) {
    event.preventDefault();
    gameAction.shoot = 0;
}