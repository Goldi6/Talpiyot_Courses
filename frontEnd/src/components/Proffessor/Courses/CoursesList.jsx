import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { CoursesContext } from "../../../Context/CoursesContext";
import { Link } from "react-router-dom";

import { deleteItem } from "server/db";
import { deleteItem_Action } from "Reducers/CoursesReducer";

export default function InteractiveList() {
  const { coursesData, coursesDispatch } = React.useContext(CoursesContext);
  React.useEffect(() => {
    console.log(coursesData);
  }, [coursesData]);

  function onClickDeleteItem(id) {
    deleteItem(id, "courses").then((message) => {
      console.log(message);
      coursesDispatch(deleteItem_Action(id));
    });
  }

  return (
    <Box>
      <Typography sx={{ textAlign: "center" }} variant="h6" component="div">
        Courses
      </Typography>
      <Box sx={{ height: 300, overflow: "auto" }}>
        <List dense={true}>
          {coursesData ? (
            coursesData.length > 0 ? (
              coursesData.map((listItem) => {
                // const dates =
                //   getSimpleDate(course.startDate) +
                //   " - " +
                //   getSimpleDate(course.endDate);

                const dates = listItem.startDate + " - " + listItem.endDate;

                //console.log(course._id);
                return (
                  <ListItem
                    key={listItem.name}
                    className="on-hover"
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          onClickDeleteItem(listItem._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Link className="link-unset" to={"" + listItem._id}>
                      <ListItemText primary={listItem.name} secondary={dates} />
                    </Link>
                  </ListItem>
                );
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
