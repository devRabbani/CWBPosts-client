import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getUser, removeToken } from './helper'

const Nav = ({ history }) => (
  <nav>
    <ul className='nav nav-tabs'>
      <li className='nav-item pr-3 pt-3 pb-3'>
        <Link to='/'>Home</Link>
      </li>
      <li className='nav-item pr-3 pt-3 pb-3'>
        <Link to='/create'>Create</Link>
      </li>
      {getUser() && (
        <li
          className='nav-item ml-auto pr-3 pt-3 pb-3'
          style={{ color: 'green' }}
        >
          {getUser()}
        </li>
      )}

      {!getUser() && (
        <li className='nav-item ml-auto pr-3 pt-3 pb-3'>
          <Link to='/login'>Login</Link>
        </li>
      )}

      {getUser() && (
        <li
          onClick={() => removeToken(() => history.push('/'))}
          className='nav-item pr-3 pt-3 pb-3'
          style={{ cursor: 'pointer' }}
        >
          Logout
        </li>
      )}
    </ul>
  </nav>
)

export default withRouter(Nav)
