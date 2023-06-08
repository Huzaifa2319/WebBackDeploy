const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Students = require("../Models/Student");
const auth = require("../Middleware/Auth");
require("dotenv").config();
const Feedback = require("../Models/FeedbackSchema");
const Attendence = require("../Models/Attendence");

router.post("/StudentLogin", async (req, res, next) => {
  let { rollNo, password } = req.body;
  let existingUser = await Students.findOne({
    rollNo: rollNo,
    password: password,
  });
  if (!existingUser) {
    const error = Error("Wrong rollno or password");
    res.status(401).json({
      success: false,
      error: error.message,
    });
  } else {
    let token;
    try {
      token = jwt.sign(
        { rollNo: existingUser.rollNo, email: existingUser.email },
        process.env.SecretKey,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      next(error);
    }
    res.status(200).json({
      success: true,
      data: {
        rollNo: existingUser.rollNo,
        email: existingUser.email,
        token: token,
      },
    });
  }
});

router.get("/Welcome", auth, (req, res) => {
  console.log("Welcome to Student Portal");
  res.send("Welcome to Student Portal");
});

router.get("/ViewAttendence", auth, (req, res) => {
  const rollNo = req.body.rollNo;
  //  const courseId = req.body.course;
  const s = Students.find({ rollNo: rollNo });
  if (s) {
    console.log(s.attdenList);
    res.status(200).json(s.attdenList);
  } else {
    res.status(404).json({ msg: "student not found" });
  }
});

router.get("/ViewMarks", auth, (req, res) => {
  const rollNo = req.body.rollNo;
  const s = Students.find({ rollNo: rollNo });
  if (s) {
    console.log(s.markList);
    res.status(200).json(s.markList);
  } else {
    res.status(404).json({ msg: "student not found" });
  }
});

router.post("/givefeedback", async (req, res) => {
  console.log(req.body);
  try {
    const feed = await new Feedback(req.body);
    feed.save().then((response) => {
      console.log(response);
      res.json({ status: response });
    });
  } catch (error) {
    res.json({ status: "error" });
  }
});

router.post("/getAttendence", async (req, res) => {
  const { rollNo } = req.body;
  console.log(rollNo);
  try {
    let result = await Attendence.find(
      { rollNo: rollNo },
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.json({ status: "error" });
  }
});

module.exports = router;
