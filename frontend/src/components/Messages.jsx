import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '../context/User'
import Toast from '../toast/Toast'
import MessageService from '../service/MessageService'

const Messages = ({ selectedChat, socket, isChat, setIsChat }) => {
     let x = "data:image/jpeg;base64,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"
     const scrollRef = useRef();
     const { currentUser } = useUser()
     const [showEmoji, setShowEmoji] = useState(false)
     const [message, setMessage] = useState('')
     const [conversations, setConversations] = useState([])
     const [arrivalMessage, setArrivalMessage] = useState(null)
     const [lastIndex, setLastIndex] = useState(0)

     async function getAllMessages() {
          try {
               const payload = {
                    from: currentUser?._id,
                    to: selectedChat?._id
               }
               const { data } = await MessageService.getAllMessages(payload)
               if (data.success) {
                    setConversations(data.projectMessages)
                    const last = data.projectMessages.slice().reverse().findIndex(obj => obj.fromSelf === false);
                    const result = last >= 0 ? data.projectMessages.length - 1 - last : -1;
                    setLastIndex(result)


               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.message)
          }
     }

     useEffect(() => {
          getAllMessages()
     }, [selectedChat])


     function handleEmojiSelect(emojiData) {
          let msg = message
          msg += emojiData.emoji
          setMessage(msg);
          setShowEmoji(false)
     }

     async function handleSendMessage(event) {
          event.preventDefault()
          try {
               const payload = {
                    from: currentUser?._id,
                    to: selectedChat?._id,
                    message: message
               }

               const { data } = await MessageService.addMessage(payload)

               if (data.success) {
                    socket.current.emit("send-msg", {
                         to: selectedChat?._id,
                         from: currentUser?._id,
                         message: message
                    })

                    const msgs = [...conversations]
                    msgs.push({ fromSelf: true, message: message })
                    setConversations(msgs)

                    getAllMessages()
                    setMessage("")
                    Toast.successMsg(data.message)
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.message)
          }

     }

     useEffect(() => {
          if (socket.current) {
               socket.current.on("msg-receive", (message) => {
                    setArrivalMessage({ fromSelf: false, message: message })
               })
          }
     }, [])

     useEffect(() => {
          arrivalMessage && setConversations((prev) => [...prev, arrivalMessage])
     }, [arrivalMessage])

     useEffect(() => {
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
     }, [conversations]);
     return (
          <>
               <MessagesContainer>
                    <header className='d-flex align-items-center p-3'>
                         <button className='btn btn-default back-arrow me-4 px-3' onClick={() => setIsChat(false)}>
                              <i className="fa fa-arrow-left"></i>
                         </button>
                         <img src={selectedChat.photo} alt="" className='rounded-circle' />
                         <h4 className='text-white ms-3'>{selectedChat.fullName}</h4>
                    </header>
                    <div className='chat-messages m-3'>
                         {
                              conversations?.map((conversation, index) => {
                                   return (
                                        <div key={index} ref={scrollRef}
                                             className={`message text-white ${conversation.fromSelf ? "send" : "received"}`}>
                                             {
                                                  !conversation.fromSelf && index === lastIndex && (
                                                       <img src={selectedChat.photo} alt=""
                                                            style={{ height: '20px', width: '20px', marginTop: "25px" }}
                                                            className='bg-danger' />
                                                  )
                                             }
                                             <p className={`rounded-3 ms-1 ${!conversation.fromSelf && index !== lastIndex && "ms-4"}`}>
                                                  {conversation.message}
                                             </p>
                                        </div>
                                   )
                              })
                         }
                    </div>
                    <div className="send-chat-container p-3">
                         <div className="container-fluid d-flex align-items-center px-0">
                              <div className="position-relative">
                                   <i className=" fa fa-smile text-warning fa-2x me-4"
                                        onClick={() => setShowEmoji(!showEmoji)}>
                                   </i>
                                   <div className='picker position-absolute'>
                                        {
                                             showEmoji && <EmojiPicker onEmojiClick={handleEmojiSelect} theme='dark' />
                                        }
                                   </div>
                              </div>
                              <div className="chat-input w-100">
                                   <input type="text"
                                        className='form-control py-2 py-sm-3 pe-5 text-warning'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder='Type message here.' />
                                   {
                                        message &&
                                        (
                                             <i className="fa fa-paper-plane"
                                                  onClick={handleSendMessage}>
                                             </i>
                                        )
                                   }
                              </div>
                         </div>
                    </div>
               </MessagesContainer>
          </>
     )
}

const MessagesContainer = styled.div`
     height: 100%;
     position: relative;

     header {
          border-bottom: 2px solid #9a86f3;
     }

     img {
          height: 3rem;
          width: 3rem;
     }

     i {
          cursor: pointer;
     }

     .send-chat-container  {
          position: absolute;
          width: 100%;
          bottom: 0;

          input {
               background-color: transparent;
               border: 1px solid #9a86f3;
          }
     }

     .chat-input {
          position: relative;

          i {
               position: absolute;
               right: 0.7rem;
               top: 30%;
               color: #9a86f3;
          }
     }

     .picker {
          left: 0;
          bottom: 150%;
     }

     .send {
          display: flex;
          justify-content: flex-end;
          
          p {
               background-color: #9a86f3;
               padding: 0.6rem;
               max-width: 40%;
               overflow-wrap: break-word;
          }
     }

     .received {
          display: flex;
          justify-content: flex-start;

          p {
               background-color: #498021;
               padding: 0.6rem;
               max-width: 40%;
               overflow-wrap: break-word;
          }
     }
     
     .chat-messages {
          max-height: 75%;
          overflow-y: scroll;
          ::-webkit-scrollbar {
               width: 0px;
               background: transparent;
          }
          -ms-overflow-style: none; 
          scrollbar-width: none;
     }

     .back-arrow {
          background-color: #9a86f3;
          color: white;
     }


`

export default Messages