import { StudentsContext } from "Context/StudentsContext";
import React, { useContext } from "react";
import Picker from "./datePicker/Picker";

export default function AddClassesForm() {
  return (
    <div>
      <Picker />
    </div>
  );
}
