import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Aboutus from "./Pages/Aboutus";
import Navbar from "./Components/common/Navbar";
import Login from "./Pages/Login";

import Error from "./Pages/Error";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword1 from "./Pages/UpdatePassword1";
import VerifyEmail from "./Pages/VerifyEmail";

import MyProfile from "./Components/PagesComponents/dashboard/MyProfile";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/PagesComponents/auth/PrivateRoute";
import EnrolledCourses from "./Components/PagesComponents/dashboard/EnrolledCourses";
import Setting from "./Components/PagesComponents/dashboard/setting/Setting";
import Cart from "./Components/PagesComponents/dashboard/cart/Cart";
import AddCourse from "./Components/PagesComponents/dashboard/add_Course";
import MyCourses from "./Components/PagesComponents/dashboard/MyCourses";
import EditCourse from "./Components/PagesComponents/dashboard/InstructorCourse/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import WishList from "./Components/PagesComponents/dashboard/wishlist/WishList";
import ViewCourse from "./Pages/ViewCourse";
import MyDashBoard from "./Pages/MyDashBoard";
import VideoDetails from "./Components/PagesComponents/viewcourse/VideoDetails";
import SignUpPage from "./Pages/SignUpPage";
import ContactUs from "./Pages/ContactUs";

function App() {
  return (
    <div className=" w-screen  font-inter min-h-screen flex flex-col bg-richblack-900 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route path="/aboutus" element={<Aboutus></Aboutus>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/error" element={<Error></Error>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/contact" element={<ContactUs></ContactUs>} />
        <Route
          path="update-password/:id"
          element={<UpdatePassword1></UpdatePassword1>}
        ></Route>
        <Route path="/verifyemail" element={<VerifyEmail />}></Route>
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          (
          <>
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          </>
          )
        </Route>
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {" "}
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          <Route
            path="/dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />
          <Route path="/dashboard/purchase-history" />
          <Route path="/dashboard/setting" element={<Setting />} />
          <Route path="/dashboard/cart" element={<Cart></Cart>}></Route>
          <Route path="/dashboard/wish-list" element={<WishList />}></Route>
          <Route path="/dashboard/add-course" element={<AddCourse />}></Route>
          <Route path="/dashboard/my-courses" element={<MyCourses />} />
          <Route
            path="dashboard/edit-course/:courseId"
            element={<EditCourse />}
          />
          <Route path="/dashboard/instructor" element={<MyDashBoard />} />
        </Route>

        <Route
          path="dashboard/edit-course/:courseId"
          element={<EditCourse />}
        />
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
