import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  CHECK_LOGIN_SUCCESS, CHECK_LOGIN_ERROR,
  LOGOUT_SUCCESS, LOGOUT_ERROR,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR,
} from '../actions/auth'

function authReducer(state = {
  login: {
    isFetching: false,
    error: null,
    email: null,
    password: null,
  },
  logout: {
    error: null,
  },
  register: {
    isFetching: false,
    error: null,
    values: null,
  },
  isAuthenticated: false,
}, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      login: {
        ...state.login,
        isFetching: true,
        email: action.email,
        password: action.password,
        error: null,
      },
      isAuthenticated: false,
    }
  case LOGIN_SUCCESS:
    return {
      ...state,
      login: {
        ...state.login,
        isFetching: false,
        email: null,
        password: null,
      },
      isAuthenticated: true,
    }
  case LOGIN_ERROR:
    return {
      ...state,
      login: {
        ...state.login,
        isFetching: false,
        email: null,
        password: null,
        error: action.error,
      },
    }
  case CHECK_LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
    }
  case CHECK_LOGIN_ERROR:
    return {
      ...state,
      isAuthenticated: false,
    }
  case LOGOUT_SUCCESS:
    return {
      ...state,
      logout: {
        ...state.logout,
        error: null,
      },
      isAuthenticated: false,
    }
  case LOGOUT_ERROR:
    return {
      ...state,
      logout: {
        ...state.logout,
        error: action.error,
      },
    }
  case REGISTER_REQUEST:
    return {
      ...state,
      register: {
        ...state.register,
        isFetching: true,
        error: null,
        values: action.values,
      },
    }
  case REGISTER_SUCCESS:
    return {
      ...state,
      register: {
        ...state.register,
        isFetching: false,
        values: null,
      },
    }
  case REGISTER_ERROR:
    return {
      ...state,
      register: {
        ...state.register,
        isFetching: false,
        values: null,
        error: action.error,
      },
    }
  default:
    return state
  }
}

export default authReducer
