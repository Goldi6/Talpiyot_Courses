const express = require("express");

const errorLogger = require("../errorHandlers/errorLogger");
const clientErrorHandler = require("../errorHandlers/clientError");
const internalErrorHandler = require("../errorHandlers/internalError");

const authRouter = require("./userRouter");
const coursesRouter = require("./coursesRouter");
const courseRouter = require("./courseRouter");
const studentRouter = require("./studentRouter");
const helperRouters = require("./helperRouter");
const attendanceRouter = require("./attendanceRouter");

const router = new express.Router();

router.use(authRouter);
router.use(coursesRouter);
router.use(courseRouter);
router.use(studentRouter);
router.use(attendanceRouter);
router.use(helperRouters);

router.use(errorLogger);
router.use(clientErrorHandler);
router.use(internalErrorHandler);

module.exports = router;
