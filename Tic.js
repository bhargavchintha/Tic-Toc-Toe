let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let match = document.querySelector(".match");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  match.classList.add("Preview");
  showOverlay(); // Show overlay to choose starting player after resetting the game
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  match.classList.remove("Preview");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const getPlayerNames = () => {
  const playerX = localStorage.getItem("playerX");
  const playerO = localStorage.getItem("playerO");
  return { playerX, playerO };
};

// Function to show the winner with the players' names
const showWinner = (winner) => {
  const { playerX, playerO } = getPlayerNames();
  let winnerName = winner === "X" ? playerX : playerO;
  msg.innerText = `Congratulations, Winner is ${winnerName} ( ${winner} )`;
  msgContainer.classList.remove("hide");
  match.classList.remove("Preview");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Function to show the overlay
function showOverlay() {
  document.getElementById("overlay").style.display = "flex";
}

// Function to hide the overlay
function hideOverlay() {
  document.getElementById("overlay").style.display = "none";
}

document.getElementById("player-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  let playerX = document.getElementById("playerX").value.trim(); // Trim whitespace
  let playerO = document.getElementById("playerO").value.trim(); // Trim whitespace

  // Check if both players have different names
  if (playerX === playerO) {
    alert("Player X and Player O cannot have the same name. Please enter different names.");
    return; // Stop execution if names are the same
  }

  // Store player names in local storage
  localStorage.setItem("playerX", playerX);
  localStorage.setItem("playerO", playerO);

  // Hide player names input fields and show the game
  document.querySelector(".player-names").classList.add("hide");
  document.querySelector(".game").classList.remove("hide");

  // Show the Reset Game button
  document.getElementById("reset-btn").style.display = "inline";

  // Show the overlay to choose starting player
  showOverlay();
});

document.getElementById("start-X").addEventListener("click", function() {
  localStorage.setItem("startingPlayer", "X");
  hideOverlay();
  // Start the game with player X
  turnO = false;
  //document.getElementById("reset-btn").style.display = "none";
});

document.getElementById("start-O").addEventListener("click", function() {
  localStorage.setItem("startingPlayer", "O");
  hideOverlay();
  // Start the game with player O
  turnO = true;
 // document.getElementById("reset-btn").style.display = "none";
});

newGameBtn.addEventListener("click", () => {
  resetGame();
});

resetBtn.addEventListener("click", () => {
  resetGame();
});
