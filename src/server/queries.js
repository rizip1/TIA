// for common queries
export const addLocations = async (trx, locations) => {
  return trx('locations').insert(locations)
}
