import React, { useEffect, useState } from 'react'
import { useUser } from '../context/User'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import Toast from '../toast/Toast';

const Contacts = ({ contacts, getSelectedChat, isChat, setIsChat }) => {

     const [selectedChat, setSelectedChat] = useState({})
     const { currentUser, setCurrentUser } = useUser()
     const navigate = useNavigate()


     function selectChat(contact) {
          setSelectedChat(contact)
          getSelectedChat(contact)
          setIsChat(true)
     }

     function handleLogout() {
          localStorage.removeItem("user")
          navigate("/")
          setCurrentUser(null)
          Toast.successMsg("Logout successfully.")
     }

     return (
          <>
               <ContactContainer className='p-3 p-md-5 p-lg-3'>
                    <div className="contact-list">
                         <div className='d-flex justify-content-center align-items-center mb-4'>
                              <img src={Logo} alt="logo" />
                              <h3 className='text-white ms-2'>ChatApp</h3>
                         </div>

                         <div>
                              {
                                   contacts?.map((contact) => {
                                        return (
                                             <div key={contact?._id}
                                                  className={`contact mb-3 px-3 py-2 py-md-3 d-flex align-items-center ${selectedChat?._id === contact?._id && isChat && "selected"}`}
                                                  onClick={() => selectChat(contact)}>
                                                  <img src={contact.photo}
                                                       alt="profile"
                                                       className='rounded-circle' />
                                                  <p className='text-white m-0 ms-3'>{contact?.fullName}</p>
                                             </div>
                                        )
                                   })
                              }
                         </div>
                    </div>

                    <div className="current-user d-flex align-items-center justify-content-between p-3 text-white">
                         <div className='d-flex align-items-center'>
                              <img src={currentUser?.photo}
                                   alt="profile"
                                   className='rounded-circle' />
                              <p className='m-0 ms-3'>{currentUser?.fullName}</p>
                         </div>
                         <button className='btn btn-default btn-sm text-white fw-bold d-flex align-items-center justify-content-center p-md-2'
                              onClick={handleLogout}>
                              <i className="fa fa-power-off me-md-2"></i>
                              <span className='d-none d-md-block'>LOGOUT</span>
                         </button>
                    </div>
               </ContactContainer>
          </>
     )
}

const ContactContainer = styled.div`
     background-color: #020203;
     height: 100%;
     display: flex;
     flex-direction: column;
     justify-content: space-between;

     .contact-list {
          max-height: 85%;
          overflow-y: scroll;
          ::-webkit-scrollbar {
               width: 0px;
               background: transparent;
          }
          -ms-overflow-style: none; 
          scrollbar-width: none;
     }

     .current-user {
          background-color: #0d0d30;

          &:hover {
               cursor: pointer;
          }
     }

     .contact {
          background-color: #ffffff39;

          &:hover {
               cursor: pointer;
               background-color: #997af0;
          }
     }


     img {
          height: 3rem;
          width: 3rem;
     }

     .selected{
          background-color: #997af0;
     }

     button {
          background-color: #9a86f3;
     }

`

export default Contacts