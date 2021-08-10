import React, { useState } from 'react'
import axios from 'axios'
import Nav from './nav'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { getUser, getToken } from './helper'

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
    <div className='container pb-5'>
      <Nav />
      <br />
      <h1>Create Post</h1>
      <br />
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
            className='pb-5 mb-3'
            value={content}
            style={{ border: '1px solid #666' }}
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
          <button className='btn btn-primary'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Create
