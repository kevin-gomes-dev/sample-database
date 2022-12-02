// TODO: Fix CREATE TABLE so that it uses the connection's table. Possibly add to pool or don't use pool?
/**
 * A script to help setup databases and related tables. Run first before anything
 */
const mysql = require('mysql2')

// The database we create. Change to the name of the database
const database = process.env.DATABASE

// Connect to mysql using environment variables.
const con = mysql.createConnection({
  host: 'localhost',
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '',
  database: null,
})

/**
 * Create database and change connection to use this database.
 * Calls all other create table functions as well after created since they can
 * only be done after database is created and being used in connection
 */
function createDatabase() {
  con.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (err, result) => {
    if (err) throw err
    // If we're here, we created db or already had it
    console.log(`Done creating database (if it didn't already exist)`)
    con.changeUser({ database: database })
    createStudents()
  })
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
  // Log database from config to ensure it's the one we use
  console.log(`Database to use: ${con.config.database}`)
  con.query(
    `CREATE TABLE IF NOT EXISTS students(
      Id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      Fname VARCHAR(255),
      Lname VARCHAR(255),
      Year TINYINT NOT NULL DEFAULT 1,
      Gpa DECIMAL(3,2) NOT NULL DEFAULT 4.00,
      Credits SMALLINT NOT NULL DEFAULT 0,
      StudentId BIGINT NOT NULL DEFAULT -1
      )`,
    (err) => {
      if (err) throw err
      console.log(`Done creating students table (if it didn't already exist)`)
      con.end()
    }
  )
}

createDatabase()
