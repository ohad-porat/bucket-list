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
    const { SeasonAverage } = require("./index.js")

    return {
      seasonAverages: {
        relation: Model.HasManyRelation,
        modelClass: SeasonAverage,
        join: {
          from: "players.id",
          to: "seasonAverages.player_id",
        },
      },
    }
  }
}

module.exports = Player
