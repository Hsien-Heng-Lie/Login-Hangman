window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // handle login stuffs over here...This is just temp to get the flooooow on the goooo
    if (username === "admin" && password === "password") {
      // redirect to game page
      window.location.href = "game.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});
