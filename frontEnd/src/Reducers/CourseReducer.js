export default function courseReducer(course, action) {
  //console.log("COURSE_REDUCER");
  //  console.log(action);
  switch (action.type) {
    case "UPDATE_STUDENTS_IN_COURSE":
      return {
        ...course,
        students: [...action.course.students],
      };
    case "UPDATE_CLASSES_IN_COURSE":
      return { ...course, schedule: [...action.course.schedule] };

    case "INIT_COURSE_ROOM":
      return action.courseData;
    default:
      return course;
  }
}
