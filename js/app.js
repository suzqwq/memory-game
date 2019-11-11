/*
 * Create a list that holds all of your cards
 */
//global variables
let allcards = document.querySelectorAll('.card');
const deck = document.getElementsByClassName('deck');
const twoClicks = [];
let cardholderNodelist = document.querySelectorAll('.card');
const restartbuttonquery = document.querySelector('.restart');
let activecount = 16;
const stars = document.querySelector('.stars').querySelectorAll('li');
let incr = 0;
const timerLocation = document.querySelector('.score-panel');
const timer = document.createElement('div');
let seconds = 0;
//restart
restartbuttonquery.addEventListener('click', function(e) {
  location.reload();
});
//timerfunction
function timerFun() {
  timer.innerHTML = 'Timer: ' + seconds + ' seconds';
  seconds++;
  setTimeout(timerFun, 1000);
}
//clear timer function
function clearTimer() {
  seconds = 0;
  clearTimeout(timerFun, 1000);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
//end shuffle function
//increment function
function incrementMoves() {
  incr += 1;
  return incr;
}
//end increment function
//calls gameplay when page loads
document.body.onload = gameplay();
//play again button after winning
const buttonRes = document.createElement('button');
buttonRes.innerHTML = "Play again";
buttonRes.setAttribute('style', 'background-color: #2e3d49; width:20%; color: white; height:150px; font-size:2em; margin-bottom:2em; margin-top:2em; text-align:center;');
buttonRes.onclick = function() {
  location.reload();
};
//cardsPrep function
function cardsPrep() {
  allcards = shuffle(allcards);
  document.querySelector('.moves').innerHTML = incr;
  timerFun();
  timerLocation.appendChild(timer);
  // remove all classes from all cards
  allcards.forEach(function(card) {
    card.classList.remove('match', 'show', 'open');
  });
  const cardholderArray = Array.prototype.slice.call(cardholderNodelist);
  shuffle(cardholderArray);
  for (let card of allcards) {
    card.parentNode.removeChild(card);
  };
  allcards = [];
  for (let card of cardholderArray) {
    allcards.push(card);
  }
}
//winning function
function winning() {
  clearTimer();
  console.log('won');
  document.querySelector('.container').innerHTML = '<div class="winning"><h1>you won</h1><br>' + '<p>Your total moves:' + incr + '</p>' + stars[0].innerHTML + stars[1].innerHTML + stars[2].innerHTML + '<p>Total time: ' + timer.innerHTML + ' </p>' + '</div>';
  document.querySelector('.container').appendChild(buttonRes);
}
//gameplay function
function gameplay() {
  cardsPrep();
  //move the il's to the dom
  for (let card of allcards) {
    document.querySelector('.deck').appendChild(card);
  }
  document.querySelector('.deck').innerHTML;
  allcards.forEach(function(card) {
    card.addEventListener('click', function(r) {
      //check if the card is already open
      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
        twoClicks.push(card);
        if (twoClicks.length < 3) {
          card.classList.add('open', 'show');
        }
        if (twoClicks.length === 2) {
          if (incr == 12) {
            const firstStar = stars[0].getElementsByTagName('i');
            firstStar[0].classList.remove('fa');
            firstStar[0].classList.add('far');
          }
          if (incr == 20) {
            const secondStar = stars[1].getElementsByTagName('i');
            secondStar[0].classList.remove('fa');
            secondStar[0].classList.add('far');
          }
          //when the twoclicks array is full, check if the tiles match
          const fullclicks = [];
          twoClicks.forEach(function(card) {
            fullclicks.push(card.innerHTML);
          });
          //if 2 open cards match
          if (fullclicks[0] == fullclicks[1]) {
            activecount -= 2;
            console.log('matched');
            for (const card of twoClicks) {
              card.classList.add('match');
            };
            twoClicks.length = 0;
          } else {
            for (const card of twoClicks) {
              setTimeout(function() {
                card.classList.remove('open', 'show')
              }, 1000);
            };
            twoClicks.length = 0;
          }
          incrementMoves();
          document.querySelector('.moves').innerHTML = incr;
        }
      }
      //all tiles are open and match
      if (activecount == 0) {
        winning();
      }
    });
  });
}