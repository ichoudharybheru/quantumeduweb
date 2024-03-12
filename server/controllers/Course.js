const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uplodImageToCloudanary } = require("../utils/imageUploader");
const CoursesProgress = require("../models/CoursesProgress");

exports.createCourse = async (req, res) => {
  try {
    //get user details from req body;

    const thumbnail = req.files.thumnail;
    let {
      courseName,
      courseDescripation,
      price,
      whatWillYouLearn,
      tag,
      category,
      instructions,
      status,
    } = req.body;

    if (
      !tag ||
      !courseName ||
      !courseDescripation ||
      !price ||
      !whatWillYouLearn ||
      !thumbnail ||
      !category ||
      !instructions
    ) {
      return res.status(203).json({
        success: false,
        message: "all field are required",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    // console.log("instructor details", instructorDetails);
    if (!instructorDetails) {
      return res.status(203).json({
        success: false,
        message: "instructor not found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(203).json({
        success: false,
        message: "tag not found",
      });
    }

    // const supportType = ["jpg", "jpeg", "png"];
    // const filetype = thumbnail.name.split(".")[1].toLowerCase();
    // if (!isfilesupported(filetype, supportType)) {
    //   return res.status(400).json({
    //     success: false,
    //     Message: "file type not supported",
    //   });
    // }
    const response = await uplodImageToCloudanary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // console.log("Response from Cloudinary:", response);

    const coursedetailes = await Course.create({
      tag: tag,
      courseName,
      category: categoryDetails._id,
      courseDescripation: courseDescripation,
      price,
      whatWillYouLearn,
      thumnail: response.secure_url,
      instructions,
      instructor: instructorDetails._id,
      status: status,
    });

    // add the new cousre in the instructor course list
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          cousres: coursedetailes._id,
        },
      },
      {
        new: true,
      }
    );
    await Category.findByIdAndUpdate(
      {
        _id: categoryDetails._id,
      },
      {
        $push: {
          course: coursedetailes._id,
        },
      },
      {
        new: true,
      }
    );
    // console.log("coursedetailes", coursedetailes);
    res.status(200).json({
      success: true,
      message: "cousre created successfully",
      data: coursedetailes,
    });
  } catch (error) {
    // console.log("error while creating course:", error);
    return res.status(500).json({
      success: false,
      message: "unable to create course",
    });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const updatedcourse = req.body;
    const existingDetails = await Course.findById(courseId);

    if (req.files && req.files.thumnail !== undefined) {
      const thumbnail = req.files.thumnail;
      const response = await uplodImageToCloudanary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      existingDetails.thumnail = response.secure_url;
    }
    if (updatedcourse.category) {
      existingDetails.category = updatedcourse.category;
    }
    if (updatedcourse.courseName) {
      existingDetails.courseName = updatedcourse.courseName;
    }
    if (updatedcourse.courseDescripation) {
      existingDetails.courseDescripation = updatedcourse.courseDescripation;
    }
    if (updatedcourse.tag) {
      existingDetails.tag = updatedcourse.tag;
    }
    if (updatedcourse.price) {
      existingDetails.price = updatedcourse.price;
    }
    if (updatedcourse.whatWillYouLearn) {
      existingDetails.whatWillYouLearn = updatedcourse.whatWillYouLearn;
    }
    if (updatedcourse.instructions) {
      existingDetails.instructions = updatedcourse.instructions;
    }
    if (updatedcourse.status) {
      existingDetails.status = updatedcourse.status;
    }
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      existingDetails,
      {
        new: true,
      }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "course details updated successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log("error while updating the course:", error);
    return res.status(500).json({
      success: false,
      message: "unable to update course data,please try again later",
    });
  }
};
exports.getAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,

        price: true,

        thumnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    res.status(200).json({
      success: true,
      message: "all data fetched",
      data: allCourses,
    });
  } catch (error) {
    console.log("error while fetching all cousres:", error);
    return res.status(500).json({
      success: false,
      message: "anble to fetch data of courses",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    console.log("req body:", req.body);
    const courseId = req.body.courseId;

    // const userId = req.user.id;

    console.log("courseid at server side", courseId);
    if (!courseId) {
      return res.status(203).json({
        success: false,
        message: "courseid not able to find",
      });
    }
    // console.log("Received courseId:", courseId);
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionALDetails",
        },
      })
      .populate("category")
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: ["firstName", "lastName", "Image"],
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    //  console.log(courseDetails);
    if (!courseDetails) {
      return res.status(403).json({
        success: false,
        message: "did not find course detailes with this course id",
      });
    }
    return res.status(200).json({
      success: true,

      message: "course detailes fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log("error while fetching course details :", error);
    return res.status(500).json({
      message: false,
      message: "unable to fecth course details please try again later",
    });
  }
};

