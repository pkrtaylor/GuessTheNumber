# GuessTheNumber
---
Guess My Number is a small game created utilizing react native. This game has three screens, the StartGameScreen, GameScreen, and the GameOver Screen. These screens are 
handled using condtional rendering, based on state. 
On the start of the app, the StartGameScreen reamins until the player picks a number.
Once the state of userNumber changes, the player enters the GameScreen. Once the correct number is guessed, the GameOver state is goes into affect. 
Once the game is in affect, the player can press either a + or - button. If the computer should guess higher then clikc the + and if lower, the - is pressed. 
On each guess the min or max boundary closes depending on the guess. 
If the next guess should be higher, then that current guess becomes the minimum boundary and if the next guess should be lower the current guess becomes the new max 
boundary
