import React from "react"
import PlayerStatTile from "./PlayerStatTile.js"

const PlayerTile = ({ player, selectedStats }) => {
  let fullSeasonName = ""
  if (player.stats.season) {
    fullSeasonName = player.stats.season + 1
  }

  let playerStats = []
  selectedStats.forEach((stat) => {
    let statObject = {name: stat}
    let stringedStat = player.stats[stat].toString()
    if (stat.includes("pct")) {
      statObject.value = stringedStat.substring(1)
      playerStats.push(statObject)
    } else {
      statObject.value = stringedStat
      playerStats.push(statObject)
    }
  })

  const playerStatsTiles = playerStats.map((stat) => {
    return <PlayerStatTile key={stat.name} stat={stat.value} />
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
