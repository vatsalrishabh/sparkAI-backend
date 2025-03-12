const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Get the MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

console.log("Loaded environment variables:", {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ,
  JWT_SECRET: process.env.JWT_SECRET ,
  SparkAIEmail: process.env.SparkAIEmail,
  SparkAIPassword: process.env.SparkAIPassword ,
});

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });