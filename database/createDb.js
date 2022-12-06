/*
 * A script to help setup databases and related tables. Run first before anything
 */
const mysql = require('mysql2');
const Student = require('../models/studentModel.js');
const Course = require('../models/courseModel.js');
const StudentCoursesLink = require('../models/studentCoursesLinkModel.js');

// The database we create. Change to the name of the database
const database = process.env.DATABASE;

// Connect to mysql using environment variables.
const con = mysql.createConnection({
  host: 'localhost',
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '',
  database: null,
});

/**
 * Create database and change connection to use this database.
 * Calls all other create table functions as well after created since they can
 * only be done after database is created and being used in connection
 */
function createDatabase() {
  con.beginTransaction((err) => {
    if (err) throw err;
    con.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err) => {
      if (err) {
        con.rollback(() => {
          throw err;
        });
      }
      // If we're here, we created db or already had it
      con.changeUser({ database: database });
      console.log(`Done creating database (if it didn't already exist): ${con.config.database}`);
      createStudents();
    });
  });
}

/**
 * Creates our students table. Check createStatement to see properties
 */
function createStudents() {
  con.query(Student.createStatement, (err) => {
    if (err) {
      con.rollback(() => {
        throw err;
      });
    }
    doneCreatingTable('student');
    createCourses();
  });
}

/**
 * Creates our courses table. Check createStatement to see properties
 */
function createCourses() {
  con.query(Course.createStatement, (err) => {
    if (err) {
      con.rollback(() => {
        throw err;
      });
    }
    doneCreatingTable('courses');
    createStudentCoursesLink();
  });
}

/**
 * Creates our StudentCoursesLink table. Check createStatement to see properties
 */
function createStudentCoursesLink() {
  con.query(StudentCoursesLink.createStatement, (err) => {
    if (err) throw err;
    doneCreatingTable('studentCoursesLink');
    con.commit((err) => {
      if (err) {
        con.rollback(() => {
          throw err;
        });
      }
    });
    console.log(`Committed all tables to database`);
    con.end();
  });
}

/**
 * Helper to log when done creating tables
 * @param {String} table The name of the table
 */
function doneCreatingTable(table) {
  console.log(`Done creating ${table} table (if it didn't already exist)`);
}
createDatabase();
