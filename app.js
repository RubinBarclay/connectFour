
var board = [ // tilt head 90deg, right is bottom row, top is left col
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
]



// column is zero base indexed (array)
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
  
  document.getElementById(slotID).style.backgroundColor = 
    (player === 1) ? "red" : "yellow";
  

  // must be run here before playerChange in eventListener

  console.log(winConditions(slotID, player));
  /*  
  if (WinConditions(player, slotCordinate)) {
    "PlayerX Wins"
  } else {
    continue playing
  }
  */
}

function changePlayer() {
  if (player === 1) {
    player++;
  } else {
    player--;
  }
}

function winConditions(slot, curPlayer) {
  // Make them zero base indexed again
  let row = 6 - Number(slot[1]);
  let col = Number(slot[3]) - 1;

  console.log(row);
  console.log(col);



  // HORIZONTAL : the win pattern check shifts to the right each loop
  // i <= Math.abs(....) is how many possible win patterns there are i.e: loop count
  for (let i = 0; i <= 3 - Math.abs(3 - col); i++) { // col index controls how many possible win patterns (max 4)
    
    console.log([
      // !!!!!!! FIXED IT !!!!!! board[(intermediate value)] is undefined BECAUSE its an index which doesn't exist in array. i.e. too big/small
      board[col - (3 - i) >= 0 ? col - (3 - i) : 3][row],
      board[col - (2 - i) >= 0 ? col - (2 - i) : 2][row],
      board[col - (1 - i) >= 0 ? col - (1 - i) : 1][row],
      board[col - (0 - i) >= 0 ? col - (0 - i) : 0][row]
    ]);
   
    if ([
      board[col - (3 - i) >= 0 ? col - (3 - i) : 3][row],
      board[col - (2 - i) >= 0 ? col - (2 - i) : 2][row],
      board[col - (1 - i) >= 0 ? col - (1 - i) : 1][row],
      board[col - (0 - i) >= 0 ? col - (0 - i) : 0][row]
    ].every((val) => val === curPlayer)
    ) {
      return "Winner!";
    }
  }

  // No match found
  return null;
}

// GLOBAL VARIABLES
let player = 1;
let columns = document.querySelectorAll(".column");

// EVENT LISTENERS
for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener("click", () => {
    placeMarker(i);
    changePlayer();
  });
}
