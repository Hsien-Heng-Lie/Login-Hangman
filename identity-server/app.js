const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const dbHandler = require("./database/dbHandler");
const kitchen = require("./kitchen/kitchen");
const verify = require("./middleware/verify");
const cors = require("cors");

const app = express();
const port = process.env.Identity_Server_API_PORT;

app.use(bodyParser.json());
app.use(cors());

app.use("*", (req, _, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(password && username)) {
      return res.status(400).send("Missing input");
    }

    const oldUser = await dbHandler.readUserDetail(username);

    if (oldUser) {
      return res.status(409).send("User already exists. Please log in.");
    }

    const saltedpassword = kitchen.newSeason(password);

    const insertResult = await dbHandler.insertUserDetail(
      username,
      saltedpassword.salt,
      saltedpassword.seasonedFood
    );

    const user = {
      username: username,
    };

    const token = jwt.sign({ username: username }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    res.setHeader("jwt-token", token);
    res.setHeader("Access-Control-Expose-Headers", "jwt-token");
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured, please try again later");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send("Missing Input");
    }
    const oldUser = await dbHandler.readUserDetail(username);

    if (!oldUser) {
      return res.status(409).send("User doesn't exist. Please register.");
    }

    if (kitchen.compareSeason(oldUser.saltedHash, oldUser.salt, password)) {
      const user = {
        username: username,
      };

      const token = jwt.sign({ username: username }, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      });

      res.setHeader("jwt-token", token);
      res.setHeader("Access-Control-Expose-Headers", "jwt-token");
      return res.status(200).json(user);
    } else {
      return res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured, please try again later");
  }
});

app.post("/password/update", verify, async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    if (!(username && oldPassword)) {
      return res.status(400).send("Missing Input");
    }
    const oldUser = await dbHandler.readUserDetail(username);

    if (!oldUser) {
      return res.status(409).send("User doesn't exist. Please register.");
    }

    if (kitchen.compareSeason(oldUser.saltedHash, oldUser.salt, oldPassword)) {
      const user = {
        username: username,
      };

      const saltedpassword = kitchen.newSeason(newPassword);

      const updateResult = await dbHandler.updateUserDetail(
        username,
        saltedpassword.salt,
        saltedpassword.seasonedFood
      );

      const token = jwt.sign({ username: username }, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      });

      res.setHeader("jwt-token", token);
      res.setHeader("Access-Control-Expose-Headers", "jwt-token");
      return res.status(200).json(user);
    } else {
      return res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured, please try again later");
  }
});

app.get("/authenticate", verify, async (req, res) => {
  return res.status(200).send("Verified Token");
});
