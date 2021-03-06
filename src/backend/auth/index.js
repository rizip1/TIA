import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import knexLib from 'knex'

import trim from '../middlewares/trim'
import auth from '../middlewares/auth'
import {errorTypes, errorMessages} from '../errors'
import {getPasswordHash, getUser} from './queries'
import knexConfig from '../knex/knexfile'

const knex = knexLib(knexConfig)
const router = express.Router()

router.post('/login', [bodyParser.json(), trim], async (req, res) => {
  const {email, password} = req.body
  try {
    // Check for missing data and format
    if (!email || !password) {
      throw {type: errorTypes.forbidden, message: errorMessages.badCreds}
    }

    const query = await getPasswordHash(knex, email)
    if (!query.length) {
      throw {type: errorTypes.forbidden, message: errorMessages.badCreds}
    }
    const hash = query[0].passwordHash
    const match = await bcrypt.compare(password, hash)
    if (!match) {
      throw {type: errorTypes.forbidden, message: errorMessages.badCreds}
    }

    const queryRes = await getUser(knex, email)

    const sess = req.session
    sess.email = email
    sess.userId = queryRes.id
    sess.login = queryRes.login

    res.status(200).json({userId: queryRes.id, login: queryRes.login, email})
  } catch (e) {
    if (e.type < 500) {
      return res.status(e.type).json({message: e.message})
    } else {
      console.error('Error logging user', e)
      return res.status(500).json({message: 'Server error'})
    }
  }
})

router.get('/logout',
  (req, res) => {
    req.session.destroy()
    res.status(200).send({message: 'Logout'})
  }
)

router.get('/checkLogin', auth, (req, res) => {
  const {userId, login, email} = req.session
  res.status(200).json({userId, login, email})
})

export default router
