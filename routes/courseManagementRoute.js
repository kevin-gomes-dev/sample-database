/*
 * The course management endpoint. To be used at students/courseManagement
 */
const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const Student = require('../models/studentModel.js');
const StudentCoursesLink = require('../models/studentCoursesLinkModel.js');
const Course = require('../models/courseModel.js');

//TODO: Use param for id
//TODO: Add missing requests

// Add course to student (takes student id, course id in request body)
router.post('/', (req, res) => {
  const studentId = req.body.studentId || req.body.id,
    courseId = '"' + req.body.courseId + '"',
    courseTable = Course.tableName,
    studentTable = Student.tableName;
  // Basically, insert both courseId and the ID column of student into the table
  // Ensure they are = to the passed in body of request with the INSERT INTO SELECT statement
  // Looks scarier than it is
  db.getPool().query(
    `INSERT INTO ${StudentCoursesLink.tableName} (coursePriId,studentPriId)
     SELECT ${courseTable}.Id, ${studentTable}.Id FROM ${courseTable},${studentTable} WHERE
  ${courseTable}.CourseId = ${courseId} AND ${studentTable}.Id = ${studentId}`,
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) res.status(201).send(req.body);
    }
  );
});

// Add list of courses to student (takes student id, list of courses)

// Delete course from student (takes student id, course id)

// Delete list of courses from student (takes student id, list of courses)

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

module.exports = router;
