/**
 * This file will be for managing connections to database. This is for running automated tests
 * as well as when we need to modify the db without manually creating a connection everytime
 */
const mysql = require("mysql2");
const PRODUCTION_DB = "app_prod_database",
  TEST_DB = "app_test_database";
