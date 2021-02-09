const Model = require("./Model.js")

class PlayerOfTable extends Model {
  static get tableName() {
    return "playersOfTables"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        playerId: { type: ["integer", "string"] },
        tableId: { type: ["integer", "string"] },
      },
    }
  }

  static get relationMappings() {
    const { Player, Table } = require("./index.js")

    return {
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        join: {
          from: "playersOfTables.playerId",
          to: "players.id",
        },
      },
      table: {
        relation: Model.BelongsToOneRelation,
        modelClass: Table,
        join: {
          from: "playersOfTables.tableId",
          to: "tables.id",
        },
      },
    }
  }
}

module.exports = PlayerOfTable
