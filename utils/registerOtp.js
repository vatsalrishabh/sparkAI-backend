const nodemailer = require('nodemailer');
require("dotenv").config();
// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services if needed
    auth: {
        user: process.env.SparkAIEmail, // Your SparkAI email address
        pass: process.env.SparkAIPassword // Your email password (store securely in environment variables)
    }
});

// Function to send OTP email
const registerOtp = (to, otp, subject) => {
    const mailOptions = {
        from: process.env.SparkAIEmail, // Sender email address
        to, // Recipient email address
        subject: subject, // Email subject
        text: `Your OTP to register is: ${otp}. Please use this OTP to complete your registration.`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #007bff;">Welcome to SparkAI</h2>
                <p>Dear User,</p>
                <p>Thank you for signing up with SparkAI! Please use the One-Time Password (OTP) below to verify your account.</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; color: #007bff; font-weight: bold;">Your OTP: ${otp}</span>
                </div>
                <p>If you did not request this OTP, please ignore this email.</p>
                <p style="text-align: center; margin: 20px 0;">
                    <img src="https://example.com/sparkai-logo.png" alt="SparkAI" style="width: 100%; max-width: 400px; border-radius: 10px;" />
                </p>
                <p>If you have any issues, please contact SparkAI support.</p>
                <p style="color: #777;">Best regards,<br/>The SparkAI Team</p>
            </div>
        `,
    };

    // Send the email
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = {
    registerOtp
};
