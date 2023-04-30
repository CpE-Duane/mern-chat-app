import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components';
import Spinner from './../components/Spinner';
import Contacts from '../components/Contacts';
import Toast from './../toast/Toast';
import ContactService from '../service/ContactService';
import { useUser } from '../context/User';
import Welcome from '../components/Welcome';
import Messages from '../components/Messages';
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom';

const Chat = () => {

     const socket = useRef()
     const navigate = useNavigate()
     const [loading, setLoading] = useState(false)
     const [contacts, setContacts] = useState([])
     const [selectedChat, setSelectedChat] = useState({})
     const { currentUser } = useUser()
     const [isChat, setIsChat] = useState(false)
     const [screenWidth, setScreenWidth] = useState(window.innerWidth);

     useEffect(() => {
          if (currentUser === null) {
               navigate("/")
          }
     }, [currentUser])

     const getAllContacts = async () => {
          try {
               setLoading(true)
               const { data } = await ContactService.getAllContacts(currentUser?._id);
               if (data.success) {
                    setContacts(data.contacts)
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.message);
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          if (currentUser) {
               getAllContacts()
          }
     }, [currentUser]);

     function getSelectedChat(selected) {
          setSelectedChat(selected)
     }

     useEffect(() => {
          if (currentUser) {
               socket.current = io(process.env.REACT_APP_SERVER_URL)
               socket.current.emit("add-user", currentUser?._id)
          }
     }, [currentUser])

     useEffect(() => {
          const handleResize = () => {
               setScreenWidth(window.innerWidth);
          };

          window.addEventListener('resize', handleResize);

          return () => {
               window.removeEventListener('resize', handleResize);
          };
     }, []);

     return (
          <>
               <Helmet>
                    <title>Chats | Chat App</title>
               </Helmet>

               {
                    loading || !contacts
                         ? <Spinner />
                         : (
                              <ChatContainer className='vh-100 p-sm-5 p-lg-3 p-xxl-5'>
                                   <div className="container-fluid chat h-100">
                                        <div className="row h-100">
                                             <div className={`col-lg-4 col-xxl-3 h-100 p-0 ${isChat ? "d-none" : ""} d-lg-block`}>
                                                  <Contacts contacts={contacts}
                                                       getSelectedChat={getSelectedChat}
                                                       isChat={isChat}
                                                       setIsChat={setIsChat} />
                                             </div>
                                             <div className={`h-100 col-lg-8 col-xxl-9 ${isChat ? "d-block" : "d-none"}
                                                  ${!isChat && screenWidth >= 992 && "d-lg-block"}`}>
                                                  {
                                                       !isChat && screenWidth >= 992
                                                            ? <Welcome />
                                                            : <Messages selectedChat={selectedChat}
                                                                 socket={socket}
                                                                 isChat={isChat}
                                                                 setIsChat={setIsChat} />
                                                  }
                                             </div>
                                        </div>
                                   </div>
                              </ChatContainer>
                         )
               }
          </>
     )
}


const ChatContainer = styled.div`
     background-color: #131324;

     .chat {
          background-color: #00000076;
     }

`

export default Chat