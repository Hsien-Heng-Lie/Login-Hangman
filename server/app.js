const express = require("express");
const app = express();
const path = require("path");

const serverPort = 4000;
const http = require("http");

const server = http.createServer(app);

app.use(express.static("./../client/html"));
app.use(express.static("./../client/css"));
app.use(express.static("./../client/js"));
app.use(express.static("./../client/img"));

// Route for root URL to redirect to login page
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/html/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile("register.html");
});

app.post("/authenticate", (req, res) => {
  const options = {
    hostname: "localhost",
    port: 4040,
    path: "/authenticate",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "jwt-token": req.headers["jwt-token"],
    },
  };

  const identityServerReq = http.request(options, (identityServerRes) => {
    identityServerRes.on("end", () => {
      const statusCode = identityServerRes.statusCode;
      console.log(statusCode);
      if (statusCode === 200) {
        console.log("Logged in successfully!");
        res.redirect("/game");
      } else if (statusCode === 401 || statusCode === 403) {
        res.redirect(statusCode, "/login");
      }
    });

    identityServerRes.on("error", (error) => {
      console.log("Error while communicating with the identity server", error);
      res.sendStatus(500);
    });
  });

  identityServerReq.end();
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/html/game.html"));
});

server.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
