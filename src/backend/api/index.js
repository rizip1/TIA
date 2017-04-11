import express from 'express'

import users from './users'
import interests from './interests'
import assignments from './assignments'

const app = express()

export default app

app.use('/users', users)
app.use('/interests', interests)
app.use('/assignments', assignments)
