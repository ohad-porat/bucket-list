import PlayerSerializer from "./PlayerSerializer.js"

class SeasonAverageSerializer {
  static getSummary(season) {
    const allowedAttributes = [
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
    ]

    let serializedSeason = {}
    for (const attribute of allowedAttributes) {
      serializedSeason[attribute] = season[attribute]
    }

    return serializedSeason
  }

  static async getDetails(season) {
    const allowedAttributes = [
      "id",
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
    ]

    let serializedSeason = {}
    for (const attribute of allowedAttributes) {
      serializedSeason[attribute] = season[attribute]
    }

    const player = await season.$relatedQuery("player")
    const serializedPlayer = PlayerSerializer.getDetails(player)
    serializedSeason.player = serializedPlayer

    return serializedSeason
  }
}

export default SeasonAverageSerializer
