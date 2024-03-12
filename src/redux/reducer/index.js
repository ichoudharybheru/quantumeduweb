import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import profileReducer from "../slices/profile";
import courseReducer from "../slices/coursesSlice";
import wishlistSlicereducer from "../slices/wishlistSlice";
import viewCoursereducer from "../slices/viewCourse";
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  course: courseReducer,
  wishlist: wishlistSlicereducer,
  viewCourse: viewCoursereducer,
});

export default rootReducer;
