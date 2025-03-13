const express = require("express");
const { register , verifyOtp } = require("../controllers/authController");
const upload = require('../middlewares/uploadMiddleware');
const User = require("../models/User");

const router = express.Router();

// Middleware to attach userId before multer processes the file
const attachUserId = async (req, res, next) => {
    try {
        const lastUser = await User.findOne().sort({ createdAt: -1 });
        req.userId = lastUser ? lastUser.userId : "usr1"; // Set default userId
        next();
    } catch (error) {
        console.error("Error fetching last user:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// api/user/register
router.post("/register", register);
router.post("/verifyOtp",attachUserId, upload.single('profileImage'), verifyOtp);
// router.post("/login", login);

module.exports = router;
