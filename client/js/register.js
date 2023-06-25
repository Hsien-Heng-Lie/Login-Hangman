import * as security from "./services.js";

document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    
    const response = security.registerUser(Object.fromEntries(formData));

    response.then((data) => {
      if (data === "success") {
        window.location.href = "/start";
      } else {
        document.getElementById("error").innerText = data;
      }
    });
  });
