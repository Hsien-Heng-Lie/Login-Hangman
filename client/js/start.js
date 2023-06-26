import * as services from "./services.js";

window.onload = (event) => {
  const token =  localStorage.getItem("jwt-token");
  if(token === "" || !token || token == null){
    window.location.href = "/login";
  }

  const response = services.authenticateToken(token);
  response.then((data) => {
    if (data !== "success") {
      window.location.href = "/login";
    }
  });
};

document.getElementById("start").onclick = async (event) => {
  const response = await services.startGame();
  if (response == "success") {
    localStorage.count = 0;
    localStorage.guesses = "[]";
    localStorage.result = "";
    localStorage.emptyWord = "";
    console.log("Function called");
    window.location.href = "/game";
  } else {
    window.alert("Something went wrong");
  }
};
