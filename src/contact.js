import React from 'react'

const Contact = () => {
  return (
    <div>
      <div className='container'>
        <h1 className='h1 topPaddingH1'>Contact</h1>
        <p className='aboutPara'>
          CanWeBe is a Software Development Company.We are a team of some
          brilient developers and designers.We frequently deliver some of the
          great software to the industry.If you want to join our team or want to
          contribute to this blog app please contact us and get your username
          and password
        </p>

        <a
          className='btn contact'
          href='https://canwebe.netlify.app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}

export default Contact
