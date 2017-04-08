import {createUser} from '../../server/api/users/queries'
import bcrypt from 'bcrypt'

exports.seed = async (knex) => {

  const args = {
    login: 'John123',
    email: 'john@gmail.com',
    passwordHash: await bcrypt.hash('tajneheslo', 10),
    registerHash: 'not necessary',
    createdAt: knex.fn.now(),
  }

  await createUser(knex, args)
}
