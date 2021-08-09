import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Create from './create'
import Login from './login'
import SinglePost from './singlePost'
import UpdatePost from './updatePost'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/create' exact component={Create} />
        <Route path='/post/:slug' exact component={SinglePost} />
        <Route path='/post/update/:slug' exact component={UpdatePost} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
