const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
let dividingFactor = 1;
const unit = 25 / dividingFactor;
const FPS = 10;
let score = 0;
let aiIsOn = true;
let eat = new Audio();
eat.src = "sounds/eat.mp3"
let snakeHead = new Image;
snakeHead.src = "images/newsnakeHead.png"

let snakeBody = new Image;
snakeBody.src = "images/snakeBody.png"

let snakeFood = new Image;
snakeFood.src = "images/food.png"

/*
let ground = new Image;
ground.src = "images/ground.png"
*/

let gameover = new Audio();
gameover.src = "sounds/gameover.mp3"

// snake object


let snake = [];
snake[0] = {
    x: 14 * unit,
    y: 17 * unit
};
snake[1] = {
    x: 13 * unit,
    y: 17 * unit
}

//control the snake

let d;
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        //snakeHead.transform.rotate(90deg);
        d = "UP";

    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";

    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    } else if (event.keyCode == 32) {
        aiIsOn = !aiIsOn;
    }
}

function checkCollisionWithItself() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x !== snake[i].x && snake[0].y !== snake[i].y) {
            return true;
        } else {
            return false;
        }
    }
}
/*
function collision(head,array) {
  for (let i = 0; i < array.length; i++){	
	if (head.x == array[i].x && head.y == array[i].y){
	  return true;
      } 
    }
	return false;  
  }
*/

// food
let food = {
        x: Math.floor(Math.random() * cvs.width / unit) * unit,
        y: Math.floor(Math.random() * cvs.width / unit) * unit,
        w: unit,
        h: unit,
        color: "red",
    }
    //draw random food
function drawfood() {
    ctx.fillStyle = "rgba(200, 0, 0, 1)";
    ctx.drawImage(snakeFood, food.x, food.y, food.w, food.h);
}

function drawSnakeHead() {
    ctx.fillStyle = "rgba(160, 0, 0, 1)"
    ctx.fillRect(snake[0].x, snake[0].y + unit, unit, unit);
}
//cherck colliosin

//draw 
function draw() {
    ctx.fillStyle = "black";
    for (let i = 0; i < cvs.width; i += unit) {
        for (let j = 0; j < cvs.width; j += unit) {
            if ((i + j) * dividingFactor % 2 == 0) {
                ctx.fillStyle = "rgba(0, 50, 0, 1)";
                ctx.fillRect(i, j, unit, unit);
            } else {
                ctx.fillStyle = "rgba(0, 30, 0, 1)";
                ctx.fillRect(i, j, unit, unit);
            }
        }
    }
    drawfood();
    //drawSnakeHead();

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "orange";
        ctx.fillRect(snake[0].x, snake[0].y, unit, unit);
        //		ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillStyle = "orangered"
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
    }

    //old head positionzzz
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //increasse the size of snake

    if (snake[0].x == food.x && snake[0].y == food.y) {
        eat.play();
        food = {
            x: Math.floor(Math.random() * cvs.width / unit) * unit,
            y: Math.floor(Math.random() * cvs.width / unit) * unit,
            w: unit,
            h: unit,
            color: "red",
        }
        score++;
        document.getElementById("score").innerHTML = score;
    } else {
        snake.pop();
    };
    //remove the tail

    //which direction 
    if (d == "LEFT") snakeX -= unit;
    if (d == "RIGHT") snakeX += unit;
    if (d == "UP") snakeY -= unit;
    if (d == "DOWN") snakeY += unit;

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);

    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x > cvs.width) {
            snake[i].x = 0;
        } else if (snake[i].x < 0) {
            snake[i].x = cvs.width - unit
        } else if (snake[i].y > cvs.height) {
            snake[i].y = 0;
        } else if (snake[i].y < 0) {
            snake[i].y = cvs.height - unit;
        }
    }

    ////.............................///
    let dleft = dright = ddown = dup = false;
    for (let i = 2; i < snake.length; i++) {
        let xx = snake[0].x;
        let yy = snake[0].y;
        let xxx = snake[i].x;
        let yyy = snake[i].y;
        if (xx + 1 == xxx) dright = true;
        else dright = false;
        if (xx - 1 == xxx) dleft = true;
        else dleft = false;
        if (yy - 1 == yyy) dup = true;
        else dup = false;
        if (yy + 1 == yyy) ddown = true;
        else ddown = false;
    }
    // console.log(dup);
    if (aiIsOn) {
        if (snake[0].y < food.y) {
            if (snake[0].y - food.y < cvs.height / 2 || food.y - snake[0].y < cvs.height / 2) {
                d = "DOWN";
            } else {
                d = "UP";
            }
        }

        if (snake[0].y > food.y) {
            if (snake[0].y - food.y < cvs.height / 2 || food.y - snake[0].y < cvs.height / 2) {
                d = "UP";
            } else {
                d = "DOWN";
            }
        }


        if (snake[0].x < food.x) {
            if (snake[0].x - food.x < cvs.width / 2 || food.x - snake[0].x < cvs.width / 2) {
                d = "RIGHT"
            } else {
                d = "LEFT"
            }
        }

        if (snake[0].x > food.x) {
            d = "LEFT"
        }

        if (snake[0].x > food.x && snake[0].y < food.y) {


            if (snake[0].x - food.x >= food.y - snake[0].y) {
                d = "LEFT";
            } else {
                d = "DOWN";
            }
        }

        // 2nd  Quadrant
        if (snake[0].x < food.x && snake[0].y < food.y) {
            if (food.x - snake[0].x >= food.y - snake[0].y) {
                d = "RIGHT";
            } else {
                d = "DOWN";
            }
        }

        // 3rd  Quadrant
        if (snake[0].x < food.x && snake[0].y > food.y) {
            if (food.x - snake[0].x >= snake[0].y - food.y) {
                d = "RIGHT";
            } else {
                d = "UP";
            }
        }

        // 4th  Quadrant
        if (snake[0].x > food.x && snake[0].y > food.y) {
            if (snake[0].x - food.x >= snake[0].y - food.y) {
                d = "LEFT";
            } else {
                d = "UP";
            }
        }
    }
    /////////'''''''''''''''''''''''''''''''///////////////	
    /*
    	if (snake[0].x < 0 || snake[0].x + unit > cvs.width || snake[0].y < 0 || snake[0].y + unit > cvs.height || checkCollisionWithItself()) {
    		gameover.play();
    		if (score <= 10) {alert("Game Over, Your score was: " + score + ". You can do it better!!!");} else if (score > 10) {alert("Game Over, Your score was: " + score + ". Thats a decent score, but still you can do it better!!!");} 
    		clearInterval(game);
    	}
    */


    /////////////////,.............///////
    /*checkCollision();*/
    //moveSnake();
    //update();
}



let game = setInterval(draw, 1000 / FPS);


/*
function update() {
	
}*/

//keep the snake moving

/*
function moveSnake() {
	snake.x += unit;
}
*/