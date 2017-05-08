exports.up = (knex) => {
  return knex.schema.createTable('book_author', table => {
    table.integer('book_id').notNullable()
    table.integer('author_id').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('book_author')
}
