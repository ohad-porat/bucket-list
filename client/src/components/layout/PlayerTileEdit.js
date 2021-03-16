import React from "react"

import getFullSeasonName from "../../services/getFullSeasonName.js"

import PlayerStatTile from "./PlayerStatTile.js"

const PlayerTileEdit = ({ player, selectedStats, removePlayer }) => {
  let fullSeasonName = ""
  if (player.stats.season) {
    fullSeasonName = getFullSeasonName(player.stats.season)
  }

  let playerStats = []
  selectedStats.forEach((stat) => {
    const statValue = stat.value
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
  let playerIdToRemove
  if (player.apiPlayerId) {
    playerIdToRemove = player.apiPlayerId
  } else {
    playerIdToRemove = player.id
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removePlayer(playerIdToRemove, player.stats.season, player.stats.id)
  }

  const playerStatsTiles = playerStats.map((stat) => {
    return <PlayerStatTile key={stat.name} stat={stat.value} />
  })

  return (
    <tr id={`${player.first_name}-${player.last_name}`}>
      <td onClick={handleRemove} className="remove-button">
        <i className="fas fa-times"></i>
      </td>
      <td id="player-name">
        {player.first_name} {player.last_name}
      </td>
      <td id="season">{fullSeasonName}</td>
      {playerStatsTiles}
    </tr>
  )
}

export default PlayerTileEdit
