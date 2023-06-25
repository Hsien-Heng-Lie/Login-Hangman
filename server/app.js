const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const auth = require("./middleware/authenticate");
const { startGame, endGame, checkKey } = require("./playGame");

const serverPort = 4000;

app.use(bodyParser.json());

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
  return res.redirect("/start");
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

app.get("/game/start", auth, async (req, res) => {
  let username = res.getHeader("username");
  let game = await startGame(username);
  if (game?.recordset?.length > 0) {
    res.json({
      gameId: game.recordset[0].GameId,
      wordLength: game.recordset[0].Word.length,
    });
  }
});

app.get("/game/check", auth, async (req, res) => {
  if (req.query) {
    let indexes = await checkKey(req.query.gameId, req.query.character);
    res.json(indexes);
  }
});

app.post("/game/end", auth, async (req, res) => {
  await endGame(req.body.gameId, req.body.gameResult);
  console.log("Game has ended");
  res.end();
});
