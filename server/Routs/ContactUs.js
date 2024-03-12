const express = require("express");
const { contactUs } = require("../controllers/Contactus");
const router = express.Router();

router.post("/contact-us", contactUs);
module.exports = router;
