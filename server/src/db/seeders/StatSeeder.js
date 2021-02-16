import { Stat } from "../../models/index.js"

class StatSeeder {
  static async seed() {
    const statsData = [
      {
        name: "Games Played",
        abbreviation: "GP",
        value: "games_played",
      },
      {
        name: "Minutes",
        abbreviation: "MIN",
        value: "min",
      },
      {
        name: "Field Goals Made",
        abbreviation: "FGM",
        value: "fgm",
      },
      {
        name: "Field Goals Attempted",
        abbreviation: "FGA",
        value: "fga",
      },
      {
        name: "3 Points Made",
        abbreviation: "3PM",
        value: "fg3m",
      },
      {
        name: "3 Points Attempted",
        abbreviation: "3PA",
        value: "fg3a",
      },
      {
        name: "Free Throws Made",
        abbreviation: "FTM",
        value: "ftm",
      },
      {
        name: "Free Throws Attempted",
        abbreviation: "FTA",
        value: "fta",
      },
      {
        name: "Offensive Rebounds",
        abbreviation: "OREB",
        value: "oreb",
      },
      {
        name: "Defensive Rebounds",
        abbreviation: "DREB",
        value: "dreb",
      },
      {
        name: "Rebounds",
        abbreviation: "REB",
        value: "reb",
      },
      {
        name: "Assists",
        abbreviation: "AST",
        value: "ast",
      },
      {
        name: "Steals",
        abbreviation: "STL",
        value: "stl",
      },
      {
        name: "Blocks",
        abbreviation: "BLK",
        value: "blk",
      },
      {
        name: "Turnovers",
        abbreviation: "TOV",
        value: "turnover",
      },
      {
        name: "Personal Fouls",
        abbreviation: "PF",
        value: "pf",
      },
      {
        name: "Points",
        abbreviation: "PTS",
        value: "pts",
      },
      {
        name: "Field Goal Percentage",
        abbreviation: "FG%",
        value: "fg_pct",
      },
      {
        name: "3 Point Percentage",
        abbreviation: "3P%",
        value: "fg3_pct",
      },
      {
        name: "Free Throw Percentage",
        abbreviation: "FT%",
        value: "ft_pct",
      },
    ]

    for (const singleStatData of statsData) {
      const currentStat = await Stat.query().findOne({
        value: singleStatData.value,
      })
      if (!currentStat) {
        await Stat.query().insert(singleStatData)
      }
    }
  }
}

export default StatSeeder
