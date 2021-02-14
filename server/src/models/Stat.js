const Model = require("./Model.js")

class Stat extends Model {
  static get tableName() {
    return "stats"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "abbreviation", "value"],
      properties: {
        name: { type: "string" },
        abbreviation: { type: "string" },
        value: { type: "string" },
      },
    }
  }

  static get relationMappings() {
    const { StatOfTable, Table } = require("./index.js")

    return {
      statsOfTables: {
        relation: Model.HasManyRelation,
        modelClass: StatOfTable,
        join: {
          from: "stats.id",
          to: "statsOfTables.statId",
        },
      },
      tables: {
        relation: Model.ManyToManyRelation,
        modelClass: Table,
        join: {
          from: "stats.id",
          through: {
            from: "statsOfTables.statId",
            to: "statsOfTables.tableId",
          },
          to: "tables.id",
        },
      },
    }
  }
}

module.exports = Stat
