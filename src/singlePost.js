import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './nav'

const SinglePost = (props) => {
  const [post, setPost] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        alert('Did not find post Error!')
      })
  }, [])

  return (
    <div className='container pb-5'>
      <Nav />
      <br />
      <h1>{post.title}</h1>
      <p>
        Author <span className='badge'>{post.user}</span> Published on{' '}
        <span className='badge'>
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </p>
      <p className='lead'>{post.content}</p>
    </div>
  )
}

export default SinglePost
