// Get the canvas element and context
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// Set up the game objects
var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 5,
  dy: 5
};

var paddle = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 20,
  width: 100,
  height: 10,
  dx: 0
};

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

// Draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

// Update the ball position
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  // Check for collision with walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
  
  // Check for collision with paddle
  if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
    ball.dy = -ball.dy;
  }
}

// Update the paddle position
function updatePaddle() {
  paddle.x += paddle.dx;
  
  // Keep the paddle within the canvas boundaries
  if (paddle.x < 0) {
    paddle.x = 0;
  }
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

// Clear the canvas and draw the game objects
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
}

// Handle keyboard input to move the paddle
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 37) {
    paddle.dx = -5; // Move left
  } else if (event.keyCode === 39) {
    paddle.dx = 5; // Move right
  }
});

document.addEventListener('keyup', function(event) {
  paddle.dx = 0; // Stop moving
});

// Set up the game loop
function loop() {
  updateBall();
