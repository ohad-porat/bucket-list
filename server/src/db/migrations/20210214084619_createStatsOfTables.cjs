/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {return knex.schema.createTable("statsOfTables", (t) => {
  t.bigIncrements("id")
  t.bigInteger("statId")
    .notNullable()
    .unsigned()
    .index()
    .references("stats.id")
  t.bigInteger("tableId")
    .notNullable()
    .unsigned()
    .index()
    .references("tables.id")
  t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
  t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
})}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {  return knex.schema.dropTableIfExists("statsOfTables")}
