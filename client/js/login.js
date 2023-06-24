import * as security from "./services.js";

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    console.log(JSON.stringify(Object.fromEntries(formData)));

    const response = security.logUserIn(Object.fromEntries(formData));

    response.then((data) => {
      if (data === "success") {
        window.location.href = "/game";
      } else {
        document.getElementById("error").innerHTML = data;
      }
    });
  });
