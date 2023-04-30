import React from 'react'
import loader from '../assets/loader.gif'

const Spinner = () => {
     return (
          <>
               <div className='container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark'>
                    <img src={loader} alt="loader" />
               </div>
          </>
     )
}

export default Spinner