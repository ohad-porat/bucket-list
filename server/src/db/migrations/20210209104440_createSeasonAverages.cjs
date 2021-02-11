/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("seasonAverages", (t) => {
    t.bigIncrements("id")
    t.bigInteger("player_id")
      .notNullable()
      .unsigned()
      .index()
      .references("players.apiPlayerId")
    t.integer("games_played").notNullable()
    t.integer("season").notNullable()
    t.time("min").notNullable()
    t.float("fgm").notNullable()
    t.float("fga").notNullable()
    t.float("fg3m").notNullable()
    t.float("fg3a").notNullable()
    t.float("ftm").notNullable()
    t.float("fta").notNullable()
    t.float("oreb").notNullable()
    t.float("dreb").notNullable()
    t.float("reb").notNullable()
    t.float("ast").notNullable()
    t.float("stl").notNullable()
    t.float("blk").notNullable()
    t.float("turnover").notNullable()
    t.float("pf").notNullable()
    t.float("pts").notNullable()
    t.float("fg_pct").notNullable()
    t.float("fg3_pct").notNullable()
    t.float("ft_pct").notNullable()
    t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("seasonAverages")
}
