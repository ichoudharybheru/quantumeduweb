const express = require("express");
const app = express();
const usersRoutes = require("./Routs/User");
const profileRoutes = require("./Routs/Profile");
const courseRoutes = require("./Routs/Course");
const contactusRoutes = require("./Routs/ContactUs");
const paymentRoute = require("./Routs/Payment");
require("dotenv").config();
const { cloudinaryConnect } = require("./config/cloudinary");
const cors = require("cors");

const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: "https://quantumeducation.vercel.app",
    credentials: true,
  })
);
require("./config/database").connect();
cloudinaryConnect();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/api/v1/auth", usersRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/contact", contactusRoutes);
app.use("/api/v1/payment", paymentRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
