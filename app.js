
var board = [ // arrays are columns, index is row
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
]

function placeMarker(column) {
  for (let i in board[column]) {
    if (board[column][i] == 0) {
      board[column][i] = player;
      break;
    }
  }

  // Get slot ID on board
  let col = column + 1;
  let row = 6 - board[column].lastIndexOf(player);
  let slotID = "r" + row + "c" + col;
  
  // Place current player marker
  document.getElementById(slotID).style.backgroundColor = 
    (player === 1) ? "red" : "yellow";
  

  // Win check
  if (winConditions(slotID, player)) {
    console.log("WINNER")
    winner(player); // WINNER!
  }

  // Player change 
  changePlayer();
}

function changePlayer() {
  if (player === 1) {
    player++;
  } else {
    player--;
  }

  let color = (player === 1) ? "red" : "yellow";
  let playerText = document.getElementById('player');
  playerText.innerText = color;
  playerText.style.color = color;
}

function winConditions(slot, curPlayer) {
  // Make them zero base indexed again
  let row = 6 - Number(slot[1]);
  let col = Number(slot[3]) - 1;

  // Loop count
  let loopCount;
  let singleLoop;
  let doubleLoop;
  let tripleLoop;

  // HORIZONTAL
  loopCount = 3 - Math.abs(3 - col);
  for (let i = 0; i <= loopCount; i++) { 
    if ([
      board[col - (3 - i) >= 0 ? col - (3 - i) : 3][row],
      board[col - (2 - i) >= 0 ? col - (2 - i) : 2][row],
      board[col - (1 - i) >= 0 ? col - (1 - i) : 1][row],
      board[col - (0 - i) >= 0 ? col - (0 - i) : 0][row]
    ].every((val) => val === curPlayer)
    ) {
      return true;
    }
  }
  
  // VERTICAL
  loopCount = row < 3 ? row : 5 - row;
  for (let i = 0; i <= loopCount; i++) {
    if ([
      board[col][row - (3 - i) >= 0 ? row - (3 - i) : 3],
      board[col][row - (2 - i) >= 0 ? row - (2 - i) : 2],
      board[col][row - (1 - i) >= 0 ? row - (1 - i) : 1],
      board[col][row - (0 - i) >= 0 ? row - (0 - i) : 0]
    ].every((val) => val === curPlayer)
    ) {
      return true;
    }
  }

  // DIAGONAL /
  
  // slotID determines loopCount
  singleLoop = ['r4c1', 'r3c2', 'r2c3', 'r1c4', 'r6c4', 'r5c5', 'r4c6', 'r3c7', 'r5c1', 'r6c1', 'r6c2', 'r6c3', 'r1c5', 'r1c6', 'r1c7', 'r2c7'];
  doubleLoop = ['r5c1', 'r4c2', 'r3c3', 'r2c4', 'r1c5', 'r6c3', 'r5c4', 'r4c5', 'r3c6', 'r2c7', 'r5c2', 'r2c5', 'r5c3', 'r2c6'];
  tripleLoop = ['r4c3', 'r3c4', 'r4c4', 'r3c5'];
  
  loopCount = singleLoop.indexOf(slot) > - 1 ? 1 // loop once
            : doubleLoop.indexOf(slot) > - 1 ? 2 // loop twice
            : tripleLoop.indexOf(slot) > - 1 ? 3 // loop thrice
            : 0 // no possible win pattern

  for (let i = 0; i < loopCount; i++) {
    if ([ 
      (col - (3 - i) >= 0 && row - (3 - i) >= 0)
      ? board[col - (3 - i)][row - (3 - i)] 
      : board[col + 1][row + 1],
      (col - (2 - i) >= 0 && row - (2 - i) >= 0)
      ? board[col - (2 - i)][row - (2 - i)] 
      : board[col + 2][row + 2],
      (col - (1 - i) >= 0 && row - (1 - i) >= 0)
      ? board[col - (1 - i)][row - (1 - i)] 
      : board[col + 3][row + 3],
      (col - (0 - i) >= 0 && row - (0 - i) >= 0)
      ? board[col - (0 - i)][row - (0 - i)] 
      : board[col][row]
    ].every((val) => val === curPlayer)
    ) {
      return true;
    }
  }

  // DIAGONAL \
  
  // slotID determines loopCount
  singleLoop = ['r1c1', 'r1c2', 'r1c3', 'r1c4', 'r2c1', 'r3c1', 'r4c2', 'r5c3', 'r6c4', 'r6c5', 'r6c6', 'r6c7', 'r5c7', 'r4c7', 'r3c6', 'r2c5'];
  doubleLoop = ['r2c2', 'r2c3', 'r2c4', 'r3c2', 'r3c5', 'r4c3', 'r5c4', 'r5c5', 'r5c6', 'r4c6'];
  tripleLoop = ['r3c3', 'r3c4', 'r4c4', 'r4c5'];

  loopCount = singleLoop.indexOf(slot) > - 1 ? 1 // loop once
            : doubleLoop.indexOf(slot) > - 1 ? 2 // loop twice
            : tripleLoop.indexOf(slot) > - 1 ? 3 // loop thrice
            : 0 // no possible win pattern

  for (let i = 0; i < loopCount; i++) {
    if ([ 
      (col - (3 - i) >= 0 && row + (3 - i) <= 5)
      ? board[col - (3 - i)][row + (3 - i)] 
      : board[col + 1][row - 1],
      (col - (2 - i) >= 0 && row + (2 - i) <= 5)
      ? board[col - (2 - i)][row + (2 - i)] 
      : board[col + 2][row - 2],
      (col - (1 - i) >= 0 && row + (1 - i) <= 5)
      ? board[col - (1 - i)][row + (1 - i)] 
      : board[col + 3][row - 3],
      (col - (0 - i) >= 0 && row + (0 - i) <= 5)
      ? board[col - (0 - i)][row + (0 - i)] 
      : board[col][row]
    ].every((val) => val === curPlayer)
    ) {
      return true;
    }
  }
    
  // No winning pattern found
  return false;
}

function winner(player) {
  let modal = document.getElementById("info-modal");
  let winner = document.getElementById("winner");
  let color = player === 1 ? "red" : "yellow";

  modal.style.display = "flex";
  winner.innerText = color;
  winner.style.color = color;

}

// GLOBAL VARIABLES
let player = 1;
let columns = document.querySelectorAll(".column");

// EVENT LISTENERS
for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener("click", () => {
    placeMarker(i);
  });
}
