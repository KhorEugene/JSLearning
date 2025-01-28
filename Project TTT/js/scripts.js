// manage the tic tac toe board
function GameBoard(){
  const rows = 3;
  const cols = 3;
  let gameBoard = []; // 3 x 3 matrix to store tictactoe board state

  // initialise board
  for (let i=0; i<cols; i++){
    gameBoard[i] = [];
    for (let j=0; j<rows; j++){
      gameBoard[i].push(Cell());
    }
  }

  const getGameBoard =()=> gameBoard;

  const resetBoard = () => {
    gameBoard = [];
    for (let i=0; i<cols; i++){
      gameBoard[i] = [];
      for (let j=0; j<rows; j++){
        gameBoard[i].push(Cell());
      }
    }
  }
  
  const addMark = (player, column, row) => {
    // Add cross or circle to board
    // Check cell available
    if (row > rows - 1 || column > cols - 1){
      return false;
    }
    const cellAvailable = gameBoard[column][row].getValue() === "";

    // if not available, end and don't do anything
    if (!cellAvailable) return false;

    gameBoard[column][row].addMark(player);
    return true;
  };

  // for visualising board on console
  const printBoard = () => {
    const boardWithCellValues = gameBoard.map((row) => row.map((cell) => cell.getValue()));
    // console.log(boardWithCellValues);
  };

  return {
    printBoard, getGameBoard, addMark, resetBoard
  };
};

function Cell(){
  let value = "";
  const addMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addMark, getValue
  };
};

// Manages the flow of the game
function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
){
  const board = GameBoard();
  let winState = false;
  let stalemateState = false;
  const players = [
    {
      name: playerOneName,
      mark: "X"
    },
    {
      name: playerTwoName,
      mark: "O"
    }
  ];  // array of 2 players
  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer;
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printCurrentBoard = () => {
    board.printBoard();
    if (winState){
      // console.log(`${getActivePlayer().name} (${getActivePlayer().mark}) wins!`);
    } else if (stalemateState) {
      // console.log(`Stalemate!`);
    } else {
      // console.log(`${getActivePlayer().name}'s (${getActivePlayer().mark}) turn.`);
    };
    
  };

  const checkRowWin = (row) => row.every((cell) => cell.getValue() !== "" && cell.getValue() === row[0].getValue());

  const checkStraightWin = (boardRep) => {
    for (let i=0; i<boardRep.length; i++){
        let row = boardRep[i];
        if (checkRowWin(row)) {
          winState = true;
          break;
        };
      };
  };

  const resetGame = () => {
    // console.log(`Game has reset`);
    activePlayer = players[0];
    board.resetBoard();
    winState = false;
    stalemateState = false;
    printCurrentBoard();
  };

  const checkStatemateCondition = () => {
    if (winState){
      return;
    } else {
      for (let i=0; i<board.getGameBoard().length; i++){
        let row = board.getGameBoard()[i];
        for (let j=0; j<row.length; j++){
          if (row[j].getValue() === "") {
            return;
          };
        }
      };
      stalemateState = true;
      return;
    };
    
  };

  const checkWinCondition = () => {
    let currBoard = board.getGameBoard();

    // Check win condition in rows
    checkStraightWin(currBoard);

    // Transpose board
    let tpBoard = currBoard[0].map((_, index) => [currBoard[0][index], currBoard[1][index], currBoard[2][index]]);

    // Check win condition in columns
    checkStraightWin(tpBoard);

    // Check win condition in diagonals
    let diag1 = [currBoard[0][0], currBoard[1][1], currBoard[2][2]];
    
    if (checkRowWin(diag1)) {
      winState = true;
    };
    
    let diag2 = [currBoard[0][2], currBoard[1][1], currBoard[2][0]];

    if (checkRowWin(diag2)) {
      winState = true;
    };
  }

  const playTurn =(row, column)=>{
    // Don't allow more moves if game already over
    let statusMsg = "";  // gives error message if turn not executed
    let status = true;  // true if turn executed, vice versa
    if (winState) {
      status = false;
      statusMsg = `Game over. ${getActivePlayer().name} (${getActivePlayer().mark}) has already won!`
    } else if (stalemateState) {
      status = false;
      statusMsg = `Game over - Stalemale! Please reset board.`
    } else {
      const moveValid = board.addMark(getActivePlayer().mark, row, column);
      // Valid move
      if (moveValid) {
        // Print game over if game won
        checkWinCondition();
        checkStatemateCondition();
        if (winState) {
          printCurrentBoard();
          statusMsg = `Game over. ${getActivePlayer().name} (${getActivePlayer().mark}) has won!`
        // Execute move
        } else if (stalemateState) {
          printCurrentBoard();
          statusMsg = `Game over - Stalemale!`
        } else {
          switchPlayerTurn();
          printCurrentBoard();
        }
      // Illegal move
      } else {
        status = false;
        statusMsg = `Invalid move. Try again ${getActivePlayer().name} (${getActivePlayer().mark}).`
        console.log(statusMsg);
      }
    };
    return {
      status: status, message: statusMsg
    };
  };
    

  // Initial play game message
  printCurrentBoard();

  return {
    playTurn, resetGame, getActivePlayer
  }
}

let game = GameController();

// DOM management code
const cells = document.querySelectorAll("#cell");
const statusbar = document.getElementsByClassName("status-bar")[0];
const landingstatusbar = document.getElementsByClassName("landing-status-bar")[0];
const resetGameBtn = document.getElementsByClassName("reset-btn")[0];
const changePlayersBtn = document.getElementsByClassName("change-players")[0];
const startGameButton = document.getElementById('start-game');
const gamePage = document.getElementById('game-page');
const landingPage = document.getElementById('landing-page');
statusbar.textContent = `${game.getActivePlayer().name}'s (${game.getActivePlayer().mark}) turn.`;


startGameButton.addEventListener('click', () => {
  const player1Name = document.getElementById('player1').value;
  const player2Name = document.getElementById('player2').value;

  if (player1Name.trim() === "" || player2Name.trim() === "") {
    landingstatusbar.textContent = "Please enter both player names.";
    return; // prevent game start if names are empty
  }

  game = GameController(player1Name, player2Name);
  statusbar.textContent = `${game.getActivePlayer().name}'s (${game.getActivePlayer().mark}) turn.`;

  landingPage.style.display = 'none';
  gamePage.style.display = 'block';
});

resetGameBtn.addEventListener("click", function() {
  game.resetGame();
  statusbar.textContent = `Game reset. ${game.getActivePlayer().name}'s (${game.getActivePlayer().mark}) turn.`;
  cells.forEach((cell) => {
    cell.textContent = "";
  });
});

changePlayersBtn.addEventListener("click", function() {
  // Reset game first
  game.resetGame();
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  // Show landing page again
  landingPage.style.display = 'block';
  gamePage.style.display = 'none';

  // Reset player names
  document.getElementById('player1').value = "";
  document.getElementById('player2').value = "";
})

cells.forEach((cell, index) => {
  cell.addEventListener("click", function() {
    const row = Math.floor(index/3);
    const col = index % 3;
    console.log("Cell clicked:", this.id, "Row:", row, "Column:", col);
    let currPlayer = game.getActivePlayer();
    let currMark = currPlayer.mark;
    // Add your code here to handle the click on cell-0
    const turnRes = game.playTurn(row, col);
    if (turnRes.status) {
      this.textContent = currMark;
    };
    if (turnRes.message === ""){
      statusbar.textContent = `${game.getActivePlayer().name}'s (${game.getActivePlayer().mark}) turn.`;
    } else {
      statusbar.textContent = turnRes.message;
    };
  });
});
