/**
 * The student router. To be used at endpoint /student
 */
const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Get all students
router.get("/", (req, res) => {
  const pool = db.get();
  pool.query(`SELECT * FROM students`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Add a student to database
router.post("/", (req, res) => {
  console.log(req.body);
  res.send(db.add("students", req.body));
});

module.exports = router;
