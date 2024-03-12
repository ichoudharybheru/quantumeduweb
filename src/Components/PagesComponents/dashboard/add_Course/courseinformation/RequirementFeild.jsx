import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementFeild = ({
  label,
  name,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const { editCourse, course } = useSelector((state) => state.course);
  const handleAddRequirement = () => {
    if (requirement && !requirementList.includes(requirement)) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };
  const handleRemoveRequirement = (index) => {
    const updatedlist = [...requirementList];
    updatedlist.splice(index, 1);
    setRequirementList(updatedlist);
  };
  useEffect(() => {
    if (editCourse) {
      setRequirementList(course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList]);
  return (
    <div className="space-y-1">
      <label className=" flex flex-wrap flex-col items-start">
        <p>
          {label}
          <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          value={requirement}
          placeholder="Add course requirement"
          onChange={(e) => setRequirement(e.target.value)}
          className=" w-full p-2  rounded  text-richblack-500"
        ></input>
        <button
          type="button"
          className=" text-caribbeangreen-200"
          onClick={handleAddRequirement}
        >
          Add
        </button>
        {requirementList.length > 0 &&
          requirementList.map((r, index) => (
            <div key={index} className=" flex flex-wrap gap-x-2">
              {r}
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className=" text-richblack-400 p-1"
              >
                clear
              </button>
            </div>
          ))}
        {errors[name] && (
          <span className=" contactus-error text-xs">
            {label} is required**
          </span>
        )}
      </label>
    </div>
  );
};

export default RequirementFeild;
