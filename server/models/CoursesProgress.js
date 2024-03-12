const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: "Course",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "SubSecton",
    },
  ],
});
module.exports = mongoose.model("CourseProgress", CourseProgressSchema);
