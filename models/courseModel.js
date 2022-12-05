class Course {
  /**
   * Creates a course with given config
   * @param {*} courseProps The object whose properties will be set to the matching instance properties
   */
  constructor(courseProps) {
    this.name = courseProps.name || null;
    this.courseId = courseProps.courseId || 'WAT420';
    this.credits = courseProps.credits || 1;
    this.cost = courseProps.cost || 0.0;
    this.description = courseProps.description || null;
  }

  static tableName = 'courses';

  // The statement to create the students table
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
