const LEVELS = {
    1: { pairs: 5,  cols: 5, colsMobile: 5, preview: 1000 },  
    2: { pairs: 8,  cols: 4, colsMobile: 4, preview: 2000 },  
    3: { pairs: 12, cols: 6, colsMobile: 4, preview: 3000 }   
};
 
const RESERVED_HEIGHT = 330;
 
const mobileQuery = window.matchMedia('(max-width: 600px)');
 
let currentLevel = 1;
let totalPairs = 0;
 
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let gameStarted = false;
let lockBoard = false;
let previewTimeout = null;
 
const gameBoard = document.getElementById('gameBoard');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const pairsEl = document.getElementById('pairs');
const restartBtn = document.getElementById('restartBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const winMessage = document.getElementById('winMessage');
const finalMoves = document.getElementById('finalMoves');
const finalTime = document.getElementById('finalTime');
const messageEl = document.getElementById('message');
const levelBtns = document.querySelectorAll('.level-btn');
let messageTimeout = null;
 
function initGame() {
    const level = LEVELS[currentLevel];
 
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    gameStarted = false;
    lockBoard = false;
 
    clearInterval(timer);
    timer = null;
 
    const chosen = shuffle([...MEME_slike]).slice(0, level.pairs);
    totalPairs = chosen.length;
 
    movesEl.textContent = '0';
    timerEl.textContent = '00:00';
    pairsEl.textContent = `0 / ${totalPairs}`;
    winMessage.classList.remove('show');
    clearTimeout(messageTimeout);
    messageEl.className = 'message';
 
    gameBoard.style.gap = '';
 
    const deck = shuffle([...chosen, ...chosen]);
 
    gameBoard.innerHTML = '';
 
    deck.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = item.id;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">${renderFace(item.src)}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
        cards.push(card);
    });
 
    applyLayout();
    showPreview();
    updateLevelButtons();
}
 
function renderFace(src) {
    if (/\.(png|jpe?g|gif|webp|svg)$/i.test(src)) {
        return `<img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover;">`;
    }
    return src;
}
 
function applyLayout() {
    const level = LEVELS[currentLevel];
    const cols = mobileQuery.matches ? level.colsMobile : level.cols;
 
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
 
    const rows = Math.ceil(cards.length / cols);
    gameBoard.style.width = `max(240px, min(100%, calc((100vh - ${RESERVED_HEIGHT}px) * ${cols} / ${rows})))`;
    gameBoard.style.marginInline = 'auto';
 
    sliceImage(cols);
}
 
function sliceImage(cols) {
    const rows = Math.ceil(cards.length / cols);
 
    cards.forEach((card, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = cols > 1 ? (col / (cols - 1)) * 100 : 0;
        const y = rows > 1 ? (row / (rows - 1)) * 100 : 0;
 
        card.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
        card.style.backgroundPosition = `${x}% ${y}%`;
    });
}
 
function showPreview() {
    clearTimeout(previewTimeout);
    lockBoard = true; 
 
    cards.forEach(card => card.classList.add('flipped'));
 
    previewTimeout = setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
        lockBoard = false;
    }, LEVELS[currentLevel].preview);
}
 
function updateLevelButtons() {
    levelBtns.forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.level) === currentLevel);
    });
}
 
function showMessage(text, type) {
    clearTimeout(messageTimeout);
    messageEl.textContent = text;
    messageEl.className = `message show ${type}`;
 
    messageTimeout = setTimeout(() => {
        messageEl.className = 'message';
    }, 1500);
}
 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    const isMatch = card1.dataset.id === card2.dataset.id;
 
    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsEl.textContent = `${matchedPairs} / ${totalPairs}`;
        flippedCards = [];
        showMessage('Good choice! ✅', 'success');
 
        setTimeout(() => {
            revealSlice(card1);
            revealSlice(card2);
        }, 600);
 
        if (matchedPairs === totalPairs) {
            endGame();
        }
    } else {
        lockBoard = true;
        showMessage('Card do not match. Choose again.', 'error');
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}
 
function revealSlice(card) {
    card.style.transition = 'none';
    card.style.transform = 'none';
    card.style.opacity = '1';
    card.style.pointerEvents = 'none';
    card.style.border = 'none';
    card.style.boxShadow = 'none';
    card.style.backgroundColor = 'transparent';
    card.style.backgroundImage = "url('Lara.jpg')";
    card.style.backgroundRepeat = 'no-repeat';
 
    card.querySelectorAll('.card-face').forEach(face => {
        face.style.visibility = 'hidden';
    });
}
 
function endGame() {
    clearInterval(timer);
    timer = null;
    setTimeout(() => {
        gameBoard.style.gap = '0';
        cards.forEach(card => (card.style.borderRadius = '0'));
        finalMoves.textContent = moves;
        finalTime.textContent = timerEl.textContent;
        winMessage.classList.add('show');
    }, 1200);
}
 
levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentLevel = Number(btn.dataset.level);
        initGame();
    });
});
 
mobileQuery.addEventListener('change', applyLayout);
 
restartBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);
 
initGame();