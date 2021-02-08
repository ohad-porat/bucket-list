import React, { useState } from "react"
import fetchPlayer from "../fetchRequests/fetchPlayer.js"
import fetchStats from "../fetchRequests/fetchStats.js"
import FormError from "./FormError.js"
import statsList from "../../constants/statsList.js"
import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"

const IndexPage = (props) => {
  const [player, setPlayer] = useState({ name: "", season: "" })
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [selectedStats, setSelectedStats] = useState([])
  const [errors, setErrors] = useState({})

  const statsOptions = [""].concat(statsList).map((stat) => {
    return (
      <option key={stat} value={stat}>
        {stat}
      </option>
    )
  })

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

  const validateInput = (payload) => {
    setErrors({})
    const { name, season } = payload
    let newErrors = {}
    if (season.trim() === "") {
      newErrors = {
        ...newErrors,
        season: "is required",
      }
    }

    if (name.trim() === "") {
      newErrors = {
        ...newErrors,
        name: "is required",
      }
    }

    setErrors(newErrors)
    return newErrors
  }

  const handlePlayerSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateInput(player)
    if (Object.keys(validationErrors).length === 0) {
      let fetchedPlayerData = await fetchPlayer(player.name)
      const fetchedStatsData = await fetchStats(
        fetchedPlayerData.id,
        player.season
      )
      fetchedPlayerData.stats = fetchedStatsData
      let newPlayers = selectedPlayers.concat(fetchedPlayerData)
      setSelectedPlayers(newPlayers)
      setPlayer({ name: "", season: "" })
    }
  }

  const handleClearTable = (event) => {
    event.preventDefault()
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
            placeholder="Player Name"
            onChange={handlePlayerInputChange}
            value={player.name}
          />
          <FormError error={errors.name} />
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
          <FormError error={errors.season} />
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
