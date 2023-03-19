import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CourseContext } from "Context/courseContext";
import { addStudentToCourse, getStudents } from "server/db";
import { updateStudentsInCourse } from "Reducers/Actions/CourseAction";
import NestedList from "./ActiveStudentsList";
import { useNavigate } from "react-router-dom";

export default function AddStudentsForm() {
  const { courseData, courseDispatch } = useContext(CourseContext);

  const [studentData, setStudentData] = React.useState([]);
  const [nonParticipantStudents, setNonParticipantStudents] = React.useState(
    []
  );
  const [filteredStudents, setFilteredStudents] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let render = true;
    if (render) {
      getStudents()
        .then((dataList) => {
          setStudentData([...dataList]);
          const newList = mapList([...dataList]);
          setNonParticipantStudents(newList);
          setFilteredStudents(newList);
        })
        .catch((err) => {
          navigate(`/error/${err.message}`);
        });
    }
    return () => {
      render = false;
    };
  }, []);

  //
  function mapList(allStudents, id = "") {
    const assignedIDs = [...courseData.students].map((student) => student._id);

    if (id !== "") assignedIDs.push(id);
    let unassigned = allStudents.filter((student) => {
      return !assignedIDs.includes(student._id);
    });
    //

    return unassigned;
  }

  function onClickAddStudent(_id) {
    addStudentToCourse(courseData._id, _id).then((res) => {
      courseDispatch(updateStudentsInCourse({ ...res }));
      const newList_nonParticipants = mapList([...studentData], _id);
      setNonParticipantStudents(newList_nonParticipants);
      const newList_filtered = mapList([...nonParticipantStudents], _id);
      setFilteredStudents(newList_filtered);
    });
  }

  function onInputFilter(e) {
    const value = e.target.value;
    if (value === "") setFilteredStudents(nonParticipantStudents);
    else {
      
      const newList = nonParticipantStudents.filter(
        (student) =>
        student.firstName.startsWith(value) ||
        student.lastName.startsWith(value)
        );
        setFilteredStudents(newList);
      }
  }

  return (
    <div className="flex-book">
      <NestedList />

      <form>
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center">
            Add Students
          </Typography>

          <TextField
            id="name"
            label="student Name"
            fullWidth
            onInput={onInputFilter}
          />

          <Box sx={{ height: 300, overflow: "auto" }}>
            <List dense={true}>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, i) => {
                  const studentId = student._id;
                  return (
                    <ListItem
                      key={i}
                      className="on-hover"
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="add"
                          onClick={() => onClickAddStudent(studentId)}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={student.firstName + " " + student.lastName}
                        secondary={student.email}
                      />
                    </ListItem>
                  );
                })
              ) : (
                <Typography style={{ textAlign: "center" }}>
                  ...not found
                </Typography>
              )}
            </List>
          </Box>
        </Stack>
      </form>
    </div>
  );
}
