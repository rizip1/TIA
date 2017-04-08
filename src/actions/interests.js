export const CREATE_INTEREST_REQUEST = 'CREATE_INTEREST_REQUEST'
export const CREATE_INTEREST_SUCCESS = 'CREATE_INTEREST_SUCCESS'
export const CREATE_INTEREST_ERROR = 'CREATE_INTEREST_ERROR'

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
