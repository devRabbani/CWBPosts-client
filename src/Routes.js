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
        <Route path='/' exact component={App} />
        <PrivateRoute path='/create' exact component={Create} />
        <Route path='/post/:slug' exact component={SinglePost} />
        <PrivateRoute path='/post/update/:slug' exact component={UpdatePost} />
        <Route path='/login' exact component={Login} />
        <Route path='/about' exact component={About} />
        <Route path='/contact' exact component={Contact} />
        <Route path='*' component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
