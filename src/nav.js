import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, removeToken } from './helper'

const Nav = ({ history }) => (
  <nav>
    <div className="container">
    <ul className='nav'>
    <li>
        <Link to='/'>CWBPosts</Link>
      </li>
      <li>
        <Link to='/create'>Create</Link>
      </li>
      {getUser() && (
        <li
          className='nav-item'
          style={{ color: 'green' }}
        >
          {getUser()}
        </li>
      )}

      {!getUser() && (
        <li className='nav-item'>
          <Link to='/login'>Login</Link>
        </li>
      )}

      {getUser() && (
        <li
          onClick={() => removeToken(() => history.push('/'))}
          className='nav-item'
          style={{ cursor: 'pointer' }}
        >
          Logout
        </li>
      )}
    </ul>
    </div>
    
  </nav>
)

export default withRouter(Nav)
