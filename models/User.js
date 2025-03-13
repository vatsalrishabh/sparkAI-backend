const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true // Mongoose will generate automatically
    },
    email: { type: String, required: true },
    password:{ type: String, required: true },
    mobile: { type: String, required: true },
    name: {
      type: String,
      required: true
    },
    imgUrls: {
      type: [String], // Array of Strings
      validate: {
        validator: function (arr) {
          return arr.length <= 6;
        },
        message: "You can upload a maximum of 6 images."
      },
      default: []
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },
    dpURL: {
      type: String,
      default: ""
    },
    bio: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    about: {
      type: String,
      default: ""
    },
    latitude: {
      type: Number,
    
    },
    longitude: {
      type: Number,
  
    },
    lastSeen: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
