import { IconButton, ListItem, ListItemText } from "@mui/material";
import { deleteItem_Action } from "Reducers/CoursesReducer";
import React, { useContext } from "react";
import { deleteItem } from "server/db";
import DeleteIcon from "@mui/icons-material/Delete";
import { StudentsContext } from "Context/StudentsContext";

export default function StudentListItem({ listItem }) {
  const { studentsDispatch } = useContext(StudentsContext);
  function onClickDeleteItem(id) {
    deleteItem(id, "users").then((message) => {
      console.log(message);
      studentsDispatch(deleteItem_Action(id));
    });
  }

  return (
    <ListItem
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
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={listItem.firstName + " " + listItem.lastName}
        secondary={listItem.email}
      />
    </ListItem>
  );
}
