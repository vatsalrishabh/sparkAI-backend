const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerOtp } = require("../utils/registerOtp"); 

// Generate random 6-digit OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.register = async (req, res) => {
    console.log(req.body+"register body");
    try {
        const { collegeEmail, mobile } = req.body; //

        let email = collegeEmail;
        // 1. Check if the user is already registered
        const alreadyRegistered = await User.findOne({ $or: [{ email }, { mobile }] });
        if (alreadyRegistered) {
            return res.status(409).json({ message: "User already registered" });
        }

        // 2. Check if an OTP already exists for this email or mobile
        let existingOtp = await Otp.findOne({ $or: [{ email }, { mobile }] });

        if (existingOtp) {
            await registerOtp(email, existingOtp.otp, "Your SparkAI OTP");
            return res.status(200).json({ message: "OTP sent to email" });
        }

        // 3. If OTP does not exist, generate a new one and store it
        const otp = generateOtp();
        await Otp.create({ email, mobile, otp });

        // Send OTP via email
        await registerOtp(email, otp, "Your SparkAI OTP");

        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.verifyOtp = async (req, res) => {
    try {
        const { name, age, gender, email, password, profileImage } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            name,
            age,
            gender,
            email,
            password: hashedPassword,
            profileImage
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ success: true, token, user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ success: true, token, user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
