import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'

import './styles.global.css'
import App from './components/App'

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('main')
)
