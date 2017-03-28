import express from 'express'
import dotenv from 'dotenv'

import frontend from './frontend'
import api from './api'
import auth from './auth'

dotenv.config() // initialize .env variables

const app = express()
const port = process.env.PORT
const host = process.env.HOST

app.use('/auth', auth)
app.use('/api', api)
app.use(frontend)

app.listen(port)
console.log(`Listening at http://${host}:${port}`)
