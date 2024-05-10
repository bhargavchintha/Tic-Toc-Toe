let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let match = document.querySelector(".match");
let playerWins = {
  X: 0,
  O: 0
};

let turnO = true; 
let count = 0; 

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
  showOverlay(); 
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
    box.classList.remove('win'); // Remove the 'win' class from all boxes
  }
};

const getPlayerNames = () => {
  const playerX = localStorage.getItem("playerX");
  const playerO = localStorage.getItem("playerO");
  return { playerX, playerO };
};


const showWinner = (winner) => {
  const { playerX, playerO } = getPlayerNames();
  let winnerName = winner === "X" ? playerX : playerO;
  playerWins[winner]++;

  let WinnerName = `<span class="winner">${winnerName} ( ${winner} )</span>`;
  let timescount = `<span class="Timecount">${playerWins[winner]}th</span>`;

  let message = "";
  if (playerWins[winner] === 2) {
    message = ` Congratulations Again ${WinnerName} wins the game!`;
  } else if (playerWins[winner] === 3) {
    message = `Congratulations Once Again ${WinnerName} wins the game!`;
  } else if (playerWins[winner] > 3) {
    message = `Congratulations ${WinnerName} wins the game for the ${timescount} time!`;
  } else {
    message = `Congratulations, Winner is ${WinnerName}`;
  }

  
  for (let pattern of winPatterns) {
    let [pos1, pos2, pos3] = pattern;
    let pos1Val = boxes[pos1].innerText;
    let pos2Val = boxes[pos2].innerText;
    let pos3Val = boxes[pos3].innerText;

    if (pos1Val === winner && pos2Val === winner && pos3Val === winner) {
      boxes[pos1].classList.add('win');
      boxes[pos2].classList.add('win');
      boxes[pos3].classList.add('win');
    }
  }

  
  setTimeout(() => {
    msg.innerHTML = message;
    msgContainer.classList.remove("hide");
    match.classList.remove("Preview");
    disableBoxes();

    resetBtn.classList.add('hide');
    setTimeout(() => {
      resetBtn.classList.remove('hide');
    }, 500);
  }, 500);
};








const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {

      boxes[pattern[0]].classList.add("winning-box");
      boxes[pattern[1]].classList.add("winning-box");
      boxes[pattern[2]].classList.add("winning-box");
      
      
      showWinner(pos1Val);
      return true;
    }
  }
};




document.getElementById("start-X").addEventListener("click", function() {
  localStorage.setItem("startingPlayer", "X");
  hideOverlay();
  turnO = false;
});

document.getElementById("start-O").addEventListener("click", function() {
  localStorage.setItem("startingPlayer", "O");
  hideOverlay();
  turnO = true;
});

newGameBtn.addEventListener("click", () => {
  resetGame();
});

resetBtn.addEventListener("click", () => {
  resetGame();
  
});
