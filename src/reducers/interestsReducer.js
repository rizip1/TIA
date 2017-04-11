import {
  CREATE_INTEREST_REQUEST, CREATE_INTEREST_SUCCESS, CREATE_INTEREST_ERROR,
  GET_INTERESTS_REQUEST, GET_INTERESTS_SUCCESS, GET_INTERESTS_ERROR,
  DELETE_INTEREST_REQUEST, DELETE_INTEREST_SUCCESS, DELETE_INTEREST_ERROR,
  ASSIGN_INTEREST_REQUEST, ASSIGN_INTEREST_SUCCESS, ASSIGN_INTEREST_ERROR,
} from '../actions/interests'

function addInterest(interests, interestId, login) {
  if (!interests.interests) {
    return interests.interests
  }
  return interests.interests.map((interest) => {
    return interest.id === interestId ?
      {...interest, users: [...interest.users, login]}
      : interest
  })
}

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
  deleteInterests: {
    isFetching: false,
    error: null,
    interestId: null,
  },
  assignInterest: {
    interestId: null,
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
  case DELETE_INTEREST_REQUEST:
    return {
      ...state,
      deleteInterests: {
        ...state.deleteInterests,
        isFetching: true,
        error: null,
        interestId: action.interestId,
      },
    }
  case DELETE_INTEREST_SUCCESS: {
    const newMyInterests = state.myInterests.interests.filter((interest) => {
      return interest.id !== action.interestId
    })
    return {
      ...state,
      deleteInterests: {
        ...state.deleteInterests,
        isFetching: false,
      },
      myInterests: {
        ...state.myInterests,
        interests: newMyInterests,
      },
    }
  }
  case DELETE_INTEREST_ERROR:
    return {
      ...state,
      deleteInterests: {
        ...state.deleteInterests,
        isFetching: false,
        error: action.error,
      },
    }
  case ASSIGN_INTEREST_REQUEST:
    return {
      ...state,
      assignInterest: {
        ...state.assignInterest,
        isFetching: false,
        error: null,
        interestId: action.interestId,
      },
    }
  case ASSIGN_INTEREST_SUCCESS: {
    const allInterests = addInterest(state.interests, action.interestId, action.login)
    const myInterests = addInterest(state.myInterests, action.interestId, action.login)

    console.log('all', allInterests)
    console.log('my', myInterests)
    return {
      ...state,
      assignInterest: {
        ...state.assignInterest,
        isFetching: false,
      },
      interests: {
        ...state.interests,
        interests: allInterests,
      },
      myInterests: {
        ...state.myInterests,
        interests: myInterests,
      },
    }
  }
  case ASSIGN_INTEREST_ERROR:
    return {
      ...state,
      assignInterest: {
        ...state.assignInterest,
        isFetching: false,
        error: action.error,
      },
    }
  default:
    return state
  }
}

export default interestsReducer
