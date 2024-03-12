import React from "react";
import { useSelector } from "react-redux";
import CartCourses from "./CartCourses";
import TotalAmount from "./TotalAmount";

const Cart = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state.cart);
  return (
    <div>
      <p className=" text-white text-3xl pb-8"> Your Cart</p>

      <p className=" text-richblack-100">{totalItems} courses in your cart</p>
      <div className=" bg-richblack-500 w-full h-0.5"></div>
      {totalItems === 0 ? (
        <div className=" text-center text-richblack-25 text-4xl mt-7">
          Your Cart is Empty
        </div>
      ) : (
        <div className=" flex flex-row justify-between">
          <div>
            {cart.map((course) => (
              <CartCourses course={course} key={course._id}></CartCourses>
            ))}
          </div>
          <div>
            {" "}
            <TotalAmount />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
