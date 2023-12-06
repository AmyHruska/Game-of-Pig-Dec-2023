// function Game(score, gamesWon, turnTotal, activePlayer, playing) {
//     this.score = score;
//     this.gamesWon = gamesWon
//     this.turnTotal = turnTotal;
//     this.activePlayer = activePlayer;
// }

function Game(score, turnTotal, activePlayer, roll) {
    this.score = score;
    this.turnTotal = turnTotal;
    this.activePlayer = activePlayer;
    this.roll = roll;
}

Game.prototype.turnSwap = function () {
    this.turnTotal = 0;
    this.activePlayer = this.activePlayer === 0 ? 1 : 0;
};

Game.prototype.rollDice = function () {
    this.roll = Math.trunc(Math.random() * 6) + 1;
    if (this.roll === 1) {
        this.turnSwap();
    } else {
        this.turnTotal += this.roll;
    }
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
let players = new Game([0,0],0,0,0);

const diceImg = document.getElementById('diceImage');
const btnNew = document.getElementById('newGameButton');
const btnRoll = document.getElementById('rollButton');
const btnHold = document.getElementById('holdButton');

// UI function:
const winButtonDisable =  function() {
    btnRoll.disabled = true;
    btnHold.disabled = true;
}

const scoreUpdate = function() {
    let activePlayer = players.activePlayer
    if (activePlayer === 0) {
    document.getElementById('current--0').innerText = players.turnTotal;
    } else {
    document.getElementById('current--1').innerText = players.turnTotal;
    }
}

const activePlayerUpdate = function () {
    let activePlayer = players.activePlayer
    if (activePlayer === 0) {
        document.getElementById('current--0').innerText = players.turnTotal;
        document.getElementById('p1Header').classList.add('active');
        document.getElementById('p2Header').classList.remove('active');
        } else {
        document.getElementById('current--1').innerText = players.turnTotal;
        document.getElementById('p2Header').classList.add('active');
        document.getElementById('p1Header').classList.remove('active');
        }
};

// Event listeners for new game, roll, and hold buttons
btnNew.addEventListener('click', function () {
    btnRoll.disabled = false;
    btnHold.disabled = true;
    players.score = [0,0];
    scoreUpdate();
    activePlayerUpdate();
});

btnRoll.addEventListener('click', function () {
    players.rollDice();
    scoreUpdate();
    activePlayerUpdate();
    const imgDiceResult = players.roll;
    diceImg.src = `images/dice-${imgDiceResult}.png`;
    let turnCheck = players.turnTotal;
    if (turnCheck === 0) {
        btnHold.disabled = true;
    } else {
        btnHold.disabled = false;
    }
});

btnHold.addEventListener('click', function () {
    players.hold();
    btnHold.disabled = true;
    scoreUpdate();
    activePlayerUpdate();    
});