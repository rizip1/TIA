export const createUser = async (trx, userData) => {
  let userId = await trx('users').returning('id').insert(userData)
  userId = userId[0]
  return trx('profiles').insert({userId})
}

export const isUniqueEmail = async (trx, email) => {
  const result = await trx('users')
    .where('email', email)
    .whereNotNull('createdAt')
    .whereNull('deletedAt')
  return !result.length
}

export const isUniqueLogin = async (trx, login) => {
  const result = await trx('users')
    .where('login', login)
    .whereNotNull('createdAt')
    .whereNull('deletedAt')
  return !result.length
}

export const isRegisterHashCorrect = (trx, login, hash) => {
  return trx('users')
    .where('login', login)
    .where('registerHash', hash)
    .whereNull('createdAt')
    .select('*')
}

export const confirmRegistration = (trx, id) => {
  return trx('users')
    .update('createdAt', trx.fn.now())
    .where('id', id)
}
