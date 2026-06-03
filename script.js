let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const status = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!gameActive) return;        // 1. check if game is over
  if (board[index] !== "") return; // 2. check if cell is filled

  board[index] = currentPlayer;   // 3. place the mark
  cell.textContent = currentPlayer;

  checkWinner();                   // 4. check for winner

  if (currentPlayer === "X") {    // 5. switch player
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}
const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];

function checkWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];

    if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
      status.textContent = board[a] + " wins!";
      gameActive = false;
      return;
    }
  }

  // check draw
  if (!board.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  }
}

