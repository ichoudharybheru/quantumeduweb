const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        message: "missing properties",
      });
    }
    const sectionDetails = await Section.create({ sectionName });
    const courseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: sectionDetails._id,
        },
      },
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
      sectionDetails,
      data: courseDetails,
      message: "section created successfully",
    });
  } catch (error) {
    console.log("error while creating new section", error);
    return res.status(500).json({
      success: false,
      message: "unable create section ,please try again later ",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    if (!sectionName || !sectionId || !courseId) {
      return res.status(401).json({
        success: false,
        message: "missing properties",
      });
    }
    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true }
    );
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "section updated successfully",
      section,
      data: courseDetails,
    });
  } catch (error) {
    console.log("error while updating new section");
    return res.status(500).json({
      success: false,
      message: "unable updating section ,please try again later ",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    if (!sectionId || !courseId) {
      return res.status(401).json({
        success: false,
        message: "missing properties",
      });
    }
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });
    const section = await Section.findById(sectionId);
    // console.log(section);
    //thsese are two ways delete multiple section
    //method 1
    for (let subSectionId of section.subSection) {
      await SubSection.findByIdAndDelete(subSectionId);
    }

    // method2
    // await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    // find the updated course and return it
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "section deleted successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log("error while deleting new section", error);
    return res.status(500).json({
      success: false,
      message: "unable deleting section ,please try again later ",
    });
  }
};
