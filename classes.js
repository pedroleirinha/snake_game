var snakeStartSize = 10;
var tileSize = 20;
var tilePadding = 0;

var validDirection = ["left", "right", "up", "down"];

var startX = screen.width / 2 - tileSize * snakeStartSize;
var startY = screen.height / 2 - tileSize;

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}

class Snake {
    constructor() {
        this.direction = "left";
        this.size = snakeStartSize;
        this.body = [];
        this.generateBody();
    }
    generateBody() {
        for (let i = 0; i < this.size; i++) {

            let newTile = null;
            let lastPiece = this.getLastPiece();
            if (lastPiece == undefined) {
                newTile = new Tile(startX, startY);
            } else {
                newTile = new Tile(lastPiece.locationX + tileSize + tilePadding, lastPiece.locationY);
            }
            this.body.push(newTile);
        }
    }

    getLastPiece() {
        return this.body[this.body.length - 1];
    }

    getFirstPiece() {
        return this.body[0];
    }

    addHead() {
        let newTile;

        switch (this.direction) {
            case "up":
                newTile = new Tile(this.getFirstPiece().locationX, this.getFirstPiece().locationY - tileSize - tilePadding);
                break;
            case "down":
                newTile = new Tile(this.getFirstPiece().locationX, this.getFirstPiece().locationY + tileSize + tilePadding);
                break;
            case "left":
                newTile = new Tile(this.getFirstPiece().locationX - tileSize - tilePadding, this.getFirstPiece().locationY);
                break;
            case "right":
                newTile = new Tile(this.getFirstPiece().locationX + tileSize + tilePadding, this.getFirstPiece().locationY);
                break;
        }
        this.size++;
        this.body.splice(0, 0, newTile);
    }

    deleteTail() {
        this.size--;
        this.body.splice(this.body.length - 1, 1);
    }
}

class Tile {
    constructor(x, y) {
        this.direction = "left";
        this.locationX = x;
        this.locationY = y;
    }

    checkWallCollision() {
        if (this.locationX <= 0) {
            this.locationX += window.innerWidth;
        } else if (this.locationX >= window.innerWidth) {
            this.locationX -= window.innerWidth;
        } else if (this.locationY <= 0) {
            this.locationY += window.innerHeight;
        } else if (this.locationY >= window.innerHeight) {
            this.locationY -= window.innerHeight;
        }
    }

    checkCollisionWith(object) {
        if (this.locationX < object.locationX + tileSize &&
            this.locationX + tileSize > object.locationX &&
            this.locationY < object.locationY + tileSize &&
            tileSize + this.locationY > object.locationY) {
            // collision detected!
            return true;
        }
        return false;
    }
}


class Food {
    constructor() {
        this.generateRandomPosition();
    }

    generateRandomPosition() {
        this.locationX = randomNumberBetween(0, window.innerWidth - tileSize);
        this.locationY = randomNumberBetween(0, window.innerHeight - tileSize);
    }
}