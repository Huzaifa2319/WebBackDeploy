const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    creditHour: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "-",
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendence = mongoose.model("Attendence", attendenceSchema);
module.exports = Attendence;
