const Model = require("./Model.js")

class Player extends Model {
  static get tableName() {
    return "players"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name"],
      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
      },
    }
  }

  static get relationMappings() {
    const { SeasonAverage, PlayerOfTable, Table } = require("./index.js")

    return {
      seasonAverages: {
        relation: Model.HasManyRelation,
        modelClass: SeasonAverage,
        join: {
          from: "players.id",
          to: "seasonAverages.player_id",
        },
      },
      playersOfTables: {
        relation: Model.HasManyRelation,
        modelClass: PlayerOfTable,
        join: {
          from: "players.id",
          to: "playersOfTables.playerId",
        },
      },
      tables: {
        relation: Model.ManyToManyRelation,
        modelClass: Table,
        join: {
          from: "players.id",
          through: {
            from: "playersOfTables.playerId",
            to: "playersOfTables.tableId",
          },
          to: "tables.id",
        },
      },
    }
  }
}

module.exports = Player
