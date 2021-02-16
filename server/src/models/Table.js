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
    const {
      SeasonAverage,
      SeasonOfTable,
      Stat,
      StatOfTable,
      User,
    } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "tables.userId",
          to: "users.id",
        },
      },
      seasonsOfTables: {
        relation: Model.HasManyRelation,
        modelClass: SeasonOfTable,
        join: {
          from: "tables.id",
          to: "seasonsOfTables.tableId",
        },
      },
      seasonAverages: {
        relation: Model.ManyToManyRelation,
        modelClass: SeasonAverage,
        join: {
          from: "tables.id",
          through: {
            from: "seasonsOfTables.tableId",
            to: "seasonsOfTables.seasonId",
          },
          to: "seasonAverages.id",
        },
      },
      statsOfTables: {
        relation: Model.HasManyRelation,
        modelClass: StatOfTable,
        join: {
          from: "tables.id",
          to: "statsOfTables.tableId",
        },
      },
      stats: {
        relation: Model.ManyToManyRelation,
        modelClass: Stat,
        join: {
          from: "tables.id",
          through: {
            from: "statsOfTables.tableId",
            to: "statsOfTables.statId",
          },
          to: "stats.id",
        },
      },
    }
  }
}

module.exports = Table
