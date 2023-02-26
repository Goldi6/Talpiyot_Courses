import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CourseContext } from "Context/courseContext";
import { IconButton, ListItem } from "@mui/material";
import { deleteClassFromCourse, editCourseStudentList } from "server/db";
import { getSimpleDate } from "../../../../../utils/dates";
import { getSimpleTime } from "utils/dates";
import { updateClassesInCourse } from "Reducers/Actions/CourseAction";

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
                    className="on-hover flex-half"
                    style={{ width: "100%" }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          onClickDeleteItem(listItem._id);
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={getSimpleDate(listItem.date)}
                      secondary={
                        getSimpleTime(listItem.startTime) +
                        "-" +
                        getSimpleTime(listItem.endTime)
                      }
                    />
                  </ListItem>
                );
              })
            : "no participants"}
        </List>
      </Collapse>
    </List>
  );
}
