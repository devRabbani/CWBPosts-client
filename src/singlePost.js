import React, { useEffect, useState } from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

const SinglePost = (props) => {
  const [post, setPost] = useState('')
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((res) => {
        setPost(res.data)
        window.scrollTo(0, 0)
      })
      .catch((err) => {
        alert('Did not find post Error!')
        props.history.push('/')
      })
  }, [])

  const showPost = () => (
    <div className='container singleNegMargin'>
      <h1 className='singleH1 h1'>{post.title}</h1>
      <div className='singlePostCard'>
        <div className='authorDetails'>
          <div className='authorImage'></div>
          <div className='logoGroup'>
            <span className='badge user'>{post.user}</span>

            <span className='badge date'>
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <hr />
        <div className='content'>{renderHTML(post.content)}</div>
      </div>
    </div>
  )

  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <div className='mainDiv'>
        <div className='backgroundCard singleBgCard'></div>
        {post ? showPost() : <h3 className='loadingPost'>Loading...</h3>}
      </div>
      <Footer />
    </div>
  )
}

export default SinglePost
