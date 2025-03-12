const express = require('express');
const http = require('http');  // Required for Socket.IO
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",  // Adjust this for better security
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
  }
});

// Middleware
app.use(cors());  
app.use(bodyParser.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // Listen for incoming messages
  socket.on('message', (data) => {
    console.log(`Message received: ${data}`);
    io.emit('message', data);  // Broadcast message to all clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
