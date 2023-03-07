const mongoose = require("mongoose");
const Attendant = require("./attendantsModel");

const scheduleSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,

      required: true,
    },

    name: {
      type: String,

      required: true,
    },

    date: { type: Date, required: true },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    // min: '1987-09-28',
    // max: '1994-05-23'
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

scheduleSchema.virtual("dateAndTime").get(function () {
  const startTimeStamp = new Date(this.startTime);
  const endTimeStamp = new Date(this.endTime);
  //
  //
  const date =
    startTimeStamp.getDate() +
    "/" +
    (startTimeStamp.getMonth() + 1) +
    "/" +
    startTimeStamp.getFullYear();
  const time =
    startTimeStamp.getHours() +
    ":" +
    startTimeStamp.getMinutes() +
    " - " +
    endTimeStamp.getHours() +
    ":" +
    endTimeStamp.getMinutes();

  return { date, time };
});

scheduleSchema.methods.toJSON = function () {
  const scheduleItem = this;
  const scheduleItemObj = scheduleItem.toObject();
  delete scheduleItemObj.__v;

  return scheduleItemObj;
};

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
