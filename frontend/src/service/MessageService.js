import axios from 'axios'

const serverURL = process.env.REACT_APP_SERVER_URL

const addMessage = (payload) => {
     return axios.post(`${serverURL}/api/messages/add-message`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const getAllMessages = (payload) => {
     return axios.post(`${serverURL}/api/messages/get-all-messages`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const MessageService = {
     addMessage,
     getAllMessages
}

export default MessageService