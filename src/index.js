import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

// React-router 4
// Routes are just components
// Components themselves define the composition of UI


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('main')
)
