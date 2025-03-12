const express = require("express");
const { register, verifyOtp, login } = require("../controllers/authController");

const router = express.Router();


// api/user/register
router.post("/register", register);
router.post("/verifyOtp", verifyOtp);
router.post("/login", login);

module.exports = router;
