import React from 'react'
import Footer from './Footer'
import ToTop from './toTop'
import Directory from './directory'

const App = () => {
  return (
    <div>
      <ToTop />
      <div className='mainDiv'>
        <div className='backgroundCard'>
          <div className='container home'>
            <h1 className='h1'>Welcome To CWBPosts</h1>
            <p>
              Here you will find some great articles about tech, study,
              lifestyle. Feel free to contribute and read here. For more info,
              connect to CanWeBe.
            </p>
          </div>
        </div>
        <div className='container'>
          <h3>Recent Posts</h3>
          <hr className='mainH1Hr' />
          <Directory />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
