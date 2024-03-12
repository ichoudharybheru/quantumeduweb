const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating

exports.createRatingAndReview = async (req, res) => {
  try {
    const { rating, reviews, courseId } = req.body;
    console.log(req.body);
    // get user id form body
    const userId = req.user.id;

    // check user enrolled or not in this course

    const course = await Course.findOne({
      _id: courseId,
    });

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });
    // console.log(courseDetails);
    // if (!courseDetails) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "student is not enrolled in this course",
    //     course,
    //     userId,
    //   });
    // }
    if (!course.studentEnrolled.includes(userId)) {
      return res.status(404).json({
        success: false,
        message: "student is  enrolled in this course",
      });
    }
    // check course is already reviewed or not
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      const updatedRating = req.body;
      if (updatedRating.rating) {
        alreadyReviewed.rating = updatedRating.rating;
      }
      if (updatedRating.reviews) {
        alreadyReviewed.reviews = updatedRating.reviews;
      }
      await alreadyReviewed.save();
      return res.status(203).json({
        success: true,
        message: "review updated",
      });
    }
    if (!rating || !reviews || !courseId) {
      return res.status(400).json({
        success: false,
        message: "all field are required",
      });
    }

    const newRating = await RatingAndReview.create({
      rating: rating,
      reviews: reviews,
      user: userId,
      course: courseId,
    });
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: newRating._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "ratingAndReviews created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "review not created try again later",
    });
  }
};

// get avg rating of course
exports.getAverageRating = async (req, res) => {
  try {
    // find course id
    const courseId = req.body.courseId;
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId), // Convert courseId to ObjectId
        },
      },

      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    // const result = await RatingAndReview.aggregate([
    //   {
    //     $match: {
    //       course: new mongoose.Types.ObjectId(courseId), // Convert courseId to ObjectId
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       averageRating: { $avg: "$rating" },
    //     },
    //   },
    // ])
    //console.log("result[0].averageRating,", result);
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }
    if (result.length > 0) {
      return res.status(202).json({
        success: true,
        message: "averageRating",
        averageRating: result[0].averageRating,
      });
    }
    return res.status(203).json({
      success: true,
      averageRating: 0,
      message: "avg rating is 0, no rating till now",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable fetch avg rating please try again later",
    });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const AllRating = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: ["firstName", "lastName", "Image"],
      })

      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "all rating and reviews detailes fetched successfully",
      data: AllRating,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "anable to fetch rating and review details",
    });
  }
};
