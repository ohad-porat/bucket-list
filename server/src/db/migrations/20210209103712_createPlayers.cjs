/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("players", (t) => {
    t.bigIncrements("id")
    t.bigInteger("apiPlayerId").notNullable().unique()
    t.string("first_name").notNullable()
    t.string("last_name").notNullable()
    t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("players")
}