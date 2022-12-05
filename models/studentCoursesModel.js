/**
 * This will handle associating the courses and students together in a many-to-many relationship.
 */
class StudentCourses {
    /**
   * Creates a course with given config
   * @param {StudentCourses} config The object whose properties will be set to the matching instance properties
   */
     constructor(config) {
      this.studentId = config.studentId || -1;
      this.courseId = config.courseId || '';
    }

}
