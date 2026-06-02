let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}
