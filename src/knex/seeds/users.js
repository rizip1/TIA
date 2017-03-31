exports.seed = async (knex) => {

  const args = {
    login: 'Jon',
    email: 'Snow',
    passwordHash: 'ceo',
    registerHash: 'employee',
  }

  await knex('users').insert(args)

}
