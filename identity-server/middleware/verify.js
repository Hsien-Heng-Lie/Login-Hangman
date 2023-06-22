const jwt = require("jsonwebtoken");
require("dotenv").config({ path: '../../.env' });

const verifyToken = (req, res, next) => {
  req.headers["jwt-token"];

  if (!token) {
    return res.status(403).send("No Token Found");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;