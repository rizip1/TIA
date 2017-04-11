import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'
import knexLib from 'knex'

import knexConfig from '../../knex/knexfile.js'
import trim from '../../middlewares/trim'
import {difficultyLevelsNames, locationsNames} from '../../../common/enums'
import {dateFormat} from '../../../common/utils'
import {errorTypes, errorMessages} from '../../errors'
import {createInterest, getInterests, getLocationsToInterest,
  deleteInterest, getUsersToInterest, getInterestOwner} from './queries'
import auth from '../../middlewares/auth'

const router = express.Router()
const knex = knexLib(knexConfig)

// create new interest
router.post('/', [auth, bodyParser.json(), trim], async (req, res) => {

  const {minDifficulty, maxDifficulty, description, validTo, locations} = req.body

  try {
    // check difficulties
    if (!minDifficulty || !maxDifficulty) {
      throw {type: errorTypes.badRequest, message: errorMessages.invalidDifficulty}
    } else {
      if (!difficultyLevelsNames.includes(minDifficulty) ||
          !difficultyLevelsNames.includes(maxDifficulty) ||
           minDifficulty > maxDifficulty) {
        throw {type: errorTypes.badRequest, message: errorMessages.invalidDifficulty}
      }
    }

    // check locations
    if (!locations || !locations.length) {
      console.log('here', locations)
      throw {type: errorTypes.badRequest, message: errorMessages.invalidLocations}
    } else {
      for (const l of locations) {
        if (!locationsNames.includes(l)) {
          console.log('there', locationsNames, l)
          throw {type: errorTypes.badRequest, message: errorMessages.invalidLocations}
        }
      }
    }

    // check validTo
    if (moment(validTo).isBefore(moment()) ||
        moment(validTo).isAfter(moment().add('2', 'months'))) {
      throw {type: errorTypes.badRequest, message: errorMessages.invalidValidTo}
    }

    await knex.transaction(async (trx) => {
      await createInterest(trx, {creatorId: req.session.userId,
        description: description || '', validTo: moment(validTo).format(dateFormat),
        minDifficulty, maxDifficulty}, locations)
    })

    res.status(201).send({message: 'OK'})
  } catch (e) {
    if (e.type < 500) {
      return res.status(e.type).json({message: e.message})
    } else {
      console.error('Error creating user', e)
      return res.status(500).json({message: 'Server error'})
    }
  }
})

// get all interests or all interest for concreate user
router.get('/:userId?', [auth], async (req, res) => {
  try {
    const userId = req.params.userId || null
    const interests = await getInterests(knex, userId)

    for (let i = 0; i < interests.length; i++) {
      let result = await getLocationsToInterest(knex, interests[i].id)
      interests[i].locations = result

      result = await getUsersToInterest(knex, interests[i].id)
      interests[i].users = result.map((r) => r.login)
    }

    res.status(200).json({interests})
  } catch (e) {
    console.error('Error getting interests', e)
    return res.status(500).json({message: 'Server error'})
  }
})

// delete interest with :id
router.delete('/:id', [auth], async (req, res) => {
  try {
    const interestId = req.params.id

    const queryResult = await getInterestOwner(knex, interestId)
    if (queryResult.creatorId != req.session.userId) {
      throw {type: errorTypes.forbidden, message: errorMessages.permisions}
    }

    await knex.transaction(async (trx) => {
      await deleteInterest(trx, interestId)
    })
    res.status(200).send({message: 'OK'})
  } catch (e) {
    if (e.type < 500) {
      return res.status(e.type).json({message: e.message})
    } else {
      console.error('Error deleting interest', e)
      return res.status(500).json({message: 'Server error'})
    }
  }
})

export default router
