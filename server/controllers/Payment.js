const { instance } = require("../config/Razorpay");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const { verify } = require("jsonwebtoken");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "please provide course id",
    });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Could not find the course",
        });
      }
      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "student already enrolled",
        });
      }
      totalAmount = totalAmount + course.price;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    console.log(totalAmount);
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      message: "succesful created",
      data: paymentResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//verify payment
exports.verifyPayment = async (req, res) => {
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(202).json({
      success: false,
      message: "paymnet failed",
    });
  }
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === process.env.RAZORPAY_KEY_SECRET) {
    await enrollStudents(courses, userId, res);
    return res.status(200).json({
      message: "Payment Verified",
      success: true,
    });
  }
  return res.status(200).json({
    message: "Payment Failed",
    success: false,
  });
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      message: "Please Provide data for Courses or UserId",
    });
  }
  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        {
          _id: courseId,
        },
        {
          $push: { studentEnrolled: userId },
        },
        {
          new: true,
        }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          message: "course not found",
          success: false,
        });
      }

      const enrolledStudent = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          $push: {
            courses: courseId,
          },
        },
        {
          new: true,
        }
      );
      if (!enrolledStudent) {
        return res.status(500).json({
          message: "user  not found",
          success: false,
        });
      }
      const emailresponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        `Successfully Enrolled into ${enrolledCourse.courseName}`
      );
      console.log("email sent successfully", emailresponse);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

//create the payment and initiate the razorpay order

// exports.capturePayment = async (req, res) => {
//   // get userid and course id

//   const { courseId } = req.body;

//   // validation for course id

//   if (!courseId) {
//     return res.status(404).json({
//       success: false,
//       message: "course not found",
//     });
//   }

//   const userid = req.user.id;
//   // validation for course details

//   let courseDetails;

//   try {
//     courseDetails = await Course.findById(courseId);
//     if (!courseDetails) {
//       return res.status(401).json({
//         success: false,
//         message: "could not found course details",
//       });
//     }
//     // convert userid into object id

//     const uId = new mongoose.Types.ObjectId(userid);

//     // check user already purchased this course or not

//     if (courseDetails.studentEnrolled.includes(uId)) {
//       return res.status(404).json({
//         success: false,
//         message: "user already purchased this course",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "unable to fetch data",
//     });
//   }

//   // create order

//   const amout = courseDetails.price;

//   const currency = "INR";

//   const options = {
//     amout: amout * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString,
//     notes: {
//       courseId: courseId,
//       userid,
//     },
//   };

//   // initiate payment using razoray
//   try {
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);

//     return res.status(200).json({
//       success: true,
//       message: "",
//       CourseName: courseDetails.courseName,
//       CourseDesc: courseDetails.courseDescripation,
//       thumnail: courseDetails.thumnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Could not initiate order.",
//     });
//   }
// };

// // verify signture of razorpay and server
