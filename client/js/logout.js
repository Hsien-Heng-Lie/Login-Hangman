import * as security from "./services.js";

document.getElementById("logout").addEventListener("click", function (event) {
  event.preventDefault();
  const response = security.logUserOut();

  response.then((data) => {
    if (data === "success") {
      window.location.href = "/login";
    } else {
      document.getElementById("error").innerText = data;
    }
  });
});
