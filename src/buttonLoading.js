import React from 'react'
import Loader from './img/loading.svg'

const ButtonLoading = ({ loading, children, color }) => {
  return (
    <button className={`btnSignin ${color} ${loading ? 'btnFade' : ''}`}>
      {!loading ? (
        children
      ) : (
        <img className='loader' src={Loader} alt='loader' />
      )}
    </button>
  )
}

export default ButtonLoading
