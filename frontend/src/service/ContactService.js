import axios from "axios"
const serverURL = process.env.REACT_APP_SERVER_URL

const getAllContacts = (contactId) => {
     return axios.get(`${serverURL}/api/auth/getAllContacts/${contactId}`)
}


const ContactService = {
     getAllContacts
}

export default ContactService