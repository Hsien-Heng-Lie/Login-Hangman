window.onload = (event) => {
  if (localStorage.result == "win") {
    loadWin();
  } else {
    loadLose();
  }
};
document.getElementById("start").onclick = (event) => {
  localStorage.count = 0;
  localStorage.guesses = "[]";
  localStorage.result = "";
  window.location.replace("/game");
};

function loadWin() {
  document.getElementById("win").hidden = false;
  let word = JSON.parse(localStorage.emptyWord);
  let guesses = JSON.parse(localStorage.guesses);
  document.getElementById("password").innerHTML = word.join("");
  document.getElementById("guesses").innerHTML = guesses.length;
}

function loadLose() {
  document.getElementById("lose").hidden = false;
}
