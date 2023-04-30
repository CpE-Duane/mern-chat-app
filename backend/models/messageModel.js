const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
     message: {
          text: {
               type: String,
               required: true,
          }
     },

     users: {
          type: Array,
          required: true,
     },

     sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
     },
     
}, { timestamps: true });


const Message = mongoose.model("Message", messageSchema)

module.exports = Message