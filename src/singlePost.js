import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './nav'
import renderHTML from 'react-render-html'

const SinglePost = (props) => {
  const [post, setPost] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        alert('Did not find post Error!')
      })
  }, [])

  const showPost = () => (
    <div className='row'>
      <div className='col-md-8 offset-md-2 pt-3 pb-2'>
        <h1>{post.title}</h1>
        <p>
          Author <span className='badge'>{post.user}</span> Published on{' '}
          <span className='badge'>
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </p>
        <div className='lead pt-3'>{renderHTML(post.content)}</div>
      </div>
    </div>
  )

  return (
    <div className='container pb-5'>
      <Nav />
      <br />
      {post && showPost()}
    </div>
  )
}

export default SinglePost
