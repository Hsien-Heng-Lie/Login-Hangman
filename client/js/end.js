import * as services from "./services.js";

window.onload = async (event) => {
  await fetch("/game/end", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": localStorage.getItem("jwt-token"),
    },
    body: JSON.stringify({
      gameId: localStorage.gameId,
      gameResult: localStorage.gameResult,
    }),
  });
  if (localStorage.gameResult == 1) {
    loadWin();
  } else {
    loadLose();
  }
  localStorage.emptyWord = "";
};
document.getElementById("start").onclick = async (event) => {
  const response = await services.startGame();
  if (response == "success") {
    localStorage.count = 0;
    localStorage.guesses = "[]";
    localStorage.result = "";
    console.log("Function called");
    window.location.href = "/game";
  } else {
    window.alert("Something went wrong");
  }
};

function loadWin() {
  document.getElementById("win").hidden = false;
  let word = JSON.parse(localStorage.emptyWord);
  let guesses = JSON.parse(localStorage.guesses);
  document.getElementById("password").innerText = word.join("");
  document.getElementById("guesses").innerText = guesses.length;
}

function loadLose() {
  document.getElementById("lose").hidden = false;
}
