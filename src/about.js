import React from 'react'

const About = () => {
  return (
    <div>
      <div className='container'>
        <h1 className='h1 topPaddingH1'>About</h1>
        <p className='aboutPara'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
          consectetur ea quas quam nisi, voluptatum, mollitia pariatur alias
          quaerat voluptatem dolor eos quisquam sint fuga nihil tempora,
          delectus eligendi incidunt!
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
