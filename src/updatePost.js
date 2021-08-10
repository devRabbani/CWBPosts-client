import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from './nav'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { getToken } from './helper'

const UpdatePost = (props) => {
  const [posts, setPosts] = useState({
    title: '',
    user: '',
    slug: '',
  })
  const [content, setContent] = useState('')

  const handleContent = (e) => {
    setContent(e)
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setPosts({
      ...posts,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    const { title, user, slug } = posts
    e.preventDefault()
    axios
      .put(
        `${process.env.REACT_APP_API}/post/${slug}`,
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
        const { title, content, user, slug } = res.data
        setPosts({
          ...posts,
          title,
          content,
          user,
          slug,
        })
        alert(`Sucessfully Updated : ${res.data.title}`)
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response)
      })
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((res) => {
        const { title, slug, content, user } = res.data

        setPosts({
          ...posts,
          title,
          slug,
          user,
        })
        setContent(content)
      })
      .catch((err) => {
        alert('Did not find post Error!')
      })
  }, [])

  return (
    <div className='container pb-5'>
      <Nav />
      <br />
      <h1>UPDATE POST</h1>
      <form>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input
            onChange={handleChange}
            value={posts.title}
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
            value={content}
            theme='bubble'
            name='content'
            placeholder='Type your content'
            required
            className='pb-5 mb-3'
            style={{ border: '1px solid #666' }}
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>User</label>
          <input
            onChange={handleChange}
            value={posts.user}
            type='text'
            name='user'
            placeholder='Username'
            required
            className='form-control'
          />
        </div>
        <div>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePost
