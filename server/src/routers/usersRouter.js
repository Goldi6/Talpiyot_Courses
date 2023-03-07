const express = require("express");
const User = require("../models/userModel");
const verifyProfessor = require("../middleware/verifyProfessor");

const router = express.Router();
const usersController = require("../controllers/usersController");
const { verifyRequestFields } = require("../middleware/modelFieldsVerifiers");

const FILTERS = ["token", "courses", "firstAccess"];

//TODO patch users/:id
router.get("/students", verifyProfessor, usersController.getStudents);

router.post(
  "",
  verifyProfessor,
  verifyRequestFields(User, [...FILTERS, "birthday"]),
  usersController.createUser
);

router.delete("/:id", verifyProfessor, usersController.deleteUser);

router.patch(
  "",
  verifyRequestFields(User, [...FILTERS]),
  usersController.updateProfile
);

module.exports = router;
