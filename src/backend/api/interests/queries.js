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
