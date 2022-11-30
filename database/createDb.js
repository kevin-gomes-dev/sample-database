/**
 * This file is only used for creating and deleting the database. May be deprecated
 * if there is a better way found to do this
 */
const mysql = require("mysql2");
// Connect to DB using environment variables.
const con = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
});

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

// Delete the database if it exists, then create one.
// createDatabase();
