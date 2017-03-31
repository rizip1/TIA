export const createUser = async (trx, userData) => {
  return trx.transaction(async (inner_trx) => {
    let userId = await inner_trx('users').returning('id').insert(userData)
    userId = userId[0]
    return inner_trx('profiles').insert({userId})
  })
}

export const isUniqueEmail = async (trx, email) => {
  const result = await trx('users')
    .where('email', email)
    .whereNull('deletedAt')
  return !result.length
}

export const isUniqueLogin = async (trx, login) => {
  const result = await trx('users')
    .where('login', login)
    .whereNull('deletedAt')
  return !result.length
}
