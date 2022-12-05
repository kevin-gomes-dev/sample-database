class Student {
  /**
   * Creates a student with given config
   * @param {*} studentProps The object whose properties will be set to the matching instance properties
   */
  constructor(studentProps = {}) {
    this.fName = studentProps.fName || null;
    this.lName = studentProps.lName || null;
    this.year = studentProps.year || 1;
    this.gpa = studentProps.gpa || 4.0;
    this.credits = studentProps.credits || 0;
    this.studentId = studentProps.studentId || -1;
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
