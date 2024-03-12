const express = require("express");
const router = express.Router();

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  getEnrolledCourses,
} = require("../controllers/Profile");

const { auth, isStudent } = require("../middlewares/auth");
const { updateCourseProgress } = require("../controllers/CoursesProgress");
// profile  route
router.delete("/deleteProfile", auth, deleteAccount);
router.post("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/enrolledcourse", auth, getEnrolledCourses);
router.post("/updateCouresProgress", auth, isStudent, updateCourseProgress);

module.exports = router;
