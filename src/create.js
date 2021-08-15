import React, { useState } from 'react'
import axios from 'axios'
import Nav from './nav'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { getUser, getToken } from './helper'
import Footer from './Footer'

const Create = () => {
  const [state, setState] = useState({
    title: '',
    user: getUser(),
  })
  const [content, setContent] = useState('')

  const handleContent = (e) => {
    setContent(e)
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    const { title, user } = state
    e.preventDefault()
    axios
      .post(
        `${process.env.REACT_APP_API}/post`,
        {
          title,
          content,
          user,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((res) => {
        setState({
          title: '',
          user: '',
        })
        setContent('')

        alert(`Sucessfull Create : ${res.data.title}`)
      })
      .catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error)
      })
  }

  return (
    <div>
      <Nav />
      <div className="container mainDiv">
      <h1 className='h1 createH1'>Create Post</h1>
      <div className="formCard">
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input
            onChange={handleChange}
            value={state.title}
            type='text'
            name='title'
            placeholder='Title'
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Content</label>
          <ReactQuill
            onChange={handleContent}
            name='content'
            placeholder='Type your content'
            value={content}
            style={{ border: '1px solid #666',padding:'7px',minHeight:'150px'}}
            theme='bubble'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>User</label>
          <input
            onChange={handleChange}
            value={state.user}
            type='text'
            name='user'
            placeholder='Username'
            required
            className='form-control'
          />
        </div>
        <div>
          <button className='btnSubmit'>Submit</button>
        </div>
      </form>
      </div>
     
      </div>
      <Footer/>
    </div>
  )
}

export default Create
