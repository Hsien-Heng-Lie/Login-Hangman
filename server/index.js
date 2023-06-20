// basic express server
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("client/html"));
app.use(express.static("client/css"));
app.use(express.static("client/js"));

// Route for root URL to redirect to login page
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
