import React, { useEffect, useState } from "react"

import getPlayer from "../fetchRequests/getPlayer.js"
import validateInput from "../../services/validateInput.js"
import fetchPlayerAndStats from "../../services/fetchPlayerAndStats.js"
import getStatsList from "../../services/getStatsList.js"

import FormError from "./FormError.js"
import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"
import SaveTableForm from "./SaveTableForm.js"
import PlayerCombobox from "./PlayerCombobox.js"
import SeasonCombobox from "./SeasonCombobox.js"

const LandingPage = ({ user }) => {
  const [player, setPlayer] = useState({
    name: "",
    id: "",
    season: "",
  })
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

  const statsOptions = statsList.map((stat) => {
    return (
      <option key={stat.id} value={stat.value}>
        {stat.name}
      </option>
    )
  })

  const handlePlayerInputChange = async (nameString, eventType) => {
    if (eventType === "change") {
      setPlayer({
        ...player,
        id: "",
        name: nameString,
      })
    } else {
      const playerData = await getPlayer(nameString)
      setPlayer({
        ...player,
        id: playerData.id.toString(),
        name: nameString,
      })
    }
  }

  const handleSeasonInputChange = (seasonString) => {
    setPlayer({
      ...player,
      season: seasonString,
    })
  }

  const handleStatsInputChange = (event) => {
    const statObject = statsList.find(
      (stat) => stat.value === event.currentTarget.value
    )
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
      setPlayer({ name: "", season: "", id: "" })
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

  let showTable = ""
  if (selectedPlayers.length > 0 || selectedStats.length > 0) {
    showTable = (
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
  } else if (
    (user === null || user === undefined) &&
    selectedPlayers.length === 0 &&
    selectedStats.length === 0
  ) {
    showTable = (
      <div className="callout welcome-box">
        <h1 className="welcome-header">Welcome to Bucket List</h1>
        <h2 className="welcome-subheader">
          the place to compare NBA players and stats with ease and efficiency.
        </h2>
        <p className="welcome-body">
          To compare players, enter a player name and season, and then select
          stats to be displayed. You can also save your tables by signing up for
          our website!
        </p>
        <ul className="fa-ul">
          <li>
            <span className="fa-li">
              <i className="fas fa-basketball-ball"></i>
            </span>
            Stats will be displayed in season averages.
          </li>
          <li>
            <span className="fa-li">
              <i className="fas fa-basketball-ball"></i>
            </span>
            Seasons are represented by the year they began. For example, 2018
            represents season 2018-2019.
          </li>
          <li>
            <span className="fa-li">
              <i className="fas fa-basketball-ball"></i>
            </span>
            Data is available from seasons 1979-present.
          </li>
        </ul>
        <br />
        <p className="welcome-footer">
          Thank you to <a href="http://balldontlie.io/" className="api-link" target="_blank">balldontlie API</a> for supplying the data for this project!
        </p>
      </div>
    )
  } else if (
    user !== undefined &&
    user !== null &&
    selectedPlayers.length === 0 &&
    selectedStats.length === 0
  ) {
    showTable = ""
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
      <form
        onSubmit={handlePlayerSubmit}
        className="add-player-form"
        autoComplete="off"
      >
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            <div className="medium-4 cell">
              <label htmlFor="player">
                <PlayerCombobox
                  handlePlayerInputChange={handlePlayerInputChange}
                  player={player}
                />
                <FormError error={errors.name} />
              </label>
            </div>

            <div className="medium-4 cell">
              <label htmlFor="season">
                <SeasonCombobox
                  handleSeasonInputChange={handleSeasonInputChange}
                  player={player}
                />
                <FormError error={errors.season} />
              </label>
            </div>

            <div className="medium-4 cell">
              <label htmlFor="stat">
                <select
                  id="stat"
                  name="stat"
                  className="form-field stat-form-field"
                  onChange={handleStatsInputChange}
                  value=""
                >
                  <option>Add a Stat</option>
                  {statsOptions}
                </select>
              </label>
            </div>
          </div>
          <div className="button-group">
            <input type="submit" value="Add Player" className="button add-player" />
            <input
              type="button"
              value="Clear Table"
              className="button clear-button"
              onClick={handleClearTable}
            />
          </div>
        </div>
      </form>
      {showTable}
      {user ? authenticatedUserSaveTable : unauthenticatedUser}
    </div>
  )
}

export default LandingPage
