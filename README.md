# Memory game

The game features **three difficulty levels**:
* Leel 1: 5 pairs (10 cards total)
* Level 2: 8 pairs (16 cards total)
* Level 3: 12 pairs (24 cards total)

To start, the player selects a difficulty level. A grid of face-down cards is then generated, containing randomly shuffled pairs of meme images. Beneath the card grid lies a hidden background image - dog.jpeg.

***The game timer*** starts when the player clicks their first card.
The player flips two cards per turn:

**Match**: If the two cards match, they disappear from the board, revealing the corresponding section of the underlying background image (dog.jpeg).

**Mismatch**: If the cards do not match, they flip back face-down after a brief delay (or when the player clicks the next card).

**Timer & End Conditions**-The UI displays both the elapsed time and the maximum allowed time limit.

**Win Condition**-If the player matches all pairs and reveals the complete image before time runs out, a "Winner" message appears, accompanied by victory music and confetti.

**Lose Condition**-If time expires before all pairs are matched, the game ends immediately with a "Game Over" message.
A persistent **Reset button** allows the player to restart the match or change the difficulty level at any time.
Size of board  is 5x2, 4x4 or 4x6.

Pseudocode

To start game it's needed to select level after that see board. For level selection is variable **level**.

Depending on the level selection, a board is created with double the number of fields under which pictures and their duplicates are randomly selected and arranged. For board is variable **board**

Pictures are turned down, i.e. they are not visible.
The player starts the game time by click on a card.
The player need to open two each cards.
If the pictures are the same, it is a hit and those two cards disappear. That check function **checkCards**.
Under the board is the image dog.jpeg.
When two pictures are hit and disappear from the board, the corresponding part of the picture that was under those cards is displayed.
If the pictures are not the same, as soon as we move the mouse or move to the next card, the previous cards are turned down and the pictures are not visible.
The player wins if he finds every two identical cards in less than the set time and thus opens the entire picture on the board below the card.That check function **isWin**.

The pictures will be memes.

The screen shows the elapsed time and the maximum time the game is set to last. Variable **timeElapsed** and **timeLimit**.

If the player fails to reveal all the duplicates and see the entire picture of the dog within the allotted time, the game is interrupted and a message is displayed that he has lost. That check function **isLost**.

If he reveals the entire picture of the dog before the allotted time, the Winner is displayed, and music & confetti indicate victory.
Throughout the game, the player sees a reset button that allows them to start the game over and change the game level. That than function ***resetGame***.