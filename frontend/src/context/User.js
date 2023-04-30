import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

const UserProvider = ({children}) => {
     const [currentUser, setCurrentUser] = useState(null)
     const navigate = useNavigate()

     useEffect(() => {
          async function getUserInfo() {
               const userInfo = localStorage.getItem("user")
               if (userInfo) {
                    setCurrentUser( await JSON.parse(userInfo))
               } 
          }

          getUserInfo()
     }, [navigate])


     return (
          <UserContext.Provider value={{currentUser, setCurrentUser}}>
               {children}
          </UserContext.Provider>
     )
}

const useUser = () => useContext(UserContext)

export { useUser, UserProvider}