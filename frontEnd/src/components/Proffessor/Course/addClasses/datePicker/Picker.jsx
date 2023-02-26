import React, { useContext, useState } from "react";
import PickDate from "./PickDate";
import PickTime from "./PickTime";
import { getDateAndTimesFromMUI, isStartDateBeforeEndDate } from "utils/dates";
import { CourseContext } from "Context/courseContext";
import { addCourseSchedule } from "server/db";
import { Button } from "@mui/material";
import { updateClassesInCourse } from "Reducers/Actions/CourseAction";

export default function Picker() {
  const { courseData, courseDispatch } = useContext(CourseContext);
  const [dateValue, setDateValue] = React.useState("");

  const [startTimeValue, setStartTimeValue] = React.useState("");
  const [endTimeValue, setEndTimeValue] = React.useState("");

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

    addCourseSchedule(scheduleData).then((res) => {
      courseDispatch(updateClassesInCourse({ ...res }));
    });
  }

  return (
    <form action="" onSubmit={onSubmitAddClass}>
      <div className="flex-col">
        <div className="flex-row">
          <h3>pick date:</h3>
          <PickDate value={dateValue} setValue={setDateValue} />
        </div>
        <div className="flex-row">
          {timeError.isError && (
            <p style={{ color: "red", fontSize: "small" }}>{timeError}</p>
          )}
          <div className="flex-col">
            <h3>Start time:</h3>
            <PickTime value={startTimeValue} setValue={setStartTimeValue} />
          </div>
          <div className="flex-col">
            <h3>End time</h3>
            <PickTime value={endTimeValue} setValue={setEndTimeValue} />
          </div>
        </div>
      </div>
      <br></br>
      <Button
        variant="contained"
        disabled={
          dateValue === "" || startTimeValue === "" || endTimeValue === ""
        }
        type="submit"
      >
        Add Class
      </Button>
    </form>
  );
}
