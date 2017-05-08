exports.up = (knex) => {
  return knex.schema.createTable('authors', table => {
    table.increments()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.text('biography').notNullable()
    table.text('portrait_url').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('authors')
}
