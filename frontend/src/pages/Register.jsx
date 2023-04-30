import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import Toast from './../toast/Toast';
import Spinner from '../components/Spinner';
import AuthService from './../service/AuthService';
import { Helmet } from 'react-helmet'
import { useUser } from '../context/User';

const Register = () => {

     const [loading, setLoading] = useState(false)
     const navigate = useNavigate()
     const { currentUser } = useUser()
     const [showPassword, setShowPassword] = useState(false)
     const [showConfirmPassword, setShowConfirmPassword] = useState(false)
     const [values, setValues] = useState({
          fullName: "",
          email: "",
          password: '',
          confirmPassword: ''
     })

     useEffect(() => {
          if ( currentUser) {
               navigate("/chats")
          }
     }, [currentUser])

     async function handleSubmit(e) {
          e.preventDefault()

          try {
               setLoading(true)
               const { data } = await AuthService.register(values)
               if (data.success) {
                    Toast.successMsg(data.message)
                    navigate("/login")
               } else {
                    Toast.errorMsg(data.message)
               }

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }

     }



     function handleChange(e) {
          setValues({
               ...values,
               [e.target.name]: e.target.value
          })
     }

     return (
          <>
               <Helmet>
                    <title>Register | Chat App</title>
               </Helmet>
               {
                    loading
                         ? <Spinner />
                         : (
                              <FormContainer>
                                   <div className="container-fluid">
                                        <div className="row vh-100 d-flex justify-content-center align-items-center">
                                             <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-3">
                                                  <form className='px-4 py-5 p-sm-5 rounded-5' onSubmit={handleSubmit}>
                                                       <div className='d-flex justify-content-center align-items-center'>
                                                            <img src={Logo} alt="logo" />
                                                            <h1 className='text-white ms-2'>Chat App</h1>
                                                       </div>

                                                       <div className='mt-4'>
                                                            <input
                                                                 type="text"
                                                                 placeholder="Full Name"
                                                                 name="fullName"
                                                                 value={values.fullName}
                                                                 className='w-100 bg-transparent rounded-2 px-3 py-2 py-sm-3 mb-3 mb-sm-4'
                                                                 onChange={(e) => handleChange(e)}
                                                            />
                                                            <input
                                                                 type="email"
                                                                 placeholder="Email"
                                                                 name="email"
                                                                 value={values.email}
                                                                 className='w-100 bg-transparent rounded-2 px-3 py-2 py-sm-3 mb-3 mb-sm-4'
                                                                 onChange={(e) => handleChange(e)}
                                                            />
                                                            <div className='position-relative'>
                                                                 <input
                                                                      type={showPassword ? "text" : "password"}
                                                                      placeholder="Password"
                                                                      name="password"
                                                                      value={values.password}
                                                                      className='w-100 bg-transparent rounded-2 px-3 py-2 py-sm-3 pe-5 mb-3 mb-sm-4'
                                                                      onChange={(e) => handleChange(e)} />
                                                                 {
                                                                      values.password && <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(!showPassword)}></i>
                                                                 }
                                                            </div>
                                                            <div className='position-relative'>
                                                                 <input
                                                                      type={showConfirmPassword ? "text" : "password"}
                                                                      placeholder="Confirm Password"
                                                                      name="confirmPassword"
                                                                      value={values.confirmPassword}
                                                                      className='w-100 bg-transparent rounded-2 px-3 py-2 pe-5 py-sm-3 mb-3 mb-sm-4'
                                                                      onChange={(e) => handleChange(e)} />
                                                                 {
                                                                      values.confirmPassword && <i className={`ms-5 fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                                                                 }
                                                            </div>
                                                            <button type="submit" className='btn btn-default w-100 text-white mb-2 py-sm-3 mb-sm-4' disabled={loading}>Sign Up</button>
                                                            <p className='text-white text-center'>
                                                                 Already have an account ? <Link to="/login">Login</Link>
                                                            </p>
                                                       </div>
                                                  </form>
                                             </div>
                                        </div>
                                   </div>
                              </FormContainer>
                         )
               }
          </>
     )
}

const FormContainer = styled.div`
     background-color: #131324;

     form {
          background-color: #00000076;
     }

     img {
          height: 3rem;
     }

     input {
          border: 0.1rem solid #4e0eff;
          color: white;

          &:focus {
               border: 0.1rem solid #997af0;
               outline: none;
          }
     }

     i {
          color: #4e0eff;
          cursor: pointer;
          position: absolute;
          top: 25%;
          right: 20px;

          &:hover {
               color: #997af0;
          }
     }

     button {
          background-color: #4e0eff;

          &:hover {
               background-color: #997af0 !important;
          }
     }

     p {
          color: white;

          a {
               color: #4e0eff;
               text-decoration: none;
               font-weight: bold;

               &:hover {
                    color: #997af0 ;
               }
          }
     }
`;

export default Register