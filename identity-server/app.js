const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config({ path: '../.env' });
const dbHandler = require("./dbHandler");
const kitchen = require("./kitchen");

const app = express();
const port = process.env.Identity_Server_API_PORT;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// Register
app.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!(password && userName)) {
      return res.status(400).send("Missing Input");
    }

    // check if already exist
    const oldUser = await dbHandler.readUserDetail('john');

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const saltedpassword = kitchen.newSeason(password);

    // Create user in our database
    const insertResult = await dbHandler.insertUserDetail(userName, saltedpassword.salt, saltedpassword.seasonedFood);
    
    const user = {
      userName: userName
    }

    // Create token
    const token = jwt.sign(
      { userName: userName },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  });
  
  // Login
  app.post("/login", (req, res) => {
  // TODO
  });




