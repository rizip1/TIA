import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'

import frontend from './frontend'
import api from './api'
import auth from './auth'

dotenv.config() // initialize .env variables

const app = express()
const port = process.env.port
const host = process.env.host

const sessionOptions = {
  secret: '9awef98fefa68fWAFffeaFea656862eFAEAF95nyp',
  cookie: {
    httpOnly: true,
    path: '/',
    maxAge: 10080000, // one week
  },
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // set if node is running behind proxy
  sessionOptions.cookie.secure = true // serve secure cookies
}

app.use(session(sessionOptions))

app.use('/auth', auth)
app.use('/api', api)
app.use(frontend)

app.listen(port)
console.log(`Listening at http://${host}:${port}`)
