/*
 * The student router. To be used at endpoint /students
 */
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js'),
  Student = require('../models/studentModel.js');

// Get all students
router.get('/', async (_, res) => {
  const result = await db.getAll(Student.tableName);
  if (result.length === 0) res.status(204).send();
  else res.send(result);
});

// Get student by id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!parseInt(id)) return next();
  const result = await db.getById(Student.tableName, id);
  if (result.length === 0) res.status(204).send();
  else res.send(result);
});

// Add a student
router.post('/', async (req, res) => {
  await db.insert(Student.tableName, req.body);
  res.status(201).send(new Student(req.body));
});

// Delete a student by id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!parseInt(id)) return next();
  const condition = `ID = ${req.params.id}`;
  const result = await db.delete(Student.tableName, condition);
  if (result.affectedRows === 0) res.status(404).send();
  else res.status(204).send();
});

// Delete all students
router.delete('/', async (_, res) => {
  const result = await db.deleteAll(Student.tableName);
  if (result.affectedRows === 0) res.status(404).send();
  else res.status(204).send();
});

// Update a student by id
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!parseInt(id)) return next();
  const data = req.body,
    condition = `ID = ${req.params.id}`;
  const result = await db.update(Student.tableName, data, condition);
  if (result.changedRows === 0) res.status(204).send();
  else res.send(result);
});

module.exports = router;
