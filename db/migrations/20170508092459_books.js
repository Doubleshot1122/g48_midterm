exports.up = (knex) => {
  return knex.schema.createTable('books', table => {
    table.increments()
    table.string('title').notNullable()
    table.string('genre').notNullable()
    table.text('description').notNullable()
    table.text('portait_URL').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('books')
}
