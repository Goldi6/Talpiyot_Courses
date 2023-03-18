import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RoleRadioGroup({ setValue, value }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const radioStyle = {
    border: "1px solid #ccc",
    borderRadius: "1rem",
    aspectRatio: 1,
    width: "6rem",
    paddingTop: "1rem",
  };
  return (
    <FormControl>
      <FormLabel
        style={{
          textAlign: "center",
          textDecoration: "underline",
        }}
        id="role-selection-group-label"
      >
        Role
      </FormLabel>
      <RadioGroup
        aria-labelledby="role-selection-group-label"
        name="new-user-role-selection"
        onChange={handleChange}
        row
        defaultValue="student"
        style={{ justifyContent: "space-evenly" }}
      >
        <FormControlLabel
          value="student"
          control={<Radio />}
          label="Student"
          labelPlacement="bottom"
          style={radioStyle}
        />
        <FormControlLabel
          value="professor"
          control={<Radio />}
          label="Professor"
          labelPlacement="bottom"
          style={radioStyle}
        />
      </RadioGroup>
    </FormControl>
  );
}
