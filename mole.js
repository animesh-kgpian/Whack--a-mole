let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLimit = 60; // Time limit in seconds
let minimumScore = 250; // Minimum score required to win
let timerInterval;

window.onload = function() {
    document.getElementById("startButton").addEventListener("click", startGame);
}

function startGame() {
    setGame();

    startTimer(); // Start the timer
    setInterval(setMole, 600);
    setInterval(setPlant, 700);
    document.getElementById("startButton").disabled = true;
}

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    //setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
    //setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPlant
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);   //represents the current tile where the mole will appear.
    currMoleTile.appendChild(mole);                //appends the mole image element as a child to the currMoleTile, 
                                                   //placing the mole image on the game board.
    
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {      //checks if the clicked tile is the same as the currMoleTile, indicating that the player clicked on the tile with the mole.
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html

        if (score >= minimumScore) {
            document.getElementById("score").innerText = "YOU WIN: " + score.toString();
            clearInterval(timerInterval);
            gameOver = true;
        }
    }
    else if (this == currPlantTile) {    //If the clicked tile is the same as the currPlantTile, indicating that the player clicked on the tile with the plant.
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        clearInterval(timerInterval);
        gameOver = true;
    }
}

function startTimer() {
    let timerDisplay = document.getElementById("timer");

    let remainingTime = timeLimit;
    timerDisplay.innerText = remainingTime.toString();

    timerInterval = setInterval(function() {
        remainingTime--;
        timerDisplay.innerText = "Time Remaining: " + remainingTime.toString();

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            if (score >= minimumScore) {
                document.getElementById("score").innerText = "YOU WIN: " + score.toString();
            } else {
                document.getElementById("score").innerText = "GAME OVER: " + score.toString();
            }
            gameOver = true;
        }
    }, 1000);
}