# Memory Game Project

## Table of Contents

* game flow
*notes about the code


##game flow
The .js file was the only file being modified.
The program shuffles a deck of cards (allcards) via shuffle function
Then starts a timer.
while the gameplay goes, the number of stars is being updated based on the user performance using 'stars' variable.
incrementMoves() increments the counter with one every time the user clicks on two tiles, and returns the increment value.
When all tiles are open and match a congratulating message appears with the number of stars, number of moves and total time spent.
Play again button refreshes the page, reinitiate all the variables and reshuffle the deck.
Restart button resets all variables and reshuffle the cards.

##notes about the code
The code has two event listeners, one for the restart button, and one for tile clicks.
Elements created dynamically using javascript assigned attributes using setAttribute ex. to style the element.
setTimeout() is used to start the timer.
clearTimeout() is used to stop the timer.