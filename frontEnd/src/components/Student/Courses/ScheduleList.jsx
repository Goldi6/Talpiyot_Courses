import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function ScheduleList({ scheduleArray, courseId, courseDates }) {
  const [open, setOpen] = React.useState(false);

  console.log(scheduleArray);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ borderBottom: "1px solid #999" }}>
      <Typography
        component="h6"
        variant="h6"
        onClick={() => {
          handleClick();
        }}
        color="primary"
        sx={{ cursor: "pointer" }}
      >
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />} Schedule :{" "}
        {courseDates}
      </Typography>
      <Collapse in={open}>
        {scheduleArray.map((item, index) => {
          const title = item.dateAndTime.date;
          const dates = item.dateAndTime.time;

          return (
            <List component="ol" disablePadding key={courseId + index}>
              <ListItem component="li">
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "1rem",
                    },
                  }}
                  primary={title}
                  secondary={dates}
                  secondaryTypographyProps={{
                    style: {
                      fontSize: "1rem",
                    },
                  }}
                  style={{
                    borderBottom: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                ></ListItemText>
              </ListItem>
            </List>
          );
        })}
      </Collapse>
    </Box>
  );
}
