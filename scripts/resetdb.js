import config from '../src/backend/knex/knexfile.js'

const conn = config.connection
conn.database = 'postgres'

const knex = require('knex')({ client: 'pg', connection: conn})

knex.raw('DROP DATABASE IF EXISTS hiker')
  .then(() => {
    console.log('Drop database hiker')
    knex.raw('CREATE DATABASE hiker')
    .then(() => {
      console.log('Create database hiker')
      knex.destroy()
    })
  })
  .catch((err) => {
    console.error(err)
  })
