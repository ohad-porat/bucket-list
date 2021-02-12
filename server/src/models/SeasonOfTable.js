const Model = require("./Model.js")

class SeasonOfTable extends Model {
  static get tableName() {
    return "seasonsOfTables"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        seasonId: { type: ["integer", "string"] },
        tableId: { type: ["integer", "string"] },
      },
    }
  }

  static get relationMappings() {
    const { SeasonAverage, Table } = require("./index.js")

    return {
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: SeasonAverage,
        join: {
          from: "seasonsOfTables.seasonId",
          to: "seasonAverages.id",
        },
      },
      table: {
        relation: Model.BelongsToOneRelation,
        modelClass: Table,
        join: {
          from: "seasonsOfTables.tableId",
          to: "tables.id",
        },
      },
    }
  }
}

module.exports = SeasonOfTable
