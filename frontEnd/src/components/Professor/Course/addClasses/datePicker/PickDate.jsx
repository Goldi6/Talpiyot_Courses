import * as React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { CourseContext } from "Context/courseContext";
import { simpleDateToDate } from "utils/dates";

export default function PickDate({ value, setValue }) {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const { courseData } = React.useContext(CourseContext);

  const minDate = simpleDateToDate(courseData.startDate);
  const maxDate = simpleDateToDate(courseData.endDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/DD/YYYY"
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
