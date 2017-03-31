import {snakeCase} from 'lodash'

const createEnumType = async (knex, columnName, values) => {
  const enumName = snakeCase(`enum_${columnName}`)
  const rawList = values.map((v) => `'${v}'`).join(', ')
  await knex.raw(`create type ?? as enum (${rawList})`, [enumName])
  return enumName
}

const dropEnumType = async (knex, columnName) => {
  const enumName = snakeCase(`enum_${columnName}`)
  await knex.raw('drop type ??', [enumName])
}

const regions = ['bratislava', 'nitra', 'trencin', 'trnava', 'zilina',
  'banska-bystrica', 'presov', 'kosice']
const skills = [1, 2, 3, 4, 5]

exports.up = async (knex) =>  {
  const regionsType = await createEnumType(knex, 'region', regions)
  const skillsType = await createEnumType(knex, 'skills', skills)

  await knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary()
    table.string('login').unique()
    table.string('email').unique()
    table.string('passwordHash').notNullable()
    table.string('registerHash').notNullable()
    table.timestamp('createdAt')
    table.timestamp('updatedAt')
    table.timestamp('deletedAt')
  })

  await knex.schema.createTableIfNotExists('profiles', (table) => {
    table.increments('id').primary()
    table.integer('userId').references('users.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
    table.integer('age')
    table.specificType('region', regionsType)
    table.string('cover')
    table.specificType('skills', skillsType)
    table.text('description')
  })

  await knex.schema.createTableIfNotExists('interests', (table) => {
    table.increments('id').primary()
    table.integer('creatorId').references('users.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
    table.specificType('minDifficulty', skillsType)
    table.specificType('maxDifficulty', skillsType)
    table.timestamp('validTo').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('deletedAt')
  })

  await knex.schema.createTableIfNotExists('messages', (table) => {
    table.increments('id').primary()
    table.integer('senderId').references('users.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
    table.integer('recipientId').references('users.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
    table.text('text').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
  })

  await knex.schema.createTableIfNotExists('comments', (table) => {
    table.increments('id').primary()
    table.integer('userId').references('users.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
    table.integer('interestId').references('interests.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
    table.text('text').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
  })

  await knex.schema.createTableIfNotExists('locations', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
  })

  await knex.schema.createTableIfNotExists('interests2users', (table) => {
    table.increments('id').primary()
    table.integer('interestId').references('interests.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
    table.integer('userId').references('users.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
  })

  await knex.schema.createTableIfNotExists('interests2locations', (table) => {
    table.increments('id').primary()
    table.integer('interestId').references('interests.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
    table.integer('locationId').references('locations.id').notNullable().index()
      .onUpdate('restrict').onDelete('restrict')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('profiles')
  await knex.schema.dropTable('interests')
  await knex.schema.dropTable('messages')
  await knex.schema.dropTable('comments')
  await knex.schema.dropTable('locations')
  await knex.schema.dropTable('interests2users')
  await knex.schema.dropTable('interests2locations')

  await dropEnumType(knex, 'region')
  await dropEnumType(knex, 'skills')
}
