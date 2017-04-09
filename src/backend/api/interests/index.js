import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'
import knexLib from 'knex'

import knexConfig from '../../knex/knexfile.js'
import trim from '../../middlewares/trim'
import {difficultyLevelsNames, locationsNames} from '../../../common/enums'
import {dateFormat} from '../../../common/utils'
import {errorTypes, errorMessages} from '../../errors'
import {createInterest, getInterests, getLocationsToInterest} from './queries'
import auth from '../../middlewares/auth'

const router = express.Router()
const knex = knexLib(knexConfig)

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

router.get('/:id?', [auth], async (req, res) => {
  try {
    const userId = req.params.id || null
    const interests = await getInterests(knex, userId)

    for (let i = 0; i < interests.length; i++) {
      const result = await getLocationsToInterest(knex, interests[i].id)
      interests[i].locations = result
    }

    res.status(200).json({interests})
  } catch (e) {
    console.error('Error creating user', e)
    return res.status(500).json({message: 'Server error'})
  }
})

router.delete('/',
  (req, res) => {
    res.status(200).send('Interest deleted')
  }
)

export default router
