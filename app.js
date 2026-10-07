const EMOJIS = ['🍎', '🍌', '🍇', '🍓', '🍒'];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let gameStarted = false;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const pairsEl = document.getElementById('pairs');
const restartBtn = document.getElementById('restartBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const winMessage = document.getElementById('winMessage');
const finalMoves = document.getElementById('finalMoves');
const finalTime = document.getElementById('finalTime');

function initGame() {
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    gameStarted = false;
    lockBoard = false;

    clearInterval(timer);
    timer = null;

    movesEl.textContent = '0';
    timerEl.textContent = '00:00';
    pairsEl.textContent = `0 / ${EMOJIS.length}`;
    winMessage.classList.remove('show');

    const deck = [...EMOJIS, ...EMOJIS];
    shuffle(deck);

    gameBoard.innerHTML = '';
    gameBoard.classList.remove('revealed');
    gameBoard.style.backgroundImage = "url('Lara.jpg')";

    deck.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">${emoji}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
}

function flipCard(card) {
    if (lockBoard) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;

    // Start igre na prvi klik
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesEl.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.emoji === card2.dataset.emoji;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsEl.textContent = `${matchedPairs} / ${EMOJIS.length}`;
        flippedCards = [];

        // Nakon kratke pauze karte nestaju i otkrivaju sliku ispod
        setTimeout(() => {
            card1.classList.add('gone');
            card2.classList.add('gone');
        }, 600);

        if (matchedPairs === EMOJIS.length) {
            endGame();
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

function endGame() {
    clearInterval(timer);
    timer = null;
    setTimeout(() => {
        gameBoard.classList.add('revealed');
        finalMoves.textContent = moves;
        finalTime.textContent = timerEl.textContent;
        winMessage.classList.add('show');
    }, 1200);
}

restartBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

initGame();