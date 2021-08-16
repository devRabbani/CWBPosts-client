import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Create from './create'
import Error from './Error'
import Login from './login'
import PrivateRoute from './privateRoute'
import SinglePost from './singlePost'
import UpdatePost from './updatePost'

const Routes = () => {
  const handleOffline = () =>
    document.documentElement.style.setProperty('--color-primary', '#9c9c9c')

  useEffect(() => {
    window.addEventListener('offline', handleOffline)

    return () => window.removeEventListener('offline', handleOffline)
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <PrivateRoute path='/create' exact component={Create} />
        <Route path='/post/:slug' exact component={SinglePost} />
        <PrivateRoute path='/post/update/:slug' exact component={UpdatePost} />
        <Route path='/login' exact component={Login} />
        <Route path='*' component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
