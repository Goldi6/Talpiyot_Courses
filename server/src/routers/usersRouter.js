const express = require("express");
const User = require("../models/userModel");
const verifyProfessor = require("../middleware/verifyProfessor");

const router = express.Router();
const usersController = require("../controllers/usersController");

const FILTERS = ["token", "courses"];
//TODO: verifyRequestFields on post(User, FILTERS),

//TODO patch users/:id
router.get("/students", verifyProfessor, usersController.getStudents);

router.post("", verifyProfessor, usersController.createUser);

router.delete("/:id", verifyProfessor, usersController.deleteUser);

///
//any user can do:
///
//#region any

router.patch(
  "",
  // verifyRequestFields(User, FILTERS),
  usersController.updateProfile
);
//#endregion

module.exports = router;
