import React from 'react'

const About = () => {
  return (
    <div>
      <div className='container'>
        <h1 className='h1 topPaddingH1'>About</h1>
        <p className='aboutPara'>
          CWBPosts is CanWeBe's official blogpost app and it is built in MERN
          stack along with some great plugins.Here readers will read blogposts
          about CWB's software and other things freely.It is a PWA with latest
          features like background Sync,Push Notification,No refresh page reload
          etc.In mobile view it will look and feel like native app.Everyone is
          welcome here for any suggetions or contribution.
        </p>

        <a
          className='btn about'
          href='https://canwebe.netlify.app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Know More
        </a>
      </div>
    </div>
  )
}

export default About
