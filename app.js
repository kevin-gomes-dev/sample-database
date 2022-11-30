/**
 * The main place to setup serving files, what requests do what, and determining routing
 */
const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const student = require(path.join(__dirname, "/routes/student.js"));

const con = mysql.createConnection({
  // Connect to DB using environment variables. Eventually this will be in db.js
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

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
  con.connect((err) => {
    if (err) throw err;
    console.log(
      `Connected to database: ${con.config.database} with host: ${con.config.host}`
    );
  });
});
