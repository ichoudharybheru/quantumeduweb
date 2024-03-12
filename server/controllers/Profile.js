const Profile = require("../models/Profile");
const User = require("../models/User");
exports.updateProfile = async (req, res) => {
  try {
    const {
      about = "",
      number,
      dateOfbirth = "",
      gender,
      firstName,
      lastName,
    } = req.body;

    const id = req.user.id;

    if (!number || !id || !gender || !firstName || !lastName) {
      return res.status(203).json({
        success: false,
        message: "all feild are required",
      });
    }

    const userdetails = await User.findById(id);
    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();

    const profileId = userdetails.additionALDetails;
    const profiledetails = await Profile.findById(profileId);
    (profiledetails.about = about), (profiledetails.dateOfbirth = dateOfbirth);
    profiledetails.gender = gender;
    profiledetails.number = number;
    profiledetails.save();
    // secont method 2
    // const updateProfile = await Profile.findByIdAndUpdate(
    //   profileId,
    //   {
    //     about: about,
    //     gender: gender,
    //     about: about,
    //     number: number,
    //   },
    //   {
    //     new: true,
    //   }
    // );
    const updatedUserdetails = await User.findById(id)
      .populate("additionALDetails")
      .exec();

    res.status(200).json({
      success: true,
      message: "profile updated successfully",
      updatedUserdetails,
    });
  } catch (error) {
    console.log("error while updating profile details of user:", error);
    return res.status(500).json({
      success: false,
      message: "unable to update profile details please try agian later",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const userdetails = await User.findById(id);
    if (!userdetails) {
      return res.status(203).json({
        success: false,
        message: "user not found",
      });
    }
    await Profile.findByIdAndDelete({
      _id: userdetails.additionALDetails._id,
    });

    //need to delete enrolled account
    // task sechduling is availbale

    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "account deleted successfully",
    });
  } catch (error) {
    console.log("error while delete account:", error);
    return res.status(500).json({
      message: false,
      message: "unable to delete please try again later",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).populate("additionALDetails").exec();

    return res.status(200).json({
      success: true,
      message: "user details fecthed successfully",
      user,
    });
  } catch (error) {
    console.log("error while fetching details account:", error);
    return res.status(500).json({
      message: false,
      message: "unable to get all details please try again later",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const id = req.user.id;
    const userCoursesDetails = await User.findOne({ _id: id })
      .populate("courses")
      .exec();

    if (!userCoursesDetails) {
      return res.status(404).json({
        success: false,
        message: "unable find courses details",
      });
    }
    return res.status(200).json({
      success: true,
      message: "enrolled courses fetched successfully",
      data: userCoursesDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable fetch enrolled courses,please try again later",
    });
  }
};
