const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescripation: {
    type: String,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,

    required: true,
    ref: "User",
  },
  price: {
    type: Number,
    required: true,
  },
  whatWillYouLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  thumnail: {
    type: String,
  },
  tag: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,

      required: true,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Course", courseSchema);
