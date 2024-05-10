function showOverlay() {
    document.getElementById("overlay").classList.remove("hide");
    document.getElementById("Tic_Toc").classList.add("hide");
    document.getElementById("reset-btn").classList.add("hide"); 
  }

  
  function hideOverlay() {
    document.getElementById("overlay").classList.add("hide");
    document.getElementById("Tic_Toc").classList.remove("hide");
    document.getElementById("reset-btn").classList.remove("hide"); 
  }

  document.getElementById("start-game").addEventListener("click", function() {
    let playerX = document.getElementById("playerX").value.trim(); 
    let playerO = document.getElementById("playerO").value.trim(); 

   
    if (playerX === playerO) {
      alert("Player X and Player O cannot have the same name. Please enter different names.");
      return; 
    }

  
    localStorage.setItem("playerX", playerX);
    localStorage.setItem("playerO", playerO);
    
    document.querySelector(".player-names").classList.add("hide");
    document.querySelector(".game").classList.remove("hide");
   
    document.getElementById("reset-btn").style.display = "inline";

    showOverlay();
  });