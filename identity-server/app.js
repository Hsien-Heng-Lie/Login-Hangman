const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
const dbHandler = require("./database/dbHandler");
const kitchen = require("./kitchen/kitchen");
const verify = require("./middleware/verify");

const app = express();
const port = process.env.Identity_Server_API_PORT;

app.use(bodyParser.json());

app.use('*', (req, _, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!(password && userName)) {
      return res.status(400).send("Missing Input");
    }

    const oldUser = await dbHandler.readUserDetail(userName);

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const saltedpassword = kitchen.newSeason(password);

    const insertResult = await dbHandler.insertUserDetail(userName, saltedpassword.salt, saltedpassword.seasonedFood);
    
    const user = {
      userName: userName
    };

    const token = jwt.sign(
      { userName: userName },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.setHeader("jwt-token",token);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  });
  
app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!(userName && password)) {
      res.status(400).send("Missing Input");
    }
    const oldUser = await dbHandler.readUserDetail(userName);

    if (!oldUser) {
      return res.status(409).send("User Doesn't Exist. Please Register");
    }

    if(kitchen.compareSeason(oldUser.saltedHash, oldUser.salt, password)){

      const user = {
        userName: userName
      };

      const token = jwt.sign(
        { userName: userName },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      res.setHeader("jwt-token",token);
      res.status(200).json(user);
    }
    else{
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/authenticate", verify, async (req, res) => {
  const token = req.headers["jwt-token"];
  res.setHeader("jwt-token",token);
  return res.status(200).send("Welcome");
});