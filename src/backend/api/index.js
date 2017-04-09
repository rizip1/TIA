import express from 'express'
import users from './users'
import interests from './interests'

const app = express()

export default app

app.use('/users', users)
app.use('/interests', interests)
