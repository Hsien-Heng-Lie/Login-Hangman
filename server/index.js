// basic express server
const express = require("express");
const config = require("./config");
const app = express();
const port = 3000;

config.writeConfig();

app.use(express.static("client/html"));
app.use(express.static("client/css"));
app.use(express.static("client/js"));
app.use(express.static("client/img"));

// Route for root URL to redirect to login page
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.redirect("login.html");
});

app.get("/register", (req, res) => {
  res.redirect("register.html");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
