import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/profileApi";
const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deteletMyAccount = () => {
    dispatch(deleteAccount(token, navigate));
  };
  return (
    <div className=" bg-pink-700 p-7">
      <div className="flex flex-row gap-x-2">
        <div className=" flex text-pink-200 ">
          <RiDeleteBin5Line size={40} className="" />
        </div>
        <div className="flex flex-col gap-y-5">
          <h1 className=" text-richblack-5 font-semibold text-xl">
            Delete Account
          </h1>
          <p className=" text-richblack-5">
            Would you like to delete account? This account may contain Paid{" "}
            <br />
            Courses. Deleting your account is permanent and will remove all the{" "}
            <br />
            contain associated with it.
          </p>
          <button
            className=" border border-richblack-5 p-3 bg-pink-200 text-richblack-5 font-semibold text-xl inline-block"
            onClick={() => deteletMyAccount()}
          >
            I WANT TO DELETE MY ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
