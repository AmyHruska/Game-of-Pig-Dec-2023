// Business Logic

// Defines Game space constructor with keys (using Object Models)
function Game(score, turnTotal, activePlayer, roll) {
    this.score = score;
    this.turnTotal = turnTotal;
    this.activePlayer = activePlayer;
    this.roll = roll;
}

// Sets Turn Total to 0 and swaps active player
Game.prototype.turnSwap = function () {
    this.turnTotal = 0;
    this.activePlayer = this.activePlayer === 0 ? 1 : 0;
};

// Uses Math method to generate d6 num, on 1 runs turnSwap
Game.prototype.rollDice = function () {
    this.roll = Math.trunc(Math.random() * 6) + 1;
    if (this.roll === 1) {
        this.turnSwap();
        scoreBlank();
    } else {
        this.turnTotal += this.roll;
    }
};

// Locks in turnTotal as new score, checks for win status (>=100), runs turnSwap
Game.prototype.hold = function () {
    this.score[this.activePlayer] += this.turnTotal;
    this.gameWinCheck();
    totalScoreUpdate();
    this.turnSwap();
};


// Checks if score >=100 if yes then disables buttons
Game.prototype.gameWinCheck = function () {
    if (this.score[this.activePlayer] >= 100) {
        winButtonDisable();
    }
};

// UI logic

// Game Constructor holds both player's scores, turnTotal, activePlayer binary and finally current roll total
let players = new Game([0, 0], 0, 0, 0);

// Interactive UI Elements (dice changes and button variables)
const diceImg = document.getElementById('diceImage');
const btnNew = document.getElementById('newGameButton');
const btnRoll = document.getElementById('rollButton');
const btnHold = document.getElementById('holdButton');

// UI elements for showing active player
let p1ActiveBG = document.getElementById('p1Header');
let p2ActiveBG = document.getElementById('p2Header');

// UI elements for tracking game scores
let p1Current = document.getElementById('current--0');
let p1Total = document.getElementById('total--0');
let p2Current = document.getElementById('current--1');
let p2Total = document.getElementById('total--1');

// UI function:
const winButtonDisable = function () {
    btnRoll.disabled = true;
    btnHold.disabled = true;
}

// Takes current activePlayer and updates score with turnTotal
const currentScoreUpdate = function () {
    let activePlayer = players.activePlayer
    if (activePlayer === 0) {
        p1Current.innerText = players.turnTotal;
    } else if (activePlayer === 1) {
        p2Current.innerText = players.turnTotal;
    };
};

// Takes current turnTotal and adds it to score
const totalScoreUpdate = function () {
    let activePlayer = players.activePlayer
    if (activePlayer === 0) {
        p1Total.innerText = players.score[0];
    } else if (activePlayer === 1) {
        p2Total.innerText = players.score[1];
    };
};

// Sets current player scores to 0
const scoreBlank = function () {
    p1Current.innerText = "0";
    p2Current.innerText = "0";
}

// swaps current activePlayer
const activePlayerUpdate = function () {
    let activePlayer = players.activePlayer
    if (activePlayer === 0) {
        p1ActiveBG.classList.add("active");
        p2ActiveBG.classList.remove("active");
    } else if (activePlayer === 1) {
        p2ActiveBG.classList.add("active");
        p1ActiveBG.classList.remove("active");
    };
};

// Event listeners for new game, roll, and hold buttons
btnNew.addEventListener('click', function () {
    btnRoll.disabled = false;
    btnHold.disabled = true;
    players.score = [0, 0];
    activePlayerUpdate();
    p1Total.innerText = "0";
    p2Total.innerText = "0";
});

btnRoll.addEventListener('click', function () {
    players.rollDice();
    const imgDiceResult = players.roll;
    diceImg.src = `images/dice-${imgDiceResult}.png`;
    let turnCheck = players.turnTotal;
    if (turnCheck === 0) {
        btnHold.disabled = true;
    } else {
        btnHold.disabled = false;
    }
    currentScoreUpdate();
    activePlayerUpdate();
});

btnHold.addEventListener('click', function () {
    players.hold();
    btnHold.disabled = true;
    scoreBlank();
    activePlayerUpdate();
});
