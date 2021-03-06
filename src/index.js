import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import 'react-datetime/css/react-datetime.css'
import './styles.global.css'
import AppContainer from './containers/AppContainer'
import reducers from './reducers'

function configureStore() {
  const store = createStore(reducers, {}, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ))
  return store;
}

let store = configureStore()

render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>
  , document.getElementById('main')
)
