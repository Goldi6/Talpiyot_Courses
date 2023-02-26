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

    startDate: {
      type: Date,
      //min: Date.now,
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
    // students: [
    //   {
    //     id: {
    //       type: String,
    //     },
    //     name: {
    //       type: String,
    //     },
    //     email: {
    //       type: String,
    //     },
    //   },]
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

courseSchema.methods.toJSON = function () {
  const course = this;

  const courseObj = course.toObject();
  // if (courseObj.schedule.length > 0)
  //   courseObj.schedule = courseObj.schedule.map((date) => date._id);
  // else courseObj.schedule = [];

  courseObj.startDate = getSimpleDate(courseObj.startDate);
  courseObj.endDate = getSimpleDate(courseObj.endDate);

  return courseObj;
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
