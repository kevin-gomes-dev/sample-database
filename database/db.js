/**
 * This file will be for managing connections to database. This is for running automated tests
 * as well as when we need to modify the db without manually creating a connection everytime.
 * Most of this code was gotten and modified from:
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
 * @param {string} mode Which mode we want to be in, using the enumerable
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
exports.fixtures = function (data = {}, done) {
  const pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));
  const names = Object.keys(data.tables);
  names.forEach(function (name, cb) {
    data.tables[name].forEach(function (row, cb) {
      const keys = Object.keys(row),
        values = keys.map(function (key) {
          return "'" + row[key] + "'";
        });

      pool.query(
        'INSERT INTO ' +
          name +
          ' (' +
          keys.join(',') +
          ') VALUES (' +
          values.join(',') +
          ')',
        cb
      );
    }, cb);
  }, done);
};

/**
 * Deletes all data from table given
 * @param {String} table The table we will delete data from
 * @param {Function} done The callback when we are finished
 */
exports.deleteAll = function (table, done) {
  const pool = state.pool;
  if (!pool) return done(new Error('No database connection in pool'));
  pool.query(`DELETE FROM ${table}`, (err, result) => {
    if (err) throw err;
    done(result);
  });
};

/**
 * Adds an item defined by the body into the database on given table.
 * It's expected you handle validation before calling this, should be used for POST.
 * It's also expected that the body matches the table structure exactly
 * @param {String} table The name of the table we insert into
 * @param {JSON} body The JSON we wish to add
 * @param {Function} done The callback when we are done
 */
exports.add = function (table, body, done) {
  const pool = state.pool;
  const cols = Object.keys(body);
  // For each column, we get the value
  const values = cols.map((col) => "'" + body[col] + "'");
  pool.query(
    `INSERT INTO ${table} (${cols.join(',')}) VALUES (${values.join(',')})`,
    (err, result) => {
      if (err) throw err;
      done(result);
    }
  );
};

/**
 * This updates a table in the database with given condition, table, and data.
 * Condition is expected to be an SQL query (ex: WHERE ID = 4)
 * @param {String} table The name of the table we are updating
 * @param {JSON} body The JSON containing student info we want to update
 * @param {String} condition The SQL condition to be placed after WHERE
 * @param {Function} done The callback when we are done
 */
exports.update = function (table, body, condition, done) {
  const pool = state.pool;
  const cols = Object.keys(body);
  // Make the SET col = value, ... pairs here, separated by comma except the last item
  const setPairs = cols.map((col) => `${col} = "${body[col]}"`).join(',');
  pool.query(
    `UPDATE ${table} SET ${setPairs} WHERE ${condition}`,
    (err, result) => {
      if (err) throw err;
      done(result);
    }
  );
};
