const board = document.getElementById("board");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-guess");
const messageDiv = document.getElementById("message");

const targetWord = "apple"; // The word to guess
const maxGuesses = 6;
let currentGuess = "";
let guessCount = 0;

function createBoard() {
  for (let i = 0; i < maxGuesses * 5; i++) {
    const cell = document.createElement("div");
    board.appendChild(cell);
  }
}

function checkGuess() {
  const guess = guessInput.value.toLowerCase();
  if (guess.length !== 5) {
    alert("Please enter a 5-letter word.");
    return;
  }

  currentGuess = guess;
  guessInput.value = "";
  const rowStart = guessCount * 5;

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
  
  if (currentGuess === targetWord) {
    messageDiv.textContent = "Congratulations! You guessed the word!";
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else if (guessCount === maxGuesses) {
    messageDiv.textContent = `Sorry! The word was "${targetWord}".`;
    submitButton.disabled = true;
    guessInput.disabled = true;
  }
}

submitButton.addEventListener("click", checkGuess);
guessInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

createBoard();
