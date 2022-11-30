/**
 * The main place to setup serving files, what requests do what, and determining routing
 */
const db = require("./db.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const student = require("./routes/student.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = parseInt(process.env.PORT) || 3000;

app.use(express.static("public"));
app.use("/about", express.static("public/about.html"));
app.use("/student", student);

// For invalid endpoints
app.get("*", (req, res) => {
  res.send("Error 404: Invalid endpoint (check URL)");
});

// Start server on given port as well as db connection
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  db.connect(db.MODE_PRODUCTION, () => {
    console.log(`Connected to database`);
  });
});
