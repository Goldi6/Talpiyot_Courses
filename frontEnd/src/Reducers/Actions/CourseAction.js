export const addStudentToCourse_Action = (courseId, student) => ({
  type: "ADD_STUDENT_TO_COURSE",
  courseId,
  student,
});

export const initCourseRoom_Action = (courseData) => ({
  type: "INIT_COURSE_ROOM",
  courseData,
});

export const updateClassesInCourse = (course) => ({
  type: "UPDATE_CLASSES_IN_COURSE",
  course,
});
export const updateStudentsInCourse = (course) => ({
  type: "UPDATE_STUDENTS_IN_COURSE",
  course,
});
