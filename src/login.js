import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { authinticate, getUser } from './helper'
import { withRouter } from 'react-router-dom'
import ButtonLoading from './buttonLoading'

const Login = ({ history }) => {
  const [state, setState] = useState({
    name: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const { name, password } = state

  const handleChange = (e) => {
    const { value, name } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    setLoading(true)
    const { name, password } = state
    e.preventDefault()

    axios
      .post(`${process.env.REACT_APP_API}/login`, {
        name,
        password,
      })
      .then((res) => {
        setLoading(false)
        authinticate(res, () => history.push('/create'))
      })
      .catch((error) => {
        alert(error.response.data.error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getUser() && history.push('/')
  }, [])

  return (
    <div className='login'>
      <div className='container'>
        <h1 className='h1 topPaddingH1'>LOGIN</h1>
        <div className='formCard'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-muted'>Name</label>
              <input
                onChange={handleChange}
                value={name}
                type='text'
                name='name'
                placeholder='Enter Name'
                required
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label className='text-muted'>Password</label>
              <input
                type='password'
                onChange={handleChange}
                value={password}
                name='password'
                placeholder='Enter password'
                required
                className='form-control'
              />
            </div>

            <ButtonLoading color='greenBtn' loading={loading}>
              Sign In
            </ButtonLoading>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login)
