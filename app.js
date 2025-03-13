const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const {saveMessage} = require('./controllers/messageController');
const authRoutes = require("./routes/authRoutes"); // Fix import
require("./config/db");

const app = express();
const server = http.createServer(app);
require('dotenv').config();

app.use(cors({
    origin: "*",  // Allows requests from any origin
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  }));
app.use(express.json());

const io = new Server(server, {
    cors: {
      origin: "*",  // Adjust this for better security
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
    }
});




let users = {}; // Store connected users (userId -> socketId mapping)

app.use("/api/user", authRoutes);

// User connects
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins with userId
    socket.on("join", (userId) => {
        users[userId] = socket.id;
        console.log(`${userId} joined with socket ID: ${socket.id}`);

        // Notify all users that a new user is online
        io.emit("userOnline", { userId, online: true });
    });

    // Handle private messaging
    socket.on("privateMessage", async ({ senderId, receiverId, message, imgUrl, time, date }) => {
      const receiverSocketId = users[receiverId];
      
      // Get sender's IP address from socket
      const senderIP = socket.handshake.address; 
  
      // Save message to database with captured IP
      const savedMessage = await saveMessage(senderId, receiverId, message, imgUrl, time, date, senderIP);
  
      if (receiverSocketId) {
          io.to(receiverSocketId).emit("privateMessage", { senderId, message, imgUrl, time, date });
      }
  });
  
  

    // User disconnects
    socket.on("disconnect", () => {
        let disconnectedUserId = Object.keys(users).find((key) => users[key] === socket.id);
        if (disconnectedUserId) {
            delete users[disconnectedUserId];
            io.emit("userOffline", { userId: disconnectedUserId, online: false });
        }
        console.log("User disconnected:", socket.id);
    });
});


const PORT = process.env.PORT || 5000; 
server.listen(PORT, () => {
    console.log("Server running on port 5000");
});
