import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import { createRatingAndReview } from "../../../services/operations/profileApi";
const ReviewModal = ({ setReviewModal }) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    setValue,

    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    register("rating", { required: true });
  }, []);
  useEffect(() => {
    setValue("rating", rating);
  }, [rating]);

  const onSubmitForm = async (data) => {
    data.courseId = courseEntireData._id;
    console.log(data);
    const res = await createRatingAndReview(data, token);
    if (res) {
      console.log(res);
      setReviewModal(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        <div className=" h-[1px] w-full bg-white"></div>
        <div className=" flex flex-row justify-center py-2 items-center gap-x-3">
          <div>
            <img
              src={user?.Image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[60px] rounded-full object-cover"
            />
          </div>
          <div className=" flex flex-col text-white">
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p className=" text-richblack-50">Posting Publicly</p>
          </div>
        </div>
        <form
          className=" flex flex-col gap-y-3 mb-2"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="flex flex-row mx-auto">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <div>
                  <label
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <input
                      type="radio"
                      name="rating"
                      className=" opacity-0"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                    ></input>
                    <FaStar
                      size={24}
                      className={` cursor-pointer ${
                        currentRating <= (hover || rating)
                          ? " text-yellow-50"
                          : " text-richblack-500"
                      }`}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <div className=" mx-auto">
            {" "}
            {errors.rating && (
              <span className=" contactus-error text-xs">
                review is required**
              </span>
            )}
          </div>

          <div className=" flex flex-col  gap-y-2 px-10">
            <label className=" text-white">
              Add your experience<sup className=" text-pink-500">*</sup>
            </label>
            <textarea
              placeholder="Share Details of your own experience for this course "
              name="reviews"
              id="reviews"
              className=" bg-richblack-600 min-h-[120px] rounded text-white p-2"
              {...register("reviews", { required: true })}
            ></textarea>
            {errors.reviews && (
              <span className=" contactus-error text-xs">
                review is required**
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 px-10">
            <button
              className=" bg-richblack-700 text-white py-2 px-3 rounded"
              type="button"
              onClick={() => {
                setReviewModal(false);
              }}
            >
              Cancel
            </button>
            <button className=" bg-caribbeangreen-200 text-white py-2 px-3 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
