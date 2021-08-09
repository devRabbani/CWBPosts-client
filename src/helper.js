//save response token

export const authinticate = (res, next) => {
  if (window !== 'undefined') {
    sessionStorage.setItem('token', JSON.stringify(res.data.token))
    sessionStorage.setItem('userName', JSON.stringify(res.data.name))
  }
  next()
}

//acces user token from local storage

export const getToken = () => {
  if (window !== 'undefined') {
    if (sessionStorage.getItem('token')) {
      return JSON.parse(sessionStorage.getItem('token'))
    } else {
      return false
    }
  }
}

//access user name from session

export const getUser = () => {
  if (window !== 'undefined') {
    if (sessionStorage.getItem('userName')) {
      return JSON.parse(sessionStorage.getItem('userName'))
    } else {
      return false
    }
  }
}

//remove froms session storage

export const removeToken = (next) => {
  if (window !== 'undefined') {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userName')
  }
  next()
}
