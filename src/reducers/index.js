import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import auth from './authReducer'
import interests from './interestsReducer'

export default combineReducers({
  auth,
  form: formReducer,
  interests,
})
