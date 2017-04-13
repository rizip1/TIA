export const CREATE_INTEREST_REQUEST = 'CREATE_INTEREST_REQUEST'
export const CREATE_INTEREST_SUCCESS = 'CREATE_INTEREST_SUCCESS'
export const CREATE_INTEREST_ERROR = 'CREATE_INTEREST_ERROR'

export const GET_INTERESTS_REQUEST = 'GET_INTERESTS_REQUEST'
export const GET_INTERESTS_SUCCESS = 'GET_INTERESTS_SUCCESS'
export const GET_INTERESTS_ERROR = 'GET_INTERESTS_ERROR'

export const DELETE_INTEREST_REQUEST = 'DELETE_INTEREST_REQUEST'
export const DELETE_INTEREST_SUCCESS = 'DELETE_INTEREST_SUCCESS'
export const DELETE_INTEREST_ERROR = 'DELETE_INTEREST_ERROR'

export const ASSIGN_INTEREST_REQUEST = 'ASSIGN_INTEREST_REQUEST'
export const ASSIGN_INTEREST_SUCCESS = 'ASSIGN_INTEREST_SUCCESS'
export const ASSIGN_INTEREST_ERROR = 'ASSIGN_INTEREST_ERROR'

export const UNASSIGN_INTEREST_REQUEST = 'UNASSIGN_INTEREST_REQUEST'
export const UNASSIGN_INTEREST_SUCCESS = 'UNASSIGN_INTEREST_SUCCESS'
export const UNASSIGN_INTEREST_ERROR = 'UNASSIGN_INTEREST_ERROR'

const requestCreateInterest = (values) => {
  return {
    type: CREATE_INTEREST_REQUEST,
    values,
  }
}

const successCreateInterest = () => {
  return {
    type: CREATE_INTEREST_SUCCESS,
  }
}

const errorCreateInterest = (error) => {
  return {
    type: CREATE_INTEREST_ERROR,
    error,
  }
}

export const createInterest = (values) => {
  return dispatch => {
    dispatch(requestCreateInterest(values))

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

    return fetch('/api/interests', options)
      .then((response) => response.json().then((data) => ({response, data})))
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorCreateInterest(data.message))
          return Promise.reject({status: response.status})
        } else {
          dispatch(successCreateInterest())
        }
      })
      .catch((err) => {
        dispatch(errorCreateInterest(err))
        return Promise.reject(err)
      })
  }
}

const requestGetInterests = (userId, all) => {
  return {
    type: GET_INTERESTS_REQUEST,
    userId,
    all,
  }
}

const successGetInterests = (myInterests, all) => {
  return {
    type: GET_INTERESTS_SUCCESS,
    interests: myInterests,
    all,
  }
}

const errorGetInterests = (error) => {
  return {
    type: GET_INTERESTS_ERROR,
    error,
  }
}

export const getInterests = (userId) => {
  return dispatch => {
    const options = {
      method: 'get',
      credentials: 'include',
    }

    let path = '/api/interests'
    let all = true
    if (userId) {
      path += `/${userId}`
      all = false
    }

    dispatch(requestGetInterests(userId, all))

    return fetch(path, options)
      .then((response) => {
        return response.json().then((data) => ({response, data}))
      })
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorGetInterests(data.message, all))
          return Promise.reject({status: response.status})
        } else {
          dispatch(successGetInterests(data.interests, all))
          return data.interests
        }
      })
      .catch((err) => {
        dispatch(errorGetInterests(err, all))
        return Promise.reject(err)
      })
  }
}

const requestDeleteInterest = (interestId) => {
  return {
    type: DELETE_INTEREST_REQUEST,
    interestId,
  }
}

const successDeleteInterest = (interestId) => {
  return {
    type: DELETE_INTEREST_SUCCESS,
    interestId,
  }
}

const errorDeleteInterest = (error) => {
  return {
    type: DELETE_INTEREST_ERROR,
    error,
  }
}

export const deleteInterest = (interestId) => {
  return dispatch => {
    const options = {
      method: 'delete',
      credentials: 'include',
    }

    dispatch(requestDeleteInterest(interestId))

    return fetch(`/api/interests/${interestId}`, options)
      .then((response) => {
        return response.json().then((data) => ({response, data}))
      })
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorDeleteInterest(data.message))
          return Promise.reject(data.message)
        } else {
          dispatch(successDeleteInterest(interestId))
        }
      })
      .catch((err) => {
        dispatch(errorDeleteInterest(err))
        return Promise.reject(err)
      })
  }
}

const requestAssignInterest = (interestId) => {
  return {
    type: ASSIGN_INTEREST_REQUEST,
    interestId,
    assign: true,
  }
}

const successAssignInterest = (interestId, login) => {
  return {
    type: ASSIGN_INTEREST_SUCCESS,
    interestId,
    login,
    assign: true,
  }
}

const errorAssignInterest = (error) => {
  return {
    type: ASSIGN_INTEREST_ERROR,
    error,
    assign: true,
  }
}

export const assignToInterest = (interestId) => {
  return dispatch => {
    const options = {
      method: 'post',
      credentials: 'include',
    }

    dispatch(requestAssignInterest(interestId))

    return fetch(`/api/assignments/${interestId}`, options)
      .then((response) => {
        return response.json().then((data) => ({response, data}))
      })
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorAssignInterest(data.message))
          return Promise.reject(data.message)
        } else {
          dispatch(successAssignInterest(interestId, data.login))
        }
      })
      .catch((err) => {
        dispatch(errorAssignInterest(err))
        return Promise.reject(err)
      })
  }
}

const requestUnassignInterest = (interestId) => {
  return {
    type: UNASSIGN_INTEREST_REQUEST,
    interestId,
  }
}

const successUnassignInterest = (interestId, login) => {
  return {
    type: UNASSIGN_INTEREST_SUCCESS,
    interestId,
    login,
  }
}

const errorUnassignInterest = (error) => {
  return {
    type: UNASSIGN_INTEREST_ERROR,
    error,
  }
}

export const unassignFromInterest = (interestId) => {
  return dispatch => {
    const options = {
      method: 'delete',
      credentials: 'include',
    }

    dispatch(requestUnassignInterest(interestId))

    return fetch(`/api/assignments/${interestId}`, options)
      .then((response) => {
        return response.json().then((data) => ({response, data}))
      })
      .then(({response, data}) => {
        if (!response.ok) {
          dispatch(errorUnassignInterest(data.message))
          return Promise.reject(data.message)
        } else {
          console.log('data', data)
          dispatch(successUnassignInterest(interestId, data.login))
        }
      })
      .catch((err) => {
        dispatch(errorUnassignInterest(err))
        return Promise.reject(err)
      })
  }
}
