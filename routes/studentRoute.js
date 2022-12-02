/**
 * The student router. To be used at endpoint /student
 */
const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

// Get all students
router.get('/', (req, res) => {
  const pool = db.get();
  pool.query(`SELECT * FROM students`, (err, result) => {
    if (err) throw err;
    if (result.length === 0) res.status(204).send();
    else res.send(result);
  });
});

// Get student by id
router.get('/:id', (req, res) => {
  const pool = db.get();
  pool.query(
    `SELECT * FROM students WHERE ID = ${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) res.status(204).send();
      else res.send(result);
    }
  );
});

// Add a student
router.post('/', (req, res) => {
  db.add('students', req.body, (result) => res.status(201).send(result));
});

// Delete a student by id
router.delete('/:id', (req, res) => {
  const pool = db.get();
  pool.query(
    `DELETE FROM students WHERE ID = ${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) res.status(404).send();
      else res.status(204).send();
    }
  );
});

// Delete all students (no turning back!)
router.delete('/', (req, res) => {
  db.deleteAll('students', (result) => {
    if (result.affectedRows === 0) res.status(404).send();
    else res.status(204).send();
  });
});

// Update a student by id
router.put('/:id', (req, res) => {
  const data = req.body;
  const condition = `ID = ${req.params.id}`;
  db.update('students', data, condition, (result) => {
    if (result.changedRows === 0) res.status(204).send();
    else res.send(result);
  });
});

module.exports = router;
