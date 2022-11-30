/**
 * The student router. To be used at endpoint /student
 */
const express = require("express");
const router = express.Router();

// Get all students
router.get("/", (req, res) => {
  res.send("GET request (no functionality)");
});

// Add a student to database
router.post("/", (req, res) => {
  console.log(req.body);
  res.send(
    `POST request (no functionality). Your request headers: ${JSON.stringify(
      req.headers
    )}`
  );
});

module.exports = router;
