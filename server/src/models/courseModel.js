const mongoose = require("mongoose");
const { getSimpleDate } = require("../utils/dates");
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);
//?
courseSchema.methods.toJSON = function () {
  const course = this;

  const courseObj = course.toObject();

  courseObj.startDate = getSimpleDate(courseObj.startDate);
  courseObj.endDate = getSimpleDate(courseObj.endDate);

  return courseObj;
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
