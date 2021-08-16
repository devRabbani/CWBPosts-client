import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='error'>
      <h1>404</h1>
      <p>Oops Error occured,Not Found</p>
      <Link className='btnSubmit' to='/'>
        Go back to Homepage
      </Link>
    </div>
  )
}

export default Error
