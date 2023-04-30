const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const socket = require("socket.io")
const bodyParser = require("body-parser")
const corsOptions = require("./config/corsOptions")

const app = express()
require('dotenv').config()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

connectDB()

const server = app.listen(process.env.PORT, () => {
     console.log(`Server started in PORT: ${process.env.PORT}`)
})

const io = socket(server, {
     cors: {
          origin: "http://localhost:3000",
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