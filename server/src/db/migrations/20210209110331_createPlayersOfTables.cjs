/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("playersOfTables", (t) => {
    t.bigIncrements("id")
    t.bigInteger("playerId").notNullable().unsigned().index().references("players.id")
    t.bigInteger("tableId").notNullable().unsigned().index().references("tables.id")
    t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("playerOfTables")
}
