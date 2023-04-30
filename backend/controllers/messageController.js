const Message = require("../models/messageModel")

const addMessage = async (req, res) => {
     try {
          const { from, to, message } = req.body
          const data = await Message.create({
               message: { text: message },
               users: [from, to],
               sender: from
          })

          if (!data) {
               return res.status(400).send({
                    success: false,
                    message: "Message not sent."
               })
          }

          res.status(201).send({
               success: true,
               message: "Message sent successfully."
          })

     } catch (error) {
          return res.status(500).send({
               success: false,
               message: "Error while sending message."
          })
     }
}

const getAllMessage = async (req, res) => {
     try {
          const { from, to} = req.body
          const messages = await Message.find({
               users: {
                    $all: [from, to],
               }
          }).sort({ updatedAt: 1})

          const projectMessages = messages.map((msg) => {
               return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text
               }
          })

          return res.status(200).send({
               success: true,
               message: "Messages fetch successfully.",
               projectMessages: projectMessages
          })


     } catch (error) {
          return res.status(500).send({
               success: false,
               message: "Error while sending message."
          })
     }
}

const messageController = {
     addMessage,
     getAllMessage
}

module.exports = messageController