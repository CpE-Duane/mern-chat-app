import React from 'react'
import { useUser } from '../context/User'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

const Welcome = () => {

     const { currentUser } = useUser()

     return (
          <>
               <WelcomeContainer>
                    <img src={Robot} alt="" />
                    <h1 className='text-white'>
                         Welcome, <span>{currentUser?.fullName}!</span>
                    </h1>
                    <h3 className='text-white'>
                         Select a chat to start chatting.
                    </h3>
               </WelcomeContainer>
          </>
     )
}

const WelcomeContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;
     height: 100%;
     
     img {
          height: 20rem;
     }

     h1 span {
          color: #4e00ff;
     }
`

export default Welcome
