import React from "react";
import { useSelector } from "react-redux";
import WishListCourse from "./WishListCourse";

const WishList = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <div className=" space-y-6">
      <h1 className=" text-white text-4xl font-bold ">Your WishList</h1>
      <div>
        <p
          className=" text-richblack-200 flex flex-row font-semibold text-md mb-1
        "
        >
          {wishlist.length} Courses in Wishlist
        </p>
        <div className=" w-full h-[1px] bg-richblack-500"></div>
      </div>
      {wishlist.length > 0 ? (
        <>
          {wishlist.map((course) => {
            return (
              <WishListCourse course={course} key={course._id}></WishListCourse>
            );
          })}
        </>
      ) : (
        <div className=" text-richblack-100 text-center text-xl">
          No Course in wish List
        </div>
      )}
    </div>
  );
};

export default WishList;
