/*
 * This file will be for managing connections to database. This is for running automated tests
 * as well as when we need to modify the db without manually creating a connection everytime.
 * Pooling code was adapted from
 * https://www.terlici.com/2015/08/13/mysql-node-express.html
 */
const mysql = require('mysql2');

// The 2 databases. Test for testing, prod for the actual data
const PRODUCTION_DB = process.env.database || 'sample_database',
  TEST_DB = 'test_' + process.env.database || 'test_sample_database';

// The two kinds of modes we can be in
exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

// The state of our DB
const state = {
  pool: null,
  mode: null,
};

/**
 * Makes the state's pool for the database connection. This is so we don't have to create a new
 * connection every time we want to communicate to the database.
 * Default mode is MODE_TEST
 * @param {String} mode Which mode we want to be in, using the enumerable
 * @param {Function} done The callback function once we are done creating the pool, gives state
 */
exports.connect = function (mode = MODE_TEST, done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB,
  });
  state.mode = mode;
  done(state);
};

/**
 * Simply gets our pool
 * @returns {mysql.Pool} The state's pool (the connection)
 */
exports.getPool = function () {
  return state.pool;
};

/**
 * Deletes all data from table given.
 * @param {String} table The table we will delete data from
 * @returns {Promise} The result of the query if no error
 */
exports.deleteAll = function (table) {
  return new Promise((resolve, reject) => {
    const pool = state.pool;
    if (!pool) reject(new Error('No database connection in pool'));
    pool.query(`DELETE FROM ${table}`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

/**
 * Gets all data in a given table.
 * @param {String} table The name of the table we want to get everything from
 * @returns {Promise} The result of the query if no error
 */
exports.getAll = function (table) {
  return new Promise((resolve, reject) => {
    const pool = state.pool;
    if (!pool) reject(new Error('No database connection in pool'));
    pool.query(`SELECT * FROM ${table}`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

/**
 * Gets by specific id.
 * @param {String} table The name of the table
 * @param {Number} id The id we want to filter by
 * @returns {Promise} The result of the query if no error
 */
exports.getById = function (table, id = -1) {
  return new Promise((resolve, reject) => {
    const pool = state.pool;
    if (!pool) reject(new Error('No database connection in pool'));
    pool.query(`SELECT * FROM ${table} WHERE ID = ${id}`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

/**
 * Deletes specific entry or entries from the table passed, determined by the conditioned passed.
 * @param {String} table The table we will delete data from
 * @param {String} condition The SQL condition to use to determine what to delete
 * @returns {Promise} The result of the query if no error
 */
exports.delete = function (table, condition = 'ID = -1') {
  return new Promise((resolve, reject) => {
    const pool = state.pool;
    if (!pool) reject(new Error('No database connection in pool'));
    pool.query(`DELETE FROM ${table} WHERE ${condition}`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

/**
 * Inserts an item defined by the body into the given table.
 * It's expected you handle validation of the body before calling this, should be used for POST.
 * It's also expected that the body matches the table structure exactly.
 * @param {String} table The name of the table we insert into
 * @param {*} body The JSON data we wish to add
 * @returns {Promise} The result of the query if no error
 */
exports.insert = function (table, body = {}) {
  return new Promise((resolve, reject) => {
    const pool = state.pool;
    if (!pool) reject(new Error('No database connection in pool'));
    const cols = Object.keys(body);
    // For each column, we get the value
    const values = cols.map((col) => "'" + body[col] + "'");
    pool.query(
      `INSERT INTO ${table} (${cols.join(',')}) VALUES (${values.join(',')})`,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

/**
 * This updates a table in the database with given condition, table, and data.
 * Condition is expected to be an SQL query (ex: WHERE ID = 4).
 * @param {String} table The name of the table we are updating
 * @param {*} body The JSON data containing student info we want to update
 * @param {String} condition The SQL condition to be placed after WHERE
 * @returns {Promise} The result of the query if no error
 */
exports.update = function (table, body = {}, condition) {
  return new Promise((resolve, reject) => {
    const pool = state.pool;
    if (!pool) reject(new Error('No database connection in pool'));
    const cols = Object.keys(body);
    // Make the SET col = value, ... pairs here, separated by comma except the last item
    const setPairs = cols.map((col) => `${col} = "${body[col]}"`).join(',');
    pool.query(`UPDATE ${table} SET ${setPairs} WHERE ${condition}`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
