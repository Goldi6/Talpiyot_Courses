import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { getSimpleDate } from "utils/dates";
import { getSimpleTime } from "../../../utils/dates";

export default function ThirdLevelCollapse({ attendees, absentees }) {
  const [open, setOpen] = React.useState({});

  const secondaryTitleStyle = {
    padding: "0 .74rem",
    borderBottom: "1px solid #111",
    borderTop: "1px solid #111",
    display: "inline-block",
    textDecoration: "underline",
  };

  const studentDataStyle = {
    display: "flex",
    gap: "3rem",
    alignItems: "center",
  };
  const studentPrimaryStyle = {
    style: {
      textTransform: "capitalize",
      textDecoration: "underline",
    },
  };
  const attendantsStyle = {
    borderBottom: "1px solid #999",
    borderLeft: "1px solid #ddd",
    backgroundColor: "#c8e6c9",
  };

  const absentsStyle = {
    borderBottom: "1px solid #999",
    borderLeft: "1px solid #ddd",
    backgroundColor: "#ffcdd2",
  };

  const handleClick = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <List component="dl" disablePadding style={{ marginLeft: "1rem" }}>
        <ListItem button>
          <ListItemText
            style={studentDataStyle}
            primary={
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                style={secondaryTitleStyle}
              >
                Attendees
              </Typography>
            }
          />
        </ListItem>
        {attendees.length > 0 ? (
          attendees.map((subSubItem, i) => {
            const studentName =
              subSubItem.student.lastName + ", " + subSubItem.student.firstName;
            const studentEmail = subSubItem.student.email;
            const checkInTime = getSimpleTime(subSubItem.timeAttended);
            return (
              <>
                <dl className="detail-list" style={attendantsStyle}>
                  <dt>
                    <ListItem key={subSubItem.id}>
                      <ListItemIcon>{i + 1}.</ListItemIcon>
                      <ListItemText
                        style={studentDataStyle}
                        primaryTypographyProps={studentPrimaryStyle}
                        primary={studentName}
                        secondary={studentEmail}
                      />
                    </ListItem>
                  </dt>
                  <dd>
                    <Typography variant="overline">
                      <b>
                        Checked:
                        <span> </span>
                        <span style={{ fontSize: "small" }}>{checkInTime}</span>
                      </b>
                    </Typography>
                  </dd>
                </dl>
              </>
            );
          })
        ) : (
          <p>Empty </p>
        )}
        <ListItem button>
          <ListItemText
            primary={
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                style={secondaryTitleStyle}
              >
                Absentees
              </Typography>
            }
          />
        </ListItem>
        {absentees.length > 0 ? (
          absentees.map((subSubItem, i) => {
            const studentName =
              subSubItem.student.lastName + ", " + subSubItem.student.firstName;
            const studentEmail = subSubItem.student.email;
            const reason = subSubItem.reason ? subSubItem.reason : "";
            const timeUpdated = subSubItem.timeAttended
              ? getSimpleDate(subSubItem.timeAttended) +
                "  " +
                getSimpleTime(subSubItem.timeAttended)
              : "";
            return (
              <>
                <dl className="detail-list" key={i} style={absentsStyle}>
                  <dt>
                    <ListItem key={subSubItem.id}>
                      <ListItemIcon>{i + 1}.</ListItemIcon>
                      <ListItemText
                        style={studentDataStyle}
                        primaryTypographyProps={studentPrimaryStyle}
                        primary={studentName}
                        secondary={studentEmail}
                      />
                    </ListItem>
                  </dt>
                  <dd>
                    <Typography variant="overline">
                      <b>
                        Reason:
                        <span> </span>
                        {reason.length > 0 ? (
                          <span style={{ fontSize: "small" }}>
                            {timeUpdated}
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>"missing"</span>
                        )}
                      </b>
                    </Typography>
                    {reason.length > 0 && (
                      <Typography
                        variant="body2"
                        style={{
                          margin: "0 0.75rem",
                          background: "#eee",
                          padding: "0.45rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {reason}
                      </Typography>
                    )}
                  </dd>
                </dl>
              </>
            );
          })
        ) : (
          <p>Empty </p>
        )}
      </List>
    </>
  );
}
