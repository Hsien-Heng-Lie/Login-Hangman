require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const path = process.env.Identity_Server_Base_Url + "/authenticate";
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "text/html",
      "jwt-token": req.headers["jwt-token"]   
    }
  });

  const statusCode = response.status;
  if (statusCode === 200) {
    return next();
  } else if (statusCode === 401 || statusCode === 403) {
    return res.redirect(statusCode, "/login");
  }
  else{
    return res.redirect(statusCode, "/login");
  }
};


module.exports = authenticateToken;