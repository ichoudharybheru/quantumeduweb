const bcrypt = require("bcrypt");
const User = require("../models/User");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");

const Profile = require("../models/Profile");
require("dotenv").config();

exports.sendOtp = async (req, res) => {
  try {
    //fetch email from body
    const { email } = req.body;
    // check user already there
    const checkUserPresent = await User.findOne({ email });
    // console.log("pp1");
    if (checkUserPresent) {
      return res.status(201).json({
        success: false,
        message: "user already registered",
      });
    }
    // console.log("pp2");
    //generate otp
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // console.log("otp generated: ", otp);
    // check otp is unique or not
    const result = await User.findOne({ otp });

    //loop run until unique otp
    while (result) {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      const result = await User.findOne({ otp });
    }
    const otpPayload = { email, otp };
    //entery created in database
    const otpData = await Otp.create(otpPayload);
    // console.log(otpData);
    return res.status(200).json({
      success: true,
      message: "otp sent successfully",
      data: otp,
    });
  } catch (error) {
    console.log("error while sending: ", error);
    return res.status(500).json({
      success: false,
      message: "unbale to send otp",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    // fetch data from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,

      otp,
    } = req.body;
    // validate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(203).json({
        success: false,
        message: "all fields are required",
      });
    }
    // check for confirm password and password
    if (confirmPassword != password) {
      return res.status(201).json({
        success: false,
        message: "password not matched,please entery same password",
      });
    }
    // check for existing user
    const checkUserExisting = await User.findOne({
      email,
    });
    if (checkUserExisting) {
      return res.status(201).json({
        success: false,
        message: "user already registered",
      });
    }
    //find recent otp
    const recentOtp = await Otp.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // validate otp
    if (recentOtp === null) {
      //otp not found
      return res.status(201).json({
        success: false,
        message: "otp not found",
      });
    } else if (recentOtp.otp !== otp) {
      return res.status(201).json({
        success: false,
        message: "enter valid otp",
      });
    }
    // hash pasword
    const hashpassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashpassword,
      additionALDetails: profileDetails._id,
      accountType,
      Image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    return res.status(200).json({
      success: true,
      message: "user is registered successsfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "user is not registred,please tyr again later",
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    // fetch data from body

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(203).json({
        success: false,
        message: "all fields are required",
      });
    }
    // validate email
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(201).json({
        success: false,
        message: "user is not registered",
      });
    }
    // password matching
    // jwt token creation
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(201).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to login try again after some time",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    //get data from body
    // console.log("reached here");
    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(402).json({
        success: false,
        message: " old password not matched",
      });
    }
    const hashpassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findOneAndUpdate(
      { email: userDetails.email },
      {
        password: hashpassword,
      },
      {
        new: true,
      }
    );
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        "password is changed"
      );
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
