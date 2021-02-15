import React, { useEffect, useState } from "react"

import validateInput from "../../services/validateInput.js"
import fetchPlayerAndStats from "../../services/fetchPlayerAndStats.js"
import getStatsList from "../../services/getStatsList.js"
import FormError from "./FormError.js"
import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"
import SaveTableForm from "./SaveTableForm.js"

const IndexPage = ({ user }) => {
  const [player, setPlayer] = useState({ name: "", season: "" })
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [selectedStats, setSelectedStats] = useState([])
  const [statsList, setStatsList] = useState([])
  const [errors, setErrors] = useState({})


  const fetchStatsList = async () => {
    const fetchedStatsList = await getStatsList()
    setStatsList(fetchedStatsList)
  }

  useEffect(() => {
    fetchStatsList()
  }, [])

  const statsOptions = [""].concat(statsList).map((stat) => {
    return (
      <option key={stat.id} value={stat.value}>
        {stat.name}
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
    const statObject = statsList.find(stat => stat.value === event.currentTarget.value)
    let newStats = selectedStats.concat(statObject)
    setSelectedStats(newStats)
  }

  const handleClearTable = (event) => {
    event.preventDefault()
    setSelectedPlayers([])
    setSelectedStats([])
    setErrors({})
  }

  const validationErrors = validateInput(player)

  const handlePlayerSubmit = async (event) => {
    event.preventDefault()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      const fetchedPlayerData = await fetchPlayerAndStats(player)
      let newPlayers = selectedPlayers.concat(fetchedPlayerData)
      setSelectedPlayers(newPlayers)
      setPlayer({ name: "", season: "" })
    }
  }

  const playerTiles = selectedPlayers.map((player) => {
    return (
      <PlayerTile
        key={`${player.id}_${player.stats.season}`}
        player={player}
        selectedStats={selectedStats}
      />
    )
  })

  const statsTiles = selectedStats.map((stat) => {
    return <StatTile key={stat.id} abbreviation={stat.abbreviation} />
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

  const authenticatedUserSaveTable = (
    <SaveTableForm
      selectedPlayers={selectedPlayers}
      selectedStats={selectedStats}
    />
  )
  const unauthenticatedUser = ""

  return (
    <div className="page-body">
      <form onSubmit={handlePlayerSubmit} className="add-player-form">
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            <div className="medium-4 cell">
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
            </div>

            <div className="medium-4 cell">
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
            </div>

            <div className="medium-4 cell">
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
            </div>
          </div>
          <div className="button-group">
            <input type="submit" value="Add Player" className="button" />
            <input
              type="button"
              value="Clear Table"
              className="button"
              onClick={handleClearTable}
            />
          </div>
        </div>
      </form>
      {table}
      {user ? authenticatedUserSaveTable : unauthenticatedUser}
    </div>
  )
}

export default IndexPage
