/**
 * The course model, containing info about a single course
 */
class Course {
  /**
   * Creates a course with given config
   * @param {Course} config The object whose properties will be set to the matching instance properties
   */
  constructor(config = {}) {
    this.name = config.name || '';
    this.courseId = config.courseId || 'WAT420';
    this.credits = config.credits || 1;
    this.cost = config.cost || 0.0;
    this.description = config.description || '';
  }

  static tableName = 'courses';

  // The statement to create the courses table
  static createStatement = `CREATE TABLE IF NOT EXISTS ${Course.tableName}(
      Id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      Name VARCHAR(255),
      CourseId CHAR(6) NOT NULL DEFAULT "WAT420" CHECK (LENGTH(CourseId) = 6),
      Credits TINYINT NOT NULL DEFAULT 1,
      Cost DECIMAL(6,2) NOT NULL DEFAULT 0.00,
      Description TEXT
      )`;
}

module.exports = Course;
