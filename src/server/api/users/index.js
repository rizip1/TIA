import express from 'express'
import bodyParser from 'body-parser'
import validator from 'validator'
import knexLib from 'knex'
import bcrypt from 'bcrypt'
import {createHash} from 'crypto'

import knexConfig from '../../../knex/knexfile.js'
import {errorTypes, errorMessages} from '../../errors'
import {createUser, isUniqueEmail, isUniqueLogin} from './queries.js'

const router = express.Router()
const knex = knexLib(knexConfig)
const saltRounds = 10

const createRegistrationHash = () => {
  const current_date = (new Date()).valueOf().toString()
  const random = Math.random().toString()
  return createHash('sha1').update(current_date + random).digest('hex')
}

router.post('/', bodyParser.json(), async (req, res) => {
  // trim all values here
  // try add own middleware
  const {login, email, password, passwordConfirm} = req.body

  try {
    // Check format
    if (!email || !validator.isEmail(email)) {
      throw {type: errorTypes.badRequest, message: errorMessages.invalidEmail}
    }

    if (!login || !login.length) {
      throw {type: errorTypes.badRequest, message: errorMessages.invalidLogin}
    }

    if (!password || !passwordConfirm ||
      !validator.isLength(password, {min:6, max:40}) ||
      !validator.isLength(password, {min:6, max:40})) {
      throw {type: errorTypes.badRequest, message: errorMessages.invalidPassword}
    }

    // Check correctness
    if (password !== passwordConfirm) {
      throw {type: errorTypes.badRequest, message: errorMessages.passwordMatch}
    }

    const isEmailUnique = await isUniqueEmail(knex, email)
    const isLoginUnique = await isUniqueLogin(knex, login)

    if (!isEmailUnique) {
      throw {type: errorTypes.resourceExists, message: errorMessages.existsEmail}
    }

    if (!isLoginUnique) {
      throw {type: errorTypes.resourceExists, message: errorMessages.existsLogin}
    }

    bcrypt.hash(password, saltRounds).then(async (passwordHash) => {
      const registerHash = createRegistrationHash()
      await createUser(knex, {login, email, passwordHash, registerHash})
      res.status(201).json({message: 'User created'})
    })
  } catch (e) {
    if (e.type < 500) {
      return res.status(e.type).json({message: e.message})
    } else {
      console.error('Error creating user', e)
      return res.status(500).json({message: 'Server error'})
    }
  }
})

router.put('/',
  (req, res) => {
    res.status(200).send('Profile updated')
  }
)

router.delete('/',
  (req, res) => {
    res.status(200).send('User deleted')
  }
)

export default router
