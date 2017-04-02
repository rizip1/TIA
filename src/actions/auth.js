export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS'
export const CHECK_LOGIN_ERROR = 'CHECK_LOGIN_ERROR'

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

const requestLogin = (email, password) => {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
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

export const login = (email, password) => {
  return dispatch => {
    dispatch(requestLogin(email, password))

    const options = {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }

    fetch('/auth/login', options)
      .then((res) => console.log('success', res))
      .catch((e) => console.error(e))

    return fetch('/auth/login', options)
      .then((response) => response.json().then((data) => ({response, data})))
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorLogin(data.message))
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
