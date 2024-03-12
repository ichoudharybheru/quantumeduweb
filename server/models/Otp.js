const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});
async function sendVerificatonEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "verfication Email from Quantam",
      otp
    );
    console.log("email send seccussfully: ", mailResponse);
  } catch (error) {
    // console.log("error occured while sending otp", error);
  }
}
otpschema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificatonEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("Otp", otpschema);
