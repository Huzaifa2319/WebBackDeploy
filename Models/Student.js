const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    rollNo: { type: String, required: true },
    studentName: { type: String, required: true },
    batch: { type: String, required: true },
    CGPA: { type: Number, default: 0, required: false },
    semester: { type: Number, required: true },
    degree: { type: String, required: true },
    section: { type: String, required: true },
    status: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    guardian: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
