/*
 * The course management endpoint. To be used at students/courseManagement
 */
const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const Student = require('../models/studentModel.js');
const StudentCoursesLink = require('../models/studentCoursesLinkModel.js');
const Course = require('../models/courseModel.js');

// Add course to student (takes student id as param, course id in request body)
router.post('/:id', (req, res) => {
  const studentId = req.params.id,
    courseId = '"' + req.body.courseId + '"',
    courseTable = Course.tableName,
    studentTable = Student.tableName;
  // Basically, insert both courseId and the ID column of student into the table
  // Ensure they are = to the passed in body of request with the INSERT INTO SELECT statement
  // Looks scarier than it is, can a join improve this?
  db.getPool().query(
    `INSERT INTO ${StudentCoursesLink.tableName} (coursePriId,studentPriId)
    SELECT courses.Id, students.Id FROM ${courseTable} AS courses,${studentTable} AS students WHERE
     students.Id = ${studentId} AND courses.courseId = ${courseId}`,
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) res.status(204).send(result);
      else res.status(201).send({ studentId: studentId, courseId: req.body.courseId });
    }
  );
});

// Delete course from student (takes student id from param, course id from request body)
router.delete('/:id', (req, res) => {
  const studentId = req.params.id,
    courseId = '"' + req.body.courseId + '"',
    linkTable = StudentCoursesLink.tableName,
    courseTable = Course.tableName;
  db.getPool().query(
    `DELETE link FROM ${linkTable} as link INNER JOIN ${courseTable} as courses
    ON link.coursePriId = courses.Id WHERE
  link.studentPriId = ${studentId} AND courses.courseId = ${courseId}`,
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) res.status(404).send();
      else res.status(204).send();
    }
  );
});

// Delete all courses for all students
router.delete('/', (_, res) => {
  db.deleteAll(StudentCoursesLink.tableName, (result) => {
    if (result.affectedRows === 0) res.status(404).send();
    else res.status(204).send();
  });
});

// Get all links between courses and students
router.get('/', (_, res) => {
  db.getAll(StudentCoursesLink.tableName, (result) => {
    if (result.length === 0) res.status(204).send();
    else res.send(result);
  });
});

// Get list of student's courses by student id
router.get('/:id', (req, res) => {
  const studentId = req.params.id,
    linkTable = StudentCoursesLink.tableName,
    coursesTable = Course.tableName;
  db.getPool().query(
    `SELECT courses.* FROM ${coursesTable} as courses, ${linkTable} as link WHERE 
  link.studentPriId = ${studentId} AND link.coursePriId = courses.Id`,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) res.status(204).send();
      else res.send(result);
    }
  );
});

module.exports = router;
