const Model = require("./Model.js")

class StatOfTable extends Model {
  static get tableName() {
    return "statsOfTables"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        statId: { type: ["integer", "string"] },
        tableId: { type: ["integer", "string"] },
      },
    }
  }

  static get relationMappings() {
    const { Stat, Table } = require("./index.js")

    return {
      stat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Stat,
        join: {
          from: "statsOfTables.statId",
          to: "stats.id",
        },
      },
      table: {
        relation: Model.BelongsToOneRelation,
        modelClass: Table,
        join: {
          from: "statsOfTables.tableId",
          to: "tables.id",
        },
      },
    }
  }
}

module.exports = StatOfTable
