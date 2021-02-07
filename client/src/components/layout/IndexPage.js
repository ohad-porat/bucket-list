import React, { useState } from "react"
import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"

const IndexPage = (props) => {
  const [player, setPlayer] = useState({ name: "", season: "" })
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [selectedStats, setSelectedStats] = useState([])

  const stats = [
    "games_played",
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
  const statsOptions = [""].concat(stats).map((stat) => {
    return (
      <option key={stat} value={stat}>
        {stat}
      </option>
    )
  })

  const fetchPlayer = async () => {
    try {
      const response = await fetch(`api/v1/players?playerName=${player.name}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const playerData = await response.json()
      return playerData
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const fetchStats = async (playerId) => {
    try {
      const response = await fetch(
        `api/v1/stats/playerId=${playerId}&season=${player.season}`
      )
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const statsData = await response.json()
      return statsData
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handlePlayerSubmit = async (event) => {
    event.preventDefault()
    let fetchedPlayerData = await fetchPlayer()
    const fetchedStatsData = await fetchStats(fetchedPlayerData.id)
    fetchedPlayerData.stats = fetchedStatsData
    let newPlayers = selectedPlayers.concat(fetchedPlayerData)
    setSelectedPlayers(newPlayers)
    setPlayer({ name: "", season: "" })
  }

  const handlePlayerInputChange = (event) => {
    setPlayer({
      ...player,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleStatsInputChange = (event) => {
    let newStats = selectedStats.concat(event.currentTarget.value)
    setSelectedStats(newStats)
  }

  const handleClearTable = (event) => {
    setSelectedPlayers([])
    setSelectedStats([])
  }

  const playerTiles = selectedPlayers.map((player) => {
    return (
      <PlayerTile
        key={player.id}
        player={player}
        selectedStats={selectedStats}
      />
    )
  })

  const statsTiles = selectedStats.map((stat) => {
    return <StatTile key={stat} stat={stat} />
  })

  let table = ""
  if (selectedPlayers.length > 0 || selectedStats.length > 0) {
    table = (
      <table className="hover unstriped table-scroll">
        <thead>
          <tr>
            <th width="200">Player</th>
            <th width="60">Season</th>
            {statsTiles}
          </tr>
        </thead>
        <tbody>{playerTiles}</tbody>
      </table>
    )
  }

  return (
    <div className="page-body">
      <form onSubmit={handlePlayerSubmit}>
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Player"
            onChange={handlePlayerInputChange}
            value={player.name}
          />
        </label>

        <label htmlFor="season">
          <input
            id="season"
            name="season"
            type="text"
            placeholder="Season"
            onChange={handlePlayerInputChange}
            value={player.season}
          />
        </label>

        <label htmlFor="stat">
          <select
            id="stat"
            name="stat"
            placeholder="Stats"
            onChange={handleStatsInputChange}
            value=""
          >
            {statsOptions}
          </select>
        </label>
        <input type="submit" value="Add Player" />
        <input type="button" value="Clear Table" onClick={handleClearTable} />
      </form>
      {table}
    </div>
  )
}

export default IndexPage
