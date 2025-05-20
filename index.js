import {
  generateRandomNumber,
  getHint,
  playSound,
  resetGame,
} from "./utils.js";

let numberToGuess = generateRandomNumber();
let attempts = 7;

const input = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const feedback = document.getElementById("feedback");
const hint = document.getElementById("hint");
const attemptsLeft = document.getElementById("attemptsLeft");
const toggleBtn = document.getElementById("toggleMode");

function updateUI(message, isCorrect = false) {
  feedback.textContent = message;
  hint.textContent = !isCorrect ? getHint(numberToGuess) : "";
  attemptsLeft.textContent = `Attempts left: ${attempts}`;
}

function checkGuess() {
  const userGuess = parseInt(input.value);

  if (isNaN(userGuess)) {
    updateUI("Enter a valid number!");
    return;
  }

  // Remove placeholder after first valid guess
  if (input.placeholder) {
    input.placeholder = "";
  }

  if (userGuess === numberToGuess) {
    updateUI("🎉 Correct! You guessed it!", true);
    playSound("correct");
    endGame();
  } else {
    attempts--;
    playSound("wrong");
    updateUI(userGuess > numberToGuess ? "Too high!" : "Too low!");

    if (attempts <= 0) {
      updateUI(`💥 Game Over! The number was ${numberToGuess}`);
      playSound("gameOver");
      endGame();
    }
  }

  input.value = "";
}

function endGame() {
  input.disabled = true;
  submitBtn.disabled = true;
  playAgainBtn.classList.add("show");
}

submitBtn.addEventListener("click", checkGuess);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});

playAgainBtn.addEventListener("click", () => {
  ({ numberToGuess, attempts } = resetGame());
  input.disabled = false;
  submitBtn.disabled = false;
  playAgainBtn.classList.remove("show");
  input.value = "";
  input.placeholder = "Enter your guess (1-100)"; // Restore placeholder
  updateUI("Try to guess the number!");
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});
