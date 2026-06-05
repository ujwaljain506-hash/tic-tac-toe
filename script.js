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
  if (!gameActive) return;
  if (board[index] !== "") return;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  checkWinner();
  if (gameActive && currentPlayer === "X") {
    currentPlayer = "O";
    const move = bestMove();
    board[move] = "O";
    cells[move].textContent = "O";
    checkWinner();
    currentPlayer = "X";
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      status.textContent = board[a] + " wins!";
      gameActive = false;
      return;
    }
  }
  if (!board.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  }
}

function minimax(newBoard, isMaximizing) {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
      if (newBoard[a] === "O") return 10;
      if (newBoard[a] === "X") return -10;
    }
  }
  if (!newBoard.includes("")) return 0;
  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "O";
        best = Math.max(best, minimax(newBoard, false));
        newBoard[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "X";
        best = Math.min(best, minimax(newBoard, true));
        newBoard[i] = "";
      }
    }
    return best;
  }
}

function bestMove() {
  let best = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, false);
      board[i] = "";
      if (score > best) {
        best = score;
        move = i;
      }
    }
  }
  return move;
}
function restart() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Your turn";
  cells.forEach(cell => {
    cell.textContent = "";
  });
}

document.getElementById("restart").addEventListener("click", restart);
