const express = require('express')
const messageController = require('../controllers/messageController')

const router = express.Router()

router.post("/add-message", messageController.addMessage)
router.post("/get-all-messages", messageController.getAllMessage)



module.exports = router