const ball = {
    x: 50,
    y: 50,
    speedX: 10,
    speedY: 10,
    size: 10
};
const paddleOne = {
    y: 250,
    speed: 12,
    height: 100,
    thickness: 15,
    upPressed: false,
    downPressed: false
};
const paddleTwo = {
    y: 250,
    speed: 12,
    height: 100,
    thickness: 15,
    upPressed: false,
    downPressed: false,
    score: 0
}

const gameoverPoint = 11
const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
const framesPerSecond = 30;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(function () {
    moveEverything();
    drawEverything();
}, 1000 / framesPerSecond);

function ballReset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

function moveEverything() {
    if (paddleOne.score < gameoverPoint || paddleTwo.score < gameoverPoint) { 
        moveBall();
        movePaddles();
    }
}

function isPaddleTouchingBall(paddle) {
    return (ball.y - ball.size) <= (paddle.y + paddle.height) && (ball.y + ball.size) >= (paddle.y)
}

function moveBall() {
    let movementX = ball.speedX;
    if (isPaddleTouchingBall(paddleOne)) {
        if (ball.x <= paddleOne.thickness) {
            ball.speedX = -ball.speedX;
            movementX = ball.speedX;
        } else if (ball.x + ball.speedX <= paddleOne.thickness) {
            movementX = paddleOne.thickness - ball.x;
        }
    } else if (isPaddleTouchingBall(paddleTwo)) {
        if (ball.x >= canvas.width - paddleTwo.thickness) {
            ball.speedX = -ball.speedX;
            movementX = ball.speedX;
        } else if (ball.x + ball.speedX >= canvas.width - paddleTwo.thickness) {
            movementX = canvas.width - paddleTwo.thickness - ball.x;
        }
    } else if (ball.x < 0) {
        paddleTwo.score = paddleTwo.score + 1;
        ballReset();
    } else if (ball.x > canvas.width) {
        paddleOne.score = paddleOne.score + 1;
        ballReset();
    } if (ball.y < 0 || ball.y > canvas.height) {
        ball.speedY = -ball.speedY;
    }
    ball.x = ball.x + movementX;
    ball.y = ball.y + ball.speedY;
}

function movePaddles() {
    if (paddleTwo.downPressed) {
        movePaddleDown(paddleTwo);
    }
    else if (paddleTwo.upPressed) {
        movePaddleUp(paddleTwo)
    }
    // about player 1 paddle
    if (paddleOne.downPressed) {
        movePaddleDown(paddleOne);
    }
    else if (paddleOne.upPressed) {
        movePaddleUp(paddleOne);
    }
    // about player 2 paddle
}

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        paddleTwo.upPressed = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        paddleTwo.downPressed = true;
    }
    if (e.key == "w" || e.key == "KeyW") {
        paddleOne.upPressed = true;
    }
    else if (e.key == "s" || e.key == "KeyS") {
        paddleOne.downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        paddleTwo.upPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        paddleTwo.downPressed = false;
    }
    if (e.key == "w" || e.key == "KeyW") {
        paddleOne.upPressed = false;
    }
    else if (e.key == "s" || e.key == "KeyS") {
        paddleOne.downPressed = false;
    }
}  // about which keys I want to ues

function drawEverything() {
    if (paddleOne.score < gameoverPoint || paddleTwo.score < gameoverPoint) {
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        // above line blanks out the screen with black
    
        colorRect(0, paddleOne.y, paddleOne.thickness, paddleOne.height, 'blue');
        // this is left player paddle
    
        colorRect(canvas.width - paddleTwo.thickness, paddleTwo.y, paddleTwo.thickness, paddleTwo.height, 'red');
        // this is right player paddle
    
        colorCircle(ball.x, ball.y, ball.size, 'white')
        // above line draws the ball
        canvasContext.font = "30px Comic Sans MS";
        canvasContext.fillStyle = 'white';
        canvasContext.fillText(paddleOne.score, 50, 50);
        canvasContext.fillText(paddleTwo.score, canvas.width - 70, 50);
    } else {
        canvasContext.font = "200px Comic Sans MS";
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("Game Over", canvas.width/2, canvas.height/2);
    }
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);

}

function movePaddleDown(paddle) {
    paddle.y = paddle.y + paddle.speed;
    if (paddle.y + 100 > canvas.height) {
        paddle.y = canvas.height - 100;
    }
}

function movePaddleUp(paddle) {
    paddle.y = paddle.y - paddle.speed;
    if (paddle.y < 0) {
        paddle.y = 0
    }
}
