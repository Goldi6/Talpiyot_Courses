import React, { useContext, useState } from "react";
import PickDate from "./PickDate";
import PickTime from "./PickTime";
import {
  addHours,
  convertToMuiDateFormat,
  getDateAndTimesFromMUI,
  isStartDateBeforeEndDate,
} from "utils/dates";
import { CourseContext } from "Context/courseContext";
import { addClassToCourseSchedule } from "server/db";
import { Button, Stack, Typography } from "@mui/material";
import { updateClassesInCourse } from "Reducers/Actions/CourseAction";

export default function Picker() {
  const { courseData, courseDispatch } = useContext(CourseContext);
  const [dateValue, setDateValue] = React.useState(
    convertToMuiDateFormat(new Date())
  );

  const [startTimeValue, setStartTimeValue] = React.useState(
    new Date()
  );

  const [endTimeValue, setEndTimeValue] = React.useState(
    addHours(new Date(), 1)
  );

  const [timeError, setTimeError] = useState({ isError: false, message: "" });

  function onSubmitAddClass(e) {
    e.preventDefault();

    const { date, startTime, endTime } = getDateAndTimesFromMUI(
      dateValue,
      startTimeValue,
      endTimeValue
    );

    if (!isStartDateBeforeEndDate(startTime, endTime)) {
      setTimeError({
        isError: true,
        message: "Start time must be before end time",
      });
      return;
    } else {
      setTimeError({
        isError: false,
        message: "",
      });
    }

    //

    const scheduleData = {
      courseId: courseData._id,
      date,
      startTime,
      endTime,
    };

    addClassToCourseSchedule(scheduleData).then((res) => {
      courseDispatch(updateClassesInCourse({ ...res }));
    });
  }

  return (
    <form action="" onSubmit={onSubmitAddClass}>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        Add Class
      </Typography>
      <br />
      <Stack gap={1.5}>
        <div className="flex-row">
          <PickDate value={dateValue} setValue={setDateValue} />
        </div>

        {timeError.isError && (
          <p style={{ color: "red", fontSize: "small" }}>{timeError.message}</p>
        )}

        <PickTime
          value={startTimeValue}
          setValue={setStartTimeValue}
          label="Start time"
        />
        <PickTime
          value={endTimeValue}
          setValue={setEndTimeValue}
          label="End time"
        />
        <Button
          variant="contained"
        
          type="submit"
        >
          Add Class
        </Button>
      </Stack>
    </form>
  );
}
