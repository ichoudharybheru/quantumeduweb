const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    // validate email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(201).json({
        success: false,
        message: "user is not registered",
      });
    }

    const token = crypto.randomUUID();

    console.log("token:", token);
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    // console.log("DETAILS", updatedDetails);

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // data fetch
    const { confirmPassword, password, token } = req.body;

    if (confirmPassword != password) {
      return res.status(403).json({
        success: false,
        message: "password did not match",
      });
    }
    // check for user
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.status(203).json({
        success: false,
        message: "token invalid",
      });
    }

    // check for expiry
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(203).json({
        success: false,
        message: "link expired ,please regenaarte link again",
      });
    }
    //hashthe password
    const hashPassword = await bcrypt.hash(password, 10);
    // save in db
    await User.findOneAndUpdate(
      { token: token },
      { password: hashPassword },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "password reset successfully",
      password,
    });
    // validate
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "soemthing went wrong while reseting password try again later",
    });
  }
};
