const Model = require("./Model.js")

class Table extends Model {
  static get tableName() {
    return "tables"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        userId: { type: ["integer", "string"] },
        title: { type: "string" },
        notes: { type: "text" },
      },
    }
  }

  static get relationMappings() {
    const { Player, PlayerOfTable } = require("./index.js")

    return {
      playersOfTables: {
        relation: Model.HasManyRelation,
        modelClass: PlayerOfTable,
        join: {
          from: "tables.id",
          to: "playersOfTables.tableId",
        },
      },
      players: {
        relation: Model.ManyToManyRelation,
        modelClass: Player,
        join: {
          from: "tables.id",
          through: {
            from: "playersOfTables.tableId",
            to: "playersOfTables.playerId",
          },
          to: "players.id",
        },
      },
    }
  }
}

module.exports = Table
