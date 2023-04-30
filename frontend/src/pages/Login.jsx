import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import Spinner from '../components/Spinner'
import Logo from '../assets/logo.svg'
import Toast from '../toast/Toast'
import AuthService from './../service/AuthService';
import { useUser } from '../context/User'

const Login = () => {

     const navigate = useNavigate()
     const { currentUser} = useUser()
     const [loading, setLoading] = useState(false)
     const [showPassword, setShowPassword] = useState(false)
     const [values, setValues] = useState({
          email: "",
          password: '',
     })

     useEffect(() => {
          if (currentUser !== null) {
               navigate("/chats")
          }
     }, [currentUser])

     
     async function handleSubmit(e) {
          e.preventDefault()

          try {
               setLoading(true)
               const { data } = await AuthService.login(values)
               if (data.success) {
                    localStorage.setItem("user", JSON.stringify(data.user))                   
                    if (currentUser?.photo) {
                         navigate("/chats")
                    } else {
                         navigate("/setImage")
                    }
                    Toast.successMsg(data.message)
               } else {
                    Toast.errorMsg(data.message)
               }
          } catch (error) {
               Toast.errorMsg(error.message)
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
                    <title>Login | Chat App</title>
               </Helmet> 
               {
                    loading
                         ? <Spinner />
                         : (
                              <FormContainer>
                                   <div className="container-fluid">
                                        <div className="row vh-100 d-flex justify-content-center align-items-center">
                                             <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-3">
                                                  <form className='px-3 py-5 p-sm-5 rounded-5' onSubmit={handleSubmit}>
                                                       <div className='d-flex justify-content-center align-items-center'>
                                                            <img src={Logo} alt="logo" />
                                                            <h1 className='text-white ms-2'>Chat App</h1>
                                                       </div>

                                                       <div className='mt-4'>
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
                                                                      className='w-100 bg-transparent rounded-2 px-3 py-2 pe-5 py-sm-3 mb-3 mb-sm-4'
                                                                      onChange={(e) => handleChange(e)} />
                                                                 {
                                                                      values.password && <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(!showPassword)}></i>
                                                                 }
                                                            </div>

                                                            <button type="submit" className='btn btn-default w-100 text-white mb-2 py-sm-3 mb-sm-4' disabled={loading}>
                                                                 LOGIN
                                                            </button>
                                                            <p className='text-white text-center'>
                                                                 Already have an account ? <Link to="/register">Sign Up</Link>
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
          top: 20%;
          right: 10px;

          &:hover {
               color: #997af0;
          }
     }

     button {
          background-color: #4e0eff;

          &:hover {
               background-color: #997af0;
          }
     }

     p {
          color: white;

          a {
               color: #4e0eff;
               text-decoration: none;
               font-weight: bold;

               &:hover {
                    color: #997af0;
               }
          }
     }
`;

export default Login