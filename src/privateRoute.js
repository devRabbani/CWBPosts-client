import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getUser } from './helper'

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={(props) =>
        getUser() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
