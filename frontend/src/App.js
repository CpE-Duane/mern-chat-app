import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify'
import PageNotFound from './pages/PageNotFound';
import ImageProfile from './pages/ImageProfile';

const App = () => {

     return (
          <>
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/chats" element={<Chat />} />
                    <Route path="/setImage" element={<ImageProfile />} />
                    <Route path="*" element={<PageNotFound />} />
               </Routes>
               <ToastContainer limit={2} />
          </>
     )
}

export default App