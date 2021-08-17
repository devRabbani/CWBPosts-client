import React from 'react'
import { useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { getUser, removeToken } from './helper'
import menu from './menu.svg'

const Sidebar = ({ history }) => {
  const [sideOpen, setSideOpen] = useState(false)

  const handleClick = () => setSideOpen((prevState) => !prevState)

  return (
    <div>
      {sideOpen && (
        <div onClick={() => setSideOpen(false)} className='backDrop'></div>
      )}
      <div className={`sideNav ${sideOpen ? 'open' : ' '}`}>
        <div className='sideLogo'>
          <NavLink to='/'>CWBPosts</NavLink>
        </div>
        <ul className='sideBarUl'>
          <li>
            <NavLink
              activeClassName='activeLink'
              className='nav-item'
              to='/create'
            >
              Create
            </NavLink>
          </li>

          <li>
            <NavLink
              activeClassName='activeLink'
              className='nav-item'
              to='/about'
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              activeClassName='activeLink'
              className='nav-item'
              to='/contact'
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <nav>
        <div className='container sideNavContainer'>
          <div onClick={handleClick} className='menu'>
            <img src={menu} alt='menu' />
          </div>
          <div className='logo'>
            <NavLink to='/'>CWBPosts</NavLink>
          </div>
          {!getUser() && (
            <div className='ml'>
              <NavLink className='whiteA' to='/login'>
                Login
              </NavLink>
            </div>
          )}

          {getUser() && (
            <div
              onClick={() => removeToken(() => history.push('/'))}
              className='ml'
              style={{ cursor: 'pointer' }}
            >
              Logout
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Sidebar)
