import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CourseContext } from "Context/courseContext";
import { IconButton, ListItem } from "@mui/material";
import { deleteClassFromCourse } from "server/db";
import { getSimpleDate, getWeekDay } from "../../../../../utils/dates";
import { getSimpleTime } from "utils/dates";
import { updateClassesInCourse } from "Reducers/Actions/CourseAction";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListItemIcon from "@mui/material/ListItemIcon";
import ClearIcon from "@mui/icons-material/Clear";

export default function ClassesList() {
  const { courseData, courseDispatch } = React.useContext(CourseContext);
  //
  //
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  function onClickDeleteItem(id) {
    //

    deleteClassFromCourse(courseData._id, id).then((res) => {
      courseDispatch(updateClassesInCourse({ ...res }));
    });
  }

  const primaryTextStyle = {
    fontSize: ".9rem",
    fontWeight: "normal",
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Classes on this course:{" "}
          <span style={{ color: "red", fontSize: "bigger" }}>
            {" "}
            {courseData.schedule.length}
          </span>
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Classes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {courseData.schedule !== undefined
            ? courseData.schedule.map((listItem, i) => {
                return (
                  <ListItem
                    key={i}
                    className="on-hover"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <span style={{ fontSize: ".75rem", padding: "0 .7rem" }}>
                      {i}.
                    </span>
                    <ListItemIcon
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                        paddingRight: ".5rem",
                      }}
                    >
                      <span>{getWeekDay(listItem.date, "short")}</span>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText
                      secondary={getSimpleDate(listItem.date)}
                      primary={
                        getSimpleTime(listItem.startTime) +
                        "-" +
                        getSimpleTime(listItem.endTime)
                      }
                      primaryTypographyProps={{ style: primaryTextStyle }}
                    />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        onClickDeleteItem(listItem._id);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </ListItem>
                );
              })
            : "no participants"}
        </List>
      </Collapse>
    </List>
  );
}
