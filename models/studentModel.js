/**
 * The student model, containing info about a student
 */
class Student {
  /**
   * Creates a student with given config
   * @param {Student} config The object whose properties will be set to the matching instance properties
   */
  constructor(config = {}) {
    this.fName = config.fName || '';
    this.lName = config.lName || '';
    this.year = config.year || 1;
    this.gpa = config.gpa || 4.0;
    this.credits = config.credits || 0;
    this.studentId = config.studentId || -1;
  }
  static tableName = 'students';

  // The statement to create the students table
  static createStatement = `CREATE TABLE IF NOT EXISTS ${Student.tableName}(
      Id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      Fname VARCHAR(255),
      Lname VARCHAR(255),
      Year TINYINT NOT NULL DEFAULT 1,
      Gpa DECIMAL(3,2) NOT NULL DEFAULT 4.00,
      Credits SMALLINT NOT NULL DEFAULT 0,
      StudentId BIGINT NOT NULL DEFAULT -1
      )`;
}

module.exports = Student;
