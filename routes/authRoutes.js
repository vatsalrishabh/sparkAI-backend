const express = require("express");
const { register } = require("../controllers/authController");

const router = express.Router();


// api/user/register
router.post("/register", register);
// router.post("/verifyOtp", verifyOtp);
// router.post("/login", login);

module.exports = router;
