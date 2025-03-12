const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    fromUser: {
        type: String,
        required: true
    },
    toUser: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    messageStatus: {
        type: String,
        enum: ["sent", "received", "seen", "deleted"],
        default: "sent"
    },
    IPAddress: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
