import express from 'express'
import bodyParser from 'body-parser'
import validator from 'validator'
import knexLib from 'knex'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import {createHash} from 'crypto'
import mg from 'nodemailer-mailgun-transport'

import knexConfig from '../../knex/knexfile.js'
import {errorTypes, errorMessages, conflictFields} from '../../errors'
import trim from '../../middlewares/trim'
import {createUser, isUniqueEmail, isUniqueLogin,
  isRegisterHashCorrect, confirmRegistration} from './queries'
import {protocol, host} from '../../utils.js'

const router = express.Router()
const knex = knexLib(knexConfig)
const saltRounds = 10


let transporter = null

if (process.env.NODE_ENV === 'production') {
  const mailConfig = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  }
  transporter = nodemailer.createTransport(mg(mailConfig))
} else {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email_user,
      pass: process.env.email_password,
    },
  })
}

const getConfirmMailOptions = (email, login, link) => {
  return {
    from: process.env.NODE_ENV === 'production' ? 'hiker@hiker-tia.herokuapp.com' : 'Hiker',
    to: email,
    subject: 'Hiker registrácia',
    html : 'Ďakujeme za registráciu <strong>' + login + '</strong>!<br> \
            Prosím kliknite na link nižšie pre dokončenie registrácie.<br>\
            <a href='+link+'>Dokončit registráciu</a>',
  }
}

const createRegistrationHash = () => {
  const current_date = (new Date()).valueOf().toString()
  const random = Math.random().toString()
  return createHash('sha1').update(current_date + random).digest('hex')
}

const createRegistrationUrl = (login, hash) => {
  return `${protocol}://${host}/api/users?login=${login}&hash=${hash}`
}

const createDashboardUrl = () => {
  return `${protocol}://${host}/dashboard`
}

router.post('/', [bodyParser.json(), trim], async (req, res) => {
  const {login, email, password, passwordConfirm} = req.body

  try {
    // Check for missing data and format
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

    // Check passwords match and uniqueness
    if (password !== passwordConfirm) {
      throw {type: errorTypes.badRequest, message: errorMessages.passwordMatch}
    }

    const isEmailUnique = await isUniqueEmail(knex, email)
    const isLoginUnique = await isUniqueLogin(knex, login)

    if (!isEmailUnique) {
      throw {type: errorTypes.resourceExists, message: errorMessages.existsEmail,
        field: conflictFields.email.key, translate: conflictFields.email.translate}
    }

    if (!isLoginUnique) {
      throw {type: errorTypes.resourceExists, message: errorMessages.existsLogin,
        field: conflictFields.login.key, translate: conflictFields.login.translate}
    }

    const passwordHash = await bcrypt.hash(password, saltRounds)
    const registerHash = createRegistrationHash()
    const registerUrl = createRegistrationUrl(login, registerHash)

    await knex.transaction(async (trx) => {
      await createUser(trx, {login, email, passwordHash, registerHash})
      await transporter.sendMail(getConfirmMailOptions(email, login, registerUrl))
    })
    res.status(201).json({message: 'Success, confirm registration email'})
  } catch (e) {
    if (e.type < 500) {
      const errorObj = {message: e.message}
      if (e.field) {
        errorObj.field = e.field,
        errorObj.translate = e.translate
      }
      return res.status(e.type).json(errorObj)
    } else {
      console.error('Error creating user', e)
      return res.status(500).json({message: 'Server error'})
    }
  }
})

// confirm registration using registerHash
router.get('/', async (req, res) => {
  try {
    if (!req.query.hash || !req.query.login) {
      throw {type: errorTypes.badRequest, message: ''}
    }
    const {login, hash} = req.query
    const mainPage = createDashboardUrl()

    const user = await isRegisterHashCorrect(knex, login, hash)
    if (!user.length) {
      throw {type: errorTypes.badRequest, message: ''}
    }
    const id = user[0].id
    const email = user[0].email

    await confirmRegistration(knex, id)

    const sess = req.session
    sess.email = email
    sess.userId = id
    sess.login = login
    res.redirect(mainPage)
  } catch (e) {
    if (e.type < 500) {
      return res.status(e.type).json({message: e.message})
    } else {
      console.error('Error confirming user', e)
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
