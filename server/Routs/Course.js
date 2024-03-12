const express = require("express");
const router = express.Router();
// import all controllers

// course controller
const {
  getAllCourse,
  createCourse,
  getCourseDetails,
  updateCourse,
  instructorCourses,
  deleteCourse,
  getFullCourseDetails,
  instructorDashBoard,
} = require("../controllers/Course");

// section controller
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// subsection controller
const {
  createSubSection,
  deleteSubSection,
  updateSubSection,
} = require("../controllers/SubSection");

// rating and review controller
const {
  createRatingAndReview,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// import middlewares
const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../middlewares/auth");
// category controllers

const {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} = require("../controllers/Category");
//  course route

// course only created in Instructor
// create course
router.post("/createCourse", auth, isInstructor, createCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
// update course
router.put("/updateCourse", auth, isInstructor, updateCourse);
// create section

router.post("/createSection", auth, isInstructor, createSection);
// update section
router.put("/updateSection", auth, isInstructor, updateSection);
//delete section
router.delete("/deleteSection", auth, isInstructor, deleteSection);
// create subsection
router.post("/createSubSection", auth, isInstructor, createSubSection);

// delete sub section

router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
// update subsection;
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
// get all courese
router.get("/getAllCourse", getAllCourse);

// get Specific courses details

router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

router.get("/getInstructorCourses", auth, isInstructor, instructorCourses);
router.get("/getInstructorDashBoard", auth, isInstructor, instructorDashBoard);

// create category
// category only created by admin

router.post("/createCategory", auth, isAdmin, createCategory);
// get all category

router.get("/showAllCategory", showAllCategory);

// get specific category details
router.post("/categoryPageDetails", categoryPageDetails);

/// rating reviews

// only student can give rating

router.post("/createRatingAndReview", auth, isStudent, createRatingAndReview);

router.post("/getAverageRating", getAverageRating);

router.get("/getAllRating", getAllRating);

module.exports = router;
