import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { courseEndpoints } from "../services/api";
import { getCatagoryPageData } from "../services/operations/coursesDetailAPI";
import Spinner from "../Components/common/Spinner";
import CourseSlider from "../Components/PagesComponents/Category/CourseSlider";
import CourseCard from "../Components/PagesComponents/Category/CourseCard";
const { ALL_CATEGORY } = courseEndpoints;
const Catalog = () => {
  const { catalogName } = useParams();
  const [categoryId, setCategoryId] = useState(null);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const fetchdata = async () => {
    const response = await apiConnector("GET", ALL_CATEGORY);
    const allCategory = response.data.allCategory;
    for (let cate of allCategory) {
      if (cate.name.split(" ").join("-").toLowerCase() === catalogName) {
        setCategoryId(cate._id);
        break;
      }
    }
    // const category_id = response?.data?.allCategory?.filter(
    //   (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
    // )[0]._id;
    // console.log(category_id);
    // setCategoryId(category_id);
    // console.log(categoryId);
    // console.log(response.data.allCategory);
  };

  useEffect(() => {
    fetchdata();
  }, [catalogName]);

  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          setLoading(true);
          const res = await getCatagoryPageData(categoryId);
          setCatalogPageData(res);
          setLoading(false);
        } catch (error) {
          // console.log(error);
        }
        //console.log("", catalogPageData.differentCategories[0].course);
      })();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className=" grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="">
          <Spinner></Spinner>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className=" bg-richblue-800 text-richblack-300 py-20 pl-32 text-xl font-semibold font-inter space-y-3">
        <p>
          Home/Catalog/
          <span className=" text-caribbeangreen-200">{catalogName}</span>
        </p>
        <p className="text-white text-4xl">{catalogName}</p>
      </div>
      {/* section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-white text-5xl">Course to get you started</div>
        <div className="flex flex-row gap-x-3 pt-4 border-b border-b-richblack-50">
          <p
            onClick={() => setActive(true)}
            className={` cursor-pointer border-b ${
              active
                ? " text-caribbeangreen-100 border-caribbeangreen-100"
                : " text-richblack-50 border-richblack-50"
            }`}
          >
            Most Popular
          </p>
          <p
            onClick={() => setActive(false)}
            className={` cursor-pointer border-b ${
              !active
                ? " text-caribbeangreen-100 border-caribbeangreen-100"
                : " text-richblack-50 border-richblack-50"
            }`}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.selectedCategoryCourse.course}
          ></CourseSlider>
        </div>
      </div>
      {/* section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div>
          <p className="text-white text-2xl font-semibold">Top Courses</p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.differentCategories[0].course}
          ></CourseSlider>
        </div>
      </div>
      {/* section 3*/}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-white text-2xl font-semibold">
          Frequently Bought courses
        </div>

        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
