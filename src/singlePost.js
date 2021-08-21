import React, { useEffect, useState } from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html'
import Footer from './Footer'

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
        <p className='authorDetails'>
          Author : <span className='badge'>{post.user}</span>
          <br /> Published On :{' '}
          <span className='badge'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </p>
        <hr />
        <div className='content'>{renderHTML(post.content)}</div>
      </div>
    </div>
  )

  return (
    <div>
      <div className='mainDiv'>
        <div className='backgroundCard singleBgCard'></div>
        {post ? showPost() : <h3 className='loadingPost'>Loading...</h3>}
      </div>
      <Footer />
    </div>
  )
}

export default SinglePost
