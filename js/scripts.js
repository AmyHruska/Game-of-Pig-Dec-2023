// function Game(score, gamesWon, turnTotal, activePlayer, playing) {
//     this.score = score;
//     this.gamesWon = gamesWon
//     this.turnTotal = turnTotal;
//     this.activePlayer = activePlayer;
//     this.playing = playing;
// }

function Game(score, turnTotal, activePlayer) {
    this.score = score;
    this.turnTotal = turnTotal;
    this.activePlayer = activePlayer;
}

Game.prototype.turnSwap = function () {
    this.turnTotal = 0;
    this.activePlayer = this.activePlayer === 0 ? 1 : 0;
};

Game.prototype.rollDice = function () {
    const roll = Math.trunc(Math.random() * 6) + 1;
    if (roll === 1) {
        this.turnSwap();
    } else {
        this.turnTotal += roll;
    }
    return roll;
};

Game.prototype.hold = function () {
    this.score[this.activePlayer] += this.turnTotal;
    this.gameWinCheck();
    this.turnSwap();
};

Game.prototype.gameWinCheck = function () {
    if (this.score[this.activePlayer] >= 100) {
    winButtonDisable();
    }
};

// UI logic
let players = new Game([0,0],0,0);

const diceEl = document.getElementById('diceImage');
const btnNew = document.getElementById('newGameButton');
const btnRoll = document.getElementById('rollButton');
const btnHold = document.getElementById('holdButton');

// UI function:
const winButtonDisable =  function(){
    btnRoll.disabled = true;
    btnHold.disabled = true;
}

// const newGameReset = function() {
//     players = ([0,0],0,0);
// }

// Event listeners for new game, roll, and hold buttons
btnNew.addEventListener('click', function () {
    btnRoll.disabled = false;
    btnHold.disabled = false;
    // newGameReset();
});

btnRoll.addEventListener('click', function () {
    players.rollDice();
    let activePlayer = players.activePlayer
    if (activePlayer === 0) {
    document.getElementById('current--0').innerText = players.turnTotal;
    } else {
    document.getElementById('current--1').innerText = players.turnTotal;
    }
});

btnHold.addEventListener('click', function () {
    players.hold();
    document.getElementById('current--0').innerText = 0;
    document.getElementById('current--1').innerText = 0;
    document.getElementById('total--0').innerText = players.score[0];
    document.getElementById('total--1').innerText = players.score[1];
});