import {createUser} from '../../api/users/queries'
import bcrypt from 'bcrypt'

exports.seed = async (knex) => {

  const args = {
    login: 'jozko123',
    email: 'jozko@gmail.com',
    passwordHash: await bcrypt.hash('tajneheslo', 10),
    registerHash: 'not necessary',
    createdAt: knex.fn.now(),
  }

  await createUser(knex, args)
}
