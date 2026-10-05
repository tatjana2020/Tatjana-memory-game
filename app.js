/*-------------------------------- Constants --------------------------------*/
const LEVEL_CON = {
  1: { rows: 2, cols: 5, pairs: 5, timeLimit: 120 },
  2: { rows: 4, cols: 4, pairs: 8, timeLimit: 160 },
  3: { rows: 4, cols: 6, pairs: 12, timeLimit: 190 }
};

const BACKGROUND_IMAGE_URL = 'dog.jpeg';

const MEME_IMAGES = [
  'meme1.png', 'meme2.png', 'meme3.png', 'meme4.png',
  'meme5.png', 'meme6.png', 'meme7.png', 'meme8.png',
  'meme9.png', 'meme10.png', 'meme11.png', 'meme12.png'
];

/*---------------------------- Variables (state) ----------------------------*/
 
let board;
let level = null;                 // Trenutno izabrani nivo (1, 2 ili 3)
let gameState = 'SELECTION';      // Stanje igre: 'SELECTION', 'PLAYING', 'WON', 'LOST'
let timeLimit = 0;                // Maksimalno vrijeme za izabrani nivo
let elapsedTime = 0;             // Proteklo vrijeme u sekundama
let isTimerRunning = false;       // Da li tajmer trenutno odbrojava
let timerInterval = null;         // Reference na setInterval za tajmer


/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/
function checkCards(){

};
function isWin(){
    
}
function isLost(){
    
}
function resetGame(){
    
}

/*----------------------------- Event Listeners -----------------------------*/



