const express = require("express");

const errorLogger = require("../errorHandlers/errorLogger");
const clientErrorHandler = require("../errorHandlers/clientError");
const internalErrorHandler = require("../errorHandlers/internalError");

//ROUTERS
const authRouter = require("./authRouter");
const usersRouter = require("./usersRouter");

const courseActionsRouter = require("./courseActionsRouter");

const coursesRouter = require("./coursesRouter");
const helperRouters = require("./helperRouter");
const attendanceRouter = require("./attendanceRouter");
const profileRouter = require("./profileRouter");

//MIDDLEWARE
const authUser = require("../middleware/auth");
const verifyProfessor = require("../middleware/verifyProfessor");

const router = express.Router();

// TODO add prefix to all routes
router.use(helperRouters);
router.use(authRouter);
router.use("/users", authUser, usersRouter);
router.use("/my-profile", authUser, profileRouter);

router.use("/courses/courseId", authUser, verifyProfessor, courseActionsRouter);
router.use("/courses", authUser, coursesRouter);

router.use("/attendance", authUser, verifyProfessor, attendanceRouter);

router.use(errorLogger);
router.use(clientErrorHandler);
router.use(internalErrorHandler);

module.exports = router;
