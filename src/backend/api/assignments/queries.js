export const assignToInterest = (trx, interestId, userId) => {
  return trx('interests2users').insert({interestId, userId})
}

export const findInterest = (trx, interestId) => {
  return trx('interests')
    .whereNull('deletedAt')
    .where('id', interestId)
}

export const isAssignedToInterest = (trx, interestId, userId) => {
  return trx('interests2users')
    .where('userId', userId)
    .where('interestId', interestId)
}

export const unAssignFromInterest = (trx, interestId, userId) => {
  return trx('interests2users')
    .where('userId', userId)
    .where('interestId', interestId)
    .del()
}
