class StatsSerializer {
  static getSummary (stats) {
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

    let serializedStats = {}
    for (const attribute of allowedAttributes) {
      serializedStats[attribute] = stats[attribute]
    }

    return serializedStats
  }
}

export default StatsSerializer