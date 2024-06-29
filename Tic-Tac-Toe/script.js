/* script.js */
const cells = document.querySelectorAll("[data-cell]");
const player1ScoreElement = document.getElementById("player1-score");
const player2ScoreElement = document.getElementById("player2-score");
const computerScoreElement = document.getElementById("computer-score");
const resetButton = document.getElementById("reset-button");
const pvpModeButton = document.getElementById("pvp-mode");
const pvcModeButton = document.getElementById("pvc-mode");
const winnerMessageElement = document.getElementById("winner-message");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let player1Score = 0;
let player2Score = 0;
let computerScore = 0;
let isPvP = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick, { once: true });
});

resetButton.addEventListener("click", resetGame);
pvpModeButton.addEventListener("click", () => setMode(true));
pvcModeButton.addEventListener("click", () => setMode(false));

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] !== "") return;

  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    updateScore();
    showWinnerMessage(currentPlayer);
    setTimeout(() => resetBoard(), 2000);
  } else if (isDraw()) {
    showWinnerMessage("Draw");
    setTimeout(() => resetBoard(), 2000);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (!isPvP && currentPlayer === "O") {
      makeComputerMove();
    }
  }
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === player);
  });
}

function isDraw() {
  return board.every((cell) => cell !== "");
}

function updateScore() {
  if (currentPlayer === "X") {
    player1Score++;
    player1ScoreElement.textContent = player1Score;
  } else {
    player2Score++;
    player2ScoreElement.textContent = player2Score;
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  winnerMessageElement.classList.add("hidden");
}

function resetGame() {
  resetBoard();
  player1Score = 0;
  player2Score = 0;
  computerScore = 0;
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
  computerScoreElement.textContent = computerScore;
}

function setMode(pvp) {
  isPvP = pvp;
  resetGame();
}

function makeComputerMove() {
  let emptyCells = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[randomIndex] = currentPlayer;
  cells[randomIndex].textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    showWinnerMessage("Computer");
    setTimeout(() => resetBoard(), 2000);
  } else if (isDraw()) {
    showWinnerMessage("Draw");
    setTimeout(() => resetBoard(), 2000);
  } else {
    currentPlayer = "X";
  }
}

function showWinnerMessage(winner) {
  winnerMessageElement.textContent =
    winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
  winnerMessageElement.classList.remove("hidden");
}
