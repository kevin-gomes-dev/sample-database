/**
 * The main place to setup serving files, what requests do what, and determining routing
 */
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use("/about", express.static("public/about.html"));

// For invalid endpoints
app.get("*", (req, res) => {
  res.send("Error 404: Invalid endpoint (check URL)");
});

// Start server on given port
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
