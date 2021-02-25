import React from "react"

import getFullSeasonName from "../../services/getFullSeasonName.js"

import PlayerStatTile from "./PlayerStatTile.js"

const PlayerTile = ({ player, selectedStats }) => {
  let fullSeasonName = ""
  if (player.stats.season) {
    fullSeasonName = getFullSeasonName(player.stats.season)
  }

  let playerStats = []
  selectedStats.forEach((stat) => {
    let statValue
    if (stat.value) {
      statValue = stat.value
    } else {
      statValue = stat
    }
    let statObject = { name: statValue }
    let stringedStat = player.stats[statValue].toString()
    if (statValue.includes("pct")) {
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
      <td id="player-name">
        {player.first_name} {player.last_name}
      </td>
      <td id="season">{fullSeasonName}</td>
      {playerStatsTiles}
    </tr>
  )
}

export default PlayerTile
