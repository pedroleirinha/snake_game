$(function () {
    //Canvas Variables
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");

    //Game Variables
    var gamePaused = false;

    var newSnake = new Snake();
    let snakeFood = new Food();
    let snakeColor = "#ffffff";

    var fps = 30;

    //Score Variables
    let score = 0;

    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 32:
                gamePaused = gamePaused ? false : true;
                break;
            case 37:
                newSnake.direction = newSnake.direction != "right" ? "left" : newSnake.direction;
                break;
            case 38:
                newSnake.direction = newSnake.direction != "down" ? "up" : newSnake.direction;
                break;
            case 39:
                newSnake.direction = newSnake.direction != "left" ? "right" : newSnake.direction;
                break;
            case 40:
                newSnake.direction = newSnake.direction != "up" ? "down" : newSnake.direction;
                break;
        }
    });

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function drawScoreText() {
        ctx.font = "32px Century Gothic";
        ctx.fillStyle = snakeColor;
        ctx.fillText("Score: " + score, 8, 30);
    }

    function drawInfoText() {
        ctx.font = "32px Century Gothic";
        ctx.fillStyle = snakeColor;
        ctx.fillText("Size: " + parseInt(newSnake.size), window.innerWidth - 115, 30);
        ctx.fillText("Speed: " + fps, window.innerWidth - 160, 70);
    }

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        $("canvas").css({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    function draw() {
        if (!gamePaused) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            collisionDetection();
            drawFood();
            drawSnake();
            drawScoreText();
            drawInfoText();
        }
        setTimeout(function () {
            requestAnimationFrame(draw);
        }, 1000 / fps);
    }

    function checkForFood() {
        let snakeHead = newSnake.getFirstPiece();

        if (snakeHead.checkCollisionWith(snakeFood)) {
            snakeFood = new Food();
            newSnake.addHead();
            snakeColor = getRandomColor();
            increaseScore();
            increaseSnakeSpeed();
        }
    }

    function checkWallCollision() {
        //Portal Snake, passes to the wall on the opposite side
        for (const tile of newSnake.body) {
            tile.checkWallCollision();
        }
    }

    function updateSnakeMovement() {
        for (const tile of newSnake.body) {
            tile.updateCords();
        }
    }

    function increaseScore() {
        score += Math.round(newSnake.size * 0.20 + fps * 0.20);
    }

    function increaseSnakeSpeed() {
        fps += 0.5;
    }

    function collisionDetection() {
        checkWallCollision();
        checkForFood();
        checkSnakeBodyCollision();
    }

    function checkSnakeBodyCollision() {
        let snakeHead = newSnake.getFirstPiece();

        for (let i = 2; i < newSnake.body.length; i++) {
            const tile = newSnake.body[i];
            if (snakeHead.checkCollisionWith(tile)) {
                //Game Over
                gamePaused = true;
                alert("Game Over");
                document.location.reload();
            }
        }
    }

    function drawSnake() {

        newSnake.addHead();
        newSnake.deleteTail();
        for (const tile of newSnake.body) {
            ctx.beginPath();
            ctx.rect(tile.locationX, tile.locationY, tileSize, tileSize);
            ctx.fillStyle = snakeColor;
            ctx.fill();
            ctx.closePath();
        }
    }

    function drawFood() {
        ctx.beginPath();
        ctx.rect(snakeFood.locationX, snakeFood.locationY, tileSize, tileSize);
        ctx.fillStyle = "#6666FF";
        ctx.fill();
        ctx.closePath();
    }

    initCanvas();

    draw();


});