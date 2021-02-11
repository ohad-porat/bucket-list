const Model = require("./Model.js")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["apiPlayerId"],
  identifiers: ["id"],
})

class Player extends unique(Model) {
  static get tableName() {
    return "players"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name", "apiPlayerId"],
      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        apiPlayerId: { type: ["integer", "string"] },
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
          from: "players.apiPlayerId",
          to: "seasonAverages.playerId",
        },
      },
    }
  }
}

module.exports = Player
