/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("tables", (t) => {
    t.bigIncrements("id")
    t.bigInteger("userId")
      .notNullable()
      .unsigned()
      .index()
      .references("users.id")
    t.string("title").notNullable()
    t.text("notes")
    t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("tables")
}