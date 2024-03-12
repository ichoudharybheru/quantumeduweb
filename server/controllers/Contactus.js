const mailSender = require("../utils/mailSender");

exports.contactUs = async (req, res) => {
  try {
    //const id = req.user.id;
    const { firstname, lastname, email, phoneNumber, message, countrycode } =
      req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phoneNumber ||
      !message ||
      !countrycode
    ) {
      return res.status(203).json({
        success: false,
        message: "all feild are required",
      });
    }
    try {
      const emailResponse = await mailSender(
        email,
        "Password for your account has been updated",
        `name:${firstname} ${lastname}
        <br/>
        ${phoneNumber}
        ${countrycode}
        ${message}`
      );
      const Response = await mailSender(
        "lalbheru720@getMaxListeners.com",
        "Password for your account has been updated",
        `name:${firstname} ${lastname}
        <br/>
        ${phoneNumber}
        ${countrycode}
        ${message}`
      );
    } catch (error) {
      // console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on contact us page",
    });
  }
};
