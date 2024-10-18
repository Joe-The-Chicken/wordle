const board = document.getElementById("board");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-guess");
const messageDiv = document.getElementById("message");

let targetWord = "";
const maxGuesses = 6;
let currentGuess = "";
let guessCount = 0;
let gameOver = false;

// Function to fetch random word from API
async function fetchRandomWord() {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const data = await response.json();
    targetWord = data[0].toLowerCase();
    console.log(`Target word: ${targetWord}`); // For debugging purposes
  } catch (error) {
    console.error("Error fetching the word:", error);
    targetWord = "apple"; // Fallback word if the API fails
  }
}

// Function to create the board
function createBoard() {
  board.innerHTML = ''; // Clear the board
  for (let i = 0; i < maxGuesses * 5; i++) {
    const cell = document.createElement("div");
    board.appendChild(cell);
  }
}

// Function to check the player's guess
function checkGuess() {
  if (gameOver) return;

  const guess = guessInput.value.toLowerCase();
  if (guess.length !== 5) {
    alert("Please enter a 5-letter word.");
    return;
  }

  currentGuess = guess;
  guessInput.value = "";
  const rowStart = guessCount * 5;

  // Fill the board with the guess and color the tiles
  for (let i = 0; i < 5; i++) {
    const cell = board.children[rowStart + i];
    cell.textContent = currentGuess[i];

    if (currentGuess[i] === targetWord[i]) {
      cell.style.backgroundColor = "green";
    } else if (targetWord.includes(currentGuess[i])) {
      cell.style.backgroundColor = "yellow";
    } else {
      cell.style.backgroundColor = "gray";
    }
  }

  guessCount++;
  
  // Check if the game is over (win or max guesses reached)
  if (currentGuess === targetWord) {
    messageDiv.textContent = "Congratulations! You guessed the word! Press Enter to start a new game.";
    gameOver = true;
  } else if (guessCount === maxGuesses) {
    messageDiv.textContent = `Sorry! The word was "${targetWord}". Press Enter to start a new game.`;
    gameOver = true;
  }
}

// Function to reset and start a new game
async function startNewGame() {
  guessCount = 0;
  gameOver = false;
  messageDiv.textContent = "";
  guessInput.disabled = false;
  submitButton.disabled = false;
  guessInput.value = "";
  await fetchRandomWord();
  createBoard();
}

// Event listener for the Submit Guess button
submitButton.addEventListener("click", checkGuess);

// Event listener for keyboard input
guessInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    if (gameOver) {
      // Start a new game if the game is over
      startNewGame();
    } else {
      // Check the guess if the game is still ongoing
      checkGuess();
    }
  }
});

// Initialize the game
async function initGame() {
  await fetchRandomWord();
  createBoard();
}

initGame();
