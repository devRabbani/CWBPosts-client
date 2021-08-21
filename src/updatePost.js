import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import { getToken } from './helper'
import Footer from './Footer'
import ButtonLoading from './buttonLoading'

const UpdatePost = (props) => {
  const [posts, setPosts] = useState({
    title: '',
    user: '',
    slug: '',
  })
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
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
        setLoading(false)
        alert(`Sucessfully Updated : ${res.data.title}`)
        props.history.push('/')
      })
      .catch((error) => {
        setLoading(false)
        alert(error.response)
        props.history.push('/error')
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
    <div>
      <div className='container mainDiv'>
        <h1 className='h1 createH1'>UPDATE POST</h1>
        <div className='formCard'>
          <form onSubmit={handleSubmit}>
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
              <ButtonLoading color='blueBtn' loading={loading}>
                Update
              </ButtonLoading>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UpdatePost
