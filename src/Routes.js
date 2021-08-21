import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from './about'
import App from './App'
import Contact from './contact'
import Create from './create'
import Error from './Error'
import Login from './login'
import PrivateRoute from './privateRoute'
import SinglePost from './singlePost'
import UpdatePost from './updatePost'
import Nav from './nav'

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path='/' component={App} />
        <PrivateRoute path='/create' component={Create} />
        <Route exact path='/post/:slug' component={SinglePost} />
        <PrivateRoute exact path='/post/update/:slug' component={UpdatePost} />
        <Route path='/login' component={Login} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
