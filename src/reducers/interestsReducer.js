import {
  CREATE_INTEREST_REQUEST, CREATE_INTEREST_SUCCESS, CREATE_INTEREST_ERROR,
  GET_INTERESTS_REQUEST, GET_INTERESTS_SUCCESS, GET_INTERESTS_ERROR,
} from '../actions/interests'

function interestsReducer(state = {
  createInterest: {
    isFetching: false,
    error: null,
    values: null,
  },
  myInterests: {
    interests: null,
    isFetching: false,
    error: null,
  },
  interests: {
    interests: null,
    isFetching: false,
    error: null,
  },
}, action) {
  switch (action.type) {
  case CREATE_INTEREST_REQUEST:
    return {
      ...state,
      createInterest: {
        ...state.createInterest,
        isFetching: true,
        error: null,
        values: action.values,
      },
    }
  case CREATE_INTEREST_SUCCESS:
    return {
      ...state,
      createInterest: {
        ...state.createInterest,
        isFetching: false,
        values: null,
      },
    }
  case CREATE_INTEREST_ERROR:
    return {
      ...state,
      createInterest: {
        ...state.createInterest,
        isFetching: false,
        values: null,
        error: action.error,
      },
    }
  case GET_INTERESTS_REQUEST: {
    const path = action.all ? 'interests' : 'myInterests'
    return {
      ...state,
      [path]: {
        ...state[path],
        isFetching: true,
        error: null,
      },
    }
  }
  case GET_INTERESTS_SUCCESS: {
    const path = action.all ? 'interests' : 'myInterests'
    return {
      ...state,
      [path]: {
        ...state[path],
        isFetching: false,
        interests: action.interests,
      },
    }
  }
  case GET_INTERESTS_ERROR: {
    const path = action.all ? 'interests' : 'myInterests'
    return {
      ...state,
      [path]: {
        ...state[path],
        isFetching: false,
        error: action.error,
      },
    }
  }
  default:
    return state
  }
}

export default interestsReducer
