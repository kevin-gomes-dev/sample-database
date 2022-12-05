const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const Course = require('../models/courseModel.js');
// Start API requests

// Get all courses
router.get('/', (_, res) => {
  db.getAll(Course.tableName, (result) => {
    if (result.length === 0) res.status(204).send();
    else res.send(result);
  });
});

// Get course by id
router.get('/:id', (req, res) => {
  db.getById(Course.tableName, req.params.id, (result) => {
    if (result.length === 0) res.status(204).send();
    else res.send(result);
  });
});

// Add a course to DB
router.post('/', (req, res) => {
  db.insert(Course.tableName, req.body, (_, newCourse) => {
    res.status(201).send(new Course(newCourse));
  });
});

// Delete by id
router.delete('/:id', (req, res) => {
  const condition = `ID = ${req.params.id}`;
  db.delete(Course.tableName, condition, (result) => {
    if (result.affectedRows === 0) res.status(404).send();
    else res.status(204).send();
  });
});

// Delete all courses
router.delete('/', (_, res) => {
  db.deleteAll(Course.tableName, (result) => {
    if (result.affectedRows === 0) res.status(404).send();
    else res.status(204).send();
  });
});

// Updates a course
router.put('/:id', (req, res) => {
  const data = req.body;
  const condition = `ID = ${req.params.id}`;
  db.update(Course.tableName, data, condition, (result) => {
    if (result.changedRows === 0) res.status(204).send();
    else res.send(result);
  });
});

module.exports = router;
