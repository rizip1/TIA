import {locations} from '../../../common/enums'
import {addLocations} from '../../queries'

exports.seed = async (knex) => {
  const locationNames = locations.map((l) => {
    return {'name': l.name}
  })

  await addLocations(knex, locationNames)
}
