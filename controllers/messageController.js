const saveMessage = async (fromUser, toUser, message, imgUrl, time, date, IPAddress) => {
    try {
        const newMessage = new Message({
            fromUser,
            toUser,
            message,
            imgUrl,
            time,  // Use time from frontend
            date,  // Use date from frontend
            messageStatus: "sent",
            IPAddress
        });

        await newMessage.save();
        console.log("Message saved to DB");
        return newMessage;
    } catch (error) {
        console.error("Error saving message:", error);
        return null;
    }
};

module.exports = { saveMessage };
