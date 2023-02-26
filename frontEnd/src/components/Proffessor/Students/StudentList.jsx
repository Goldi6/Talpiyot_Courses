import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import { StudentsContext } from "Context/StudentsContext";
import StudentListItem from "./StudentListItem";

export default function StudentList() {
  const { studentsData } = useContext(StudentsContext);
  useEffect(() => {}, [studentsData]);

  return (
    <Box>
      <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
        Students
      </Typography>
      <Box sx={{ height: 300, overflow: "auto" }}>
        <List dense={true}>
          {studentsData ? (
            studentsData.length > 0 ? (
              studentsData.reverse().map((listItem, i) => {
                return <StudentListItem key={i} listItem={listItem} />;
              })
            ) : (
              <Typography style={{ textAlign: "center" }}>
                courses yet
              </Typography>
            )
          ) : (
            "Loader..."
          )}
        </List>
      </Box>
    </Box>
  );
}
