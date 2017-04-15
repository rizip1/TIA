import {
  CREATE_INTEREST_REQUEST, CREATE_INTEREST_SUCCESS, CREATE_INTEREST_ERROR,
  GET_INTERESTS_REQUEST, GET_INTERESTS_SUCCESS, GET_INTERESTS_ERROR,
  DELETE_INTEREST_REQUEST, DELETE_INTEREST_SUCCESS, DELETE_INTEREST_ERROR,
  ASSIGN_INTEREST_REQUEST, ASSIGN_INTEREST_SUCCESS, ASSIGN_INTEREST_ERROR,
  UNASSIGN_INTEREST_REQUEST, UNASSIGN_INTEREST_SUCCESS, UNASSIGN_INTEREST_ERROR,
} from '../actions/interests'

const ASSIGN = 'ASSIGN'
const UNASSIGN = 'UNASSIGN'

function unassignFromInterest(interests, interestId, login) {
  return interests.data.map((interest) => {
    if (interest.id !== interestId) {
      return interest
    } else {
      const loginIndex = interest.users.indexOf(login)
      return {...interest, users: [...interest.users.slice(0, loginIndex),
        ...interest.users.slice(loginIndex + 1)]}
    }
  })
}

function assignToInterest(interests, interestId, login) {
  return interests.data.map((interest) => {
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
    data: null,
    isFetching: false,
    error: null,
  },
  allInterests: {
    data: null,
    isFetching: false,
    error: null,
  },
  deleteInterests: {
    isFetching: false,
    error: null,
    interestId: null,
  },
  assignAction: {
    interestId: null,
    isFetching: false,
    error: null,
    actionType: null,
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
    const path = action.all ? 'allInterests' : 'myInterests'
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
    const path = action.all ? 'allInterests' : 'myInterests'
    return {
      ...state,
      [path]: {
        ...state[path],
        isFetching: false,
        data: action.interests,
      },
    }
  }
  case GET_INTERESTS_ERROR: {
    const path = action.all ? 'allInterests' : 'myInterests'
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
    const newMyInterests = state.myInterests.data.filter((interest) => {
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
        data: newMyInterests,
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
  case UNASSIGN_INTEREST_REQUEST:
    return {
      ...state,
      assignAction: {
        ...state.assignAction,
        isFetching: false,
        error: null,
        interestId: action.interestId,
        actionType: action.assign ? ASSIGN : UNASSIGN,
      },
    }
  case ASSIGN_INTEREST_SUCCESS:
  case UNASSIGN_INTEREST_SUCCESS: {
    const getAllInterests = action.assign ? assignToInterest : unassignFromInterest
    const allInterestsData = getAllInterests(state.allInterests, action.interestId, action.login)

    return {
      ...state,
      assignAction: {
        ...state.assignAction,
        isFetching: false,
        actionType: action.assign ? ASSIGN : UNASSIGN,
      },
      allInterests: {
        ...state.allInterests,
        data: allInterestsData,
      },
    }
  }
  case ASSIGN_INTEREST_ERROR:
  case UNASSIGN_INTEREST_ERROR:
    return {
      ...state,
      assignAction: {
        ...state.assignAction,
        isFetching: false,
        error: action.error,
        actionType: action.assign ? ASSIGN : UNASSIGN,
      },
    }
  default:
    return state
  }
}

export default interestsReducer
