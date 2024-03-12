// auth
const jwt = require("jsonwebtoken");
require("dotenv").config;
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    // console.log("hello1");
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "token is missing",
      });

      //verify the token
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      // Storing the decoded JWT payload in the request object for further use
      req.user = decode;
    } catch (error) {
      //verification failed
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    // console.log("hello2");
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while validating token",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    //method 1
    // const userDetails = await User.findOne({ email: req.user.email });

    // if (userDetails.accountType !== "Student") {
    //     return res.status(401).json({
    //         success: false,
    //         message: "This is a Protected Route for Students",
    //     });
    // }
    //method 2 all ready store so no need to make db call again
    //look at line 23
    if (req.user.accountType !== "Student") {
      return res.status(402).json({
        success: false,
        message: "this route is protected for student",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user role not verified,please try agian later",
    });
  }
};
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(402).json({
        success: false,
        message: "this route is protected for Admin",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user role not verified,please try agian later",
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(402).json({
        success: false,
        message: "this route is protected for Instructor",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user role not verified,please try agian later",
    });
  }
};
