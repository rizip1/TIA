import express from 'express'
import auth from './auth'

const app = express()
export default app

app.use('/auth', auth)
// here comes code
