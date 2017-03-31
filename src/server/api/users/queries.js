export const createUser = async (trx, userData) => {
  let userId = await trx('users').returning('id').insert(userData)
  userId = userId[0]
  return trx('profiles').insert({userId})
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
