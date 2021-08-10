import React, { useEffect, useState } from 'react'
import Nav from './nav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import renderHTML from 'react-render-html'
import { getToken, getUser } from './helper'

const App = () => {
  const [posts, setPosts] = useState([])

  const fetchPost = () => {
    axios
      .get(`${process.env.REACT_APP_API}/post`)
      .then((res) => {
        setPosts(res.data)
      })
      .catch((error) => {
        alert('Error on fetching posts')
      })
  }

  const handleDelete = (slug) => {
    let confirm = window.confirm('Are you want to delete this post?')

    if (confirm) {
      axios
        .delete(`${process.env.REACT_APP_API}/post/${slug}`, {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => {
          alert(res.data.message)
          fetchPost()
        })
        .catch((err) => console.log(err))
    } else {
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <div className='container pb-5'>
      <Nav />
      <br />
      <h1>MERN BLOG</h1>
      <hr />
      {posts.map((post, i) => (
        <div
          key={i}
          className='row'
          style={{ borderBottom: '1px solid silver' }}
        >
          <div className='col pt-3 pb-2'>
            <div className='row'>
              <div className='col-md-10'>
                <Link to={`/post/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>

                <div className='lead pt-3'>
                  {renderHTML(post.content.substring(0, 100))}
                </div>
                <p>
                  Author <span className='badge'>{post.user}</span> Published on{' '}
                  <span className='badge'>
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
              {getUser() && (
                <div className='col-md-2'>
                  <Link
                    to={`/post/update/${post.slug}`}
                    className='btn btn-sm btn-outline-primary'
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    className='btn btn-sm btn-outline-danger ml-1'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
