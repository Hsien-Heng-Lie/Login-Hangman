import dataJson from "./config.json" assert { type: "json" };

async function logUserIn(formData) {
  const url = dataJson.Identity_Server_Base_Url + "/login";

  const params = JSON.stringify({
    username: formData.username,
    password: formData.password,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: params,
  });

  if (response.ok) {
    const token = response.headers.get("jwt-token");
    localStorage.setItem("jwt-token", token);
    return "success";
  }

  const error = await response.text();
  return error;
}

async function registerUser(formData) {
  const url = dataJson.Identity_Server_Base_Url + "/register";

  if (formData.password != formData.confirmPassword) {
    return "Passwords don't match.";
  }

  const params = JSON.stringify({
    username: formData.username,
    password: formData.password,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: params,
  });

  if (response.ok) {
    const token = response.headers.get("jwt-token");
    localStorage.setItem("jwt-token", token);
    return "success";
  }

  const error = await response.text();
  return error;
}

async function startGame() {
  console.log("Endpoint still to be called");
  const url = "/game/start";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": localStorage.getItem("jwt-token"),
    },
  });
  if (response.ok) {
    let res = await response.json();
    const wordLength = res.wordLength;
    const gameId = res.gameId;
    localStorage.setItem("wordLength", wordLength);
    localStorage.setItem("gameId", gameId);
    return "success";
  }
}

async function endGame(gameId, result) {
  const url = "/game/end";

  const params = JSON.stringify({
    gameId,
    result,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": localStorage.getItem("Jwt-token"),
    },
    body: params,
  });

  if (response.ok) {
    return "success";
  }
}

export { logUserIn, registerUser, startGame, endGame };
