const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfbirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  number: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("Profile", ProfileSchema);
