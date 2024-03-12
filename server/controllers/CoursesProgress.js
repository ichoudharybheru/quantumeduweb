const CoursesProgress = require("../models/CoursesProgress");
const User = require("../models/User");

exports.updateCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, subSectionId } = req.body;

    if (!courseId || !subSectionId) {
      return res.status(401).json({
        success: false,
        message: "all field are required",
      });
    }

    let courseProgress = await CoursesProgress.findOne({
      courseId: courseId,
      userId: userId,
    });
    // console.log("let ", courseProgress);
    if (!courseProgress) {
      let courseProgressNew = new CoursesProgress({
        courseId: courseId,
        userId: userId,
        completedVideos: [subSectionId],
      });

      courseProgressNew = await courseProgressNew.save();
      // console.log("userid", userId);
      let p = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            coursesProgress: courseProgressNew._id,
          },
        },
        {
          new: true,
        }
      );

      // console.log("counew", p);

      return res.status(201).json({
        success: true,
        message: "updated sucessfully",
        courseProgressNew,
        user: p,
      });
    } else {
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(203).json({
          success: false,
          message: "already completed",
        });
      }

      courseProgress.completedVideos.push(subSectionId);
    }

    await courseProgress.save();
    res.status(200).json({
      success: true,
      message: "updated sucessfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error", success: false });
  }
};
