import path from 'path'
import express from 'express'
import dotenv from 'dotenv'

import api from './api'
import auth from './auth'
import { PUBLIC } from '../common/constants'

dotenv.config() // initialize .env variables

const app = express()
const isDevelopment = (process.env.NODE_ENV !== 'production')

const publicDirPath = isDevelopment ? `../../${PUBLIC}/` : `../../../${PUBLIC}/`
const publicPath = express.static(path.join(__dirname, publicDirPath))

// set access name for public directory
app.use(`/${PUBLIC}`, publicPath)

const port = process.env.PORT
const host = process.env.HOST

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../../webpack.babel.js').default(true)
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
  }))
}

const indexHtmlPath = isDevelopment ? `../../${PUBLIC}/index.html` : `../../../${PUBLIC}/index.html`
const indexPath = path.join(__dirname, indexHtmlPath)

app.use('/auth', auth)
app.use('/api', api)

// need to be registered after all middlewares are set up
// and also after every other app.get() statement
app.get('*', function (req, res) {
  res.sendFile(indexPath)
})

app.listen(port)
console.log(`Listening at http://${host}:${port}`)
