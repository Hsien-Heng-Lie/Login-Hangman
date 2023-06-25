import * as security from "./services";

document.getElementById("start").onclick = async (event) => {
  const response = await security.newGame();
  localStorage.count = 0;
  localStorage.guesses = "[]";
  localStorage.result = "";
  console.log("Function called");
  window.location.replace("/game");
};
