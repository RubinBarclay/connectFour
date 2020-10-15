
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
  

  /* must be run here before playerChange in eventListener

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

function winConditions(slot) {
  // Make them zero base indexed again
  let row = slot[1] - 1;
  let col = slot[3] - 1;


  // go over horizontal part again
  // col goes up to 6, not 4, horiz. only has four possible patterns? or am i fucking dumb dumb
  for (let i = 0; i <= col; i++) { // col index controls how many possible win patterns (max 4)
    // Horizontal : the win pattern check shifts to the right each loop
    if (
      board[(col - (3 - i) >= 0) ? col - 3 : (col - (3 - i)) * -1][row],
      board[(col - (2 - i) >= 0) ? col - 2 : (col - (2 - i)) * -1][row],
      board[(col - (1 - i) >= 0) ? col - 1 : (col - (1 - i)) * -1][row],
      board[(col - (0 - i) >= 0) ? col - 0 : (col - (0 - i)) * -1][row]
    ) {
      return "WINNER!";
    } else if (
      // VERTICAL only has 3 possible winning patterns 
      i < 3
    ) {
      return "WINNER";
    } else if (
      // DIAGONAL
    ) {
      return "WINNER";
    }
  }

  // OR have 3 seperate for loops for each

  // No match found
  return null;
}
/*
let winConditions = [
  [
    board[(col - 3 >= 0) ? col - 3 : 0][row],
    board[(col - 2 >= 0) ? col - 2 : 0][row],
    board[(col - 1 >= 0) ? col - 1 : 0][row],
    board[col][row]
  ],
  [
    board[(col - 2 >= 0) ? col - 2 : 0][row],
    board[(col - 1 >= 0) ? col - 1 : 0][row],
    board[col][row],
    board[(col - 1 >= 0) ? col + 1 : 6][row],
  ]
    
]
*/

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







/* ---------------------------- */ 

/*

function placeMarkerr(column, color) {
  var slots = board[column]["slots"];
  var cordinates = board[column]["cordinates"];
  
  slots.push(color);
  
  let slotID = cordinates[cordinates.length - slots.length];
  let slot = document.getElementById(slotID);

  slot.style.backgroundColor = color;

  setTimeout(botPlaceMarker, 400); // worlds shittiest "AI" opponent
}

function botPlaceMarker() {
  var column = "col" + Math.ceil(Math.random() * 7);
  
  var slots = board[column]["slots"];
  var cordinates = board[column]["cordinates"];

  slots.push("yellow");

  let slotID = cordinates[cordinates.length - slots.length];
  let slot = document.getElementById(slotID);

  slot.style.backgroundColor = "yellow"
}

let color = "red";

col1.addEventListener("click", () => placeMarker("col1", color));
col2.addEventListener("click", () => placeMarker("col2", color));
col3.addEventListener("click", () => placeMarker("col3", color));
col4.addEventListener("click", () => placeMarker("col4", color));
col5.addEventListener("click", () => placeMarker("col5", color));
col6.addEventListener("click", () => placeMarker("col6", color));
col7.addEventListener("click", () => placeMarker("col7", color));
*/