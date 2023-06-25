const express = require("express");
const app = express();
const path = require("path");
const auth = require("./middleware/authenticate");

const serverPort = 4000;

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

app.use(express.static(path.join(__dirname, "..", "client", "html")));
app.use(express.static(path.join(__dirname, "..", "client", "css")));
app.use(express.static(path.join(__dirname, "..", "client", "js")));
app.use(express.static(path.join(__dirname, "..", "client", "img")));

app.use("*", (req, _, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

// Route for root URL to redirect to login page
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "html", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile("register.html");
});

app.post("/authenticate", auth, (req, res) => {
  return res.redirect("/game");
});

app.get("/start", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "html", "start.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "html", "game.html"));
});

app.get("/end", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "html", "end.html"));
});
