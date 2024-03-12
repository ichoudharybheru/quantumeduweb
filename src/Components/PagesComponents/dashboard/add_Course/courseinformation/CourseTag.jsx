import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
const CourseTag = ({ label, name, register, errors, setValue, getValues }) => {
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);
  const handleAddTag = () => {
    if (tag && !tagList.includes(tag)) {
      setTagList([...tagList, tag]);
      setTag("");
    } else {
      setTag("");
    }
  };
  const handleRemoveTag = (index) => {
    const updatedlist = [...tagList];
    updatedlist.splice(index, 1);
    setTagList(updatedlist);
  };

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      setTagList(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, tagList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagList]);

  return (
    <div className="space-y-1">
      <label className="flex flex-col gap-y-1 items-start">
        <p>
          {label}
          <sup className="text-pink-200">*</sup>
        </p>
        <div className=" flex w-full flex-wrap gap-2">
          {tagList.length > 0 &&
            tagList.map((r, index) => (
              <div
                key={index}
                className=" pl-1 pr-1 rounded-s-full rounded-e-full bg-caribbeangreen-100 text-richblack-5 text-center flex"
              >
                {r}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className=" pl-2 pr-1"
                >
                  <MdClose className="text-sm" />
                </button>
              </div>
            ))}
        </div>

        <input
          type="text"
          value={tag}
          placeholder="Add course tag"
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault(); // Prevents the default behavior (e.g., submitting a form)
              handleAddTag();
            }
          }}
          className=" w-full p-2  rounded  text-richblack-500"
        ></input>

        {errors && errors[name] && (
          <span className=" contactus-error text-xs">
            {label} is required**
          </span>
        )}
      </label>
    </div>
  );
};

export default CourseTag;
