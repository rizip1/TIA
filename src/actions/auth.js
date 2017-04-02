export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS'
export const CHECK_LOGIN_ERROR = 'CHECK_LOGIN_ERROR'

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

const requestLogin = (values) => {
  return {
    type: LOGIN_REQUEST,
    values,
  }
}

const successLogin = () => {
  return {
    type: LOGIN_SUCCESS,
  }
}

const errorLogin = (error) => {
  return {
    type: LOGIN_ERROR,
    error,
  }
}

export const login = (values) => {
  return dispatch => {
    dispatch(requestLogin(values))

    const options = {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
      }),
    }

    return fetch('/auth/login', options)
      .then((response) => response.json().then((data) => ({response, data})))
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorLogin(data.message))
          return Promise.reject({status: response.status})
        } else {
          dispatch(successLogin())
        }
      })
      .catch((err) => {
        dispatch(errorLogin(err))
        return Promise.reject(err)
      })
  }
}

const successCheckLogin = () => {
  return {
    type: CHECK_LOGIN_SUCCESS,
  }
}

const errorCheckLogin = (error) => {
  return {
    type: CHECK_LOGIN_ERROR,
    error,
  }
}

export const setLoginStatus = () => {
  return dispatch => {

    const options = {
      method: 'get',
      credentials: 'include',
    }

    return fetch('/auth/checkLogin', options)
      .then((response) => response.json().then((data) => ({response, data})))
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorCheckLogin(data.message))
        } else {
          dispatch(successCheckLogin())
        }
      })
      .catch((err) => {
        dispatch(errorCheckLogin(err))
      })
  }
}

export const successLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export const errorLogout = (error) => {
  return {
    type: LOGOUT_ERROR,
    error,
  }
}

export const logout = () => {
  return dispatch => {
    const options = {
      method: 'get',
      credentials: 'include',
    }

    return fetch('/auth/logout', options)
      .then(() => {
        dispatch(successLogout())
      })
      .catch((err) => {
        dispatch(errorLogout(err))
        return Promise.reject(err)
      })
  }
}

const requestRegister = (values) => {
  return {
    type: REGISTER_REQUEST,
    values,
  }
}

const successRegister = () => {
  return {
    type: REGISTER_SUCCESS,
  }
}

const errorRegister = (error) => {
  return {
    type: REGISTER_ERROR,
    error,
  }
}

export const register = (values) => {
  return dispatch => {
    dispatch(requestRegister(values))

    const options = {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
      }),
    }

    return fetch('/api/users', options)
      .then((response) => response.json().then((data) => ({response, data})))
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorRegister(data.message))
          return Promise.reject(data)
        } else {
          dispatch(successRegister())
        }
      })
      .catch((err) => {
        dispatch(errorRegister(err))
        return Promise.reject(err)
      })
  }
}
