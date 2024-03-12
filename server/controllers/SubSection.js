const { response } = require("express");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uplodImageToCloudanary } = require("../utils/imageUploader");
exports.createSubSection = async (req, res) => {
  try {
    const {
      title,
      descripation,

      sectionId,
    } = req.body;
    const video = req.files.lessonVideo;
    // console.log(title);
    if (!title || !descripation || !sectionId || !video) {
      return res.status(401).json({
        success: false,
        message: "all fields are required",
      });
    }
    let response;
    try {
      response = await uplodImageToCloudanary(video, process.env.FOLDER_NAME);
      console.log("Response from Cloudinary:", response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "not able able upload video",
      });
    }
    // console.log("video response", response);
    const newSubSection = await SubSection.create({
      timeDuration: response.duration,
      title: title,
      descripation: descripation,
      videoUrl: response.secure_url,
    });
    const upadateSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      {
        new: true,
      }
    ).populate("subSection");
    res.status(200).json({
      success: true,
      message: "sub section created successfully",
      data: upadateSection,
      newSubSection,
    });
  } catch (error) {
    console.log("error while creating subsection:", error);
    return res.status(500).json({
      success: false,
      message: "ubable create sub secton please try agian later",
    });
  }
};
exports.updateSubSection = async (req, res) => {
  try {
    const updateDetails = req.body;
    const subSectionId = req.body.subSectionId; // Assuming subSectionId is passed in the request body
    const sectionId = req.body.sectionId;
    let existingDetails = await SubSection.findById(subSectionId);
    if (updateDetails.title) {
      existingDetails.title = updateDetails.title;
    }
    // if (updateDetails.timeDuration) {
    //   existingDetails.timeDuration = updateDetails.timeDuration;
    // }
    if (updateDetails.descripation) {
      existingDetails.descripation = updateDetails.descripation;
    }

    if (req.files && req.files.video !== undefined) {
      try {
        const video = req.files.video;
        const response = await uplodImageToCloudanary(
          video,
          process.env.FOLDER_NAME
        );
        existingDetails.videoUrl = response.secure_url;
        existingDetails.timeDuration = response.duration;
        console.log("Response from Cloudinary:", response);
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "not able able upload video",
        });
      }
    }
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,

      existingDetails,

      {
        new: true,
      }
    );

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );
    res.status(200).json({
      success: true,
      message: "updated successfully",
      updatedSubSection,

      data: updatedSection,
    });
  } catch (error) {
    console.log("error while updating subsection", error);
    return res.status(500).json({
      success: false,
      message: "unable to update sub-section subsection",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(201).json({
        success: false,
        message: "All field are required",
      });
    }
    const updatesection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    ).populate("subSection");
    await SubSection.findByIdAndDelete(subSectionId);

    res.status(200).json({
      success: true,
      message: "subsection delete successfully",
      data: updatesection,
    });
  } catch (error) {
    console.log("error while deleting subsection:", error);
    return res.status(500).json({
      success: false,
      message: "unablle delete subsection pleae try again later",
    });
  }
};
