const Model = require("./Model.js")

class SeasonAverage extends Model {
  static get tableName() {
    return "seasonAverages"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "games_played",
        "season",
        "min",
        "fgm",
        "fga",
        "fg3m",
        "fg3a",
        "ftm",
        "fta",
        "oreb",
        "dreb",
        "reb",
        "ast",
        "stl",
        "blk",
        "turnover",
        "pf",
        "pts",
        "fg_pct",
        "fg3_pct",
        "ft_pct",
      ],
      properties: {
        playerId: { type: ["integer", "string"] },
        games_played: { type: ["integer", "string"] },
        season: { type: ["integer", "string"] },
        min: { type: ["string"] },
        fgm: { type: ["number", "string"] },
        fga: { type: ["number", "string"] },
        fg3m: { type: ["number", "string"] },
        fg3a: { type: ["number", "string"] },
        ftm: { type: ["number", "string"] },
        fta: { type: ["number", "string"] },
        oreb: { type: ["number", "string"] },
        dreb: { type: ["number", "string"] },
        reb: { type: ["number", "string"] },
        ast: { type: ["number", "string"] },
        stl: { type: ["number", "string"] },
        blk: { type: ["number", "string"] },
        turnover: { type: ["number", "string"] },
        pf: { type: ["number", "string"] },
        pts: { type: ["number", "string"] },
        fg_pct: { type: ["number", "string"] },
        fg3_pct: { type: ["number", "string"] },
        ft_pct: { type: ["number", "string"] },
      },
    }
  }

  static get relationMappings() {
    const { Player, Table, SeasonOfTable } = require("./index.js")

    return {
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        join: {
          from: "seasonAverages.playerId",
          to: "players.apiPlayerId",
        },
      },
      seasonsOfTables: {
        relation: Model.HasManyRelation,
        modelClass: SeasonOfTable,
        join: {
          from: "seasonAverages.id",
          to: "seasonsOfTables.seasonId",
        },
      },
      tables: {
        relation: Model.ManyToManyRelation,
        modelClass: Table,
        join: {
          from: "seasonAverages.id",
          through: {
            from: "seasonsOfTables.seasonId",
            to: "seasonsOfTables.tableId",
          },
          to: "tables.id",
        },
      },
    }
  }
}

module.exports = SeasonAverage
