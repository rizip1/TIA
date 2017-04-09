export const createInterest = async (trx, interestData, locations) => {

  let interestId = await trx('interests').returning('id').insert(interestData)
  interestId = interestId[0]

  const queryParams = []
  for (const l of locations) {
    const locationId = getLocationIdFromName(trx, l)
    queryParams.push({interestId, locationId})
  }

  return trx('interests2locations').insert(queryParams)
}

const getLocationIdFromName = (trx, name) => {
  return trx('locations')
    .where('name', name)
    .select('id')
    .first()
}

export const getInterests = (trx, userId) => {
  let query = trx('interests as i')

  if (userId) {
    query = query
      .innerJoin('users as u', (join) => {
        join.on('i.creatorId', trx.raw('?', userId))
        .on('u.id', trx.raw('?', userId))
      })
  } else {
    query = query
      .innerJoin('users as u', (join) => {
        join.on('i.creatorId', 'u.id')
      })
  }
  query = query
    .where('i.validTo', '>=', trx.raw('?', trx.fn.now()))
    .whereNull('i.deletedAt')
    .select(['u.login as creatorLogin', 'i.*'])

  return query
}

export const getLocationsToInterest = (trx, interestId) => {
  return trx('interests2locations as i2l')
    .innerJoin('locations as l', (join) => {
      join.on('l.id', 'i2l.locationId')
      .on('i2l.interestId', trx.raw('?', interestId))
    })
    .select(['l.id', 'l.name'])
}
