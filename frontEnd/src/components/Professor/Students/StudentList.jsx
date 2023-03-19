import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import { StudentsContext } from "Context/StudentsContext";
import StudentListItem from "./StudentListItem";
import { TextField } from "@mui/material";

export default function StudentList() {
  const { studentsData } = useContext(StudentsContext);
  useEffect(() => {
    setFilteredStudents(studentsData);
  }, [studentsData]);

  const [filteredStudents, setFilteredStudents] = useState([]);

  function onInputFilter(e) {
    const value = e.target.value;
    if (value === "") setFilteredStudents(studentsData);
    else {
      const newList = studentsData.filter(
        (student) =>
          student.firstName.startsWith(value) ||
          student.lastName.startsWith(value)
      );
      setFilteredStudents(newList);
    }
  }
  return (
    <Box>
      <Typography textAlign="center" variant="h6" component="div">
        Students
      </Typography>
      <TextField
        id="name"
        label="student Name"
        fullWidth
        onInput={onInputFilter}
      />
      <Box sx={{ height: 300, overflow: "auto" }}>
        <List dense={true}>
          {filteredStudents ? (
            filteredStudents.length > 0 ? (
              filteredStudents.reverse().map((listItem, i) => {
                return <StudentListItem key={i} listItem={listItem} />;
              })
            ) : (
              <Typography textAlign="center">not found...</Typography>
            )
          ) : (
            "Loader..."
          )}
        </List>
      </Box>
    </Box>
  );
}
