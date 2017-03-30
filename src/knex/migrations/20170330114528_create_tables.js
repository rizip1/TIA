exports.up = async (knex) =>  {
  await knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary()
    table.text('login').unique()
    table.text('email').unique()
    table.text('passwordHash').notNullable()
    table.text('registerHash').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('deletedAt')
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users')
}
