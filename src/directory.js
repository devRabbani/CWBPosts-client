import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import renderHTML from 'react-render-html'
import { getToken, getUser } from './helper'

const Directory = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchPost = () => {
    axios
      .get(`${process.env.REACT_APP_API}/post`)
      .then((res) => {
        setPosts(res.data)
        window.scrollTo(0, 0)
        setLoading(false)
      })
      .catch((error) => {
        setError(true)
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
    <React.Fragment>
      {error ? (
        <h3 className='loading'>
          Error
          <br />
          Try Again
        </h3>
      ) : loading ? (
        <h3 className='loading'>Loading...</h3>
      ) : (
        posts.map((post, i) => (
          <Link to={`/post/${post.slug}`}>
            <div
              key={i}
              className='card'
              style={{ borderBottom: '1px solid silver' }}
            >
              <div className='previewPost'>
                <h2 className='h2'>{post.title}</h2>

                <div className='cardContent'>
                  {renderHTML(
                    post.content.substring(0, 150) +
                      (post.content.length > 200 ? '....' : '')
                  )}
                </div>
              </div>
              <div className='authorDetails'>
                <div className='authorImage'></div>
                <div className='logoGroup'>
                  <span className='badge user'>{post.user}</span>

                  <span className='badge date'>
                    {new Date(post.createdAt).toDateString()}
                  </span>
                </div>
                {getUser() && (
                  <div className='btnDiv'>
                    <Link
                      to={`/post/update/${post.slug}`}
                      className='btnUpdate'
                    >
                      Update
                    </Link>
                    <div
                      onClick={() => handleDelete(post.slug)}
                      className='btnDelete'
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))
      )}
    </React.Fragment>
  )
}

export default Directory
