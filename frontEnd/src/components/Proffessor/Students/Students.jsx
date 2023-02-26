import React from "react";
import CreateUser from "./CreateUser";
import StudentsContextProvider from "Context/StudentsContext";
import StudentList from "./StudentList";

export default function Students() {
  return (
    <>
      <StudentsContextProvider>
        <div className="flex-book">
          <CreateUser />
          <StudentList />
        </div>
      </StudentsContextProvider>
    </>
  );
}
