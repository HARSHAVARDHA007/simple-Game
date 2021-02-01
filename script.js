'use strict';
//selecting the score elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currScore0 = document.querySelector('#current--0');
const currScore1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const rolldice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//useful declecrations
let finalScores = [0, 0];
let activePlayer = 0;
let currScore = 0;

//starting conditions
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

//rolling dice
rolldice.addEventListener('click', function () {
  let rollen = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  if (
    rollen !== 1 &&
    !(
      player0.classList.contains('player--winner') ||
      player1.classList.contains('player--winner')
    )
  ) {
    dice.src = `dice-${rollen}.png`;
    currScore += rollen;
    document.querySelector(`#current--${activePlayer}`).textContent = currScore;
  } else if (
    !(
      player0.classList.contains('player--winner') ||
      player1.classList.contains('player--winner')
    )
  ) {
    dice.src = `dice-${rollen}.png`;
    currScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

//holding the score
hold.addEventListener('click', function () {
  finalScores[activePlayer] += currScore;
  currScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = currScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    finalScores[activePlayer];
  if (finalScores[activePlayer] >= 100) {
    dice.classList.add('hidden');
    const player = document.querySelector(`.player--${activePlayer}`);
    player.classList.add('player--winner');
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});
newGame.addEventListener('click', function () {
  score0.textContent = 0;
  score1.textContent = 0;
  finalScores[0] = 0;
  finalScores[1] = 0;
  if (player0.classList.contains('player--winner')) {
    player0.classList.remove('player--winner');
  }
  if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner');
  }
});
