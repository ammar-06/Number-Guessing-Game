export function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export function getHint(number) {
  return number % 2 === 0
    ? "Hint: It's an even number."
    : "Hint: It's an odd number.";
}

export function playSound(type) {
  const sounds = {
    correct: new Audio("./sounds/correct.mp3"),
    wrong: new Audio("./sounds/wrong.mp3"),
    gameOver: new Audio("./sounds/gameOver.mp3"),
  };
  sounds[type]?.play();
}

export function resetGame() {
  return {
    numberToGuess: generateRandomNumber(),
    attempts: 7,
  };
}
