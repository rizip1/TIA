import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'
import knexLib from 'knex'

import knexConfig from '../../../knex/knexfile.js'
import trim from '../../middlewares/trim'
import {difficultyLevelsNames, locationsNames} from '../../../common/enums'
import {dateFormat} from '../../../common/utils'
import {errorTypes, errorMessages} from '../../errors'
import {createInterest} from './queries'

const router = express.Router()
const knex = knexLib(knexConfig)

router.post('/', [bodyParser.json(), trim], async (req, res) => {

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

router.delete('/',
  (req, res) => {
    res.status(200).send('Interest deleted')
  }
)

export default router
