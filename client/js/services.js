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

  console.log(response);

  if (response.ok) {
    //   TODO: jwt isn't coming back in the response
    const token = response.headers.get("jwt-token");
    console.log(token);
    localStorage.setItem("jwt-token", token);
    return "success";
  }

  const error = await response.text();
  return error;
}

async function registerUser(formData) {
  const url = dataJson.Identity_Server_Base_Url + "/register";

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

  console.log(response);

  if (response.ok) {
    //   TODO: jwt isn't coming back in the response
    const token = response.headers.get("jwt-token");
    console.log(token);
    localStorage.setItem("jwt-token", token);
    return "success";
  }

  const error = await response.text();
  return error;
}

async function startGame() {
  // TODO: add code here
  console.log("Endpoint still to be called");
}

export { logUserIn, registerUser, startGame };
