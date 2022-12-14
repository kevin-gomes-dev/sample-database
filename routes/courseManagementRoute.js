/*
 * The course management endpoint. To be used at students/courseManagement
 */
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js'),
  Student = require('../models/studentModel.js'),
  StudentCoursesLink = require('../models/studentCoursesLinkModel.js'),
  Course = require('../models/courseModel.js');

// Add course to student (takes student id as param, course id in request body)
router.post('/:id', async (req, res) => {
  const studentId = req.params.id,
    courseId = '"' + req.body.courseId + '"',
    courseTable = Course.tableName,
    studentTable = Student.tableName;
  // Basically, insert both courseId and the ID column of student into the table
  // Ensure they are = to the passed in body of request with the INSERT INTO SELECT statement
  // Looks scarier than it is, can a join improve this?
  const result = await new Promise((resolve, reject) => {
    db.getPool().query(
      `INSERT INTO ${StudentCoursesLink.tableName} (coursePriId,studentPriId)
    SELECT courses.Id, students.Id FROM ${courseTable} AS courses,${studentTable} AS students WHERE
     students.Id = ${studentId} AND courses.courseId = ${courseId}`,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
  if (result.affectedRows === 0) res.status(204).send(result);
  else res.status(201).send({ studentId: studentId, courseId: req.body.courseId });
});

// Delete course from student (takes student id from param, course id from request body)
router.delete('/:id', async (req, res) => {
  const studentId = req.params.id,
    courseId = '"' + req.body.courseId + '"',
    linkTable = StudentCoursesLink.tableName,
    courseTable = Course.tableName;
  const result = await new Promise((resolve, reject) => {
    db.getPool().query(
      `DELETE link FROM ${linkTable} as link INNER JOIN ${courseTable} as courses
    ON link.coursePriId = courses.Id WHERE
  link.studentPriId = ${studentId} AND courses.courseId = ${courseId}`,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
  if (result.affectedRows === 0) res.status(404).send();
  else res.status(204).send();
});

// Delete all courses for all students
router.delete('/', async (_, res) => {
  await db.deleteAll(StudentCoursesLink.tableName, (result) => {
    if (result.affectedRows === 0) res.status(404).send();
    else res.status(204).send();
  });
});

// Get all links between courses and students
router.get('/', async (_, res) => {
  const result = await db.getAll(StudentCoursesLink.tableName);
  if (result.length === 0) res.status(204).send();
  else res.send(result);
});

// Get list of student's courses by student id
router.get('/:id', async (req, res) => {
  const studentId = req.params.id,
    linkTable = StudentCoursesLink.tableName,
    coursesTable = Course.tableName;
  const result = await new Promise((resolve, reject) => {
    db.getPool().query(
      `SELECT courses.* FROM ${coursesTable} as courses, ${linkTable} as link WHERE 
  link.studentPriId = ${studentId} AND link.coursePriId = courses.Id`,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
  console.log(result);
  if (result.length === 0) res.status(204).send();
  else res.send(result);
});

module.exports = router;
