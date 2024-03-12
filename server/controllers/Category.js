const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
  try {
    //fetch data from req body
    const { title, descripation } = req.body;
    // check for data
    if (!title || !descripation) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required",
      });
    }
    // db store
    const categoryDetails = await Category.create({
      title: title,
      description: descripation,
    });
    // console.log(categoryDetails);
    res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    // console.log("error while creating Category", error);
    return res.status(500).json({
      success: false,
      message: "unable to create Category,please try again later",
    });
  }
};

exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      {
        name: true,
      }
    ).exec();
    return res.status(200).json({
      success: true,
      message: "all tag fetched successfully",
      allCategory,
    });
  } catch (error) {
    // console.log("error while fetching tags:", error);

    return res.status(500).json({
      success: false,
      message: "unable to fecth tag details,please try again later",
    });
  }
};

//category page details
exports.categoryPageDetails = async (req, res) => {
  try {
    // category id
    const { categoryId } = req.body;

    // fetch all course related to category

    const selectedCategoryCourse = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
        populate: "instructor",
      })
      .exec();

    if (!selectedCategoryCourse) {
      return res.status(403).json({
        success: false,
        message: "data not found for selected category",
      });
    }
    // if (selectedCategoryCourse.course.length === 0) {
    //   console.log("No courses found for the selected category.");
    //   return res.status(404).json({
    //     success: false,
    //     message: "No courses found for the selected category.",
    //   });
    // }
    // get all course data for different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
        populate: "instructor",
      })
      .exec();

    // top selling courses -pending
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
        populate: "instructor",
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.course);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        mostSellingCourses,
        selectedCategoryCourse,
        differentCategories,
      },
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "unable to get Category related course,please try again later",
    });
  }
};
