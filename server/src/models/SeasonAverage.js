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
        player_id: { type: ["integer", "string"] },
        games_played: { type: ["integer", "string"] },
        season: { type: ["integer", "string"] },
        min: { type: ["time", "string"] },
        fgm: { type: ["float", "string"] },
        fga: { type: ["float", "string"] },
        fg3m: { type: ["float", "string"] },
        fg3a: { type: ["float", "string"] },
        ftm: { type: ["float", "string"] },
        fta: { type: ["float", "string"] },
        oreb: { type: ["float", "string"] },
        dreb: { type: ["float", "string"] },
        reb: { type: ["float", "string"] },
        ast: { type: ["float", "string"] },
        stl: { type: ["float", "string"] },
        blk: { type: ["float", "string"] },
        turnover: { type: ["float", "string"] },
        pf: { type: ["float", "string"] },
        pts: { type: ["float", "string"] },
        fg_pct: { type: ["float", "string"] },
        fg3_pct: { type: ["float", "string"] },
        ft_pct: { type: ["float", "string"] },
      },
    }
  }

  static get relationMappings() {
    const { Player } = require("./index.js")

    return {
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        join: {
          from: "seasonAverages.player_id",
          to: "players.id",
        },
      },
    }
  }
}

module.exports = SeasonAverage
