const express = require("express");
const router = express.Router();
const {
  sendOtp,
  signUp,
  logIn,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/auth");

// route for sign up
router.post("/signUp", signUp);
router.post("/sendOtp", sendOtp);
router.post("/logIn", logIn);

router.put("/changePassword", auth, changePassword);

// routes for reset password

router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.get("/checkForLogIn", auth);
module.exports = router;
