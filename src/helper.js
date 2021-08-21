//save response token

export const authinticate = (res, next) => {
  if (window !== 'undefined') {
    localStorage.setItem('token', JSON.stringify(res.data.token))
    localStorage.setItem('userName', JSON.stringify(res.data.name))
  }
  next()
}

//acces user token from local storage

export const getToken = () => {
  if (window !== 'undefined') {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'))
    } else {
      return false
    }
  }
}

//access user name from session

export const getUser = () => {
  if (window !== 'undefined') {
    if (localStorage.getItem('userName')) {
      return JSON.parse(localStorage.getItem('userName'))
    } else {
      return false
    }
  }
}

//remove froms session storage

export const removeToken = (next) => {
  if (window !== 'undefined') {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
  }
  next()
}
