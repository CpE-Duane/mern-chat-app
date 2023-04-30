import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Toast from '../toast/Toast'
import { Helmet } from 'react-helmet'
import Spinner from './../components/Spinner';
import AuthService from './../service/AuthService';
import { useUser } from '../context/User';
import { useNavigate } from 'react-router-dom';

const ImageProfile = () => {

     const [imgFile, setImgFile] = useState('')
     const [loading, setLoading] = useState(false)
     const { currentUser } = useUser()
     const navigate = useNavigate()

     useEffect(() => {
          if (currentUser) {
               if (currentUser.photo) {
                    navigate("/chats")
               }
          }
     }, [currentUser])

     async function handleFileSelect(e) {
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = () => {
               setImgFile(reader.result)
          }

          reader.onerror = error => {
               console.log(error);
          }
     };

     async function handleDragOver(e) {
          e.preventDefault()
     };

     async function handleDrop(e) {
          e.preventDefault();
          let reader = new FileReader();
          reader.readAsDataURL(e.dataTransfer.files[0]);
          reader.onload = () => {
               setImgFile(reader.result)
          };
          reader.onerror = (error) => {
               console.log(error);
          };
     };

     async function uploadImage() {
          const payload = {
               photo: imgFile,
               id: currentUser?._id
          }

          try {
               setLoading(true)
               const { data } = await AuthService.uploadImage(payload)
               if (data.success) {

                    const user = JSON.parse(localStorage.getItem("user"))
                    user.photo = data.photo
                    localStorage.setItem("user", JSON.stringify(user))

                    Toast.successMsg(data.message)
                    navigate("/chats")
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     return (
          <>
               <Helmet>
                    <title>Set Image | Chat App</title>
               </Helmet>
               {
                    loading
                         ? <Spinner />
                         : (
                              <ImageProfileContainer className='px-3'>
                                   <div className="col-12 col-sm-8 col-md-7 col-lg-4">
                                        <div className="dropzone p-5"
                                             onDragOver={handleDragOver}
                                             onDrop={handleDrop}
                                             onClick={() => document.getElementById('file').click()}>
                                             {
                                                  imgFile ? (
                                                       <img src={imgFile}
                                                            alt="Selected file"
                                                            className="img-fluid"
                                                       />
                                                  ) : (
                                                       <p>Drop an image here or click to select</p>
                                                  )
                                             }
                                        </div>
                                        <input
                                             type="file"
                                             id="file"
                                             name='photo'
                                             className='d-none'
                                             accept="image/*"
                                             onChange={handleFileSelect} />
                                   </div>
                                   <h2 className='my-4'>Add your profile picture.</h2>
                                   {
                                        imgFile && <button className='btn btn-default btn-lg' onClick={uploadImage}>Set Image</button>
                                   }
                              </ImageProfileContainer>
                         )
               }
          </>
     )
}

const ImageProfileContainer = styled.div`
     height: 100vh;
     background-color: #131324;
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;
     color: white;

     .dropzone {
          border: 2px dashed #ccc;
          text-align: center;
          min-height: 200px;
          overflow: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
     }

     .dropzone:hover {
          background-color: #45333346;
     }

     .dropzone img {
          max-height: 280px;
     }

     button {
          background-color: #4e0eff;
          color: white;

          &:hover {
               background-color: #997af0;
          }
     }
`

export default ImageProfile