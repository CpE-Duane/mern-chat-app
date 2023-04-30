const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const socket = require("socket.io")
const bodyParser = require("body-parser")
const corsOptions = require("./config/corsOptions")
const path = require('path');

const app = express()
require('dotenv').config()

app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', 'https://mern-chat-app-nm0v.onrender.com');
     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
     next();
});

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

connectDB()

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const server = app.listen(process.env.PORT, () => {
     console.log(`Server started in PORT: ${process.env.PORT}`)
})

const io = socket(server, {
     cors: {
          origin: "https://mern-chat-app-nm0v.onrender.com",
          credentials: true,
     }
})

global.onlineUsers = new Map()

io.on("connection", (socket) => {
     global.chatSocket = socket
     socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id)
     })

     socket.on("send-msg", (data) => {
          const sendUserSocket = onlineUsers.get(data.to)
          if (sendUserSocket) {
               socket.to(sendUserSocket).emit("msg-receive", data.message)
          }
     })
})