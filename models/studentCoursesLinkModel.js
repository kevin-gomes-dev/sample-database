const Student = require('./studentModel.js');
const Course = require('./courseModel.js');

/**
 * This will handle associating the courses and students together in a many-to-many relationship.
 * One student can have many courses.
 * One course can have (be taken by) many students.
 * No constructor since this only serves to link tables together, not contain data
 */
class StudentCoursesLink {
  static tableName = 'studentCoursesLink';

  static createStatement = `CREATE TABLE IF NOT EXISTS ${this.tableName} (
  StudentPriId BIGINT,
  CoursePriId BIGINT,
  FOREIGN KEY (StudentPriId) REFERENCES ${Student.tableName}(Id),
  FOREIGN KEY (CoursePriId) REFERENCES ${Course.tableName}(Id),
  PRIMARY KEY (StudentPriId,CoursePriId)
  )`;
}

module.exports = StudentCoursesLink;
