import React, { useEffect, useState } from 'react'
import Nav from './nav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import renderHTML from 'react-render-html'
import { getToken, getUser } from './helper'
import Footer from './Footer'

const App = () => {
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
    <div>
      <Nav />
      <div className='mainDiv'>
        <div className='backgroundCard'>
          <div className='container home'>
            <h1 className='h1'>Welcome To CWBPosts</h1>
            <p>
              Here you will find some great articles about tech,study,lifestyle
              etc.Feel free to contribute and read here for mor info connect to
              CanWeBe.
            </p>
          </div>
        </div>
        <div className='container'>
          <h3>Recent Posts</h3>
          <hr className='mainH1Hr' />
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
              <div
                key={i}
                className='card'
                style={{ borderBottom: '1px solid silver' }}
              >
                <div className='previewPost'>
                  <Link to={`/post/${post.slug}`}>
                    <h2 className='h2'>{post.title}</h2>
                  </Link>
                  <div className='cardContent'>
                    {renderHTML(
                      post.content.substring(0, 150) +
                        (post.content.length > 200 ? '....' : '')
                    )}
                  </div>
                </div>
                <div className='authorDetails small'>
                  <div>
                    Author :{' '}
                    <span className='badge smallBadge'>{post.user}</span>,&nbsp;
                  </div>
                  <div>
                    Published On :{' '}
                    <span className='badge smallBadge'>
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {getUser() && (
                  <div className='btnDiv'>
                    <Link
                      to={`/post/update/${post.slug}`}
                      className='btnUpdate'
                    >
                      Update
                    </Link>
                    <a
                      onClick={() => handleDelete(post.slug)}
                      className='btnDelete'
                    >
                      Delete
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
