import * as security from "./services.js";

document.getElementById("start").addEventListener("click", function () {
  const response = security.startGame();
  console.log("Function called");
});
