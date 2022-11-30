/**
 * This file will be for managing connections to database. This is for running automated tests
 * as well as when we need to modify the db without manually creating a connection everytime.
 * Most of this code was gotten and modified from:
 * https://www.terlici.com/2015/08/13/mysql-node-express.html
 */
const mysql = require("mysql2");

// The 2 databases. Test for testing, prod for the actual data
const PRODUCTION_DB = process.env.database || "sample_database",
  TEST_DB = "test_sample_database";

// The two kinds of modes we can be in
exports.MODE_TEST = "mode_test";
exports.MODE_PRODUCTION = "mode_production";

// The state of our DB
const state = {
  pool: null,
  mode: null,
};

/**
 * Makes the state's pool for the database connection. This is so we don't have to create a new
 * connection every time we want to communicate to the database
 * @param {string} mode Which mode we want to be in, using the enumerable
 * @param {Function} done The callback function once we are done creating the pool
 */
exports.connect = function (mode, done) {
  state.pool = mysql.createPool({
    host: "localhost",
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB,
  });
  state.mode = mode;
  done();
};

/**
 * Simply gets our pool
 * @returns {mysql.Pool} The state's pool (the connection)
 */
exports.get = function () {
  return state.pool;
};

/**
 * Adds data from the JSON data param. Mainly for testing. Structure is as follows:
 * {tables: {
 *    students: [
 * {id: 1, fname: james, ...},
 * {...},
 *  ],
 *    anotherTable: [{...},{...},...],
 *  },
 * }
 * @param {JSON} data The JSON data we wish to insert into the database
 * @param {Function} done The function to call when we are all done
 */
exports.fixtures = function (data, done) {
  const pool = state.pool;
  if (!pool) return done(new Error("Missing database connection."));
  const names = Object.keys(data.tables);
  names.forEach(function (name, cb) {
    data.tables[name].forEach(function (row, cb) {
      const keys = Object.keys(row),
        values = keys.map(function (key) {
          return "'" + row[key] + "'";
        });

      pool.query(
        "INSERT INTO " +
          name +
          " (" +
          keys.join(",") +
          ") VALUES (" +
          values.join(",") +
          ")",
        cb
      );
    }, cb);
  }, done);
};

/**
 * Drops all data from all tables given
 * @param {Array} tables The list of tables we will drop all data from
 * @param {Function} done The callback when we are finished
 */
exports.drop = function (tables, done) {
  const pool = state.pool;
  if (!pool) return done(new Error("No database connection in pool"));

  // For every table, delete everything, and then call the callback
  tables.forEach((table, callBack) => {
    pool.query(`DELETE FROM ${table}`, callBack);
  }, done);
};

/**
 * Returns all data from the given table in an Array (guaranteed unique with Primary Key)
 * @param {String} table The name of the table we will get data from
 * @returns {Array} All the items in the table
 */
exports.getAll = function(table) {
  const pool = state.pool;
  return pool.query(`SELECT FROM ${table}`);
}
/**
 * Adds an item defined by the body into the database on given table.
 * It's expected you handle validation before calling this
 * @param {String} table The name of the table we insert into
 * @param {JSON} body The JSON we wish to add
 */
exports.add = function(table, body) {
  
}
