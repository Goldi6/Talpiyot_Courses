import { StudentsContext } from "Context/StudentsContext";
import React, { useContext } from "react";
import Picker from "./datePicker/Picker";
import ClassesList from "./classesList/classesList";

export default function AddClassesForm() {
  return (
    <div className="flex-book">
      <ClassesList />

      <Picker />
    </div>
  );
}
