import express from 'express'
import knexLib from 'knex'

import knexConfig from '../../knex/knexfile.js'
import {errorTypes, errorMessages} from '../../errors'
import auth from '../../middlewares/auth'
import {assignToInterest, findInterest, isAssignedToInterest} from './queries'

const router = express.Router()
const knex = knexLib(knexConfig)

// create new assignment to interest
router.post('/:id', [auth], async (req, res) => {
  try {
    const interestId = req.params.id
    const {userId} = req.session

    let queryRes = await findInterest(knex, interestId)
    if (!queryRes.length) {
      throw {
        type: errorTypes.badRequest,
        message: errorMessages.interestDoesNotExist,
      }
    }

    queryRes = await isAssignedToInterest(knex, interestId, userId)
    if (queryRes.length) {
      throw {
        type: errorTypes.resourceExists,
        message: errorMessages.interestAlreadyAssigned,
      }
    }

    await assignToInterest(knex, interestId, userId)
    res.status(201).send({message: 'Created', login: req.session.login})
  } catch (e) {
    if (e.type < 500) {
      return res.status(e.type).json({message: e.message})
    } else {
      console.error('Error creating user', e)
      return res.status(500).json({message: 'Server error'})
    }
  }
})

export default router
