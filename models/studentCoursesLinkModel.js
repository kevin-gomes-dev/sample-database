const Student = require('./studentModel.js');
const Course = require('./courseModel.js');

/**
 * This will handle associating the courses and students together in a many-to-many relationship.
 * One student can have many courses.
 * One course can have (be taken by) many students.
 * No constructor since this only serves to link tables together, not contain data
 */
class StudentCoursesLink {
  /**
   * The name of the table
   */
  static tableName = 'studentCoursesLink';

  /**
   * The SQL create table statement, defining all keys, data types, and columns
   */
  static createStatement = `CREATE TABLE IF NOT EXISTS ${this.tableName} (
  StudentPriId BIGINT,
  CoursePriId BIGINT,
  CONSTRAINT
    FOREIGN KEY (StudentPriId) REFERENCES ${Student.tableName}(Id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT
    FOREIGN KEY (CoursePriId) REFERENCES ${Course.tableName}(Id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  PRIMARY KEY (StudentPriId,CoursePriId)
  )`;
}

module.exports = StudentCoursesLink;
