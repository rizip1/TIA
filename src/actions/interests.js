export const CREATE_INTEREST_REQUEST = 'CREATE_INTEREST_REQUEST'
export const CREATE_INTEREST_SUCCESS = 'CREATE_INTEREST_SUCCESS'
export const CREATE_INTEREST_ERROR = 'CREATE_INTEREST_ERROR'

export const GET_INTERESTS_REQUEST = 'GET_INTERESTS_REQUEST'
export const GET_INTERESTS_SUCCESS = 'GET_INTERESTS_SUCCESS'
export const GET_INTERESTS_ERROR = 'GET_INTERESTS_ERROR'

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
        console.log('res', response)
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
