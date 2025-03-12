const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: ""
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
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    lastSeen: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
