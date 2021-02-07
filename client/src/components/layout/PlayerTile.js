import React from "react"
import PlayerStatTile from "./PlayerStatTile.js"

const PlayerTile = ({ player, selectedStats }) => {
  let fullSeasonName = ""
  if (player.stats.season) {
    fullSeasonName = player.stats.season + 1
  }

  let playerStats = []
  selectedStats.forEach((stat) => {
    let stringedStat = player.stats[stat].toString()
    if (stat.includes("pct")) {
      playerStats.push(stringedStat.substring(1))
    } else {
      playerStats.push(stringedStat)
    }
  })

  let statId = 0
  const playerStatsTiles = playerStats.map((stat) => {
    return <PlayerStatTile key={statId++} stat={stat} />
  })

  return (
    <tr>
      <td>
        {player.first_name} {player.last_name}
      </td>
      <td>
        {player.stats.season}-{fullSeasonName.toString().substring(2)}
      </td>
      {playerStatsTiles}
    </tr>
  )
}

export default PlayerTile
