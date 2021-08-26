import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './nav'

const PrivateRoute = lazy(() => import('./privateRoute'))
const Login = lazy(() => import('./login'))
const Create = lazy(() => import('./create'))
const Error = lazy(() => import('./Error'))
const About = lazy(() => import('./about'))
const App = lazy(() => import('./App'))
const Contact = lazy(() => import('./contact'))
const SinglePost = lazy(() => import('./singlePost'))
const UpdatePost = lazy(() => import('./updatePost'))

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Suspense fallback={null}>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/login' component={Login} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <PrivateRoute path='/create' component={Create} />
          <Route exact path='/post/:slug' component={SinglePost} />
          <PrivateRoute
            exact
            path='/post/update/:slug'
            component={UpdatePost}
          />
          <Route component={Error} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
