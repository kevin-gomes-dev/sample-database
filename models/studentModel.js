class Student {
  // The statement to create the students table
  static createStatement = `CREATE TABLE IF NOT EXISTS students(
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
