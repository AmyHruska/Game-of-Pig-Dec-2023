// function Game(score, gamesWon, turnTotal, activePlayer, playing) {
//     this.score = score;
//     this.gamesWon = gamesWon
//     this.turnTotal = turnTotal;
//     this.activePlayer = activePlayer;
//     this.playing = playing;
// }

function Game(score, turnTotal, activePlayer, playing) {
    this.score = score;
    this.turnTotal = turnTotal;
    this.activePlayer = activePlayer;
    this.playing = playing;
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
    this.playing = false;
    }
};

// UI logic
let players = new Game([0,0],0,0,false);
// Event listeners for roll and hold buttons

// const diceEl = document.querySelector('.dice');
// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');

const diceEl = document.getElementById('diceImage');
const btnNew = document.getElementById('newGameButton');
const btnRoll = document.getElementById('rollButton');
const btnHold = document.getElementById('holdButton');

btnNew.addEventListener('click', function () {
    console.log('kittens.')
});

btnRoll.addEventListener('click', function () {
    console.log('cats!')
});

btnHold.addEventListener('click', function () {
    console.log('kittens!')
});