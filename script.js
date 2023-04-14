"use strict";

const dice = document.querySelector(".image");
const P1Score = document.querySelector(".player-score-1");
const P2Score = document.querySelector(".player-score-2");
let scores = [0, 0];
const P1CurrScore = document.querySelector(".curr-score-player-1");
const P2CurrScore = document.querySelector(".curr-score-player-2");
const btnRoll = document.querySelector(".roll");
const mobileCurrScore = document.querySelector(".curr-score");
const btnRestart = document.querySelector(".restart");
const btnHold = document.querySelector(".hold-score");
const activePlayer = document.querySelector(".active-player");
const playerOne = document.querySelector(".player-1");
const playerTwo = document.querySelector(".player-2");
let playing = true;
let currentScore = 0;
let randomRoll;

// Set the default values for all the elements
function restartElements() {
  currentScore = 0;
  playing = true;
  scores = [0, 0];
  mobileCurrScore.textContent = 0;
  dice.classList.add("hidden");
  P1Score.textContent = scores[0];
  P2Score.textContent = scores[1];
  P1CurrScore.textContent = 0;
  P2CurrScore.textContent = 0;
  playerOne.classList.add("active-player");
  playerTwo.classList.remove("active-player");
}

// Set the image of the dice
function setDice(diceRoll) {
  dice.classList.remove("hidden");
  dice.src = `dice/dice-${diceRoll}.png`;
}

// User clicks on restart button, everything resets to default values
btnRestart.addEventListener("click", function () {
  restartElements();
});

// Hitting R would also restart the game
addEventListener("keydown", (e) => {
  if (e.key === "r") restartElements();
});

// Switch active player
function switchActivePlayer() {
  playerOne.classList.toggle("active-player");
  playerTwo.classList.toggle("active-player");
}

// returns 1 for player1 and 2 for player2
function getActivePlayer() {
  let activePlayer = 0;
  if (playerOne.classList.contains("active-player")) {
    activePlayer = 1;
  } else if (playerTwo.classList.contains("active-player")) {
    activePlayer = 2;
  } else {
    activePlayer = -1;
  }

  return activePlayer;
}

// Set current score for active player
function setCurrScore(activePlayer, currentScore) {
  document.querySelector(`.curr-score-player-${activePlayer}`).textContent =
    currentScore;

  document.querySelector(".curr-score").textContent = currentScore;
}

// Set actual score for active player
function setScore(activePlayer, currentScore) {
  console.log(activePlayer);
  scores[activePlayer - 1] += currentScore;
  document.querySelector(`.player-score-${activePlayer}`).textContent =
    scores[activePlayer - 1];
}

restartElements();

// Game logic when user holds their score

btnHold.addEventListener("click", function () {
  setScore(getActivePlayer(), currentScore);
  currentScore = 0;
  setCurrScore(getActivePlayer(), currentScore);
  if (scores[0] >= 50 || scores[1] >= 50) playing = false;
  else {
    switchActivePlayer();
  }
});

// Game logic when user rolls dice

btnRoll.addEventListener("click", function () {
  randomRoll = Math.trunc(Math.random() * 6 + 1);
  console.log(randomRoll);
  if (playing) {
    setDice(randomRoll);
    if (randomRoll != 1) {
      currentScore += randomRoll;
      setCurrScore(getActivePlayer(), currentScore);
    } else {
      currentScore = 0;
      setCurrScore(getActivePlayer(), currentScore);
      switchActivePlayer();
    }
  } else {
  }
});
