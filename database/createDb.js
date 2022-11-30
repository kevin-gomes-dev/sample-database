/**
 * This file is only used for creating and deleting the database. May be deprecated
 * if there is a better way found to do this
 */
const mysql = require("mysql2");
// Connect to DB using environment variables.
const con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || 'sample_database',
});

/**
 * A test function to create our database
 */
function createDatabase() {
  con.connect((err) => {
    if (err) throw err;
    console.log(`Connected to MySQL with host: ${con.config.host}`);
    con.query(`CREATE DATABASE ${process.env.DATABASE}`, (err, result) => {
      if (err) throw err;
      console.log(`Database created`);
    });
  });
}

/**
 * A test function to delete our database
 */
function deleteDatabase() {
  con.connect((err) => {
    if (err) throw err;
    console.log(`Connected to MySQL with host: ${con.config.host}`);
    con.query(`DROP DATABASE ${process.env.DATABASE}`, (err, result) => {
      if (err) throw err;
      console.log("Database deleted (dropped)");
    });
  });
}

/**
 * A test function to create a students table, clearly not going to stay
 */
function createStudents() {
  con.connect((err) => {
    if (err) throw err;
    console.log(`Connected to MySQL with host: ${con.config.host}`);
    con.query(
      `CREATE TABLE students(ID INT PRIMARY KEY, fname varchar(255))`,
      (err) => {
        if (err) throw err;
        console.log("Done creating table");
      }
    );
  });
}