exports.instructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Instructor Course fetched successfully",
      data: instructorCourses,
    });
  } catch (error) {
    console.log("error while fetching instructor Course :", error);
    return res.status(500).json({
      message: false,
      message: "unable to fecth instructorCourse  please try again later",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    console.log("4040", course);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          courses: courseId,
        },
      },
      {
        new: true,
      }
    );
    // Find the course
    const studentsEnrolled = course.studentEnrolled;
    for (let student of studentsEnrolled) {
      await User.findByIdAndUpdate(
        {
          _id: student,
        },
        {
          $pull: {
            courses: course._id,
          },
        },
        { new: true }
      );
    }
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId);
    }
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    console.log("req body:", req.body);
    const courseId = req.body.courseId;

    const userId = req.user.id;

    // console.log("courseid at server side", courseId);
    if (!courseId) {
      return res.status(203).json({
        success: false,
        message: "courseid not able to find",
      });
    }
    // console.log("Received courseId:", courseId);
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionALDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //  console.log(courseDetails);
    if (!courseDetails) {
      return res.status(403).json({
        success: false,
        message: "did not find course detailes with this course id",
      });
    }
    const courseProgress = await CoursesProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    let completedLectures = 0;
    if (courseProgress && courseProgress.completedVideos) {
      completedLectures = courseProgress.completedVideos.length;
    }

    let totalDuration = 0;

    courseDetails.courseContent.forEach((section) => {
      section.subSection.forEach((subsec) => {
        // Ensure subsec and timeDuration are valid before adding to totalDuration
        if (subsec && subsec.timeDuration) {
          totalDuration += subsec.timeDuration;
        }
      });
    });
    let totalNoOfLectures = 0;
    courseDetails.courseContent.forEach((section) => {
      // Ensure subsec and timeDuration are valid before adding to totalDuration
      if (section) {
        totalNoOfLectures += section.subSection.length;
      }
    });
    const multiplier = Math.pow(10, 2);
    progressPercentage =
      Math.round((completedLectures / totalNoOfLectures) * 100 * multiplier) /
      multiplier;
    return res.status(200).json({
      success: true,

      message: "course detailes fetched successfully",
      data: {
        courseDetails,
        totalDuration: totalDuration,
        courseProgress: courseProgress,
        totalNoOfLectures: totalNoOfLectures,
        completedLectures: completedLectures,
        progressPercentage: progressPercentage,
      },
    });
  } catch (error) {
    console.log("error while fetching course details :", error);
    return res.status(500).json({
      message: false,
      message: "unable to fecth course details please try again later",
    });
  }
};

exports.instructorDashBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseDetails = await Course.find({
      instructor: userId,
    })
      .populate("ratingAndReviews")
      .exec();
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentEnrolled.length || 0;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;
      let totalrating = course.ratingAndReviews.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      totalrating = totalrating / totalStudentsEnrolled || 0;
      const courseStates = {
        courseName: course.courseName,
        totalAmountGenerated,
        totalStudentsEnrolled,
        totalrating,
        courseDescripation: course.courseDescripation,
        _id: course._id,
      };
      return courseStates;
    });
    res.status(200).json({
      success: true,
      message: "get successfully",
      data: courseData,
    });
  } catch (error) {
    console.log("error while fetching course details :", error);
    return res.status(500).json({
      message: false,
      message: "unable to fecth course details please try again later",
    });
  }
};
