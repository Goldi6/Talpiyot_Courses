import { Collapse, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThirdLevelCollapse from "./ThirdLevelList";
import { getSimpleDate } from "utils/dates";

export default function SecondLevelCollapse({ classesData }) {
  const [open_2, setOpen_2] = React.useState({});

  const handleClick = (id) => {
    setOpen_2((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <List component="ol" disablePadding>
        {classesData.map((subItem, i) => {
          const today = getSimpleDate(new Date());
          const levelTwo_title = subItem.class.date;
          const levelTwo_SecondaryText = subItem.class.time;
          const levelTwo_identifier = subItem.class + i;
          const attendees = subItem.attendees;
          const absentees = subItem.absentees;
          const passed = subItem.passed;
          return (
            <>
              <ListItem
                key={levelTwo_identifier}
                component="li"
                button={passed}
                onClick={(e) => {
                  if (passed) handleClick(levelTwo_identifier + i);
                }}
                style={{
                  padding: "0 3rem",
                  background: "#e3f2fd",
                  borderBottom: "3px solid #555",
                }}
              >
                {passed && (
                  <KeyboardArrowDownIcon style={{ paddingRight: "0.5rem" }} />
                )}

                <ListItemText
                  primary={levelTwo_title}
                  secondary={levelTwo_SecondaryText}
                  secondaryTypographyProps={{
                    style: {
                      float: "right",
                    },
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                />
              </ListItem>
              <Collapse
                in={open_2[levelTwo_identifier + i]}
                timeout="auto"
                unmountOnExit
              >
                <ThirdLevelCollapse
                  attendees={attendees}
                  absentees={absentees}
                />
              </Collapse>
            </>
          );
        })}
      </List>
    </>
  );
}
