export const addStudent_Action = (dataObj) => ({
  type: "ADD_",
  dataObj,
});

export const deleteStudent_Action = (id) => ({
  type: "DELETE_",
  id,
});

export const initStudents_Action = (courses) => ({
  type: "SET_",
  courses,
});
