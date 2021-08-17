import React, { useEffect, useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { getUser, removeToken } from './helper'
import Sidebar from './sidebar'

const Nav = ({ history }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const handleResize = () => setWidth(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width > 500 ? (
    <nav>
      <div className='container navContainer'>
        <div className='logo'>
          <NavLink to='/'>CWBPosts</NavLink>
        </div>
        <ul className='nav'>
          <li>
            <NavLink
              className='nav-item'
              activeClassName='bottomBorder'
              to='/create'
            >
              Create
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName='bottomBorder'
              className='nav-item'
              to='/about'
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName='bottomBorder'
              className='nav-item'
              to='/contact'
            >
              Contact
            </NavLink>
          </li>
        </ul>
        {!getUser() && (
          <div>
            <NavLink
              activeClassName='bottomBorder'
              className='nav-item'
              to='/login'
            >
              Login
            </NavLink>
          </div>
        )}

        {getUser() && (
          <div
            onClick={() => removeToken(() => history.push('/'))}
            className='nav-item'
            style={{ cursor: 'pointer' }}
          >
            Logout
          </div>
        )}
      </div>
    </nav>
  ) : (
    <Sidebar />
  )
}

export default withRouter(Nav)
