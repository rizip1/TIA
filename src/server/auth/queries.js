export const getPasswordHash = async (trx, email) => {
  return trx('users')
    .where('email', email)
    .whereNull('deletedAt')
    .whereNotNull('createdAt')
    .select('passwordHash')
}

export const getUserId = async (trx, email) => {
  return trx('users')
    .where('email', email)
    .whereNull('deletedAt')
    .whereNotNull('createdAt')
    .select('id').first()
}
