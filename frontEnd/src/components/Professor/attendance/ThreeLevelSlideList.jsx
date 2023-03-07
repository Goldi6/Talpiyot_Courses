import { Collapse, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SecondLevelCollapse from "./secondLevelList";

export default function CustomizedCollapse({ attendanceData }) {
  const [open, setOpen] = React.useState({});

  const handleClick = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <List component="ul" style={{ listStyleType: "bullet" }}>
        {attendanceData.map((item, index) => {
          const title = item.course.name;
          const dates = item.course.startDate + " - " + item.course.endDate;
          const courseId = item.course.id;
          const classesData = item.classes;

          return (
            <React.Fragment key={index}>
              <ListItem
                component="li"
                onClick={() => {
                  handleClick(courseId);
                }}
              >
                <KeyboardArrowRightIcon style={{ paddingRight: "0.5rem" }} />

                <ListItemText
                  primaryTypographyProps={{
                    variant: "h2",
                    style: {
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "2.5rem",
                    },
                  }}
                  primary={title}
                  secondary={dates}
                  secondaryTypographyProps={{
                    style: {
                      float: "right",
                      fontSize: "1rem",
                    },
                  }}
                  style={{ borderBottom: "1px solid #ccc", cursor: "pointer" }}
                ></ListItemText>
              </ListItem>
              <Collapse in={open[courseId]}>
                <List component="ol" disablePadding>
                  <SecondLevelCollapse classesData={classesData} />
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
}
