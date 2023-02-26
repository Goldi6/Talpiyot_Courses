import {
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createCourse } from "server/db";
import { UserContext } from "Context/userContext";
import { useNavigate } from "react-router-dom";
import { addOneYear, isStartDateBeforeEndDate } from "utils/dates";
import { CoursesContext } from "../../../Context/CoursesContext";
import { addItem_Action } from "Reducers/CoursesReducer";

export default function CreateCourseForm() {
  const navigate = useNavigate();
  const { userData } = React.useContext(UserContext);
  const { coursesDispatch } = React.useContext(CoursesContext);

  const today = new Date();
  const maxDate = addOneYear(new Date());

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [errMessages, setErrMessages] = useState({
    name: "",
    dates: "",
  });

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (name.length === 0) {
      setErrMessages({
        ...errMessages,
        name: "Enter a unique Course name",
      });
    } else {
      setErrMessages({
        ...errMessages,
        name: "",
      });
    }
  };

  function onSubmitCreateCourse(e) {
    e.preventDefault();

    const start = startDate["$d"];
    const end = endDate["$d"];

    const fineForm = errMessages.name === "" && errMessages.dates === "";
    if (!fineForm) {
      return;
    }

    const courseData = {
      name,
      professor: userData.user._id,
      startDate: start,
      endDate: end,
    };

    createCourse(courseData)
      .then((course) => {
        console.log("course created:");
        console.log(course);
        coursesDispatch(addItem_Action(course));
        //TODO: handle server errors(shut)
        navigate(`/professor/courses/${course._id}`);
      })
      .catch((err) => {
        console.log(err);
        console.log("TODO:handle error");
      });
  }

  return (
    <form
      onSubmit={onSubmitCreateCourse}
      style={{ padding: "1rem", paddingBottom: "3rem" }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Create new Course
        </Typography>

        <TextField
          id="name"
          label="Course Name"
          fullWidth
          value={name}
          onChange={handleNameChange}
          error={errMessages.name !== ""}
          helperText={errMessages.name}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" spacing={2}>
            <DatePicker
              label="Start Date"
              value={startDate}
              minDate={today}
              maxDate={maxDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              minDate={today}
              maxDate={maxDate}
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                console.log(newValue);
                setEndDate(newValue);
                if (
                  !isStartDateBeforeEndDate(startDate["$d"], newValue["$d"])
                ) {
                  setErrMessages({
                    ...errMessages,
                    dates: "Start date must be before end date",
                  });
                } else {
                  setErrMessages({
                    ...errMessages,
                    dates: "",
                  });
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          {errMessages.dates !== "" && (
            <FormHelperText style={{ color: "red" }}>
              {errMessages.dates}
            </FormHelperText>
          )}
        </LocalizationProvider>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Stack>
    </form>
  );
}
