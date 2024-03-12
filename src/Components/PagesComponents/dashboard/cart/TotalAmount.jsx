import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { capturePayment } from "../../../../services/operations/payment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const TotalAmount = () => {
  const { total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buyHandler = async (cart) => {
    if (user == null) {
      toast.error("PLEASE LOG IN");
      navigate("/login");
    }
    if (user.accountType === "Instructor") {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    await capturePayment({ courses: cart }, token, user, dispatch, navigate);
  };
  return (
    <div>
      <div className=" bg-richblack-800 p-3 border rounded-xl space-y-3 mt-3">
        <p className=" text-richblack-500">Total:</p>
        <p className=" text-caribbeangreen-200 text-4xl ">Rs {total}</p>
        <button
          onClick={() => buyHandler(cart)}
          className=" flex bg-caribbeangreen-200 py-2 px-24 rounded"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default TotalAmount;
