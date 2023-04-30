import axios from 'axios'

const serverURL = process.env.REACT_APP_SERVER_URL

const register = (payload) => {
     return axios.post(`${serverURL}/api/auth/register`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const login = (payload) => {
     return axios.post(`${serverURL}/api/auth/login`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const uploadImage = (payload) => {
     return axios.post(`${serverURL}/api/auth/upload-image`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}


const AuthService = {
     register,
     login,
     uploadImage
}

export default AuthService