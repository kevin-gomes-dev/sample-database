/*
 * The student router. To be used at endpoint /courses
 */
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js'),
  Course = require('../models/courseModel.js');
// Start API requests

// Get all courses
router.get('/', async (_, res) => {
  const result = await db.getAll(Course.tableName);
  if (result.length === 0) res.status(204).send();
  else res.send(result);
});

// Get course by id
router.get('/:id', async (req, res) => {
  const result = await db.getById(Course.tableName, req.params.id);
  if (result.length === 0) res.status(204).send();
  else res.send(result);
});

// Add a course to DB
router.post('/', async (req, res) => {
  await db.insert(Course.tableName, req.body);
  res.status(201).send(new Course(req.body));
});

// Delete by id
router.delete('/:id', async (req, res) => {
  const condition = `ID = ${req.params.id}`;
  const result = await db.delete(Course.tableName, condition);
  if (result.affectedRows === 0) res.status(404).send();
  else res.status(204).send();
});

// Delete all courses
router.delete('/', async (_, res) => {
  const result = await db.deleteAll(Course.tableName);
  if (result.affectedRows === 0) res.status(404).send();
  else res.status(204).send();
});

// Updates a course
router.put('/:id', async (req, res) => {
  const data = req.body,
    condition = `ID = ${req.params.id}`;
  const result = await db.update(Course.tableName, data, condition);
  if (result.changedRows === 0) res.status(204).send();
  else res.send(result);
});

module.exports = router;
