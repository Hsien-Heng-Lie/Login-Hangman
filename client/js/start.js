import * as security from "./services.js";

document.getElementById("start").onclick = async (event) => {
  const response = await security.startGame();
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
