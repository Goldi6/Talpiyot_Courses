const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,

      required: true,
    },
    date: {
      type: Date,
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
    timeAttended: {
      type: Date,
    },

    attended: {
      type: Boolean,
      required: true,
      default: false,
    },
    reason: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    indexes: [
      { student: 1, schedule: 1 },
      {
        /* other indexes... */
      },
    ],
  }
);

attendanceSchema.virtual("checkInTime").get(function () {
  if (!this.attended) return "";
  const timeStamp = new Date(this.timeAttended);

  const time = timeStamp.getHours() + ":" + timeStamp.getMinutes();

  return time;
});

attendanceSchema.methods.toJSON = function () {
  const scheduleItem = this;
  const scheduleItemObj = scheduleItem.toObject();

  return scheduleItemObj;
};

attendanceSchema.statics.findUserClass = async function (userId, classId) {
  const result = await Attendant.findOne({
    student: userId,
    class: classId,
  }).select("attended timeAttended");

  return result;
};

const Attendant = mongoose.model("Attendant", attendanceSchema);

module.exports = Attendant;
