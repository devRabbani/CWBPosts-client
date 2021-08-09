import React, { useState } from 'react'
import axios from 'axios'
import Nav from './nav'

const Create = () => {
  const [state, setState] = useState({
    title: '',
    content: '',
    user: '',
  })

  const handleChange = (e) => {
    const { value, name } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    const { title, content, user } = state
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API}/post`, {
        title,
        content,
        user,
      })
      .then((res) => {
        setState({
          title: '',
          content: '',
          user: '',
        })

        console.log(res)
        alert(`Sucessfull Create : ${res.data.title}`)
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response)
      })
  }

  return (
    <div className='container pb-5'>
      <Nav />
      <br />
      <h1>Create Post</h1>
      <br />
      <form>
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
          <textarea
            onChange={handleChange}
            value={state.content}
            name='content'
            placeholder='Type your content'
            required
            className='form-control'
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
          <button className='btn btn-primary' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
