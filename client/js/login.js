import * as security from "./services.js";

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    const response = security.logUserIn(Object.fromEntries(formData));

    response.then((data) => {
      if (data === "success") {
        window.location.href = "/start";
      } else {
        document.getElementById("error").innerText = data;
      }
    });
  });
