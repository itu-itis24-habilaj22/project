const word = "CHEST".toUpperCase();
let score = 0;
let lives = 3;
let guessedLetters = Array(word.length).fill(null);

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const cards = document.querySelectorAll(".card");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");

// Update the card display
function updateCards() {
  guessedLetters.forEach((letter, index) => {
    cards[index].textContent = letter || "?";
  });
}

// Update lives
function updateLives() {
  const hearts = Array.from(livesDisplay.querySelectorAll(".heart"));
  hearts.forEach((heart, index) => {
    heart.style.visibility = index < lives ? "visible" : "hidden";
  });
}

// Handle a guess
function handleGuess(guess) {
  // Ensure input is a single letter
  if (guess.length !== 1 || !/^[A-Z]$/.test(guess)) {
    alert("Please enter a single valid letter.");
    return;
  }

  let correctGuess = false;
  word.split("").forEach((letter, index) => {
    if (letter === guess && !guessedLetters[index]) {
      guessedLetters[index] = letter;
      correctGuess = true;
      score += 20;
    }
  });

  if (!correctGuess) {
    lives--;
  }

  updateCards();
  updateLives();
  scoreDisplay.textContent = score;

  if (guessedLetters.join("") === word) {
    alert("Congratulations! You guessed all the letters!");
    endGame();
  } else if (lives <= 0) {
    alert(`Game Over! The word was ${word}.`);
    endGame(false);
  }
}

// End the game
function endGame(win = true) {
  submitButton.disabled = true;
  guessInput.disabled = true;
  if (!win) score = 0;
}

// Reset the game
function resetGame() {
  score = 0;
  lives = 3;
  guessedLetters = Array(word.length).fill(null);
  scoreDisplay.textContent = score;
  guessInput.disabled = false;
  submitButton.disabled = false;
  updateCards();
  updateLives();
}

submitButton.addEventListener("click", () => {
  const guess = guessInput.value.toUpperCase();
  guessInput.value = ""; // Clear input field
  handleGuess(guess);
});

resetButton.addEventListener("click", resetGame);


// Initial setup
updateCards();
updateLives();

// Function to show the game page
function showGamePage() {
  // Hide the "About Me" section
  document.getElementById("about-me").style.display = "none";
  // Show the "Game Page"
  document.getElementById("game-page").style.display = "block";
}
