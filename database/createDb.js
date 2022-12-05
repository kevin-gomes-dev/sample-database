/**
 * A script to help setup databases and related tables. Run first before anything
 */
const mysql = require('mysql2');
const Student = require('../models/studentModel.js');
const Course = require('../models/courseModel.js');

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
  con.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err) => {
    if (err) throw err;
    // If we're here, we created db or already had it
    con.changeUser({ database: database });
    console.log(
      `Done creating database (if it didn't already exist): ${con.config.database}`
    );
    createStudents();
  });
}

/**
 * Creates our students table.
 *  ID (PRI)
 *  FName
 *  LName
 *  Year
 *  Gpa
 *  Credits
 *  Courses [] (Must have courses table)
 *  StudentId
 */
function createStudents() {
  con.query(Student.createStatement, (err) => {
    if (err) throw err;
    console.log(`Done creating students table (if it didn't already exist)`);
    createCourses();
  });
}

/**
 * Creates our courses table
 * ID (PRI)
 * Name
 * CourseId
 * Credits
 * Cost
 * Description
 */
function createCourses() {
  con.query(Course.createStatement, (err) => {
    if (err) throw err;
    console.log(`Done creating courses table (if it didn't already exist)`);
    con.end();
  });
}

createDatabase();
