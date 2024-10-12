<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startButton = document.getElementById('startButton');


const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = 0;
let gameInterval;
let gameRunning = false;

function drawGame() {
    clearCanvas();
    moveSnake();
    drawFood();
    drawSnake();
    checkCollision();
    updateScore();
}

function clearCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        const color = index === 0 ? '#4CAF50' : '#45a049';
        drawPixel(segment.x, segment.y, color);
    });
}

function drawFood() {
    drawPixel(food.x, food.y, '#FF0000');
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    updateScore();
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = `Highest Score: ${highScore}`;
    }
}

function startGame() {
    if (!gameRunning) {
        resetGame();
        gameRunning = true;
        startButton.textContent = 'Restart Game';
        gameInterval = setInterval(drawGame, 100);
    } else {
        endGame();
        startGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    gameRunning = false;
    startButton.textContent = 'Start Game';
    updateScore();
}

document.addEventListener('keydown', (e) => {
    if (gameRunning) {
        switch (e.key) {
            case 'ArrowUp':
                if (dy === 0) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
                if (dy === 0) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
                if (dx === 0) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx === 0) { dx = 1; dy = 0; }
                break;
        }
    }
});

startButton.addEventListener('click', startGame);

downloadButton.addEventListener('click', () => {
    const sourceCode = document.documentElement.outerHTML;
    const blob = new Blob([sourceCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pixel_snake_game.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

clearCanvas();
drawSnake();
drawFood();
</script>