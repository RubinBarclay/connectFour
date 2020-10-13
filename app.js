
var col1 = document.getElementById("col1");
var col2 = document.getElementById("col2");
var col3 = document.getElementById("col3");
var col4 = document.getElementById("col4");
var col5 = document.getElementById("col5");
var col6 = document.getElementById("col6");
var col7 = document.getElementById("col7");

var board = {
  "col1" : {
    "slots" : [],
    "cordinates" : ["r1c1", "r2c1", "r3c1", "r4c1", "r5c1", "r6c1"]
  },
  "col2" : {
    "slots" : [],
    "cordinates" : ["r1c2", "r2c2", "r3c2", "r4c2", "r5c2", "r6c2"]
  },
  "col3" : {
    "slots" : [],
    "cordinates" : ["r1c3", "r2c3", "r3c3", "r4c3", "r5c3", "r6c3"]
  },
  "col4" : {
    "slots" : [],
    "cordinates" : ["r1c4", "r2c4", "r3c4", "r4c4", "r5c4", "r6c4"]
  },
  "col5" : {
    "slots" : [],
    "cordinates" : ["r1c5", "r2c5", "r3c5", "r4c5", "r5c5", "r6c5"]
  },
  "col6" : {
    "slots" : [],
    "cordinates" : ["r1c6", "r2c6", "r3c6", "r4c6", "r5c6", "r6c6"]
  },
  "col7" : {
    "slots" : [],
    "cordinates" : ["r1c7", "r2c7", "r3c7", "r4c7", "r5c7", "r6c7"]
  }
};

let boardArr = [ // need to create winning conditions
  board["col1"]["slots"],
  board["col1"]["slots"], 
  board["col1"]["slots"], 
  board["col1"]["slots"], 
  board["col1"]["slots"], 
  board["col1"]["slots"],
  board["col1"]["slots"]
];

function placeMarker(column, color) {
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
