import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const course = action.payload;
      const index = state.wishlist.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        toast.error("Course already in wishlist");
        return;
      }

      state.wishlist.push(course);

      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));

      toast.success("Course added to wishlist");
    },

    removeFromWishList: (state, action) => {
      const courseId = action.payload;
      const index = state.wishlist.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        state.wishlist.splice(index, 1);

        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));

        toast.success("Course removed from wishlist");
      }
    },
    resetwishList: (state) => {
      state.wishlist = [];

      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishList, removeFromWishList, resetwishList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
